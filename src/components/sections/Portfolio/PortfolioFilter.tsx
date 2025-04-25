'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PortfolioFilterProps {
    technologies: string[];
    selectedTech: string;
    onChange: (tech: string) => void;
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({
                                                             technologies,
                                                             selectedTech,
                                                             onChange
                                                         }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChange('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    selectedTech === 'all'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
            >
                Все проекты
            </motion.button>

            {technologies.map(tech => (
                <motion.button
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onChange(tech)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                        selectedTech === tech
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                    {tech}
                </motion.button>
            ))}
        </div>
    );
};

export default PortfolioFilter;