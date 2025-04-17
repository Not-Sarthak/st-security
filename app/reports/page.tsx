'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS, EMAIL } from '../data';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 10, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    }
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 15 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.04,
      duration: 0.5,
      ease: [0.17, 0.67, 0.83, 0.97],
    }
  }),
  exit: { 
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1],
    }
  },
};

export default function Reports() {
  // Add transition API for smoother React state updates
  const [isPending, startTransition] = useTransition();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filterYear, setFilterYear] = useState('');
  const [filterAmount, setFilterAmount] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const ITEMS_PER_PAGE = 10;
  
  // Get unique years from data
  const YEARS = useMemo(() => {
    return Array.from(
      new Set(BLOG_POSTS.map((post) => post.date.split('-')[0]))
    ).sort((a, b) => Number(b) - Number(a));
  }, []);
  
  // Define amount filters
  const AMOUNT_FILTERS = [
    { label: 'All', value: '' },
    { label: '> $100M', value: '100m+' },
    { label: '$10M - $100M', value: '10m-100m' },
    { label: '$1M - $10M', value: '1m-10m' },
    { label: '< $1M', value: 'under1m' },
    { label: 'Unknown', value: 'unknown' },
  ];

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...BLOG_POSTS];
    
    // Apply year filter
    if (filterYear) {
      filtered = filtered.filter(post => post.date.startsWith(filterYear));
    }
    
    // Apply amount filter
    if (filterAmount) {
      const numericValue = (value: string | number) => {
        if (typeof value === 'number') return value;
        if (value === '-' || !value) return 0;
        
        // Extract numeric part (e.g. "$10 Million" -> 10)
        const match = String(value).match(/(\d+(?:\.\d+)?)/);
        const num = match ? parseFloat(match[0]) : 0;
        
        // Scale based on unit
        if (String(value).toLowerCase().includes('billion')) return num * 1000;
        if (String(value).toLowerCase().includes('million')) return num;
        if (String(value).toLowerCase().includes('k')) return num / 1000;
        
        return num;
      };
      
      filtered = filtered.filter(post => {
        const amount = numericValue(post.stolen);
        
        switch(filterAmount) {
          case '100m+': return amount >= 100;
          case '10m-100m': return amount >= 10 && amount < 100;
          case '1m-10m': return amount >= 1 && amount < 10;
          case 'under1m': return amount > 0 && amount < 1;
          case 'unknown': return amount === 0 || post.stolen === '-';
          default: return true;
        }
      });
    }
    
    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  }, [filterYear, filterAmount, sortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle page change with a transition
  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
      // Scroll back to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    startTransition(() => {
      setFilterYear('');
      setFilterAmount('');
      setSortOrder('newest');
      setCurrentPage(1);
    });
  };

  return (
    <>
      <motion.main
        className="space-y-8 max-w-4xl mx-auto px-4"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section
          variants={VARIANTS_SECTION}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-6"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              >
                <span>Filter</span>
                <ChevronDown 
                  className={`w-4 h-4 ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {(filterYear || filterAmount !== '' || sortOrder !== 'newest') && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center text-sm">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isPending}
                  className="px-2 py-1 text-zinc-500 dark:text-zinc-400 disabled:opacity-30"
                >
                  ←
                </button>
                <span className="text-zinc-600 dark:text-zinc-400 px-2">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || isPending}
                  className="px-2 py-1 text-zinc-500 dark:text-zinc-400 disabled:opacity-30"
                >
                  →
                </button>
              </div>
            )}
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-4"
              >
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-lg space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Year</label>
                      <select
                        value={filterYear}
                        onChange={(e) => {
                          startTransition(() => {
                            setFilterYear(e.target.value);
                            setCurrentPage(1);
                          });
                        }}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      >
                        <option value="">All years</option>
                        {YEARS.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Amount</label>
                      <select
                        value={filterAmount}
                        onChange={(e) => {
                          startTransition(() => {
                            setFilterAmount(e.target.value);
                            setCurrentPage(1);
                          });
                        }}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      >
                        {AMOUNT_FILTERS.map((filter) => (
                          <option key={filter.value} value={filter.value}>
                            {filter.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-zinc-500 mb-1">Sort</label>
                      <select
                        value={sortOrder}
                        onChange={(e) => {
                          startTransition(() => {
                            setSortOrder(e.target.value);
                            setCurrentPage(1);
                          });
                        }}
                        className="w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                      >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </div>
                  </div>
                  
                  {(filterYear || filterAmount !== '' || sortOrder !== 'newest') && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 mt-3">
                      {filterYear && (
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-700 dark:text-zinc-300">
                          <span>Year: {filterYear}</span>
                          <button 
                            onClick={() => startTransition(() => setFilterYear(''))}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      
                      {filterAmount && (
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-700 dark:text-zinc-300">
                          <span>
                            Amount: {AMOUNT_FILTERS.find(f => f.value === filterAmount)?.label}
                          </span>
                          <button 
                            onClick={() => startTransition(() => setFilterAmount(''))}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      
                      {sortOrder !== 'newest' && (
                        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs text-zinc-700 dark:text-zinc-300">
                          <span>Sort: Oldest first</span>
                          <button 
                            onClick={() => startTransition(() => setSortOrder('newest'))}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <motion.div 
              className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {paginatedPosts.length > 0 ? (
                  <motion.div
                    key={`page-${currentPage}-${filterYear}-${filterAmount}-${sortOrder}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {paginatedPosts.map((post, index) => (
                      <motion.div
                        key={post.uid}
                        custom={index}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layoutId={post.uid}
                      >
                        <Link
                          className="block w-full transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
                          href={post.link}
                          data-id={post.uid}
                        >
                          <div className="p-4">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                  <h4 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                                    {post.title}
                                  </h4>
                                  <div className="inline-flex items-center">
                                    <span className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                      {post.category}
                                    </span>
                                  </div>
                                </div>
                                
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                  {post.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                                  {post.auditedBy && (
                                    <span className="flex items-center">
                                      <span className="font-medium mr-1">Audited by:</span> 
                                      {post.auditedBy !== '-' ? post.auditedBy : '-'}
                                    </span>
                                  )}
                                  
                                  {post.writtenBy && (
                                    <span className="flex items-center">
                                      <span className="font-medium mr-1">Written by:</span> 
                                      {post.writtenBy}
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex flex-row md:flex-col items-start md:items-end gap-3 md:gap-1.5 text-sm">
                                <time className="text-zinc-500 dark:text-zinc-400">
                                  {post.date}
                                </time>
                                <span className="text-red-600 dark:text-red-400 font-medium">
                                  {post.stolen && post.stolen !== '-' ? post.stolen : '-'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    No reports match your filters
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {totalPages > 1 && (
            <div className="md:hidden flex justify-center mt-6">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isPending}
                  className={`px-3 py-1.5 rounded-md text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-all duration-300 ease-out ${
                    isPending ? 'animate-pulse' : ''
                  }`}
                >
                  Previous
                </button>
                
                <div className="text-sm text-zinc-600 dark:text-zinc-400 px-2">
                  {currentPage} / {totalPages}
                </div>
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || isPending}
                  className={`px-3 py-1.5 rounded-md text-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-all duration-300 ease-out ${
                    isPending ? 'animate-pulse' : ''
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.section>

        <motion.section
          variants={VARIANTS_SECTION}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <h3 className="text-lg font-medium mb-3">Connect</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Proudly Built by{' '}
            <a
              className="underline text-zinc-800 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
              href={`mailto:${EMAIL}`}
            >
              {EMAIL}
            </a>
          </p>
        </motion.section>
      </motion.main>
    </>
  );
}
