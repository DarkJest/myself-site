import React from 'react';
import { useState } from 'react';

const ContactInfo = () => {
    const [isVisible] = useState(true);

    const contactItems = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            value: 'your.email@example.com',
            link: 'mailto:your.email@example.com'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Телефон',
            value: '+7 (123) 456-78-90',
            link: 'tel:+71234567890'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Адрес',
            value: 'г. Москва, ул. Примерная, 123'
        }
    ];

    const handleAnimationComplete = () => {
        // Анимация завершена
    };

    // Имитация эффекта motion.div с использованием обычной анимации
    const divStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.6s ease'
    };

    return (
        <div
            style={divStyle}
            onAnimationEnd={handleAnimationComplete}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8"
        >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Контактная информация
            </h3>

            <div className="space-y-6">
                {contactItems.map((item, index) => (
                    <div key={index} className="flex items-start">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-4">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                {item.title}
                            </h4>
                            {item.link ? (
                                <a
                                    href={item.link}
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-300">
                                    {item.value}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                    Социальные сети
                </h4>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/DarkJest"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg hover:-translate-y-1 transition-transform duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </a>
                    <a
                        href="https://t.me/AjaUguju1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-lg hover:-translate-y-1 transition-transform duration-200"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;