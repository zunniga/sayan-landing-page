"use client";

import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface SearchButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SearchButton({ 
  onClick, 
  disabled, 
  loading 
}: SearchButtonProps) {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled || loading}
      className="h-12 px-8 rounded-xl flex-1
               bg-primary dark:bg-primary
               hover:opacity-90 text-white dark:text-black
               shadow-lg shadow-primary/20 dark:shadow-primary/20
               transition-all duration-300
               hover:-translate-y-0.5 hover:shadow-xl
               disabled:opacity-50 disabled:cursor-not-allowed
               disabled:hover:translate-y-0 disabled:hover:shadow-lg
               relative overflow-hidden
               flex items-center justify-center gap-2 font-medium"
    >
      <span className="absolute inset-0 bg-white/20 dark:bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Buscando...</span>
        </>
      ) : (
        <>
          <Search className="w-5 h-5" />
          <span>Buscar</span>
        </>
      )}
    </Button>
  );
}