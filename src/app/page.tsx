'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { detectUserCountryAndRoute, getCountryFromCookie, saveGeoDataToSession } from '@/lib/api/ipapi';
import { countries } from '@/config/countries';
import { COUNTRY_DETECTION_CONFIG } from '@/config/country-detection';

export default function Home() {
  const router = useRouter();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Detectar cliente primero
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let isMounted = true;

    async function handleCountryDetection() {
      try {
        // Paso 1: Progreso inicial
        setLoadingProgress(20);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!isMounted) return;

        // Paso 2: Verificar cookie
        const savedCountry = getCountryFromCookie();
        
        if (savedCountry && countries[savedCountry]) {
          setLoadingProgress(100);
          await new Promise(resolve => setTimeout(resolve, 300));
          if (isMounted) {
            router.push(`/${savedCountry}`);
          }
          return;
        }

        // Paso 3: Detectar país y obtener datos de geolocalización
        setLoadingProgress(60);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!isMounted) return;

        const { geoData, route } = await detectUserCountryAndRoute();
        
        setLoadingProgress(90);
        await new Promise(resolve => setTimeout(resolve, 300));

        if (!isMounted) return;

        const targetCountry = (route && countries[route]) 
          ? route 
          : COUNTRY_DETECTION_CONFIG.DEFAULT_COUNTRY;

        // Guardar datos de geolocalización en sessionStorage para uso posterior
        if (geoData) {
          saveGeoDataToSession(geoData);
        }

        // Guardar en cookie
        if (typeof document !== 'undefined') {
          document.cookie = `${COUNTRY_DETECTION_CONFIG.COOKIE.NAME}=${targetCountry}; path=/; max-age=${COUNTRY_DETECTION_CONFIG.COOKIE.MAX_AGE}`;
        }
        
        setLoadingProgress(100);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (isMounted) {
          router.push(`/${targetCountry}`);
        }

      } catch (error) {
        console.error('Error en la detección de país:', error);
        
        if (!isMounted) return;

        const defaultCountry = COUNTRY_DETECTION_CONFIG.DEFAULT_COUNTRY;
        
        if (typeof document !== 'undefined') {
          document.cookie = `${COUNTRY_DETECTION_CONFIG.COOKIE.NAME}=${defaultCountry}; path=/; max-age=${COUNTRY_DETECTION_CONFIG.COOKIE.MAX_AGE}`;
        }
        
        setLoadingProgress(100);
        if (isMounted) {
          router.push(`/${defaultCountry}`);
        }
      }
    }
    
    handleCountryDetection();

    return () => {
      isMounted = false;
    };
  }, [router, isClient]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <LoadingScreen progress={loadingProgress} />
    </div>
  );
}