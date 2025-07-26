import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Crown, Gem, Shirt } from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function Fashion() {
  const { data: fashionPosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-4", limit: 12 }],
  });

  const { data: featuredPost } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-4", featured: true, limit: 1 }],
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-gradient-to-br from-rose-gold/20 to-soft-pink/20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="h-8 w-8" />
              <h1 className="text-5xl md:text-6xl font-bold">Fashion & Style</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Elevate your style with the latest fashion trends, accessory guides, 
              and timeless styling tips that complement your beauty routine.
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Gem className="h-5 w-5" />
                <span>25+ Style Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Shirt className="h-5 w-5" />
                <span>Trend Updates</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && featuredPost[0] && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-charcoal mb-4">Featured Style Guide</h2>
              <p className="text-lg text-medium-gray">Stay ahead of the fashion curve</p>
            </motion.div>
            <BlogCard post={featuredPost[0]} variant="featured" className="max-w-4xl mx-auto" />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Posts Grid */}
            <div className="lg:w-2/3">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-charcoal mb-2">All Fashion Content</h2>
                <p className="text-medium-gray">Style inspiration and fashion advice for every occasion</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {fashionPosts?.map((post) => (
                  <motion.div key={post.id} variants={staggerItem}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {fashionPosts?.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Crown className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No fashion posts yet</h3>
                  <p className="text-medium-gray">Check back soon for the latest style guides!</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Style Tips */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Timeless Style Tips</h3>
                  <ul className="space-y-3 text-sm text-medium-gray">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Invest in quality basics that mix and match easily</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Accessorize to transform simple outfits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Choose colors that complement your skin tone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Fit is more important than brand or price</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Build a capsule wardrobe for effortless styling</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Seasonal Trends */}
                <motion.div
                  className="bg-gradient-to-br from-rose-gold/10 to-soft-pink/10 p-6 rounded-2xl border border-rose-gold/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">This Season's Must-Haves</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-rose-gold" />
                      <span>Statement earrings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-rose-gold" />
                      <span>Oversized blazers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-rose-gold" />
                      <span>Layered necklaces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-rose-gold" />
                      <span>Wide-leg trousers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gem className="h-4 w-4 text-rose-gold" />
                      <span>Textured handbags</span>
                    </div>
                  </div>
                </motion.div>

                {/* Popular Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Popular Fashion Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Accessories", "Street Style", "Formal Wear", "Casual Chic", "Jewelry", "Handbags", "Seasonal"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-rose-gold/10 text-rose-gold px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-rose-gold hover:text-white transition-colors"
                      >
                        #{tag}
                      </span>
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
