import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "../../Components/Admin/AdminLayout";
import { Star, Check, X, Eye, EyeOff, Trash2, Award } from "lucide-react";

export default function Testimonials({ testimonials }) {
    const [loading, setLoading] = useState({});

    const handleApprovalToggle = async (testimonialId, currentStatus) => {
        setLoading((prev) => ({
            ...prev,
            [`approval_${testimonialId}`]: true,
        }));

        Inertia.patch(
            `/admin/testimonials/${testimonialId}/approval`,
            {
                is_approved: !currentStatus,
            },
            {
                onFinish: () => {
                    setLoading((prev) => ({
                        ...prev,
                        [`approval_${testimonialId}`]: false,
                    }));
                },
            }
        );
    };

    const handleFeaturedToggle = async (testimonialId, currentStatus) => {
        setLoading((prev) => ({
            ...prev,
            [`featured_${testimonialId}`]: true,
        }));

        Inertia.patch(
            `/admin/testimonials/${testimonialId}/featured`,
            {
                is_featured: !currentStatus,
            },
            {
                onFinish: () => {
                    setLoading((prev) => ({
                        ...prev,
                        [`featured_${testimonialId}`]: false,
                    }));
                },
            }
        );
    };

    const handleDelete = async (testimonialId) => {
        if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
            setLoading((prev) => ({
                ...prev,
                [`delete_${testimonialId}`]: true,
            }));

            Inertia.delete(`/admin/testimonials/${testimonialId}`, {
                onFinish: () => {
                    setLoading((prev) => ({
                        ...prev,
                        [`delete_${testimonialId}`]: false,
                    }));
                },
            });
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${
                    index < rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                }`}
            />
        ));
    };

    const getStatusBadge = (isApproved) => {
        return isApproved ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="w-3 h-3 mr-1" />
                Disetujui
            </span>
        ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Eye className="w-3 h-3 mr-1" />
                Pending
            </span>
        );
    };

    const getFeaturedBadge = (isFeatured) => {
        return isFeatured ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                <Award className="w-3 h-3 mr-1" />
                Unggulan
            </span>
        ) : null;
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Testimoni
                        </h1>
                        <p className="text-gray-600">
                            Kelola testimoni dan ulasan pelanggan
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Testimoni
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {testimonials.length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Disetujui
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {
                                            testimonials.filter(
                                                (t) => t.is_approved
                                            ).length
                                        }
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                    <X className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Pending
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {
                                            testimonials.filter(
                                                (t) => !t.is_approved
                                            ).length
                                        }
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Unggulan
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {
                                            testimonials.filter(
                                                (t) => t.is_featured
                                            ).length
                                        }
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Daftar Testimoni
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Klik tombol aksi untuk mengelola testimoni
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {testimonials.length === 0 ? (
                            <li className="px-4 py-8 text-center">
                                <p className="text-gray-500">
                                    Belum ada testimoni
                                </p>
                            </li>
                        ) : (
                            testimonials.map((testimonial) => (
                                <li key={testimonial.id} className="px-4 py-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <h4 className="text-sm font-medium text-gray-900">
                                                        {
                                                            testimonial.customer_name
                                                        }
                                                    </h4>
                                                    {getStatusBadge(
                                                        testimonial.is_approved
                                                    )}
                                                    {getFeaturedBadge(
                                                        testimonial.is_featured
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    {renderStars(
                                                        testimonial.rating
                                                    )}
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(
                                                            testimonial.created_at
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                {testimonial.product && (
                                                    <p className="text-sm text-pink-600 font-medium">
                                                        Produk:{" "}
                                                        {
                                                            testimonial.product
                                                                .name
                                                        }
                                                    </p>
                                                )}
                                                {testimonial.customer_email && (
                                                    <p className="text-sm text-gray-500">
                                                        Email:{" "}
                                                        {
                                                            testimonial.customer_email
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mt-3">
                                                <p className="text-sm text-gray-900 leading-relaxed">
                                                    {testimonial.message}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ml-6 flex flex-col space-y-2">
                                            {/* Approval Button */}
                                            <button
                                                onClick={() =>
                                                    handleApprovalToggle(
                                                        testimonial.id,
                                                        testimonial.is_approved
                                                    )
                                                }
                                                disabled={
                                                    loading[
                                                        `approval_${testimonial.id}`
                                                    ]
                                                }
                                                className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded ${
                                                    testimonial.is_approved
                                                        ? "border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                                                        : "border-green-300 text-green-700 bg-green-50 hover:bg-green-100"
                                                } transition`}
                                            >
                                                {loading[
                                                    `approval_${testimonial.id}`
                                                ] ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                                ) : testimonial.is_approved ? (
                                                    <EyeOff className="w-4 h-4 mr-1" />
                                                ) : (
                                                    <Check className="w-4 h-4 mr-1" />
                                                )}
                                                {testimonial.is_approved
                                                    ? "Sembunyikan"
                                                    : "Setujui"}
                                            </button>

                                            {/* Featured Button */}
                                            {testimonial.is_approved && (
                                                <button
                                                    onClick={() =>
                                                        handleFeaturedToggle(
                                                            testimonial.id,
                                                            testimonial.is_featured
                                                        )
                                                    }
                                                    disabled={
                                                        loading[
                                                            `featured_${testimonial.id}`
                                                        ]
                                                    }
                                                    className={`inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded ${
                                                        testimonial.is_featured
                                                            ? "border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100"
                                                            : "border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100"
                                                    } transition`}
                                                >
                                                    {loading[
                                                        `featured_${testimonial.id}`
                                                    ] ? (
                                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                                    ) : (
                                                        <Award className="w-4 h-4 mr-1" />
                                                    )}
                                                    {testimonial.is_featured
                                                        ? "Batal Unggulan"
                                                        : "Jadikan Unggulan"}
                                                </button>
                                            )}

                                            {/* Delete Button */}
                                            <button
                                                onClick={() =>
                                                    handleDelete(testimonial.id)
                                                }
                                                disabled={
                                                    loading[
                                                        `delete_${testimonial.id}`
                                                    ]
                                                }
                                                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 transition"
                                            >
                                                {loading[
                                                    `delete_${testimonial.id}`
                                                ] ? (
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                                                ) : (
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                )}
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
