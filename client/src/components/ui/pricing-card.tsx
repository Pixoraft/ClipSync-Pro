import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  delay?: number;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  onButtonClick,
  delay = 0
}: PricingCardProps) {
  return (
    <div 
      className={`glass-morphism rounded-3xl p-8 transition-all duration-500 hover:scale-105 relative opacity-0 animate-slide-up ${
        isPopular ? 'border-2 border-electric glow-effect' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-electric to-cyber px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="text-4xl font-black text-glow mb-2">{price}</div>
        <p className="text-gray-400">{description}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <i className="fas fa-check text-green-400 mr-3"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full py-3 font-semibold transition-all duration-300 ${
          isPopular 
            ? 'bg-gradient-to-r from-electric to-cyber rounded-xl hover:scale-105 glow-effect'
            : 'glass-morphism rounded-xl hover:bg-opacity-30'
        }`}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}
