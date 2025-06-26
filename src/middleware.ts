import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Lista de países válidos
  const validCountries = ['pe', 'co', 'es'];
  
  // Verificar si la ruta ya tiene un código de país válido
  const hasValidCountryCode = validCountries.some(country => 
    pathname.startsWith(`/${country}`)
  );
  
  // Si ya tiene un código de país válido, continuar
  if (hasValidCountryCode) {
    return NextResponse.next();
  }
  
  // Si está intentando acceder a una ruta con código de país inválido
  const pathSegments = pathname.split('/');
  if (pathSegments.length > 1 && pathSegments[1].length === 2) {
    // Es un código de país de 2 letras pero no válido, redirigir a /es
    const newPath = pathname.replace(`/${pathSegments[1]}`, '/es');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  
  // Si está en la raíz, dejar que la página principal maneje la redirección
  if (pathname === '/') {
    return NextResponse.next();
  }
  
  // Para cualquier otra ruta sin código de país, redirigir a /es
  return NextResponse.redirect(new URL(`/es${pathname}`, request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};