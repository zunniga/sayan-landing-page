"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  countryCode: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  withPattern?: boolean;
}

export function CTASection({
  countryCode,
  title = "Comienza tu desarrollo profesional hoy",
  subtitle = "Transforma tu carrera con nuestros programas educativos diseñados para el éxito",
  primaryButtonText = "Explorar cursos",
  primaryButtonLink = "/cursos",
  secondaryButtonText = "Conocer más",
  secondaryButtonLink = "/nosotros",
}: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden rounded-2xl">
      {/* Fondo con degradado profesional */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-800 to-blue-950 dark:from-gray-950 dark:to-blue-950"></div>

      {/* Patrón de puntos */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px' 
        }}></div>
      </div>

      {/* Decoración geométrica - líneas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M0,0 L100,0 L100,100 L0,100 Z" 
            stroke="white" 
            strokeWidth="0.5" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
          />
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.line 
              key={`line-${i}`}
              x1="0" 
              y1={20 * (i + 1)} 
              x2="100" 
              y2={20 * (i + 1)}
              stroke="white" 
              strokeWidth="0.2" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "loop" }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.line 
              key={`vert-${i}`}
              x1={20 * (i + 1)} 
              y1="0" 
              x2={20 * (i + 1)} 
              y2="100"
              stroke="white" 
              strokeWidth="0.2" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatType: "loop" }}
            />
          ))}
        </svg>
      </div>

      {/* Elemento decorativo - círculos */}
      <motion.div 
        className="absolute -top-[25%] -right-[15%] w-1/2 h-1/2 opacity-20 z-0 bg-blue-600 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.25, 0.2] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-[25%] -left-[10%] w-1/3 h-1/2 opacity-10 z-0 bg-indigo-600 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />

      {/* Contenido principal */}
      <div className="container mx-auto relative z-10 px-4 flex flex-col lg:flex-row items-center">
        {/* Columna izquierda */}
        <motion.div 
          className="w-full lg:w-3/5 mb-12 lg:mb-0 pr-0 lg:pr-12 lg:pl-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 w-16 h-2 bg-blue-500 rounded-full transform -translate-y-8"></div>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>
          </div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-base px-8 py-3 h-auto rounded-md transition-all duration-300 relative overflow-hidden group"
              asChild
            >
              <Link href={`/${countryCode}${primaryButtonLink}`} className="relative flex items-center">
                <span className="mr-2">{primaryButtonText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 dark:text-white hover:bg-white/10 border shadow-md transition-all duration-300 font-medium text-base px-8 py-3 h-auto rounded-md"
              asChild
            >
              <Link href={`/${countryCode}${secondaryButtonLink}`}>
                {secondaryButtonText}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Columna derecha - Elemento visual */}
        <motion.div 
          className="w-full lg:w-2/5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="relative mx-auto max-w-md">
            {/* Tarjeta principal */}
            <div className="relative bg-gradient-to-br from-white/[0.15] to-white/[0.05] backdrop-blur-lg rounded-lg p-8 border border-white/10 shadow-2xl shadow-blue-900/20 overflow-hidden">
              {/* Decoración interior */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl"></div>
              
              {/* Icono decorativo */}
              <div className="bg-blue-600/20 p-4 inline-flex rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">Únete a los profesionales que confían en CIMADE</h3>
              
              {/* Stats/features destacados */}
              <div className="space-y-4 mb-6">
                {[
                  { label: "Programas actualizados", value: "+50" },
                  { label: "Instructores expertos", value: "+30" },
                  { label: "Estudiantes satisfechos", value: "+1000" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1 text-sm text-gray-300">{item.label}</div>
                    <div className="text-sm font-semibold text-white">{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <Button
                  size="sm"
                  className="w-full bg-white hover:bg-gray-100 text-blue-800 transition-colors duration-300 font-medium"
                  asChild
                >
                  <Link href={`/${countryCode}${primaryButtonLink}`}>
                    Descubre nuestros programas
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
