import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import NewsletterSignup from "./newsletter-signup";

export default function HeroSection() {
  const scrollToContent = () => {
    const nextSection = document.getElementById("featured-posts");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center parallax-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="text-center text-white max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="block gradient-text">Inner Glow</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto">
            Your ultimate destination for beauty, skincare, and lifestyle inspiration. 
            Join thousands who trust us for the latest trends and expert advice.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            size="lg"
            className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-4 rounded-full font-semibold text-lg hover-scale"
            onClick={scrollToContent}
          >
            Explore Content
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-charcoal px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            onClick={() => document.getElementById("newsletter-hero")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join Community
          </Button>
        </motion.div>

        <div id="newsletter-hero">
          <NewsletterSignup variant="hero" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToContent}
      >
        <ChevronDown className="text-white text-2xl" />
      </motion.div>
    </section>
  );
}
