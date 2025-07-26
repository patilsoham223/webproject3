import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import CommentSection from "@/components/blog/comment-section";
import SocialShare from "@/components/blog/social-share";
import NewsletterSignup from "@/components/blog/newsletter-signup";
import BlogCard from "@/components/blog/blog-card";
import { fadeInUp } from "@/lib/animations";
import { apiRequest } from "@/lib/queryClient";
import type { PostWithAuthorAndCategory } from "@shared/schema";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = useQuery<PostWithAuthorAndCategory>({
    queryKey: ["/api/posts", slug],
    enabled: !!slug,
  });

  const { data: relatedPosts } = useQuery<PostWithAuthorAndCategory[]>({
    queryKey: ["/api/posts", { categoryId: post?.categoryId, limit: 3 }],
    enabled: !!post?.categoryId,
  });

  // Increment view count on post load
  useMutation({
    mutationFn: async () => {
      if (post?.id) {
        await apiRequest("POST", `/api/posts/${post.id}/view`, {});
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", slug] });
    },
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-80 bg-gray-200 rounded-xl mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Post Not Found</h1>
          <p className="text-medium-gray mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const filteredRelatedPosts = relatedPosts?.filter(p => p.id !== post.id).slice(0, 3) || [];

  return (
    <div className="pt-16">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div {...fadeInUp}>
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link 
              href={`/${post.category.slug}`}
              className="text-rose-gold hover:text-rose-gold/80 transition-colors"
            >
              ← Back to {post.category.name}
            </Link>
          </div>

          {/* Meta Information */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: post.category.color }}
            >
              {post.category.name}
            </span>
            <span className="text-sm text-medium-gray">
              Published on {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author & Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-medium-gray mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-gold to-soft-pink rounded-full flex items-center justify-center text-white font-bold">
                {post.author.name.charAt(0)}
              </div>
              <span>By {post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.viewCount.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="border-b border-gray-200 pb-6 mb-8">
            <SocialShare title={post.title} url={`/post/${post.slug}`} />
          </div>
        </motion.div>

        {/* Featured Image */}
        {post.featuredImage && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }} />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-medium-gray px-3 py-1 rounded-full text-sm hover:bg-rose-gold hover:text-white transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Author Bio */}
        <motion.div
          className="border-t border-gray-200 pt-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-soft-pink rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-xl font-bold text-charcoal mb-1">{post.author.name}</h4>
              <p className="text-sm text-rose-gold mb-2">{post.author.role || "Beauty Expert"}</p>
              <p className="text-medium-gray mb-4">
                {post.author.bio || "Passionate about sharing beauty knowledge and helping others discover their unique style."}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <CommentSection postId={post.id} />
      </article>

      {/* Related Posts */}
      {filteredRelatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-charcoal mb-4">Related Articles</h2>
              <p className="text-lg text-medium-gray">More great content you might enjoy</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRelatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={relatedPost} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-charcoal mb-4">Loved this article?</h2>
              <p className="text-lg text-medium-gray">
                Get more beauty tips and tutorials delivered straight to your inbox
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <NewsletterSignup />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
