'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/DarkJest' },
        { name: 'Telegram', url: 'https://t.me/AjaUguju1' },
    ];

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Максим Гуц</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Личный сайт разработчика с современным фронтендом и PHP бэкендом.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Ссылки</h3>
                        <ul className="space-y-2">
                            <li><Link href={"/about"} className="text-indigo-600 dark:text-indigo-400 hover:underline">О себе</Link></li>
                            <li><Link href={"/portfolio"} className="text-indigo-600 dark:text-indigo-400 hover:underline">Портфолио</Link></li>
                            <li><Link href={"/blog"} className="text-indigo-600 dark:text-indigo-400 hover:underline">Блог</Link></li>
                            <li><Link href={"/contact"} className="text-indigo-600 dark:text-indigo-400 hover:underline">Контакты</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Социальные сети</h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 z-[5]"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        © {currentYear} Максим Гуц. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;