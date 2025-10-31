import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlayCircle, Droplet, Flame, Sparkles } from "lucide-react";

interface Test {
  id: number;
  title: string;
  item: string;
  icon: string;
  description: string;
  test: string;
  videoUrl: string;
}

const adulterationTests: Test[] = [
  {
    id: 1,
    title: "Milk Purity Test",
    item: "Milk",
    icon: "🥛",
    description: "Detect water and starch adulteration in milk",
    test: "Add a drop of milk on a slanted surface. Pure milk flows slowly and leaves a white trail. Adulterated milk flows quickly without leaving a mark.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Oil Quality Check",
    item: "Cooking Oil",
    icon: "🛢️",
    description: "Identify mineral oil and argemone oil",
    test: "Place a drop of oil on paper and hold it against light. Pure oil doesn't leave a permanent translucent mark. Adulterated oil creates a visible stain.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Turmeric Powder Test",
    item: "Turmeric",
    icon: "🌾",
    description: "Check for lead chromate and artificial colors",
    test: "Add turmeric to water in a glass. Pure turmeric settles down slowly. If it contains chalk powder, it will settle immediately.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Red Chili Test",
    item: "Red Chili Powder",
    icon: "🌶️",
    description: "Detect artificial colors and brick powder",
    test: "Sprinkle chili powder on water surface. Pure powder floats. Adulterated powder with brick dust will sink immediately.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Sugar Purity Test",
    item: "Sugar",
    icon: "🍬",
    description: "Identify chalk powder contamination",
    test: "Dissolve sugar in water. Pure sugar dissolves completely. Chalk powder will settle at the bottom as white residue.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Honey Authenticity",
    item: "Honey",
    icon: "🍯",
    description: "Check for sugar syrup and water",
    test: "Light a matchstick and dip it in honey. Pure honey will ignite and burn. Adulterated honey won't catch fire due to moisture.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const FoodAdulteration = () => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🔬</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Food Adulteration Detection
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn simple home tests to detect common food adulterations and ensure your family's safety
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <Droplet className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Simple Tests</h3>
              <p className="text-sm text-muted-foreground">
                Easy to perform at home with common items
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
            <CardContent className="p-6 text-center">
              <Flame className="h-12 w-12 text-secondary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Quick Results</h3>
              <p className="text-sm text-muted-foreground">
                Get instant feedback on food quality
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Stay Safe</h3>
              <p className="text-sm text-muted-foreground">
                Protect your family from harmful substances
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adulterationTests.map((test, index) => (
            <div
              key={test.id}
              className="group perspective-1000 h-80 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
                {/* Front */}
                <Card className="absolute w-full h-full backface-hidden bg-gradient-to-br from-card to-muted border-2 border-border hover:border-primary transition-colors">
                  <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="text-6xl mb-4">{test.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {test.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{test.description}</p>
                    <div className="text-sm text-primary font-semibold">
                      Hover to see test →
                    </div>
                  </CardContent>
                </Card>

                {/* Back */}
                <Card className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary">
                  <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <h3 className="text-lg font-bold mb-3 text-foreground">How to Test:</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {test.test}
                    </p>
                    <Button
                      onClick={() => setSelectedTest(test)}
                      className="bg-primary hover:bg-primary/90 group/btn"
                    >
                      <PlayCircle className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Watch Demo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 via-background to-secondary/5">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Safety Tips When Testing Food
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Use small quantities</h4>
                  <p className="text-sm text-muted-foreground">
                    Only small samples are needed for effective testing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Proper lighting</h4>
                  <p className="text-sm text-muted-foreground">
                    Good lighting helps observe color changes accurately
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Clean equipment</h4>
                  <p className="text-sm text-muted-foreground">
                    Use clean, dry containers to avoid false results
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary text-2xl">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Report findings</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact food safety authorities if adulteration is found
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-3xl">{selectedTest?.icon}</span>
              {selectedTest?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={selectedTest?.videoUrl}
              title={selectedTest?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-muted-foreground">{selectedTest?.test}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FoodAdulteration;
