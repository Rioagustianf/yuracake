import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const steps = [
    {
        icon: "🛒",
        title: "Pilih Kue",
        desc: "Lihat dan pilih kue favorit Anda di daftar kue Yuracake.",
    },
    {
        icon: "📝",
        title: "Isi Formulir & Konsultasi",
        desc: "Isi data pesanan, konsultasi via WhatsApp untuk tanya harga, jenis kue, atau custom model. Model kue bisa bawa sendiri!",
    },
    {
        icon: "⏰",
        title: "Pesanan Dadakan & Jadwal",
        desc: "Menerima pesanan dadakan (tart maksimal H-1, bolu bisa dadakan jika memungkinkan).",
    },
    {
        icon: "✅",
        title: "Konfirmasi & Nikmati",
        desc: "Tunggu konfirmasi admin, pesanan diproses, dan nikmati kue di hari spesialmu!",
    },
];

export default function CaraPemesanan() {
    const [openIdx, setOpenIdx] = useState(null);
    const toggle = (idx) => setOpenIdx(openIdx === idx ? null : idx);
    return (
        <section className="py-12 bg-pink-300/30">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-center text-pink-700 mb-8">
                    Cara Pemesanan
                </h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="border border-pink-200 rounded-xl shadow bg-pink-50"
                        >
                            <button
                                type="button"
                                onClick={() => toggle(idx)}
                                className="w-full flex items-center justify-between px-6 py-4 focus:outline-none group"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">
                                        {step.icon}
                                    </span>
                                    <span className="font-semibold text-lg text-pink-700 group-hover:underline">
                                        {step.title}
                                    </span>
                                </div>
                                {openIdx === idx ? (
                                    <ChevronUp className="w-6 h-6 text-pink-500" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-pink-500" />
                                )}
                            </button>
                            {openIdx === idx && (
                                <div className="px-6 pb-4 text-gray-700 animate-fade-in">
                                    {step.desc}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
