import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Fetch destination with all related data
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        highlights: true,
        activities_list: true,
        hotels_relation: {
          include: {
            amenities: true,
            roomTypes: true
          }
        }
      }
    });

    if (!destination) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Not found',
          message: 'Không tìm thấy điểm đến'
        },
        { status: 404 }
      );
    }

    // Transform data to match frontend expectations
    const transformedDestination = {
      id: destination.id,
      name: destination.city,
      slug: destination.slug,
      country: destination.country,
      province: destination.province,
      description: destination.description,
      heroImage: destination.heroImage || destination.image,
      rating: destination.rating,
      reviewCount: destination.reviewCount,
      bestTime: destination.bestTime,
      weather: {
        temperature: destination.temperature || 'N/A',
        condition: destination.condition || 'N/A',
        humidity: destination.humidity || 'N/A',
        rainfall: destination.rainfall || 'N/A'
      },
      transportation: {
        flight: destination.flightTime || 'N/A',
        ferry: destination.ferryTime || 'N/A',
        car: destination.carTime || 'N/A'
      },
      highlights: destination.highlights.map((highlight: any) => ({
        name: highlight.name,
        description: highlight.description,
        image: highlight.image,
        rating: highlight.rating
      })),
      activities: destination.activities_list.map((activity: any) => ({
        name: activity.name,
        icon: activity.icon,
        description: activity.description
      })),
      hotels: destination.hotels_relation.map((hotel: any) => ({
        name: hotel.name,
        image: hotel.image,
        rating: hotel.rating,
        price: `${hotel.price.toLocaleString()}đ`,
        location: hotel.location,
        features: hotel.amenities.map((a: any) => a.name)
      })),
      restaurants: [
        {
          name: "Nhà hàng Hải Sản Biển Xanh",
          cuisine: "Hải sản Việt Nam",
          price: "200.000đ - 500.000đ",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
          specialties: ["Cua rang me", "Tôm hùm nướng", "Cá mú hấp"]
        },
        {
          name: "Quán Ăn Địa Phương",
          cuisine: "Ẩm thực địa phương",
          price: "100.000đ - 300.000đ",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
          specialties: ["Bún quậy", "Bánh canh chả cá", "Gỏi cá trích"]
        },
        {
          name: "Restaurant Sunset",
          cuisine: "Quốc tế",
          price: "300.000đ - 800.000đ",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop",
          specialties: ["Steak", "Pasta", "Seafood platter"]
        }
      ],
      tips: [
        "Nên đi vào mùa khô để tránh mưa",
        "Thuê xe máy để khám phá một cách linh hoạt",
        "Đặt khách sạn sớm trong mùa cao điểm",
        "Mặc áo chống nắng và bôi kem chống nắng",
        "Thưởng thức hải sản tại các nhà hàng địa phương",
        "Không bỏ lỡ hoàng hôn tại các điểm ngắm cảnh"
      ]
    };

    return NextResponse.json({
      success: true,
      data: transformedDestination
    });

  } catch (error) {
    console.error('Error fetching destination detail:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Không thể lấy thông tin điểm đến'
      },
      { status: 500 }
    );
  }
} 