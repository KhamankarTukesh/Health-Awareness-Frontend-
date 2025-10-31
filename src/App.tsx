import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import BMI from "./pages/BMI";
import Quiz from "./pages/Quiz";
import Diet from "./pages/Diet";
import FoodAdulteration from "./pages/FoodAdulteration";
import LifestyleDiseases from "./pages/LifestyleDiseases";
import Mentor from "./pages/Mentor";
import Community from "./pages/Community";
import Videos from "./pages/Videos";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bmi" element={<BMI />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/food-adulteration" element={<FoodAdulteration />} />
            <Route path="/lifestyle-diseases" element={<LifestyleDiseases />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/community" element={<Community />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
