"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { CountrySwitcher } from "../country-switcher"
import { Button } from "@/components/ui/button"
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

// Importamos las configuraciones de países
import { countries, commonRoutes } from "@/config/countries"

export function Navbar({ countryCode = "" }: { countryCode?: string }) {
  const pathname = usePathname()
  const [country, setCountry] = React.useState<string>(countryCode || "pe")
  const { resolvedTheme } = useTheme()
  const [logoSrc, setLogoSrc] = useState("/es/logos/sayan_logo_blue.png")
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)

    // Si no se proporcionó un código de país en las props, detectarlo de la ruta
    if (!countryCode) {
      // Detectar el país actual basado en la ruta
      const detectedCountry = Object.keys(countries).find((code) => pathname.includes(`/${code}`))

      if (detectedCountry) {
        setCountry(detectedCountry)
      }
    }
  }, [pathname, countryCode])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogoSrc("/es/logos/sayan_logo_dark.png")
    } else {
      setLogoSrc("/es/logos/sayan_logo_blue.png")
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMobileMenu = () => setIsMenuOpen(false)

  // Cerrar el menú cuando se cambia de ruta
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Header Principal */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full fixed top-0 left-0 right-0 z-50"
      >
        <nav
          className={`transition-all duration-500 ${
            isScrolled
              ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-2xl border-b border-[#12a9be]/20"
              : "bg-gradient-to-r from-white via-[#12a9be]/5 to-white dark:from-slate-900 dark:via-[#0d617b]/20 dark:to-slate-900"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center gap-8 min-w-0 flex-1">
                {/* Logo con efecto hover mejorado */}
                <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/" className="block">
                    <div className="relative group">
                      <div className=""></div>
                      <div className="relative w-36 h-12 lg:w-44 lg:h-14 rounded-xl overflow-hidden">
                        {mounted && (
                          <Image
                            src={logoSrc || "/placeholder.svg"}
                            alt="SAYAN Logo"
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-110"
                            priority
                          />
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Navegación Desktop */}
                <nav className="hidden lg:flex items-center space-x-2 ml-8">
                  {commonRoutes.map((item, index) => {
                    // Construir la URL con el prefijo del país actual
                    const fullHref = item.href === "" ? `/${country}` : `/${country}${item.href}`

                    // Verificar si esta ruta está activa
                    const isActive =
                      item.href === "" ? pathname === `/${country}` : pathname === `/${country}${item.href}`

                    return (
                      <motion.div
                        key={`${item.label}-${index}`}
                        className="relative"
                        onHoverStart={() => setHoveredItem(item.label)}
                        onHoverEnd={() => setHoveredItem(null)}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={fullHref}
                          className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group block"
                        >
                          {/* Fondo animado */}
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            initial={false}
                            animate={{
                              background:
                                hoveredItem === item.label
                                  ? "linear-gradient(135deg, #12a9be, #0d617b)"
                                  : isActive
                                    ? "linear-gradient(135deg, #0d617b, #12a9be)"
                                    : "transparent",
                            }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Texto */}
                          <span
                            className={`relative z-10 transition-colors duration-300 ${
                              isActive
                                ? "text-white font-semibold"
                                : hoveredItem === item.label
                                  ? "text-white font-semibold"
                                  : "text-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Efecto de brillo */}
                          <motion.div
                            className="absolute inset-0 rounded-lg opacity-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{
                              opacity: hoveredItem === item.label ? [0, 1, 0] : 0,
                              x: hoveredItem === item.label ? [-100, 100] : 0,
                            }}
                            transition={{ duration: 0.6 }}
                          />
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>
              </div>

              {/* Controles de la derecha */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Aula Virtual Button */}
                <motion.div className="hidden sm:block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="relative overflow-hidden bg-gradient-to-r from-[#0d617b] to-[#12a9be] hover:from-[#12a9be] hover:to-[#12a9be] text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                    asChild
                  >
                    <Link href={`https://www.unp.auladm.com/`} className="flex items-center gap-2" target="_blank">
                      <motion.div className="group-hover:animate-spin">
                        <GraduationCap size={16} />
                      </motion.div>
                      Aula Virtual
                      {/* Efecto de ondas */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-full"
                        initial={{ scale: 0, opacity: 1 }}
                        whileHover={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    </Link>
                  </Button>
                </motion.div>

                {/* Country Switcher Desktop */}
                {/* <div className="hidden sm:block relative">
                  <CountrySwitcher currentCountryCode={country} size="default" />
                </div> */}

                {/* Mode Toggle */}
                <div className="flex-shrink-0 relative">
                  <ThemeSwitch />
                </div>

                {/* Botón de menú móvil */}
                <div className="flex items-center space-x-3 lg:hidden">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#12a9be]/20 to-[#b6d900]/20 hover:from-[#12a9be]/40 hover:to-[#b6d900]/40 transition-all duration-300"
                      onClick={toggleMenu}
                    >
                      <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        {isMenuOpen ? (
                          <X size={20} className="text-[#0d617b] dark:text-[#12a9be]" />
                        ) : (
                          <Menu size={20} className="text-[#0d617b] dark:text-[#12a9be]" />
                        )}
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Overlay del menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-slate-900 z-[70] shadow-2xl"
          >
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-6 border-b border-[#12a9be]/20">
              <div className="w-32 h-10 relative">
                {mounted && <Image src={logoSrc || "/placeholder.svg"} alt="Logo" fill className="object-contain" />}
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={closeMobileMenu}
                className="rounded-full hover:bg-[#12a9be]/10"
              >
                <X size={20} className="text-[#0d617b] dark:text-[#12a9be]" />
              </Button>
            </div>

            {/* Contenido del menú */}
            <div className="p-6 space-y-6">
              {/* Botón de acción móvil */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-[#0d617b] to-[#12a9be] hover:from-[#12a9be] hover:to-[#b6d900] text-white rounded-xl py-3 shadow-lg"
                  asChild
                  onClick={closeMobileMenu}
                >
                  <Link href={`/${country}/aula-virtual`} className="flex items-center justify-center gap-3">
                    <GraduationCap size={20} />
                    Aula Virtual
                  </Link>
                </Button>
              </motion.div>

              {/* Enlaces de navegación */}
              <div className="space-y-2">
                {commonRoutes.map((item, index) => {
                  const fullHref = item.href === "" ? `/${country}` : `/${country}${item.href}`
                  const isActive =
                    item.href === "" ? pathname === `/${country}` : pathname === `/${country}${item.href}`

                  return (
                    <motion.div
                      key={`mobile-${item.label}-${index}`}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Link
                        href={fullHref}
                        className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                          isActive
                            ? "bg-gradient-to-r from-[#0d617b] to-[#12a9be] text-white shadow-lg"
                            : "text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-[#12a9be]/10 hover:to-[#b6d900]/10"
                        }`}
                        onClick={closeMobileMenu}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          <motion.div
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            whileHover={{ x: 5 }}
                          >
                            <ChevronDown size={16} className="rotate-[-90deg]" />
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Divisor */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#12a9be]/30 to-transparent" />

              {/* Country Switcher Mobile y controles */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">País:</span>
                  <CountrySwitcher currentCountryCode={country} size="default" />
                </div>

                {/* Indicador de conexión */}
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-[#12a9be] rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Conectado</span>
                </div>
              </div>
            </div>

            {/* Decoración del menú */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#12a9be]/5 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
