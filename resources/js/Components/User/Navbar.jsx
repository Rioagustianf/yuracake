import { useState } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Menu, X, Cake, User, LogOut } from "lucide-react";
import React from "react";

export default function Navbar({ auth }) {
    const [open, setOpen] = useState(false);
    const { post } = useForm();

    const handleLogout = () => {
        post("/logout");
    };

    return (
        <nav className="bg-pink-400 shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <img
                        src="/assets/Logo.jpeg"
                        alt="YuraCake"
                        className="h-7 w-7"
                    />
                    <Link
                        href="/"
                        className="text-white font-extrabold text-2xl tracking-tight"
                    >
                        YuraCake
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-white hover:text-pink-700 font-medium transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/daftar-kue"
                        className="text-white hover:text-pink-700 font-medium transition-colors"
                    >
                        Daftar Kue
                    </Link>
                    {auth?.user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-white font-medium">
                                Halo, {auth.user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-white hover:text-pink-700 font-medium transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-white hover:text-pink-700 font-medium transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
                            >
                                Daftar
                            </Link>
                        </div>
                    )}
                </div>
                <button
                    className="md:hidden text-white hover:text-pink-700 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                >
                    {open ? (
                        <X className="w-7 h-7" />
                    ) : (
                        <Menu className="w-7 h-7" />
                    )}
                </button>
            </div>
            {open && (
                <div className="md:hidden bg-white shadow-lg px-4 pb-4 flex flex-col gap-3 border-t border-gray-100">
                    <Link
                        href="/"
                        className="block py-2 text-white hover:text-pink-700 font-medium transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/daftar-kue"
                        className="block py-2 text-gray-700 hover:text-pink-700 font-medium transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Daftar Kue
                    </Link>
                    {auth?.user ? (
                        <>
                            <div className="border-t border-gray-200 pt-2">
                                <span className="block py-2 text-gray-700 font-medium">
                                    Halo, {auth.user.name}
                                </span>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setOpen(false);
                                    }}
                                    className="flex items-center gap-2 w-full py-2 text-gray-700 hover:text-pink-700 font-medium transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="border-t border-gray-200 pt-2">
                                <Link
                                    href="/login"
                                    className="block py-2 text-gray-700 hover:text-pink-700 font-medium transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block py-2 text-gray-700 hover:text-pink-700 font-medium transition-colors"
                                    onClick={() => setOpen(false)}
                                >
                                    Daftar
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
