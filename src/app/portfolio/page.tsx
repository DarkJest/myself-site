import Layout from "@/components/layout/Layout";
import React from "react";
import PortfolioSection from "@/components/sections/Portfolio/PortfolioSection";

const PortfolioPage: React.FC = () => {
    return (
        <Layout title="О себе - Максим Гуц" description="Информация обо мне и моих навыках">
            <PortfolioSection></PortfolioSection>
        </Layout>
    );
}

export default PortfolioPage;