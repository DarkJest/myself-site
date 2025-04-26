'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '@/api/services/portfolioService';
import { IPortfolioItem } from '@/types/portfolio.types';
import PortfolioCard from './PortfolioCard';
import PortfolioFilter from './PortfolioFilter';
import PortfolioModal from './PortfolioModal';
import toast from "react-hot-toast";

const PortfolioSection: React.FC = () => {
    const [projects, setProjects] = useState<IPortfolioItem[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<IPortfolioItem[]>([]);
    const [selectedTech, setSelectedTech] = useState<string>('all');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<IPortfolioItem | null>(null);

    // Получение данных о проектах
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const projectsData = await portfolioService.getProjects();
                setProjects(projectsData);
                setFilteredProjects(projectsData);
            } catch {
                toast.error("Ошибка при загрузке проектов")
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Фильтрация проектов по технологии
    useEffect(() => {
        if (selectedTech === 'all') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(project => project.technologies.includes(selectedTech))
            );
        }
    }, [selectedTech, projects]);

    // Получение списка всех технологий для фильтра
    const getAllTechnologies = () => {
        const techList = new Set<string>();
        projects.forEach(project => {
            project.technologies.forEach(tech => techList.add(tech));
        });
        return Array.from(techList);
    };

    // Открытие модального окна с деталями проекта
    const openProjectDetails = (project: IPortfolioItem) => {
        setSelectedProject(project);
    };

    // Закрытие модального окна
    const closeProjectDetails = () => {
        setSelectedProject(null);
    };

    // Контейнер для анимации карточек проектов
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Моё <span className="text-indigo-600 dark:text-indigo-400">портфолио</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Исследуйте мои последние проекты и узнайте, как я могу помочь воплотить ваши идеи в жизнь.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 dark:text-red-400">{error}</div>
                ) : (
                    <>
                        <PortfolioFilter
                            technologies={getAllTechnologies()}
                            selectedTech={selectedTech}
                            onChange={setSelectedTech}
                        />

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            {filteredProjects.map(project => (
                                <PortfolioCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => openProjectDetails(project)}
                                />
                            ))}
                        </motion.div>
                    </>
                )}
            </div>

            {/* Модальное окно с деталями проекта */}
            {selectedProject && (
                <PortfolioModal project={selectedProject} onClose={closeProjectDetails} />
            )}
        </section>
    );
};

export default PortfolioSection;