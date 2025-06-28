"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "./utils/testimonials";
import Link from "next/link";

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.4 },
      scale: { duration: 0.4 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  }),
};

const staggerContainer = {
  center: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardItemVariants = {
  enter: { y: 20, opacity: 0 },
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
}

function TestimonialCard({
  testimonial,
  isVisible,
}: {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      variants={cardItemVariants}
      className="bg-white/80 dark:bg-[#0d617b]/30 backdrop-blur-sm rounded-xl p-6 shadow-lg dark:shadow-[#12a9be]/5 border border-gray-200/50 dark:border-[#12a9be]/20 h-full flex flex-col hover:shadow-xl dark:hover:shadow-[#b6d900]/10 hover:scale-[1.02] transition-all duration-300"
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
    >
      {/* Stars with animation */}
      <motion.div
        className="flex space-x-1 mb-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
        }
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={
              isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }
            }
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.4,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Star
              className="w-5 h-5 text-[#b6d900] dark:text-[#b6d900] drop-shadow-sm"
              fill={i < testimonial.rating ? "currentColor" : "none"}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonial text */}
      <motion.blockquote
        className="text-gray-700 dark:text-gray-100 mb-6 text-sm leading-relaxed flex-grow font-medium"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        &quot;{testimonial.quote}&quot;
      </motion.blockquote>

      {/* User info */}
      <Link
        href="https://www.facebook.com/profile.php?id=61552473052389&sk=reviews"
        target="_blank"
        className="block mt-auto group"
      >
        <motion.div
          className="flex items-center"
          initial={{ x: -20, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 ring-2 ring-[#12a9be] dark:ring-[#b6d900] group-hover:ring-[#b6d900] dark:group-hover:ring-[#12a9be] transition-all duration-300">
            <Image
              src={testimonial.image || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-[#0d617b] dark:group-hover:text-[#b6d900] transition-colors">
              {testimonial.name}
            </h3>
            <p className="text-[#12a9be] dark:text-[#b6d900] text-xs font-medium">
              {testimonial.role}
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function NavButton({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <motion.button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-white/90 dark:bg-[#0d617b]/40 backdrop-blur-sm border border-gray-300/50 dark:border-[#12a9be]/30 flex items-center justify-center hover:bg-[#b6d900]/20 dark:hover:bg-[#b6d900]/30 hover:border-[#12a9be] dark:hover:border-[#b6d900] transition-all duration-300 text-gray-600 dark:text-gray-200 hover:text-[#0d617b] dark:hover:text-[#b6d900] shadow-lg dark:shadow-[#12a9be]/10"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={direction === "prev" ? "Anterior" : "Siguiente"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </motion.button>
  );
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const changeTestimonial = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      changeTestimonial(nextIndex);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: "50px 0px -50px 0px", // Start animation slightly before the section is fully visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleNavigation = (dir: "prev" | "next") => {
    const newIndex =
      dir === "prev"
        ? (currentIndex - 1 + testimonials.length) % testimonials.length
        : (currentIndex + 1) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const getVisibleTestimonials = () => {
    const extended = [...testimonials, ...testimonials];
    return Array.from({ length: 3 }, (_, i) => extended[currentIndex + i]);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-transparent py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Background decoration for dark mode */}
    
      <div className="container mx-auto px-4 max-w-7xl relative">
        {/* Header */}
        <motion.div
          className="text-left mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-0">
            <span className="mx-4 text-white p-2 rounded-2xl font-bold text-sm tracking-[0.2em] uppercase bg-gradient-to-r from-[#12a9be] to-[#12a9be] dark:bg-gradient-to-r dark:from-[#12a9be]/50 dark:to-[#12a9be] shadow-lg transition-transform duration-300 hover:scale-105">
              TESTIMONIOS
            </span>
          </div>

          <motion.h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            ¡Experiencias que{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#12a9be] to-[#0d617b] bg-clip-text text-transparent">
                inspiran!
              </span>
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-[#b6d900] dark:bg-[#b6d900] rounded-full"
                initial={{ scaleX: 0 }}
                animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-end mb-8"
          initial={{ opacity: 0, x: 20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            <NavButton
              onClick={() => handleNavigation("prev")}
              direction="prev"
            />
            <NavButton
              onClick={() => handleNavigation("next")}
              direction="next"
            />
          </div>
        </motion.div>

        {/* Testimonials Grid with Animation */}
        <div className="relative" style={{ minHeight: "400px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <motion.div
                variants={staggerContainer}
                initial="enter"
                animate="center"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <TestimonialCard
                    key={`${testimonial.id}-${currentIndex}-${index}`}
                    testimonial={testimonial}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile dots */}
        <motion.div
          className="flex justify-center space-x-2 mt-8 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => changeTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#12a9be] dark:bg-[#b6d900] scale-125"
                  : "bg-gray-300 dark:bg-[#0d617b]/40 hover:bg-gray-400 dark:hover:bg-[#0d617b]/60"
              }`}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}




