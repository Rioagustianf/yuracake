import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Star, Crown, TrendingUp } from "lucide-react";
import { formatNumber } from "../../utils/currency";

export default function BestSellers() {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/best-sellers")
            .then((res) => res.json())
            .then((data) => {
                setBestSellers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching best sellers:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="bg-white rounded-xl shadow-md p-4"
                                    >
                                        <div className="h-48 bg-gray-300 rounded mb-4"></div>
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

    if (bestSellers.length === 0) {
        return null; // Don't show section if no best sellers
    }

    return (
        <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-full">
                            <Crown className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-yellow-700">
                            Best Sellers
                        </h2>
                        <div className="p-2 bg-yellow-100 rounded-full">
                            <TrendingUp className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Kue-kue terfavorit dan paling diminati pelanggan kami
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bestSellers.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-105 transition-all duration-300 border-2 border-yellow-200 relative"
                        >
                            {/* Best Seller Badge */}
                            <div className="absolute top-2 left-2 z-10">
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                    <Crown className="w-3 h-3" />
                                    Best Seller
                                </div>
                            </div>

                            {/* Ranking Badge */}
                            {index < 3 && (
                                <div className="absolute top-2 right-2 z-10">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                            index === 0
                                                ? "bg-yellow-500"
                                                : index === 1
                                                ? "bg-gray-400"
                                                : "bg-orange-400"
                                        }`}
                                    >
                                        #{index + 1}
                                    </div>
                                </div>
                            )}

                            <img
                                src={`/storage/${product.image}`}
                                alt={product.name}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4 flex-1 flex flex-col">
                                <div className="font-semibold text-lg text-yellow-700 mb-2">
                                    {product.name}
                                </div>

                                {/* Rating display */}
                                {product.average_rating > 0 && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i <
                                                        Math.floor(
                                                            product.average_rating
                                                        )
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            ({product.review_count} ulasan)
                                        </span>
                                    </div>
                                )}

                                <div className="font-bold text-xl text-gray-800 mb-4">
                                    Rp {formatNumber(product.price)}
                                </div>

                                <Link
                                    href={`/kue/${product.id}`}
                                    className="mt-auto px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-center font-medium"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <Link
                        href="/daftar-kue"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition-colors font-medium"
                    >
                        <TrendingUp className="w-4 h-4" />
                        Lihat Semua Produk
                    </Link>
                </div>
            </div>
        </section>
    );
}
