
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FarmerRegistration from "./pages/FarmerRegistration";
import CompanyRegistration from "./pages/CompanyRegistration";
import FarmerListings from "./pages/FarmerListings";
import WasteProducts from "./pages/WasteProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/company-registration" element={<CompanyRegistration />} />
          <Route path="/farmer-listings" element={<FarmerListings />} />
          <Route path="/waste-products" element={<WasteProducts />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
