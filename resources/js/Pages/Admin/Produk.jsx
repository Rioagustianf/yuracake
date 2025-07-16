import React, { useState } from "react";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { Inertia } from "@inertiajs/inertia";

export default function Produk({ products = [] }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);

    const openAdd = () => {
        setEditData(null);
        setForm({
            name: "",
            price: "",
            stock: "",
            description: "",
            image: null,
        });
        setPreview(null);
        setErrors({});
        setShowModal(true);
    };
    const openEdit = (produk) => {
        setEditData(produk);
        setForm({
            name: produk.name,
            price: produk.price,
            stock: produk.stock,
            description: produk.description || "",
            image: null,
        });
        setPreview(produk.image ? `/storage/${produk.image}` : null);
        setErrors({});
        setShowModal(true);
    };
    const closeModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
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
        data.append("name", form.name);
        data.append("price", form.price);
        data.append("stock", form.stock);
        data.append("description", form.description);
        if (form.image) data.append("image", form.image);
        if (editData) {
            data.append("_method", "PUT");
            Inertia.post(`/admin/produk/${editData.id}`, data, {
                forceFormData: true,
                onError: (err) => setErrors(err),
                onSuccess: closeModal,
            });
        } else {
            Inertia.post("/admin/produk", data, {
                forceFormData: true,
                onError: (err) => setErrors(err),
                onSuccess: closeModal,
            });
        }
    };

    const handleDelete = (id) => {
        if (
            !id ||
            (typeof id !== "number" && typeof id !== "string") ||
            id === "" ||
            id === 0
        ) {
            alert("ID produk tidak ditemukan. Gagal menghapus!");
            console.error("handleDelete dipanggil tanpa id valid", id);
            return;
        }
        if (window.confirm("Yakin ingin menghapus produk ini?")) {
            Inertia.delete(`/admin/produk/${id}`);
        }
    };

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4 sm:gap-0">
                <h1 className="text-2xl font-bold text-pink-700">
                    Kelola Produk
                </h1>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition w-full sm:w-auto"
                    onClick={openAdd}
                >
                    + Tambah Produk
                </button>
            </div>
            <div className="overflow-x-auto rounded-xl shadow bg-white">
                <table className="min-w-full divide-y-2 divide-gray-200 text-sm md:text-base">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr className="*:font-medium *:text-gray-900">
                            <th className="px-3 py-2 whitespace-nowrap">
                                Gambar
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Nama
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Deskripsi
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Harga
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Stok
                            </th>
                            <th className="px-3 py-2 whitespace-nowrap">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((produk, idx) => {
                            if (!produk.id) {
                                console.error(
                                    "Produk tanpa id ditemukan di index",
                                    idx,
                                    produk
                                );
                            }
                            return (
                                <tr
                                    key={produk.id || idx}
                                    className="*:text-gray-900 *:first:font-medium"
                                >
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {produk.image ? (
                                            <img
                                                src={`/storage/${produk.image}`}
                                                alt={produk.name}
                                                className="w-14 h-14 object-cover rounded shadow border"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-400">
                                                Tidak ada
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap font-semibold text-pink-700">
                                        {produk.name}
                                    </td>
                                    <td
                                        className="px-3 py-2 whitespace-nowrap max-w-xs truncate"
                                        title={produk.description}
                                    >
                                        {produk.description}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        Rp{" "}
                                        {Number(produk.price).toLocaleString(
                                            "id-ID"
                                        )}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        {produk.stock}
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap space-x-2">
                                        <button
                                            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                            onClick={() => openEdit(produk)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                            onClick={() =>
                                                handleDelete(produk.id)
                                            }
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {/* Modal Form Tambah/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-2">
                    <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 w-full max-w-md relative animate-fade-in max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-3 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-pink-700">
                            {editData ? "Edit Produk" : "Tambah Produk"}
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-4"
                            encType="multipart/form-data"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Produk
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 ${
                                        errors.name
                                            ? "border-red-400"
                                            : "border-gray-300"
                                    }`}
                                    required
                                />
                                {errors.name && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.name}
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
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 ${
                                        errors.description
                                            ? "border-red-400"
                                            : "border-gray-300"
                                    }`}
                                    rows={3}
                                />
                                {errors.description && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Harga
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 ${
                                        errors.price
                                            ? "border-red-400"
                                            : "border-gray-300"
                                    }`}
                                    required
                                    min="0"
                                />
                                {errors.price && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.price}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Stok
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={form.stock}
                                    onChange={handleChange}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-pink-500 focus:border-pink-500 ${
                                        errors.stock
                                            ? "border-red-400"
                                            : "border-gray-300"
                                    }`}
                                    required
                                    min="0"
                                />
                                {errors.stock && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.stock}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Gambar Produk
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
                                {errors.image && (
                                    <div className="text-xs text-red-500 mt-1">
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
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
