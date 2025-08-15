// File: app/api/admin/flight/[id]/route.ts
import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface RouteContext {
  params: Promise<{ id: string }>
}

// Helper: parse ID hoặc throw lỗi
async function getId(params: Promise<{ id: string }>) {
  const realParams = await params
  const id = parseInt(realParams.id)
  if (isNaN(id)) throw new Error('Invalid ID')
  return id
}

// Helper: kiểm tra tồn tại flight
async function findFlight(id: number) {
  const flight = await prisma.flight.findUnique({
    where: { id },
    include: {
      _count: {
        select: { bookings: true }
      }
    }
  })
  if (!flight) throw new Error('Flight not found')
  return flight
}

// GET - Lấy flight theo ID
export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const id = await getId(context.params)
    const flight = await findFlight(id)
    return NextResponse.json(flight)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.message.includes('Invalid') ? 400 : 404 }
    )
  }
}

// PUT - Cập nhật flight
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const id = await getId(context.params)
    await findFlight(id) // đảm bảo tồn tại

    const body = await req.json()

    const updatedFlight = await prisma.flight.update({
      where: { id },
      data: body // giả sử frontend gửi đúng fields
    })

    return NextResponse.json(updatedFlight)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.message.includes('Invalid') ? 400 : 404 }
    )
  }
}

// DELETE - Xóa flight
export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const id = await getId(context.params)
    const flight = await findFlight(id)

    if (flight._count.bookings > 0) {
      return NextResponse.json(
        { error: 'Cannot delete flight with related bookings.' },
        { status: 400 }
      )
    }

    await prisma.flight.delete({ where: { id } })
    return NextResponse.json({ message: 'Flight deleted successfully' })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.message.includes('Invalid') ? 400 : 404 }
    )
  }
}
