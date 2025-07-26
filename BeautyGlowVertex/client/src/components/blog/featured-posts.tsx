import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Clock, Eye, MessageCircle } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function FeaturedPosts() {
  const { data: featuredPosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { featured: true, limit: 4 }],
  });

  const { data: recentPosts } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { limit: 3 }],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80 bg-gray-200 rounded-2xl"></div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const mainFeaturedPost = featuredPosts?.[0];
  const sidebarPosts = recentPosts?.slice(0, 3) || [];

  return (
    <section id="featured-posts" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h2 className="text-4xl font-bold text-charcoal mb-4">Featured Stories</h2>
          <p className="text-lg text-medium-gray max-w-2xl mx-auto">
            Discover our latest beauty insights, expert tutorials, and trending topics 
            that are taking the beauty world by storm.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Main Featured Post */}
          {mainFeaturedPost && (
            <motion.article
              className="relative group overflow-hidden rounded-2xl shadow-lg hover-scale"
              variants={staggerItem}
            >
              <Link href={`/post/${mainFeaturedPost.slug}`}>
                <img
                  src={mainFeaturedPost.featuredImage || "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop"}
                  alt={mainFeaturedPost.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                    style={{ backgroundColor: mainFeaturedPost.category.color }}
                  >
                    {mainFeaturedPost.category.name}
                  </span>
                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                    {mainFeaturedPost.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {mainFeaturedPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm gap-4">
                    <span>By {mainFeaturedPost.author.name}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mainFeaturedPost.readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{(mainFeaturedPost.viewCount || 0).toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary Featured Posts */}
          <motion.div
            className="space-y-6"
            variants={staggerItem}
          >
            {sidebarPosts.map((post) => (
              <article
                key={post.id}
                className="flex bg-gray-50 rounded-xl overflow-hidden hover-scale group"
              >
                <Link href={`/post/${post.slug}`} className="flex w-full">
                  <img
                    src={post.featuredImage || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=200&fit=crop"}
                    alt={post.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="p-4 flex-1">
                    <span
                      className="text-sm font-medium mb-1 block"
                      style={{ color: post.category.color }}
                    >
                      {post.category.name}
                    </span>
                    <h4 className="font-semibold text-charcoal mb-1 line-clamp-2 group-hover:text-rose-gold transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-medium-gray">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime} min read</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{(post.viewCount || 0).toLocaleString()} views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
