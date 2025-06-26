"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 25,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      {/* Floating elements with new colors */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-[#12a9be]/10 to-[#0d617b]/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-[#b6d900]/10 to-[#12a9be]/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 3,
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header con el nuevo diseño */}
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <div className="inline-flex items-center justify-center mb-0">
                <span className="mx-4 text-white p-2 rounded-2xl font-bold text-sm tracking-[0.2em] uppercase bg-gradient-to-r from-[#12a9be] to-[#12a9be] dark:bg-gradient-to-r dark:from-[#12a9be]/50 dark:to-[#12a9be] shadow-lg transition-transform duration-300 hover:scale-105">
                  TESTIMONIOS
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              ¡Experiencias que{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-[#12a9be] to-[#0d617b] bg-clip-text text-transparent">inspiran</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#b6d900] rounded-full"></div>
              </span>
              !
            </motion.h2>
          </motion.div>

          {/* Carousel Container con nuevo estilo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_90%] lg:flex-[0_0_50%] xl:flex-[0_0_33.333%]"
                  >
                    <motion.div
                      className="bg-[#0d617b]/90 backdrop-blur-sm rounded-2xl p-6 mx-3 h-[380px] flex flex-col shadow-xl hover:shadow-2xl border border-[#12a9be]/20 hover:border-[#12a9be]/40 transition-all duration-300 relative overflow-hidden group"
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Glow effect con nuevos colores */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#12a9be]/10 to-[#b6d900]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Quote Icon Background */}
                      <div className="absolute top-4 right-4 opacity-10">
                        <Quote size={60} className="text-[#12a9be]" />
                      </div>

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Rating con estrellas amarillas */}
                        <div className="flex items-center justify-center mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={20}
                                className={`${
                                  i < testimonial.rating
                                    ? "text-[#b6d900] fill-[#b6d900]"
                                    : "text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Comment optimizado */}
                        <blockquote className="text-white leading-relaxed flex-grow text-base relative mb-6 text-center">
                          <div className="absolute -left-2 -top-2 text-[#12a9be] opacity-30">
                            <Quote size={20} />
                          </div>
                          <p className="px-4 font-medium">
                            &quot;{testimonial.comment}&quot;
                          </p>
                        </blockquote>

                        {/* Header con avatar y info */}
                        <div className="flex items-center justify-center">
                          <div className="flex-shrink-0 relative mr-4">
                            <div className="h-12 w-12 relative rounded-full overflow-hidden shadow-lg ring-2 ring-[#12a9be]/50">
                              <Image
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            {/* Status indicator */}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#b6d900] rounded-full border-2 border-[#0d617b] shadow-sm"></div>
                          </div>
                          <div className="text-center">
                            <h4 className="font-bold text-lg text-white group-hover:text-[#12a9be] transition-colors">
                              {testimonial.name}
                            </h4>
                            <p className="text-[#12a9be] text-sm font-medium">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows con nuevo estilo */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0d617b] rounded-full shadow-lg border-2 border-[#12a9be]/30 flex items-center justify-center text-white hover:text-[#12a9be] hover:border-[#12a9be] hover:bg-[#0d617b]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
            >
              <ChevronLeft size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#0d617b] rounded-full shadow-lg border-2 border-[#12a9be]/30 flex items-center justify-center text-white hover:text-[#12a9be] hover:border-[#12a9be] hover:bg-[#0d617b]/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              onClick={scrollNext}
              disabled={!canScrollNext}
            >
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>

          {/* Controls con nuevos colores */}
          <div className="flex justify-center items-center mt-8 gap-2">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 h-2 bg-[#12a9be] rounded-full"
                    : "w-2 h-2 bg-gray-400 hover:bg-[#12a9be]/70 rounded-full"
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
