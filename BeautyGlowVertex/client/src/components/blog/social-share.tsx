import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Link as LinkIcon, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface SocialShareProps {
  title: string;
  url: string;
  className?: string;
}

export default function SocialShare({ title, url, className = "" }: SocialShareProps) {
  const { toast } = useToast();
  
  const fullUrl = `${window.location.origin}${url}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    instagram: "javascript:void(0)", // Instagram doesn't support direct sharing
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${fullUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const handleShare = (platform: string) => {
    if (platform === "instagram") {
      toast({
        title: "Instagram sharing",
        description: "Please share manually on Instagram by copying the link.",
      });
      copyToClipboard();
      return;
    }
    
    window.open(shareLinks[platform as keyof typeof shareLinks], "_blank", "width=600,height=400");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm font-medium text-charcoal mr-2">Share:</span>
      <div className="flex gap-2">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("facebook")}
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
          >
            <Facebook className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("twitter")}
            className="bg-blue-400 hover:bg-blue-500 text-white border-blue-400 hover:border-blue-500"
          >
            <Twitter className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("instagram")}
            className="bg-pink-500 hover:bg-pink-600 text-white border-pink-500 hover:border-pink-600"
          >
            <Instagram className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("email")}
            className="bg-gray-600 hover:bg-gray-700 text-white border-gray-600 hover:border-gray-700"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="hover:bg-gray-50"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
