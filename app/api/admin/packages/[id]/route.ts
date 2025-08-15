import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Lấy thông tin package theo ID
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

    const tourPackage = await prisma.tourPackage.findUnique({
      where: { id },
      include: {
        destination: {
          select: {
            city: true,
            province: true
          }
        }
      }
    });

    if (!tourPackage) {
      return NextResponse.json(
        { error: 'Tour package not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tourPackage);
  } catch (error) {
    console.error('Get package error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật package
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
    
    // Kiểm tra package tồn tại
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id }
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Tour package not found' },
        { status: 404 }
      );
    }

    // Cập nhật package trong database
    const updatedPackage = await prisma.tourPackage.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        destination: body.destination,
        duration: body.duration,
        price: body.price,
        originalPrice: body.originalPrice,
        discount: body.discount,
        rating: body.rating,
        reviewCount: body.reviewCount,
        maxGroupSize: body.maxGroupSize,
        difficulty: body.difficulty,
        category: body.category,
        image: body.image
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

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error('Update package error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa package
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

    // Kiểm tra package tồn tại
    const existingPackage = await prisma.tourPackage.findUnique({
      where: { id }
    });

    if (!existingPackage) {
      return NextResponse.json(
        { error: 'Tour package not found' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ràng buộc nào không
    const relatedData = await prisma.tourPackage.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            bookings: true
          }
        }
      }
    });

    if (relatedData && relatedData._count.bookings > 0) {
      return NextResponse.json(
        { error: 'Cannot delete package with related bookings. Please remove related bookings first.' },
        { status: 400 }
      );
    }

    // Xóa package từ database
    await prisma.tourPackage.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Tour package deleted successfully' });
  } catch (error) {
    console.error('Delete package error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 