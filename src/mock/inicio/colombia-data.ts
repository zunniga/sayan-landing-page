// Mock data para la página principal de Colombia

import type { StatItem } from '@/components/sections/inicio/stats';

export const heroslidesCO = [
  {
    id: '1',
    title: 'Educación especializada para profesionales',
    subtitle: 'Programas adaptados al mercado',
    description: 'Formación orientada a potenciar tus habilidades profesionales y darte ventaja competitiva en el mercado laboral.',
    image: '/colombia/hero/hero-colombia-1.jpg',
    ctaText: 'Descubrir cursos',
    ctaLink: '/co/cursos'
  },
  {
    id: '2',
    title: 'Certificaciones con aval internacional',
    subtitle: 'Impulsa tu carrera al siguiente nivel',
    description: 'Nuestros diplomados cuentan con reconocimiento de instituciones educativas de prestigio a nivel global.',
    image: '/colombia/hero/hero-colombia-1.jpg',
    ctaText: 'Ver diplomados',
    ctaLink: '/co/diplomados'
  },
  {
    id: '3',
    title: 'Aprendizaje basado en proyectos reales',
    subtitle: 'Metodología práctica y aplicada',
    description: 'Desarrolla competencias profesionales a través de casos prácticos extraídos del entorno empresarial colombiano.',
    image: '/colombia/hero/hero-colombia-1.jpg',
    ctaText: 'Conocer más',
    ctaLink: '/co/nosotros'
  }
];

export const featuredCoursesCO = [
  {
    id: 'c1',
    title: 'Liderazgo y Gestión de Equipos',
    description: 'Desarrolla habilidades de liderazgo efectivo para dirigir equipos de alto rendimiento en cualquier tipo de organización.',
    image: '/colombia/course/diplomado.webp',
    category: 'Liderazgo',
    duration: '7 semanas',
    students: 280,
    modules: 5,
    price: 'COL$ 1.250.000',
    slug: 'liderazgo-gestion-equipos'
  },
  {
    id: 'c2',
    title: 'Analítica de Datos para Negocios',
    description: 'Aprende a utilizar herramientas de análisis de datos para tomar decisiones estratégicas basadas en información.',
    image: '/colombia/course/diplomado.webp',
    category: 'Data Science',
    duration: '8 semanas',
    students: 310,
    modules: 6,
    price: 'COL$ 1.450.000',
    slug: 'analitica-datos-negocios'
  },
  {
    id: 'c3',
    title: 'Gestión de Proyectos Ágiles',
    description: 'Domina las metodologías ágiles para gestionar proyectos de forma eficiente y adaptativa en entornos dinámicos.',
    image: '/colombia/course/diplomado.webp',
    category: 'Proyectos',
    duration: '6 semanas',
    students: 250,
    modules: 5,
    price: 'COL$ 1.150.000',
    slug: 'gestion-proyectos-agiles'
  }
];

export const testimonialsCO = [
  {
    id: 't1',
    name: 'Andrea Gómez',
    role: 'Gerente de Innovación',
    company: 'Grupo Bancolombia',
    avatar: '/colombia/testimonial/equipo1.jpg',
    comment: 'El curso de Transformación Digital me brindó las herramientas necesarias para liderar proyectos de innovación en mi empresa. El nivel de los profesores y el contenido práctico son excepcionales.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Daniel Martínez',
    role: 'Director de Proyectos',
    company: 'Ecopetrol',
    avatar: '/colombia/testimonial/equipo1.jpg',
    comment: 'La certificación en Gestión de Proyectos Ágiles ha sido fundamental para mejorar los procesos en mi equipo. Ahora somos mucho más eficientes y adaptables ante los cambios.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Carolina Ramírez',
    role: 'Especialista en Marketing',
    company: 'Grupo Éxito',
    avatar: '/colombia/testimonial/equipo1.jpg',
    comment: 'CIMADE ofrece una formación de calidad con profesores que conocen la realidad del mercado colombiano. El curso de Marketing Digital superó completamente mis expectativas.',
    rating: 4
  }
];

export const statsCO: StatItem[] = [
  {
    id: 'stat1',
    value: 8500,
    label: 'Profesionales formados',
    icon: 'students',
    suffix: '+'
  },
  {
    id: 'stat2',
    value: 38,
    label: 'Cursos especializados',
    icon: 'courses'
  },
  {
    id: 'stat3',
    value: 9500,
    label: 'Certificados emitidos',
    icon: 'certificates',
    suffix: '+'
  },
  {
    id: 'stat4',
    value: 95,
    label: 'Índice de satisfacción',
    icon: 'students',
    suffix: '%'
  }
];

export const featuredDiplomasCO = [
  {
    id: 'd1',
    title: 'Diplomado en Gestión Estratégica de la Innovación',
    description: 'Programa avanzado para desarrollar capacidades en la implementación y gestión de procesos de innovación empresarial sostenible.',
    image: '/colombia/diploma/diplomado.webp',
    startDate: '10 de Julio 2025',
    duration: '6 meses',
    modality: 'Híbrida',
    price: 'COL$ 4.900.000',
    slug: 'gestion-estrategica-innovacion',
    featured: true
  },
  {
    id: 'd2',
    title: 'Diplomado en Gerencia Comercial y Ventas',
    description: 'Programa especializado en estrategias comerciales, negociación y dirección de equipos de ventas de alto rendimiento.',
    image: '/colombia/diploma/diplomado.webp',
    startDate: '5 de Agosto 2025',
    duration: '5 meses',
    modality: 'Online',
    price: 'COL$ 3.950.000',
    slug: 'gerencia-comercial-ventas'
  },
  {
    id: 'd3',
    title: 'Diplomado en Finanzas Corporativas',
    description: 'Formación avanzada en gestión financiera, análisis de inversiones y valoración de empresas para la toma de decisiones estratégicas.',
    image: '/colombia/diploma/diplomado.webp',
    startDate: '20 de Agosto 2025',
    duration: '6 meses',
    modality: 'Presencial',
    price: 'COL$ 4.500.000',
    slug: 'finanzas-corporativas'
  }
];