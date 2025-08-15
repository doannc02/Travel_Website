import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Lấy thông tin hotel theo ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        destination: {
          select: {
            city: true,
            province: true
          }
        },
        amenities: true,
        roomTypes: true
      }
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Get hotel error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật hotel
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Kiểm tra hotel tồn tại
    const existingHotel = await prisma.hotel.findUnique({
      where: { id }
    });

    if (!existingHotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    // Cập nhật hotel
    const updatedHotel = await prisma.hotel.update({
      where: { id },
      data: {
        name: body.name,
        image: body.image,
        location: body.location,
        rating: body.rating,
        reviewCount: body.reviewCount,
        price: body.price,
        originalPrice: body.originalPrice,
        discount: body.discount,
        description: body.description,
        destinationId: body.destinationId
      },
      include: {
        destination: {
          select: {
            city: true,
            province: true
          }
        }
      }
    });

    return NextResponse.json(updatedHotel);
  } catch (error) {
    console.error('Update hotel error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa hotel
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    // Kiểm tra hotel tồn tại
    const existingHotel = await prisma.hotel.findUnique({
      where: { id }
    });

    if (!existingHotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ràng buộc nào không
    const relatedData = await prisma.hotel.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            amenities: true,
            roomTypes: true,
            bookings: true
          }
        }
      }
    });

    if (relatedData && (
      relatedData._count.amenities > 0 ||
      relatedData._count.roomTypes > 0 ||
      relatedData._count.bookings > 0
    )) {
      return NextResponse.json(
        { error: 'Cannot delete hotel with related data. Please remove related items first.' },
        { status: 400 }
      );
    }

    // Xóa hotel
    await prisma.hotel.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Delete hotel error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 