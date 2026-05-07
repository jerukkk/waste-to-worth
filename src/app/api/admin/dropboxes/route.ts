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

    // Filter dropboxes by district scope (match name or address)
    const scopedDropboxes = allDropboxes.filter((db) => {
      const text = normalizeText(`${db.name} ${db.address}`);
      return text.includes(scope);
    });

    const data = scopedDropboxes.map((d) => ({
      ...d,
      capacityPercent: Math.round((d.currentBoxCount / d.maxCapacity) * 100),
      isFull: d.currentBoxCount >= d.maxCapacity,
      availableBoxes: d.boxes.filter((b) => b.isAvailable),
    }));

    // Get OPEN batches for these dropboxes
    const dropboxIds = scopedDropboxes.map((d) => d.id);
    const openBatches = await prisma.batch.findMany({
      where: {
        type: "DROPBOX",
        status: "OPEN",
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

    return NextResponse.json({ data, batches: openBatches, scope });
  } catch (error) {
    console.error("Admin dropboxes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
