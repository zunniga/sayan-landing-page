"use client";

import { motion } from "framer-motion";
import { GraduateDetailData } from "@/types/graduate";
import {
  Clock,
  GraduationCap,
  CheckCircle,
  ArrowLeft,
  BookOpen,
  Award,
  MapPin,
  Building2,
  Star,
  Globe,
  Medal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";

interface GraduateDetailProps {
  graduate: GraduateDetailData;
  countryCode: string;
}

export default function GraduateDetail({
  graduate,
  countryCode,
}: GraduateDetailProps) {
  const corporation = graduate.corporation[0];
  const institute = corporation?.institute;
  let API_BASE_URL = "";

  // URL base de la API
  if (countryCode == "pe") {   
    API_BASE_URL = "https://backunp.auladm.com";
  } else if (countryCode == "co") {
    API_BASE_URL = "https://backunpcol.auladm.com";
  } else {
    API_BASE_URL = "https://backunpcol.auladm.com";
  }

  // Calcular fechas de inicio y fin del diplomado
  const startDate = new Date(graduate.module[0]?.startDate || '');
  const endDate = new Date(graduate.module[graduate.module.length - 1]?.endDate || '');
  const durationInDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Convertir días a meses (redondeado hacia abajo)
  const durationInMonths = Math.floor(durationInDays / 30);

  return (
    <main className="pt-23 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto space-y-12">
      {/* Hero Section */}
      <motion.section
        className="pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
         
        <div className="relative max-w-7xl mx-auto">
          {/* Breadcrumb Mejorado */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${countryCode}/diplomados`}
              className="group inline-flex items-center gap-3 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-50 hover:to-violet-50 dark:hover:from-purple-900/20 dark:hover:to-violet-900/20 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-1.5 bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 rounded-lg transition-colors duration-300">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:-translate-x-1 transition-all duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                Volver a diplomados
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Graduate Image - Grande y prominente */}
            <motion.div
              className="relative order-2 xl:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto xl:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-violet-200 dark:from-purple-900/20 dark:to-violet-900/20 rounded-3xl blur-3xl scale-110 opacity-30"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <div className="relative aspect-square">
                    <Image
                      src="/peru/course/diplomado.webp"
                      alt={graduate.name}
                      fill
                      className="object-contain drop-shadow-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Graduate Info */}
            <motion.div
              className="space-y-6 order-1 xl:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold w-fit">
                    <GraduationCap className="w-4 h-4" />
                    Diplomado Universitario
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">5.0</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  {graduate.name}
                </h1>

                {institute && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Building2 className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{institute.name}</span>
                  </div>
                )}

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Programa académico de alto nivel que te brindará una formación integral y especializada. 
                  Certificación universitaria con reconocimiento profesional garantizado.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {durationInMonths} {durationInMonths === 1 ? 'mes' : 'meses'}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Duración total
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {graduate.module.length}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Módulos
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Virtual
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Modalidad
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        ✓
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Diploma
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Graduate Content */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            {/* Modules Details Mejorado */}
            <motion.section
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-purple-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white flex items-center gap-3">
                  <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 dark:text-purple-300" />
                  Módulos del Diplomado
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  Explora cada módulo diseñado para tu especialización académica
                </p>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-4">
                  {graduate.module.map((module, index) => (
                    <motion.div
                      key={module.id}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-600 group-hover:bg-gradient-to-r group-hover:from-purple-50/50 group-hover:to-violet-50/50 dark:group-hover:from-purple-900/10 dark:group-hover:to-violet-900/10">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-violet-600 text-white rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200 mb-3">
                              {module.name}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                              <motion.div
                                className="flex items-start gap-2 sm:gap-3 text-slate-600 dark:text-slate-300"
                                initial={{ opacity: 0.7 }}
                                whileHover={{ opacity: 1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-green-600 transition-colors duration-200" />
                                <div className="flex flex-col gap-1">
                                  <span className="text-sm leading-relaxed break-words group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
                                    Inicio: {formatDate(new Date(module.startDate))}
                                  </span>
                                  <span className="text-sm leading-relaxed break-words group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
                                    Fin: {formatDate(new Date(module.endDate))}
                                  </span>
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Institute Info */}
            {institute && (
              <motion.section
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
                  Institución Avalante
                </h2>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="relative w-16 h-16 bg-slate-100 dark:bg-gray-700 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={`${API_BASE_URL}${institute.image}`}
                      alt={institute.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      {institute.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {institute.description || "Institución universitaria de prestigio que respalda la excelencia académica de nuestros diplomados."}
                    </p>
                  </div>
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6 lg:p-8 sticky"
              style={{ top: "7rem" }} // Ajustado para el navbar
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Medal className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Detalles del Diplomado
                </h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Fecha de inicio</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                      {formatDate(startDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Fecha de fin</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                      {formatDate(endDate)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Duración</span>
                    <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                      {durationInMonths} {durationInMonths === 1 ? 'mes' : 'meses'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Diploma</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 text-sm sm:text-base">
                      ✓ Universitario
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Botón Más Información*/}
                  <Link
                    href={`/${countryCode}/contacto`}
                    className="w-full border border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-center block text-sm sm:text-base"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Más Información
                    </div>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Diploma universitario oficial</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Reconocimiento profesional</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Tutorías especializadas</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Red de alumni exclusiva</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
    </main>
  );
}