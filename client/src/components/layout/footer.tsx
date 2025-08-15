import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-midnight border-t border-gray-800 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-cyber glow-effect flex items-center justify-center">
                <i className="fas fa-clipboard-list text-white"></i>
              </div>
              <span className="text-xl font-bold text-glow">ClipSync Pro</span>
            </div>
            <p className="text-gray-400">
              The world's most advanced clipboard manager, designed for professionals who value efficiency.
            </p>
            <div className="pt-4">
              <p className="text-sm text-gray-500">
                Created by{" "}
                <a 
                  href="https://vivek-rvt.onrender.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-glow hover:text-cyber transition-colors duration-300"
                >
                  Vivek
                </a>
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-glow">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/"><span className="hover:text-white transition-colors cursor-pointer">Features</span></Link></li>
              <li><Link href="/pricing"><span className="hover:text-white transition-colors cursor-pointer">Pricing</span></Link></li>
              <li><a href="https://drive.usercontent.google.com/download?id=1RTgAfIL8G-HhNpVVwLo_-u9pJy9C9AXv&export=download&authuser=0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Download Linux</a></li>
              <li><a href="https://drive.google.com/file/d/1XMqhRZPbnYYs898RalbmoWVJNS7bc7sw/view" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Download Windows</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-glow">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about"><span className="hover:text-white transition-colors cursor-pointer">About</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-white transition-colors cursor-pointer">Contact</span></Link></li>
              <li><a href="https://vivek-rvt.onrender.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><span className="text-gray-500">Support</span></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-glow">Platform Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fab fa-linux mr-2 text-glow"></i>
                <span>Linux (Fully Working)</span>
              </li>
              <li className="flex items-center">
                <i className="fab fa-windows mr-2 text-gray-500"></i>
                <span className="text-gray-500">Windows (Limited)</span>
              </li>
              <li className="text-xs text-gray-600 mt-2">
                *Windows version may have compatibility issues
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} ClipSync Pro. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://vivek-rvt.onrender.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-glow transition-colors">
              <i className="fas fa-globe text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-glow transition-colors">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-glow transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
