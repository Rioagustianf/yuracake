import React, { useState, useEffect } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

export default function TestimonialSection() {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch("/api/testimonials/featured");
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        } finally {
            setLoading(false);
        }
    };

    const nextTestimonial = () => {
        setCurrentIndex((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
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

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!testimonials || testimonials.length === 0) {
        return (
            <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-pink-700 mb-4">
                        Testimoni Pelanggan
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Belum ada testimoni yang tersedia.
                    </p>
                    <a
                        href="/testimonial"
                        className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
                    >
                        Berikan Testimoni Pertama
                    </a>
                </div>
            </section>
        );
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-16 bg-gradient-to-tl from-pink-200 via-pink-50 to-pink-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-pink-700 mb-4">
                        Testimoni Pelanggan
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Apa kata pelanggan tentang produk YuraCake? Simak
                        testimoni mereka yang telah merasakan kelezatan kue-kue
                        kami.
                    </p>
                </div>

                <div className="relative">
                    {/* Main Testimonial Display */}
                    <div className="bg-pink-200/40 rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
                        <div className="text-center">
                            <Quote className="w-12 h-12 text-pink-400 mx-auto mb-6" />

                            <div className="mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed italic">
                                    "{currentTestimonial.message}"
                                </p>
                            </div>

                            <div className="flex justify-center mb-4">
                                {renderStars(currentTestimonial.rating)}
                            </div>

                            <div className="border-t border-pink-700 pt-6">
                                <h4 className="font-semibold text-gray-900 text-lg">
                                    {currentTestimonial.customer_name}
                                </h4>
                                {currentTestimonial.product && (
                                    <p className="text-pink-600 font-medium">
                                        {currentTestimonial.product.name}
                                    </p>
                                )}
                                <p className="text-gray-500 text-sm">
                                    Pelanggan YuraCake
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {testimonials.length > 1 && (
                        <>
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition"
                                aria-label="Testimoni sebelumnya"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition"
                                aria-label="Testimoni selanjutnya"
                            >
                                <ArrowRight className="w-5 h-5 text-gray-600" />
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator */}
                {testimonials.length > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition ${
                                    index === currentIndex
                                        ? "bg-pink-600"
                                        : "bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="text-center mt-12">
                    <p className="text-gray-600 mb-4">
                        Punya pengalaman dengan produk kami?
                    </p>
                    <a
                        href="/testimonial"
                        className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
                    >
                        Berikan Testimoni Anda
                    </a>
                </div>
            </div>
        </section>
    );
}
