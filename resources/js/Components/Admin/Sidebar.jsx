import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import {
    LayoutDashboard,
    Cake,
    ShoppingCart,
    BarChart2,
    MessageCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";

const menu = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
        name: "Produk",
        href: "/admin/produk",
        icon: <Cake className="w-5 h-5" />,
    },
    {
        name: "Pesanan",
        href: "/admin/pesanan",
        icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
        name: "Testimoni",
        href: "/admin/testimonials",
        icon: <MessageCircle className="w-5 h-5" />,
    },
    {
        name: "Laporan",
        href: "/admin/laporan",
        icon: <BarChart2 className="w-5 h-5" />,
    },
];

export default function Sidebar() {
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-pink-400 text-white p-2 rounded-lg shadow-lg focus:outline-none"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle sidebar"
            >
                {open ? (
                    <X className="w-7 h-7" />
                ) : (
                    <Menu className="w-7 h-7" />
                )}
            </button>
            {/* Sidebar */}
            <aside
                className={`fixed md:sticky z-40 top-0 left-0 h-screen w-64 md:w-64 bg-pink-400 flex flex-col transition-transform duration-300 md:translate-x-0 ${
                    open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="flex items-center gap-2 px-6 py-7 border-b border-pink-600 bg-pink-400">
                    <img
                        src="/assets/Logo.jpeg"
                        alt="YuraCake"
                        className="w-7 h-7"
                    />
                    <span className="text-yellow-300 font-extrabold text-2xl tracking-tight">
                        YuraCake
                    </span>
                </div>
                <nav className="flex-1 px-2 py-6 space-y-1">
                    {menu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition focus:outline-none text-base md:text-base hover:bg-pink-600 hover:text-yellow-200 focus:bg-pink-600 focus:text-yellow-200 ${
                                url.startsWith(item.href)
                                    ? "bg-pink-600 text-yellow-300 shadow"
                                    : "text-white"
                            }`}
                            onClick={() => setOpen(false)}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto px-2 pb-6">
                    <button
                        type="button"
                        onClick={() => Inertia.post("/admin/logout")}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-white hover:bg-pink-600 hover:text-yellow-200 w-full transition focus:bg-pink-600 focus:text-yellow-200 outline-none"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>
            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
}
