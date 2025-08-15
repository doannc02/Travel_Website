"use client"
import { MotionDiv, MotionA } from './MotionWrapper';
import Link from 'next/link';
import Image from 'next/image';

export const footerData = {
  company: {
    name: "Công ty TNHH Traveloka Vietnam",
    address: "Tầng 18, Tòa nhà Capital Place, 29 Liễu Giai, Ba Đình, Hà Nội",
    taxCode: "Mã số doanh nghiệp: 0109080056",
    license: "Giấy phép kinh doanh số 0109080056 do Sở Kế hoạch và Đầu tư Hà Nội cấp ngày 28/12/2018"
  },
  links: [
    {
      title: "Về Traveloka",
      items: [
        { text: "Về chúng tôi", url: "/about" },
        { text: "Trung tâm trợ giúp", url: "/help" },
        { text: "Điều khoản sử dụng", url: "/terms" },
        { text: "Chính sách bảo mật", url: "/privacy" },
        { text: "Tuyển dụng", url: "/careers" }
      ]
    },
    {
      title: "Sản phẩm",
      items: [
        { text: "Khách sạn", url: "/hotels" },
        { text: "Vé máy bay", url: "/flights" },
        { text: "Combo tiết kiệm", url: "/packages" },
        { text: "Hoạt động & Vui chơi", url: "/activities" },
        { text: "Bảo hiểm du lịch", url: "/insurance" }
      ]
    },
    {
      title: "Đối tác",
      items: [
        { text: "Đăng ký trở thành đối tác", url: "/partners" },
        { text: "Chương trình liên kết", url: "/affiliate" },
        { text: "Traveloka Ads", url: "/ads" },
        { text: "Traveloka Connect", url: "/connect" }
      ]
    },
    {
      title: "Tải ứng dụng",
      items: [
        { 
          text: "App Store", 
          url: "#",
          icon: "/icons/app-store.svg" 
        },
        { 
          text: "Google Play", 
          url: "#",
          icon: "/icons/google-play.svg" 
        },
        { 
          text: "AppGallery", 
          url: "#",
          icon: "/icons/app-gallery.svg" 
        }
      ]
    }
  ],
  socialMedia: [
    { name: "Facebook", icon: "/icons/facebook.svg", url: "#" },
    { name: "Instagram", icon: "/icons/instagram.svg", url: "#" },
    { name: "Twitter", icon: "/icons/twitter.svg", url: "#" },
    { name: "Youtube", icon: "/icons/youtube.svg", url: "#" },
    { name: "LinkedIn", icon: "/icons/linkedin.svg", url: "#" }
  ],
  paymentMethods: [
    "/icons/visa.svg",
    "/icons/mastercard.svg",
    "/icons/jcb.svg",
    "/icons/amex.svg",
    "/icons/paypal.svg",
    "/icons/momo.svg",
    "/icons/zalopay.svg"
  ],
  awards: [
    { 
      name: "Best Travel App 2023", 
      icon: "/icons/award1.svg" 
    },
    { 
      name: "Top Brand 2022", 
      icon: "/icons/award2.svg" 
    },
    { 
      name: "Customer Choice", 
      icon: "/icons/award3.svg" 
    }
  ]
};

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Traveloka</h3>
            <p className="mb-2">{footerData.company.name}</p>
            <p className="mb-2">{footerData.company.address}</p>
            <p className="mb-2">{footerData.company.taxCode}</p>
            <p>{footerData.company.license}</p>
          </MotionDiv>

          {/* Footer Links */}
          {footerData.links.map((section, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item : any, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href={item.url} passHref legacyBehavior>
                      <MotionA
                        whileHover={{ y: -3 }}
                        className="hover:text-red-600 transition-colors flex items-center"
                      >
                        {item?.icon && (
                          <Image 
                            src={item?.icon as any} 
                            alt={item.text} 
                            width={20}
                            height={20}
                            className="w-5 h-5 mr-2" 
                          />
                        )}
                        {item.text}
                      </MotionA>
                    </Link>
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>

        {/* Social Media */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Kết nối với chúng tôi
          </h4>
          <div className="flex flex-wrap gap-4">
            {footerData.socialMedia.map((social, index) => (
              <Link href={social.url} key={index} passHref legacyBehavior>
                <MotionA
                  whileHover={{ y: -3 }}
                  className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={24}
                    height={24}
                    className="w-6 h-6" 
                  />
                </MotionA>
              </Link>
            ))}
          </div>
        </MotionDiv>

        {/* Payment Methods */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Chấp nhận thanh toán
          </h4>
          <div className="flex flex-wrap gap-4">
            {footerData.paymentMethods.map((method, index) => (
              <MotionDiv
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-2 rounded shadow-sm"
              >
                <Image 
                  src={method} 
                  alt={`Payment method ${index}`} 
                  width={40}
                  height={24}
                  className="h-6 w-auto" 
                />
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Awards */}
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Giải thưởng
          </h4>
          <div className="flex flex-wrap gap-6">
            {footerData.awards.map((award, index) => (
              <MotionDiv
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-white p-3 rounded-lg shadow-sm"
              >
                <Image 
                  src={award.icon} 
                  alt={award.name} 
                  width={40}
                  height={40}
                  className="h-10 w-10 mr-3" 
                />
                <span className="text-sm font-medium">{award.name}</span>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </div>

      {/* Copyright */}
      <div className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            © {new Date().getFullYear()} Traveloka. Bảo lưu mọi quyền.
          </MotionDiv>
        </div>
      </div>
    </footer>
  );
}