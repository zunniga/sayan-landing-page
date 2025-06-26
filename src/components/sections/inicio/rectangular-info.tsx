"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface OurTeamProps {
  countryCode: string;
  countryName: string;
}

export function RectangularInfo({ countryCode }: OurTeamProps) {
  return (
    <section className="mb-12">
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[#b6d900]/40 dark:bg-[#b6d900]/30 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-r from-[#0d617b] to-[#12a9be] dark:from-[#0d617b]/90 dark:to-[#12a9be]/90 rounded-3xl p-12 md:p-16 text-white shadow-2xl overflow-hidden">
              {/* Decoraciones */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 dark:bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative z-10 text-center">
                <motion.h3
                  className="text-3xl md:text-4xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Inspírate. Aprende. Transforma tu futuro.
                </motion.h3>
                <motion.p
                  className="text-lg md:text-xl mb-10 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  En SAYAN, estamos comprometidos con tu crecimiento. 
                  Descubre una comunidad educativa donde aprender es sinónimo de transformar vidas. 
                  ¿Listo para dar el siguiente paso?
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    className="bg-white text-[#0d617b] font-bold px-8 py-4 rounded-xl hover:bg-[#f3faff] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explorar Oportunidades
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                  <Link
                    className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-[#b6d900] hover:text-[#0d617b] transition-all duration-300"
                    href={`/${countryCode}/contacto`}
                  >
                    Contactar con Nosotros
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
