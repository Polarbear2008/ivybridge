
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="/programs" element={<NotFound />} />
          <Route path="/programs/season-1" element={<NotFound />} />
          <Route path="/programs/season-2" element={<NotFound />} />
          <Route path="/programs/season-3" element={<NotFound />} />
          <Route path="/programs/season-4" element={<NotFound />} />
          <Route path="/success-stories" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/faq" element={<NotFound />} />
          <Route path="/careers" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
