import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react"; // Use icons from Lucide for light/dark themes

const ThemeToggler = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Store theme in local storage
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-700"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-gray-800 dark:text-white" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggler;
