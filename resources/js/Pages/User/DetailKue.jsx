import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Star, MessageCircle, Plus, Crown, Percent, Tag } from "lucide-react";
import Navbar from "../../Components/User/Navbar";
import { formatNumber } from "../../utils/currency";

export default function DetailKue({ product }) {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    product = product || {
        name: "Kue Coklat Lumer",
        description:
            "Kue coklat lumer dengan topping almond, cocok untuk segala suasana.",
        price: 25000,
        image: "https://source.unsplash.com/400x300/?cake,chocolate",
        average_rating: 0,
        review_count: 0,
    };

    useEffect(() => {
        if (product.id) {
            fetchTestimonials();
        } else {
            setLoading(false);
        }
    }, [product.id]);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(
                `/api/testimonials/product/${product.id}`
            );
            const data = await response.json();
            setTestimonials(data.data || []);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < Math.floor(rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                }`}
            />
        ));
    };
    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="max-w-3xl mx-auto py-12 px-4">
                <nav className="text-sm mb-4 text-gray-500">
                    <Link href="/" className="hover:text-pink-700">
                        Home
                    </Link>{" "}
                    <span className="mx-2">/</span>{" "}
                    <Link href="/daftar-kue" className="hover:text-pink-700">
                        Daftar Kue
                    </Link>{" "}
                    <span className="mx-2">/</span> {product.name}
                </nav>
                <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-pink-100 relative">
                    {/* Best Seller Badge */}
                    {product.is_best_seller && (
                        <div className="absolute top-4 left-4 z-10">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                <Crown className="w-4 h-4" />
                                Best Seller
                            </div>
                        </div>
                    )}

                    {/* Promo Badge */}
                    {product.has_promo && product.promo_discount > 0 && (
                        <div
                            className={`absolute top-4 z-10 ${
                                product.is_best_seller ? "right-4" : "left-4"
                            }`}
                        >
                            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                                <Percent className="w-4 h-4" />
                                Promo Aktif
                            </div>
                        </div>
                    )}

                    <img
                        src={
                            product.image
                                ? `/storage/${product.image}`
                                : "https://source.unsplash.com/400x300/?cake"
                        }
                        alt={product.name}
                        className="h-64 w-full md:w-1/2 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none transition-opacity duration-500"
                    />
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="font-semibold text-2xl text-pink-700 mb-2 flex items-center gap-2">
                            {product.name}
                            {product.is_best_seller && (
                                <Crown className="w-6 h-6 text-yellow-500" />
                            )}
                        </div>
                        <div className="mb-4">
                            {product.has_promo && product.promo_discount > 0 ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-2xl font-bold">
                                            Rp{" "}
                                            {formatNumber(
                                                product.discounted_price
                                            )}
                                        </span>
                                        <Tag className="w-5 h-5 text-red-500" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg text-gray-500 line-through">
                                            Rp {formatNumber(product.price)}
                                        </span>
                                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                            Hemat Rp{" "}
                                            {formatNumber(
                                                product.promo_discount
                                            )}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-2xl font-bold">
                                    Rp {formatNumber(product.price)}
                                </span>
                            )}
                        </div>

                        {/* Rating Section */}
                        {product.review_count > 0 && (
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex items-center">
                                    {renderStars(product.average_rating)}
                                </div>
                                <span className="text-gray-600 text-sm">
                                    {Number(product.average_rating).toFixed(1)}{" "}
                                    / 5
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="text-gray-600 text-sm">
                                    {product.review_count} ulasan
                                </span>
                            </div>
                        )}
                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700 mb-1">
                                Deskripsi
                            </h3>
                            <p className="text-gray-500">
                                {product.description}
                            </p>
                        </div>
                        <div className="mb-6">
                            <h3 className="font-semibold text-gray-700 mb-1">
                                Info & Kontak Admin
                            </h3>
                            <ul className="text-gray-500 text-sm list-disc list-inside space-y-1">
                                <li>
                                    Alamat: Kp.bugel rt.01/rw.01,
                                    Desa.pakutandang kec.ciparay
                                </li>
                                <li>
                                    WA Admin:{" "}
                                    <a
                                        href="https://wa.me/62882002816754"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:underline"
                                    >
                                        0882002816754
                                    </a>
                                </li>
                                <li>
                                    Menerima pesanan dadakan (tart maksimal H-1,
                                    bolu bisa dadakan jika memungkinkan)
                                </li>
                                <li>
                                    Untuk info lebih lanjut atau custom kue,
                                    silakan chat admin via WhatsApp.
                                </li>
                            </ul>
                            <div className="mt-3 text-pink-700 font-bold">
                                Yuracake
                            </div>
                            <div className="text-gray-600 italic">
                                Mutiara berkue - Jadikan kue teman di hari
                                specialmu dan teman untuk mood mu
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={`/pesan?product_id=${product.id}`}
                                className="flex-1 px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition text-center text-lg font-semibold"
                            >
                                Pesan Sekarang
                            </Link>
                            <Link
                                href={`/testimonial?product_id=${product.id}`}
                                className="px-4 py-3 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition flex items-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    Testimoni
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                {product.id && (
                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-pink-700">
                                Ulasan Produk
                            </h3>
                            <Link
                                href={`/testimonial?product_id=${product.id}`}
                                className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
                            >
                                <Plus className="w-4 h-4" />
                                Tulis Ulasan
                            </Link>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-gray-200 rounded-lg p-4">
                                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : testimonials.length > 0 ? (
                            <div className="space-y-4">
                                {testimonials.map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="bg-gray-50 rounded-lg p-6 border"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {testimonial.customer_name}
                                                </h4>
                                                <div className="flex items-center mt-1">
                                                    {renderStars(
                                                        testimonial.rating
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(
                                                    testimonial.created_at
                                                ).toLocaleDateString("id-ID")}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {testimonial.message}
                                        </p>
                                    </div>
                                ))}

                                {testimonials.length >= 10 && (
                                    <div className="text-center mt-6">
                                        <p className="text-gray-600">
                                            Menampilkan 10 ulasan terbaru
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">
                                    Belum ada ulasan untuk produk ini
                                </p>
                                <Link
                                    href={`/testimonial?product_id=${product.id}`}
                                    className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
                                >
                                    Berikan Ulasan Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
}
