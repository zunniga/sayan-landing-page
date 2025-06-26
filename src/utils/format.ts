import { format } from "date-fns"
import { es } from "date-fns/locale"

// Tasa de conversión fija COP -> USD
const COP_TO_USD_RATE = 0.00025; // 1 COP = 0.00025 USD

/**
 * Formatea una cantidad monetaria según el código de país
 * @param amount - Cantidad a formatear (string o number) - SIEMPRE EN COP desde la API
 * @param countryCode - Código del país (pe, co, es)
 * @returns String formateado con la moneda correspondiente
 */
export function formatCurrency(amount: string | number, countryCode: string): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return '0';
  }

  const lowerCountryCode = countryCode.toLowerCase();

  switch (lowerCountryCode) {
    case 'pe':
      // Perú: 195.99 -> "195.99 PEN" (normal, sin superíndice)
      return `${numericAmount.toLocaleString('es-PE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} PEN`;

    case 'co':
      // Colombia: 1250000 -> "1.250.000 COP" (sin decimales)
      return `${Math.floor(numericAmount).toLocaleString('es-CO')} COP`;

    case 'es':
      // Internacional: COP -> USD
      const usdAmount = numericAmount * COP_TO_USD_RATE;
      return `${usdAmount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} USD`;

    default:
      // Fallback a Colombia
      return `${Math.floor(numericAmount).toLocaleString('es-CO')} COP`;
  }
}

/**
 * Formatea precio dividido en cuotas para DIPLOMADOS (precio total / 5)
 * @param amount - Cantidad a formatear (string o number) - SIEMPRE EN COP desde la API
 * @param countryCode - Código del país (pe, co, es)
 * @returns Objeto con precio por cuota y información de cuotas
 */
export function formatCurrencyInstallment(amount: string | number, countryCode: string): {
  installmentPrice: string;
  totalPrice: string;
  installmentText: string;
  currency: string;
} {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return {
      installmentPrice: '0',
      totalPrice: '0',
      installmentText: 'x5 Cuotas',
      currency: 'COP'
    };
  }

  const lowerCountryCode = countryCode.toLowerCase();
  const installmentAmount = numericAmount / 5; // Dividir entre 5 cuotas para diplomados

  switch (lowerCountryCode) {
    case 'pe':
      return {
        installmentPrice: `${installmentAmount.toLocaleString('es-PE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })} PEN`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x5 Cuotas',
        currency: 'PEN'
      };

    case 'co':
      return {
        installmentPrice: `${Math.floor(installmentAmount).toLocaleString('es-CO')} COP`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x5 Cuotas',
        currency: 'COP'
      };

    case 'es':
      const usdAmount = numericAmount * COP_TO_USD_RATE;
      const usdInstallment = usdAmount / 5;
      return {
        installmentPrice: `${usdInstallment.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })} USD`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x5 Cuotas',
        currency: 'USD'
      };

    default:
      return {
        installmentPrice: `${Math.floor(installmentAmount).toLocaleString('es-CO')} COP`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x5 Cuotas',
        currency: 'COP'
      };
  }
}

/**
 * Formatea precio dividido en cuotas para CURSOS (precio total / 2)
 * @param amount - Cantidad a formatear (string o number) - SIEMPRE EN COP desde la API
 * @param countryCode - Código del país (pe, co, es)
 * @returns Objeto con precio por cuota y información de cuotas
 */
export function formatCurrencyInstallmentCourse(amount: string | number, countryCode: string): {
  installmentPrice: string;
  totalPrice: string;
  installmentText: string;
  currency: string;
} {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return {
      installmentPrice: '0',
      totalPrice: '0',
      installmentText: 'x2 Cuotas',
      currency: 'COP'
    };
  }

  const lowerCountryCode = countryCode.toLowerCase();
  const installmentAmount = numericAmount / 2; // Dividir entre 2 cuotas para cursos

  switch (lowerCountryCode) {
    case 'pe':
      return {
        installmentPrice: `${installmentAmount.toLocaleString('es-PE', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })} PEN`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x2 Cuotas',
        currency: 'PEN'
      };

    case 'co':
      return {
        installmentPrice: `${Math.floor(installmentAmount).toLocaleString('es-CO')} COP`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x2 Cuotas',
        currency: 'COP'
      };

    case 'es':
      const usdAmount = numericAmount * COP_TO_USD_RATE;
      const usdInstallment = usdAmount / 2;
      return {
        installmentPrice: `${usdInstallment.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })} USD`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x2 Cuotas',
        currency: 'USD'
      };

    default:
      return {
        installmentPrice: `${Math.floor(installmentAmount).toLocaleString('es-CO')} COP`,
        totalPrice: formatCurrency(amount, countryCode),
        installmentText: 'x2 Cuotas',
        currency: 'COP'
      };
  }
}

/**
 * Formatea una fecha en el formato "dd de mmm de yyyy"
 * @param date - Fecha a formatear (Date o string)
 * @returns String con la fecha formateada
 */
export function formatDate(date: Date | string): string {
    return format(
        new Date(
        new Date(date).getUTCFullYear(), 
        new Date(date).getUTCMonth(), 
        new Date(date).getUTCDate()
        ), 
        "dd 'de' MMMM 'de' yyyy", 
        { locale: es }
    );
}

/**
 * Formatea un código de certificado eliminando el prefijo "C" si existe
 * @param code - Código del certificado
 * @returns Código formateado sin el prefijo "C"
 */
export function formatCertificateCode(code: string): string {
  if (!code) return "N/A";
  
  // Si el código empieza con "C", quitarlo
  if (code.startsWith('S') || code.startsWith('s')) {
    return code.substring(1);
  }
  
  return code;
}

/**
 * Agrega el prefijo "C" al código del certificado si no lo tiene
 * @param code - Código del certificado
 * @returns Código con el prefijo "C" agregado si es necesario
 */
export function addCodePrefix(code: string): string {
  if (!code) return code;

  // Si el código NO empieza con "S", agregarlo para la API
  if (!code.startsWith('S') && !code.startsWith('s')) {
    return `S${code}`;
  }
  
  return code;
}