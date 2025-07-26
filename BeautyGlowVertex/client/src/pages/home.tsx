import { motion } from "framer-motion";
import HeroSection from "@/components/blog/hero-section";
import FeaturedPosts from "@/components/blog/featured-posts";
import CategoriesGrid from "@/components/blog/categories-grid";
import PopularPosts from "@/components/blog/popular-posts";
import NewsletterSignup from "@/components/blog/newsletter-signup";

export default function Home() {
  return (
    <div className="pt-16">

      {/* Temporarily simplified for testing */}
      <div className="py-20 bg-gradient-to-br from-rose-500/10 to-pink-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-rose-500">Vertex Glow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your premium destination for beauty, skincare, and lifestyle inspiration
          </p>
        </div>
      </div>
      
      <HeroSection />
      <FeaturedPosts />
      <CategoriesGrid />
      
      {/* Latest Beauty Insights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content - would show more blog posts */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-charcoal mb-8">Latest Beauty Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* This would be populated with actual blog posts */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-charcoal mb-2">More amazing content coming soon...</h3>
                    <p className="text-medium-gray text-sm">Stay tuned for more beauty tips and tutorials!</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-charcoal mb-2">Expert beauty advice</h3>
                    <p className="text-medium-gray text-sm">Professional tips from industry experts.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="space-y-8">
                <PopularPosts />
                <NewsletterSignup variant="sidebar" />
                
                {/* Tags Cloud */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-charcoal mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Skincare", "Makeup", "Hair Care", "Anti-Aging", "Natural Beauty", "Tutorial", "Product Review"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 hover:bg-rose-gold hover:text-white px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
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
