'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Palette } from 'lucide-react';
import { useState } from 'react';

export function ThemeSwitcher() {
    const { theme, setTheme, customColors, setCustomColors } = useTheme();
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <div className="relative">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-lg rounded-full p-1 shadow-lg border border-gray-200">
                <button
                    onClick={() => setTheme('light')}
                    className={`p-2 rounded-full transition-all ${theme === 'light'
                            ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    title="Tema Claro"
                >
                    <Sun className="w-4 h-4" />
                </button>

                <button
                    onClick={() => setTheme('dark')}
                    className={`p-2 rounded-full transition-all ${theme === 'dark'
                            ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    title="Tema Oscuro"
                >
                    <Moon className="w-4 h-4" />
                </button>

                <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`p-2 rounded-full transition-all ${theme === 'custom'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    title="Colores Personalizados"
                >
                    <Palette className="w-4 h-4" />
                </button>
            </div>

            {/* Color Picker Panel */}
            {showColorPicker && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 z-50">
                    <h3 className="font-semibold text-gray-900 mb-4">Personaliza tus colores</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Color Principal
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={customColors.primary}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, primary: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={customColors.primary}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, primary: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Color Secundario
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={customColors.secondary}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, secondary: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={customColors.secondary}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, secondary: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Color Acento
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={customColors.accent}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, accent: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={customColors.accent}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, accent: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Fondo
                            </label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={customColors.background}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, background: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300"
                                />
                                <input
                                    type="text"
                                    value={customColors.background}
                                    onChange={(e) => {
                                        setCustomColors({ ...customColors, background: e.target.value });
                                        setTheme('custom');
                                    }}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowColorPicker(false)}
                        className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all"
                    >
                        Aplicar
                    </button>
                </div>
            )}
        </div>
    );
}
