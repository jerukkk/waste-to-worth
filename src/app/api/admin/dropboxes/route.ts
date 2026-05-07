/**
 * GET /api/admin/dropboxes — District-scoped dropbox list for admin
 * Returns only dropboxes matching the admin's district scope (derived from email).
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z]/g, "");
}

function getAdminDistrictScope(email: string): string | null {
  const localPart = email.split("@")[0]?.toLowerCase() || "";
  if (!localPart.startsWith("admin")) return null;
  const districtKey = normalizeText(localPart.replace(/^admin\.?/, ""));
  return districtKey || null;
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const scope = getAdminDistrictScope(user.email);
    if (!scope) {
      return NextResponse.json(
        { error: "Admin account must be district-scoped (e.g. admin.tamalanrea@...)" },
        { status: 403 }
      );
    }

    const allDropboxes = await prisma.dropboxLocation.findMany({
      include: {
        boxes: { select: { id: true, boxNumber: true, isAvailable: true } },
        _count: { select: { batches: true } },
      },
      orderBy: { name: "asc" },
    });

    type DropboxWithBoxes = (typeof allDropboxes)[number];

    // Filter dropboxes by district scope (match name or address)
    const scopedDropboxes = allDropboxes.filter((db: DropboxWithBoxes) => {
      const text = normalizeText(`${db.name} ${db.address}`);
      return text.includes(scope);
    });

    const dropboxIds = scopedDropboxes.map((d: DropboxWithBoxes) => d.id);

    // Count boxes actually used in OPEN batches (from dropboxSubmissionDetail)
    const openSubmissions = await prisma.dropboxSubmissionDetail.findMany({
      where: {
        dropbox: { id: { in: dropboxIds } },
        submission: { status: "PENDING", batch: { status: "OPEN" } },
      },
      select: { dropboxId: true, boxId: true },
    });

    // Group used box IDs per dropbox
    const usedBoxesByDropbox: Record<string, Set<string>> = {};
    for (const sub of openSubmissions) {
      if (!usedBoxesByDropbox[sub.dropboxId]) {
        usedBoxesByDropbox[sub.dropboxId] = new Set();
      }
      usedBoxesByDropbox[sub.dropboxId].add(sub.boxId);
    }

    const data = scopedDropboxes.map((d: DropboxWithBoxes) => {
      const usedCount = usedBoxesByDropbox[d.id]?.size || 0;
      const totalBoxes = d.boxes.length;
      return {
        ...d,
        usedBoxes: usedCount,
        totalBoxes,
        capacityPercent: totalBoxes > 0 ? Math.round((usedCount / totalBoxes) * 100) : 0,
        isFull: usedCount >= totalBoxes,
        availableBoxes: d.boxes.filter((b: { id: string; boxNumber: string; isAvailable: boolean }) => b.isAvailable),
      };
    });

    // Get ALL batches for these dropboxes (so frontend can check for COMPLETED)
    const allBatches = await prisma.batch.findMany({
      where: {
        type: "DROPBOX",
        dropboxId: { in: dropboxIds },
      },
      include: {
        dropbox: { select: { id: true, name: true } },
        submissions: {
          include: {
            user: { select: { name: true, email: true } },
            submissionItems: { select: { itemType: true, quantity: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data, batches: allBatches, scope });
  } catch (error) {
    console.error("Admin dropboxes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
