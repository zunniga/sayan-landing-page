"use client";

import { motion } from "framer-motion";
import { CourseDetailData } from "@/types/course";
import {
  Clock,
  GraduationCap,
  CheckCircle,
  ArrowLeft,
  Download,
  BookOpen,
  Award,
  MapPin,
  Building2,
  Star,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/format";
import { parseTopics } from "@/utils/course";

interface CourseDetailProps {
  course: CourseDetailData;
  countryCode: string;
}

export default function CourseDetail({
  course,
  countryCode,
}: CourseDetailProps) {
  const topics = parseTopics(course.topics || []);
  const corporation = course.corporation[0];
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

  // Formatear fechas
  const startDate = new Date(course.startDate);
  const endDate = new Date(course.endDate);
  const duration = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

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
              href={`/${countryCode}/cursos`}
              className="group inline-flex items-center gap-3 bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="p-1.5 bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 rounded-lg transition-colors duration-300">
                <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:-translate-x-1 transition-all duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                Volver a cursos
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Course Image - Grande y prominente */}
            <motion.div
              className="relative order-2 xl:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto xl:max-w-none">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-3xl scale-110 opacity-30"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <div className="relative aspect-square">
                    <Image
                      src="/peru/course/diplomado.webp"
                      alt={course.name}
                      fill
                      className="object-contain drop-shadow-lg"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Info */}
            <motion.div
              className="space-y-6 order-1 xl:order-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold w-fit">
                    <BookOpen className="w-4 h-4" />
                    Curso Profesional
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
                  {course.name}
                </h1>

                {institute && (
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Building2 className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{institute.name}</span>
                  </div>
                )}

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Domina las habilidades profesionales con nuestro curso especializado. 
                  Certificación universitaria incluida y acceso de por vida al contenido.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {corporation?.hours}h
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
                        {topics.length}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        Módulos
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        Online
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
                        Certificado
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
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            {/* Course Details Mejorado */}
            <motion.section
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-blue-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-white">
                <h2 className="text-xl sm:text-2xl font-bold text-white dark:text-white flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300 dark:text-blue-300" />
                  Contenido del Curso
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                  Explora cada módulo diseñado para tu crecimiento profesional
                </p>
              </div>
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-4">
                  {topics.map((topic, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 group-hover:bg-gradient-to-r group-hover:from-blue-50/50 group-hover:to-indigo-50/50 dark:group-hover:from-blue-900/10 dark:group-hover:to-indigo-900/10">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3">
                              {topic.tema}
                            </h3>
                            {topic.subTema && topic.subTema.length > 0 && (
                              <ul className="space-y-2 sm:space-y-2.5">
                                {topic.subTema.map((subTema, subIndex) => (
                                  <motion.li
                                    key={subIndex}
                                    className="flex items-start gap-2 sm:gap-3 text-slate-600 dark:text-slate-300"
                                    initial={{ opacity: 0.7 }}
                                    whileHover={{ opacity: 1 }}
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 group-hover:text-green-600 transition-colors duration-200" />
                                    <span className="text-sm leading-relaxed break-words group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-200">
                                      {subTema}
                                    </span>
                                  </motion.li>
                                ))}
                              </ul>
                            )}
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
                      {institute.description || "Institución de prestigio que avala la calidad educativa de nuestros programas."}
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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  Detalles del Curso
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
                      {duration} días
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <span className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Certificado</span>
                    <span className="font-semibold text-green-600 dark:text-green-400 text-sm sm:text-base">
                      ✓ Incluido
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {corporation?.flyerCourse && corporation.flyerCourse.length > 0 && (
                    <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                      <Download className="w-4 h-4" />
                      Descargar Brochure
                    </button>
                  )}

                  {/* Botón Más Información*/}
                  <Link
                    href={`/${countryCode}/contacto`}
                    className="w-full border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-center block text-sm sm:text-base"
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
                      <span>Acceso de por vida</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Certificado verificable</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Soporte 24/7</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>Garantía de 30 días</span>
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