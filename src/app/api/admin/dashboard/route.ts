import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const [
      totalUsers,
      totalSubmissions,
      pendingSubmissions,
      verifiedSubmissions,
      rejectedSubmissions,
      totalPointsIssued,
      totalWeightKg,
      openBatches,
      verifyingBatches,
      completedBatches,
      dropboxes,
      recentSubmissions,
    ] = await Promise.all([
      prisma.user.count({ where: { role: "CITIZEN" } }),
      prisma.submission.count(),
      prisma.submission.count({ where: { status: "PENDING" } }),
      prisma.submission.count({ where: { status: "VERIFIED" } }),
      prisma.submission.count({ where: { status: "REJECTED" } }),
      prisma.pointTransaction.aggregate({ where: { type: "EARN" }, _sum: { amount: true } }),
      prisma.submissionItem.aggregate({ where: { weightKg: { not: null } }, _sum: { weightKg: true } }),
      prisma.batch.count({ where: { status: "OPEN" } }),
      prisma.batch.count({ where: { status: "VERIFYING" } }),
      prisma.batch.count({ where: { status: "COMPLETED" } }),
      prisma.dropboxLocation.findMany({
        select: { id: true, name: true, maxCapacity: true, currentBoxCount: true, isActive: true },
      }),
      prisma.submission.findMany({
        take: 5,
        orderBy: { submittedAt: "desc" },
        include: {
          user: { select: { name: true } },
          submissionItems: { select: { itemType: true, quantity: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalSubmissions,
        pendingSubmissions,
        verifiedSubmissions,
        rejectedSubmissions,
        totalPointsIssued: totalPointsIssued._sum.amount || 0,
        totalWeightKg: Number((totalWeightKg._sum.weightKg || 0).toFixed(1)),
      },
      batches: { open: openBatches, verifying: verifyingBatches, completed: completedBatches },
      dropboxes,
      recentSubmissions,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
