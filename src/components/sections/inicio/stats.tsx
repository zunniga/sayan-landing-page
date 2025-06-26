'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Globe, TrendingUp, Zap } from 'lucide-react';

export interface StatItem {
  id: string;
  value: number;
  label: string;
  icon: 'students' | 'courses' | 'certificates' | 'countries';
  suffix?: string;
  prefix?: string;
}

interface StatsProps {
  stats: StatItem[];
}

export function Stats({
  stats,
}: StatsProps) {
  const [inView, setInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>(
    stats.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {})
  );

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible && !inView) {
        setInView(true);
        
        // Animar los números
        const duration = 2500; // 2.5 segundos
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        
        let frame = 0;
        const intervals: { [key: string]: NodeJS.Timeout } = {};
        
        stats.forEach(stat => {
          intervals[stat.id] = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Easing out cubic
            const currentValue = Math.round(stat.value * (easeOutProgress < 1 ? easeOutProgress : 1));
            
            setAnimatedValues(prev => ({
              ...prev,
              [stat.id]: currentValue
            }));
            
            if (frame === totalFrames) {
              clearInterval(intervals[stat.id]);
            }
          }, frameDuration);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial mount
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [inView, stats]);

  const renderIcon = (iconType: string) => {
    const iconClasses = "text-blue-600 dark:text-blue-400";
    switch (iconType) {
      case 'students':
        return <Users size={28} className={iconClasses} />;
      case 'courses':
        return <BookOpen size={28} className={iconClasses} />;
      case 'certificates':
        return <Award size={28} className={iconClasses} />;
      case 'countries':
        return <Globe size={28} className={iconClasses} />;
      default:
        return <Award size={28} className={iconClasses} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="stats-section" className="py-24 md:py-32 relative overflow-hidden">
      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.05, 0.15, 0.05] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 4
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header mejorado */}
          <motion.div 
            className="text-center mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-block mb-6"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-bold tracking-wide flex items-center shadow-lg">
                <TrendingUp className="w-5 h-5 mr-3" />
                CIMADE EN CIFRAS
                <Zap className="w-5 h-5 ml-3" />
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6 leading-tight"
            >
              Resultados que
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Hablan por Sí Solos
              </span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Miles de profesionales han confiado en nosotros para transformar sus carreras.
              Estos números reflejan nuestro compromiso inquebrantable con la excelencia educativa.
            </motion.p>
          </motion.div>
          
          {/* Grid de estadísticas mejorado */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div 
                key={stat.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-2xl backdrop-blur-sm">
                  {/* Background icon */}
                  <div className="absolute -right-2 -top-2 opacity-5 dark:opacity-10 scale-125">
                    {renderIcon(stat.icon.toString())}
                  </div>
                  
                  {/* Icon container */}
                  <div className="flex items-center justify-center mb-6 relative z-10">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-100 dark:border-blue-800 group-hover:scale-110 transition-transform duration-300">
                      {renderIcon(stat.icon.toString())}
                    </div>
                  </div>
                  
                  {/* Number */}
                  <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 text-center leading-none">
                    {stat.prefix}{animatedValues[stat.id].toLocaleString()}{stat.suffix}
                  </div>
                  
                  {/* Label */}
                  <p className="text-center text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-base leading-tight">
                    {stat.label}
                  </p>

                  {/* Decorative element */}
                  <div className="absolute bottom-3 left-3 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}