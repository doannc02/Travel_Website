// app/admin/bookings/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Types
type PackageBooking = {
  id: string;
  bookingCode: string;
  packageId: number;
  participants: number;
  totalPrice: number;
  status: string;
  selectedDate?: string | null;
  specialRequests?: string | null;
  contactInfo?: string | null;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; name: string; email: string };
  package?: { id: number; title: string };
};

type BookingLog = {
  id: string;
  bookingId: string;
  bookingCode: string;
  action: string;
  message?: string;
  meta?: any;
  userId?: string;
  createdAt: string;
};

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<"bookings" | "logs">("bookings");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Quản lý Booking (Admin)</h1>
          <div className="space-x-2">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Về trang chính
            </Link>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow p-4">
          <nav className="flex gap-2 mb-4">
            <button
              onClick={() => setTab("bookings")}
              className={`px-4 py-2 rounded ${
                tab === "bookings" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setTab("logs")}
              className={`px-4 py-2 rounded ${
                tab === "logs" ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              Logs
            </button>
          </nav>

          {tab === "bookings" ? <BookingsTab /> : <LogsTab />}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BookingsTab                                 */
/* -------------------------------------------------------------------------- */

function BookingsTab() {
  const [bookings, setBookings] = useState<PackageBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PackageBooking | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/bookings?q=${encodeURIComponent(q)}&page=${page}`
      );
      const json = await res.json();
      setBookings(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [q, page]);

  const openDetail = (b: PackageBooking) => setSelected(b);
  const closeModal = () => setSelected(null);

  const changeStatus = async (booking: PackageBooking, newStatus: string) => {
    if (
      !confirm(
        `Bạn có chắc muốn đổi trạng thái sang "${newStatus}" cho ${booking.bookingCode}?`
      )
    )
      return;
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          adminUserId: "admin-system", // thay real admin id nếu có
          previousStatus: booking.status,
          note: `Changed by admin via web`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      // refresh list
      await fetchList();
      alert("Cập nhật trạng thái thành công");
    } catch (err: any) {
      alert("Lỗi: " + err.message);
    } finally {
      setStatusUpdating(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo mã hoặc tên..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={() => fetchList()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tìm
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Mã</th>
              <th className="p-2 text-left">Tour</th>
              <th className="p-2 text-left">Khách</th>
              <th className="p-2 text-left">Ngày</th>
              <th className="p-2 text-left">Tổng</th>
              <th className="p-2 text-left">Trạng thái</th>
              <th className="p-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-4">
                  Đang tải...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4">
                  Không có booking
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id} className="border-b">
                  <td className="p-2 font-mono text-blue-600">
                    {b.bookingCode}
                  </td>
                  <td className="p-2">{b.package?.title ?? "—"}</td>
                  <td className="p-2">{b.user?.name ?? "—"}</td>
                  <td className="p-2">
                    {b.selectedDate
                      ? new Date(b.selectedDate).toLocaleDateString("vi-VN")
                      : new Date(b.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-2">
                    {new Intl.NumberFormat("vi-VN").format(b.totalPrice)}đ
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => openDetail(b)}
                      className="px-3 py-1 border rounded"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() =>
                        changeStatus(
                          b,
                          b.status === "confirmed" ? "cancelled" : "confirmed"
                        )
                      }
                      disabled={statusUpdating}
                      className="px-3 py-1 rounded bg-indigo-600 text-white"
                    >
                      {b.status === "confirmed" ? "Hủy" : "Xác nhận"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded mr-2"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-600">Trang {page}</div>
      </div>

      {selected && (
        <BookingDetailsModal bookingId={selected.id} onClose={closeModal} />
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             BookingDetailsModal                             */
/* -------------------------------------------------------------------------- */

function BookingDetailsModal({
  bookingId,
  onClose,
}: {
  bookingId: string;
  onClose: () => void;
}) {
  const [booking, setBooking] = useState<PackageBooking | null>(null);
  const [logs, setLogs] = useState<BookingLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [logMessage, setLogMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/bookings/${bookingId}`);
        const j = await res.json();
        if (!mounted) return;
        setBooking(j.booking);

        const r2 = await fetch(`/api/admin/bookings/${bookingId}/logs`);
        const ljson = await r2.json();
        setLogs(ljson.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [bookingId]);

  const addLog = async () => {
    if (!logMessage.trim()) return;
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "admin_note",
          message: logMessage,
          userId: "admin-system",
        }),
      });
      const j = await res.json();
      if (res.ok) {
        setLogs((prev) => [j.log, ...prev]);
        setLogMessage("");
      } else {
        alert("Lỗi: " + j.error);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo log");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-6 z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Chi tiết Booking</h2>
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-100">
            Đóng
          </button>
        </div>

        <div className="p-4">
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div>
                    <strong>Mã:</strong>{" "}
                    <span className="font-mono text-blue-600">
                      {booking?.bookingCode}
                    </span>
                  </div>
                  <div>
                    <strong>Tour:</strong> {booking?.package?.title}
                  </div>
                  <div>
                    <strong>Người liên hệ:</strong> {booking?.user?.name} (
                    {booking?.user?.email})
                  </div>
                  <div>
                    <strong>Số người:</strong> {booking?.participants}
                  </div>
                </div>
                <div>
                  <div>
                    <strong>Ngày:</strong>{" "}
                    {booking?.selectedDate
                      ? new Date(booking.selectedDate).toLocaleDateString(
                          "vi-VN"
                        )
                      : "—"}
                  </div>
                  <div>
                    <strong>Tổng tiền:</strong>{" "}
                    {booking
                      ? new Intl.NumberFormat("vi-VN").format(
                          booking.totalPrice
                        ) + "đ"
                      : "—"}
                  </div>
                  <div>
                    <strong>Trạng thái:</strong> {booking?.status}
                  </div>
                </div>
              </div>

              {booking?.specialRequests && (
                <div className="mt-4 border-t pt-3">
                  <strong>Yêu cầu:</strong>
                  <p>{booking.specialRequests}</p>
                </div>
              )}

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Logs</h4>
                <div className="space-y-3 max-h-48 overflow-auto">
                  {logs.length === 0 ? (
                    <div className="text-sm text-gray-500">Chưa có log</div>
                  ) : (
                    logs.map((l) => (
                      <div key={l.id} className="p-2 border rounded">
                        <div className="text-xs text-gray-500">
                          {new Date(l.createdAt).toLocaleString()}
                        </div>
                        <div className="text-sm">
                          <strong>{l.action}</strong> — {l.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    value={logMessage}
                    onChange={(e) => setLogMessage(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Ghi chú / log..."
                  />
                  <button
                    onClick={addLog}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Thêm log
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                     LogsTab                                 */
/* -------------------------------------------------------------------------- */

function LogsTab() {
  const [logs, setLogs] = useState<BookingLog[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecentLogs = async () => {
    setLoading(true);
    try {
      // không có route tổng logs? ta có thể gọi bookings list then logs per booking.
      // Nếu muốn, có thể thêm API /api/admin/logs để list tất cả logs. Giờ gọi DB thông qua route này không khả thi.
      // Tạm: giả sử có endpoint /api/admin/logs (nếu bạn thêm) — mình cung cấp sample below.
      const res = await fetch(`/api/admin/logs?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      setLogs(json.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo booking code hoặc action..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={fetchRecentLogs}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tìm
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div>Đang tải logs...</div>
        ) : logs.length === 0 ? (
          <div>Không có log</div>
        ) : (
          logs.map((l) => (
            <div key={l.id} className="p-3 bg-gray-50 border rounded">
              <div className="flex justify-between">
                <div className="text-sm font-mono">{l.bookingCode}</div>
                <div className="text-xs text-gray-500">
                  {new Date(l.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="mt-1">
                <strong>{l.action}</strong> — {l.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
