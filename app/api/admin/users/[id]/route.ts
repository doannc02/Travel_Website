import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Lấy thông tin user theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            hotelBookings: true,
            flightBookings: true,
            packageBookings: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật user
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Cập nhật user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        avatar: body.avatar,
        role: body.role,
        status: body.status
      },
      include: {
        _count: {
          select: {
            hotelBookings: true,
            flightBookings: true,
            packageBookings: true
          }
        }
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Kiểm tra user tồn tại
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ràng buộc nào không
    const relatedData = await prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            hotelBookings: true,
            flightBookings: true,
            packageBookings: true
          }
        }
      }
    });

    if (relatedData && (
      relatedData._count.hotelBookings > 0 ||
      relatedData._count.flightBookings > 0 ||
      relatedData._count.packageBookings > 0
    )) {
      return NextResponse.json(
        { error: 'Cannot delete user with related bookings. Please remove related bookings first.' },
        { status: 400 }
      );
    }

    // Xóa user
    await prisma.user.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 