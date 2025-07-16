import React from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";

export default function Laporan({ orders = [] }) {
    const totalPenjualan = orders.reduce(
        (sum, order) => sum + Number(order.total_price),
        0
    );
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-pink-700 mb-6">
                Laporan Penjualan
            </h1>
            <div className="flex justify-end mb-4">
                <a
                    href="/admin/laporan/export"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition font-semibold w-full sm:w-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Export ke Excel
                </a>
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
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="*:text-gray-900 *:first:font-medium"
                            >
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {new Date(order.created_at).toLocaleString(
                                        "id-ID"
                                    )}
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
                                    {Number(order.total_price).toLocaleString(
                                        "id-ID"
                                    )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {order.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-right font-bold text-lg text-pink-700">
                Total Penjualan: Rp {totalPenjualan.toLocaleString("id-ID")}
            </div>
        </AdminLayout>
    );
}
