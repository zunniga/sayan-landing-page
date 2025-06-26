"use client";

import React from "react";
import { HeroAbout } from "@/components/sections/nosotros/hero-about";
import { MissionVisionValues } from "@/components/sections/nosotros/mission-vision-values";
import { CertificationsRecognitions } from "@/components/sections/nosotros/certifications-recognitions";
import type {
  HeroStat,
  Partnership,
} from '@/types';

interface AboutLayoutProps {
  countryCode: string;
  countryName: string;
  heroStats: HeroStat[];
  partnerships: Partnership[];
}

export default function AboutLayout({
  countryCode,
  countryName,
  heroStats,
  partnerships,

}: AboutLayoutProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <HeroAbout countryName={countryName} stats={heroStats} />
      </section>

      <main className="pt-23 pb-16 px-4">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Misión, Visión y Valores */}
          <section>
            <MissionVisionValues
              countryName={countryName} 
              countryCode={countryCode} 
            />
          </section>
 
          {/* Certificaciones y Reconocimientos */}
          <section>
            <CertificationsRecognitions
              partnerships={partnerships}
            />
          </section>
        </div>
      </main>
    </>
  );
}