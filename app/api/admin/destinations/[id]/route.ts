import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Lấy thông tin destination theo ID
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

    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            hotels_relation: true,
            activities_relation: true,
            packages_relation: true,
            reviews: true,
            highlights: true,
            activities_list: true
          }
        }
      }
    });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Format data
    const formattedDestination = {
      id: destination.id,
      city: destination.city,
      country: destination.country,
      province: destination.province,
      description: destination.description,
      image: destination.image,
      heroImage: destination.heroImage,
      rating: destination.rating,
      reviewCount: destination.reviewCount,
      hotels: destination._count.hotels_relation,
      fromPrice: destination.fromPrice,
      toPrice: destination.toPrice,
      bestTime: destination.bestTime,
      category: destination.category,
      popularity: destination.popularity,
      slug: destination.slug,
      temperature: destination.temperature,
      condition: destination.condition,
      humidity: destination.humidity,
      rainfall: destination.rainfall,
      flightTime: destination.flightTime,
      ferryTime: destination.ferryTime,
      carTime: destination.carTime,
      createdAt: destination.createdAt,
      updatedAt: destination.updatedAt,
      _count: destination._count
    };

    return NextResponse.json(formattedDestination);
  } catch (error) {
    console.error('Get destination error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật destination
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
    
    // Kiểm tra destination tồn tại
    const existingDestination = await prisma.destination.findUnique({
      where: { id }
    });

    if (!existingDestination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Cập nhật destination
    const updatedDestination = await prisma.destination.update({
      where: { id },
      data: {
        city: body.city,
        country: body.country,
        province: body.province,
        description: body.description,
        image: body.image,
        heroImage: body.heroImage,
        rating: body.rating,
        reviewCount: body.reviewCount,
        hotels: body.hotels,
        fromPrice: body.fromPrice,
        toPrice: body.toPrice,
        bestTime: body.bestTime,
        category: body.category,
        popularity: body.popularity,
        temperature: body.temperature,
        condition: body.condition,
        humidity: body.humidity,
        rainfall: body.rainfall,
        flightTime: body.flightTime,
        ferryTime: body.ferryTime,
        carTime: body.carTime
      }
    });

    return NextResponse.json(updatedDestination);
  } catch (error) {
    console.error('Update destination error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa destination
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

    // Kiểm tra destination tồn tại
    const existingDestination = await prisma.destination.findUnique({
      where: { id }
    });

    if (!existingDestination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ràng buộc nào không
    const relatedData = await prisma.destination.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            hotels_relation: true,
            activities_relation: true,
            packages_relation: true,
            reviews: true,
            highlights: true,
            activities_list: true
          }
        }
      }
    });

    if (relatedData && (
      relatedData._count.hotels_relation > 0 ||
      relatedData._count.activities_relation > 0 ||
      relatedData._count.packages_relation > 0 ||
      relatedData._count.reviews > 0 ||
      relatedData._count.highlights > 0 ||
      relatedData._count.activities_list > 0
    )) {
      return NextResponse.json(
        { error: 'Cannot delete destination with related data. Please remove related items first.' },
        { status: 400 }
      );
    }

    // Xóa destination
    await prisma.destination.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Destination deleted successfully' });
  } catch (error) {
    console.error('Delete destination error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 