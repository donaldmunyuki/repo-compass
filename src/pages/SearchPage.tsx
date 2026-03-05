import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { RepoCard } from '../components/RepoCard';
import { FilterBar } from '../components/FilterBar';
import { Pagination } from '../components/Pagination';
import { Logo } from '../components/Logo';
import { searchRepos, GitHubRepo, SearchResult } from '../services/github';
import { Loader2, AlertCircle, Search, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('stars');
  const [language, setLanguage] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (newQuery?: string, newPage?: number, newSort?: string, newLanguage?: string) => {
    const searchQuery = newQuery !== undefined ? newQuery : query;
    const searchPage = newPage !== undefined ? newPage : page;
    const searchSort = newSort !== undefined ? newSort : sort;
    const searchLanguage = newLanguage !== undefined ? newLanguage : language;

    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchRepos(searchQuery, searchSort, searchPage, searchLanguage);
      setRepos(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError('Failed to fetch repositories. Please try again later.');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, [query, page, sort, language]);

  // Trigger search when sort, page, or language changes, but only if we have a query
  useEffect(() => {
    if (hasSearched) {
      handleSearch(query, page, sort, language);
    }
  }, [page, sort, language]);

  const onSearchSubmit = () => {
    setPage(1); // Reset to page 1 on new search
    handleSearch(query, 1, sort, language);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-500 hover:text-orange-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
                Repo Compass
              </h1>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-4">
            Search Repositories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Find exactly what you need with powerful filters.
          </p>
        </div>

        <div className="mb-12">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={onSearchSubmit}
            loading={loading}
          />
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center gap-3 text-red-700 max-w-2xl mx-auto"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <Loader2 className="w-10 h-10 text-orange-600 animate-spin" />
            </motion.div>
          ) : (
            hasSearched && repos.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FilterBar
                  sort={sort}
                  onSortChange={(newSort) => {
                    setSort(newSort);
                    setPage(1); // Reset to page 1 on sort change
                  }}
                  language={language}
                  onLanguageChange={(newLanguage) => {
                    setLanguage(newLanguage);
                    setPage(1); // Reset to page 1 on language change
                  }}
                  totalCount={totalCount}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repos.map((repo, index) => (
                    <RepoCard key={repo.id} repo={repo} index={index} />
                  ))}
                </div>

                <Pagination
                  currentPage={page}
                  totalPages={Math.ceil(totalCount / 12)}
                  onPageChange={setPage}
                />
              </motion.div>
            )
          )}

          {hasSearched && !loading && !error && repos.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">No repositories found</h3>
              <p className="text-slate-500">
                We couldn't find any repositories matching "{query}". Try a different search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Repo Compass. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
