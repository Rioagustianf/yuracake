import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Mail, Lock, Eye, EyeOff, User, Cake } from "lucide-react";
import Navbar from "../../../Components/User/Navbar";

export default function Login({ auth, errors }) {
    // Detect if this is admin login based on URL
    const isAdminLogin = window.location.pathname === "/admin/login";
    const [loginType, setLoginType] = useState(
        isAdminLogin ? "admin" : "customer"
    ); // "customer" or "admin"
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState(errors || {});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setError({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginUrl = loginType === "admin" ? "/admin/login" : "/login";
        Inertia.post(loginUrl, form, {
            onError: (errors) => setError(errors),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
            <Navbar auth={auth} />
            <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-7 border border-pink-100 animate-fade-in"
                >
                    <div className="flex flex-col items-center mb-2">
                        {/* Logo */}
                        <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-2 shadow">
                            <img
                                src="/assets/Logo.jpeg"
                                alt="YuraCake"
                                className="w-16 h-16"
                            />
                        </div>
                        <span className="text-pink-700 font-extrabold text-3xl mb-1 tracking-tight">
                            YuraCake
                        </span>
                        <span className="text-gray-400 text-sm">
                            Login {loginType === "admin" ? "Admin" : "Customer"}
                        </span>
                    </div>

                    {/* Login Type Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => setLoginType("customer")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                loginType === "customer"
                                    ? "bg-white text-pink-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <User size={16} className="inline mr-2" />
                            Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => setLoginType("admin")}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                loginType === "admin"
                                    ? "bg-white text-pink-600 shadow-sm"
                                    : "text-gray-600 hover:text-gray-900"
                            }`}
                        >
                            <Cake size={16} className="inline mr-2" />
                            Admin
                        </button>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                                <Mail size={20} color="#ec4899" />
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan email"
                                className={`block w-full pl-10 pr-3 py-2 border ${
                                    error.email
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition placeholder-gray-400`}
                            />
                        </div>
                        {error.email && (
                            <div className="text-red-500 text-xs mt-1">
                                {error.email}
                            </div>
                        )}
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                                <Lock size={20} color="#ec4899" />
                            </span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan password"
                                className={`block w-full pl-10 pr-10 py-2 border ${
                                    error.password
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition placeholder-gray-400`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color="#ec4899" />
                                ) : (
                                    <Eye size={20} color="#ec4899" />
                                )}
                            </button>
                        </div>
                        {error.password && (
                            <div className="text-red-500 text-xs mt-1">
                                {error.password}
                            </div>
                        )}
                    </div>
                    {/* Link to register (only for customer) */}
                    {loginType === "customer" && (
                        <div className="flex justify-center">
                            <a
                                href="/register"
                                className="text-xs text-pink-500 hover:underline focus:outline-none"
                            >
                                Belum punya akun? Daftar disini
                            </a>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition font-semibold text-lg tracking-wide"
                    >
                        Login {loginType === "admin" ? "Admin" : "Customer"}
                    </button>
                </form>
            </div>
        </div>
    );
}
