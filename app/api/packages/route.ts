// app/api/packages/route.ts
import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const destinationId = searchParams.get('destinationId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const duration = searchParams.get('duration');
    const category = searchParams.get('category');
    const limit = Math.max(Number(searchParams.get('limit')) || 10, 1);
    const page = Math.max(Number(searchParams.get('page')) || 1, 1);

    // Điều kiện where
    const where: any = {};

    if (destinationId) {
      where.destinationId = Number(destinationId);
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    if (duration) {
      where.duration = { contains: duration };
    }

    if (category) {
      where.category = category;
    }

    // Query + Count song song
    const [tourPackages, total] = await prisma.$transaction([
      prisma.tourPackage.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: {
          destination: { select: { city: true, country: true, image: true } },
          highlights: { select: { description: true } },
          itinerary: { select: { day: true, content: true } },
          included: { select: { item: true } },
          notIncluded: { select: { item: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.tourPackage.count({ where })
    ]);

    // Format dữ liệu trả về
    const data = tourPackages.map(pkg => ({
      id: pkg.id,
      title: pkg.title,
      subtitle: pkg.subtitle,
      image: pkg.image,
      badge: pkg.badge,
      discount: pkg.discount,
      originalPrice: pkg.originalPrice,
      price: pkg.price,
      duration: pkg.duration,
      groupSize: pkg.groupSize,
      departure: pkg.departure,
      destination: pkg.destination,
      rating: pkg.rating,
      reviewCount: pkg.reviewCount,
      validUntil: pkg.validUntil,
      category: pkg.category,
      highlights: pkg.highlights.map(h => h.description),
      itinerary: pkg.itinerary,
      included: pkg.included.map(i => i.item),
      notIncluded: pkg.notIncluded.map(ni => ni.item),
      features: []
    }));

    return NextResponse.json({
      success: true,
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching tour packages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch tour packages' },
      { status: 500 }
    );
  }
}
