import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties for better dark mode
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#0f172a');
      document.documentElement.style.setProperty('--bg-secondary', '#1e293b');
      document.documentElement.style.setProperty('--text-primary', '#f1f5f9');
      document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
      document.documentElement.style.setProperty('--card-bg', 'rgba(30, 41, 59, 0.95)');
      document.documentElement.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--input-bg', 'rgba(30, 41, 59, 0.9)');
      document.documentElement.style.setProperty('--input-border', 'rgba(255, 255, 255, 0.2)');
      document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 0.3)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f5f7fa');
      document.documentElement.style.setProperty('--bg-secondary', '#c3cfe2');
      document.documentElement.style.setProperty('--text-primary', '#1a202c');
      document.documentElement.style.setProperty('--text-secondary', '#4a5568');
      document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
      document.documentElement.style.setProperty('--card-border', 'rgba(255, 255, 255, 0.3)');
      document.documentElement.style.setProperty('--input-bg', 'rgba(255, 255, 255, 0.9)');
      document.documentElement.style.setProperty('--input-border', 'rgba(255, 255, 255, 0.4)');
      document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.1)');
      document.documentElement.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.2)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 