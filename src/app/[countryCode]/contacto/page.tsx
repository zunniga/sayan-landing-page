import ContactPage from '@/components/pages/contact-page';
import { CountryParams, generateStaticParams } from '../page.params';

// Exportamos esta función para generar rutas estáticas
export { generateStaticParams };

export default async function ContactoPage({ params }: CountryParams) {
  const { countryCode } = await params;
  return (
      <ContactPage
        countryCode={countryCode}
      />
  );
}
