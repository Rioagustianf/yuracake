import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "../../Components/User/Navbar";
import { Star, MessageCircle, User, Mail, Package } from "lucide-react";

export default function TestimonialForm({ product, products }) {
    const [form, setForm] = useState({
        customer_name: "",
        customer_email: "",
        message: "",
        rating: 5,
        product_id: product?.id || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setError((err) => ({ ...err, [name]: false }));
    };

    const handleRatingClick = (rating) => {
        setForm((f) => ({ ...f, rating }));
        setError((err) => ({ ...err, rating: false }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post("/testimonial", form, {
            onFinish: () => setLoading(false),
            onError: (err) => setError(err),
        });
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="max-w-2xl mx-auto py-12 px-4">
                <nav className="text-sm mb-6 text-gray-500">
                    <a href="/" className="hover:text-pink-700">
                        Home
                    </a>{" "}
                    <span className="mx-2">/</span> Testimoni
                </nav>

                <div className="bg-pink-50 rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 text-pink-700 mb-4">
                            <MessageCircle className="w-8 h-8" />
                            <h1 className="text-3xl font-bold">
                                Berikan Testimoni
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Bagikan pengalaman Anda dengan produk YuraCake!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Customer Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <User className="w-4 h-4 inline mr-2" />
                                Nama Lengkap *
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={form.customer_name}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan nama lengkap Anda"
                                className={`w-full px-4 py-3 border ${
                                    error.customer_name
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg focus:ring-pink-500 focus:border-pink-500 transition`}
                            />
                            {error.customer_name && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error.customer_name}
                                </div>
                            )}
                        </div>

                        {/* Customer Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email (Opsional)
                            </label>
                            <input
                                type="email"
                                name="customer_email"
                                value={form.customer_email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className={`w-full px-4 py-3 border ${
                                    error.customer_email
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg focus:ring-pink-500 focus:border-pink-500 transition`}
                            />
                            {error.customer_email && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error.customer_email}
                                </div>
                            )}
                        </div>

                        {/* Product Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Package className="w-4 h-4 inline mr-2" />
                                Produk (Opsional)
                            </label>
                            <select
                                name="product_id"
                                value={form.product_id}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${
                                    error.product_id
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg focus:ring-pink-500 focus:border-pink-500 transition`}
                            >
                                <option value="">
                                    Pilih produk (opsional)
                                </option>
                                {products?.map((prod) => (
                                    <option key={prod.id} value={prod.id}>
                                        {prod.name}
                                    </option>
                                ))}
                            </select>
                            {error.product_id && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error.product_id}
                                </div>
                            )}
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rating *
                            </label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => handleRatingClick(star)}
                                        className={`p-1 transition-colors ${
                                            star <= form.rating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        } hover:text-yellow-400`}
                                    >
                                        <Star
                                            className="w-8 h-8"
                                            fill={
                                                star <= form.rating
                                                    ? "currentColor"
                                                    : "none"
                                            }
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-gray-600">
                                    ({form.rating} bintang)
                                </span>
                            </div>
                            {error.rating && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error.rating}
                                </div>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Testimoni *
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                placeholder="Ceritakan pengalaman Anda dengan produk YuraCake..."
                                className={`w-full px-4 py-3 border ${
                                    error.message
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg focus:ring-pink-500 focus:border-pink-500 transition resize-none`}
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Minimal 10 karakter, maksimal 1000 karakter
                            </div>
                            {error.message && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error.message}
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-pink-600 hover:bg-pink-700"
                                } text-white`}
                            >
                                {loading ? "Mengirim..." : "Kirim Testimoni"}
                            </button>
                            <a
                                href="/"
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-semibold text-center"
                            >
                                Kembali
                            </a>
                        </div>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-700">
                            <strong>Catatan:</strong> Testimoni Anda akan
                            ditinjau oleh admin sebelum ditampilkan di website.
                            Terima kasih atas partisipasi Anda!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
