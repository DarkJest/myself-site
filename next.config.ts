import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // images: {
    //     domains: ['localhost', 'your-production-domain.com'],
    // },
    // // Настройка для взаимодействия с PHP API
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://localhost:8000/api/:path*', // Адрес PHP бэкенда
    //         },
    //     ];
    // },
};

export default nextConfig;
