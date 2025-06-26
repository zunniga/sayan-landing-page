"use client";

import React from "react";
import HeroCarousel from "@/components/sections/inicio/hero-carousel";
import { FirstSection } from "@/components/sections/inicio/certificate-section";
import { FeaturedCourses } from "@/components/sections/inicio/featured-courses";
import { Testimonials } from "@/components/sections/inicio/testimonials";
import { RectangularInfo } from "@/components/sections/inicio/rectangular-info";
import { FeaturedDiplomas } from "@/components/sections/inicio/featured-diplomas";
import type { HeroSlide, Testimonial } from "@/types";
import type { CourseData } from "@/types/course";
import type { GraduateData } from "@/types/graduate";
import type { StatItem } from "@/components/sections/inicio/stats";

interface HomeLayoutProps {
  countryCode: string;
  countryName: string;
  heroSlides: HeroSlide[];
  featuredCourses: CourseData[];
  testimonials: Testimonial[];
  stats: StatItem[];
  featuredDiplomas: GraduateData[];
  ctaBackgroundImage?: string;
}

export default function HomeLayout({
  countryCode,
  countryName,
  featuredCourses,
  testimonials,
  featuredDiplomas,
}: HomeLayoutProps) {
  return (
    <>
      {/* Hero Section - Full screen */}
      <section className="bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100 dark:from-[#0a0f1c]/90 dark:via-[#0a0f1c]/90 dark:to-[#0a0f1c]/90 relative w-full h-screen">
        <HeroCarousel />
      </section>

      {/* Rest of content with proper spacing */}
      <main className="bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100 dark:from-[#0a0f1c]/90 dark:via-[#0a0f1c]/90 dark:to-[#0a0f1c]/90 pt-16 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto">
          {/* Certificate Section - Nueva sección */}
          <section>
            <FirstSection />
          </section>

          {/* Featured Courses */}

          <section>
            <FeaturedDiplomas
              countryCode={countryCode}
              graduates={featuredDiplomas}
            />
          </section>

          <section>
            <Testimonials testimonials={testimonials} />
          </section>
          <section>
            <FeaturedCourses
              countryCode={countryCode}
              courses={featuredCourses}
            />
          </section>
          <section>
            <RectangularInfo
              countryCode={countryCode}
              countryName={countryName}
            />
          </section>
          
        </div>
      </main>
    </>
  );
}
