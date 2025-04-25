import React from 'react';
import Layout from '@/components/layout/Layout';
import ContactSection from "@/components/sections/Contact/ContactSection";

const ContactPage: React.FC = () => {
    return (
        <Layout title="О себе - Максим Гуц" description="Информация обо мне и моих навыках">
            <ContactSection></ContactSection>
        </Layout>
    );
};

export default ContactPage;