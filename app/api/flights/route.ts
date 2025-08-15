import { NextResponse } from 'next/server';

// Mock flights data - in real app, this would come from a database
const flightsData = [
  {
    id: 1,
    airline: "Vietnam Airlines",
    flightNumber: "VN123",
    departure: "Hà Nội (HAN)",
    arrival: "TP.HCM (SGN)",
    departureTime: "08:00",
    arrivalTime: "10:15",
    duration: "2h 15m",
    price: 1200000,
    originalPrice: 1800000,
    discount: "33%",
    stops: "Bay thẳng",
    aircraft: "Airbus A350",
    class: "Economy",
    availableSeats: 45,
    features: ["Hành lý 7kg", "Đổi vé miễn phí", "Bữa ăn", "WiFi"],
    departureDate: "2024-02-15",
    returnDate: null
  },
  {
    id: 2,
    airline: "VietJet Air",
    flightNumber: "VJ456",
    departure: "Hà Nội (HAN)",
    arrival: "Đà Nẵng (DAD)",
    departureTime: "14:30",
    arrivalTime: "15:45",
    duration: "1h 15m",
    price: 599000,
    originalPrice: 1200000,
    discount: "50%",
    stops: "Bay thẳng",
    aircraft: "Airbus A320",
    class: "Economy",
    availableSeats: 23,
    features: ["Hành lý 7kg", "Đổi vé", "Bữa ăn"],
    departureDate: "2024-02-15",
    returnDate: null
  },
  {
    id: 3,
    airline: "Bamboo Airways",
    flightNumber: "QH789",
    departure: "TP.HCM (SGN)",
    arrival: "Phú Quốc (PQC)",
    departureTime: "16:00",
    arrivalTime: "17:00",
    duration: "1h 0m",
    price: 450000,
    originalPrice: 800000,
    discount: "44%",
    stops: "Bay thẳng",
    aircraft: "Airbus A320",
    class: "Economy",
    availableSeats: 67,
    features: ["Hành lý 7kg", "Đổi vé", "Bữa ăn"],
    departureDate: "2024-02-15",
    returnDate: null
  },
  {
    id: 4,
    airline: "Vietnam Airlines",
    flightNumber: "VN456",
    departure: "TP.HCM (SGN)",
    arrival: "Hà Nội (HAN)",
    departureTime: "20:00",
    arrivalTime: "22:15",
    duration: "2h 15m",
    price: 1500000,
    originalPrice: 2200000,
    discount: "32%",
    stops: "Bay thẳng",
    aircraft: "Airbus A350",
    class: "Economy",
    availableSeats: 32,
    features: ["Hành lý 7kg", "Đổi vé miễn phí", "Bữa ăn", "WiFi"],
    departureDate: "2024-02-15",
    returnDate: null
  },
  {
    id: 5,
    airline: "VietJet Air",
    flightNumber: "VJ789",
    departure: "Đà Nẵng (DAD)",
    arrival: "Hà Nội (HAN)",
    departureTime: "18:30",
    arrivalTime: "19:45",
    duration: "1h 15m",
    price: 750000,
    originalPrice: 1300000,
    discount: "42%",
    stops: "Bay thẳng",
    aircraft: "Airbus A320",
    class: "Economy",
    availableSeats: 45,
    features: ["Hành lý 7kg", "Đổi vé", "Bữa ăn"],
    departureDate: "2024-02-15",
    returnDate: null
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const departureDate = searchParams.get('departureDate');
    const returnDate = searchParams.get('returnDate');
    const passengers = searchParams.get('passengers');
    const classType = searchParams.get('class');

    let filteredFlights = [...flightsData];

    // Apply filters
    if (from && from !== '') {
      filteredFlights = filteredFlights.filter(flight => 
        flight.departure.includes(from)
      );
    }

    if (to && to !== '') {
      filteredFlights = filteredFlights.filter(flight => 
        flight.arrival.includes(to)
      );
    }

    if (departureDate && departureDate !== '') {
      filteredFlights = filteredFlights.filter(flight => 
        flight.departureDate === departureDate
      );
    }

    if (classType && classType !== '') {
      filteredFlights = filteredFlights.filter(flight => 
        flight.class.toLowerCase() === classType.toLowerCase()
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));

    return NextResponse.json({
      success: true,
      data: filteredFlights,
      total: filteredFlights.length,
      searchParams: {
        from,
        to,
        departureDate,
        returnDate,
        passengers,
        class: classType
      }
    });

  } catch (error) {
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
    
    // Simulate creating a new flight booking
    const newBooking = {
      id: Date.now(),
      flightId: body.flightId,
      userId: body.userId,
      passengers: body.passengers,
      totalPrice: body.totalPrice,
      status: 'confirmed',
      bookingCode: `FL${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: 'Đặt vé thành công',
      data: newBooking
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Bad request',
        message: 'Dữ liệu đặt vé không hợp lệ'
      },
      { status: 400 }
    );
  }
} 