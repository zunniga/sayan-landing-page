# CIMADE Website

Este es el sitio web oficial de CIMADE (Centro de Investigación y Mejoramiento Académico para el Desarrollo Educativo), diseñado con una arquitectura escalable que permite administrar múltiples sitios para diferentes países conservando una estructura común.

## Estructura del Proyecto

El proyecto está organizado para soportar múltiples países de forma dinámica, permitiendo que se agreguen nuevos países fácilmente mientras se mantiene un conjunto de secciones comunes.

### Estructura de Carpetas

```
src/
├── app/                     # Directorio principal de Next.js
│   ├── [countryCode]/       # Rutas dinámicas basadas en el código de país
│   │   ├── page.tsx         # Página principal de cada país
│   │   ├── page.params.ts   # Configuración de parámetros dinámicos
│   │   ├── nosotros/        # Sección "Nosotros" para cada país
│   │   ├── cursos/          # Sección "Cursos" para cada país
│   │   ├── diplomados/      # Sección "Diplomados" para cada país
│   │   ├── verificacion/    # Sección "Verificación" para cada país
│   │   └── contacto/        # Sección "Contacto" para cada país
│   ├── page.tsx             # Página principal (redirección al país por defecto)
│   └── layout.tsx           # Layout principal de la aplicación
│
├── components/              # Componentes reutilizables
│   ├── layout/
│   │   ├── navbar.tsx       # Barra de navegación dinámica por país
│   │   └── footer.tsx       # Pie de página dinámico por país
│   ├── ui/                  # Componentes de UI genéricos
│   └── ...
│
├── config/                  # Configuraciones
│   └── countries.ts         # Configuración de países disponibles
│
└── ...
```

## Cómo Funciona

### Enrutamiento Dinámico

El proyecto utiliza el sistema de rutas dinámicas de Next.js para manejar diferentes países:

- La ruta `/[countryCode]` captura el código del país (pe, co, etc.)
- Cada país comparte las mismas secciones: Inicio, Nosotros, Cursos, Diplomados, Verificación y Contacto
- La URL final tiene el formato `/{código-país}/{sección}` (ej: `/pe/cursos`, `/co/nosotros`)

### Configuración de Países

La configuración de países se centraliza en `src/config/countries.ts`:

```typescript
// Lista de países disponibles y sus configuraciones
export interface CountryConfig {
  id: string;        // ID único para el país
  code: string;      // Código ISO del país
  name: string;      // Nombre completo del país
  flag: string;      // Ruta al archivo SVG de la bandera
  currency: string;  // Moneda del país
  // ... más propiedades específicas
}

// Configuraciones para cada país
export const countries: Record<string, CountryConfig> = {
  pe: { /* Configuración para Perú */ },
  co: { /* Configuración para Colombia */ },
  // Agregar más países aquí
};
```

### Componentes Dinámicos

Los componentes principales (navbar, footer, etc.) detectan el país actual basándose en:

1. El código de país proporcionado como prop
2. La URL actual si no se proporciona explícitamente

Estos componentes renderizan su contenido específico según el país seleccionado, utilizando la configuración central.

## Cómo Agregar un Nuevo País

Para agregar un nuevo país al sitio:

1. Agrega la bandera del país en `/public/flags/` (SVG, nombre: código-país.svg)
2. Añade la configuración del país en `src/config/countries.ts`:

```typescript
export const countries: Record<string, CountryConfig> = {
  pe: { /* ... */ },
  co: { /* ... */ },
  mx: {
    id: 'mx',
    code: 'mx',
    name: 'México',
    flag: '/flags/mx.svg',
    currency: 'MXN',
    phone: '+52',
    // ... más propiedades específicas
  },
};
```

3. Next.js generará automáticamente todas las rutas necesarias para el nuevo país

## Ejecución del Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar el servidor de producción
npm start
```
