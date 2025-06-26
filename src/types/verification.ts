export interface Certificate {
  id: number;
  eventId: number;
  templateId: number | null;
  urlPdfDigital: string | null;
  urlPdfFisico: string | null;
  code: string;
  qrCode: string;
  role: string;
  fullName: string;
  documentType: string;
  email: string;
  phone: string;
  document_number: string;
  createdAt: string;
  updatedAt: string;
  event: {
    id: number;
    name: string;
    instituteUrl: string[];
    imageInstituteUrl: string[];
    json: string;
    excelUrl: string;
    typeEventId: number;
    companyId: number;
    tokenUsed: number;
    isDemo: boolean;
    createdAt: string;
    updatedAt: string;
    typeEvent: {
      id: number;
      name: string;
      description: string;
      costToken: number;
      urlExcel: string;
      createdAt: string;
      updatedAt: string;
    };
    company: {
      id: number;
      commercialName: string;
      logoUrl: string;
      legalName: string;
      email: string;
      phone: string;
      address: string;
      nitId: number;
      nitValue: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

// Respuesta para búsqueda por documento o nombre
export interface CertificateSearchResponse {
  id: number;
  document_number: string;
  full_name: string;
  certificates: Certificate[];
}

// Respuesta para búsqueda por código - ESTRUCTURA REAL DE LA API
export interface CertificateByCodeResponse {
  id: number;
  code: string;
  createdAt: string;
  participant: {
    id: number;
    document_number: string;
    full_name: string;
  };
  event: {
    id: number;
    name: string;
    imageInstituteUrl: string[];
    json: string;
    excelUrl: string | null;
    typeEventId: number;
    companyId: number;
    tokenUsed: number | null;
    isDemo: boolean;
    createdAt: string;
    updatedAt: string;
    typeEvent: {
      id: number;
      name: string;
      description: string;
      costToken: number;
      urlExcel: string | null;
      createdAt: string;
      updatedAt: string;
    };
    company: {
      id: number;
      commercialName: string;
      logoUrl: string | null;
      legalName: string;
      email: string;
      phone: string;
      address: string;
      nitId: number;
      nitValue: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

// Respuesta para búsqueda por código QR UUID
export interface CertificateByQrResponse {
  id: number;
  code: string;
  createdAt: string;
  participant: {
    id: number;
    document_number: string;
    full_name: string;
  };
  event: {
    id: number;
    name: string;
    imageInstituteUrl: string[];
    json: string;
    excelUrl: string | null;
    typeEventId: number;
    companyId: number;
    tokenUsed: number | null;
    isDemo: boolean;
    createdAt: string;
    updatedAt: string;
    typeEvent: {
      id: number;
      name: string;
      description: string;
      costToken: number;
      urlExcel: string | null;
      createdAt: string;
      updatedAt: string;
    };
    company: {
      id: number;
      commercialName: string;
      logoUrl: string | null;
      legalName: string;
      email: string;
      phone: string;
      address: string;
      nitId: number;
      nitValue: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}