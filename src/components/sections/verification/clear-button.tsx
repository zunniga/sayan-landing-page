"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ClearButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export function ClearButton({ onClick, disabled }: ClearButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="h-12 px-8 rounded-xl flex-1
               bg-transparent
               border border-primary dark:border-primary
               text-primary dark:text-primary
               hover:bg-primary/10 dark:hover:bg-[#40E7F8]/10
               hover:border-primary dark:hover:border-primary
               transition-all duration-300
               disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center justify-center gap-2 font-medium"
    >
      <>
        <X className="w-5 h-5" />
        <span>Limpiar</span>
      </>
    </Button>
  );
}
