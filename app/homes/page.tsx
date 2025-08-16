import Head from "next/head";
import HeroSection from "../components/home/HeroSection";
import ServicesGrid from "../components/home/ServicesGrid";
import Promotions from "../components/home/Promotion";
import Destinations from "../components/home/DestinationSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>
          Traveloka Clone - Đặt phòng khách sạn, vé máy bay trực tuyến
        </title>
        <meta
          name="description"
          content="Đặt phòng khách sạn, vé máy bay, combo du lịch và hoạt động giải trí với giá tốt nhất"
        />
      </Head>

      <main className="flex-grow">
        <Banner />
        {/* <HeroSection /> */} {/* Xóa dòng này nếu muốn thay thế hoàn toàn */}
        <ServicesGrid />
        <Promotions />
        <Destinations />
      </main>
    </div>
  );
}
