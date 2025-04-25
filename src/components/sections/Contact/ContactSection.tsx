'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ContactSection: React.FC = () => {
    return (
        <section id="contact" className="py-20 ">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Свяжитесь <span className="text-indigo-600 dark:text-indigo-400">со мной</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Готовы обсудить ваш проект? Заполните форму ниже или используйте контактную информацию для связи.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ContactForm />
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
