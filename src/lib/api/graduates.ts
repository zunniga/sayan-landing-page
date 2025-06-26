import { GraduateApiResponse, GraduateDetailApiResponse } from '@/types/graduate';

/**
 * Servicio para obtener cursos desde la API de CIMADE
 */
export async function fetchGraduates({
  countryCode,
  limit = 10,
  offset = 0,
}: {
  countryCode: string;
  limit: number;
  offset: number;
}): Promise<GraduateApiResponse> {
  let baseUrl = '';
  let url = '';

  if (countryCode === 'pe') {
    baseUrl = process.env.BACKEND_URL || 'http://backunp.auladm.com';
    url = `${baseUrl}/api/v1/pages/graduate?name=cimade&limit=${limit}&offset=${offset}`;
  } else if (countryCode === 'co') {
    baseUrl = process.env.BACKEND_URL_COL || 'http://backunpcol.auladm.com';
    url = `${baseUrl}/api/v1/pages/graduate?name=cimade&limit=${limit}&offset=${offset}`;
  } else {
    baseUrl = process.env.BACKEND_URL_COL || 'http://backunpcol.auladm.com';
    url = `${baseUrl}/api/v1/pages/graduate?name=cimade&limit=${limit}&offset=${offset}`;
  }

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status} ${response.statusText}`);
    }
    
    const data: GraduateApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

/**
 * Servicio para obtener el detalle de un diplomado específico
 */
export async function fetchGraduateDetail({
  countryCode,
  id,
}: {
  countryCode: string;
  id: string;
}): Promise<GraduateDetailApiResponse> {
  let baseUrl = '';
  let url = '';

  if (countryCode === 'pe') {
    baseUrl = process.env.BACKEND_URL || 'http://backunp.auladm.com';
    url = `${baseUrl}/api/v1/pages/gradute/${id}?name=cimade`;
  } else if (countryCode === 'co') {
    baseUrl = process.env.BACKEND_URL_COL || 'http://backunpcol.auladm.com';
    url = `${baseUrl}/api/v1/pages/gradute/${id}?name=cimade`;
  } else {
    baseUrl = process.env.BACKEND_URL_COL || 'http://backunpcol.auladm.com';
    url = `${baseUrl}/api/v1/pages/gradute/${id}?name=cimade`;
  }
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching graduate detail: ${response.status} ${response.statusText}`);
    }
    
    const data: GraduateDetailApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching graduate detail:', error);
    throw error;
  }
}