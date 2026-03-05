import { cn } from '../lib/utils';
import { ArrowDownUp, Filter, Code2 } from 'lucide-react';

interface FilterBarProps {
  sort: string;
  onSortChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  totalCount?: number;
}

export function FilterBar({ sort, onSortChange, language, onLanguageChange, totalCount }: FilterBarProps) {
  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'c++', label: 'C++' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'php', label: 'PHP' },
    { value: 'swift', label: 'Swift' },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-4 border-b border-slate-200/60 mb-6 lg:flex-row lg:justify-between">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {totalCount !== undefined && (
          <>
            <span className="font-semibold text-slate-900">{totalCount.toLocaleString()}</span>
            <span>repositories found</span>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="language" className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Code2 className="w-3 h-3" /> Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="text-sm font-medium text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-orange-600 transition-colors pr-8"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <ArrowDownUp className="w-3 h-3" /> Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-sm font-medium text-slate-700 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-orange-600 transition-colors pr-8"
          >
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
