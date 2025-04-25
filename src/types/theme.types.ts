export type ThemeMode = 'light' | 'dark' | 'system';

export interface IThemeContext {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}