import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idParam } = await context.params;
    const id = Number(idParam);
    if (!id) return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });

    const { searchParams } = new URL(req.url);
    const rich = searchParams.get('rich') === '1';

    const pkg: any = await prisma.tourPackage.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        subtitle: true,
        image: true,
        badge: true,
        discount: true,
        originalPrice: true,
        price: true,
        duration: true,
        groupSize: true,
        departure: true,
        rating: true,
        reviewCount: true,
        validUntil: true,
        category: true,
        destination: { select: { city: true, country: true } },
        highlights: { select: { description: true } },
        itinerary: { select: { day: true, content: true } },
        included: { select: { item: true } },
        notIncluded: { select: { item: true } },
        ...(rich ? {
          // @ts-ignore
          sections: { select: { title: true, content: true, photos: true, position: true }, orderBy: { position: 'asc' } },
          // @ts-ignore
          stops: { select: { title: true, description: true, guide: true, address: true, latitude: true, longitude: true, photos: true, position: true, tips: true, bestTime: true, mapThumb: true }, orderBy: { position: 'asc' } },
        } : {}),
      }
    });

    if (!pkg) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });

    const data = {
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
      highlights: (pkg.highlights || []).map((h: any) => h.description),
      itinerary: (pkg.itinerary || []).map((i: any) => ({ day: i.day, content: i.content, startTime: i.startTime ?? null, transport: i.transport ?? null, meals: i.meals ?? null })),
      included: (pkg.included || []).map((i: any) => i.item),
      notIncluded: (pkg.notIncluded || []).map((n: any) => n.item),
      sections: (pkg.sections || []).sort((a: any, b: any) => a.position - b.position),
      stops: (pkg.stops || []).sort((a: any, b: any) => a.position - b.position),
      images: [],
      reviews: []
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching package detail:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 