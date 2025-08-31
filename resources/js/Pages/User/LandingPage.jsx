import Navbar from "../../Components/User/Navbar";
import HeroSection from "../../Components/User/HeroSection";
import Keunggulan from "../../Components/User/Keunggulan";
import ProdukUnggulan from "../../Components/User/ProdukUnggulan";
import CaraPemesanan from "../../Components/User/CaraPemesanan";
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
                <CaraPemesanan />
                <TestimonialSection />
            </main>
            <Footer />
        </div>
    );
}
