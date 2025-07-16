import React from "react";
import { Link } from "@inertiajs/inertia-react";
import Navbar from "../../Components/User/Navbar";

export default function DetailKue({ product }) {
    product = product || {
        name: "Kue Coklat Lumer",
        description:
            "Kue coklat lumer dengan topping almond, cocok untuk segala suasana.",
        price: 25000,
        image: "https://source.unsplash.com/400x300/?cake,chocolate",
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
                <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-pink-100">
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
                        <div className="font-semibold text-2xl text-pink-700 mb-2">
                            {product.name}
                        </div>
                        <div className="mb-4">
                            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded text-lg font-bold">
                                Rp{" "}
                                {Number(product.price).toLocaleString("id-ID")}
                            </span>
                        </div>
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
                        <Link
                            href={`/pesan?product_id=${product.id}`}
                            className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition text-center text-lg font-semibold"
                        >
                            Pesan Sekarang
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
