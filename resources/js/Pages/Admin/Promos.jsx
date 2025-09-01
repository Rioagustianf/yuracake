import React, { useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Gift, Percent, Calendar, Tag, Users, Eye, EyeOff } from "lucide-react";
import { formatNumber } from "../../utils/currency";

export default function Promos({ promos = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        title: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        min_purchase: "0",
        max_discount: "",
        start_date: "",
        end_date: "",
        usage_limit: "",
        promo_code: "",
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);

    const openAdd = () => {
        setEditData(null);
        setForm({
            title: "",
            description: "",
            discount_type: "percentage",
            discount_value: "",
            min_purchase: "0",
            max_discount: "",
            start_date: "",
            end_date: "",
            usage_limit: "",
            promo_code: "",
            image: null,
        });
        setPreview(null);
        setErrors({});
        setShowModal(true);
    };

    const openEdit = (promo) => {
        setEditData(promo);
        setForm({
            title: promo.title,
            description: promo.description || "",
            discount_type: promo.discount_type,
            discount_value: promo.discount_value,
            min_purchase: promo.min_purchase,
            max_discount: promo.max_discount || "",
            start_date: promo.start_date ? promo.start_date.slice(0, 16) : "",
            end_date: promo.end_date ? promo.end_date.slice(0, 16) : "",
            usage_limit: promo.usage_limit || "",
            promo_code: promo.promo_code || "",
            image: null,
        });
        setPreview(promo.image ? `/storage/${promo.image}` : null);
        setErrors({});
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
            setPreview(files[0] ? URL.createObjectURL(files[0]) : null);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        const data = new FormData();

        Object.keys(form).forEach((key) => {
            if (form[key] !== null && form[key] !== "") {
                data.append(key, form[key]);
            }
        });

        if (editData) {
            data.append("_method", "PUT");
            Inertia.post(`/admin/promos/${editData.id}`, data, {
                forceFormData: true,
                onError: (err) => setErrors(err),
                onSuccess: closeModal,
            });
        } else {
            Inertia.post("/admin/promos", data, {
                forceFormData: true,
                onError: (err) => setErrors(err),
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus promo ini?")) {
            Inertia.delete(`/admin/promos/${id}`);
        }
    };

    const toggleStatus = async (promoId) => {
        try {
            const response = await fetch(`/admin/promos/${promoId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
            });

            if (response.ok) {
                Inertia.reload();
            } else {
                alert("Gagal mengubah status promo");
            }
        } catch (error) {
            console.error("Error toggling promo status:", error);
            alert("Terjadi kesalahan saat mengubah status promo");
        }
    };

    const formatDiscount = (promo) => {
        if (promo.discount_type === "percentage") {
            return `${promo.discount_value}%`;
        } else {
            return `Rp ${formatNumber(promo.discount_value)}`;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    const isPromoActive = (promo) => {
        const now = new Date();
        const startDate = new Date(promo.start_date);
        const endDate = new Date(promo.end_date);
        return promo.is_active && startDate <= now && endDate >= now;
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
                <h1 className="text-2xl font-bold text-pink-700 flex items-center gap-2">
                    <Gift className="w-6 h-6" />
                    Kelola Promo
                </h1>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-full sm:w-auto flex items-center gap-2"
                    onClick={openAdd}
                >
                    <Gift className="w-4 h-4" />
                    Tambah Promo
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promos.map((promo) => (
                    <div
                        key={promo.id}
                        className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                            isPromoActive(promo)
                                ? "border-green-200"
                                : "border-gray-200"
                        } relative`}
                    >
                        {/* Status Badge */}
                        <div className="absolute top-2 left-2 z-10">
                            {isPromoActive(promo) ? (
                                <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                    Aktif
                                </div>
                            ) : (
                                <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                    Tidak Aktif
                                </div>
                            )}
                        </div>

                        {/* Discount Badge */}
                        <div className="absolute top-2 right-2 z-10">
                            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <Percent className="w-3 h-3" />
                                {formatDiscount(promo)}
                            </div>
                        </div>

                        {/* Promo Image */}
                        {promo.image ? (
                            <img
                                src={`/storage/${promo.image}`}
                                alt={promo.title}
                                className="h-32 w-full object-cover"
                            />
                        ) : (
                            <div className="h-32 w-full bg-gradient-to-br from-pink-100 to-red-100 flex items-center justify-center">
                                <Gift className="w-12 h-12 text-pink-400" />
                            </div>
                        )}

                        <div className="p-4">
                            <h3 className="font-bold text-lg text-pink-700 mb-2">
                                {promo.title}
                            </h3>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {promo.description}
                            </p>

                            {/* Promo Details */}
                            <div className="space-y-1 text-xs text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(promo.start_date)} -{" "}
                                    {formatDate(promo.end_date)}
                                </div>

                                {promo.promo_code && (
                                    <div className="flex items-center gap-1">
                                        <Tag className="w-3 h-3" />
                                        Kode: {promo.promo_code}
                                    </div>
                                )}

                                {promo.usage_limit && (
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        Digunakan: {promo.used_count}/
                                        {promo.usage_limit}
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="flex-1 px-3 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs font-medium"
                                    onClick={() => openEdit(promo)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => toggleStatus(promo.id)}
                                    className={`px-3 py-2 rounded text-xs font-medium flex items-center gap-1 ${
                                        promo.is_active
                                            ? "bg-gray-500 hover:bg-gray-600 text-white"
                                            : "bg-green-500 hover:bg-green-600 text-white"
                                    }`}
                                >
                                    {promo.is_active ? (
                                        <EyeOff className="w-3 h-3" />
                                    ) : (
                                        <Eye className="w-3 h-3" />
                                    )}
                                </button>
                                <button
                                    className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-medium"
                                    onClick={() => handleDelete(promo.id)}
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {promos.length === 0 && (
                <div className="text-center py-12">
                    <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                        Belum ada promo yang dibuat
                    </p>
                    <button
                        className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition"
                        onClick={openAdd}
                    >
                        Buat Promo Pertama
                    </button>
                </div>
            )}

            {/* Modal Form Tambah/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
                    <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 w-full max-w-lg relative animate-fade-in max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-pink-700">
                            {editData ? "Edit Promo" : "Tambah Promo"}
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            encType="multipart/form-data"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Judul Promo
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                    required
                                />
                                {errors.title && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tipe Diskon
                                    </label>
                                    <select
                                        name="discount_type"
                                        value={form.discount_type}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                    >
                                        <option value="percentage">
                                            Persentase (%)
                                        </option>
                                        <option value="fixed">
                                            Nominal (Rp)
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nilai Diskon
                                    </label>
                                    <input
                                        type="number"
                                        name="discount_value"
                                        value={form.discount_value}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Min. Pembelian
                                    </label>
                                    <input
                                        type="number"
                                        name="min_purchase"
                                        value={form.min_purchase}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                {form.discount_type === "percentage" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Maks. Diskon
                                        </label>
                                        <input
                                            type="number"
                                            name="max_discount"
                                            value={form.max_discount}
                                            onChange={handleChange}
                                            className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tanggal Mulai
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="start_date"
                                        value={form.start_date}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Tanggal Berakhir
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="end_date"
                                        value={form.end_date}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Batas Penggunaan
                                    </label>
                                    <input
                                        type="number"
                                        name="usage_limit"
                                        value={form.usage_limit}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        min="1"
                                        placeholder="Kosongkan untuk unlimited"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Kode Promo
                                    </label>
                                    <input
                                        type="text"
                                        name="promo_code"
                                        value={form.promo_code}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                        placeholder="Opsional"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Gambar Promo
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500"
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-2 rounded-lg w-32 h-32 object-cover border"
                                    />
                                )}
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 shadow"
                                >
                                    {editData ? "Update" : "Tambah"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
