import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BhajanLanding from "./pages/BhajanLanding";
import SubdivisionPage from "./pages/SubdivisionPage";
import BhajanPage from "./pages/BhajanPage";
import ComingSoon from "./pages/ComingSoon";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter basename="/tatva-ka-arth">
            <Routes>
              <Route path="/" element={<Index />} />

              <Route path="/bhajan" element={<BhajanLanding />} />
              <Route path="/bhajan/:subdivisionId" element={<SubdivisionPage />} />
              <Route path="/bhajan/:subdivisionId/:bhajanId" element={<BhajanPage />} />

              <Route path="/pooja" element={<ComingSoon title="पूजा | Pooja" />} />
              <Route path="/granth" element={<ComingSoon title="ग्रंथ | Granth" />} />
              <Route path="/teeka" element={<ComingSoon title="टीका | Teeka" />} />
              <Route path="/paath" element={<ComingSoon title="पाठ | Paath" />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
