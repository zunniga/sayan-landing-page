import { CountryParams, generateStaticParams } from '../page.params';
import { countries } from '@/config/countries';
import AboutLayout from '@/components/pages/about-page';

// Importar datos específicos por país
import {
  heroStatsCO,
  partnershipsCO,
} from '@/mock/nosotros/colombia-data';

import {
  heroStatsPE,
  partnershipsPE,
} from '@/mock/nosotros/peru-data';

// Exportamos esta función para generar rutas estáticas
export { generateStaticParams };

export default async function NosotrosPage({ params }: CountryParams) {
  const { countryCode } = await params;
  
  // Obtener la configuración del país desde los parámetros
  const country = countries[countryCode];

  // Seleccionar datos según el país
  const getData = () => {
    if (countryCode === 'pe') {
      return {
        heroStats: heroStatsPE,
        partnerships: partnershipsPE,
      };
    } else {
      return {
        heroStats: heroStatsCO,
        partnerships: partnershipsCO,
      };
    }
  };

  const data = getData();
    return (
    <AboutLayout
      countryCode={countryCode}
      countryName={country.name}
      heroStats={data.heroStats}
      partnerships={data.partnerships}
    />
  );
}
