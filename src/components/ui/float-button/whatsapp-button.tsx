"use client";

import { useState, useEffect } from "react";
import { countries } from "@/config/countries";
import Image from "next/image";

interface WhatsAppButtonProps {
  countryCode?: string;
}

export function WhatsAppButton({ countryCode }: WhatsAppButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Configurar números de WhatsApp por país
  const getWhatsAppNumber = (country: string): string => {
    switch (country) {
      case "pe":
        return countries.pe.whatsapp || "51900102090";
      case "co":
        return countries.co.whatsapp || "57987654321";
      default:
        return "57987654321";
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = getWhatsAppNumber(countryCode || "pe");
    const message = encodeURIComponent(
      "¡Hola! Me interesa obtener más información sobre los cursos y diplomados de CIMADE."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Botón principal */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <Image
          width={40}
          height={40}
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
        {/* Efecto de pulso */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
      </button>
    </div>
  );
}
