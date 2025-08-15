import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

// GET - Lấy thông tin flight theo ID
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

    const flight = await prisma.flight.findUnique({
      where: { id }
    });

    if (!flight) {
      return NextResponse.json(
        { error: 'Flight not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(flight);
  } catch (error) {
    console.error('Get flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật flight
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
    
    // Kiểm tra flight tồn tại
    const existingFlight = await prisma.flight.findUnique({
      where: { id }
    });

    if (!existingFlight) {
      return NextResponse.json(
        { error: 'Flight not found' },
        { status: 404 }
      );
    }

    // Cập nhật flight
    const updatedFlight = await prisma.flight.update({
      where: { id },
      data: {
        airline: body.airline,
        flightNumber: body.flightNumber,
        departure: body.departure,
        arrival: body.arrival,
        departureTime: body.departureTime,
        arrivalTime: body.arrivalTime,
        duration: body.duration,
        price: body.price,
        originalPrice: body.originalPrice,
        discount: body.discount,
        stops: body.stops,
        aircraft: body.aircraft,
        class: body.class,
        availableSeats: body.availableSeats,
        departureDate: body.departureDate,
        returnDate: body.returnDate
      }
    });

    return NextResponse.json(updatedFlight);
  } catch (error) {
    console.error('Update flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa flight
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

    // Kiểm tra flight tồn tại
    const existingFlight = await prisma.flight.findUnique({
      where: { id }
    });

    if (!existingFlight) {
      return NextResponse.json(
        { error: 'Flight not found' },
        { status: 404 }
      );
    }

    // Kiểm tra xem có ràng buộc nào không
    const relatedData = await prisma.flight.findUnique({
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
        { error: 'Cannot delete flight with related bookings. Please remove related bookings first.' },
        { status: 400 }
      );
    }

    // Xóa flight
    await prisma.flight.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Delete flight error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 