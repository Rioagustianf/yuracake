import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Mail, Lock, Eye, EyeOff, User, Cake } from "lucide-react";
import Navbar from "../../../Components/User/Navbar";

export default function Register({ auth, errors }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [error, setError] = useState(errors || {});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setError({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/register", form, {
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
                            Daftar Customer
                        </span>
                    </div>
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                                <User size={20} color="#ec4899" />
                            </span>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Masukkan nama lengkap"
                                className={`block w-full pl-10 pr-3 py-2 border ${
                                    error.name
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition placeholder-gray-400`}
                            />
                        </div>
                        {error.name && (
                            <div className="text-red-500 text-xs mt-1">
                                {error.name}
                            </div>
                        )}
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
                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm font-medium text-gray-700 mb-1"
                        >
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400">
                                <Lock size={20} color="#ec4899" />
                            </span>
                            <input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showConfirmPassword ? "text" : "password"}
                                value={form.password_confirmation}
                                onChange={handleChange}
                                required
                                placeholder="Konfirmasi password"
                                className={`block w-full pl-10 pr-10 py-2 border ${
                                    error.password_confirmation
                                        ? "border-red-400"
                                        : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition placeholder-gray-400`}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword((v) => !v)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} color="#ec4899" />
                                ) : (
                                    <Eye size={20} color="#ec4899" />
                                )}
                            </button>
                        </div>
                        {error.password_confirmation && (
                            <div className="text-red-500 text-xs mt-1">
                                {error.password_confirmation}
                            </div>
                        )}
                    </div>
                    {/* Link to login */}
                    <div className="flex justify-center">
                        <a
                            href="/login"
                            className="text-xs text-pink-500 hover:underline focus:outline-none"
                        >
                            Sudah punya akun? Login disini
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition font-semibold text-lg tracking-wide"
                    >
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
}
