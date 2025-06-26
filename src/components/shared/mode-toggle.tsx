"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Switch } from "@/components/ui/switch"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Necesitamos asegurarnos de que el componente está montado antes de renderizar
  // contenido que depende del tema para evitar errores de hidratación
  React.useEffect(() => {
    setMounted(true)
  }, [])
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Si no está montado, renderizar un placeholder con las mismas dimensiones
  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-4 w-4" />
        <div className="h-[1.15rem] w-8" /> {/* Dimensiones iguales al Switch */}
        <div className="h-4 w-4" />
        <span className="sr-only">Cambiar tema</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 text-amber-500" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-[#1a1a2e] data-[state=unchecked]:bg-gray-200"
      />
      <Moon className="h-4 w-4 text-[#40C8F8]" />
      <span className="sr-only">Cambiar tema</span>
    </div>
  )
}