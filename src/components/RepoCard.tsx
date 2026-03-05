import { GitFork, Star, Eye, Calendar, ExternalLink, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { GitHubRepo } from '../services/github';
import { cn } from '../lib/utils';

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
}

export function RepoCard({ repo, index }: RepoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(repo.html_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative bg-white border border-slate-200 rounded-xl p-5 hover:border-orange-500/50 hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-8 h-8 rounded-full border border-slate-100"
            referrerPolicy="no-referrer"
          />
          <div>
            <a
              href={repo.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-orange-600 transition-colors"
            >
              {repo.owner.login}
            </a>
            <h3 className="font-semibold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                {repo.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </h3>
          </div>
        </div>
        
        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-slate-50 rounded-md transition-colors"
          title="Copy repository URL"
          aria-label="Copy repository URL"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
        {repo.description || "No description provided."}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(repo.topics || []).slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-0.5 text-xs font-medium bg-slate-50 text-slate-600 rounded-full border border-slate-100"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1" title="Stars">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{repo.stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title="Forks">
            <GitFork className="w-3.5 h-3.5" />
            <span>{repo.forks_count.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="font-medium text-slate-600">{repo.language}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
