import React from 'react';
import Layout from '@/components/layout/Layout';

const AboutPage: React.FC = () => {
    return (
        <Layout title="О себе - Максим Гуц" description="Информация обо мне и моих навыках">
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                        О себе
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            Здесь вы можете рассказать о себе, своих навыках и опыте.
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default AboutPage;