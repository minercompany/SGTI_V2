'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'custom';

interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
}

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    customColors: ThemeColors;
    setCustomColors: (colors: ThemeColors) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultColors: ThemeColors = {
    primary: '#10b981', // green-500
    secondary: '#14b8a6', // teal-500
    accent: '#f97316', // orange-500
    background: '#ffffff',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [customColors, setCustomColors] = useState<ThemeColors>(defaultColors);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Cargar tema guardado
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedColors = localStorage.getItem('customColors');

        if (savedTheme) setTheme(savedTheme);
        if (savedColors) setCustomColors(JSON.parse(savedColors));
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        // Aplicar tema
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'custom');
        root.classList.add(theme);

        // Guardar en localStorage
        localStorage.setItem('theme', theme);

        // Aplicar colores personalizados
        if (theme === 'custom') {
            root.style.setProperty('--color-primary', customColors.primary);
            root.style.setProperty('--color-secondary', customColors.secondary);
            root.style.setProperty('--color-accent', customColors.accent);
            root.style.setProperty('--color-background', customColors.background);
            localStorage.setItem('customColors', JSON.stringify(customColors));
        }
    }, [theme, customColors, isMounted]);



    return (
        <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColors }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}
