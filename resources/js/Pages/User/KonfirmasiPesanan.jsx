import React from "react";
import Navbar from "../../Components/User/Navbar";
import { Link } from "@inertiajs/inertia-react";

export default function KonfirmasiPesanan({ order }) {
    if (!order) return null;
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="flex items-center justify-center py-12 px-4">
                <div
                    className={`bg-pink-50 rounded-2xl shadow-lg max-w-md w-full p-8 text-center border-2 ${
                        order.payment_method === "bank_transfer"
                            ? "border-yellow-400"
                            : "border-green-400"
                    } animate-fade-in`}
                >
                    <div className="flex justify-center mb-4">
                        <svg
                            className="w-16 h-16 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                fill="#d1fae5"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12l2 2 4-4"
                                stroke="#22c55e"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-green-600">
                        Pesanan Berhasil Dikirim!
                    </h2>
                    <p className="mb-4">
                        Terima kasih telah memesan. Pesanan Anda sedang
                        diproses.
                    </p>
                    <div className="mb-4 text-left">
                        <div className="font-semibold">Detail Pesanan:</div>
                        <div>Nama: {order.customer_name}</div>
                        <div>Alamat: {order.customer_address}</div>
                        <div>No HP: {order.customer_phone}</div>
                        <div>Catatan: {order.note || "-"}</div>
                        <div className="mt-2 font-semibold">Produk:</div>
                        <ul className="list-disc list-inside text-sm">
                            {order.order_items.map((item) => (
                                <li key={item.id}>
                                    {item.product?.name} x {item.quantity} @ Rp{" "}
                                    {Number(item.unit_price).toLocaleString(
                                        "id-ID"
                                    )}{" "}
                                    = Rp{" "}
                                    {Number(item.subtotal).toLocaleString(
                                        "id-ID"
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-2 font-bold text-pink-700">
                            Total: Rp{" "}
                            {Number(order.total_price).toLocaleString("id-ID")}
                        </div>
                    </div>
                    {order.payment_method === "bank_transfer" ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
                            <div className="font-semibold mb-1">
                                Instruksi Pembayaran Transfer:
                            </div>
                            <div>
                                Silakan transfer ke rekening <b>1234567890</b>{" "}
                                (Bank ABC) sejumlah total pesanan Anda, lalu
                                kirim bukti transfer ke admin.
                            </div>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded">
                            <div className="font-semibold mb-1">
                                Pembayaran COD
                            </div>
                            <div>
                                Silakan siapkan pembayaran saat pesanan diantar
                                ke alamat Anda.
                            </div>
                        </div>
                    )}
                    <div className="mt-4 text-gray-500">
                        Admin akan segera menghubungi Anda untuk konfirmasi
                        lebih lanjut.
                    </div>
                    <Link
                        href="/"
                        className="mt-6 inline-block px-6 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition font-semibold"
                    >
                        Kembali ke Home
                    </Link>
                </div>
            </section>
        </div>
    );
}
