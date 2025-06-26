// Tipos para la respuesta de la API de diplomas
export interface GraduateApiResponse {
  data: GraduateData[];
  pagination: PaginationData;
}

export interface GraduateData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  corporation: CorporationData[];
}

export interface CorporationData {
  brochure: string[];
  flyerCourse: string[];
  hours: string;
  priceGraduate: string;
}

export interface PaginationData {
  total: number;
  limit: number;
  currentPages: number;
}

// Tipos para la respuesta de la API de detalles de diplomas
export interface GraduateDetailApiResponse {
  data: GraduateDetailData;
}

export interface GraduateDetailData {
  id: number;
  name: string;
  module: ModuleData[];
  corporation: CorporationDetailData[];
}

export interface ModuleData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface CorporationDetailData {
  institute: InstituteData;
}

export interface InstituteData {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
}