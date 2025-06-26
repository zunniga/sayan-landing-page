import { CourseApiResponse } from '@/types/course';

/**
 * Función para obtener cursos desde el cliente
 */
export async function fetchCoursesClient({
  countryCode,
  limit = 9,
  offset = 0,
}: {
  countryCode: string;
  limit?: number;
  offset?: number;
}): Promise<CourseApiResponse> {
  const url = `/api/courses?countryCode=${countryCode}&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching courses: ${response.status} ${response.statusText}`);
    }
    
    const data: CourseApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses from client:', error);
    throw error;
  }
}