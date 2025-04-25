'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Navigation from './Navigation';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Эффект следящий за скроллом для изменения стиля хедера
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" passHref>
                    <motion.div
                        className="text-2xl font-bold cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="text-indigo-600 dark:text-indigo-400">Максим</span>
                        <span className="text-gray-400 dark:text-white">Гуц</span>
                    </motion.div>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Navigation currentPath={pathname} />
                    <ThemeToggle />
                </div>
            </div>
        </motion.header>
    );
};

export default Header;