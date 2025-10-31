import { Link, useLocation } from "react-router-dom";
import { Apple, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "BMI", path: "/bmi" },
    { name: "Quiz", path: "/quiz" },
    { name: "Diet Guide", path: "/diet" },
    { name: "Food Safety", path: "/food-adulteration" },
    { name: "Diseases", path: "/lifestyle-diseases" },
    { name: "Mentor", path: "/mentor" },
    { name: "Community", path: "/community" },
    { name: "Videos", path: "/videos" },
    { name: "Feedback", path: "/feedback" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-full p-2 group-hover:scale-110 transition-transform">
              <Apple className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Healthy You
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-accent/10"
                  }
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent/10"
                    }`}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
