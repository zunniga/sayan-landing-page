"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"

interface LoadingScreenProps {
  progress?: number
  onComplete?: () => void
}

export function LoadingScreen({ progress = 0, onComplete }: LoadingScreenProps) {
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Mensajes dinámicos basados en el progreso
  const loadingMessages = [
    "Iniciando sistema...",
    "Cargando recursos...",
    "Preparando interfaz...",
    "Configurando experiencia...",
    "Casi listo...",
  ]


  // Posiciones fijas para partículas (determinísticas)
  const particlePositions = [
    { left: 10, top: 85, size: "w-3 h-3", color: "bg-[#12a9be]/30", delay: 0 },
    { left: 20, top: 90, size: "w-2 h-2", color: "bg-[#0d617b]/40", delay: 0.1 },
    { left: 30, top: 88, size: "w-1.5 h-1.5", color: "bg-[#b6d900]/50", delay: 0.2 },
    { left: 40, top: 92, size: "w-3 h-3", color: "bg-[#12a9be]/30", delay: 0.3 },
    { left: 50, top: 87, size: "w-2 h-2", color: "bg-[#0d617b]/40", delay: 0.4 },
    { left: 60, top: 91, size: "w-1.5 h-1.5", color: "bg-[#b6d900]/50", delay: 0.5 },
    { left: 70, top: 89, size: "w-3 h-3", color: "bg-[#12a9be]/30", delay: 0.6 },
    { left: 80, top: 93, size: "w-2 h-2", color: "bg-[#0d617b]/40", delay: 0.7 },
    { left: 90, top: 86, size: "w-1.5 h-1.5", color: "bg-[#b6d900]/50", delay: 0.8 },
    { left: 15, top: 94, size: "w-3 h-3", color: "bg-[#12a9be]/30", delay: 0.9 },
  ]

  // Detectar cliente para evitar hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true)
    }, 50) // Pequeño retraso para asegurar hidratación completa

    return () => clearTimeout(timer)
  }, [])

  // Callback para manejar la finalización
  const handleComplete = useCallback(() => {
    setIsComplete(true)
    onComplete?.()
  }, [onComplete])

  // Animación del progreso - solo en cliente
  useEffect(() => {
    if (!isClient) return

    if (progress > 0) {
      setCurrentProgress(progress)

      // Actualizar etapa basada en progreso
      if (progress > 20 && progress <= 40) setLoadingStage(1)
      else if (progress > 40 && progress <= 60) setLoadingStage(2)
      else if (progress > 60 && progress <= 80) setLoadingStage(3)
      else if (progress > 80) setLoadingStage(4)

      if (progress >= 100) {
        const timer = setTimeout(handleComplete, 800)
        return () => clearTimeout(timer)
      }
      return
    }

    // Incrementos determinísticos para evitar Math.random()
    const increments = [8, 12, 15, 10, 7, 13, 9, 11, 14, 6]
    let incrementIndex = 0

    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        const increment = increments[incrementIndex % increments.length]
        incrementIndex++
        const newProgress = Math.min(prev + increment, 100)

        // Actualizar etapa basada en progreso
        if (newProgress > 20 && newProgress <= 40) setLoadingStage(1)
        else if (newProgress > 40 && newProgress <= 60) setLoadingStage(2)
        else if (newProgress > 60 && newProgress <= 80) setLoadingStage(3)
        else if (newProgress > 80) setLoadingStage(4)

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(handleComplete, 800)
          return 100
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(interval)
  }, [progress, isClient, handleComplete])

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const logoVariants = {
    hidden: {
      scale: 0.3,
      opacity: 0,
      rotateY: -180,
      filter: "blur(20px)",
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 1.2,
      },
    },
  }

  const textVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  const progressContainerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const particleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotate: 0,
    },
    animate: {
      scale: [0, 1, 0.8, 1],
      opacity: [0, 0.8, 0.6, 0],
      rotate: [0, 180, 360],
      y: [0, -120, -200],
      x: [0, 30, -15],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 4,
        ease: "easeOut",
      },
    },
  }

  const mainRingVariants = {
    initial: { rotate: 0, scale: 0.8, opacity: 0.6 },
    animate: {
      rotate: 360,
      scale: [0.8, 1.1, 0.8],
      opacity: [0.6, 1, 0.6],
      transition: {
        rotate: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "linear",
        },
        scale: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 2,
          ease: "easeInOut",
        },
      },
    },
  }

  // No renderizar hasta que el cliente esté listo
  if (!isClient) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          suppressHydrationWarning={true}
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(13, 97, 123, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(18, 169, 190, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(182, 217, 0, 0.2) 0%, transparent 60%),
              linear-gradient(135deg, rgb(248, 250, 255) 0%, rgb(240, 245, 255) 50%, rgb(235, 242, 255) 100%)
            `,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Overlay modo oscuro */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0d617b] to-[#12a9be] dark:opacity-100 opacity-0 transition-opacity duration-500"
            suppressHydrationWarning={true}
          />

          {/* Partículas flotantes con valores determinísticos */}
          <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning={true}>
            {particlePositions.map((particle, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute rounded-full ${particle.size} ${particle.color}`}
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                variants={{
                  ...particleVariants,
                  animate: {
                    ...particleVariants.animate,
                    transition: {
                      ...particleVariants.animate.transition,
                      delay: particle.delay,
                    },
                  },
                }}
                initial="initial"
                animate="animate"
                suppressHydrationWarning={true}
              />
            ))}
          </div>

          {/* Efectos de fondo geométricos */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20" suppressHydrationWarning={true}>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#12a9be] rounded-full animate-pulse" />
            <div
              className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-[#0d617b] rounded-lg rotate-45 animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 right-1/3 w-16 h-16 border border-[#b6d900] rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Contenedor principal del logo */}
          <motion.div className="relative mb-12" variants={logoVariants} suppressHydrationWarning={true}>
            {/* Anillo exterior principal */}
            <motion.div
              className="absolute inset-0 w-48 h-48 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #0d617b, #12a9be, #b6d900, #0d617b)",
                padding: "3px",
              }}
              variants={mainRingVariants}
              initial="initial"
              animate="animate"
              suppressHydrationWarning={true}
            >
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full" />
            </motion.div>

            {/* Anillo medio */}
            <motion.div
              className="absolute inset-3 w-42 h-42 border-2 border-transparent bg-gradient-to-r from-[#0d617b] via-[#12a9be] to-[#b6d900] rounded-full opacity-60"
              animate={{
                rotate: -360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "linear",
                },
                scale: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "easeInOut",
                },
              }}
              suppressHydrationWarning={true}
            />

            {/* Logo central */}
            <div className="relative w-48 h-48 p-12 flex items-center justify-center">
              <motion.div
                className="relative w-full h-full"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
                suppressHydrationWarning={true}
              >
                <Image
                  src="/es/logos/logo-dark.png"
                  alt="SAYAN Logo"
                  className="dark:hidden w-full h-full object-contain drop-shadow-lg"
                  width={120}
                  height={120}
                  priority
                />
                <Image
                  src="/es/logos/logo-dark.png"
                  alt="SAYAN Logo"
                  className="hidden dark:block w-full h-full object-contain drop-shadow-lg"
                  width={120}
                  height={120}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.div className="text-center mb-8" variants={textVariants} suppressHydrationWarning={true}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 relative"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #0d617b, #12a9be, #b6d900, #0d617b, #12a9be)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              suppressHydrationWarning={true}
            >
              SAYAN
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
              variants={textVariants}
              suppressHydrationWarning={true}
            >
              Centro de Investigación y Mejoramiento Académico para el Desarrollo Educativo
            </motion.p>
          </motion.div>

          {/* Sección de progreso */}
          <motion.div
            className="w-full max-w-md px-4"
            variants={progressContainerVariants}
            suppressHydrationWarning={true}
          >
            {/* Mensaje dinámico */}
            <motion.p
              className="text-center text-gray-500 dark:text-gray-400 mb-6 font-medium"
              key={`message-${loadingStage}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              suppressHydrationWarning={true}
            >
              {loadingMessages[loadingStage]}
            </motion.p>

            {/* Barra de progreso moderna */}
            <div className="relative mb-4" suppressHydrationWarning={true}>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-full relative rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0d617b, #12a9be, #b6d900)",
                    backgroundSize: "200% 100%",
                  }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${Math.min(currentProgress, 100)}%`,
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    width: { duration: 0.3, ease: "easeOut" },
                    backgroundPosition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" },
                  }}
                  suppressHydrationWarning={true}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </motion.div>
              </div>

              {/* Indicadores de progreso */}
              <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Porcentaje */}
            <motion.div
              className="text-center text-2xl font-bold text-gray-700 dark:text-gray-200 mb-8"
              animate={{
                scale: currentProgress > 0 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
              suppressHydrationWarning={true}
            >
              {Math.round(currentProgress)}%
            </motion.div>
          </motion.div>

          {/* Indicadores de carga */}
          <motion.div className="flex space-x-3 mb-12" variants={textVariants} suppressHydrationWarning={true}>
            {[0, 0.2, 0.4, 0.6, 0.8].map((delay, index) => (
              <motion.div
                key={`indicator-${index}`}
                className="w-3 h-3 rounded-full"
                style={{
                  background: "linear-gradient(45deg, #0d617b, #12a9be)",
                }}
                animate={{
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.8,
                  delay,
                  ease: "easeInOut",
                }}
                suppressHydrationWarning={true}
              />
            ))}
          </motion.div>

          {/* Footer */}
          <motion.div className="absolute bottom-8 text-center" variants={textVariants} suppressHydrationWarning={true}>
            <motion.p
              className="text-sm text-gray-400 dark:text-gray-500 mb-2"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              suppressHydrationWarning={true}
            >
              Preparando tu experiencia educativa de excelencia
            </motion.p>
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-300 dark:text-gray-600">
              <div className="w-2 h-2 bg-[#b6d900] rounded-full animate-pulse" />
              <span>Sistema inicializado</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
