import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, SortAsc, Calendar, Eye, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BlogCard from "@/components/blog/blog-card";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory, Category } from "@shared/schema";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Get query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      setSearchQuery(query);
      setDebouncedQuery(query);
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: searchResults, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/search", debouncedQuery],
    enabled: debouncedQuery.length > 0,
  });

  const { data: allPosts } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { limit: 20 }],
    enabled: debouncedQuery.length === 0,
  });

  // Filter and sort results
  const processedResults = (() => {
    let results = debouncedQuery.length > 0 ? (searchResults || []) : (allPosts || []);

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter(post => post.category.slug === selectedCategory);
    }

    // Sort results
    switch (sortBy) {
      case "popular":
        results = [...results].sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "recent":
        results = [...results].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "comments":
        results = [...results].sort((a, b) => b.commentsCount - a.commentsCount);
        break;
      default:
        break;
    }

    return results;
  })();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    const url = new URL(window.location.href);
    if (searchQuery.trim()) {
      url.searchParams.set("q", searchQuery.trim());
    } else {
      url.searchParams.delete("q");
    }
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="pt-16">
      {/* Search Header */}
      <section className="py-16 bg-gradient-to-br from-rose-gold/10 to-soft-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              Search <span className="gradient-text">Beauty Content</span>
            </h1>
            <p className="text-lg text-medium-gray mb-8">
              Find tutorials, reviews, and tips from our extensive beauty library
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-medium-gray h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for beauty tips, tutorials, products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                />
              </div>
              <Button
                type="submit"
                className="mt-4 bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-3 rounded-full"
              >
                Search
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Filters */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-medium-gray" />
                  <span className="text-sm font-medium text-charcoal">Filters:</span>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="comments">Most Commented</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              {/* Results Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal">
                      {debouncedQuery ? `Search Results for "${debouncedQuery}"` : "All Articles"}
                    </h2>
                    <p className="text-medium-gray mt-1">
                      {processedResults.length} {processedResults.length === 1 ? "article" : "articles"} found
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-medium-gray">
                    <SortAsc className="h-4 w-4" />
                    <span>Sorted by {sortBy === "recent" ? "recent" : sortBy === "popular" ? "popularity" : "comments"}</span>
                  </div>
                </div>
              </motion.div>

              {/* Results Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : processedResults.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {processedResults.map((post, index) => (
                    <motion.div key={post.id} variants={staggerItem}>
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No results found</h3>
                  <p className="text-medium-gray mb-8">
                    {debouncedQuery 
                      ? `No articles found for "${debouncedQuery}". Try different keywords or browse our categories.`
                      : "Try searching for beauty tips, tutorials, or product names."
                    }
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="text-sm text-medium-gray mr-2">Popular searches:</span>
                    {["makeup", "skincare", "foundation", "eyeshadow", "routine"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="bg-rose-gold/10 text-rose-gold px-3 py-1 rounded-full text-sm hover:bg-rose-gold hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Search Tips */}
                <motion.div
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Search Tips</h3>
                  <ul className="space-y-2 text-sm text-medium-gray">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use specific keywords like "winged eyeliner" or "dry skin routine"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Filter by category to narrow down your results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sort by popularity to find our most loved content</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Popular Categories */}
                <motion.div
                  className="bg-white border rounded-2xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Browse by Category</h3>
                  <div className="space-y-2">
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.slug)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.slug
                            ? "bg-rose-gold text-white"
                            : "hover:bg-gray-100 text-medium-gray"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
