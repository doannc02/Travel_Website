"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MotionDiv, MotionButton } from "./MotionWrapper";
import { usePathname } from "next/navigation";

// Header navigation data
const headerData = {
  logo: {
    text: "Travel Thanh Hóa",
    icon: "✈️",
  },
  mainNav: [
    { text: "Khách sạn", url: "/hotels", icon: "🏨" },
    { text: "Vé máy bay", url: "/flights", icon: "✈️" },
    { text: "Gói du lịch", url: "/packages", icon: "🎒" },
    { text: "Hoạt động", url: "/activities", icon: "🎯" },
    { text: "Bảo hiểm", url: "/insurance", icon: "🛡️" },
  ],
  userMenu: [
    { text: "Đăng nhập", url: "/auth/login", icon: "👤" },
    { text: "Đăng ký", url: "/auth/register", icon: "📝" },
    { text: "Hỗ trợ", url: "/support", icon: "💬" },
  ],
  useMenuLogin: [
    { text: "Trang cá nhân", url: "/profile", icon: "👤" },
    { text: "Hỗ trợ", url: "/support", icon: "💬" },
    { text: "Đăng xuất", url: "/auth/logout", icon: "🚪" },
  ],
  languages: [
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    headerData.languages[0]
  );
  const [dataLogin, setLogined] = useState<{
    email: string;
    name: string;
    role?: string;
  } | null>(null);

  // Header component - phần useEffect
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/auth/login", { credentials: "include" });
        const data = await res.json();

        if (!data.isLoggedIn) {
          setLogined(null);
        } else {
          setLogined(data.user);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setLogined(null);
      }
    };

    checkLogin();

    // 🔄 Lắng nghe sự kiện cập nhật profile
    const handleProfileUpdate = () => {
      console.log("Profile updated, reloading user data...");
      checkLogin();
    };

    window.addEventListener("userProfileUpdated", handleProfileUpdate);

    return () => {
      window.removeEventListener("userProfileUpdated", handleProfileUpdate);
    };
  }, []);

  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setLogined(null);
      setIsUserMenuOpen(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <MotionDiv
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl lg:text-3xl group-hover:scale-110 transition-transform duration-300">
                {headerData.logo.icon}
              </span>
              <span className="text-xl lg:text-2xl font-bold text-red-600 group-hover:text-red-700 transition-colors">
                {headerData.logo.text}
              </span>
            </Link>
          </MotionDiv>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {headerData.mainNav.map((item, index) => (
              <MotionDiv
                key={item.text}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.url}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group
                ${
                  pathname === item.url
                    ? "bg-red-600 text-gray-900 shadow-md"
                    : "hover:bg-red-50 hover:text-red-600"
                }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </Link>
              </MotionDiv>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <MotionButton
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:block text-sm font-medium">
                  {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                  className="w-4 h-4 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </MotionButton>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  {headerData.languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang);
                        setIsLanguageMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </MotionDiv>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              {dataLogin ? (
                // Đã đăng nhập - Hiển thị tên và avatar
                <MotionButton
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {dataLogin.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:block font-medium">
                    {dataLogin.name ?? ""}
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </MotionButton>
              ) : (
                // Chưa đăng nhập - Hiển thị nút đăng nhập
                <MotionButton
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">👤</span>
                  <span className="hidden sm:block font-medium">Đăng nhập</span>
                </MotionButton>
              )}

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <MotionDiv
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                >
                  {dataLogin ? (
                    // Menu khi đã đăng nhập
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {dataLogin.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {dataLogin.email}
                        </p>
                      </div>
                      {headerData.useMenuLogin.map((item) =>
                        item.text === "Đăng xuất" ? (
                          <button
                            key={item.text}
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">
                              {item.text}
                            </span>
                          </button>
                        ) : (
                          <Link
                            key={item.text}
                            href={item.url}
                            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">
                              {item.text}
                            </span>
                          </Link>
                        )
                      )}
                    </>
                  ) : (
                    // Menu khi chưa đăng nhập
                    headerData.userMenu.map((item) => (
                      <Link
                        key={item.text}
                        href={item.url}
                        className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm font-medium">{item.text}</span>
                      </Link>
                    ))
                  )}
                </MotionDiv>
              )}
            </div>

            {/* Mobile Menu Button */}
            <MotionButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </MotionButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <nav className="space-y-2">
              {headerData.mainNav.map((item, index) => (
                <MotionDiv
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.url}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.text}</span>
                  </Link>
                </MotionDiv>
              ))}

              {/* Mobile User Menu */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {dataLogin ? (
                  <>
                    <div className="px-4 py-2">
                      <p className="font-medium text-gray-900">
                        {dataLogin.name}
                      </p>
                      <p className="text-sm text-gray-500">{dataLogin.email}</p>
                    </div>
                    {headerData.useMenuLogin.map((item) =>
                      item.text === "Đăng xuất" ? (
                        <button
                          key={item.text}
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.text}</span>
                        </button>
                      ) : (
                        <Link
                          key={item.text}
                          href={item.url}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.text}</span>
                        </Link>
                      )
                    )}
                  </>
                ) : (
                  headerData.userMenu.map((item) => (
                    <Link
                      key={item.text}
                      href={item.url}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </Link>
                  ))
                )}
              </div>
            </nav>
          </MotionDiv>
        )}
      </div>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
