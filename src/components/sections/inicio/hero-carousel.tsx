"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Variantes de animación para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

// Variantes para elementos que vienen desde la izquierda
const slideInLeft = {
  hidden: {
    x: -100,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 0.8,
    },
  },
};

// Variantes para elementos que vienen desde la derecha
const slideInRight = {
  hidden: {
    x: 100,
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 1,
    },
  },
};

// Variantes para el título con efecto de escritura
const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

// Variantes para elementos flotantes
const floatingVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      delay: 1.2,
    },
  },
};

export default function HeroCarousel() {
  // Función para dividir texto en palabras para animación
  const splitText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        variants={letterVariants}
        className="inline-block mr-2"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#12a9be]/5 to-[#b6d900]/10 dark:from-slate-900 dark:via-[#0d617b]/10 dark:to-[#12a9be]/5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className=" absolute inset-0 opacity-50">
        {/* Imagen para modo claro */}
        <Image
          src="/es/bg/bg-sayan-blue.png"
          alt=""
          fill
          className="object-cover dark:hidden"
          priority
        />
        {/* Imagen para modo oscuro */}
        <Image
          src="/es/bg/bg-sayan-white.png"
          alt=""
          fill
          className="object-cover hidden dark:block"
          priority
        />
      </div>

      {/* Elementos flotantes decorativos */}
      <motion.div
        className="absolute top-20 right-20 w-20 h-20 bg-[#12a9be]/20 dark:bg-[#12a9be]/30 rounded-full blur-xl"
        variants={floatingVariants}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-[#b6d900]/30 dark:bg-[#b6d900]/40 rounded-full blur-lg"
        variants={floatingVariants}
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-10 w-16 h-16 bg-[#0d617b]/20 dark:bg-[#0d617b]/30 rounded-full blur-lg"
        variants={floatingVariants}
        animate={{
          y: [0, -25, 0],
          x: [0, 12, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Contenido principal https://www.wispredes.com/ */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Contenido de texto */}
          <motion.div
            className="text-[#0d617b] dark:text-white order-2 lg:order-1"
            variants={slideInLeft}
          >
            <motion.div
              className="text-4xl text-center lg:text-left md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6"
              variants={titleVariants}
            >
              <motion.span
                className="text-[#0d617b] dark:text-white"
                variants={letterVariants}
              >
                {splitText("Educación que")}
              </motion.span>
              <br />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#b6d900] to-[#12a9be] dark:from-[#b6d900] dark:to-[#12a9be]"
                variants={letterVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                transforma vidas.
              </motion.span>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-center lg:text-left lg:text-2xl mb-8 text-[#0d617b]/80 dark:text-gray-300 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    delay: 1.5,
                  },
                },
              }}
            >
              Capacitación 100% virtual, accesible y certificada en áreas
              técnicas y profesionales.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12 justify-center lg:justify-start"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 2,
                  },
                },
              }}
            >
              <motion.div
                className="rounded-full"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(18, 169, 190, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-[#0d617b] to-[#12a9be] hover:from-[#12a9be] hover:to-[#12a9be] text-white border-0 shadow-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#12a9be]/25 rounded-full"
                >
                  <Link href="/graduates">Ver diplomados</Link>
                </Button>
              </motion.div>

              <motion.div
                className="rounded-full"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(18, 169, 190, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-2 border-[#12a9be] text-[#0d617b] dark:text-[#12a9be] hover:bg-[#12a9be] hover:text-white dark:hover:text-white transition-all duration-300 rounded-full"
                >
                  <Link href="/#contacts">Contáctanos</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Área con imagen */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
            variants={slideInRight}
          >
            <div className="relative w-full max-w-2xl">
              {/* Imagen principal con animaciones mejoradas */}
              <motion.div
                className="relative z-10"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="relative w-full max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      delay: 0.8,
                    }}
                  >
                    <Image
                      src="/es/bg/bg-hero.svg"
                      alt="Educación que transforma vidas - Estudiante con laptop"
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </motion.div>

                  {/* Formas decorativas con los colores del header */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#12a9be]/30 to-[#b6d900]/30 rounded-full blur-2xl -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  />
                  <motion.div
                    className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-[#0d617b]/20 to-[#12a9be]/20 rounded-full blur-2xl -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                  />
                  <motion.div
                    className="absolute top-1/2 -right-4 w-24 h-24 bg-gradient-to-br from-[#b6d900]/25 to-[#12a9be]/25 rounded-full blur-xl -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 2.1, duration: 1 }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
