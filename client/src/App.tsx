import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Pricing from "@/pages/pricing";
import Contact from "@/pages/contact";
import Downloads from "@/pages/downloads";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ParticleBackground from "@/components/ui/particle-background";
import { useEffect, useState } from "react";

function Router() {
  // Redirect to HTML pages immediately
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') {
      window.location.replace('/home.html');
    } else if (path === '/about') {
      window.location.replace('/about.html');
    } else if (path === '/pricing') {
      window.location.replace('/pricing.html');
    } else if (path === '/downloads') {
      window.location.replace('/downloads.html');
    } else if (path === '/contact') {
      window.location.replace('/contact.html');
    }
  }, []);

  return (
    <div className="min-h-screen bg-midnight text-white relative overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={Contact} />
          <Route path="/downloads" component={Downloads} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
