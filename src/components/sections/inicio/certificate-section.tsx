"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { QrCode, Globe, Eye, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

export const FirstSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Animación principal que se ejecuta cuando está en vista
  const waveVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    }),
  };

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-transparent"
      ref={ref}
    >
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#b6d900]/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#12a9be]/20 rounded-full blur-xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={waveVariants}
            className="inline-flex items-center justify-center mb-6"
          >
            <span className="px-6 py-3 text-white rounded-full font-bold text-sm tracking-[0.2em] uppercase bg-gradient-to-r from-[#0d617b] to-[#12a9be] shadow-lg">
              NUESTRO CERTIFICADO
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={waveVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white  mb-4"
          >
            Lo que hace{" "}
            <span className="bg-gradient-to-r from-[#12a9be] to-[#0d617b] bg-clip-text text-transparent">
              único
            </span>{" "}
            nuestros certificados
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            {/* QR Code Feature */}
            <motion.div
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={waveVariants}
              className="bg-white/90 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700/50 hover:border-[#12a9be]/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#12a9be] to-[#0d617b] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Certificado con código QR único
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Todos nuestros certificados incluyen un código QR único, lo
                    que permite su verificación instantánea en{" "}
                    <span className="text-[#12a9be] font-semibold">
                      VeryCerts
                    </span>{" "}
                    garantizando autenticidad.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* International Registry Feature */}
            <motion.div
              custom={3}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={waveVariants}
              className="bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-slate-700/50 hover:border-[#12a9be]/50 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#12a9be] to-[#0d617b] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Registro digital internacional
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Tus certificados quedan registrados en una plataforma
                    moderna y segura, lo que aumenta visibilidad profesional en
                    el entorno laboral actual.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Certificate Preview */}
          <motion.div
            custom={4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={waveVariants}
            className="relative"
          >
            <div className="bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 ">
              {/* Certificate Image */}
              <div className="relative mb-6 group">
                <div className="bg-white rounded-2xl p-6 shadow-2xl transform transition-transform duration-300 group-hover:scale-105">
                  <img
                    src="/es/graduate/certificate-model.png"
                    alt="Modelo de Certificado SAYAN"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="flex-1 bg-[#12a9be] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Ver modelo de certificado
                </Button>

                <Button
                  asChild
                  className="flex-1 bg-[#12a9be] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <NextLink href="/nosotros">
                    <Info className="w-5 h-5 mr-2" />
                    Más sobre nosotros
                  </NextLink>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-4">
              Modelo de Certificado SAYAN
            </DialogTitle>
          </DialogHeader>
          <div className="relative">
            <img
             src="/es/graduate/certificate-model.png"
              alt="Modelo completo del Certificado SAYAN"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
           
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FirstSection;
