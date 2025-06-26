import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function ErrorModal({ isOpen, onClose, message }: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-[#1A202C] rounded-3xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50/50 dark:bg-red-900/10 flex items-center justify-center mb-4 border border-red-100 dark:border-red-800/30">
            <AlertCircle className="w-10 h-10 text-red-500/80 dark:text-red-400/80" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Error en la búsqueda
          </DialogTitle>
          <p className="text-center text-gray-600 dark:text-gray-400 max-w-xs mx-auto">{message}</p>
        </DialogHeader>
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 shadow-sm hover:shadow"
          >
            Entendido
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}