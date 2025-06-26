import { useState, useCallback } from 'react';
import { 
  searchCertificateByDocument, 
  searchCertificateByCode, 
  searchCertificateByName, 
  searchCertificateByQr 
} from '@/lib/api/verification';
import { 
  CertificateSearchResponse, 
  CertificateByCodeResponse, 
  CertificateByQrResponse 
} from '@/types/verification';

export type SearchType = 'dni' | 'code' | 'name';

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
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
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

interface UseVerificationSearchReturn {
  // Estados de carga
  loading: boolean;
  error: string | null;
  
  // Resultados (separados por tipo de respuesta)
  participantResult: CertificateSearchResponse | null; // Para DNI y nombres (múltiples certificados)
  singleResult: CertificateByCodeResponse | CertificateByQrResponse | null; // Para código y QR (certificado único)
  
  // Funciones de búsqueda
  searchByDocument: (documentNumber: string) => Promise<boolean>;
  searchByCode: (code: string) => Promise<boolean>;
  searchByName: (fullName: string) => Promise<boolean>;
  searchByQr: (qrCode: string) => Promise<boolean>; // Para acceso directo
  
  // Funciones de utilidad
  reset: () => void;
  clearError: () => void;
  
  // Estados adicionales
  hasResults: boolean;
  isMultipleResults: boolean;
}

export function useVerificationSearch(): UseVerificationSearchReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [participantResult, setParticipantResult] = useState<CertificateSearchResponse | null>(null);
  const [singleResult, setSingleResult] = useState<CertificateByCodeResponse | CertificateByQrResponse | null>(null);

  const resetResults = useCallback(() => {
    setParticipantResult(null);
    setSingleResult(null);
    setError(null);
  }, []);

  const searchByDocument = useCallback(async (documentNumber: string): Promise<boolean> => {
    if (!documentNumber.trim()) {
      setError('El número de documento es requerido');
      return false;
    }

    setLoading(true);
    resetResults();

    try {
      const result = await searchCertificateByDocument({ 
        documentNumber: documentNumber.trim() 
      });
      
      setParticipantResult(result);
      return true;
    } catch (error: unknown) {
      console.error('Error en búsqueda por documento:', error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [resetResults]);

  const searchByCode = useCallback(async (code: string): Promise<boolean> => {
    if (!code.trim()) {
      setError('El código del certificado es requerido');
      return false;
    }

    setLoading(true);
    resetResults();

    try {
      const result = await searchCertificateByCode({ 
        code: code.trim() 
      });
      
      setSingleResult(result);
      return true;
    } catch (error: unknown) {
      console.error('Error en búsqueda por código:', error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [resetResults]);

  const searchByName = useCallback(async (fullName: string): Promise<boolean> => {
    if (!fullName.trim()) {
      setError('El nombre completo es requerido');
      return false;
    }

    setLoading(true);
    resetResults();

    try {
      const result = await searchCertificateByName({ 
        fullName: fullName.trim() 
      });
      
      setParticipantResult(result);
      return true;
    } catch (error: unknown) {
      console.error('Error en búsqueda por nombre:', error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [resetResults]);

  const searchByQr = useCallback(async (qrCode: string): Promise<boolean> => {
    if (!qrCode.trim()) {
      setError('El código QR es requerido');
      return false;
    }

    setLoading(true);
    resetResults();

    try {
      const result = await searchCertificateByQr({ 
        qrCode: qrCode.trim() 
      });
      
      setSingleResult(result);
      return true;
    } catch (error: unknown) {
      console.error('Error en búsqueda por QR:', error);
      const errorMessage = handleApiError(error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [resetResults]);

  const reset = useCallback(() => {
    setLoading(false);
    resetResults();
  }, [resetResults]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Estados derivados
  const hasResults = !!(participantResult || singleResult);
  const isMultipleResults = !!(participantResult && participantResult.certificates && participantResult.certificates.length > 1);

  return {
    loading,
    error,
    participantResult,
    singleResult,
    searchByDocument,
    searchByCode,
    searchByName,
    searchByQr,
    reset,
    clearError,
    hasResults,
    isMultipleResults
  };
}