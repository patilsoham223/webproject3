import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import type { PostWithAuthorAndCategory } from "@shared/schema";

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/search", query],
    enabled: query.length > 2,
    staleTime: 30000,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 2);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-medium-gray h-4 w-4" />
        <Input
          type="search"
          placeholder="Search beauty tips..."
          value={query}
          onChange={handleInputChange}
          className="w-64 pl-10 pr-10 rounded-full border-gray-200 focus:ring-2 focus:ring-rose-gold focus:border-transparent"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            {isLoading && (
              <div className="p-4 text-center text-medium-gray">
                Searching...
              </div>
            )}

            {searchResults && searchResults.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-medium-gray px-3 py-2 border-b">
                  Search Results
                </div>
                {searchResults.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.slug}`}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    {post.featuredImage && (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-charcoal truncate">
                        {post.title}
                      </h4>
                      <p className="text-xs text-medium-gray mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-medium-gray">
                        <span
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ backgroundColor: `${post.category.color}20`, color: post.category.color }}
                        >
                          {post.category.name}
                        </span>
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {searchResults.length > 5 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    className="block text-center p-3 text-sm text-rose-gold hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    View all {searchResults.length} results
                  </Link>
                )}
              </div>
            )}

            {searchResults && searchResults.length === 0 && !isLoading && (
              <div className="p-4 text-center text-medium-gray">
                No results found for "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
