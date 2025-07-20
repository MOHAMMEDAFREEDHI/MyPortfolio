import { useState } from "react";
import Loader from "@/components/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as RadixToaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./components/Auth";
import NotFound from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <RadixToaster />
          <SonnerToaster />

          <AnimatePresence mode="wait">
            {loading ? (
              <Loader onComplete={() => setLoading(false)} />
            ) : (
              <motion.div
                key="main-content"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { delay: 0.2 },
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Router>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </motion.div>
            )}
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
