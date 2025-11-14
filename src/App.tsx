import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
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
import Seasonal from "./pages/Seasonal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Public Routes */}
              <Route path="/videos" element={<Videos />} />
              <Route path="/lifestyle-diseases" element={<LifestyleDiseases />} />
              <Route path="/seasonal" element={<Seasonal />} />
              
              {/* Protected Routes - Require Authentication */}
              <Route path="/bmi" element={
                <ProtectedRoute>
                  <BMI />
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              <Route path="/diet" element={
                <ProtectedRoute>
                  <Diet />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="/food-adulteration" element={
                <ProtectedRoute>
                  <FoodAdulteration />
                </ProtectedRoute>
              } />
              <Route path="/mentor" element={
                <ProtectedRoute requiredRole="user">
                  <Mentor />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute requiredRole="user">
                  <Feedback />
                </ProtectedRoute>
              } />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
