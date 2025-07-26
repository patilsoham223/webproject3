import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Scissors, Wind, Sparkles } from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function HairCare() {
  const { data: haircarePosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-3", limit: 12 }],
  });

  const { data: featuredPost } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-3", featured: true, limit: 1 }],
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
        className="relative py-24 bg-gradient-to-br from-soft-pink/20 to-rose-gold/20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-soft-pink/90 to-rose-gold/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scissors className="h-8 w-8" />
              <h1 className="text-5xl md:text-6xl font-bold">Hair Care Central</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              From styling techniques to healthy hair treatments, discover everything 
              you need for gorgeous, healthy hair that turns heads.
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5" />
                <span>29+ Tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span>All Hair Types</span>
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
              <h2 className="text-3xl font-bold text-charcoal mb-4">Featured Hair Tutorial</h2>
              <p className="text-lg text-medium-gray">Master the art of gorgeous hair styling</p>
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
                <h2 className="text-2xl font-bold text-charcoal mb-2">All Hair Care Content</h2>
                <p className="text-medium-gray">Professional techniques for healthy, beautiful hair</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {haircarePosts?.map((post) => (
                  <motion.div key={post.id} variants={staggerItem}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {haircarePosts?.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Scissors className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No hair care posts yet</h3>
                  <p className="text-medium-gray">Check back soon for amazing hair tutorials!</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Hair Care Tips */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Hair Care Essentials</h3>
                  <ul className="space-y-3 text-sm text-medium-gray">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use a wide-tooth comb on wet hair to prevent breakage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></span>
                      <span>Apply heat protectant before using hot tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></span>
                      <span>Deep condition weekly for healthy, shiny hair</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></span>
                      <span>Trim every 6-8 weeks to prevent split ends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></span>
                      <span>Sleep on silk pillowcases to reduce friction</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Hair Types Guide */}
                <motion.div
                  className="bg-gradient-to-br from-soft-pink/10 to-rose-gold/10 p-6 rounded-2xl border border-soft-pink/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Know Your Hair Type</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">Type 1:</span>
                      <span className="text-medium-gray">Straight</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type 2:</span>
                      <span className="text-medium-gray">Wavy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type 3:</span>
                      <span className="text-medium-gray">Curly</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Type 4:</span>
                      <span className="text-medium-gray">Coily</span>
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
                  <h3 className="text-lg font-bold text-charcoal mb-4">Popular Hair Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Curly Hair", "Straight Hair", "Hair Loss", "Color Care", "Heat Styling", "Natural Hair", "Hair Growth"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-soft-pink/10 text-soft-pink px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-soft-pink hover:text-white transition-colors"
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
