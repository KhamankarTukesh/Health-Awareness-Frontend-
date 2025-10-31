import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
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

          {/* CTA */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Health Journey?</h3>
            <p className="text-muted-foreground mb-6">
              Explore our tools and resources to take control of your nutrition today
            </p>
            <div className="text-6xl">🌱</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
