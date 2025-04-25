'use client';

import { useEffect, useState } from "react";

export const HtmlWrapper = ({ children }: { children: React.ReactNode }) => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        try {
            const theme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const isDarkMode = theme === "dark" || (!theme && prefersDark);
            setIsDark(isDarkMode);
        } catch {
            setIsDark(false);
        }
    }, []);

    return (
        <html lang="en" className={isDark ? "dark" : ""}>
        {children}
        </html>
    );
};
