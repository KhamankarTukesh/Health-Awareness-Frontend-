import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Target, Users, Lightbulb, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Nutrition Expert",
      emoji: "👩‍⚕️",
      contact: "sarah@healthyyou.com"
    },
    {
      name: "Mike Chen",
      role: "Fitness Coach",
      emoji: "💪",
      contact: "mike@healthyyou.com"
    },
    {
      name: "Emma Williams",
      role: "Wellness Counselor",
      emoji: "🧘‍♀️",
      contact: "emma@healthyyou.com"
    },
    {
      name: "Alex Kumar",
      role: "Food Science Specialist",
      emoji: "🔬",
      contact: "alex@healthyyou.com"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Store message locally (ready for backend integration)
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    toast({
      title: "Message Sent! 📧",
      description: "We'll get back to you soon."
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Healthy You
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Your trusted companion on the journey to better health
          </p>
        </div>

        <div className="space-y-8">
          {/* Mission */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    At Healthy You, we believe that nutrition education should be accessible,
                    engaging, and fun. Our mission is to empower individuals with the knowledge
                    and tools they need to make informed decisions about their diet and health.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Lightbulb className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">What We Offer</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>BMI Calculator:</strong> Track your body mass index and get
                        personalized health insights
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Interactive Quizzes:</strong> Test and improve your nutrition
                        knowledge through gamified learning
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Balanced Diet Guide:</strong> Learn about essential food groups
                        with interactive visualizations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>
                        <strong>Educational Resources:</strong> Access comprehensive guides and
                        downloadable materials
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Healthy You is more than just a website—it's a growing community of
                    health-conscious individuals committed to living their best lives. Whether
                    you're just starting your wellness journey or looking to deepen your
                    nutrition knowledge, you're in the right place.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Values */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">Our Core Values</h2>
                  <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Evidence-based information</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>User-friendly design</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Interactive learning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Continuous improvement</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <Card key={idx} className="text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="pt-6">
                    <div className="text-6xl mb-4 animate-float">{member.emoji}</div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                    <a 
                      href={`mailto:${member.contact}`}
                      className="text-xs text-primary hover:underline"
                    >
                      {member.contact}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mission & Vision with Gradient Animation */}
          <Card className="mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 animate-pulse-glow"></div>
            <CardContent className="relative pt-8 pb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower individuals worldwide with accessible, engaging, and scientifically-backed nutrition education that transforms lives and builds healthier communities.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-secondary" />
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where everyone has the knowledge and tools to make informed health choices, leading to a global community that thrives on wellness and vitality.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@healthyyou.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>123 Wellness Street, Health City, HC 12345</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our tools and resources to take control of your nutrition today
            </p>
            <div className="text-6xl animate-float">🌱</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
