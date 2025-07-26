import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Users, Phone, MapPin, Instagram, Youtube, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "hello@vertexglow.com",
    details: "We typically respond within 24 hours",
    color: "bg-rose-gold"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Available Mon-Fri 9AM-5PM EST",
    details: "Instant support for quick questions",
    color: "bg-teal-accent"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our social media community",
    details: "Connect with fellow beauty enthusiasts",
    color: "bg-soft-pink"
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "",
  });
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = insertContactSchema.parse({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        type: formData.type || "general",
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-rose-gold/10 to-soft-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-medium-gray mb-8 max-w-3xl mx-auto">
              Have a question, collaboration idea, or just want to say hello? 
              We'd love to hear from you and be part of your beauty journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="bg-gray-50 rounded-2xl p-8 text-center hover-scale"
                variants={staggerItem}
              >
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-2">{method.title}</h3>
                <p className="text-medium-gray mb-2">{method.description}</p>
                <p className="text-sm text-medium-gray">{method.details}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-charcoal mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                />
                <Select onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-rose-gold focus:border-transparent">
                    <SelectValue placeholder="Select inquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="collaboration">Collaboration Proposal</SelectItem>
                    <SelectItem value="review">Product Review Request</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="media">Media Inquiry</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Your message..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="focus:ring-2 focus:ring-rose-gold focus:border-transparent"
                />
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white py-3 text-lg font-semibold"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Direct Contact */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">Email Us Directly</h4>
                    <p className="text-medium-gray">hello@vertexglow.com</p>
                  </div>
                </div>
                <p className="text-sm text-medium-gray">
                  For press inquiries, partnerships, or urgent matters, feel free to reach out directly.
                </p>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-semibold text-charcoal mb-4">Connect With Us</h4>
                <p className="text-medium-gray mb-6">
                  Follow us on social media for daily beauty tips, behind-the-scenes content, 
                  and community interactions.
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-lg transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
                  >
                    <Globe className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Partnership Info */}
              <div className="bg-gradient-to-br from-rose-gold to-soft-pink rounded-2xl shadow-lg p-6 text-white">
                <h4 className="text-xl font-bold mb-3">Brand Partnerships</h4>
                <p className="mb-4 opacity-90">
                  Interested in collaborating with us? We work with brands that align with 
                  our values of authenticity, quality, and inclusivity.
                </p>
                <div className="space-y-2 text-sm opacity-90">
                  <p>• Product reviews and features</p>
                  <p>• Sponsored content creation</p>
                  <p>• Social media campaigns</p>
                  <p>• Tutorial collaborations</p>
                </div>
                <Button className="mt-4 bg-white text-rose-gold font-semibold hover:bg-gray-100">
                  Partnership Inquiry
                </Button>
              </div>

              {/* FAQ Link */}
              <div className="bg-gray-100 rounded-2xl p-6">
                <h4 className="font-semibold text-charcoal mb-2">Quick Questions?</h4>
                <p className="text-medium-gray text-sm mb-4">
                  Check out our frequently asked questions for instant answers to common inquiries.
                </p>
                <Button variant="outline" className="text-rose-gold border-rose-gold hover:bg-rose-gold hover:text-white">
                  View FAQ
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className="py-12 bg-teal-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">We Value Your Time</h3>
            <p className="text-lg opacity-90">
              We aim to respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please mention "URGENT" in your subject line.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
