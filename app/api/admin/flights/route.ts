import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET - Lấy danh sách flights
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const airline = searchParams.get('airline') || '';

    const skip = (page - 1) * limit;

    // Xây dựng where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { airline: { contains: search, mode: 'insensitive' } },
        { flightNumber: { contains: search, mode: 'insensitive' } },
        { departure: { contains: search, mode: 'insensitive' } },
        { arrival: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (airline) {
      where.airline = airline;
    }

    // Lấy flights với pagination
    const [flights, total] = await Promise.all([
      prisma.flight.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.flight.count({ where })
    ]);

    return NextResponse.json({
      flights,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get flights error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Tạo flight mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation
    const requiredFields = ['airline', 'flightNumber', 'departure', 'arrival', 'departureTime', 'arrivalTime', 'price'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} is required` },
          { status: 400 }
        );
      }
    }

    // Tạo flight mới
    const flight = await prisma.flight.create({
      data: {
        airline: body.airline,
        flightNumber: body.flightNumber,
        departure: body.departure,
        arrival: body.arrival,
        departureTime: body.departureTime,
        arrivalTime: body.arrivalTime,
        duration: body.duration || '2h 30m',
        price: body.price,
        originalPrice: body.originalPrice || body.price,
        discount: body.discount || '0%',
        stops: body.stops || 'Bay thẳng',
        aircraft: body.aircraft || 'Airbus A350',
        class: body.class || 'Economy',
        availableSeats: body.availableSeats || 156,
        departureDate: body.departureDate,
        returnDate: body.returnDate
      }
    });

    return NextResponse.json(flight, { status: 201 });
  } catch (error) {
    console.error('Create flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 