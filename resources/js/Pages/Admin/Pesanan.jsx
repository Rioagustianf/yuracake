import React, { useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { Inertia } from "@inertiajs/inertia";

const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    processing: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Dikonfirmasi" },
    { value: "processing", label: "Diproses" },
    { value: "delivered", label: "Dikirim" },
    { value: "cancelled", label: "Dibatalkan" },
];

export default function Pesanan({ orders = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const openModal = (order) => {
        console.log("openModal order", order);
        setSelectedOrder(order);
        setNewStatus(order.status);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
        setNewStatus("");
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("handleUpdate selectedOrder", selectedOrder);
        const url = "/admin/pesanan/" + selectedOrder?.id;
        console.log("handleUpdate URL", url);
        if (!selectedOrder || !selectedOrder.id) {
            alert("ID pesanan tidak ditemukan! Silakan refresh halaman.");
            console.error("selectedOrder", selectedOrder);
            return;
        }
        setLoading(true);
        Inertia.put(
            url,
            { status: newStatus },
            {
                onFinish: () => setLoading(false),
                onSuccess: closeModal,
            }
        );
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold text-pink-700 mb-6">
                Kelola Pesanan
            </h1>
            <div className="overflow-x-auto rounded-xl shadow bg-white">
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm md:text-base">
                    <thead className="ltr:text-left rtl:text-right bg-pink-50">
                        <tr className="*:font-medium *:text-gray-900">
                            <th className="px-3 py-2 whitespace-nowrap">
                                Nama
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Produk
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Jumlah
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Metode
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Status
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="*:text-gray-900 *:first:font-medium hover:bg-pink-50 transition"
                            >
                                <td className="px-3 py-2 whitespace-nowrap font-semibold text-pink-700">
                                    {order.customer_name}
                                </td>
                                <td
                                    className="px-3 py-2 whitespace-nowrap max-w-xs truncate"
                                    title={order.order_items
                                        ?.map((i) => i.product?.name)
                                        .join(", ")}
                                >
                                    {order.order_items
                                        ?.map((i) => i.product?.name)
                                        .join(", ")}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {order.order_items?.reduce(
                                        (sum, i) => sum + Number(i.quantity),
                                        0
                                    )}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    {order.payment_method?.toUpperCase()}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            statusColor[order.status] ||
                                            "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                    <button
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        onClick={() =>
                                            order.id && openModal(order)
                                        }
                                        disabled={!order.id}
                                    >
                                        Ubah Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Modal Ubah Status */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
                    <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 w-full max-w-md relative animate-fade-in max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-pink-700">
                            Ubah Status Pesanan
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Status Baru
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                    value={newStatus}
                                    onChange={(e) =>
                                        setNewStatus(e.target.value)
                                    }
                                    required
                                >
                                    {statusOptions.map((opt) => (
                                        <option
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="button"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold"
                                disabled={loading}
                                onClick={handleUpdate}
                            >
                                {loading ? "Menyimpan..." : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
