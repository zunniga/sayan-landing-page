import { Loader2, AlertCircle } from "lucide-react";

interface SearchStatusProps {
  loading?: boolean;
  error?: string;
}

export function SearchStatus({ loading, error }: SearchStatusProps) {
  if (!loading && !error) return null;

  return (
    <div className="mt-6 flex justify-center items-center">
      {loading ? (
        <div className="flex items-center space-x-2 text-primary dark:text-primary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Buscando certificados...</span>
        </div>
      ) : error ? (
        <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          <span className="text-sm font-medium text-red-600 dark:text-red-400">{error}</span>
        </div>
      ) : null}
    </div>
  );
}