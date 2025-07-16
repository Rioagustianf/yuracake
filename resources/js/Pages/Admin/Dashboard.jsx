import React from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

function StatCard({ title, value, icon, color }) {
    return (
        <div
            className={`flex items-center gap-4 bg-white rounded-xl shadow p-6 border-l-4 ${color}`}
        >
            <div className="text-3xl">{icon}</div>
            <div>
                <div className="text-gray-500 text-sm font-medium">{title}</div>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
            </div>
        </div>
    );
}

export default function Dashboard({
    totalProduk = 0,
    totalPesanan = 0,
    penjualanBulanIni = 0,
}) {
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-pink-700 mb-6">
                Selamat Datang, Admin!
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Total Produk"
                    value={totalProduk}
                    icon={<span>🍰</span>}
                    color="border-pink-400"
                />
                <StatCard
                    title="Pesanan Masuk"
                    value={totalPesanan}
                    icon={<span>🛒</span>}
                    color="border-yellow-400"
                />
                <StatCard
                    title="Penjualan Bulan Ini"
                    value={`Rp ${Number(penjualanBulanIni).toLocaleString(
                        "id-ID"
                    )}`}
                    icon={<span>💸</span>}
                    color="border-green-400"
                />
            </div>
            <div className="bg-white rounded-xl shadow p-4 md:p-8">
                <h2 className="text-lg font-semibold mb-2 text-pink-700">
                    Ringkasan
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                    Gunakan menu di sidebar untuk mengelola produk, pesanan, dan
                    laporan penjualan.
                </p>
            </div>
        </AdminLayout>
    );
}
