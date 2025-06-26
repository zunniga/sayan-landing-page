import {
  CertificateSearchResponse,
  CertificateByCodeResponse,
  CertificateByQrResponse,
} from "@/types/verification";

// URL base del backend de VeryCerts
const baseUrl =
  process.env.BACKEND_URL_VERIFICATION || "https://backend.verycerts.com";

/**
 * Servicio para buscar certificados por número de documento
 * @param documentNumber - Número de documento del participante
 */
export async function searchCertificateByDocument({
  documentNumber,
}: {
  documentNumber: string;
}): Promise<CertificateSearchResponse> {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/certificate-validation/document/${documentNumber}`
    );

    if (!response.ok) {
      throw new Error(
        "No se encontraron resultados para el documento: " +
          `${documentNumber}`
      );
    }

    const data: CertificateSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching certificate by document:", error);
    throw error;
  }
}

/**
 * Servicio para buscar certificados por código
 * @param code - Código del certificado
 */
export async function searchCertificateByCode({
  code,
}: {
  code: string;
}): Promise<CertificateByCodeResponse> {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/certificate-validation/code/${code}`
    );

    if (!response.ok) {
      throw new Error(
        "No se encontraron resultados para el código: " +
          `${code}`
      );
    }

    const data: CertificateByCodeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching certificate by code:", error);
    throw error;
  }
}

/**
 * Servicio para buscar certificados por nombre
 * @param fullName - Nombre completo del participante
 */
export async function searchCertificateByName({
  fullName,
}: {
  fullName: string;
}): Promise<CertificateSearchResponse> {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/certificate-validation/name/${encodeURIComponent(
        fullName
      )}`
    );

    if (!response.ok) {
      throw new Error(
        "No se encontraron resultados para el nombre: " +
          `${fullName}`
      );
    }

    const data: CertificateSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching certificate by name:", error);
    throw error;
  }
}

/**
 * Servicio para buscar certificados por código QR
 * @param qrCode - Código QR del certificado
 */
export async function searchCertificateByQr({
  qrCode,
}: {
  qrCode: string;
}): Promise<CertificateByQrResponse> {
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/certificate-validation/qr/${qrCode}`
    );

    if (!response.ok) {
      throw new Error(
        "No se encontraron resultados para el código QR: " +
          `${qrCode}`
      );
    }

    const data: CertificateByQrResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching certificate by QR code:", error);
    throw error;
  }
}
