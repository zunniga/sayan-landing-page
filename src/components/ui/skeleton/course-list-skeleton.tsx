"use client";

import React from "react";

interface CourseListSkeletonProps {
  count?: number;
}

export function CourseListSkeleton({ count = 9 }: CourseListSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse"
        >
          <div className="flex flex-col sm:flex-row">
            
            {/* Imagen skeleton */}
            <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 overflow-hidden">
              
              {/* Badge skeletons en la imagen */}
              <div className="absolute top-4 right-4">
                <div className="h-7 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
              <div className="absolute top-4 left-4">
                <div className="h-6 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>

            {/* Contenido skeleton */}
            <div className="flex-1 p-6 flex flex-col">
              
              {/* Header con badge y estrella */}
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Título */}
              <div className="mb-3">
                <div className="h-7 w-4/5 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-7 w-3/5 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>

              {/* Descripción mejorada */}
              <div className="mb-4 h-20 overflow-hidden">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>

              {/* Stats skeleton - misma caja que el original */}
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 mb-4 space-y-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-6 w-14 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Footer skeleton */}
              <div className="mt-auto space-y-4">
                
                {/* Pricing skeleton */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                    <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                  
                  <div className="flex items-baseline justify-between">
                    <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>

                {/* Button skeleton */}
                <div className="flex justify-center">
                  <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative element skeleton */}
          <div className="absolute bottom-4 left-4">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}