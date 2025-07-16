import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Navbar from "../../Components/User/Navbar";
import { usePage } from "@inertiajs/inertia-react";

const icons = {
    nama: (
        <svg
            className="w-5 h-5 text-pink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    ),
    alamat: (
        <svg
            className="w-5 h-5 text-pink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    ),
    nohp: (
        <svg
            className="w-5 h-5 text-pink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.684l1.518 4.554a1 1 0 01-.217.976l-2.1 2.1a11.042 11.042 0 005.516 5.516l2.1-2.1a1 1 0 01.976-.217l4.554 1.518A1 1 0 0121 17.72V21a2 2 0 01-2 2h-1C9.163 23 1 14.837 1 5V4a2 2 0 012-2z"
            />
        </svg>
    ),
    kue: (
        <svg
            className="w-5 h-5 text-pink-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v13m0 0c-4.418 0-8-1.79-8-4V5a2 2 0 012-2h12a2 2 0 012 2v12c0 2.21-3.582 4-8 4z"
            />
        </svg>
    ),
};

export default function FormulirPemesanan(props) {
    const products = props.products || [];
    // Prefill product_id jika ada di query
    const urlParams =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search)
            : null;
    const prefillProductId =
        urlParams?.get("product_id") || products[0]?.id || "";
    const [form, setForm] = useState({
        customer_name: "",
        customer_address: "",
        customer_phone: "",
        items: [{ product_id: prefillProductId, quantity: 1 }],
        note: "",
        payment_method: "cod",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    const handleChange = (e, idx = null) => {
        const { name, value } = e.target;
        if (name.startsWith("items.")) {
            const [_, field, index] = name.split(".");
            setForm((f) => {
                const items = [...f.items];
                items[Number(index)][field] = value;
                return { ...f, items };
            });
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
        setError((err) => ({ ...err, [name]: false }));
    };

    const addItem = () => {
        setForm((f) => ({
            ...f,
            items: [...f.items, { product_id: "", quantity: 1 }],
        }));
    };
    const removeItem = (idx) => {
        setForm((f) => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        Inertia.post("/pesan", form, {
            onFinish: () => setLoading(false),
            onError: (err) => setError(err),
        });
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <section className="flex items-center justify-center py-12 px-4">
                <form
                    onSubmit={handleSubmit}
                    className="bg-pink-50 rounded-2xl shadow-lg max-w-lg w-full p-8 space-y-5"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                            1
                        </div>
                        <span className="text-pink-700 font-semibold">
                            Isi Data & Pesanan
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold">
                            2
                        </div>
                        <span className="text-gray-400">Konfirmasi</span>
                    </div>
                    {/* Input Data Diri */}
                    {[
                        {
                            name: "customer_name",
                            label: "Nama Lengkap",
                            placeholder: "Masukkan nama lengkap",
                            icon: icons.nama,
                        },
                        {
                            name: "customer_address",
                            label: "Alamat Lengkap",
                            placeholder: "Masukkan alamat lengkap",
                            icon: icons.alamat,
                        },
                        {
                            name: "customer_phone",
                            label: "No HP",
                            placeholder: "Masukkan nomor HP",
                            icon: icons.nohp,
                        },
                    ].map((input) => (
                        <div key={input.name} className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {input.label}
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                    {input.icon}
                                </span>
                                <input
                                    name={input.name}
                                    value={form[input.name]}
                                    onChange={handleChange}
                                    required
                                    placeholder={input.placeholder}
                                    className={`pl-10 pr-3 py-2 w-full border ${
                                        error[input.name]
                                            ? "border-red-400"
                                            : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition`}
                                />
                            </div>
                            {error[input.name] && (
                                <div className="text-xs text-red-500 mt-1">
                                    {error[input.name]}
                                </div>
                            )}
                        </div>
                    ))}
                    {/* Pilih Kue & Jumlah */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih Kue & Jumlah
                        </label>
                        <div className="space-y-2">
                            {form.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row gap-2 items-center bg-white p-2 rounded-lg border border-gray-200"
                                >
                                    <div className="flex-1 w-full">
                                        <label className="block text-xs text-gray-500 mb-1 sm:mb-0">
                                            Kue
                                        </label>
                                        <select
                                            name={`items.product_id.${idx}`}
                                            value={item.product_id}
                                            onChange={(e) =>
                                                handleChange(
                                                    {
                                                        target: {
                                                            name: `items.product_id.${idx}`,
                                                            value: e.target
                                                                .value,
                                                        },
                                                    },
                                                    idx
                                                )
                                            }
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
                                            required
                                        >
                                            <option value="">Pilih Kue</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-28">
                                        <label className="block text-xs text-gray-500 mb-1 sm:mb-0">
                                            Jumlah
                                        </label>
                                        <input
                                            name={`items.quantity.${idx}`}
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                handleChange(
                                                    {
                                                        target: {
                                                            name: `items.quantity.${idx}`,
                                                            value: e.target
                                                                .value,
                                                        },
                                                    },
                                                    idx
                                                )
                                            }
                                            className="w-full p-1 border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
                                            required
                                            placeholder="Jumlah"
                                        />
                                    </div>
                                    {form.items.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="text-red-500 font-bold text-lg px-2 hover:bg-red-100 rounded self-end sm:self-center"
                                            title="Hapus kue ini"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addItem}
                            className="text-green-600 hover:underline text-sm mt-2"
                        >
                            + Tambah Kue
                        </button>
                    </div>
                    {/* Catatan */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan (opsional)
                        </label>
                        <textarea
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            placeholder="Tulis catatan untuk admin, misal permintaan khusus, alamat detail, dsb."
                            className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3 min-h-[48px]"
                            rows={2}
                        />
                        {error.note && (
                            <div className="text-xs text-red-500 mt-1">
                                {error.note}
                            </div>
                        )}
                    </div>
                    {/* Metode Pembayaran */}
                    <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Metode Pembayaran
                        </label>
                        <div className="flex gap-6">
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={form.payment_method === "cod"}
                                    onChange={handleChange}
                                    className="form-radio text-pink-600"
                                />
                                <span>COD</span>
                            </label>
                            <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="bank_transfer"
                                    checked={
                                        form.payment_method === "bank_transfer"
                                    }
                                    onChange={handleChange}
                                    className="form-radio text-pink-600"
                                />
                                <span>Transfer</span>
                            </label>
                        </div>
                        {error.payment_method && (
                            <div className="text-xs text-red-500 mt-1">
                                {error.payment_method}
                            </div>
                        )}
                    </div>
                    {/* Submit */}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition flex items-center justify-center gap-2 text-lg font-semibold ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                        disabled={loading}
                    >
                        {loading && (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8z"
                                ></path>
                            </svg>
                        )}
                        Kirim Pesanan
                    </button>
                </form>
            </section>
        </div>
    );
}
