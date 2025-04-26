'use client';

import React, { useEffect, useState } from 'react';
import { Toaster, toast as hotToast, ToastOptions } from 'react-hot-toast';

// Типы для нашего компонента
type ToastType = 'success' | 'error' | 'info';
type ThemeType = 'light' | 'dark';

interface ToastStyle {
    background: string;
    border: string;
    color: string;
}

interface ToastStylesMap {
    [key: string]: {
        light: ToastStyle;
        dark: ToastStyle;
    };
}

interface ToastIconProps {
    type: ToastType;
    isDarkTheme: boolean;
}

interface CustomToastOptions extends Partial<ToastOptions> {
    style?: React.CSSProperties;
}

interface ToastAPI {
    success: (message: string, options?: CustomToastOptions) => string;
    error: (message: string, options?: CustomToastOptions) => string;
    info: (message: string, options?: CustomToastOptions) => string;
    promise: <T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((err: unknown) => string);
        },
        options?: CustomToastOptions
    ) => Promise<T>;
    loading: (message: string, options?: CustomToastOptions) => string;
    dismiss: (toastId?: string) => void;
}

// Функция для определения текущей темы на основе классов Tailwind
const useThemeDetector = (): boolean => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    useEffect(() => {
        // Проверяем, есть ли класс dark на html или body элементе
        const checkTheme = (): void => {
            const isDark = document.documentElement.classList.contains('dark') ||
                document.body.classList.contains('dark');
            setIsDarkTheme(isDark);
        };

        // Проверяем при монтировании
        checkTheme();

        // Используем MutationObserver для отслеживания изменений классов
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    checkTheme();
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });
        observer.observe(document.body, { attributes: true });

        return () => {
            observer.disconnect();
        };
    }, []);

    return isDarkTheme;
};

// Компонент для отображения иконок в toast
const ToastIcon: React.FC<ToastIconProps> = ({ type, isDarkTheme }) => {
    const theme = isDarkTheme ? 'dark' : 'light';
    const iconColors = {
        success: {
            light: '#0ea5e9', // text-sky-500
            dark: '#38bdf8'   // text-sky-400
        },
        error: {
            light: '#ef4444', // text-red-500
            dark: '#f87171'   // text-red-400
        },
        info: {
            light: '#6366f1', // text-indigo-500
            dark: '#a5b4fc'   // text-indigo-400
        }
    };

    const iconColor = iconColors[type][theme];

    if (type === 'success') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        );
    }

    if (type === 'error') {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
        );
    }

    // Info icon по умолчанию
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    );
};

// Кастомный компонент Toaster
export const CustomToaster: React.FC = () => {
    const isDarkTheme = useThemeDetector();

    // Стили для toast-уведомлений на основе Tailwind
    const toastStyles: ToastStylesMap = {
        success: {
            light: {
                background: '#f0f9ff', // bg-sky-50
                border: '1px solid #38bdf8', // border-sky-400
                color: '#0369a1' // text-sky-700
            },
            dark: {
                background: '#0c4a6e', // bg-sky-900
                border: '1px solid #0284c7', // border-sky-600
                color: '#e0f2fe' // text-sky-100
            }
        },
        error: {
            light: {
                background: '#fef2f2', // bg-red-50
                border: '1px solid #ef4444', // border-red-500
                color: '#b91c1c' // text-red-700
            },
            dark: {
                background: '#450a0a', // bg-red-900
                border: '1px solid #b91c1c', // border-red-700
                color: '#fecaca' // text-red-200
            }
        },
        info: {
            light: {
                background: '#eef2ff', // bg-indigo-50
                border: '1px solid #6366f1', // border-indigo-500
                color: '#4338ca' // text-indigo-700
            },
            dark: {
                background: '#3730a3', // bg-indigo-900
                border: '1px solid #4f46e5', // border-indigo-600
                color: '#e0e7ff' // text-indigo-100
            }
        }
    };

    const theme: ThemeType = isDarkTheme ? 'dark' : 'light';

    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Общие настройки для всех типов toast
                duration: 5000,
                style: {
                    borderRadius: '0.5rem', // rounded-lg в Tailwind
                    boxShadow: '0 4px 4px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // shadow-lg в Tailwind
                    padding: '0.75rem 1rem', // p-3 px-4 в Tailwind
                    maxWidth: '24rem', // max-w-sm в Tailwind
                    fontSize: '0.875rem', // text-sm в Tailwind
                    fontWeight: '500', // font-medium в Tailwind
                },
                // Настройки для каждого типа toast
                success: {
                    icon: <ToastIcon type="success" isDarkTheme={isDarkTheme} />,
                    style: toastStyles.success[theme],
                },
                error: {
                    icon: <ToastIcon type="error" isDarkTheme={isDarkTheme} />,
                    style: toastStyles.error[theme],
                },
                custom: {
                    icon: <ToastIcon type="info" isDarkTheme={isDarkTheme} />,
                    style: toastStyles.info[theme],
                },
            }}
        />
    );
};

// Обертки для функций toast, чтобы сохранить стиль проекта
export const toast: ToastAPI = {
    success: (message, options = {}) => {
        return hotToast.success(message, options);
    },
    error: (message, options = {}) => {
        return hotToast.error(message, options);
    },
    info: (message, options = {}) => {
        return hotToast.custom(message, options);
    },
    promise: (promise, messages, options = {}) => {
        return hotToast.promise(promise, messages, options);
    },
    loading: (message, options = {}) => {
        return hotToast.loading(message, {
            style: {
                background: '#ffffff',
                color: '#4b5563',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                ...options?.style
            },
            ...options
        });
    },
    dismiss: (toastId) => {
        hotToast.dismiss(toastId);
    }
};

export default CustomToaster;