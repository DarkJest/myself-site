'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
    return (
        <>
            {/* Canvas выносим за пределы анимированного контента */}


            {/* Основной контент */}
            <section className="relative h-screen flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                        >
                            Привет, я <span className="text-indigo-600 dark:text-indigo-400">Максим Гуц</span>
                        </motion.h1>

                        <motion.h2
                            className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.2}}
                        >
                            Веб-разработчик, создающий современные и функциональные сайты с использованием передовых
                            технологий
                        </motion.h2>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8, delay: 0.4}}
                        >
                            <a
                                href="/portfolio"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                            >
                                Мои работы
                            </a>
                            <a
                                href="/contact"
                                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                            >
                                Связаться
                            </a>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, y: [0, 10, 0]}}
                    transition={{duration: 1.5, repeat: Infinity, delay: 1}}
                >
                    <svg
                        className="w-6 h-6 text-gray-700 dark:text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                    </svg>
                </motion.div>
            </section>
        </>
    );
};

export default HeroSection;