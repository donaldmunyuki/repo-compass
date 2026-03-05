import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // GitHub API limits search results to first 1000 items
  // With 12 items per page, that's roughly 83 pages max
  const maxPages = Math.min(totalPages, 83);
  
  if (maxPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600"
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <span className="text-sm font-medium text-slate-600 px-4">
        Page <span className="text-slate-900">{currentPage}</span> of <span className="text-slate-900">{maxPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= maxPages}
        className={cn(
          "p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600"
        )}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
