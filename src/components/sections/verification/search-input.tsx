"use client";

import { AlertCircle } from "lucide-react";
import { InputHTMLAttributes } from 'react';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
}

export function SearchInput({ 
  error, 
  className = '', 
  ...props 
}: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <input
        {...props}
        className={`w-full h-12 px-6 rounded-2xl bg-gray-50 dark:bg-zinc-900/50
          border border-gray-400 dark:border-gray-600 
          placeholder-slate-400 dark:placeholder-slate-500
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          text-slate-700 dark:text-slate-200 text-base 
          transition-all duration-300 text-center
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:ring-red-500 pr-10 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]' : ''}
          ${className}`}
      />
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500/80">
          <AlertCircle className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}