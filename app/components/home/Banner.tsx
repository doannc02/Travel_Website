"use client";
import { useState } from "react";
import {
  FiHome,
  FiAirplay,
  FiMap,
  FiUser,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";

const TABS = [
  { key: "hotel", label: "Khách sạn", icon: <FiHome /> },
  { key: "flight", label: "Vé máy bay", icon: <FiAirplay /> },
  { key: "tour", label: "Tour", icon: <FiMap /> },
];

export default function Banner() {
  const [tab, setTab] = useState("hotel");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    window.location.href = `/search?tab=${tab}&from=${encodeURIComponent(
      from
    )}&to=${encodeURIComponent(to)}&date=${date}&guests=${guests}`;
  };

  return (
    <section className="relative h-[420px] md:h-[520px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden">
      {/* Background image */}
      <img
        src="/images/hero-bg1.jpg"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-700/20"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg text-center animate-fade-in">
          Đặt phòng khách sạn, vé máy bay, tour du lịch giá tốt
        </h1>
        <p className="text-lg md:text-xl text-gray-900 mb-8 drop-shadow text-center animate-fade-in">
          Trải nghiệm du lịch dễ dàng, tiện lợi và an toàn cùng Traveloka Clone
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-4">
          <div className="flex bg-white/80 rounded-lg shadow-lg overflow-hidden backdrop-blur-md border border-blue-200">
            {TABS.map((t) => (
              <button
                key={t.key}
                className={`flex items-center gap-2 px-6 py-3 font-semibold text-base transition-all duration-200
                  ${
                    tab === t.key
                      ? "bg-gradient-to-r from-blue-500 to-blue-400 text-gray-900 shadow-lg scale-105"
                      : "text-blue-700 hover:bg-blue-100/60"
                  }`}
                onClick={() => setTab(t.key)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search form */}
        <div
          className="bg-white/60 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row gap-3 items-center max-w-3xl mx-auto
          animate-fade-in"
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
            border: "1.5px solid rgba(30, 64, 175, 0.18)",
          }}
        >
          {/* Điểm đi */}
          <div className="flex items-center gap-2 flex-1 w-full">
            <FiMap className="text-blue-500" />
            <input
              type="text"
              className="w-full px-2 py-2 rounded-md outline-none text-gray-900 bg-transparent placeholder:text-blue-400"
              placeholder={
                tab === "flight"
                  ? "Từ (VD: TP HCM)"
                  : "Nhập điểm đến, khách sạn..."
              }
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          {/* Điểm đến */}
          {tab === "flight" && (
            <div className="flex items-center gap-2 flex-1 w-full">
              <FiMap className="text-blue-500" />
              <input
                type="text"
                className="w-full px-2 py-2 rounded-md outline-none text-gray-900 bg-transparent placeholder:text-blue-400"
                placeholder="Đến (VD: Hà Nội)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          )}
          {/* Ngày */}
          <div className="flex items-center gap-2 flex-1 w-full">
            <FiCalendar className="text-blue-500" />
            <input
              type="date"
              className="w-full px-2 py-2 rounded-md outline-none text-gray-900 bg-transparent"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* Số khách */}
          <div className="flex items-center gap-2 flex-1 w-full">
            <FiUser className="text-blue-500" />
            <input
              type="number"
              min={1}
              className="w-full px-2 py-2 rounded-md outline-none text-gray-900 bg-transparent"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </div>
          {/* Nút tìm kiếm */}
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg"
            onClick={handleSearch}
          >
            <FiSearch />
            Tìm kiếm
          </button>
        </div>
      </div>
      {/* Hiệu ứng fade-in (bạn thêm vào globals.css hoặc tailwind.config.js) */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
