import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { countryOptions } from '@/config/countries';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface CountrySwitcherProps {
  currentCountryCode: string;
  size?: 'sm' | 'default';
  fullWidth?: boolean;
}

/**
 * Componente para cambiar entre países, conservando la ruta actual
 */
export function CountrySwitcher({ 
  currentCountryCode, 
  size = 'default', 
  fullWidth = false 
}: CountrySwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determinar el país actual
  const currentCountry = countryOptions.find(c => c.value === currentCountryCode);
  
  // Obtener la parte de la ruta después del código del país
  const getRouteSuffix = () => {
    for (const country of countryOptions) {
      if (pathname.startsWith(`/${country.value}`)) {
        // Si estamos en la página principal del país
        if (pathname === `/${country.value}`) {
          return '';
        }
        // Si estamos en una subpágina
        return pathname.replace(`/${country.value}`, '');
      }
    }
    return ''; // Si no hay coincidencia, volver a la ruta principal
  };
  
  // Cambiar el país manteniendo la sección actual
  const handleCountryChange = (countryCode: string) => {
    const routeSuffix = getRouteSuffix();
    router.push(`/${countryCode}${routeSuffix}`);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={size === 'sm' ? 'sm' : 'default'} 
          className={`h-9 gap-1 ${fullWidth ? 'w-full' : ''}`}
        >
          {currentCountry && (
            <>
              <Image 
                src={currentCountry.flag} 
                alt={currentCountry.label} 
                width={16} 
                height={12} 
                className="mr-1"
              />
              <span>{currentCountry.label}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {countryOptions.map((option) => (
          <DropdownMenuItem 
            key={option.value} 
            onClick={() => handleCountryChange(option.value)}
            className="cursor-pointer flex items-center gap-2"
          >
            <Image 
              src={option.flag} 
              alt={option.label} 
              width={16} 
              height={12} 
            />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
