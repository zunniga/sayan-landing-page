import { CountryParams, generateStaticParams } from "../page.params";
import CourseLayout from "@/components/pages/course-page";
import { countries } from "@/config/countries";
import { fetchCourses } from "@/lib/api/courses";

// Exportamos esta función para generar rutas estáticas
export { generateStaticParams };

export default async function CursosPage({ params }: CountryParams) {
  const { countryCode } = await params;
  const country = countries[countryCode];

  const coursesResponse = await fetchCourses({
    countryCode,
    limit: 9,
    offset: 0,
  }).catch(() => ({
    data: [],
    pagination: { total: 0, page: 1, limit: 9, currentPages: 1 },
  }));

  return (
    <CourseLayout
      countryCode={countryCode}
      countryName={country.name}
      featuredCourses={coursesResponse.data}
      pagination={coursesResponse.pagination}
    />
  );
}