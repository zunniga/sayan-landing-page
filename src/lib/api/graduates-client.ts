import { GraduateApiResponse } from '@/types/graduate';

/**
 * Función client-side para obtener diplomados con paginación
 */
export async function fetchGraduatesClient({
  countryCode,
  limit = 6,
  offset = 0,
}: {
  countryCode: string;
  limit?: number;
  offset?: number;
}): Promise<GraduateApiResponse> {
  const params = new URLSearchParams({
    countryCode,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  console.log('Client Graduates - Realizando fetch con:', { countryCode, limit, offset });

  const response = await fetch(`/api/graduates?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener diplomados: ${response.status}`);
  }

  const data = await response.json();
  console.log('Client Graduates - Datos recibidos:', {
    total: data.pagination?.total,
    dataLength: data.data?.length
  });

  return data;
}
