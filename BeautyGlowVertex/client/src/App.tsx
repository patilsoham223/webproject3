import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Makeup from "@/pages/makeup";
import Skincare from "@/pages/skincare";
import HairCare from "@/pages/haircare";
import Fashion from "@/pages/fashion";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import BlogPost from "@/pages/blog-post";
import Search from "@/pages/search";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/makeup" component={Makeup} />
          <Route path="/skincare" component={Skincare} />
          <Route path="/haircare" component={HairCare} />
          <Route path="/fashion" component={Fashion} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/post/:slug" component={BlogPost} />
          <Route path="/search" component={Search} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
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
