"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchButton } from "@/components/sections/verification/search-button";
import { SearchInput } from "@/components/sections/verification/search-input";
import { ClearButton } from "@/components/sections/verification/clear-button";
import { SearchStatus } from "@/components/sections/verification/search-status";
import { CertificatesModal } from "@/components/sections/verification/modals/CertificatesModal";
import { CertificateViewModal } from "@/components/sections/verification/modals/CertificateViewModal";
import { ErrorModal } from "@/components/sections/verification/error-modal";
import { RefreshCw } from "lucide-react";
import {
  searchCertificateByDocument,
  searchCertificateByCode,
  searchCertificateByName,
  searchCertificateByQr,
} from "@/lib/api/verification";
import type {
  CertificateSearchResponse,
  CertificateByCodeResponse,
  CertificateByQrResponse,
  Certificate,
} from "@/types/verification";
import { addCodePrefix } from "@/utils/format";
import Image from "next/image";

export type SearchType = "dni" | "code" | "name";

// Definir tipos para los errores de API
interface ApiError {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}

// Función para verificar si un error es del tipo ApiError
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}

// Función para manejar errores de manera consistente
function handleApiError(error: unknown): string {
  if (isApiError(error)) {
    if (error.response?.status === 404) {
      return "No se encontraron certificados con los datos proporcionados.";
    } else if (error.response?.status === 400) {
      return "Los datos proporcionados no son válidos.";
    } else if (error.response?.status === 500) {
      return "Ocurrió un error interno en el servidor. Por favor, inténtelo más tarde.";
    } else {
      return error.message || "Ocurrió un error durante la búsqueda.";
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Ocurrió un error inesperado.";
  }
}

export function VerificationPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Estados del formulario
  const [activeTab, setActiveTab] = useState<SearchType>("dni");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para resultados
  const [singleResult, setSingleResult] = useState<
    CertificateByCodeResponse | CertificateByQrResponse | null
  >(null);
  const [participantResult, setParticipantResult] =
    useState<CertificateSearchResponse | null>(null);

  // Estados para modales
  const [showCertificatesModal, setShowCertificatesModal] = useState(false);
  const [showCertificateViewModal, setShowCertificateViewModal] =
    useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isViewingSingleFromList, setIsViewingSingleFromList] = useState(false);

  // Estados para acceso directo y CAPTCHA
  const [isDirectAccess, setIsDirectAccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Función para extraer UUID de la URL
  const extractUuidFromPath = useCallback((): string | null => {
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    // Verificar si es un UUID con prefijo very-
    if (lastSegment && lastSegment.startsWith("very-")) {
      const uuid = lastSegment.replace("very-", "");
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(uuid)) {
        return uuid;
      }
    }

    // Verificar si es un UUID normal
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (
      lastSegment &&
      lastSegment !== "verify" &&
      uuidRegex.test(lastSegment)
    ) {
      return lastSegment;
    }

    // Verificar parámetro de la URL
    const uuidParam = searchParams.get("uuid") || searchParams.get("code");
    if (uuidParam) {
      return uuidParam;
    }

    return null;
  }, [pathname, searchParams]);

  // Generar código CAPTCHA
  const generateCaptchaCode = useCallback(() => {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setCaptchaCode(result);
    setCaptchaInput("");
    setCaptchaVerified(false);
  }, []);

  // Verificar CAPTCHA
  const verifyCaptcha = useCallback((): boolean => {
    if (isDirectAccess) return true;

    if (captchaInput.toUpperCase() === captchaCode) {
      setCaptchaVerified(true);
      return true;
    } else {
      setCaptchaVerified(false);
      setError(
        "El código de verificación es incorrecto. Por favor, inténtalo de nuevo."
      );
      generateCaptchaCode();
      return false;
    }
  }, [captchaInput, captchaCode, isDirectAccess, generateCaptchaCode]);

  // Validar entrada
  const validateInput = useCallback((): boolean => {
    switch (activeTab) {
      case "dni":
        if (searchValue.length < 5) {
          setError(
            "El documento de identidad debe tener al menos 5 caracteres"
          );
          return false;
        }
        if (searchValue.length > 20) {
          setError("El documento de identidad no puede exceder 20 caracteres");
          return false;
        }
        break;
      case "code":
        if (searchValue.length < 4) {
          setError("El código debe tener al menos 4 caracteres");
          return false;
        }
        break;
      case "name":
        if (searchValue.length < 3) {
          setError("Ingresa al menos 3 caracteres");
          return false;
        }
        break;
    }
    setError("");
    return true;
  }, [activeTab, searchValue]);

  // Limpiar estados de resultados
  const resetSearchStates = useCallback(() => {
    setSingleResult(null);
    setParticipantResult(null);
    setShowCertificatesModal(false);
    setShowCertificateViewModal(false);
  }, []);

  // Manejar búsqueda directa con UUID
  const handleDirectSearchWithUuid = useCallback(
    async (uuid: string) => {
      setLoading(true);
      setError("");
      resetSearchStates();

      try {
        const result = await searchCertificateByQr({ qrCode: uuid });
        setSingleResult(result);
        setShowCertificateViewModal(true);
      } catch (error: unknown) {
        console.error("Error en la búsqueda directa por UUID:", error);
        const errorMessage = handleApiError(error);
        setError(errorMessage);
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    },
    [resetSearchStates]
  );

  // Procesar y mostrar resultados
  const processAndDisplayResults = useCallback(
    (
      result:
        | CertificateSearchResponse
        | CertificateByCodeResponse
        | CertificateByQrResponse
    ) => {
      if ("certificates" in result) {
        // Es un resultado de búsqueda por documento o nombre (múltiples certificados)
        setParticipantResult(result);
        setShowCertificatesModal(true);
      } else {
        // Es un resultado de búsqueda por código (certificado único)
        setSingleResult(result);
        setShowCertificateViewModal(true);
      }
      generateCaptchaCode();
    },
    [generateCaptchaCode]
  );

  // Manejar búsqueda principal
  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) return;
    if (!isDirectAccess && !verifyCaptcha()) {
      setShowErrorModal(true);
      return;
    }
    if (!validateInput()) {
      setShowErrorModal(true);
      return;
    }

    setLoading(true);
    setError("");
    resetSearchStates();

    try {
      let result;

      switch (activeTab) {
        case "dni":
          result = await searchCertificateByDocument({
            documentNumber: searchValue,
          });
          break;
        case "code":
          result = await searchCertificateByCode({
            code: addCodePrefix(searchValue),
          });
          break;
        case "name":
          result = await searchCertificateByName({ fullName: searchValue });
          break;
        default:
          throw new Error("Tipo de búsqueda no válido");
      }

      processAndDisplayResults(result);
    } catch (error: unknown) {
      console.error("Error en la búsqueda:", error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      setShowErrorModal(true);
      generateCaptchaCode();
    } finally {
      setLoading(false);
    }
  }, [
    searchValue,
    isDirectAccess,
    verifyCaptcha,
    validateInput,
    resetSearchStates,
    activeTab,
    processAndDisplayResults,
    generateCaptchaCode,
  ]);

  // Inicialización al cargar la página
  useEffect(() => {
    generateCaptchaCode();
    const uuid = extractUuidFromPath();
    if (uuid) {
      setIsDirectAccess(true);
      setCaptchaVerified(true);
      setActiveTab("code");
      setSearchValue(uuid);
      setTimeout(() => {
        handleDirectSearchWithUuid(uuid);
      }, 500);
    } else {
      setIsDirectAccess(false);
    }
  }, [
    pathname,
    searchParams,
    extractUuidFromPath,
    handleDirectSearchWithUuid,
    generateCaptchaCode,
  ]);

  // Limpiar al cambiar de pestaña
  useEffect(() => {
    setSearchValue("");
    setError("");
  }, [activeTab]);

  // Manejar tecla Enter
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && searchValue.trim() && !loading) {
        handleSearch();
      }
    },
    [searchValue, loading, handleSearch]
  );

  // Manejar cambio en input CAPTCHA
  const handleCaptchaInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase().slice(0, 5);
      setCaptchaInput(value);
    },
    []
  );

  // Limpiar formulario
  const handleClear = useCallback(() => {
    setSearchValue("");
    setCaptchaInput("");
    setCaptchaVerified(false);
    setError("");
    resetSearchStates();
    generateCaptchaCode();
  }, [resetSearchStates, generateCaptchaCode]);

  // Manejar cierre de modales
  const handleCloseModalsAndRefreshCaptcha = useCallback(() => {
    if (!isDirectAccess) {
      generateCaptchaCode();
    }
  }, [isDirectAccess, generateCaptchaCode]);

  const handleCertificateViewModalClose = useCallback(() => {
    setShowCertificateViewModal(false);
    setSingleResult(null);

    if (isViewingSingleFromList) {
      setShowCertificatesModal(true);
      setIsViewingSingleFromList(false);
    } else {
      if (isDirectAccess) {
        router.replace("/certs");
        setIsDirectAccess(false);
      }
      handleCloseModalsAndRefreshCaptcha();
    }
  }, [
    isViewingSingleFromList,
    isDirectAccess,
    router,
    handleCloseModalsAndRefreshCaptcha,
  ]);

  const handleCertificatesModalClose = useCallback(() => {
    setShowCertificatesModal(false);
    setParticipantResult(null);
    setIsViewingSingleFromList(false);
    handleCloseModalsAndRefreshCaptcha();
  }, [handleCloseModalsAndRefreshCaptcha]);

  const handleViewSingleCertificate = useCallback(
    (certificate: Certificate) => {
      if (participantResult) {
        setShowCertificatesModal(false);
        setIsViewingSingleFromList(true);

        // Crear un objeto similar al resultado de código único según la estructura real
        const singleCertResult: CertificateByCodeResponse = {
          id: certificate.id,
          code: certificate.code,
          createdAt: certificate.createdAt,
          participant: {
            id: participantResult.id,
            document_number: participantResult.document_number,
            full_name: participantResult.full_name,
          },
          event: certificate.event,
        };

        setSingleResult(singleCertResult);
        setShowCertificateViewModal(true);
      }
    },
    [participantResult]
  );

  return (
    <section className="relative bg-gradient-to-br from-gray-100 via-gray-100 to-gray-100 dark:from-[#0a0f1c] dark:via-[#0a0f1c] dark:to-[#0a0f1c] min-h-[calc(100vh)] flex flex-col justify-center items-center transition-colors duration-300 py-32 md:py-30">
      <div className="absolute inset-0 opacity-40 ">
        <Image
          src="/es/bg/cyan3.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-900 dark:text-white">
                VERIFICA TU{" "}
              </span>
              <span className="bg-gradient-to-r from-[#12a9be] to-[#0d617b] dark:from-[#b6d900] dark:to-[#b6d900] bg-clip-text text-transparent">
                CERTIFICADO
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Verifica la autenticidad de tu certificado ingresando tu número de
              documento de identidad, código de certificado o nombres y
              apellidos.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00D1FF]/20 to-[#2563EB]/20 dark:from-transparent dark:to-transparent rounded-[2rem] blur-2xl opacity-50" />

            <div className="relative bg-white dark:bg-transparent rounded-2xl border border-gray-200/50 dark:border-gray-800/90 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]  backdrop-blur-sm">
              <div className="absolute -top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 dark:via-primary/50 to-transparent" />

              <div className="p-8 md:p-10">
                <Tabs
                  defaultValue="dni"
                  value={activeTab}
                  className="w-full"
                  onValueChange={(value) => setActiveTab(value as SearchType)}
                >
                  <div className="flex justify-center items-center mb-6">
                    <span className="relative inline-block">
                      <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Buscar por
                      </span>
                      <span className="text-xl font-semibold text-primary dark:text-primary">
                        :
                      </span>
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 dark:via-primary/50 to-transparent" />
                    </span>
                  </div>

                  <TabsList className="w-full h-auto mx-auto mb-4 bg-gray-100/50 dark:bg-[#1E293B]/80 border border-gray-200/50 dark:border-gray-800/50 rounded-xl p-1.5 backdrop-blur-sm flex md:flex-row flex-col gap-1.5">
                    <TabsTrigger
                      value="dni"
                      className="flex-1 rounded-2xl py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-br from-[#0d617b] to-[#12a9be] dark:data-[state=active]:bg-gradient-to-br dark:from-[#b6d900]/45 dark:to-[#b6d900]/85 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 w-full cursor-pointer"
                    >
                      Documento de identidad
                    </TabsTrigger>
                    <TabsTrigger
                      value="code"
                      className="flex-1 rounded-2xl py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-br from-[#0d617b] to-[#12a9be] dark:data-[state=active]:bg-gradient-to-br dark:from-[#b6d900]/45 dark:to-[#b6d900]/85 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 w-full cursor-pointer"
                    >
                      Código de Certificado
                    </TabsTrigger>
                    <TabsTrigger
                      value="name"
                      className="flex-1 rounded-2xl py-2.5 text-sm font-medium data-[state=active]:bg-gradient-to-br from-[#0d617b] to-[#12a9be] dark:data-[state=active]:bg-gradient-to-br dark:from-[#b6d900]/45 dark:to-[#b6d900]/85 data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-200 w-full cursor-pointer"
                    >
                      Nombres y apellidos
                    </TabsTrigger>
                  </TabsList>

                  <div className="relative space-y-0">
                    <TabsContent value="dni" className="space-y-4">
                      <SearchInput
                        placeholder="Ingrese su número de DNI"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        error={error}
                        disabled={loading}
                      />
                    </TabsContent>

                    <TabsContent value="code" className="space-y-4">
                      <SearchInput
                        placeholder="Ingrese el código del certificado"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        error={error}
                        disabled={loading}
                      />
                    </TabsContent>

                    <TabsContent value="name" className="space-y-4">
                      <SearchInput
                        placeholder="Ingrese sus nombres y apellidos"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        error={error}
                        disabled={loading}
                      />
                    </TabsContent>
                  </div>

                  {!extractUuidFromPath() && (
                    <div className="mt-4">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-center">
                        <div className="flex-1">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Ingrese el código"
                              value={captchaInput}
                              onChange={handleCaptchaInputChange}
                              onKeyDown={handleKeyPress}
                              className="w-full h-12 px-4 rounded-2xl bg-gray-50 dark:bg-transparent border border-gray-400 dark:border-gray-600 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-slate-700 dark:text-slate-200 text-center text-base transition-all duration-300"
                              maxLength={5}
                              autoComplete="off"
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="w-full sm:w-44">
                          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d617b] to-[#12a9be] dark:from-[#b6d900]/40 dark:to-[#b6d900]/90 h-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                            <div className="relative flex items-center justify-between px-4 sm:px-6 h-full">
                              <div className="text-white font-bold text-xl sm:text-xl tracking-widest select-none flex-1 text-center">
                                {captchaCode}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  generateCaptchaCode();
                                }}
                                className="text-white/80 hover:text-white transition-all duration-300 p-1.5 sm:p-2.5 rounded-xl hover:bg-white/15 ml-2 sm:ml-3 flex-shrink-0 hover:scale-110 active:scale-95 cursor-pointer"
                                aria-label="Refrescar código"
                                type="button"
                                disabled={loading}
                              >
                                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-8 mb-6 max-w-sm mx-auto w-full">
                    <SearchButton
                      onClick={handleSearch}
                      disabled={
                        !searchValue.trim() || !captchaInput.trim() || loading
                      }
                      loading={loading}
                    />
                    <ClearButton
                      onClick={handleClear}
                      disabled={!searchValue.trim() && !captchaInput.trim()}
                    />
                  </div>

                  <SearchStatus loading={loading} error={error} />

                  {captchaVerified && (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                      {isDirectAccess
                        ? "Búsqueda directa por código QR"
                        : "Listo para buscar certificados..."}
                    </div>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <CertificatesModal
        isOpen={showCertificatesModal}
        onClose={handleCertificatesModalClose}
        participantResult={participantResult}
        onViewCertificate={handleViewSingleCertificate}
      />

      <CertificateViewModal
        isOpen={showCertificateViewModal}
        onClose={handleCertificateViewModalClose}
        certificate={singleResult}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => {
          setShowErrorModal(false);
          handleCloseModalsAndRefreshCaptcha();
        }}
        message={error}
      />
    </section>
  );
}
