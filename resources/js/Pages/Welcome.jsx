import { Head } from '@inertiajs/react';

import Navbar from '@/Components/Landing/Navbar';
import HeroSection from '@/Components/Landing/HeroSection';
import FeaturesSection from '@/Components/Landing/FeaturesSection';
import StatsSection from '@/Components/Landing/StatsSection';
import HowItWorksSection from '@/Components/Landing/HowItWorksSection';
import PricingSection from '@/Components/Landing/PricingSection';
import TestimonialsSection from '@/Components/Landing/TestimonialsSection';
import CtaBanner from '@/Components/Landing/CtaBanner';
import LandingFooter from '@/Components/Landing/LandingFooter';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="SalePOS — Sistem Kasir Modern untuk Bisnis Anda" />

            <div className="min-h-screen bg-[#0a0f1e] text-white font-[Inter,system-ui,sans-serif] overflow-x-hidden">
                <Navbar auth={auth} />
                <HeroSection auth={auth} />
                <FeaturesSection />
                <StatsSection />
                <HowItWorksSection />
                <PricingSection />
                <TestimonialsSection />
                <CtaBanner auth={auth} />
                <LandingFooter auth={auth} />
            </div>
        </>
    );
}
