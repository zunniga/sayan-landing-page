import { CountryParams } from '../page.params';
import { countries } from '@/config/countries';
import { fetchGraduates } from "@/lib/api/graduates";
import GraduateLayout from '@/components/pages/graduate-page';

export default async function DiplomadosPage({ params }: CountryParams) {
  const { countryCode } = await params;
  const country = countries[countryCode];

  const graduatesResponse = await fetchGraduates({
    countryCode,
    limit: 6,
    offset: 0,
  }).catch(() => ({
    data: [],
    pagination: { total: 0, limit: 6, currentPages: 1 }
  }));

  return (
    <GraduateLayout
      countryCode={countryCode}
      countryName={country.name}
      featuredGraduates={graduatesResponse.data}
      pagination={graduatesResponse.pagination}
    />
  );
}