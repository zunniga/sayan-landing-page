import { notFound } from 'next/navigation';
import { fetchGraduateDetail } from '@/lib/api/graduates';
import GraduateDetail from '@/components/pages/graduate-detail';

interface PageProps {
  params: Promise<{
    countryCode: string;
    id: string;
  }>;
}

export default async function GraduateDetailPage({ params }: PageProps) {
  const { countryCode, id } = await params;

  try {
    const response = await fetchGraduateDetail({ 
      countryCode,
      id,
     });
     
    const graduate = response.data;

    if (!graduate) {
      notFound();
    }

    return (
      <GraduateDetail graduate={graduate} countryCode={countryCode} />
    );
  } catch (error) {
    console.error("Error fetching graduate:", error);
    notFound();
  }
}