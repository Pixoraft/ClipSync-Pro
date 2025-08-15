import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/hooks/useParallax";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass-morphism py-2' : 'py-4'
    } ${
      scrollDirection === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyber glow-effect flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-clipboard-list text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-glow">ClipSync Pro</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`hover:text-glow transition-colors duration-300 cursor-pointer ${
                  location === link.href ? 'text-glow' : 'text-gray-300'
                }`}>
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/downloads">
              <Button 
                className="px-6 py-3 bg-gradient-to-r from-electric to-cyber rounded-xl font-semibold text-white hover:scale-105 transform transition-all duration-300 glow-effect"
                data-testid="button-download-nav"
              >
                Download Free
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">
              <i className="fas fa-bars text-xl"></i>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
