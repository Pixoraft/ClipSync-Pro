import { useState } from "react";

interface DemoClip {
  id: number;
  text: string;
  timestamp: string;
}

export default function InteractiveDemo() {
  const [demoClips, setDemoClips] = useState<DemoClip[]>([]);

  const simulateCopy = (text: string) => {
    const newClip: DemoClip = {
      id: Date.now(),
      text,
      timestamp: "Just now"
    };

    setDemoClips(prev => [newClip, ...prev.slice(0, 4)]);
    
    // Show notification
    showNotification('Text copied to ClipFlow Pro!');
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-24 right-6 bg-gradient-to-r from-electric to-cyber p-4 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas fa-check-circle text-white"></i>
        <span class="text-white font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  };

  const demoActions = [
    {
      label: "Copy a website URL",
      text: "https://www.example.com/amazing-article"
    },
    {
      label: "Copy product description", 
      text: "Premium clipboard manager with AI-powered features and secure local storage."
    },
    {
      label: "Copy code snippet",
      text: "const clipManager = new ClipboardManager({ autoSave: true, encryption: true });"
    }
  ];

  return (
    <div className="glass-morphism rounded-3xl p-8 glow-effect">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Demo Controls */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-glow mb-6">Try the Demo</h3>
          
          <div className="space-y-4">
            {demoActions.map((action, index) => (
              <button
                key={index}
                onClick={() => simulateCopy(action.text)}
                className="w-full glass-morphism rounded-xl p-4 text-left hover:bg-opacity-30 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{action.label}</span>
                  <i className="fas fa-arrow-right text-glow group-hover:translate-x-2 transition-transform"></i>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Live Demo App */}
        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-glow">ClipFlow Pro Demo</span>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <i className="fas fa-sync text-xs"></i>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <i className="fas fa-cog text-xs"></i>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="glass-morphism rounded-lg p-2 flex items-center">
              <i className="fas fa-search text-gray-400 mr-2"></i>
              <input 
                type="text" 
                placeholder="Search clips..." 
                className="bg-transparent flex-1 outline-none text-sm text-white placeholder-gray-400" 
                readOnly
              />
            </div>
          </div>

          {/* Clip List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {demoClips.length === 0 ? (
              <div className="glass-morphism rounded-lg p-3 opacity-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs text-gray-400 truncate">Click a button to add clips...</p>
                    <p className="text-xs text-gray-500">Demo mode</p>
                  </div>
                </div>
              </div>
            ) : (
              demoClips.map((clip) => (
                <div 
                  key={clip.id}
                  className="glass-morphism rounded-lg p-3 hover:bg-opacity-30 transition-all duration-300 group animate-slide-up"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-gray-300 truncate">{clip.text}</p>
                      <p className="text-xs text-gray-500">{clip.timestamp}</p>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:text-glow transition-colors">
                        <i className="fas fa-copy text-xs"></i>
                      </button>
                      <button className="p-1 hover:text-red-400 transition-colors">
                        <i className="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
