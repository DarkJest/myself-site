'use client';

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {contactService} from '@/api/services/contactService';
import {IContactFormData} from '@/types/contact.types';

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Обработка изменения значений полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));

        // Очищаем ошибку поля при редактировании
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({...prev, [name]: undefined}));
        }
    };

    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        let isValid = true;

        // Проверка имени
        if (!formData.name.trim()) {
            newErrors.name = 'Пожалуйста, введите ваше имя';
            isValid = false;
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Пожалуйста, введите ваш email';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Пожалуйста, введите корректный email';
            isValid = false;
        }

        // Проверка темы
        if (!formData.subject.trim()) {
            newErrors.subject = 'Пожалуйста, введите тему сообщения';
            isValid = false;
        }

        // Проверка сообщения
        if (!formData.message.trim()) {
            newErrors.message = 'Пожалуйста, введите ваше сообщение';
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Сообщение должно содержать не менее 10 символов';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Отправка формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const contactData: IContactFormData = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message
            };

            const response = await contactService.sendMessage(contactData);

            if (response.success) {
                setSubmitStatus('success');
                setStatusMessage('Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время.');

                // Очистка формы после успешной отправки
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error(response.message || 'Произошла ошибка при отправке сообщения');
            }
        } catch (error) {
            setSubmitStatus('error');
            setStatusMessage(
                error instanceof Error
                    ? error.message
                    : 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.6}}
            viewport={{once: true}}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8"
        >
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Напишите мне
            </h3>

            {submitStatus === 'success' ? (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6"
                >
                    <p>{statusMessage}</p>
                    <button
                        onClick={() => setSubmitStatus('idle')}
                        className="mt-4 text-sm font-medium text-green-800 dark:text-green-300 hover:underline"
                    >
                        Отправить еще одно сообщение
                    </button>
                </motion.div>
            ) : submitStatus === 'error' ? (
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6"
                >
                    <p>{statusMessage}</p>
                    <button
                        onClick={() => setSubmitStatus('idle')}
                        className="mt-4 text-sm font-medium text-red-800 dark:text-red-300 hover:underline"
                    >
                        Попробовать снова
                    </button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Имя
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:text-white ${
                                    errors.name
                                        ? 'border-red-500 dark:border-red-500'
                                        : 'border-gray-300 dark:border-gray-700'
                                }`}
                                placeholder="Ваше имя"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:text-white ${
                                    errors.email
                                        ? 'border-red-500 dark:border-red-500'
                                        : 'border-gray-300 dark:border-gray-700'
                                }`}
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Тема
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:text-white ${
                                errors.subject
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-700'
                            }`}
                            placeholder="Тема сообщения"
                        />
                        {errors.subject && (
                            <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Сообщение
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={`w-full p-3 border rounded-lg bg-gray-50 placeholder-gray-400 dark:bg-gray-800 dark:text-white ${
                                errors.message
                                    ? 'border-red-500 dark:border-red-500'
                                    : 'border-gray-300 dark:border-gray-700'
                            }`}
                            placeholder="Ваше сообщение..."
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                        <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
                </svg>
                Отправка...
                    </span>
                        ) : (
                            'Отправить сообщение'
                        )}
                    </motion.button>
                </form>
            )}
        </motion.div>
    );
};

export default ContactForm;