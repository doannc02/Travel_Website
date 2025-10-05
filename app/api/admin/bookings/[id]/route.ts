import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const booking = await prisma.packageBooking.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      package: { select: { id: true, title: true } },
    },
  });

  return Response.json({ booking });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ chờ params được resolve
  try {
    const body = await req.json();
    const { status, adminUserId, note } = body;

    const updated = await prisma.packageBooking.update({
      where: { id },
      data: { status },
    });

    // tạo log
    await prisma.bookingLog.create({
      data: {
        bookingId: updated.id,
        bookingCode: updated.bookingCode,
        action: "status_change",
        message: note || `Status changed to ${status}`,
        userId: adminUserId || null,
      },
    });

    return NextResponse.json({ booking: updated });
  } catch (err) {
    console.error("PATCH /bookings error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
