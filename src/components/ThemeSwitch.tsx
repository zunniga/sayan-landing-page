"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react"; // Asegúrate de tener estos íconos instalados

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
    rounded-xl p-2 border transition-colors duration-300
    shadow-sm hover:shadow-md
    border-zinc-300/70 bg-transparent hover:bg-transparent text-zinc-800
    dark:border-zinc-700 dark:bg-transparent dark:hover:bg-transparent dark:text-zinc-100
  `}
      aria-label="Cambiar tema"
    >
      {isDark ? (
        <Sun className="w-5 h-5  text-[#b6d900]" />
      ) : (
        <Moon className="w-5 h-5  text-[#0d617b]" />
      )}
    </button>
  );
};

export default ThemeSwitch;
