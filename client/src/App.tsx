import { Switch, Route, useLocation } from "wouter";
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
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import BlogAdmin from "@/pages/blog-admin";
import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import ParticleBackground from "@/components/ui/particle-background";
import ScrollToTop from "@/components/ui/scroll-to-top";
import { useEffect, useState } from "react";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <div className="min-h-screen bg-midnight text-white relative overflow-x-hidden">
      {!isAdminRoute && <ParticleBackground />}
      {!isAdminRoute && <Navigation />}
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/contact" component={Contact} />
          <Route path="/downloads" component={Downloads} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/admin/blog" component={BlogAdmin} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTop />}
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
