import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create destinations
  const phuQuoc = await prisma.destination.create({
    data: {
      city: 'Phú Quốc',
      country: 'Việt Nam',
      province: 'Kiên Giang',
      description: 'Đảo ngọc Phú Quốc - thiên đường du lịch với những bãi biển đẹp nhất Việt Nam, ẩm thực hải sản tươi ngon và văn hóa địa phương độc đáo.',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=600&fit=crop',
      rating: 4.8,
      reviewCount: 15420,
      hotels: 156,
      fromPrice: 1200000,
      toPrice: 8000000,
      bestTime: 'Tháng 11 - Tháng 4',
      category: 'Biển đảo',
      popularity: 'Rất cao',
      slug: 'phu-quoc',
      temperature: '25-32°C',
      condition: 'Nắng đẹp, ít mưa',
      humidity: '70-85%',
      rainfall: 'Thấp',
      flightTime: '45 phút từ TP.HCM',
      ferryTime: '2.5 giờ từ Rạch Giá',
      carTime: 'Không thể đi xe'
    }
  })

  const daNang = await prisma.destination.create({
    data: {
      city: 'Đà Nẵng',
      country: 'Việt Nam',
      province: 'Đà Nẵng',
      description: 'Thành phố đáng sống nhất Việt Nam với bãi biển Mỹ Khê đẹp nhất thế giới, văn hóa lịch sử phong phú và ẩm thực đặc sản đa dạng.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&h=600&fit=crop',
      rating: 4.7,
      reviewCount: 12890,
      hotels: 234,
      fromPrice: 800000,
      toPrice: 6000000,
      bestTime: 'Tháng 2 - Tháng 8',
      category: 'Biển',
      popularity: 'Cao',
      slug: 'da-nang',
      temperature: '22-35°C',
      condition: 'Nắng đẹp, mưa vừa',
      humidity: '65-80%',
      rainfall: 'Trung bình',
      flightTime: '1 giờ từ Hà Nội',
      ferryTime: '2.5 giờ từ Huế',
      carTime: '3 giờ từ Huế'
    }
  })

  const nhaTrang = await prisma.destination.create({
    data: {
      city: 'Nha Trang',
      country: 'Việt Nam',
      province: 'Khánh Hòa',
      description: 'Thành phố biển xinh đẹp với khí hậu ôn hòa quanh năm, những hòn đảo hoang sơ và ẩm thực hải sản tươi ngon đặc trưng miền Trung.',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=600&fit=crop',
      rating: 4.6,
      reviewCount: 9876,
      hotels: 189,
      fromPrice: 600000,
      toPrice: 4500000,
      bestTime: 'Tháng 1 - Tháng 8',
      category: 'Biển',
      popularity: 'Cao',
      slug: 'nha-trang',
      temperature: '24-33°C',
      condition: 'Nắng đẹp, mưa ít',
      humidity: '70-85%',
      rainfall: 'Thấp',
      flightTime: '45 phút từ TP.HCM',
      ferryTime: '1 giờ từ Nha Trang',
      carTime: '6 giờ từ TP.HCM'
    }
  })

  const sapa = await prisma.destination.create({
    data: {
      city: 'Sapa',
      country: 'Việt Nam',
      province: 'Lào Cai',
      description: 'Thị trấn miền núi cao với khí hậu mát mẻ quanh năm, ruộng bậc thang tuyệt đẹp và văn hóa dân tộc thiểu số độc đáo.',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      heroImage: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&h=600&fit=crop',
      rating: 4.9,
      reviewCount: 11234,
      hotels: 145,
      fromPrice: 500000,
      toPrice: 3500000,
      bestTime: 'Tháng 9 - Tháng 11',
      category: 'Núi',
      popularity: 'Rất cao',
      slug: 'sapa',
      temperature: '15-25°C',
      condition: 'Mát mẻ, sương mù',
      humidity: '80-90%',
      rainfall: 'Trung bình',
      flightTime: 'Không có sân bay',
      ferryTime: 'Không có phà',
      carTime: '6 giờ từ Hà Nội'
    }
  })

  // Create destination highlights for Phu Quoc
  await prisma.destinationHighlight.createMany({
    data: [
      {
        destinationId: phuQuoc.id,
        name: 'Bãi Khem',
        description: 'Bãi biển đẹp nhất Phú Quốc với cát trắng mịn và nước biển trong xanh',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
        rating: 4.9
      },
      {
        destinationId: phuQuoc.id,
        name: 'Vịnh Đá Vàng',
        description: 'Vịnh biển hoang sơ với những tảng đá granit đen độc đáo',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
        rating: 4.7
      },
      {
        destinationId: phuQuoc.id,
        name: 'Chợ đêm Dinh Cậu',
        description: 'Chợ đêm sôi động với ẩm thực địa phương và mua sắm',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        rating: 4.6
      },
      {
        destinationId: phuQuoc.id,
        name: 'VinWonders Phú Quốc',
        description: 'Công viên giải trí hiện đại với nhiều trò chơi hấp dẫn',
        image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
        rating: 4.8
      }
    ]
  })

  // Create destination activities for Phu Quoc
  await prisma.destinationActivity.createMany({
    data: [
      {
        destinationId: phuQuoc.id,
        name: 'Tắm biển',
        icon: '🏊‍♂️',
        description: 'Thư giãn tại những bãi biển đẹp nhất Việt Nam'
      },
      {
        destinationId: phuQuoc.id,
        name: 'Lặn ngắm san hô',
        icon: '🤿',
        description: 'Khám phá thế giới dưới đáy biển đầy màu sắc'
      },
      {
        destinationId: phuQuoc.id,
        name: 'Khám phá đảo',
        icon: '🚗',
        description: 'Thuê xe máy khám phá những con đường ven biển'
      },
      {
        destinationId: phuQuoc.id,
        name: 'Thưởng thức hải sản',
        icon: '🦐',
        description: 'Nếm thử những món hải sản tươi ngon đặc trưng'
      },
      {
        destinationId: phuQuoc.id,
        name: 'Ngắm hoàng hôn',
        icon: '🌅',
        description: 'Chiêm ngưỡng hoàng hôn tuyệt đẹp tại Sunset Sanato'
      },
      {
        destinationId: phuQuoc.id,
        name: 'Tham quan làng chài',
        icon: '🐟',
        description: 'Tìm hiểu văn hóa và cuộc sống của người dân địa phương'
      }
    ]
  })

  // Create hotels
  const intercontinental = await prisma.hotel.create({
    data: {
      name: 'InterContinental Phú Quốc Long Beach Resort',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      location: 'Phú Quốc, Kiên Giang',
      rating: 4.9,
      reviewCount: 2847,
      price: 4500000,
      originalPrice: 6500000,
      discount: '31%',
      description: 'Khách sạn 5 sao đẳng cấp quốc tế với view biển tuyệt đẹp và dịch vụ hoàn hảo',
      destinationId: phuQuoc.id
    }
  })

  const jwMarriott = await prisma.hotel.create({
    data: {
      name: 'JW Marriott Phú Quốc Emerald Bay',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      location: 'Phú Quốc, Kiên Giang',
      rating: 4.8,
      reviewCount: 2156,
      price: 5200000,
      originalPrice: 7200000,
      discount: '28%',
      description: 'Resort sang trọng với thiết kế độc đáo và dịch vụ đẳng cấp thế giới',
      destinationId: phuQuoc.id
    }
  })

  // Create hotel amenities
  await prisma.hotelAmenity.createMany({
    data: [
      { hotelId: intercontinental.id, name: 'Hồ bơi vô cực' },
      { hotelId: intercontinental.id, name: 'Spa & Wellness' },
      { hotelId: intercontinental.id, name: 'Nhà hàng 5 sao' },
      { hotelId: intercontinental.id, name: 'Phòng gym' },
      { hotelId: intercontinental.id, name: 'Kids club' },
      { hotelId: intercontinental.id, name: 'Golf course' },
      { hotelId: jwMarriott.id, name: 'Villa riêng biệt' },
      { hotelId: jwMarriott.id, name: 'Bãi biển riêng' },
      { hotelId: jwMarriott.id, name: 'Golf course' },
      { hotelId: jwMarriott.id, name: 'Kids club' },
      { hotelId: jwMarriott.id, name: 'Spa' },
      { hotelId: jwMarriott.id, name: 'Nhà hàng' }
    ]
  })

  // Create hotel room types
  await prisma.hotelRoomType.createMany({
    data: [
      { hotelId: intercontinental.id, name: 'Deluxe Ocean View' },
      { hotelId: intercontinental.id, name: 'Suite Premium' },
      { hotelId: intercontinental.id, name: 'Villa Beachfront' },
      { hotelId: jwMarriott.id, name: 'Garden Villa' },
      { hotelId: jwMarriott.id, name: 'Ocean Villa' },
      { hotelId: jwMarriott.id, name: 'Presidential Suite' }
    ]
  })

  // Create flights
  const flight1 = await prisma.flight.create({
    data: {
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      departure: 'Hà Nội (HAN)',
      arrival: 'TP.HCM (SGN)',
      departureTime: '08:00',
      arrivalTime: '10:15',
      duration: '2h 15m',
      price: 1200000,
      originalPrice: 1800000,
      discount: '33%',
      stops: 'Bay thẳng',
      aircraft: 'Airbus A350',
      class: 'Economy',
      availableSeats: 45,
      departureDate: '2024-02-15'
    }
  })

  const flight2 = await prisma.flight.create({
    data: {
      airline: 'VietJet Air',
      flightNumber: 'VJ456',
      departure: 'Hà Nội (HAN)',
      arrival: 'Đà Nẵng (DAD)',
      departureTime: '14:30',
      arrivalTime: '15:45',
      duration: '1h 15m',
      price: 599000,
      originalPrice: 1200000,
      discount: '50%',
      stops: 'Bay thẳng',
      aircraft: 'Airbus A320',
      class: 'Economy',
      availableSeats: 23,
      departureDate: '2024-02-15'
    }
  })

  // Create flight features
  await prisma.flightFeature.createMany({
    data: [
      { flightId: flight1.id, name: 'Hành lý 7kg' },
      { flightId: flight1.id, name: 'Đổi vé miễn phí' },
      { flightId: flight1.id, name: 'Bữa ăn' },
      { flightId: flight1.id, name: 'WiFi' },
      { flightId: flight2.id, name: 'Hành lý 7kg' },
      { flightId: flight2.id, name: 'Đổi vé' },
      { flightId: flight2.id, name: 'Bữa ăn' }
    ]
  })

  // Create tour packages
  const package1 = await prisma.tourPackage.create({
    data: {
      title: 'Combo Phú Quốc 3N2Đ - Khám phá đảo ngọc',
      subtitle: 'Khách sạn 4★ + Vé máy bay + Ăn sáng + Tour khám phá',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      badge: 'HOT DEAL',
      discount: 'Giảm 35%',
      originalPrice: 4500000,
      price: 2990000,
      duration: '3 ngày 2 đêm',
      groupSize: '2-8 người',
      departure: 'TP.HCM',
      destinationId: phuQuoc.id,
      rating: 4.8,
      reviewCount: 1247,
      validUntil: '2024-02-29',
      category: 'Combo'
    }
  })

  // Create package highlights
  await prisma.packageHighlight.createMany({
    data: [
      { packageId: package1.id, description: 'Khách sạn 4 sao view biển' },
      { packageId: package1.id, description: 'Vé máy bay khứ hồi' },
      { packageId: package1.id, description: 'Ăn sáng buffet' },
      { packageId: package1.id, description: 'Tour khám phá đảo' },
      { packageId: package1.id, description: 'Đưa đón sân bay' },
      { packageId: package1.id, description: 'Hướng dẫn viên tiếng Việt' }
    ]
  })

  // Create activities
  const activity1 = await prisma.activity.create({
    data: {
      title: 'Lặn ngắm san hô Phú Quốc',
      subtitle: 'Khám phá thế giới dưới đáy biển với hướng dẫn viên chuyên nghiệp',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      category: 'Thể thao biển',
      location: 'Phú Quốc, Kiên Giang',
      duration: '3-4 giờ',
      groupSize: '2-8 người',
      price: 850000,
      originalPrice: 1200000,
      discount: '29%',
      rating: 4.8,
      reviewCount: 567,
      difficulty: 'Trung bình',
      ageRequirement: '12+',
      schedule: '08:00 - 12:00 hàng ngày',
      bestTime: 'Tháng 11 - Tháng 4',
      destinationId: phuQuoc.id
    }
  })

  // Create activity highlights
  await prisma.activityHighlight.createMany({
    data: [
      { activityId: activity1.id, highlight: 'Lặn tại 3 điểm san hô đẹp nhất' },
      { activityId: activity1.id, highlight: 'Hướng dẫn viên PADI certified' },
      { activityId: activity1.id, highlight: 'Thiết bị chất lượng cao' },
      { activityId: activity1.id, highlight: 'Ảnh kỷ niệm miễn phí' }
    ]
  })

  // Create insurance
  const insurance1 = await prisma.insurance.create({
    data: {
      title: 'Bảo hiểm du lịch cơ bản',
      subtitle: 'Bảo vệ toàn diện cho chuyến du lịch của bạn',
      image: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&h=600&fit=crop',
      type: 'Cơ bản',
      price: 150000,
      duration: '1-30 ngày',
      coverage: '50 triệu VND',
      rating: 4.5,
      reviewCount: 892,
      claimProcess: 'Đơn giản, nhanh chóng trong 7-14 ngày',
      maxAge: 70,
      preExistingConditions: false
    }
  })

  // Create insurance features
  await prisma.insuranceFeature.createMany({
    data: [
      { insuranceId: insurance1.id, feature: 'Bảo hiểm y tế khẩn cấp' },
      { insuranceId: insurance1.id, feature: 'Bảo hiểm tai nạn' },
      { insuranceId: insurance1.id, feature: 'Bảo hiểm hành lý' },
      { insuranceId: insurance1.id, feature: 'Hỗ trợ khẩn cấp 24/7' },
      { insuranceId: insurance1.id, feature: 'Bồi thường chuyến bay bị hủy' },
      { insuranceId: insurance1.id, feature: 'Bảo hiểm trách nhiệm dân sự' }
    ]
  })

  // Create insurance destinations
  await prisma.insuranceDestination.createMany({
    data: [
      { insuranceId: insurance1.id, destination: 'Toàn thế giới' }
    ]
  })

  // Create insurance exclusions
  await prisma.insuranceExclusion.createMany({
    data: [
      { insuranceId: insurance1.id, exclusion: 'Thể thao mạo hiểm' },
      { insuranceId: insurance1.id, exclusion: 'Bệnh có sẵn' },
      { insuranceId: insurance1.id, exclusion: 'Chiến tranh, bạo động' }
    ]
  })

  // Create sample user
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Nguyễn Văn A',
      phone: '0123456789'
    }
  })

  console.log('✅ Database seeding completed successfully!')
  console.log(`Created ${await prisma.destination.count()} destinations`)
  console.log(`Created ${await prisma.hotel.count()} hotels`)
  console.log(`Created ${await prisma.flight.count()} flights`)
  console.log(`Created ${await prisma.tourPackage.count()} tour packages`)
  console.log(`Created ${await prisma.activity.count()} activities`)
  console.log(`Created ${await prisma.insurance.count()} insurance plans`)
  console.log(`Created ${await prisma.user.count()} users`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 