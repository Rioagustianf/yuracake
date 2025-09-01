import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Percent, Tag } from "lucide-react";
import { formatNumber } from "../../utils/currency";

export default function ProdukUnggulan() {
    const [produkList, setProdukList] = useState([]);
    useEffect(() => {
        fetch("/api/produk-unggulan")
            .then((res) => res.json())
            .then((data) => setProdukList(data));
    }, []);
    return (
        <section className="py-12 bg-pink-300/30">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-pink-700 mb-8">
                    Produk Unggulan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {produkList.map((produk, idx) => (
                        <div
                            key={produk.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col relative"
                        >
                            {/* Promo Badge */}
                            {produk.has_promo && produk.promo_discount > 0 && (
                                <div className="absolute top-2 left-2 z-10">
                                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Percent className="w-3 h-3" />
                                        Promo
                                    </div>
                                </div>
                            )}

                            <img
                                src={`/storage/${produk.image}`}
                                alt={produk.name}
                                className="h-48 w-full object-cover"
                            />
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="font-semibold text-lg text-pink-700 mb-1">
                                    {produk.name}
                                </div>
                                <div className="font-bold text-gray-800 mb-2">
                                    {produk.has_promo &&
                                    produk.promo_discount > 0 ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg text-red-600">
                                                    Rp{" "}
                                                    {formatNumber(
                                                        produk.discounted_price
                                                    )}
                                                </span>
                                                <Tag className="w-4 h-4 text-red-500" />
                                            </div>
                                            <div className="text-sm text-gray-500 line-through">
                                                Rp {formatNumber(produk.price)}
                                            </div>
                                        </div>
                                    ) : (
                                        <span>
                                            Rp {formatNumber(produk.price)}
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href={`/kue/${produk.id}`}
                                    className="mt-auto px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition text-center"
                                >
                                    Lihat Detail
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
