import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SEOHead from "@/components/seo/SEOHead";

export default function About() {
  const storySection = useScrollAnimation({ threshold: 0.3 });
  const missionSection = useScrollAnimation({ threshold: 0.2 });
  const teamSection = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {}, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ClipSync Pro",
    "description": "Learn about ClipSync Pro's mission to revolutionize clipboard management through intelligent tools and seamless productivity solutions.",
    "mainEntity": {
      "@type": "Organization",
      "name": "ClipSync Pro",
      "description": "Creators of premium clipboard management software",
      "foundingDate": "2024",
      "mission": "To empower professionals and creators with intelligent tools that seamlessly integrate into their workflow, making digital productivity effortless and intuitive."
    }
  };

  return (
    <div className="relative pt-20">
      <SEOHead
        title="About ClipSync Pro - Premium Clipboard Manager Company | Our Story"
        description="Learn about ClipSync Pro's mission to revolutionize clipboard management for Windows and Linux users. Discover our commitment to free, secure, and powerful productivity software."
        keywords="about ClipSync Pro, clipboard manager company, productivity software developers, Windows Linux clipboard tools, free software mission, clipboard management innovation"
        canonical="https://clipsync-pro.replit.app/about"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-glow animate-fade-in">
            About ClipSync Pro
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed animate-slide-up delay-200">
            Revolutionizing how professionals manage their digital workflow through 
            intelligent clipboard management and seamless productivity tools.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-midnight to-navy" ref={storySection.ref}>
        <div className="max-w-4xl mx-auto px-6">
          <div 
            className={`glass-morphism rounded-3xl p-8 md:p-12 space-y-8 transition-all duration-1000 premium-glass-hover ${
              storySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
              e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
            }}
          >
            <h2 className="text-3xl font-bold text-glow mb-8 animate-slide-left">Our Story</h2>
            
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                ClipFlow Pro was born from a simple frustration: losing important text and links 
                that were copied but never properly saved. As developers and content creators, 
                we constantly juggle multiple pieces of information, from code snippets to URLs, 
                from documentation to creative ideas.
              </p>
              
              <p>
                Traditional clipboard managers felt outdated and clunky. We envisioned something 
                different - a premium tool that would anticipate our needs, work seamlessly in 
                the background, and provide instant access to our digital thoughts and discoveries.
              </p>
              
              <p>
                After months of development and refinement, ClipFlow Pro emerged as more than 
                just a clipboard manager. It's an intelligent productivity companion that learns 
                from your workflow and enhances your digital experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 premium-gradient" ref={missionSection.ref}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div 
              className={`glass-morphism rounded-3xl p-8 space-y-6 transition-all duration-1000 premium-glass-hover ${
                missionSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-electric to-cyber rounded-2xl flex items-center justify-center mb-6 glow-effect">
                <i className="fas fa-bullseye text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-glow">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower professionals and creators with intelligent tools that seamlessly 
                integrate into their workflow, making digital productivity effortless and intuitive.
              </p>
            </div>

            <div 
              className={`glass-morphism rounded-3xl p-8 space-y-6 transition-all duration-1000 delay-200 premium-glass-hover ${
                missionSection.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyber to-electric rounded-2xl flex items-center justify-center mb-6 glow-effect animate-bounce-in delay-300">
                <i className="fas fa-eye text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-glow">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                A world where digital tools anticipate user needs, where productivity flows 
                naturally, and where technology enhances creativity rather than hindering it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="py-20 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">Platform Support</h2>
            <p className="text-xl text-gray-300">
              Built primarily for Linux, with experimental Windows support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div 
              className="glass-morphism rounded-3xl p-8 border-2 border-green-500 glow-effect premium-glass-hover"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <i className="fab fa-linux text-4xl text-green-400"></i>
                <div>
                  <h3 className="text-2xl font-bold text-glow">Linux</h3>
                  <p className="text-green-400 font-semibold">Fully Supported</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <i className="fas fa-check text-green-400 mr-3"></i>
                  <span>Native performance optimization</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-400 mr-3"></i>
                  <span>Full feature compatibility</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-400 mr-3"></i>
                  <span>Regular updates and support</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-check text-green-400 mr-3"></i>
                  <span>Seamless system integration</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 transform transition-all duration-300"
                onClick={() => window.open('https://drive.usercontent.google.com/download?id=1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv&export=download&authuser=0', '_blank')}
              >
                <i className="fas fa-download mr-2"></i>
                Download .deb Package
              </Button>
            </div>

            <div 
              className="glass-morphism rounded-3xl p-8 border border-yellow-500 premium-glass-hover"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <i className="fab fa-windows text-4xl text-yellow-400"></i>
                <div>
                  <h3 className="text-2xl font-bold text-glow">Windows</h3>
                  <p className="text-yellow-400 font-semibold">Experimental</p>
                </div>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-yellow-400 mr-3"></i>
                  <span>Limited compatibility</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-yellow-400 mr-3"></i>
                  <span>Occasional stability issues</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-exclamation-triangle text-yellow-400 mr-3"></i>
                  <span>Reduced feature set</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-info-circle text-blue-400 mr-3"></i>
                  <span>Community support only</span>
                </li>
              </ul>
              <Button 
                variant="outline"
                className="w-full mt-6 border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all duration-300"
                onClick={() => window.open('https://drive.google.com/file/d/1XMqhRZPbnYYs898RalbmoWVJNS7bc7sw/view', '_blank')}
              >
                <i className="fas fa-download mr-2"></i>
                Download Windows Version
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-12 space-y-8">
            <div className="w-24 h-24 bg-gradient-to-br from-electric to-cyber rounded-full flex items-center justify-center mx-auto glow-effect">
              <i className="fas fa-code text-white text-3xl"></i>
            </div>
            
            <h2 className="text-3xl font-bold text-glow">Meet the Developer</h2>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              ClipSync Pro is crafted with passion by Vivek, a dedicated developer who believes 
              in creating tools that truly enhance productivity. With years of experience in 
              software development and a deep understanding of user workflow patterns, 
              every feature is designed with purpose and precision.
            </p>
            
            <Button 
              className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 glow-effect"
              onClick={() => window.open('https://vivek-rvt.onrender.com', '_blank')}
            >
              <i className="fas fa-globe mr-2"></i>
              View Portfolio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
