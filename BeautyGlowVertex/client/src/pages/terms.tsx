import { motion } from "framer-motion";
import { FileText, Scale, AlertTriangle, Shield, Eye, MessageSquare, Gavel } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const sections = [
  {
    icon: Eye,
    title: "Acceptance of Terms",
    content: `By accessing and using the Vertex Glow website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.

These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and Vertex Glow, concerning your access to and use of our website and services.`
  },
  {
    icon: Shield,
    title: "Use License",
    content: `Permission is granted to temporarily download one copy of the materials on Vertex Glow's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Vertex Glow at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.`
  },
  {
    icon: AlertTriangle,
    title: "Disclaimer",
    content: `The materials on Vertex Glow's website are provided on an 'as is' basis. Vertex Glow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Further, Vertex Glow does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.

Beauty advice and product recommendations are for informational purposes only and should not replace professional consultation. Individual results may vary.`
  },
  {
    icon: Gavel,
    title: "Limitations",
    content: `In no event shall Vertex Glow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Vertex Glow's website, even if Vertex Glow or a Vertex Glow authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.

Our total liability to you for all damages, losses, and causes of action shall not exceed the amount paid by you, if any, for accessing our website.`
  },
  {
    icon: MessageSquare,
    title: "User Content and Comments",
    content: `By posting comments or other content on our website, you grant Vertex Glow a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, and display such content.

You agree that any content you submit:
• Does not violate any applicable laws or regulations
• Does not infringe on the rights of any third party
• Is not defamatory, obscene, or otherwise objectionable
• Does not contain spam or unauthorized advertising

We reserve the right to remove any content that violates these terms or is otherwise deemed inappropriate at our sole discretion.`
  },
  {
    icon: Scale,
    title: "Governing Law",
    content: `These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Vertex Glow operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.

Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of the relevant arbitration association. The arbitration will be conducted in English and the arbitrator's decision will be final and binding.`
  }
];

export default function Terms() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-rose-gold/10 to-soft-pink/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="h-8 w-8 text-rose-gold" />
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal">Terms of Service</h1>
            </div>
            <p className="text-xl md:text-2xl text-medium-gray mb-8 max-w-3xl mx-auto">
              Please read these terms and conditions carefully before using our website. 
              By using Vertex Glow, you agree to be bound by these terms.
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
              Welcome to Vertex Glow! These Terms of Service ("Terms") govern your use of our 
              website and services. By accessing or using our website, you agree to be bound by 
              these Terms. If you disagree with any part of these terms, then you may not access 
              our service.
            </p>
            <p className="text-medium-gray leading-relaxed mt-6">
              We reserve the right to update and change these Terms at any time without notice. 
              Any new features that augment or enhance the current service shall be subject to 
              the Terms of Service. Continued use of the service after any such changes constitutes 
              your consent to such changes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
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
                  <div className="w-12 h-12 bg-rose-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-rose-gold" />
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

      {/* Prohibited Uses */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-rose-gold/5 to-soft-pink/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-charcoal mb-4">Prohibited Uses</h2>
                <p className="text-medium-gray leading-relaxed mb-4">
                  You may not use our service for any unlawful purpose or to solicit others to 
                  perform unlawful acts. You may not violate any international, federal, provincial, 
                  or state regulations, rules, or laws.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-medium-gray">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Transmit spam, chain letters, or other unsolicited email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Attempt to impersonate another user or person</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use our service for any illegal or unauthorized purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Violate any laws in your jurisdiction</span>
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Interfere with or circumvent security features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Engage in any automated use of the system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Collect information about users without consent</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-rose-gold rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use the service to transmit malicious code</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Termination */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Account Termination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">By You</h3>
                <p className="text-medium-gray text-sm">
                  You may terminate your account at any time by contacting us or using account settings.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">By Us</h3>
                <p className="text-medium-gray text-sm">
                  We may terminate your access immediately if you breach these terms or engage in prohibited activities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Effect of Termination</h3>
                <p className="text-medium-gray text-sm">
                  Upon termination, your right to use the service ceases immediately, and we may delete your data.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-charcoal mb-3">Survival</h3>
                <p className="text-medium-gray text-sm">
                  Provisions regarding liability, indemnification, and governing law survive termination.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Questions About These Terms?</h2>
            <p className="text-xl text-gray-300 mb-8">
              If you have any questions about these Terms of Service, please contact us. 
              We're here to help clarify any concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>legal@vertexglow.com</span>
              </div>
              <div className="text-gray-400">|</div>
              <div>
                <span>Legal team response: 2-3 business days</span>
              </div>
            </div>
            <div className="mt-8 p-6 bg-white/5 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Important Notice</h3>
              <p className="text-sm text-gray-300">
                These terms are effective as of the date indicated above and will remain in effect 
                except with respect to any changes in their provisions in the future, which will be 
                in effect immediately after being posted on this page. We reserve the right to update 
                and change the Terms of Service by posting updates and changes to the website.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
