import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import FloatingFruit from "@/components/FloatingFruit";
import { Sparkles, Calculator } from "lucide-react";

const quotes = [
  "Let food be thy medicine and medicine be thy food. - Hippocrates",
  "Take care of your body. It's the only place you have to live. - Jim Rohn",
  "Your body is a temple, but only if you treat it as one. - Astrid Alauda",
  "Health is not about the weight you lose, but the life you gain.",
  "Eat well, live well, be well.",
];

const Home = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <FloatingFruit emoji="🍎" left="10%" top="15%" delay={0} />
        <FloatingFruit emoji="🥕" left="80%" top="20%" delay={1} size="text-5xl" />
        <FloatingFruit emoji="🥦" left="15%" top="70%" delay={2} size="text-7xl" />
        <FloatingFruit emoji="🍌" left="85%" top="65%" delay={3} />
        <FloatingFruit emoji="🍊" left="50%" top="10%" delay={1.5} size="text-5xl" />
        <FloatingFruit emoji="🥬" left="70%" top="85%" delay={2.5} size="text-6xl" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse-glow">
              Healthy You
            </span>
          </h1>
          
          <p className="text-3xl md:text-4xl font-semibold text-foreground/80 mb-8">
            Eat Smart. Live Strong.
          </p>

          {/* Quote Slider */}
          <div className="min-h-[80px] mb-12">
            <p className="text-lg md:text-xl text-muted-foreground italic transition-all duration-500 animate-fade-in">
              "{quotes[currentQuote]}"
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:glow-green"
              onClick={() => navigate("/diet")}
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Learning
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:glow-orange"
              onClick={() => navigate("/bmi")}
            >
              <Calculator className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Check Your BMI
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/bmi")}>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">BMI Calculator</h3>
              <p className="text-muted-foreground">Track your health with instant BMI analysis</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/quiz")}>
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Fun Quizzes</h3>
              <p className="text-muted-foreground">Test your nutrition knowledge</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/diet")}>
              <div className="text-4xl mb-4">🥗</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Diet Guide</h3>
              <p className="text-muted-foreground">Learn about balanced nutrition</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/food-adulteration")}>
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Food Safety</h3>
              <p className="text-muted-foreground">Detect adulteration in common foods</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/lifestyle-diseases")}>
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Health Awareness</h3>
              <p className="text-muted-foreground">Learn about lifestyle diseases</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/mentor")}>
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Personal Mentor</h3>
              <p className="text-muted-foreground">Get your personalized health plan</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/community")}>
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Community Hub</h3>
              <p className="text-muted-foreground">Connect with health enthusiasts</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/videos")}>
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Video Library</h3>
              <p className="text-muted-foreground">Watch educational health videos</p>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-border cursor-pointer" onClick={() => navigate("/feedback")}>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Your Feedback</h3>
              <p className="text-muted-foreground">Help us improve the platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
