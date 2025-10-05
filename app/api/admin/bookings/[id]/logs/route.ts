import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const logs = await prisma.bookingLog.findMany({
    where: { bookingId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ logs });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const existingBooking = await prisma.packageBooking.findUnique({
    where: { id: id },
  });

  if (!existingBooking) {
    // Trả về lỗi 404 nếu Booking không tồn tại
    return new NextResponse("Booking not found", { status: 404 });
  }

  console.log(body);
  try {
    const log = await prisma.bookingLog.create({
      data: {
        bookingId: id,
        bookingCode: body.bookingCode,
        action: body.action || "admin_note",
        message: body.message || "",
        userId: body.userId || null,
      },
    });

    return NextResponse.json({ log });
  } catch (err) {
    console.error("Create log error:", err);
    return NextResponse.json(
      { error: "Failed to create log" },
      { status: 500 }
    );
  }
}
