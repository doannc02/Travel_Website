import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET - Lấy danh sách packages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const skip = (page - 1) * limit;

    // Xây dựng where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { destination: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.category = category;
    }

    // Lấy packages với pagination từ database
    const [packages, total] = await Promise.all([
      prisma.tourPackage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          destination: {
            select: {
              city: true,
              province: true
            }
          }
        }
      }),
      prisma.tourPackage.count({ where })
    ]);

    return NextResponse.json({
      packages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get packages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Tạo package mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const requiredFields = ['name', 'description', 'destination', 'duration', 'price'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Tạo package mới trong database
    const tourPackage = await prisma.tourPackage.create({
      data: {
        name: body.name,
        description: body.description,
        destination: body.destination,
        duration: body.duration,
        price: body.price,
        originalPrice: body.originalPrice || body.price,
        discount: body.discount || '0%',
        rating: body.rating || 0,
        reviewCount: body.reviewCount || 0,
        maxGroupSize: body.maxGroupSize || 20,
        difficulty: body.difficulty || 'Dễ',
        category: body.category || 'General',
        image: body.image || 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop'
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

    return NextResponse.json(tourPackage, { status: 201 });
  } catch (error) {
    console.error('Create package error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 