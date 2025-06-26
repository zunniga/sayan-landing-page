"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Mail, 
  Send, 
  User, 
  MessageSquare,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Clock,
  Star,
  Shield,
  Award
} from "lucide-react";
import { countries } from "@/config/countries";
import { SocialIcon } from "@/components/ui/social-icon";


interface ContactPageProps {
  countryCode: string;
}

// Esquema de validación simplificado
const contactSchema = z.object({
  fullName: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede tener más de 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
  email: z
    .string()
    .email("Por favor ingresa un email válido")
    .min(1, "El email es requerido"),
  subject: z
    .string()
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(150, "El asunto no puede tener más de 150 caracteres"),
  message: z
    .string()
    .min(20, "El mensaje debe tener al menos 20 caracteres")
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage({ countryCode }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const country = countries[countryCode];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const messageLength = watch("message")?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Datos del formulario:", data);
      setSubmitStatus('success');
      reset();
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setSubmitStatus('error');
      
      // Resetear el estado después de 5 segundos
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <main  className=" bg-transparent pb-16 px-4 mt-48">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#12a9be] to-[#0d617b]  bg-clip-text text-transparent mb-4">
            Contáctanos
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estamos aquí para ayudarte a transformar tu futuro profesional
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Company Info */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Logo and Brand */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  SAYAN {country.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Centro de Investigación y Mejoramiento Académico para el
                  Desarrollo Educativo
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#0d617b]/10 dark:bg-[#0d617b]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-[#0d617b] dark:text-[#12a9be]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    15+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Años
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#b6d900]/10 dark:bg-[#b6d900]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-[#b6d900] dark:text-[#b6d900]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    10K+
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Estudiantes
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#12a9be]/10 dark:bg-[#12a9be]/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-[#12a9be] dark:text-[#12a9be]" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    100%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Confiable
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                {country.address && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#12a9be]/10 dark:bg-[#12a9be]/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#0d617b] dark:text-[#12a9be]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        Dirección
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {country.address}
                      </p>
                    </div>
                  </div>
                )}

                {country.email && (
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#12a9be]/10 dark:bg-[#12a9be]/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#0d617b] dark:text-[#12a9be]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        Email
                      </h4>
                      <a
                        href={`mailto:${country.email}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                      >
                        {country.email}
                      </a>
                    </div>
                  </div>
                )}

                {country.whatsapp && (
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        WhatsApp
                      </h4>
                      <a
                        href={`https://wa.me/${country.whatsapp.replace(
                          /[^0-9]/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline text-sm"
                      >
                        {country.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Horarios
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Lun-Vie: 8:00 AM - 6:00 PM
                      <br />
                      Sáb: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            {country.socialMedia && (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Síguenos en redes sociales
                </h3>
                <div className="flex justify-center gap-4">
                  {country.socialMedia.facebook && (
                    <a
                      href={country.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-br from-[#1877F2] to-[#42A5F5] transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <SocialIcon
                        type="facebook"
                        size={24}
                        className="text-[#1877F2]"
                      />
                    </a>
                  )}
                  {country.socialMedia.instagram && (
                    <a
                      href={country.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-br from-[#E1306C] to-[#FD1D1D] transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <SocialIcon type="instagram" size={24} />
                    </a>
                  )}
                  {country.socialMedia.youtube && (
                    <a
                      href={country.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-br from-[#FF0000] to-[#FF0000] transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <SocialIcon
                        type="youtube"
                        size={24}
                        className="text-[#FF0000] group-hover:text-white transition-colors duration-300"
                      />
                    </a>
                  )}
                  {country.socialMedia.tiktok && (
                    <a
                      href={country.socialMedia.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-gray-800 rounded-xl hover:bg-gradient-to-br from-[#000000] to-[#000000] transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <SocialIcon
                        type="tiktok"
                        size={24}
                        className="text-black group-hover:text-white transition-colors duration-300"
                      />
                    </a>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 dark:text-green-300 text-sm font-medium">
                      Respuesta en menos de 24 horas
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Envíanos un mensaje
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Completa el formulario y nos pondremos en contacto contigo
                  pronto
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-4"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
                      ¡Mensaje enviado exitosamente!
                    </h4>
                    <p className="text-green-700 dark:text-green-300">
                      Te contactaremos pronto a través del email proporcionado.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-4"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                      Error al enviar el mensaje
                    </h4>
                    <p className="text-red-700 dark:text-red-300">
                      Por favor, inténtalo de nuevo o contáctanos directamente.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("fullName")}
                      type="text"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#12a9be] focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 ${
                        errors.fullName
                          ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("email")}
                      type="email"
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#12a9be] focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 ${
                        errors.email
                          ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                      placeholder="tu@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Asunto *
                  </label>
                  <input
                    {...register("subject")}
                    type="text"
                    className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#12a9be] focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 ${
                      errors.subject
                        ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Mensaje *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      {...register("message")}
                      rows={6}
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl focus:ring-2 focus:ring-[#12a9be] focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 resize-none ${
                        errors.message
                          ? "border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/10"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                      }`}
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                    />
                    <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                      {messageLength}/1000
                    </div>
                  </div>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#0d617b] to-[#12a9be] hover:from-[#0a4d5f] hover:via-[#0e8a9b] hover:to-[#12a9be] disabled:from-gray-400 disabled:to-gray-500 text-white py-5 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      Enviar Mensaje
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}