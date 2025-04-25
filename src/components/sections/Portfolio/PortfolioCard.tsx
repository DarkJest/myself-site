'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { IPortfolioItem } from '@/types/portfolio.types';

interface PortfolioCardProps {
    project: IPortfolioItem;
    onClick: () => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, onClick }) => {
    // Анимация для карточки
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            variants={item}
            whileHover={{ y: -10 }}
            onClick={onClick}
            className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                />
                {project.featured && (
                    <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Избранное
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                        >
              {tech}
            </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
              +{project.technologies.length - 3}
            </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioCard;
