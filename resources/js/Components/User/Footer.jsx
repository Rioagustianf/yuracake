import React from "react";
import { Instagram, Facebook, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-pink-700 text-white py-8 mt-12">
            <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="font-bold text-lg">Yuracake</div>
                    <div className="text-sm">
                        Kp.bugel rt.01/rw.01, Desa.pakutandang kec.ciparay
                    </div>
                    <div className="text-sm">WA: 0882002816754</div>
                </div>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a
                        href="https://instagram.com/yuracake26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 flex items-center gap-1"
                    >
                        <Instagram className="w-5 h-5" />
                    </a>
                    <a
                        href="https://facebook.com/mutiara.septiana.pratiwi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 flex items-center gap-1"
                    >
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a
                        href="https://wa.me/62882002816754"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-300 flex items-center gap-1"
                    >
                        <Phone className="w-5 h-5" />
                    </a>
                </div>
                <div className="text-xs mt-2 md:mt-0 text-center md:text-right">
                    <div className="font-semibold">Mutiara berkue</div>
                    <div>
                        Jadikan kue teman di hari specialmu dan teman untuk mood
                        mu
                    </div>
                    <div className="mt-1">
                        &copy; {new Date().getFullYear()} Yuracake
                    </div>
                </div>
            </div>
        </footer>
    );
}
