"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Building,
  Calendar,
  X,
  Award,
  User,
  FileCheck,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type {
  CertificateSearchResponse,
  Certificate,
} from "@/types/verification";
import { formatCertificateCode } from "@/utils/format";

interface CertificatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  participantResult: CertificateSearchResponse | null;
  onViewCertificate: (certificate: Certificate) => void;
}

export function CertificatesModal({
  isOpen,
  onClose,
  participantResult,
  onViewCertificate,
}: CertificatesModalProps) {
  if (!isOpen || !participantResult) return null;

  // Función para formatear fechas
  const formatDate = (date?: string | Date | null) => {
    if (!date) return "N/A";

    return format(
      new Date(
        new Date(date).getUTCFullYear(),
        new Date(date).getUTCMonth(),
        new Date(date).getUTCDate()
      ),
      "dd 'de' MMMM 'de' yyyy",
      { locale: es }
    );
  };

  const participantName = participantResult.full_name || "Participante";
  const participantDocument = participantResult.document_number || "N/A";

  // Agrupar certificados por tipo de evento
  const certificatesByType: Record<string, Certificate[]> = {};
  if (participantResult.certificates) {
    participantResult.certificates.forEach((cert) => {
      const eventTypeName = cert.event?.typeEvent?.name || "Otros";
      if (!certificatesByType[eventTypeName]) {
        certificatesByType[eventTypeName] = [];
      }
      certificatesByType[eventTypeName].push(cert);
    });
  }

  const hasCertificates = Object.keys(certificatesByType).length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-8xl w-[95vw] md:w-[80vw] lg:w-[70vw] bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-0 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 max-h-[90vh] flex flex-col">
        <DialogClose className="absolute right-4 top-4 z-30 rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>

        {/* Header */}
        <div className="sticky top-0 z-20 w-full bg-white dark:bg-gray-900 flex-shrink-0">
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-[#2563EB]/5 to-primary/10 dark:from-[#1E293B] dark:to-[#1A202C]">
            <DialogHeader className="space-y-4 text-center">
              <div className="space-y-4">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary dark:text-primary" />
                  </div>
                </div>
                <DialogTitle className="flex flex-col items-center space-y-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Certificados de
                  </span>
                  <span className="text-2xl md:text-3xl font-bold text-primary dark:text-primary">
                    {participantName}
                  </span>
                </DialogTitle>
                <div className="flex justify-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <User className="w-4 h-4 mr-2 text-primary dark:text-primary" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium mr-2 text-sm md:text-base">
                      Documento de Identidad:
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {participantDocument}
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary dark:via-primary to-transparent" />
          </div>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 flex-grow">
          {!hasCertificates && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No se encontraron certificados
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                No hay certificados disponibles para este participante.
              </p>
            </div>
          )}

          {hasCertificates && (
            <div className="mb-8">
              {Object.entries(certificatesByType).map(
                ([type, certificates]) => (
                  <div key={type} className="mb-8 last:mb-0 pb-4">
                    {/* Header del tipo */}
                    <div className="sticky top-0 z-10 py-3 bg-white dark:bg-gray-900">
                      <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800/50 rounded-xl border-2 border-blue-600/20 dark:border-blue-400/20 shadow-md shadow-blue-600/5 dark:shadow-blue-400/5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary dark:from-primary dark:to-primary flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {type.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {type}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {certificates.length} certificado
                            {certificates.length !== 1 ? "s" : ""} disponible
                            {certificates.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vista móvil - Cards */}
                    <div className="sm:hidden mt-4 grid grid-cols-1 gap-4">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="group relative bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700/50 hover:border-blue-600/30 dark:hover:border-blue-400/30"
                        >
                          <div className="flex flex-col h-full">
                            <div className="space-y-3 mb-4">
                              <h4 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                                {cert.event?.name || "Certificado"}
                              </h4>
                              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <Building className="w-4 h-4 mr-2 text-primary dark:text-primary flex-shrink-0" />
                                  <span className="line-clamp-1">
                                    {cert.event?.company?.commercialName ||
                                      "CIMADE"}
                                  </span>
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary dark:text-primary flex-shrink-0" />
                                  {formatDate(cert.createdAt)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-auto">
                              <Button
                                variant="outline"
                                onClick={() => onViewCertificate(cert)}
                                className="w-full justify-center bg-white hover:bg-blue-50 border-blue-600/30 hover:border-blue-600 text-blue-600 hover:text-primary dark:bg-transparent dark:border-gray-700 dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10 dark:text-white"
                              >
                                <FileCheck className="w-4 h-4 mr-2 text-primary dark:text-primary" />
                                <span>Ver Certificado</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Vista tablet - Grid 2 columnas */}
                    <div className="hidden sm:grid md:hidden mt-4 grid-cols-2 gap-4">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="group relative bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700/50 hover:border-blue-600/30 dark:hover:border-blue-400/30"
                        >
                          <div className="flex flex-col h-full">
                            <div className="space-y-2 mb-3">
                              <h4 className="font-semibold text-base text-gray-900 dark:text-white line-clamp-2">
                                {cert.event?.name || "Certificado"}
                              </h4>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Código: {formatCertificateCode(cert.code)}
                              </div>
                              <div className="flex flex-col gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                                <span className="flex items-center">
                                  <Building className="w-3.5 h-3.5 mr-1.5 text-primary dark:text-primary flex-shrink-0" />
                                  <span className="line-clamp-1">
                                    {cert.event?.company?.commercialName ||
                                      "CIMADE"}
                                  </span>
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary dark:text-primary flex-shrink-0" />
                                  {formatDate(cert.createdAt)}
                                </span>
                              </div>
                            </div>
                            <div className="mt-auto">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onViewCertificate(cert)}
                                className="w-full justify-center text-xs py-1.5 bg-white hover:bg-blue-50 border-blue-600/30 hover:border-blue-600 text-blue-600 hover:text-primary dark:bg-transparent dark:border-gray-700 dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10 dark:text-white"
                              >
                                <Eye className="w-3.5 h-3.5 mr-1.5 text-primary dark:text-primary" />
                                <span>Ver</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Vista desktop - Tabla */}
                    <div className="hidden md:block mt-4 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700/50">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700/50">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/5 xl:w-1/3"
                            >
                              Certificado
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-2/5 xl:w-1/3"
                            >
                              Organizado por
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5 xl:w-auto"
                            >
                              Fecha de emisión
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider xl:w-auto"
                            >
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800/30 divide-y divide-gray-200 dark:divide-gray-700/50">
                          {certificates.map((cert) => (
                            <tr
                              key={cert.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-white break-words">
                                  {cert.event?.name || "Certificado"}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  Código: {formatCertificateCode(cert.code)}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <Building className="w-4 h-4 mr-2 text-primary dark:text-primary flex-shrink-0" />
                                  <span className="text-sm text-gray-900 dark:text-white break-words">
                                    {cert.event?.company?.commercialName ||
                                      "CIMADE"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-2 text-primary dark:text-primary flex-shrink-0" />
                                  <span className="text-sm text-gray-900 dark:text-white">
                                    {formatDate(cert.createdAt)}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onViewCertificate(cert)}
                                  className="bg-white hover:bg-blue-50 border-blue-600/30 hover:border-blue-600 text-blue-600 hover:text-primary dark:bg-transparent dark:border-gray-700 dark:hover:border-blue-400/70 dark:hover:bg-blue-400/10 dark:text-white"
                                >
                                  <Eye className="w-3.5 h-3.5 mr-1.5 text-primary dark:text-primary" />
                                  <span>Ver</span>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
