import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Downloads() {
  useEffect(() => {
    document.title = "Download ClipFlow Pro - Free Clipboard Manager for Linux & Windows";
  }, []);

  const downloadOptions = [
    {
      platform: "Linux",
      icon: "fab fa-linux",
      status: "Fully Supported",
      statusColor: "text-green-400",
      borderColor: "border-green-500",
      glowColor: "glow-effect",
      description: "Native performance with complete feature support",
      fileSize: "~15MB",
      requirements: "Ubuntu 18.04+ | Debian 10+ | Fedora 32+",
      downloadUrl: "https://drive.google.com/file/d/1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv/view?usp=drive_link",
      features: [
        "Full clipboard monitoring",
        "System tray integration",
        "Keyboard shortcuts",
        "Auto-start on boot",
        "Perfect stability",
        "Regular updates"
      ]
    },
    {
      platform: "Windows", 
      icon: "fab fa-windows",
      status: "Experimental",
      statusColor: "text-yellow-400",
      borderColor: "border-yellow-500",
      glowColor: "",
      description: "Limited compatibility with occasional stability issues",
      fileSize: "~18MB",
      requirements: "Windows 10+ | Windows 11",
      downloadUrl: "https://drive.google.com/file/d/1XMqhRZPbnYYs898RalbmoWVJNS7bc7sw/view?usp=drive_link",
      features: [
        "Basic clipboard capture",
        "Limited system integration",
        "Reduced feature set",
        "Community support only",
        "May have stability issues",
        "Experimental release"
      ]
    }
  ];

  return (
    <div className="relative pt-20">
      {/* Hero Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 text-glow">
            Download ClipFlow Pro
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Get the world's most advanced clipboard manager - completely free forever
          </p>
          
          <div className="glass-morphism rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center space-x-8 flex-wrap">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check text-green-400 text-xl"></i>
                <span className="text-gray-300 font-semibold">100% Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-blue-400 text-xl"></i>
                <span className="text-gray-300 font-semibold">No Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-lock text-purple-400 text-xl"></i>
                <span className="text-gray-300 font-semibold">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-infinity text-electric text-xl"></i>
                <span className="text-gray-300 font-semibold">Unlimited Usage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-20 bg-gradient-to-b from-midnight to-navy">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {downloadOptions.map((option, index) => (
              <div 
                key={index}
                className={`glass-morphism rounded-3xl p-8 border-2 ${option.borderColor} ${option.glowColor} opacity-0 animate-slide-up`}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <i className={`${option.icon} text-5xl ${option.statusColor}`}></i>
                  <div>
                    <h3 className="text-3xl font-bold text-glow">{option.platform}</h3>
                    <p className={`${option.statusColor} font-semibold text-lg`}>{option.status}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  {option.description}
                </p>

                {/* System Requirements */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">System Requirements</h4>
                  <p className="text-gray-300">{option.requirements}</p>
                  <p className="text-sm text-gray-400">File Size: {option.fileSize}</p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Features</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <i className={`fas fa-${option.platform === 'Linux' ? 'check text-green-400' : 'exclamation-triangle text-yellow-400'} mr-3`}></i>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download Button */}
                <Button 
                  className={`w-full py-4 font-bold text-lg transition-all duration-300 ${
                    option.platform === 'Linux' 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:scale-105 glow-effect'
                      : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:scale-105'
                  }`}
                  onClick={() => window.open(option.downloadUrl, '_blank')}
                >
                  <i className="fas fa-download mr-2"></i>
                  Download for {option.platform}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section className="py-20 premium-gradient">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-glow">Installation Instructions</h2>
            <p className="text-xl text-gray-300">
              Simple setup process for both platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Linux Instructions */}
            <div className="glass-morphism rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <i className="fab fa-linux text-3xl text-green-400"></i>
                <h3 className="text-2xl font-bold text-glow">Linux Installation</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-gray-300"><strong>Download</strong> the .deb package file</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-gray-300"><strong>Install</strong> using your package manager:</p>
                    <code className="block mt-2 p-3 bg-gray-900 rounded-lg text-green-400 text-sm font-mono">
                      sudo dpkg -i clipflow-pro.deb
                    </code>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-gray-300"><strong>Launch</strong> from applications menu or terminal</p>
                    <code className="block mt-2 p-3 bg-gray-900 rounded-lg text-green-400 text-sm font-mono">
                      clipflow-pro
                    </code>
                  </div>
                </div>
              </div>
            </div>

            {/* Windows Instructions */}
            <div className="glass-morphism rounded-3xl p-8 space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <i className="fab fa-windows text-3xl text-yellow-400"></i>
                <h3 className="text-2xl font-bold text-glow">Windows Installation</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-gray-300"><strong>Download</strong> the executable file</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-gray-300"><strong>Run as Administrator</strong> and follow setup wizard</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-gray-300"><strong>Note:</strong> May require Windows Defender exclusion</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-500 rounded-lg p-4 mt-6">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-exclamation-triangle text-yellow-400"></i>
                  <span className="text-yellow-400 font-semibold">Windows Notice</span>
                </div>
                <p className="text-gray-300 text-sm mt-2">
                  The Windows version is experimental and may have compatibility issues. 
                  We recommend the Linux version for the best experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 bg-gradient-to-b from-navy to-midnight">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-morphism rounded-3xl p-12 space-y-8">
            <h2 className="text-4xl font-black text-glow">Need Help?</h2>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              Having trouble with installation or need support? We're here to help!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="px-8 py-4 bg-gradient-to-r from-electric to-cyber rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 glow-effect"
                onClick={() => window.location.href = '/contact'}
              >
                <i className="fas fa-life-ring mr-2"></i>
                Get Support
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-4 glass-morphism rounded-xl font-semibold hover:bg-opacity-20 transition-all duration-300"
                onClick={() => window.open('https://vivek-rvt.onrender.com', '_blank')}
              >
                <i className="fas fa-user-circle mr-2"></i>
                Developer Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}