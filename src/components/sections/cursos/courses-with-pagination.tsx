'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseGrid } from '@/components/ui/course/course-grid';
import { CourseList } from '@/components/ui/course/course-list';
import { CourseSkeleton } from '@/components/ui/skeleton/course-skeleton';
import { CourseListSkeleton } from '@/components/ui/skeleton/course-list-skeleton';
import { CourseData } from '@/types/course';
import { fetchCoursesClient } from '@/lib/api/courses-client';
import { ChevronLeft, ChevronRight, MoreHorizontal, Grid, List } from 'lucide-react';
import Image from 'next/image';

interface CoursesWithPaginationProps {
  countryCode: string;
  countryName?: string;
  initialCourses: CourseData[];
  initialPagination: {
    total: number;
    page: number;
    limit: number;
    currentPages: number;
  };
}

const gradients = {
  primary: "from-[#12a9be] to-[#0d617b]",
  accent: "from-[#0d617b] to-[#12a9be]",
  hero: "from-[#080717]/70 to-[#0d617b]/50 dark:from-[#080717]/80 dark:to-[#12a9be]/40",
};

export function CoursesWithPagination({
  countryCode,
  countryName,
  initialCourses,
  initialPagination,
}: CoursesWithPaginationProps) {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [pagination, setPagination] = useState(initialPagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isVisible, setIsVisible] = useState(false);

  const COURSES_PER_PAGE = 9;

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  // Función para cargar cursos de una página específica
  const loadCoursesPage = async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * COURSES_PER_PAGE;
      const response = await fetchCoursesClient({
        countryCode,
        limit: COURSES_PER_PAGE,
        offset,
      });
      
      setCourses(response.data);
      setPagination(response.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular páginas
  const totalPages = Math.ceil(pagination.total / COURSES_PER_PAGE);
  
  const getPageNumbers = () => {
    if (!isMounted) return [];
    
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const sidePages = Math.floor((maxVisiblePages - 3) / 2);

    if (currentPage <= sidePages + 2) {
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - sidePages - 1) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <section className=" relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="relative w-full h-[400px] mb-12  overflow-hidden rounded-2xl">
          <Image
            src="/es/graduate/course-bg.jpg"
            alt="Cursos"
            fill
            className="object-cover"
            priority
          />

          <div
            className={`absolute inset-0 bg-gradient-to-b ${gradients.hero}`}
          ></div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-4xl md:text-6xl font-bold mb-2 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cursos con
            </motion.div>

            <motion.div
              className="text-4xl md:text-6xl font-bold mb-8 text-[#b6d900]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              enfoque profesional en {countryName}
            </motion.div>

            <motion.p
              className="text-lg text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Explora nuestra completa oferta educativa diseñada para impulsar
              tu carrera profesional.
            </motion.p>
          </motion.div>
        </div>

          {/* Stats y View Toggle */}
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-black text-[#12a9be] dark:text-white">
                  {pagination.total}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Cursos Disponibles
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#12a9be] dark:text-white">
                  {totalPages}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Páginas
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-600"></div>
              <div className="text-center">
                <div className="text-2xl font-black text-[#12a9be] dark:text-white">
                  {currentPage}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Página Actual
                </div>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-200 dark:border-gray-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? ' text-white bg-[#12a9be] shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-[#12a9be] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Lista</span>
              </button>
            </div>
          </motion.div>

          {/* Courses Display */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'grid' ? (
                <CourseSkeleton count={COURSES_PER_PAGE} />
              ) : (
                <CourseListSkeleton count={COURSES_PER_PAGE} />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={viewMode} // Key para forzar re-render con animación
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {viewMode === 'grid' ? (
                <CourseGrid countryCode={countryCode} courses={courses} />
              ) : (
                <CourseList countryCode={countryCode} courses={courses} />
              )}
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && isMounted && (
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center mt-16 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Mobile Info */}
              <div className="sm:hidden text-center mb-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Página {currentPage} de {totalPages}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                  onClick={() => currentPage > 1 && loadCoursesPage(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>

                {/* Pages */}
                <div className="flex gap-1 sm:gap-2">
                  {getPageNumbers().map((pageNum, index) => (
                    <React.Fragment key={index}>
                      {pageNum === '...' ? (
                        <div className="flex items-center justify-center px-2 sm:px-4 py-2 sm:py-3 text-gray-400">
                          <MoreHorizontal className="w-4 h-4" />
                        </div>
                      ) : (
                        <button
                          onClick={() => typeof pageNum === 'number' && loadCoursesPage(pageNum)}
                          disabled={loading}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-bold transition-all duration-300 text-sm sm:text-base min-w-[40px] sm:min-w-[48px] ${
                            pageNum === currentPage
                              ? 'bg-gradient-to-r from-[#0d617b] to-[#12a9be]  text-white shadow-lg'
                              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`} 
                        >
                          {pageNum}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => currentPage < totalPages && loadCoursesPage(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Desktop Info */}
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 ml-4">
                Mostrando {((currentPage - 1) * COURSES_PER_PAGE) + 1} - {Math.min(currentPage * COURSES_PER_PAGE, pagination.total)} de {pagination.total} cursos
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && courses.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-600 max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No hay cursos disponibles
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Pronto tendremos más contenido disponible
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}