import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/seo/SEOHead";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {}, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ClipFlow Pro",
    "description": "Get support, provide feedback, or ask questions about ClipFlow Pro clipboard manager. We're here to help improve your productivity experience.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ClipFlow Pro Support",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "English"
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: "fas fa-envelope",
      title: "Email Support",
      description: "Get help with technical issues and general inquiries",
      contact: "support@clipflow.pro",
      action: () => window.open('mailto:support@clipflow.pro', '_blank')
    },
    {
      icon: "fas fa-globe",
      title: "Developer Portfolio",
      description: "Learn more about the creator and other projects",
      contact: "vivek-rvt.onrender.com",
      action: () => window.open('https://vivek-rvt.onrender.com', '_blank')
    },
    {
      icon: "fas fa-download",
      title: "Download Links",
      description: "Access the latest versions for Linux and Windows",
      contact: "Linux & Windows Downloads",
      action: () => window.open('https://drive.usercontent.google.com/download?id=1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv&export=download&authuser=0', '_blank')
    }
  ];

  return (
    <div className="relative pt-20">
      <SEOHead
        title="Contact Us - ClipFlow Pro Support & Inquiries"
        description="Get support, provide feedback, or ask questions about ClipFlow Pro clipboard manager. Contact our team for technical assistance and general inquiries."
        keywords="clipflow pro support, clipboard manager help, contact clipflow, technical support, software assistance, productivity software contact"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-glow">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Have questions about ClipFlow Pro? Need support? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-gradient-to-b from-midnight to-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div 
                key={index}
                className="glass-morphism rounded-3xl p-8 hover:scale-105 transform transition-all duration-500 cursor-pointer group opacity-0 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
                onClick={method.action}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-electric to-cyber rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow">
                  <i className={`${method.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-glow">{method.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {method.description}
                </p>
                <p className="text-electric font-semibold">{method.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">Send Us a Message</h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="glass-morphism rounded-3xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-morphism border-electric focus:border-glow"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-morphism border-electric focus:border-glow"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="glass-morphism border-electric focus:border-glow"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="glass-morphism border-electric focus:border-glow min-h-[150px]"
                  placeholder="Tell us more about your inquiry, issue, or feedback..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Support Information */}
      <section className="py-20 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-morphism rounded-3xl p-8 md:p-12 space-y-8">
            <h2 className="text-3xl font-bold text-glow text-center mb-8">Support Information</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-glow">For Technical Issues</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-linux text-green-400 mr-3 mt-1"></i>
                    <span><strong>Linux users:</strong> Full support with quick response times</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-windows text-yellow-400 mr-3 mt-1"></i>
                    <span><strong>Windows users:</strong> Limited support due to experimental nature</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock text-blue-400 mr-3 mt-1"></i>
                    <span><strong>Response time:</strong> Usually within 24-48 hours</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-glow">Before Contacting Support</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-3 mt-1"></i>
                    <span>Check if you're using the latest version</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-3 mt-1"></i>
                    <span>Restart the application and try again</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check text-green-400 mr-3 mt-1"></i>
                    <span>Include your OS version and error details</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                ClipFlow Pro is an open-source project created with ❤️ by{" "}
                <a 
                  href="https://vivek-rvt.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-glow hover:text-cyber transition-colors duration-300"
                >
                  Vivek
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
