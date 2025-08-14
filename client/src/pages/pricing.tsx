import { useEffect } from "react";
import PricingCard from "@/components/ui/pricing-card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing - ClipFlow Pro Plans & Features Comparison";
  }, []);

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
      answer: "Yes! The free version includes core clipboard management features with support for up to 100 clips. You can upgrade anytime for additional features."
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
      question: "Can I sync between devices?",
      answer: "Cloud sync is available with Pro and Enterprise plans, allowing you to access your clips across all your devices seamlessly."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll provide a full refund."
    },
    {
      question: "How does the AI search work?",
      answer: "Our AI-powered search understands context and meaning, not just keywords. It can find clips based on semantic similarity and content understanding."
    }
  ];

  return (
    <div className="relative pt-20">
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
              <span className="text-gray-300">Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-check text-green-400"></i>
              <span className="text-gray-300">30-day money back guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-check text-green-400"></i>
              <span className="text-gray-300">No setup fees</span>
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

      {/* Feature Comparison */}
      <section className="py-20 premium-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">Feature Comparison</h2>
            <p className="text-xl text-gray-300">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="glass-morphism rounded-3xl p-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 text-gray-300">Features</th>
                  <th className="py-4 text-center text-gray-300">Free</th>
                  <th className="py-4 text-center text-glow">Pro</th>
                  <th className="py-4 text-center text-gray-300">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-4">Clipboard monitoring</td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Number of clips</td>
                  <td className="py-4 text-center">100</td>
                  <td className="py-4 text-center">Unlimited</td>
                  <td className="py-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">AI-powered search</td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Cloud sync</td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">Team collaboration</td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-4">API access</td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-times text-red-400"></i></td>
                  <td className="py-4 text-center"><i className="fas fa-check text-green-400"></i></td>
                </tr>
                <tr>
                  <td className="py-4">Support level</td>
                  <td className="py-4 text-center">Community</td>
                  <td className="py-4 text-center">Email</td>
                  <td className="py-4 text-center">24/7 Priority</td>
                </tr>
              </tbody>
            </table>
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
                onClick={() => window.open('https://drive.usercontent.google.com/download?id=1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv&export=download&authuser=0', '_blank')}
              >
                <i className="fas fa-download mr-2"></i>
                Start Free Today
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
