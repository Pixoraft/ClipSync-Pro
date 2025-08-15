import { useEffect } from "react";
import PricingCard from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/seo/SEOHead";

export default function Pricing() {
  useEffect(() => {}, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "ClipSync Pro Pricing",
    "price": "0",
    "priceCurrency": "USD",
    "valueAddedTaxIncluded": true,
    "description": "ClipSync Pro is completely free forever with all premium features included. No subscriptions, no hidden costs.",
    "priceValidUntil": "2030-12-31"
  };

  const pricingPlans = [
    {
      title: "ClipFlow Pro",
      price: "FREE",
      description: "Completely free forever - all features included",
      features: [
        "Unlimited clips storage",
        "Auto clipboard capture with duplicate prevention",
        "Smart search and filtering",
        "Secure local storage with encryption",
        "Beautiful dark theme interface", 
        "Cross-platform support (Linux & Windows)",
        "Real-time clipboard monitoring",
        "Keyboard shortcuts customization",
        "Export & import functionality",
        "Regular updates and improvements",
        "Community support",
        "Open source transparency"
      ],
      buttonText: "Download Free",
      isPopular: true,
      onButtonClick: () => window.location.href = '/downloads'
    }
  ];

  const faqs = [
    {
      question: "Is ClipFlow Pro really free?",
      answer: "Yes! ClipFlow Pro is 100% free forever. All features are included with no hidden costs, subscriptions, or premium upgrades."
    },
    {
      question: "What's the difference between Linux and Windows versions?",
      answer: "The Linux version is fully optimized and supported with all features. The Windows version is experimental with limited compatibility and occasional stability issues."
    },
    {
      question: "How secure is my data?",
      answer: "All your clips are stored locally on your device with enterprise-grade encryption. We never access or store your data on our servers."
    },
    {
      question: "Do I need to create an account?",
      answer: "No registration required! Download and start using ClipFlow Pro immediately. Your data stays completely private on your device."
    },
    {
      question: "Will there ever be paid features?",
      answer: "No! ClipFlow Pro is committed to being free forever. We believe everyone deserves access to powerful productivity tools."
    },
    {
      question: "How do I get support?",
      answer: "Community support is available through our contact page. The Linux version has active community support, while Windows support is limited."
    }
  ];

  return (
    <div className="relative pt-20">
      <SEOHead
        title="Pricing - ClipFlow Pro Plans & Features Comparison"
        description="ClipFlow Pro is 100% free forever with all premium features included. No subscriptions, no hidden costs. Download the best clipboard manager with unlimited features."
        keywords="clipflow pro pricing, free clipboard manager, pricing plans, clipboard software cost, productivity software pricing, free forever software"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-glow">
            100% Free Forever
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            ClipFlow Pro is completely free with all premium features included. No fees, no subscriptions.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <i className="fas fa-check text-green-400"></i>
              <span className="text-gray-300">Free forever</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-check text-green-400"></i>
              <span className="text-gray-300">No registration required</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-check text-green-400"></i>
              <span className="text-gray-300">No hidden costs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-b from-midnight to-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center">
            <div className="max-w-lg">
              <PricingCard
                title={pricingPlans[0].title}
                price={pricingPlans[0].price}
                description={pricingPlans[0].description}
                features={pricingPlans[0].features}
                isPopular={pricingPlans[0].isPopular}
                buttonText={pricingPlans[0].buttonText}
                onButtonClick={pricingPlans[0].onButtonClick}
                delay={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* All Features Included */}
      <section className="py-20 premium-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">All Features Included - Free</h2>
            <p className="text-xl text-gray-300">
              Every feature is yours to use without any restrictions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "fas fa-clipboard", title: "Unlimited Clips", desc: "Store unlimited clipboard entries" },
              { icon: "fas fa-search", title: "Smart Search", desc: "Find any clip instantly with smart search" },
              { icon: "fas fa-filter", title: "Advanced Filters", desc: "Filter clips by type, date, and content" },
              { icon: "fas fa-shield-alt", title: "Local Encryption", desc: "Your data stays secure on your device" },
              { icon: "fas fa-keyboard", title: "Keyboard Shortcuts", desc: "Customizable hotkeys for quick access" },
              { icon: "fas fa-eye", title: "Real-time Monitoring", desc: "Automatic clipboard tracking" },
              { icon: "fas fa-download", title: "Export/Import", desc: "Backup and restore your clips" },
              { icon: "fas fa-desktop", title: "Cross-Platform", desc: "Available for Linux and Windows" },
              { icon: "fas fa-moon", title: "Dark Theme", desc: "Premium dark interface design" }
            ].map((feature, index) => (
              <div key={index} className="glass-morphism rounded-xl p-6 text-center opacity-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <i className={`${feature.icon} text-3xl text-electric mb-4`}></i>
                <h3 className="text-lg font-bold text-glow mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about ClipFlow Pro
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-morphism rounded-2xl p-6 opacity-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <h3 className="text-xl font-semibold text-glow mb-3">{faq.question}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-12 space-y-8">
            <h2 className="text-4xl font-black text-glow">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300">
              Join thousands of professionals who trust ClipFlow Pro for their daily workflow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 glow-effect"
                onClick={() => window.location.href = '/downloads'}
              >
                <i className="fas fa-download mr-2"></i>
                Download Free
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-4 glass-morphism rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-300"
                onClick={() => console.log('Contact sales')}
              >
                <i className="fas fa-phone mr-2"></i>
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
