import { Cake, Truck, Sparkles } from "lucide-react";
import React from "react";

const items = [
    {
        icon: Cake,
        title: "Bahan Premium",
        desc: "Menggunakan bahan berkualitas tinggi untuk rasa terbaik.",
    },
    {
        icon: Truck,
        title: "Pengiriman Cepat",
        desc: "Pesanan Anda diantar dengan cepat dan aman.",
    },
    {
        icon: Sparkles,
        title: "Banyak Pilihan",
        desc: "Tersedia berbagai varian kue kekinian dan klasik.",
    },
];

export default function Keunggulan() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-800 mb-12">
                    Kenapa Pilih Kami?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center p-8 bg-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
                        >
                            <div className="text-pink-600 mb-4">
                                <item.icon className="w-12 h-12" />
                            </div>
                            <h3 className="font-semibold text-xl text-pink-700 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
