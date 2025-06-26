import { COUNTRY_DETECTION_CONFIG } from '@/config/country-detection';
import { getRouteFromDetectedCountry } from '@/config/countries';

// Definición del tipo de respuesta de ipapi.co
export interface IpapiResponse {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  continent_code: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_calling_code: string;
  org: string;
}

/**
 * Detecta la ubicación del usuario y retorna tanto los datos de geo como la ruta sugerida
 */
export async function detectUserCountryAndRoute(): Promise<{
  geoData: IpapiResponse | null;
  route: string;
}> {
  try {
    // Controller para timeout de la petición
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), COUNTRY_DETECTION_CONFIG.REQUEST_TIMEOUT);
    
    // Realizamos la petición a ipapi.co
    const response = await fetch(COUNTRY_DETECTION_CONFIG.API_URL, { 
      signal: controller.signal,
      next: { revalidate: COUNTRY_DETECTION_CONFIG.CACHE_DURATION },
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CIMADE-Website/1.0'
      }
    });
    
    // Limpiar el timeout si la petición fue exitosa
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.error('Error fetching country data:', response.statusText);
      return {
        geoData: null,
        route: COUNTRY_DETECTION_CONFIG.DEFAULT_COUNTRY
      };
    }
    
    const geoData: IpapiResponse = await response.json();
    
    // Validar que tenemos un código de país válido
    if (!geoData.country_code || geoData.country_code.length !== 2) {
      console.error('Invalid country code received:', geoData.country_code);
      return {
        geoData: null,
        route: COUNTRY_DETECTION_CONFIG.DEFAULT_COUNTRY
      };
    }
    
    // Determinar la ruta basada en el país detectado
    const route = getRouteFromDetectedCountry(geoData.country_code);
    
    return {
      geoData,
      route
    };
    
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('Country detection request timed out');
      } else {
        console.error('Error detecting user country:', error.message);
      }
    } else {
      console.error('Unknown error detecting user country:', error);
    }
    
    return {
      geoData: null,
      route: COUNTRY_DETECTION_CONFIG.DEFAULT_COUNTRY
    };
  }
}

/**
 * Función legacy para compatibilidad - ahora usa la nueva función
 */
export async function detectUserCountry(): Promise<string | null> {
  const { route } = await detectUserCountryAndRoute();
  return route;
}

/**
 * Obtiene el país desde cookies del navegador
 */
export function getCountryFromCookie(): string | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cookies = document.cookie.split(';');
    const countryCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${COUNTRY_DETECTION_CONFIG.COOKIE.NAME}=`)
    );
    
    if (countryCookie) {
      return countryCookie.split('=')[1].trim();
    }
    
    return null;
  } catch (error) {
    console.error('Error reading country cookie:', error);
    return null;
  }
}

/**
 * Guarda los datos de geolocalización en sessionStorage para uso posterior
 */
export function saveGeoDataToSession(geoData: IpapiResponse): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem('cimade_geoData', JSON.stringify(geoData));
  } catch (error) {
    console.error('Error saving geo data to session:', error);
  }
}

/**
 * Obtiene los datos de geolocalización desde sessionStorage
 */
export function getGeoDataFromSession(): IpapiResponse | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = sessionStorage.getItem('cimade_geoData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading geo data from session:', error);
    return null;
  }
}