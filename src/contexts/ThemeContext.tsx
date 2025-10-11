import React, { useState, useEffect } from "react";
import { ThemeContext, type Theme } from "./contexts";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>("green");

  // При зміні теми додаємо клас до <html>
  useEffect(() => {
    document.documentElement.classList.remove(
      "theme-red",
      "theme-blue",
      "theme-green"
    );
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
