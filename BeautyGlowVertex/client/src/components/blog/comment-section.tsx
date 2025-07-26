import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCommentSchema } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User } from "lucide-react";
import type { Comment } from "@shared/schema";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["/api/posts", postId, "comments"],
  });

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; content: string }) => {
      const response = await apiRequest("POST", `/api/posts/${postId}/comments`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts", postId, "comments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Comment posted!",
        description: "Thank you for sharing your thoughts.",
      });
      setName("");
      setEmail("");
      setContent("");
    },
    onError: () => {
      toast({
        title: "Failed to post comment",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = insertCommentSchema.parse({
        postId,
        name: name.trim(),
        email: email.trim(),
        content: content.trim(),
      });
      mutation.mutate(data);
    } catch (error) {
      toast({
        title: "Invalid form data",
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60)),
      'hour'
    );
  };

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-rose-gold" />
        <h3 className="text-xl font-bold text-charcoal">
          Comments ({comments?.length || 0})
        </h3>
      </div>

      {/* Comment Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="mb-8 bg-gray-50 p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="font-semibold text-charcoal mb-4">Leave a Comment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
          />
        </div>
        <Textarea
          placeholder="Your thoughts on this article..."
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="mb-4 focus:ring-2 focus:ring-rose-gold focus:border-transparent"
        />
        <Button
          type="submit"
          disabled={mutation.isPending || !name.trim() || !email.trim() || !content.trim()}
          className="bg-rose-gold hover:bg-rose-gold/90 text-white"
        >
          {mutation.isPending ? (
            "Posting..."
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </>
          )}
        </Button>
      </motion.form>

      {/* Comments List */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <div className="space-y-6">
            {comments?.map((comment, index) => (
              <motion.div
                key={comment.id}
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-rose-gold to-soft-pink rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-charcoal">{comment.name}</h5>
                    <span className="text-xs text-medium-gray">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-medium-gray text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {comments?.length === 0 && (
              <motion.div
                className="text-center py-8 text-medium-gray"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Be the first to leave a comment!</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
