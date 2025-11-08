// app/api/flights/route.tsx
import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const passengers = searchParams.get('passengers');
    const classType = searchParams.get('class');
    const airline = searchParams.get('airline');
    const maxPrice = searchParams.get('maxPrice');
    const stops = searchParams.get('stops');

    // Build where clause for filtering
    const where: any = {};
    
    if (from && from !== 'all') {
      where.departure = {
        contains: from,
        mode: 'insensitive'
      };
    }

    if (to && to !== 'all') {
      where.arrival = {
        contains: to,
        mode: 'insensitive'
      };
    }

    if (departureDate && departureDate !== 'all') {
      where.departureDate = departureDate;
    }

    if (classType && classType !== 'all') {
      where.class = {
        contains: classType,
        mode: 'insensitive'
      };
    }

    if (airline && airline !== 'all') {
      where.airline = {
        contains: airline,
        mode: 'insensitive'
      };
    }

    if (maxPrice && maxPrice !== 'all') {
      where.price = {
        lte: parseInt(maxPrice)
      };
    }

    if (stops && stops !== 'all') {
      where.stops = stops;
    }

    // Fetch flights with features
    const flights = await prisma.flight.findMany({
      where,
      include: {
        features: true
      },
      orderBy: {
        price: 'asc'
      }
    });

    // Transform data to match frontend expectations
    const transformedFlights = flights.map((flight: any) => ({
      id: flight.id,
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      departure: flight.departure,
      arrival: flight.arrival,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      price: flight.price,
      originalPrice: flight.originalPrice,
      discount: flight.discount,
      stops: flight.stops,
      aircraft: flight.aircraft,
      class: flight.class,
      availableSeats: flight.availableSeats,
      departureDate: flight.departureDate,
      returnDate: flight.returnDate,
      features: flight.features.map((f: any) => f.name),
      airlineLogo: `/airlines/${flight.airline.toLowerCase().replace(/\s+/g, '-')}.png`
    }));

    return NextResponse.json({
      success: true,
      data: transformedFlights,
      total: transformedFlights.length,
      filters: {
        from,
        to,
        departureDate,
        returnDate,
        passengers,
        class: classType,
        airline,
        maxPrice,
        stops
      }
    });

  } catch (error) {
    console.error('Error fetching flights:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Không thể lấy dữ liệu chuyến bay'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Booking request body:', body); // Debug log
    
    // Validate required fields với kiểm tra kỹ hơn
    if (!body.flightId || !body.userId || !body.passengers || !body.totalPrice) {
      console.log('Missing fields:', {
        flightId: body.flightId,
        userId: body.userId,
        passengers: body.passengers,
        totalPrice: body.totalPrice
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'Thiếu thông tin bắt buộc: flightId, userId, passengers, totalPrice'
        },
        { status: 400 }
      );
    }

    // Chuyển đổi kiểu dữ liệu
    const flightId = parseInt(body.flightId);
    const passengers = parseInt(body.passengers);
    const totalPrice = parseInt(body.totalPrice);

    // Kiểm tra kiểu dữ liệu
    if (isNaN(flightId) || isNaN(passengers) || isNaN(totalPrice)) {
      console.log('Invalid data types:', {
        flightId: typeof body.flightId,
        passengers: typeof body.passengers,
        totalPrice: typeof body.totalPrice
      });
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid data types',
          message: 'Dữ liệu không hợp lệ: flightId, passengers, totalPrice phải là số'
        },
        { status: 400 }
      );
    }

    // Check if flight exists and has enough seats
    const flight = await prisma.flight.findUnique({
      where: { id: flightId }
    });

    if (!flight) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Flight not found',
          message: 'Chuyến bay không tồn tại'
        },
        { status: 404 }
      );
    }

    if (flight.availableSeats < passengers) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not enough seats',
          message: `Không đủ chỗ trống. Chỉ còn ${flight.availableSeats} chỗ`
        },
        { status: 400 }
      );
    }

    // Generate booking code
    const bookingCode = `FL${Date.now().toString().slice(-6)}`;

    // Create new flight booking
    const newBooking = await prisma.flightBooking.create({
      data: {
        flightId: flightId,
        userId: body.userId,
        passengers: passengers,
        totalPrice: totalPrice,
        status: 'confirmed',
        bookingCode: bookingCode
      },
      include: {
        flight: {
          select: {
            airline: true,
            flightNumber: true,
            departure: true,
            arrival: true,
            departureTime: true,
            arrivalTime: true,
            departureDate: true,
            class: true
          }
        }
      }
    });

    // Update available seats
    await prisma.flight.update({
      where: { id: flightId },
      data: {
        availableSeats: {
          decrement: passengers
        }
      }
    });

    console.log('Booking created successfully:', newBooking.id);

    return NextResponse.json({
      success: true,
      message: 'Đặt vé thành công',
      data: {
        id: newBooking.id,
        bookingCode: newBooking.bookingCode,
        flightId: newBooking.flightId,
        airline: newBooking.flight.airline,
        flightNumber: newBooking.flight.flightNumber,
        departure: newBooking.flight.departure,
        arrival: newBooking.flight.arrival,
        departureTime: newBooking.flight.departureTime,
        arrivalTime: newBooking.flight.arrivalTime,
        departureDate: newBooking.flight.departureDate,
        class: newBooking.flight.class,
        passengers: newBooking.passengers,
        totalPrice: newBooking.totalPrice,
        status: newBooking.status,
        createdAt: newBooking.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating flight booking:', error);
    
    // Log chi tiết lỗi
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Lỗi hệ thống khi đặt vé: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}