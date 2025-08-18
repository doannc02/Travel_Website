import { prisma } from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ success: false, message: 'Invalid id' }, { status: 400 });

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
      itinerary: (pkg.itinerary || []).map((i: any) => ({ day: i.day, content: i.content })),
      included: (pkg.included || []).map((i: any) => i.item),
      notIncluded: (pkg.notIncluded || []).map((n: any) => n.item),
      images: [],
      reviews: []
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching package detail:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
} 