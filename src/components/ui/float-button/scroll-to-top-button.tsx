"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario hace scroll hacia abajo más de 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <button
        onClick={scrollToTop}
        className={`group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#0d617b] to-[#12a9be] shadow-lg shadow-[#12a9be]/25 rounded-full text-white transition-all duration-300 hover:shadow-xl hover:shadow-[#12a9be]/35 hover:scale-110 hover:from-[#12a9be] hover:to-[#12a9be] active:scale-95 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        aria-label="Volver al inicio"
      >
        {/* Ícono principal */}
        <ArrowUp className="w-6 h-6 transition-all duration-300" />
      </button>
    </div>
  );
}
