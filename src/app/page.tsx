import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/Hero/HeroSection';
import PortfolioSection from "@/components/sections/Portfolio/PortfolioSection";
import ContactSection from "@/components/sections/Contact/ContactSection";

const Home: React.FC = () => {
    return (
        <Layout>
            <HeroSection />
            <PortfolioSection/>
            <ContactSection/>
        </Layout>
    );
};

export default Home;