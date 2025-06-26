import { Navbar } from '@/components/shared/layout/navbar';
import { Footer } from '@/components/shared/layout/footer';
import { WhatsAppButton } from "@/components/ui/float-button/whatsapp-button";
import { ScrollToTopButton } from "@/components/ui/float-button/scroll-to-top-button";
import { countries } from '@/config/countries';
import { notFound } from 'next/navigation';

export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ countryCode: string }>;
}) {
  const { countryCode } = await params;
  
  // Validar que el código de país existe en nuestra configuración
  if (!countries[countryCode]) {
    notFound(); // Redirigir a 404 si el país no existe
  }
  
  return (
    <div className="min-h-screen">
      <Navbar countryCode={countryCode} />
      {children}
      <Footer countryCode={countryCode} />
      <WhatsAppButton countryCode={countryCode} />
      <ScrollToTopButton />
    </div>
  );
}
