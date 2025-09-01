import React from "react";
import { Truck, Clock, MapPin, MessageCircle } from "lucide-react";

export default function ShippingInfo() {
    return (
        <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">
                    Informasi Pengiriman & Ketentuan
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Shipping Rules */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-pink-100 rounded-lg">
                                <Truck className="w-6 h-6 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-pink-700">
                                Ongkos Kirim
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Daerah Ciparay & Majalaya
                                    </p>
                                    <p className="text-2xl font-bold text-green-600">
                                        Rp 5.000
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MessageCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-medium text-gray-800">
                                        Daerah Lainnya
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Ongkir akan dikonfirmasi admin melalui
                                        WhatsApp sesuai jarak dan lokasi
                                        pengiriman
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expiration Rules */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-pink-700">
                                Ketentuan Kadaluarsa
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                                <p className="font-medium text-orange-800 mb-2">
                                    🍰 Kue Tart
                                </p>
                                <p className="text-sm text-orange-700">
                                    Tahan hingga 3 hari di suhu ruang normal
                                    atau 1 minggu jika disimpan di kulkas
                                </p>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                <p className="font-medium text-yellow-800 mb-2">
                                    🧁 Kue Bolu & Cupcake
                                </p>
                                <p className="text-sm text-yellow-700">
                                    Tahan hingga 5 hari di suhu ruang normal
                                    atau 2 minggu jika disimpan di kulkas
                                </p>
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                <p className="font-medium text-blue-800 mb-2">
                                    💡 Tips Penyimpanan
                                </p>
                                <p className="text-sm text-blue-700">
                                    Simpan di wadah tertutup rapat untuk menjaga
                                    kelembaban dan kesegaran kue
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-8 bg-pink-100 rounded-xl p-6 text-center">
                    <h4 className="text-lg font-semibold text-pink-700 mb-2">
                        Butuh Informasi Lebih Lanjut?
                    </h4>
                    <p className="text-gray-700 mb-4">
                        Admin akan menghubungi Anda via WhatsApp untuk
                        konfirmasi pesanan, ongkos kirim, dan detail lainnya
                        setelah Anda mengisi formulir pemesanan.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">
                            Konfirmasi via WhatsApp
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
