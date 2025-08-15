import Link from 'next/link';
import { MotionDiv, MotionH2, MotionP, MotionButton } from '../../components/common/MotionWrapper';

export default function AllPagesDemo() {
  const pages = [
    {
      title: "Trang chủ",
      description: "Trang chủ với Header, Footer, SearchBar, Promotions và Destinations",
      path: "/demo",
      icon: "🏠",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Chi tiết Tour",
      description: "Trang hiển thị thông tin chi tiết tour với hình ảnh, lịch trình và đặt tour",
      path: "/tour/1",
      icon: "🎯",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Đặt lịch Tour",
      description: "Quy trình đặt tour 4 bước với form thông tin và xác nhận",
      path: "/booking",
      icon: "📅",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Đăng nhập",
      description: "Trang đăng nhập với form validation và social login",
      path: "/auth/login",
      icon: "🔐",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            🚀 Demo Tất cả Trang
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Khám phá tất cả các trang đã được tạo với thiết kế chuyên nghiệp và hiệu ứng mượt mà
          </MotionP>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pages.map((page, index) => (
            <MotionDiv
              key={page.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={page.path}>
                <div className={`bg-gradient-to-r ${page.color} rounded-3xl p-8 text-white h-full transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl`}>
                  <div className="text-6xl mb-6">{page.icon}</div>
                  <MotionH2 className="text-2xl font-bold mb-4">
                    {page.title}
                  </MotionH2>
                  <MotionP className="text-white/90 leading-relaxed">
                    {page.description}
                  </MotionP>
                  
                  <div className="mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                    <span>Xem trang</span>
                    <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </MotionDiv>
          ))}
        </div>

        {/* Features Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <MotionH2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ✨ Tính năng nổi bật
          </MotionH2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thiết kế chuyên nghiệp</h3>
              <p className="text-gray-600">UI/UX hiện đại với Tailwind CSS và responsive design</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hiệu ứng mượt mà</h3>
              <p className="text-gray-600">Animations với Framer Motion và React 19 compatibility</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile-first</h3>
              <p className="text-gray-600">Tối ưu cho mọi thiết bị với responsive layout</p>
            </div>
          </div>
        </MotionDiv>

        {/* Tech Stack */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
        >
          <MotionH2 className="text-3xl font-bold mb-6">
            🛠️ Công nghệ sử dụng
          </MotionH2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">⚛️</div>
              <div className="font-semibold">React 19</div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-semibold">Next.js 15</div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold">Tailwind CSS</div>
            </div>
            
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl mb-2">✨</div>
              <div className="font-semibold">Framer Motion</div>
            </div>
          </div>
        </MotionDiv>

        {/* CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <MotionH2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn sàng khám phá?
          </MotionH2>
          <MotionP className="text-xl text-gray-600 mb-8">
            Bắt đầu trải nghiệm các trang demo ngay bây giờ
          </MotionP>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <MotionButton
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem trang chủ
              </MotionButton>
            </Link>
            
            <Link href="/tour/1">
              <MotionButton
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Xem tour chi tiết
              </MotionButton>
            </Link>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
} 