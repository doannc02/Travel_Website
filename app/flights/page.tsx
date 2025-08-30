// app/flights/page.tsx
interface FlightsPageProps {
  searchParams: Promise<{
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}

export default async function FlightsPage({ searchParams }: FlightsPageProps) {
  // Await searchParams để lấy dữ liệu
  const params = await searchParams;

  const destination = params?.destination ?? "";
  const checkIn = params?.checkIn ?? "";
  const checkOut = params?.checkOut ?? "";
  const guests = params?.guests ?? "";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tìm kiếm vé máy bay
          </h1>
          {destination && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Điểm đến</div>
                <div className="font-semibold">{destination}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Ngày đi</div>
                <div className="font-semibold">{checkIn}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Ngày về</div>
                <div className="font-semibold">{checkOut}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Hành khách</div>
                <div className="font-semibold">{guests}</div>
              </div>
            </div>
          )}
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✈️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Trang tìm kiếm vé máy bay
            </h2>
            <p className="text-gray-600 mb-6">
              Tính năng tìm kiếm vé máy bay sẽ được phát triển trong tương lai.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
