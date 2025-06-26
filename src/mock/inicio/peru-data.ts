// Mock data para la página principal de Perú

import type { StatItem } from '@/components/sections/inicio/stats';

export const heroSlidesPE = [
  {
    id: '1',
    title: 'Formación académica para el mundo profesional',
    subtitle: 'Programas de alta calidad',
    description: 'Capacitación especializada para profesionales que buscan destacarse en un mercado laboral cada vez más competitivo.',
    image: '/peru/hero/hero-peru-1.jpg',
    ctaText: 'Explorar cursos',
    ctaLink: '/pe/cursos'
  },
  {
    id: '2',
    title: 'Diplomados avalados internacionalmente',
    subtitle: 'Certificaciones con reconocimiento global',
    description: 'Nuestros programas cuentan con el respaldo de instituciones educativas de prestigio internacional.',
    image: '/peru/hero/hero-peru-1.jpg',
    ctaText: 'Ver diplomados',
    ctaLink: '/pe/diplomados'
  },
  {
    id: '3',
    title: 'Metodología práctica e innovadora',
    subtitle: 'Aprende con casos reales',
    description: 'Enfoque práctico que combina la teoría con ejercicios basados en situaciones del mundo real.',
    image: '/peru/hero/hero-peru-1.jpg',
    ctaText: 'Conocer más',
    ctaLink: '/pe/nosotros'
  }
];

export const featuredCoursesPE = [
  {
    id: 'c1',
    title: 'Gestión Estratégica de Recursos Humanos',
    description: 'Aprende a desarrollar estrategias efectivas para la gestión del talento humano en organizaciones modernas.',
    image: '/peru/course/diplomado.webp',
    category: 'Gestión',
    duration: '8 semanas',
    students: 350,
    modules: 6,
    price: 'S/ 590.00',
    slug: 'gestion-estrategica-recursos-humanos'
  },
  {
    id: 'c2',
    title: 'Marketing Digital Aplicado',
    description: 'Domina las herramientas y estrategias del marketing digital para impulsar negocios y marcas en el entorno online.',
    image: '/peru/course/diplomado.webp',
    category: 'Marketing',
    duration: '6 semanas',
    students: 420,
    modules: 5,
    price: 'S/ 520.00',
    slug: 'marketing-digital-aplicado'
  },
  {
    id: 'c3',
    title: 'Finanzas para No Financieros',
    description: 'Curso práctico para comprender los conceptos financieros clave sin necesidad de experiencia previa en el área.',
    image: '/peru/course/diplomado.webp',
    category: 'Finanzas',
    duration: '5 semanas',
    students: 280,
    modules: 4,
    price: 'S/ 450.00',
    slug: 'finanzas-no-financieros'
  }
];

export const testimonialsPE = [
  {
    id: 't1',
    name: 'Carlos Mendoza',
    role: 'Director de Marketing',
    company: 'Grupo Romero',
    avatar: '/peru/testimonial/equipo1.jpg',
    comment: 'El diplomado en Marketing Digital superó mis expectativas. El contenido práctico y los instructores expertos me permitieron implementar estrategias efectivas en mi empresa de inmediato.',
    rating: 5
  },
  {
    id: 't2',
    name: 'María Luisa Vargas',
    role: 'Gerente de RRHH',
    company: 'Interbank',
    avatar: '/peru/testimonial/equipo1.jpg',
    comment: 'CIMADE ofrece una formación de primer nivel. Los conocimientos adquiridos en el curso de Gestión del Talento han sido fundamentales para mi desarrollo profesional.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Javier Rodríguez',
    role: 'Emprendedor',
    company: 'StartUp Peru',
    avatar: '/peru/testimonial/equipo1.jpg',
    comment: 'El programa de Finanzas para Emprendedores me dio las herramientas que necesitaba para hacer crecer mi negocio. Ahora entiendo mucho mejor cómo manejar el aspecto financiero.',
    rating: 4
  },
  {
    id: 't4',
    name: 'Ana Torres',
    role: 'Consultora de Proyectos',
    company: 'Consultora ABC',
    avatar: '/peru/testimonial/equipo1.jpg',
    comment: 'Los cursos de CIMADE son muy completos y están actualizados con las últimas tendencias del mercado. Recomiendo ampliamente su formación.',
    rating: 5
  }
];

export const statsPE: StatItem[] = [
  {
    id: 'stat1',
    value: 10500,
    label: 'Estudiantes graduados',
    icon: 'students',
    suffix: '+'
  },
  {
    id: 'stat2',
    value: 45,
    label: 'Cursos especializados',
    icon: 'courses'
  },
  {
    id: 'stat3',
    value: 12000,
    label: 'Certificados emitidos',
    icon: 'certificates',
    suffix: '+'
  },
  {
    id: 'stat4',
    value: 97,
    label: 'Satisfacción de alumnos',
    icon: 'students',
    suffix: '%'
  }
];

export const featuredDiplomasPE = [
  {
    id: 'd1',
    title: 'Diploma de Especialización en Gestión Pública',
    description: 'Programa intensivo para profesionales que buscan desarrollar competencias en la administración y gestión eficiente de recursos públicos.',
    image: '/peru/diploma/diplomado.webp',
    startDate: '15 de Junio 2025',
    duration: '6 meses',
    modality: 'Híbrida',
    price: 'S/ 2,900.00',
    slug: 'especializacion-gestion-publica',
    featured: true
  },
  {
    id: 'd2',
    title: 'Diploma en Gestión de Proyectos (PMI)',
    description: 'Formación especializada en metodologías y estándares del Project Management Institute para la dirección efectiva de proyectos.',
    image: '/peru/diploma/diplomado.webp',
    startDate: '20 de Julio 2025',
    duration: '5 meses',
    modality: 'Online',
    price: 'S/ 2,450.00',
    slug: 'gestion-proyectos-pmi'
  },
  {
    id: 'd3',
    title: 'Diploma en Transformación Digital Empresarial',
    description: 'Programa diseñado para desarrollar competencias en la implementación de estrategias de transformación digital en organizaciones.',
    image: '/peru/diploma/diplomado.webp',
    startDate: '10 de Agosto 2025',
    duration: '4 meses',
    modality: 'Online',
    price: 'S/ 2,200.00',
    slug: 'transformacion-digital-empresarial'
  }
];