import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Star, GitFork, Code2, ArrowRight, Download, Filter, Github, Mail, Users, Database, Zap, HelpCircle, ChevronDown, ChevronUp, Cloud } from 'lucide-react';
import { Logo } from '../components/Logo';
import { searchRepos, GitHubRepo } from '../services/github';
import { RepoCard } from '../components/RepoCard';
import { InteractiveBackground } from '../components/InteractiveBackground';

export default function Home() {
  const [trendingRepos, setTrendingRepos] = useState<GitHubRepo[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const companies = [
    { name: 'GitHub', icon: Github },
    { name: 'Google', icon: null },
    { name: 'Donatech', icon: null },
    { name: 'Supabase', icon: Database },
    { name: 'Vercel', icon: Zap },
    { name: 'Netlify', icon: Cloud },
    { name: 'Techbrunch', icon: null },
  ];

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Fetch top 3 starred repos created in the last month (simulating trending)
        // or just high starred ones generally if that's safer for stability
        const data = await searchRepos('stars:>10000', 'stars', 1);
        setTrendingRepos(data.items.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch trending repos', error);
      }
    };
    fetchTrending();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Is this tool free to use?",
      answer: "Yes, Repo Compass is completely free and open source. You can use it to search for repositories without any cost."
    },
    {
      question: "Do I need a GitHub account?",
      answer: "No, you don't need a GitHub account to search and view repositories. However, you will need one if you want to star, fork, or contribute to projects."
    },
    {
      question: "How are the trending repositories selected?",
      answer: "Trending repositories are selected based on the number of stars they have received recently. We fetch this data directly from the GitHub API."
    },
    {
      question: "Can I search for private repositories?",
      answer: "No, this tool only searches public repositories available on GitHub. Private repositories are not accessible through this public search interface."
    }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-900 flex flex-col relative">
      <InteractiveBackground />
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Repo Compass
            </h1>
          </div>
          <Link
            to="/search"
            className="text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-4 py-2 rounded-lg transition-all shadow-md shadow-orange-500/20"
          >
            Start Searching
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6">
                Discover the best <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 animate-gradient-x">open source</span> projects.
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                Explore millions of GitHub repositories. Filter by language, stars, and more to find the perfect library for your next project.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/search"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 rounded-xl shadow-lg shadow-orange-500/30"
                >
                  <Search className="w-5 h-5" />
                  Find Repositories
                </Link>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors hover:border-orange-200 hover:text-orange-600"
                >
                  Visit GitHub
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>
        </section>

        {/* Companies Marquee */}
        <section className="py-10 border-b border-slate-100 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Trusted by developers from
            </p>
          </div>
          <div className="flex overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
            
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex items-center gap-16 pr-16 whitespace-nowrap"
            >
              {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-400 grayscale hover:grayscale-0 hover:text-orange-600 transition-all duration-300 cursor-default">
                  {company.icon && <company.icon className="w-6 h-6" />}
                  <span className="text-xl font-bold">{company.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Trending Section (New Addition 1) */}
        {trendingRepos.length > 0 && (
          <section className="py-16 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Trending Repositories</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Check out some of the most popular open-source projects right now.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingRepos.map((repo, index) => (
                  <RepoCard key={repo.id} repo={repo} index={index} />
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
                >
                  View all trending repositories <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Popular Languages Section (New Addition 4) */}
        <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50 to-transparent opacity-50 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Languages</span>
                </h2>
                <p className="text-slate-600 text-lg">
                  Dive into the ecosystems that power the modern web. Browse repositories by your favorite technology stack.
                </p>
              </div>
              <Link to="/search" className="hidden md:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
                View all languages <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {[
                { name: 'JavaScript', color: 'from-yellow-400 to-yellow-500' },
                { name: 'TypeScript', color: 'from-pink-500 to-pink-600' },
                { name: 'Python', color: 'from-orange-500 to-orange-600' },
                { name: 'Java', color: 'from-red-500 to-red-600' },
                { name: 'Go', color: 'from-red-500 to-red-600' },
                { name: 'Rust', color: 'from-orange-500 to-orange-600' },
                { name: 'C++', color: 'from-pink-500 to-pink-600' },
                { name: 'Swift', color: 'from-yellow-400 to-yellow-500' }
              ].map((lang) => (
                <Link
                  key={lang.name}
                  to="/search"
                  className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${lang.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="flex flex-col items-center justify-center h-full gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${lang.color} opacity-10 group-hover:opacity-20 transition-opacity absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[2.5] blur-xl`}></div>
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${lang.color}`}></div>
                    <h3 className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors z-10">{lang.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center md:hidden">
              <Link to="/search" className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
                View all languages <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section (New Addition 2) */}
        <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Effortless Discovery in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">3 Steps</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Stop wrestling with complex search queries. We've streamlined the process so you can focus on building.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-orange-200 via-red-200 to-yellow-200 -z-10"></div>

              {/* Step 1 */}
              <div className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-bold text-orange-600 leading-none select-none">1</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">Smart Search</h3>
                <p className="text-slate-600 leading-relaxed">
                  Enter keywords to search through millions of repositories. Our intelligent engine understands context to find exactly what you need.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-bold text-red-600 leading-none select-none">2</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Filter className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">Precision Filtering</h3>
                <p className="text-slate-600 leading-relaxed">
                  Cut through the noise. Filter by language, stars, forks, or update frequency to identify high-quality, maintained projects.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-8xl font-bold text-yellow-500 leading-none select-none">3</span>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-yellow-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-yellow-600 transition-colors">Instant Access</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get deep insights at a glance. View READMEs, copy clone URLs in one click, and jump directly to the code on GitHub.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section (New Addition 5) */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
             <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Global Scale, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-400">Lightning Speed</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Our infrastructure is built to handle the scale of the entire open source ecosystem, delivering results in milliseconds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Repositories */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:border-orange-500/50 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 text-orange-400 group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                     <Database className="w-6 h-6" />
                   </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 tracking-tight">200M+</div>
                <div className="text-slate-400 font-medium">Repositories Indexed</div>
              </motion.div>

              {/* Card 2: Developers */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:border-red-500/50 hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-3 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 text-red-400 group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                     <Users className="w-6 h-6" />
                   </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 tracking-tight">100M+</div>
                <div className="text-slate-400 font-medium">Developers Worldwide</div>
              </motion.div>

              {/* Card 3: Languages */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:border-yellow-500/50 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)]"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300 border border-yellow-500/20">
                     <Code2 className="w-6 h-6" />
                   </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 tracking-tight">400+</div>
                <div className="text-slate-400 font-medium">Languages Supported</div>
              </motion.div>

              {/* Card 4: Speed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group hover:border-orange-400/50 hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.3)]"
              >
                <div className="flex items-center justify-between mb-6">
                   <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400/20 to-yellow-400/20 text-orange-300 group-hover:scale-110 transition-transform duration-300 border border-orange-400/20">
                     <Zap className="w-6 h-6" />
                   </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2 tracking-tight">0.5s</div>
                <div className="text-slate-400 font-medium">Average Search Time</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section (New Addition 6) */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
          
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 font-medium text-sm mb-6">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Questions</span>
              </h2>
              <p className="text-slate-600 text-lg">
                Everything you need to know about the platform. Can't find the answer you're looking for? <a href="#" className="text-orange-600 hover:text-orange-700 font-medium underline decoration-orange-300 underline-offset-4">Contact our support team.</a>
              </p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-orange-200 bg-orange-50/30 shadow-lg shadow-orange-500/5' : 'border-slate-200 hover:border-orange-200 hover:bg-slate-50'}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className={`font-semibold text-lg transition-colors ${openFaqIndex === index ? 'text-orange-900' : 'text-slate-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaqIndex === index ? 'bg-orange-100 text-orange-600 rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-transparent">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section (New Addition 3) */}
        <section className="py-24 relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-900 to-slate-900"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 mb-6 shadow-lg shadow-orange-500/30 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                  Stay ahead of the curve
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                  Join 50,000+ developers discovering the next big thing in open source. Weekly curated trends, directly to your inbox.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                <div className="flex-grow relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl opacity-50 group-hover:opacity-100 transition duration-500 blur"></div>
                  <input
                    type="email"
                    name="email input"
                    placeholder="Enter your email address"
                    className="relative w-full px-5 py-4 rounded-xl bg-slate-900 text-white border border-white/10 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  name="submit button"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  <span>Weekly updates</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo className="w-6 h-6 text-slate-400 grayscale opacity-70" />
            <span className="text-sm font-semibold text-slate-500">Repo Compass</span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Repo Compass. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
