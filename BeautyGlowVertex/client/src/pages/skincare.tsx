import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart, Droplets, Shield } from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function Skincare() {
  const { data: skincarePosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-2", limit: 12 }],
  });

  const { data: featuredPost } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-2", featured: true, limit: 1 }],
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
        className="relative py-24 bg-gradient-to-br from-teal-accent/20 to-blue-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-accent/90 to-blue-600/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="h-8 w-8" />
              <h1 className="text-5xl md:text-6xl font-bold">Skincare Science</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Discover the science behind healthy skin. From ingredient breakdowns to 
              routine building, achieve your best skin with expert guidance.
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                <span>38+ Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Science-Based</span>
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
              <h2 className="text-3xl font-bold text-charcoal mb-4">Featured Skincare Guide</h2>
              <p className="text-lg text-medium-gray">Expert advice for your skin health journey</p>
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
                <h2 className="text-2xl font-bold text-charcoal mb-2">All Skincare Content</h2>
                <p className="text-medium-gray">Science-backed advice for healthy, glowing skin</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {skincarePosts?.map((post) => (
                  <motion.div key={post.id} variants={staggerItem}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {skincarePosts?.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No skincare posts yet</h3>
                  <p className="text-medium-gray">Check back soon for expert skincare advice!</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Skincare Routine Steps */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Basic Skincare Routine</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-accent text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-sm">Cleanse</h4>
                        <p className="text-xs text-medium-gray">Remove dirt and makeup</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-accent text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-sm">Tone</h4>
                        <p className="text-xs text-medium-gray">Balance pH and prep skin</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-accent text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-sm">Treat</h4>
                        <p className="text-xs text-medium-gray">Apply serums and treatments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-accent text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                      <div>
                        <h4 className="font-semibold text-sm">Moisturize</h4>
                        <p className="text-xs text-medium-gray">Lock in hydration</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-teal-accent text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
                      <div>
                        <h4 className="font-semibold text-sm">Protect</h4>
                        <p className="text-xs text-medium-gray">Apply SPF during the day</p>
                      </div>
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
                  <h3 className="text-lg font-bold text-charcoal mb-4">Popular Skincare Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Hydration", "Anti-Aging", "Acne", "Sensitive Skin", "Vitamin C", "Retinol", "SPF"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-teal-accent/10 text-teal-accent px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-teal-accent hover:text-white transition-colors"
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
