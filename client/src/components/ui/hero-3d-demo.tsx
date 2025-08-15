import { useEffect, useState } from "react";

interface ClipItem {
  id: number;
  text: string;
  timestamp: string;
  isActive?: boolean;
}

export default function Hero3DDemo() {
  const [clips, setClips] = useState<ClipItem[]>([
    { id: 1, text: "https://clipsync.pro/features...", timestamp: "2 minutes ago" },
    { id: 2, text: "Premium clipboard manager app", timestamp: "5 minutes ago", isActive: true },
    { id: 3, text: "AI-powered workflow automation", timestamp: "1 hour ago" },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyClick = (id: number) => {
    console.log(`Copying clip ${id}`);
    // Add visual feedback here
  };

  const handleDeleteClick = (id: number) => {
    setClips(prev => prev.filter(clip => clip.id !== id));
  };

  return (
    <div className={`relative flex justify-center transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
    }`}>
      <div className="app-mockup animate-float">
        {/* Main App Window */}
        <div className="glass-morphism rounded-3xl p-8 w-80 h-96 glow-effect">
          {/* App Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <i className="fas fa-search text-gray-400"></i>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <i className="fas fa-sync text-glow"></i>
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                <i className="fas fa-cog text-gray-400"></i>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="glass-morphism rounded-xl p-3 flex items-center space-x-3">
              <i className="fas fa-search text-gray-400"></i>
              <input 
                type="text" 
                placeholder="Search clips..." 
                className="bg-transparent flex-1 outline-none text-sm text-white placeholder-gray-400" 
                readOnly
              />
            </div>
          </div>

          {/* Clip List */}
          <div className="space-y-3 hover-3d-container">
            {clips.map((clip, index) => (
              <div 
                key={clip.id}
                className={`glass-morphism rounded-xl p-3 transition-all duration-300 group hover:bg-opacity-30 hover-3d-item relative premium-glass-hover ${
                  clip.isActive ? 'bg-electric bg-opacity-20 border-electric glow-effect' : ''
                } ${isVisible ? 'animate-slide-up' : ''}`}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                }}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => handleCopyClick(clip.id)}>
                    <p className={`text-sm truncate ${
                      clip.isActive ? 'text-white font-medium' : 'text-gray-300'
                    }`}>
                      {clip.text}
                    </p>
                    <p className="text-xs text-gray-500">{clip.timestamp}</p>
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4">
                    <button 
                      className="p-2 rounded-lg glass-morphism hover:bg-electric hover:bg-opacity-30 hover:text-white hover:shadow-xl hover:scale-110 transition-all duration-300 transform hover:rotate-3d text-gray-400 hover:text-glow bg-opacity-80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyClick(clip.id);
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                      title="Copy to clipboard"
                    >
                      <i className="fas fa-copy text-xs"></i>
                    </button>
                    <button 
                      className="p-2 rounded-lg glass-morphism hover:bg-red-500 hover:bg-opacity-30 hover:text-white hover:shadow-xl hover:scale-110 transition-all duration-300 transform hover:rotate-3d text-gray-400 hover:text-red-300 bg-opacity-80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(clip.id);
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                      title="Delete clip"
                    >
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
