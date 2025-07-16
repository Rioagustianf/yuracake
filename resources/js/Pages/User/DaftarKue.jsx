import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import Navbar from "../../Components/User/Navbar";

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
                            <img
                                src={
                                    kue.image
                                        ? `/storage/${kue.image}`
                                        : "https://source.unsplash.com/400x300/?cake"
                                }
                                alt={kue.name}
                                className="h-48 w-full object-cover rounded-t-2xl group-hover:opacity-90 transition-opacity duration-300"
                            />
                            {/* Optional: Best Seller tag if needed */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="font-semibold text-lg text-pink-700 mb-1">
                                    {kue.name}
                                </div>
                                <p className="text-gray-500 flex-1 mb-2">
                                    {kue.description}
                                </p>
                                <div className="font-bold text-gray-800 mb-3">
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">
                                        Rp{" "}
                                        {Number(kue.price).toLocaleString(
                                            "id-ID"
                                        )}
                                    </span>
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
