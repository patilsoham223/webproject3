import { Link } from "wouter";
import { Clock, Eye, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { hoverScale } from "@/lib/animations";
import type { PostWithAuthorAndCategory } from "@shared/schema";

interface BlogCardProps {
  post: PostWithAuthorAndCategory;
  variant?: "default" | "featured" | "minimal";
  className?: string;
}

export default function BlogCard({ 
  post, 
  variant = "default", 
  className = "" 
}: BlogCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (variant === "featured") {
    return (
      <motion.article
        className={`relative overflow-hidden rounded-2xl shadow-lg group ${className}`}
        {...hoverScale}
      >
        <Link href={`/post/${post.slug}`}>
          <div className="relative h-80">
            <img
              src={post.featuredImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span
                className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
                style={{ backgroundColor: post.category.color }}
              >
                {post.category.name}
              </span>
              <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm gap-4">
                <span>By {post.author.name}</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{post.viewCount.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.article
        className={`border-b border-gray-200 pb-6 group ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Link href={`/post/${post.slug}`}>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${post.category.color}20`, 
                color: post.category.color 
              }}
            >
              {post.category.name}
            </span>
            <div className="flex items-center gap-1 text-sm text-medium-gray">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-rose-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-medium-gray mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-medium-gray">
              <span>By {post.author.name}</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.viewCount.toLocaleString()} views</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-medium-gray">
                <MessageCircle className="h-4 w-4" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      className={`bg-white rounded-xl shadow-lg overflow-hidden group hover-scale ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/post/${post.slug}`}>
        <div className="relative h-48">
          <img
            src={post.featuredImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop"}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: post.category.color }}
          >
            {post.category.name}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-rose-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-medium-gray mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-sm text-medium-gray">
            <div className="flex items-center gap-2">
              <span>By {post.author.name}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readingTime} min</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{post.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
