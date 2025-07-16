import { Link } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Lottie from "lottie-react";
import cakeCookiesFruit from "../../../../public/assets/cake cookies fruit.json";

export default function HeroSection() {
    const [showPopup, setShowPopup] = useState(false);
    return (
        <section className="relative bg-gradient-to-br from-pink-50 to-yellow-50 py-20 md:py-32 px-4 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-pink-800 leading-tight mb-6">
                        Yuracake
                        <br className="hidden sm:inline" />
                        <span className="text-yellow-600">Mutiara berkue</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                        Jadikan kue teman di hari specialmu dan teman untuk mood
                        mu.
                    </p>
                    <p className="text-base text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                        Menerima pesanan dadakan (khusus tart maksimal H-1, bolu
                        bisa dadakan jika memungkinkan).
                    </p>
                    <Link href="/daftar-kue">
                        <button className="px-8 py-3 text-lg bg-pink-600 hover:bg-pink-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                            Lihat Daftar Kue
                        </button>
                    </Link>
                </div>
                <div className="flex-1 flex justify-center md:justify-end">
                    <Lottie
                        animationData={cakeCookiesFruit}
                        loop={true}
                        style={{ width: 400, height: 400 }}
                    />
                </div>
            </div>
            {/* Floating WhatsApp Button */}
            <button
                onClick={() => setShowPopup(true)}
                className="fixed z-50 bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Chat WhatsApp"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.06 9.06 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.49-.85-2.05-.22-.53-.45-.46-.62-.47h-.53a1 1 0 0 0-.73.34 3 3 0 0 0-.94 2.23c0 1.31.95 2.58 1.09 2.76s1.87 2.87 4.54 3.91a6.13 6.13 0 0 0 2.84.54 2.62 2.62 0 0 0 1.7-.7 2.13 2.13 0 0 0 .47-1.53c-.07-.13-.25-.2-.53-.34Z" />
                </svg>
            </button>
            {/* Popup WhatsApp */}
            {showPopup && (
                <div className="fixed z-50 bottom-24 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-xs w-full border border-green-200 animate-fade-in flex flex-col gap-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="font-bold text-green-600 text-lg flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M20.52 3.48A12 12 0 0 0 3.48 20.52l-1.32 4.84a1 1 0 0 0 1.22 1.22l4.84-1.32A12 12 0 1 0 20.52 3.48ZM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9s-.44-.14-.62.14-.71.9-.87 1.09-.32.21-.6.07a8.18 8.18 0 0 1-2.4-1.48 9.06-9.06 0 0 1-1.67-2.07c-.17-.29 0-.44.13-.58.13-.13.29-.34.43-.51a.52.52 0 0 0 .07-.54c-.07-.14-.62-1.49-.85-2.05-.22-.53-.45-.46-.62-.47h-.53a1 1 0 0 0-.73.34 3 3 0 0 0-.94 2.23c0 1.31.95 2.58 1.09 2.76s1.87 2.87 4.54 3.91a6.13 6.13 0 0 0 2.84.54 2.62 2.62 0 0 0 1.7-.7 2.13 2.13 0 0 0 .47-1.53c-.07-.13-.25-.2-.53-.34Z" />
                            </svg>
                            WhatsApp Admin
                        </div>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="text-gray-400 hover:text-pink-500 text-xl font-bold ml-2"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="text-gray-700 text-sm mb-2">
                        Untuk tanya harga, jenis kue, atau custom model, silakan
                        chat via WhatsApp. Bisa konsultasi dan bawa model
                        sendiri!
                    </div>
                    <a
                        href="https://wa.me/62882002816754"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow text-center font-semibold transition"
                    >
                        Chat WhatsApp Admin
                    </a>
                </div>
            )}
        </section>
    );
}
