// Tipos para la respuesta de la API de cursos
export interface CourseApiResponse {
  data: CourseData[];
  pagination: PaginationData;
}

export interface CourseData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  corporation: CorporationData[];
}

export interface CorporationData {
  hours: string;
  flyerCourse: string[];
  institute: InstituteData;
}

export interface InstituteData {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  currentPages: number;
}

// Tipos para la respuesta de la API de cursos con detalles
export interface CourseDetailApiResponse {
  data: CourseDetailData;
}

export interface CourseDetailData extends CourseData {
  topics: string[]; // Array de strings JSON que contienen tema y subTema
}

export interface CourseTopic {
  tema: string;
  subTema: string[];
}