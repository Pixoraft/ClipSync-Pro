import { ReactNode, useState } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  gradient?: string;
  delay?: number;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient = "from-electric to-cyber",
  delay = 0 
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div 
      className="glass-morphism rounded-3xl p-8 hover:scale-105 transform transition-all duration-500 group opacity-0 animate-slide-up premium-glass-hover"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
        isHovered ? 'animate-pulse-glow scale-110' : ''
      }`}>
        <i className={`${icon} text-white text-2xl`}></i>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-glow">{title}</h3>
      <p className="text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
