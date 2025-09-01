import Navbar from "../../Components/User/Navbar";
import HeroSection from "../../Components/User/HeroSection";
import Keunggulan from "../../Components/User/Keunggulan";
import ProdukUnggulan from "../../Components/User/ProdukUnggulan";
import BestSellers from "../../Components/User/BestSellers";
import PromoSection from "../../Components/User/PromoSection";
import CaraPemesanan from "../../Components/User/CaraPemesanan";
import ShippingInfo from "../../Components/User/ShippingInfo";
import TestimonialSection from "../../Components/User/TestimonialSection";
import Footer from "../../Components/User/Footer";
import { Inertia } from "@inertiajs/inertia";
import React from "react";

export default function LandingPage() {
    return (
        <div className="bg-background min-h-screen text-foreground">
            <Navbar />
            <main>
                <HeroSection />
                <Keunggulan />
                <ProdukUnggulan />
                <BestSellers />
                <PromoSection />
                <CaraPemesanan />
                <ShippingInfo />
                <TestimonialSection />
            </main>
            <Footer />
        </div>
    );
}
