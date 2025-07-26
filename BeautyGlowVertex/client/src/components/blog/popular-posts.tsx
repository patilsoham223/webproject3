import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { TrendingUp, Eye, MessageCircle } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function PopularPosts() {
  const { data: popularPosts, isLoading } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { limit: 3 }],
  });

  if (isLoading || !popularPosts) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Sort by view count to get most popular
  const sortedPosts = [...popularPosts].sort((a, b) => b.viewCount - a.viewCount);

  return (
    <motion.div
      className="bg-gray-50 rounded-2xl p-6"
      {...fadeInUp}
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-rose-gold" />
        <h3 className="text-xl font-bold text-charcoal">Trending Now</h3>
      </div>
      
      <div className="space-y-4">
        {sortedPosts.slice(0, 3).map((post, index) => (
          <motion.div
            key={post.id}
            className="flex gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-rose-gold">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <Link href={`/post/${post.slug}`}>
                <h4 className="font-semibold text-charcoal text-sm mb-1 line-clamp-2 group-hover:text-rose-gold transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-medium-gray">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span>{post.viewCount.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{post.commentsCount} comments</span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        href="/search?sort=popular"
        className="block text-center mt-6 text-sm text-rose-gold hover:text-rose-gold/80 transition-colors"
      >
        View all trending posts →
      </Link>
    </motion.div>
  );
}
