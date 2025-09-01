import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Percent, Gift, Clock, Tag } from "lucide-react";
import { formatNumber } from "../../utils/currency";

export default function PromoSection() {
    const [promos, setPromos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/promos/featured")
            .then((res) => res.json())
            .then((data) => {
                setPromos(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching promos:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-gradient-to-br from-red-50 to-pink-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow-md p-6"
                                    >
                                        <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (promos.length === 0) {
        return null; // Don't show section if no promos
    }

    const formatDiscount = (promo) => {
        if (promo.discount_type === "percentage") {
            return `${promo.discount_value}%`;
        } else {
            return `Rp ${formatNumber(promo.discount_value)}`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <section className="py-12 bg-gradient-to-br from-red-50 to-pink-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-full">
                            <Gift className="w-6 h-6 text-red-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-red-700">
                            Promo Spesial
                        </h2>
                        <div className="p-2 bg-red-100 rounded-full">
                            <Percent className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Jangan lewatkan penawaran terbaik kami! Nikmati diskon
                        menarik untuk kue-kue pilihan
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promos.map((promo) => (
                        <div
                            key={promo.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-red-200 relative"
                        >
                            {/* Promo Badge */}
                            <div className="absolute top-2 right-2 z-10">
                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                    <Tag className="w-3 h-3" />
                                    {formatDiscount(promo)}
                                </div>
                            </div>

                            {/* Promo Image */}
                            {promo.image ? (
                                <img
                                    src={`/storage/${promo.image}`}
                                    alt={promo.title}
                                    className="h-40 w-full object-cover"
                                />
                            ) : (
                                <div className="h-40 w-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                                    <Gift className="w-16 h-16 text-red-400" />
                                </div>
                            )}

                            <div className="p-6">
                                <h3 className="font-bold text-lg text-red-700 mb-2">
                                    {promo.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {promo.description}
                                </p>

                                {/* Promo Details */}
                                <div className="space-y-2 mb-4">
                                    {promo.min_purchase > 0 && (
                                        <div className="text-xs text-gray-500">
                                            Min. pembelian: Rp{" "}
                                            {formatNumber(promo.min_purchase)}
                                        </div>
                                    )}

                                    {promo.max_discount &&
                                        promo.discount_type ===
                                            "percentage" && (
                                            <div className="text-xs text-gray-500">
                                                Maks. diskon: Rp{" "}
                                                {formatNumber(
                                                    promo.max_discount
                                                )}
                                            </div>
                                        )}

                                    {promo.promo_code && (
                                        <div className="text-xs text-blue-600 font-mono bg-blue-50 px-2 py-1 rounded">
                                            Kode: {promo.promo_code}
                                        </div>
                                    )}
                                </div>

                                {/* Countdown */}
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                        Berlaku sampai{" "}
                                        {formatDate(promo.end_date)}
                                    </span>
                                </div>

                                {/* Products covered */}
                                {promo.products && promo.products.length > 0 ? (
                                    <div className="text-xs text-green-600 mb-4">
                                        Berlaku untuk {promo.products.length}{" "}
                                        produk pilihan
                                    </div>
                                ) : (
                                    <div className="text-xs text-green-600 mb-4">
                                        Berlaku untuk semua produk
                                    </div>
                                )}

                                <Link
                                    href="/daftar-kue"
                                    className="block w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-center font-medium"
                                >
                                    Belanja Sekarang
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/daftar-kue"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        <Gift className="w-4 h-4" />
                        Lihat Semua Produk
                    </Link>
                </div>
            </div>
        </section>
    );
}
