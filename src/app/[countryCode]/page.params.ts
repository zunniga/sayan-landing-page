// Este archivo define los parámetros de ruta dinámica para los países
// Los países válidos se definen aquí para validar automáticamente las rutas

import { countries } from '@/config/countries';

export function generateStaticParams() {
  // Genera páginas estáticas para cada país configurado (pe, co, es)
  return Object.keys(countries).map((countryCode) => ({
    countryCode,
  }));
}

// Creamos un tipo para el objeto de parámetros
export type CountryParams = {
  params: Promise<{
    countryCode: string;
  }>;
};