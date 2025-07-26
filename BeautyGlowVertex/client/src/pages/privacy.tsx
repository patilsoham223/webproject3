import { motion } from "framer-motion";
import { Shield, Eye, Lock, UserCheck, Mail, Cookie, Globe } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: `We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, leave comments, or contact us. This may include your name, email address, and any other information you choose to provide.

We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.`
  },
  {
    icon: UserCheck,
    title: "How We Use Your Information",
    content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Send you newsletters and marketing communications (with your consent)
• Respond to your comments, questions, and requests
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Personalize your experience on our website`
  },
  {
    icon: Lock,
    title: "Information Sharing",
    content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

We may share your information with:
• Service providers who assist us in operating our website
• Analytics services to help us understand how our website is used
• Legal authorities when required by law or to protect our rights`
  },
  {
    icon: Cookie,
    title: "Cookies and Tracking",
    content: `We use cookies and similar tracking technologies to collect and use personal information about you. Cookies are small data files stored on your device when you visit our website.

You can control cookies through your browser settings, but disabling cookies may affect your experience on our website.`
  },
  {
    icon: Mail,
    title: "Email Communications",
    content: `If you subscribe to our newsletter, we will send you regular updates about beauty tips, new content, and exclusive offers. You can unsubscribe at any time by clicking the "unsubscribe" link in any email or by contacting us directly.

We will never share your email address with third parties for their marketing purposes without your explicit consent.`
  },
  {
    icon: Globe,
    title: "International Transfers",
    content: `Your information may be stored and processed in countries other than your own. We ensure that any international transfers of personal data are subject to appropriate safeguards to protect your privacy and rights.`
  }
];

export default function Privacy() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-teal-accent/10 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-teal-accent" />
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal">Privacy Policy</h1>
            </div>
            <p className="text-xl md:text-2xl text-medium-gray mb-8 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information when you use Vertex Glow.
            </p>
            <div className="text-sm text-medium-gray">
              Last updated: January 2024
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-medium-gray leading-relaxed">
              At Vertex Glow, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy describes how we collect, use, 
              disclose, and safeguard your information when you visit our website, subscribe to 
              our newsletter, or interact with our content.
            </p>
            <p className="text-medium-gray leading-relaxed mt-6">
              By using our website, you consent to the collection and use of your information 
              as described in this Privacy Policy. If you do not agree with our policies and 
              practices, please do not use our website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                className="bg-white rounded-2xl p-8 shadow-lg"
                variants={staggerItem}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-teal-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-charcoal mb-4">{section.title}</h2>
                    <div className="text-medium-gray leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Data Security */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-teal-accent/5 to-blue-50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-accent rounded-full flex items-center justify-center flex-shrink-0">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Data Security</h2>
                <p className="text-medium-gray leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information against unauthorized access, alteration, disclosure, or 
                  destruction. However, no method of transmission over the internet or electronic 
                  storage is 100% secure.
                </p>
                <ul className="space-y-2 text-medium-gray">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>SSL encryption for data transmission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Regular security assessments and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Limited access to personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-teal-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span>Secure data storage and backup systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Access & Update</h3>
                <p className="text-medium-gray text-sm">
                  You have the right to access and update your personal information at any time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Data Portability</h3>
                <p className="text-medium-gray text-sm">
                  You can request a copy of your personal data in a structured, machine-readable format.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Deletion</h3>
                <p className="text-medium-gray text-sm">
                  You can request the deletion of your personal information, subject to certain exceptions.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Opt-Out</h3>
                <p className="text-medium-gray text-sm">
                  You can opt-out of marketing communications at any time through email preferences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Questions About Your Privacy?</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>privacy@vertexglow.com</span>
              </div>
              <div className="text-gray-400">|</div>
              <div>
                <span>Response time: 24-48 hours</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-8">
              This policy may be updated from time to time. We will notify you of any 
              significant changes by posting a notice on our website.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
