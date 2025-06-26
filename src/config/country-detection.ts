/**
 * Configuración para la detección de país
 * Este archivo centraliza todas las configuraciones relacionadas con la detección de país
 * Las variables se obtienen del archivo .env
 */
export const COUNTRY_DETECTION_CONFIG = {
  // URL de la API de detección de país
  API_URL: process.env.IPAPI_URL || 'https://ipapi.co/json/',
  
  // País por defecto si la detección falla
  DEFAULT_COUNTRY: process.env.DEFAULT_COUNTRY_CODE || 'pe',
  
  // Configuración de cache y revalidación
  CACHE_DURATION: 86400, // 24 horas en segundos
  
  // Timeout para la petición (5 segundos)
  REQUEST_TIMEOUT: 5000,
  
  // Configuración de cookies
  COOKIE: {
    NAME: 'country-code',
    MAX_AGE: Number(process.env.COOKIE_MAX_AGE) || 30 * 24 * 60 * 60, // 30 días por defecto (2592000 segundos)
    PATH: '/',
    SAME_SITE: 'lax' as const,
    SECURE: process.env.NODE_ENV === 'production',
  }
} as const;
