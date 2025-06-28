// Lista de países disponibles y sus configuraciones
export interface CountryConfig {
  id: string;        // ID único para el país (pe, co, es)
  code: string;      // Código ISO del país (pe, co, es)
  name: string;      // Nombre completo del país
  flag: string;      // Ruta al archivo SVG de la bandera
  currency: string;  // Moneda del país
  phone: string;     // Código telefónico internacional
  address?: string;  // Dirección de la oficina principal (opcional)
  email?: string;    // Email de contacto específico del país
  whatsapp?: string; // Número de WhatsApp con formato internacional
  isGlobal?: boolean; // Si es el país global
  socialMedia?: {    // Redes sociales específicas del país
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
}

// Tipo para los datos de geolocalización de la API
export interface GeoData {
  country_name?: string;
  country_code?: string;
  city?: string;
  region?: string;
  currency?: string;
  [key: string]: unknown;
}

// Configuración de países disponibles
export const countries: Record<string, CountryConfig> = {
  pe: {
    id: 'pe',
    code: 'pe',
    name: 'Perú',
    flag: '/flags/pe.svg',
    currency: 'PEN',
    phone: '+51',
    address: 'Lima, Perú',
    email: 'capacitaciones@sayan.edu.pe',
    whatsapp: '+51900102090',
    socialMedia: {
      facebook: 'https://www.facebook.com/CimadeEC',
      instagram: 'https://www.instagram.com/cimade_ec',
      youtube: 'https://www.youtube.com/@cimadeec',
      tiktok: 'https://www.tiktok.com/@consorciocimade',
    }
  },
  co: {
    id: 'co',
    code: 'co',
    name: 'Colombia',
    flag: '/flags/co.svg',
    currency: 'COP',
    phone: '+57',
    address: 'Bogotá, Colombia',
    email: 'contacto@sayan.edu.co',
    whatsapp: '+57987654321',
    socialMedia: {
      facebook: 'https://www.facebook.com/CimadeEC',
      instagram: 'https://www.instagram.com/cimade_ec',
      youtube: 'https://www.youtube.com/@cimadeec',
      tiktok: 'https://www.tiktok.com/@consorciocimade',
    }
  },
  // Internacional (todos los demás países)
  es: {
    id: 'es',
    code: 'es',
    name: 'Internacional',
    flag: '/flags/internacional.svg',
    currency: 'USD',
    phone: '+57',
    address: 'Bogotá, Colombia',
    email: 'contacto@sayan.edu.co',
    whatsapp: '+57987654321',
    isGlobal: true,
    socialMedia: {
      facebook: 'https://www.facebook.com/CimadeEC',
      instagram: 'https://www.instagram.com/cimade_ec',
      youtube: 'https://www.youtube.com/@cimadeec',
      tiktok: 'https://www.tiktok.com/@consorciocimade',
    }
  },
};

// Lista de países para el selector
export const countryOptions = Object.values(countries).map(country => ({
  label: country.name,
  value: country.code,
  flag: country.flag
}));

// Función para crear configuración dinámica basada en la API
export const createDynamicCountryConfig = (geoData: GeoData | null | undefined): CountryConfig => {
  const baseConfig = countries.es;
  
  return {
    ...baseConfig,
    name: geoData?.country_name || 'Internacional',
    currency: 'USD',
  };
};

// Obtener país por código con soporte para países dinámicos
export const getCountryByCode = (code: string, geoData?: GeoData | null | undefined): CountryConfig => {
  // Si es PE o CO, devolver directamente
  if (code === 'pe' || code === 'co') {
    return countries[code];
  }
  
  // Si es 'es', crear configuración dinámica
  if (code === 'es') {
    return createDynamicCountryConfig(geoData);
  }
  
  // Fallback a Colombia
  return countries.co;
};

// Función para determinar la ruta según el país detectado
export const getRouteFromDetectedCountry = (detectedCountryCode: string): string => {
  const lowerCode = detectedCountryCode.toLowerCase();
  
  // Si es PE o CO, usar esos códigos
  if (lowerCode === 'pe' || lowerCode === 'co') {
    return lowerCode;
  }
  
  return 'es';
};

// Obtener país por ruta
export const getCountryFromPath = (path: string): CountryCode => {
  // Buscar en la ruta alguno de los códigos de país
  const countryCode = Object.keys(countries).find(code => 
    path.includes(`/${code}`)
  );
  
  // Si se encuentra, devolver ese código
  if (countryCode && countries[countryCode]) {
    return countryCode as CountryCode;
  }
  
  // Por defecto, devolver 'co'
  return 'co';
};

// Verificar si un país es específico (PE, CO) o global (es)
export const isSpecificCountry = (countryCode: string): boolean => {
  return ['pe', 'co'].includes(countryCode.toLowerCase());
};

// Verificar si un país es global
export const isGlobalCountry = (countryCode: string): boolean => {
  return countryCode.toLowerCase() === 'es';
};

// Tipo para los códigos de país válidos
export type CountryCode = 'pe' | 'co' | 'es';

// Lista de rutas comunes para todos los países
export const commonRoutes = [
  { label: 'INICIO', href: '' },
  { label: 'NOSOTROS', href: '/nosotros' },
  { label: 'CURSOS', href: '/cursos' },
  { label: 'DIPLOMADOS', href: '/diplomados' },
  { label: 'VERIFICACION', href: '/certs' },
  { label: 'CONTACTO', href: '/contacto' },
];