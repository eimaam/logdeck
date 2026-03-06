import { createContext, useContext } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    isDark: false,
    toggleTheme: () => { }
});

export const useTheme = () => useContext(ThemeContext);
