import { NextRequest, NextResponse } from 'next/server';
import { fetchCourses } from '@/lib/api/courses';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const countryCode = searchParams.get('countryCode') || '';
    const limit = parseInt(searchParams.get('limit') || '9');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!countryCode) {
      return NextResponse.json(
        { error: 'countryCode is required' },
        { status: 400 }
      );
    }

    const courses = await fetchCourses({
      countryCode,
      limit,
      offset,
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error in courses API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}