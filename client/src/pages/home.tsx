import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TypingAnimation from "@/components/ui/typing-animation";
import Hero3DDemo from "@/components/ui/hero-3d-demo";
import FeatureCard from "@/components/ui/feature-card";
import InteractiveDemo from "@/components/ui/interactive-demo";
import PricingCard from "@/components/ui/pricing-card";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = "ClipFlow Pro - Premium Clipboard Manager for Linux & Windows";
    setIsVisible(true);
  }, []);

  const typingTexts = [
    "AI-powered clipboard manager...",
    "Secure local storage...",
    "Lightning fast search...",
    "Premium dark interface...",
    "Cross-platform sync..."
  ];

  const features = [
    {
      icon: "fas fa-clipboard-list",
      title: "Auto Clipboard Capture",
      description: "Automatically captures everything you copy with intelligent duplicate detection. Never manually save clips again.",
      gradient: "from-electric to-cyber"
    },
    {
      icon: "fas fa-search",
      title: "AI-Powered Search", 
      description: "Find any clip instantly with intelligent search that understands context and meaning, not just keywords.",
      gradient: "from-cyber to-electric"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure Local Storage",
      description: "All your clips are stored locally with enterprise-grade encryption. Your data never leaves your device.",
      gradient: "from-electric to-cyber"
    },
    {
      icon: "fas fa-bolt",
      title: "Lightning Fast",
      description: "Optimized for speed with instant search results and seamless copy-paste operations.",
      gradient: "from-cyber to-electric"
    },
    {
      icon: "fas fa-palette", 
      title: "Beautiful Dark UI",
      description: "Stunning dark interface with smooth animations and intuitive design that's easy on the eyes.",
      gradient: "from-electric to-cyber"
    },
    {
      icon: "fas fa-sync-alt",
      title: "Real-time Sync",
      description: "Instantly syncs across all your devices with seamless real-time updates and conflict resolution.",
      gradient: "from-cyber to-electric"
    }
  ];

  const pricingPlans = [
    {
      title: "ClipFlow Pro",
      price: "FREE",
      description: "Completely free forever",
      features: [
        "Unlimited clips storage",
        "Auto clipboard capture",
        "Smart search functionality",
        "Local secure storage",
        "Dark theme interface",
        "Cross-platform support",
        "Regular updates",
        "Community support"
      ],
      buttonText: "Download Free",
      isPopular: true,
      onButtonClick: () => window.location.href = '/downloads'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center premium-gradient overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-glow">Clipboard</span><br />
                <span className="bg-gradient-to-r from-electric to-cyber bg-clip-text text-transparent">Revolution</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Transform your copy-paste workflow with AI-powered clipboard management. 
                Never lose important text again.
              </p>
            </div>
            
            {/* Animated Text Demo */}
            <div className="glass-morphism rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400 ml-4">Live Clipboard Demo</span>
              </div>
              
              <div className="space-y-3">
                <TypingAnimation texts={typingTexts} />
                <div className="text-sm text-gray-400">
                  ↑ Auto-captured to ClipFlow Pro
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 glow-effect"
                onClick={() => window.open('https://drive.usercontent.google.com/download?id=1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv&export=download&authuser=0', '_blank')}
              >
                <i className="fas fa-download mr-2"></i>
                Download for Free
              </Button>
              <Button 
                variant="outline"
                className="px-8 py-4 glass-morphism rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-300"
              >
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Content - 3D App Mockup */}
          <Hero3DDemo />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-midnight to-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-glow">Powerful Features</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the most advanced clipboard management with AI-powered features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="py-20 premium-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-glow">See It In Action</h2>
            <p className="text-xl text-gray-300">
              Experience the power of ClipFlow Pro with our interactive demo
            </p>
          </div>

          <InteractiveDemo />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6 text-glow">100% Free Forever</h2>
            <p className="text-xl text-gray-300">
              Download ClipFlow Pro completely free with all features included
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md">
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
    </div>
  );
}
