import { notFound } from 'next/navigation';
import { fetchCourseDetail } from '@/lib/api/courses';
import CourseDetail from '@/components/pages/course-detail';

interface CourseDetailPageParams {
  params: Promise<{
    countryCode: string;
    id: string;
  }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageParams) {
  const { countryCode, id } = await params;

  try {
    const courseResponse = await fetchCourseDetail ({
      countryCode,
      courseId: id,
    });
    
    if (!courseResponse.data) {
      notFound();
    }

    return (
      <CourseDetail 
        course={courseResponse.data} 
        countryCode={countryCode} 
      />
    );
  } catch (error) {
    console.error('Error loading course detail:', error);
    notFound();
  }
}