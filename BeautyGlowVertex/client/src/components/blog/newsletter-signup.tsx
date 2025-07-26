import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertNewsletterSchema } from "@shared/schema";
import { motion } from "framer-motion";
import { Mail, CheckCircle } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "default" | "hero" | "sidebar" | "footer";
  className?: string;
}

export default function NewsletterSignup({ 
  variant = "default", 
  className = "" 
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: { email: string; name?: string }) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Welcome to our beauty community. Check your email for a confirmation.",
      });
      setEmail("");
      setName("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = insertNewsletterSchema.parse({
        email: email.trim(),
        name: name.trim() || undefined,
      });
      mutation.mutate(data);
    } catch (error) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  if (variant === "hero") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`text-center ${className}`}
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Stay Beautiful with Weekly Tips
        </h3>
        <p className="text-white/90 mb-6">
          Join 25,000+ beauty enthusiasts getting exclusive content
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:ring-white focus:border-white"
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white font-semibold px-8"
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </motion.div>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className={`bg-gradient-to-br from-rose-gold to-soft-pink rounded-2xl p-6 text-white ${className}`}>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="h-5 w-5" />
          <h3 className="text-xl font-bold">Stay Beautiful</h3>
        </div>
        <p className="mb-4 text-sm opacity-90">
          Get weekly beauty tips, product reviews, and exclusive content delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white text-charcoal placeholder:text-medium-gray focus:ring-2 focus:ring-white"
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-white text-rose-gold font-semibold hover:bg-gray-100"
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>
        <p className="text-xs mt-3 opacity-80">Join 25,000+ beauty enthusiasts</p>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-rose-gold focus:border-transparent"
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white font-semibold"
        >
          {mutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  // Default variant
  return (
    <div className={`bg-gray-50 rounded-2xl p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-rose-gold" />
        <h3 className="text-lg font-bold text-charcoal">Newsletter</h3>
      </div>
      <p className="text-medium-gray mb-4 text-sm">
        Get the latest beauty tips and product reviews in your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
        />
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white"
        >
          {mutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
}
