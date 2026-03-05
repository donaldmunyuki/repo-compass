import { Search } from 'lucide-react';
import { cn } from '../lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export function SearchBar({ value, onChange, onSubmit, loading }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          type="text"
          className={cn(
            "block w-full px-11 py-4 bg-white border border-slate-200 rounded-xl",
            "text-slate-900 placeholder-slate-400 font-medium text-center",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-orange-500",
            "shadow-sm transition-all duration-200",
            loading && "opacity-80"
          )}
          placeholder="Search repositories..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-slate-400 bg-slate-50 border border-slate-200 rounded-md">
            Press Enter
          </kbd>
        </div>
      </div>
    </div>
  );
}
