'use client';

import React, {Suspense} from 'react';
import Head from 'next/head';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import {motion} from 'framer-motion';
import {Canvas} from "@react-three/fiber";
import ParticlesBackground from "@/components/sections/Hero/ThreeBackground";

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const Layout: React.FC<LayoutProps> = ({
                                           children,
                                           title = 'Максим Гуц - Личный сайт',
                                           description = 'Личный сайт разработчика с современными технологиями и удивительным дизайном'
                                       }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="@/app/favicon.ico"/>
            </Head>

            <Header/>
            <div className="fixed inset-0 z-[0]">
                <Canvas
                    gl={{
                        antialias: false,
                        failIfMajorPerformanceCaveat: true,
                    }}
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000,
                    }}
                >
                    <Suspense fallback={null}>
                        <ParticlesBackground/>
                    </Suspense>
                </Canvas>
            </div>
            <main className="flex-grow pt-20 relative">
                <motion.div
                    className="relative z-10"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    {children}
                </motion.div>
            </main>

            <Footer/>
        </div>
    );
};

export default Layout;