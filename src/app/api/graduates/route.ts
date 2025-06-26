import { NextRequest, NextResponse } from 'next/server';
import { fetchGraduates } from '@/lib/api/graduates';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const countryCode = searchParams.get('countryCode') || 'pe';
    const limit = parseInt(searchParams.get('limit') || '6');
    const offset = parseInt(searchParams.get('offset') || '0');

    console.log('API Graduates - Parámetros recibidos:', { countryCode, limit, offset });

    const data = await fetchGraduates({ countryCode, limit, offset });
    
    console.log('API Graduates - Datos obtenidos:', {
      total: data.pagination.total,
      dataLength: data.data.length,
      currentPage: Math.floor(offset / limit) + 1
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error en API de diplomados:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
