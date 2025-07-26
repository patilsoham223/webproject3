import { motion } from "framer-motion";
import { Users, Award, Heart, TrendingUp, Instagram, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const stats = [
  { icon: Users, label: "Community Members", value: "50K+" },
  { icon: Award, label: "Tutorials Created", value: "500+" },
  { icon: Heart, label: "Products Reviewed", value: "200+" },
  { icon: TrendingUp, label: "Monthly Views", value: "3M+" },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & Beauty Expert",
    bio: "Professional makeup artist with 8+ years in the beauty industry. Worked with top brands like MAC and Sephora.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    social: {
      instagram: "#",
      youtube: "#",
      email: "sarah@vertexglow.com"
    }
  },
  {
    name: "Emma Rodriguez",
    role: "Skincare Specialist",
    bio: "Licensed esthetician and skincare enthusiast. Specializes in ingredient analysis and routine building.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    social: {
      instagram: "#",
      youtube: "#",
      email: "emma@vertexglow.com"
    }
  },
  {
    name: "Dr. Lisa Chen",
    role: "Dermatology Consultant",
    bio: "Board-certified dermatologist providing scientific insights and expert medical advice for our content.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    social: {
      instagram: "#",
      youtube: "#",
      email: "lisa@vertexglow.com"
    }
  }
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-rose-gold/10 to-soft-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
              About <span className="gradient-text">Vertex Glow</span>
            </h1>
            <p className="text-xl md:text-2xl text-medium-gray mb-8 max-w-3xl mx-auto">
              Where beauty meets authenticity. We're a passionate community dedicated to making 
              beauty accessible, inclusive, and fun for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Beauty workspace with products and tools"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-charcoal mb-6">Our Story</h2>
              <p className="text-lg text-medium-gray mb-6 leading-relaxed">
                Founded in 2020 by beauty enthusiast Sarah Johnson, Vertex Glow began as a simple 
                blog sharing honest product reviews and makeup tutorials. What started as a passion 
                project quickly grew into a trusted community of over 50,000 beauty lovers.
              </p>
              <p className="text-medium-gray mb-6 leading-relaxed">
                Our mission is simple: to make beauty accessible, inclusive, and fun for everyone. 
                Whether you're a complete beginner or a seasoned makeup artist, our carefully curated 
                content, honest reviews, and step-by-step tutorials are designed to inspire and educate.
              </p>
              <p className="text-medium-gray mb-8 leading-relaxed">
                We believe that beauty is not about perfection—it's about self-expression, confidence, 
                and feeling comfortable in your own skin. Every tutorial, review, and tip we share 
                reflects this philosophy.
              </p>
              <Button className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-3">
                Join Our Community
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-charcoal mb-4">Our Impact</h2>
            <p className="text-lg text-medium-gray">Numbers that reflect our growing community</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center bg-white p-6 rounded-2xl shadow-lg"
                variants={staggerItem}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-gold/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-rose-gold" />
                </div>
                <div className="text-3xl font-bold text-charcoal mb-2">{stat.value}</div>
                <div className="text-sm text-medium-gray">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-charcoal mb-4">Meet Our Team</h2>
            <p className="text-lg text-medium-gray max-w-2xl mx-auto">
              The passionate experts behind Vertex Glow, dedicated to bringing you the best in beauty
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-gray-50 rounded-2xl p-8 text-center hover-scale"
                variants={staggerItem}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-bold text-charcoal mb-2">{member.name}</h3>
                <p className="text-rose-gold font-medium mb-4">{member.role}</p>
                <p className="text-medium-gray text-sm mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={member.social.instagram}
                    className="text-gray-400 hover:text-rose-gold transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.youtube}
                    className="text-gray-400 hover:text-rose-gold transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-gray-400 hover:text-rose-gold transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-rose-gold/5 to-soft-pink/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-charcoal mb-4">Our Values</h2>
            <p className="text-lg text-medium-gray">The principles that guide everything we do</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="text-center p-6"
              variants={staggerItem}
            >
              <div className="w-16 h-16 bg-rose-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-rose-gold" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Authenticity</h3>
              <p className="text-medium-gray">
                We believe in honest reviews, genuine recommendations, and real experiences. 
                No fake promises, just authentic beauty advice.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center p-6"
              variants={staggerItem}
            >
              <div className="w-16 h-16 bg-teal-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-teal-accent" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Inclusivity</h3>
              <p className="text-medium-gray">
                Beauty has no boundaries. We celebrate all skin tones, ages, and styles, 
                creating content that speaks to everyone.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center p-6"
              variants={staggerItem}
            >
              <div className="w-16 h-16 bg-soft-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-soft-pink" />
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Excellence</h3>
              <p className="text-medium-gray">
                We're committed to providing high-quality content, thorough research, 
                and expert insights that you can trust.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Glow With Us?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of beauty enthusiasts and discover your inner glow. 
              Get exclusive tips, early access to content, and be part of our growing family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-rose-gold hover:bg-rose-gold/90 text-white px-8 py-4"
              >
                Join Our Newsletter
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-charcoal px-8 py-4"
              >
                Follow on Instagram
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
