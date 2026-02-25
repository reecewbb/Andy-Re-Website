import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import Programme from "@/pages/Programme";
import Curriculum from "@/pages/Curriculum";
import Coaches from "@/pages/Coaches";
import Locations from "@/pages/Locations";
import Testimonials from "@/pages/Testimonials";
import FAQ from "@/pages/FAQ";
import Apply from "@/pages/Apply";
import ThankYou from "@/pages/ThankYou";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
import Cookies from "@/pages/legal/Cookies";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/programme" component={Programme} />
      <Route path="/curriculum" component={Curriculum} />
      <Route path="/coaches" component={Coaches} />
      <Route path="/locations" component={Locations} />
      <Route path="/testimonials" component={Testimonials} />
      <Route path="/faq" component={FAQ} />
      <Route path="/apply" component={Apply} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Nav />
        <main>
          <Router />
        </main>
        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
