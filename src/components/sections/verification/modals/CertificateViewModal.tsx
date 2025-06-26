"use client";

import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import type { CertificateByCodeResponse, CertificateByQrResponse } from "@/types/verification";
import { formatCertificateCode } from "@/utils/format";

interface CertificateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateByCodeResponse | CertificateByQrResponse | null;
}

export function CertificateViewModal({ 
  isOpen, 
  onClose, 
  certificate 
}: CertificateViewModalProps) {
  if (!isOpen || !certificate) return null;

  // Extraer datos del certificado según la estructura real
  const displayName = certificate.participant?.full_name || "N/A";
  const documentNumber = certificate.participant?.document_number || "N/A";
  const certificateTitle = certificate.event?.name || "Certificado";
  const certificateType = certificate.event?.typeEvent?.name || "Evento";
  const certificateCode = certificate.code || "N/A";
  const emissionDate = certificate.createdAt;
  
  const formattedEmissionDate = emissionDate 
    ? format(
        new Date(
          new Date(emissionDate).getUTCFullYear(), 
          new Date(emissionDate).getUTCMonth(), 
          new Date(emissionDate).getUTCDate()
        ), 
        "dd 'de' MMMM 'de' yyyy", 
        { locale: es }
      )
    : "N/A";
  
  // Calcular si el certificado está completado
  const isCompleted = emissionDate ? new Date() >= new Date(
    new Date(emissionDate).getUTCFullYear(),
    new Date(emissionDate).getUTCMonth(),
    new Date(emissionDate).getUTCDate()
  ) : true;

  // Procesar logos
  const companyLogos: string[] = [];
  let instituteLogos: string[] = [];
  let companyName = "CIMADE";

  if (certificate.event) {
    // Logo de la company
    const companyLogoUrl = certificate.event.company?.logoUrl;
    if (companyLogoUrl && typeof companyLogoUrl === 'string') {
      companyLogos.push(companyLogoUrl);
    }
    
    // Logos de instituto
    const instituteUrls = certificate.event.imageInstituteUrl;
    if (instituteUrls && Array.isArray(instituteUrls)) {
      instituteLogos = instituteUrls.filter(url => typeof url === 'string' && url.trim() !== '');
    }
    
    companyName = certificate.event.company?.commercialName || "CIMADE";
  }

  const allLogos = [...companyLogos, ...instituteLogos];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[95vw] sm:w-[85vw] md:w-[75vw] lg:w-[700px] bg-white dark:bg-gray-900 rounded-xl shadow-xl p-0 overflow-hidden border border-gray-200/20 dark:border-gray-700/20 animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogClose className="absolute right-3 top-3 z-30 rounded-full w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110">
          <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>

        <DialogTitle className="sr-only">Certificado de {displayName}</DialogTitle>

        {/* Header con logos */}
        <div className="p-3 sm:p-4 md:p-5 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-[#1E293B] dark:to-[#1A202C] border-b border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top duration-500">
          <div className="flex flex-col items-center">
            <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 md:mb-4">
              ORGANIZADO POR:
            </h2>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
              {allLogos.length > 0 ? (
                allLogos.map((logoUrl, index) => {
                  const isAbsoluteUrl = logoUrl.startsWith("http://") || logoUrl.startsWith("https://");
                  const finalLogoSrc = isAbsoluteUrl ? logoUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL_VERIFICATION || ''}${logoUrl}`;
                  
                  if (!finalLogoSrc || finalLogoSrc === process.env.NEXT_PUBLIC_BACKEND_URL_VERIFICATION) {
                    return (
                      <div 
                        key={`logo-placeholder-${index}`} 
                        className="bg-white p-3 sm:p-3 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center w-[150px] h-[65px] animate-in fade-in duration-700"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <p className="text-xs text-gray-400">Logo no disponible</p>
                      </div>
                    );
                  }

                  const isCompanyLogo = index < companyLogos.length;
                  const altText = isCompanyLogo 
                    ? `${companyName} logo` 
                    : `Logo instituto ${index - companyLogos.length + 1}`;

                  return (
                    <div 
                      key={`logo-${index}`} 
                      className="bg-white p-3 sm:p-3 rounded-lg border border-gray-300 shadow-sm animate-in fade-in zoom-in-90 duration-500 hover:scale-105 transition-transform"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <Image
                        src={finalLogoSrc}
                        alt={altText}
                        width={150}
                        height={65}
                        className="h-16 sm:h-14 md:h-14 object-contain max-w-[130px] sm:max-w-[120px] md:max-w-[150px]"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="bg-white p-3 sm:p-3 rounded-lg border border-gray-300 shadow-sm flex items-center justify-center w-[150px] h-[65px] animate-in fade-in duration-500">
                  <p className="text-xs text-gray-400">Información del organizador no disponible</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 md:space-y-5 animate-in slide-in-from-bottom duration-600">
          <div className="animate-in fade-in duration-700 delay-200">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Certificado verificado a nombre de:
            </p>
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </h1>
          </div>

          <div className="animate-in fade-in duration-700 delay-300">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Por culminar con éxito el evento: <span className="text-primary dark:text-primary">{certificateType}</span>
            </p>
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2.5 sm:p-3 md:p-4 border border-gray-100 dark:border-gray-700/50 shadow-sm animate-in slide-in-from-left duration-500 delay-400">
              <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3">
                <div className="w-1 sm:w-1.5 h-8 sm:h-10 md:h-12 bg-gradient-to-b from-primary to-primary rounded-full" />
                <div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white">
                    {certificateTitle}
                  </h3>
                  <div className="flex items-center mt-1">
                    {isCompleted ? (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full animate-in zoom-in duration-300 delay-500">
                        Completado <CheckCircle className="ml-1 w-3 h-3 animate-ping" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full animate-in zoom-in duration-300 delay-500">
                        Pendiente <Clock className="ml-1 w-3 h-3 animate-spin" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de información */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {[
              {
                icon: (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary dark:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                ),
                label: "Doc. de Identidad:",
                value: documentNumber
              },
              {
                icon: (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary dark:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Código:",
                value: formatCertificateCode(certificateCode)
              },
              {
                icon: (
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-primary dark:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                label: "Fecha de emisión:",
                value: formattedEmissionDate
              }
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center space-x-2 sm:space-x-2.5 bg-gray-50 dark:bg-gray-800/50 p-2.5 sm:p-3 md:p-4 rounded-lg border border-gray-100 dark:border-gray-700/50 shadow-sm animate-in slide-in-from-bottom duration-500 hover:scale-[1.02] transition-transform"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/20 animate-in slide-in-from-bottom duration-700 delay-700">
          <div className="flex items-center justify-center space-x-2">
            {isCompleted ? (
              <>
                <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Certificado verificado</p>
              </>
            ) : (
              <>
                <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 animate-spin" />
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Certificado pendiente</p>
              </>
            )}
          </div>
          <p className="text-[10px] sm:text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
            Este certificado ha sido verificado y es auténtico.
            <br />
            Emitido por VeryCerts - Sistema de Verificación de Certificados.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}