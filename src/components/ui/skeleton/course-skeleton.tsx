'use client';

import { motion } from 'framer-motion';

interface CourseSkeletonProps {
  count?: number;
}

export function CourseSkeleton({ count = 9 }: CourseSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-lg h-full flex flex-col"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 0.8, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        >
          {/* Image Skeleton */}
          <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0 relative">
            {/* Badge skeletons en la imagen */}
            <div className="absolute top-4 right-4">
              <div className="h-7 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            <div className="absolute top-4 left-4">
              <div className="h-6 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            {/* Header con badge y estrella */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse"></div>
              <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* Title Skeleton - altura consistente */}
            <div className="mb-4 min-h-[3.5rem] flex items-start">
              <div className="space-y-2 w-full">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              </div>
            </div>
            
            {/* Description Skeleton - altura fija */}
            <div className="mb-4 h-16 overflow-hidden">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              </div>
            </div>
            
            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Footer fijo - Stats + Pricing + Button */}
            <div className="mt-auto space-y-4">
              
              {/* Stats skeleton - misma caja que el original */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-14 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Pricing skeleton */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                  <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
                <div className="flex items-baseline justify-between mb-4">
                  <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                </div>
                
                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}