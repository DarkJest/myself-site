'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavigationProps {
    currentPath: string;
}

interface NavItem {
    label: string;
    path: string;
}

const navItems: NavItem[] = [
    { label: 'Главная', path: '/' },
    { label: 'О себе', path: '/about' },
    { label: 'Портфолио', path: '/portfolio' },
    { label: 'Контакты', path: '/contact' },
];

const Navigation: React.FC<NavigationProps> = ({ currentPath }) => {
    return (
        <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
                <Link href={item.path} key={item.path} passHref>
                    <motion.nav
                        className={`cursor-pointer relative px-1 py-2 ${
                            currentPath === item.path
                                ? 'text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-800 dark:text-gray-200'
                        }`}
                        whileHover={{ scale: 1.1 }}
                    >
                        {item.label}
                        {currentPath === item.path && (
                            <motion.div
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                                layoutId="navigation-underline"
                            />
                        )}
                    </motion.nav>
                </Link>
            ))}
        </nav>
    );
};

export default Navigation;