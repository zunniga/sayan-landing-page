'use client';

import { motion } from 'framer-motion';

interface GraduateSkeletonProps {
  count?: number;
}

export function GraduateSkeleton({ count = 6 }: GraduateSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-600 shadow-lg"
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
          <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          
          <div className="p-6 space-y-4">
            {/* Category Skeleton */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-28 animate-pulse"></div>
            
            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
            </div>
            
            {/* Institution Skeleton */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            </div>
            
            {/* Duration & Level Skeleton */}
            <div className="flex justify-between items-center pt-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            </div>
            
            {/* Stats Skeleton - similar al grid */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 space-y-3">
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

            {/* Pricing Skeleton */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
              <div className="flex items-center justify-between">
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
            </div>
            
            {/* Button Skeleton */}
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-full animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}