"use client";
import { useState } from "react";
import { FiHome, FiAirplay, FiMap, FiShield } from "react-icons/fi";

const TABS = [
  { key: "hotel", label: "Khách sạn", icon: <FiHome /> },
  { key: "flight", label: "Vé máy bay", icon: <FiAirplay /> },
  { key: "tour", label: "Tour", icon: <FiMap /> },
  { key: "insurance", label: "Bảo hiểm", icon: <FiShield /> },
];

export default function Banner() {
  const [tab, setTab] = useState("hotel");
  const [query, setQuery] = useState("");

  return (
    <section className="relative h-[480px] md:h-[560px] flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden">
      {/* Background image */}
      <img
        src="/images/hero-bg1.jpg"
        alt="banner"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-blue-700/40"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Đặt phòng khách sạn, vé máy bay, tour du lịch giá tốt
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow">
          Trải nghiệm du lịch dễ dàng, tiện lợi và an toàn cùng Traveloka Clone
        </p>

        {/* Tabs */}
        <div className="flex bg-white/90 rounded-lg shadow-lg overflow-hidden mb-4 w-full max-w-xl mx-auto">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 font-semibold text-base transition-colors ${
                tab === t.key
                  ? "bg-blue-600 text-white"
                  : "text-blue-700 hover:bg-blue-100"
              }`}
              onClick={() => setTab(t.key)}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="bg-white/95 rounded-lg shadow-lg p-4 flex gap-2 items-center max-w-xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-md outline-none text-gray-700"
            placeholder={
              tab === "hotel"
                ? "Tìm khách sạn, thành phố..."
                : tab === "flight"
                ? "Tìm chuyến bay, điểm đến..."
                : tab === "tour"
                ? "Tìm tour, điểm đến..."
                : "Tìm bảo hiểm du lịch..."
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = `/search?tab=${tab}&q=${encodeURIComponent(
                  query
                )}`;
              }
            }}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition"
            onClick={() =>
              (window.location.href = `/search?tab=${tab}&q=${encodeURIComponent(
                query
              )}`)
            }
          >
            Tìm kiếm
          </button>
        </div>
      </div>
    </section>
  );
}
