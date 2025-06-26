import { CountryParams, generateStaticParams } from './page.params';
import { getCountryByCode, isSpecificCountry } from '@/config/countries';
import HomeLayout from '@/components/pages/home-page';
import { fetchCourses } from '@/lib/api/courses';
import { fetchGraduates } from '@/lib/api/graduates';

// Importar datos de país según el código de país
import {
  heroSlidesPE,
  testimonialsPE,
  statsPE
} from '@/mock/inicio/peru-data';

import {
  heroslidesCO,
  testimonialsCO,
  statsCO
} from '@/mock/inicio/colombia-data';

// Exportamos esta función para generar rutas estáticas
export { generateStaticParams };

export default async function CountryHomePage({ params }: CountryParams) {
  const { countryCode } = await params;
  
  // Obtener datos de geolocalización si es necesario (para país global)
  const geoData = null;
  
  // Obtener la configuración del país
  const country = getCountryByCode(countryCode, geoData);
  
  // Obtener cursos destacados desde la API
  // Para país global (es), usar datos de Colombia
  const apiCountryCode = isSpecificCountry(countryCode) ? countryCode : 'co';
  
  const coursesResponse = await fetchCourses({
    countryCode: apiCountryCode,
    limit: 6,
    offset: 0,
  }).catch(() => ({
    data: [],
    pagination: { total: 0, page: 1, limit: 6, currentPages: 1 }
  }));

  // Obtener diplomados destacados desde la API
  const graduatesResponse = await fetchGraduates({
    countryCode: apiCountryCode,
    limit: 6,
    offset: 0,
  }).catch(() => ({
    data: [],
    pagination: { total: 0, limit: 6, currentPages: 1 }
  }));
  
  const featuredCourses = coursesResponse.data;
  const featuredDiplomas = graduatesResponse.data;
  
  // Determinar qué datos usar según el código de país
  let heroSlides, testimonials, stats;
  
  if (countryCode === 'pe') {
    heroSlides = heroSlidesPE;
    testimonials = testimonialsPE;
    stats = statsPE;
  } else {
    // Para CO y ES - usar datos de Colombia
    heroSlides = heroslidesCO;
    testimonials = testimonialsCO;
    stats = statsCO;
  }

  return (
    <HomeLayout
      countryCode={countryCode}
      countryName={country.name} // Nombre dinámico para país global
      heroSlides={heroSlides}
      featuredCourses={featuredCourses}
      testimonials={testimonials}
      stats={stats}
      featuredDiplomas={featuredDiplomas}
    />
  );
}