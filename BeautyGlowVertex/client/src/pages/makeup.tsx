import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Palette, TrendingUp, Star } from "lucide-react";
import BlogCard from "@/components/blog/blog-card";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function Makeup() {
  const { data: makeupPosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-1", limit: 12 }],
  });

  const { data: featuredPost } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: "cat-1", featured: true, limit: 1 }],
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
          backgroundImage: `url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/90 to-soft-pink/90"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Palette className="h-8 w-8" />
              <h1 className="text-5xl md:text-6xl font-bold">Makeup Mastery</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              From everyday natural looks to glamorous evening makeup, discover tutorials, 
              reviews, and expert techniques to enhance your beauty.
            </p>
            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>42+ Tutorials</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>Expert Reviews</span>
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
              <h2 className="text-3xl font-bold text-charcoal mb-4">Featured Tutorial</h2>
              <p className="text-lg text-medium-gray">Don't miss our latest makeup masterclass</p>
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
                <h2 className="text-2xl font-bold text-charcoal mb-2">All Makeup Content</h2>
                <p className="text-medium-gray">Master the art of makeup with our comprehensive guides</p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {makeupPosts?.map((post) => (
                  <motion.div key={post.id} variants={staggerItem}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {makeupPosts?.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Palette className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No makeup posts yet</h3>
                  <p className="text-medium-gray">Check back soon for amazing makeup tutorials!</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Makeup Tips */}
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Quick Makeup Tips</h3>
                  <ul className="space-y-3 text-sm text-medium-gray">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Always start with a good primer for long-lasting makeup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Blend eyeshadow in small, circular motions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use setting spray to lock in your look</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Clean your brushes regularly for better application</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Popular Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-charcoal mb-4">Popular Makeup Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Eyeshadow", "Foundation", "Lipstick", "Contouring", "Evening Look", "Natural Makeup", "Color Theory"].map((tag) => (
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
