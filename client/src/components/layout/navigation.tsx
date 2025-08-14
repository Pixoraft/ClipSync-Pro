import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about.html", label: "About" },
    { href: "/pricing.html", label: "Pricing" },
    { href: "/downloads.html", label: "Downloads" },
    { href: "/contact.html", label: "Contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-morphism py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyber glow-effect flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-clipboard-list text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-glow">ClipFlow Pro</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span className={`hover:text-glow transition-colors duration-300 cursor-pointer ${
                  window.location.pathname === link.href ? 'text-glow' : 'text-gray-300'
                }`}>
                  {link.label}
                </span>
              </a>
            ))}
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
