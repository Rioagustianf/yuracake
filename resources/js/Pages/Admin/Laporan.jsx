import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Filter, Download, FileText } from "lucide-react";
import AdminLayout from "../../Components/Admin/AdminLayout";

export default function Laporan({ orders = [], filter = "all" }) {
    const [selectedFilter, setSelectedFilter] = useState(filter);
    const [isLoading, setIsLoading] = useState(false);

    const totalPenjualan = orders.reduce(
        (sum, order) => sum + Number(order.total_price),
        0
    );

    const handleFilterChange = (newFilter) => {
        setSelectedFilter(newFilter);
        setIsLoading(true);
        Inertia.get(
            "/admin/laporan",
            { filter: newFilter },
            {
                preserveState: true,
                replace: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    const getFilterLabel = (filterType) => {
        switch (filterType) {
            case "daily":
                return `Hari Ini (${new Date().toLocaleDateString("id-ID")})`;
            case "weekly":
                const startOfWeek = new Date();
                startOfWeek.setDate(
                    startOfWeek.getDate() - startOfWeek.getDay()
                );
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 6);
                return `Minggu Ini (${startOfWeek.toLocaleDateString(
                    "id-ID"
                )} - ${endOfWeek.toLocaleDateString("id-ID")})`;
            case "monthly":
                const currentMonth = new Date().toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                });
                return `Bulan Ini (${currentMonth})`;
            default:
                return "Semua Waktu";
        }
    };

    const getExportUrl = () => {
        return `/admin/laporan/export?filter=${selectedFilter}`;
    };

    const getExportPdfUrl = () => {
        return `/admin/laporan/export-pdf?filter=${selectedFilter}`;
    };

    return (
        <AdminLayout>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h1 className="text-2xl font-bold text-pink-700 mb-4 sm:mb-0">
                    Laporan Penjualan
                </h1>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    {/* Filter Dropdown */}
                    <div className="relative">
                        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
                            <Filter size={16} className="text-gray-500" />
                            <select
                                value={selectedFilter}
                                onChange={(e) =>
                                    handleFilterChange(e.target.value)
                                }
                                disabled={isLoading}
                                className="appearance-none bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 font-medium disabled:opacity-50"
                            >
                                <option value="all">Semua Waktu</option>
                                <option value="daily">Hari Ini</option>
                                <option value="weekly">Minggu Ini</option>
                                <option value="monthly">Bulan Ini</option>
                            </select>
                        </div>
                    </div>

                    {/* Export Buttons */}
                    <div className="flex gap-2">
                        <a
                            href={getExportUrl()}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-semibold"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Download size={16} />
                            Excel
                        </a>
                        <a
                            href={getExportPdfUrl()}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition font-semibold"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FileText size={16} />
                            PDF
                        </a>
                    </div>
                </div>
            </div>

            {/* Filter Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800 font-medium">
                        Menampilkan: {getFilterLabel(selectedFilter)}
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="text-blue-600 font-medium">
                            Total Pesanan
                        </div>
                        <div className="text-blue-800 text-lg font-bold">
                            {orders.length}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="text-blue-600 font-medium">
                            Total Penjualan
                        </div>
                        <div className="text-blue-800 text-lg font-bold">
                            Rp {totalPenjualan.toLocaleString("id-ID")}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-200">
                        <div className="text-blue-600 font-medium">
                            Rata-rata per Pesanan
                        </div>
                        <div className="text-blue-800 text-lg font-bold">
                            {orders.length > 0
                                ? `Rp ${Math.round(
                                      totalPenjualan / orders.length
                                  ).toLocaleString("id-ID")}`
                                : "Rp 0"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto mb-6 rounded-xl shadow bg-white">
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm md:text-base">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="*:font-medium *:text-gray-900">
                            <th className="px-3 py-2 whitespace-nowrap">
                                Tanggal
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Nama Customer
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                No HP
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Alamat
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Total
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-3 py-8 text-center text-gray-500"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600"></div>
                                        Memuat data...
                                    </div>
                                </td>
                            </tr>
                        ) : orders.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="*:text-gray-900 *:first:font-medium"
                                >
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {order.customer_name}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {order.customer_phone}
                                    </td>
                                    <td
                                        className="px-3 py-2 whitespace-nowrap max-w-xs truncate"
                                        title={order.customer_address}
                                    >
                                        {order.customer_address}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        Rp{" "}
                                        {Number(
                                            order.total_price
                                        ).toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                order.status === "delivered"
                                                    ? "bg-green-100 text-green-800"
                                                    : order.status ===
                                                      "processing"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : order.status ===
                                                      "confirmed"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : order.status ===
                                                      "cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-3 py-8 text-center text-gray-500"
                                >
                                    Tidak ada data pesanan untuk periode yang
                                    dipilih
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
