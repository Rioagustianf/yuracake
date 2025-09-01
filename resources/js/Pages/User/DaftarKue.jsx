import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Navbar from "../../Components/User/Navbar";
import { Crown, Star, Percent, Tag } from "lucide-react";
import { formatNumber } from "../../utils/currency";

export default function DaftarKue(props) {
    const products = props.products || [];
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="max-w-6xl mx-auto py-12 px-4">
                <nav className="text-sm mb-4 text-gray-500">
                    <Link href="/" className="hover:text-pink-700">
                        Home
                    </Link>{" "}
                    <span className="mx-2">/</span> Daftar Kue
                </nav>
                <h1 className="text-3xl font-bold text-pink-700 mb-2 text-center">
                    Daftar Kue
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Pilih kue favoritmu dan pesan dengan mudah!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((kue, idx) => (
                        <div
                            key={kue.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-2xl border border-transparent hover:border-pink-300 transition-all group relative"
                        >
                            {/* Best Seller Badge */}
                            {kue.is_best_seller && (
                                <div className="absolute top-3 left-3 z-10">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                        <Crown className="w-3 h-3" />
                                        Best Seller
                                    </div>
                                </div>
                            )}

                            {/* Promo Badge */}
                            {kue.has_promo && kue.promo_discount > 0 && (
                                <div
                                    className={`absolute top-3 z-10 ${
                                        kue.is_best_seller
                                            ? "right-3"
                                            : "left-3"
                                    }`}
                                >
                                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                        <Percent className="w-3 h-3" />
                                        Promo
                                    </div>
                                </div>
                            )}

                            <img
                                src={
                                    kue.image
                                        ? `/storage/${kue.image}`
                                        : "https://source.unsplash.com/400x300/?cake"
                                }
                                alt={kue.name}
                                className="h-48 w-full object-cover rounded-t-2xl group-hover:opacity-90 transition-opacity duration-300"
                            />

                            <div className="p-5 flex-1 flex flex-col">
                                <div className="font-semibold text-lg text-pink-700 mb-1">
                                    {kue.name}
                                    {kue.is_best_seller && (
                                        <Crown className="w-4 h-4 text-yellow-500 inline ml-2" />
                                    )}
                                </div>
                                <p className="text-gray-500 flex-1 mb-2">
                                    {kue.description}
                                </p>

                                {/* Rating display */}
                                {kue.average_rating > 0 && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i <
                                                        Math.floor(
                                                            kue.average_rating
                                                        )
                                                            ? "text-yellow-400 fill-current"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600">
                                            ({kue.review_count} ulasan)
                                        </span>
                                    </div>
                                )}

                                <div className="font-bold text-xl text-gray-800 mb-4">
                                    {kue.has_promo && kue.promo_discount > 0 ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-lg font-bold">
                                                    Rp{" "}
                                                    {formatNumber(
                                                        kue.discounted_price
                                                    )}
                                                </span>
                                                <Tag className="w-4 h-4 text-red-500" />
                                            </div>
                                            <div className="text-sm text-gray-500 line-through">
                                                Rp {formatNumber(kue.price)}
                                            </div>
                                            <div className="text-xs text-red-600 font-medium">
                                                Hemat Rp{" "}
                                                {formatNumber(
                                                    kue.promo_discount
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-lg">
                                            Rp {formatNumber(kue.price)}
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href={`/kue/${kue.id}`}
                                    className="mt-auto px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition text-center text-base font-semibold"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
