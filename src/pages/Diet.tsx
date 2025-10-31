import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Download, Utensils } from "lucide-react";
import { toast } from "sonner";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FoodGroup {
  name: string;
  color: string;
  percentage: number;
  description: string;
  examples: string[];
}

const foodGroups: FoodGroup[] = [
  {
    name: "Fruits & Vegetables",
    color: "hsl(122, 39%, 49%)",
    percentage: 40,
    description: "Rich in vitamins, minerals, and fiber",
    examples: ["Apples", "Broccoli", "Carrots", "Spinach", "Berries"],
  },
  {
    name: "Grains & Cereals",
    color: "hsl(36, 100%, 50%)",
    percentage: 25,
    description: "Main source of energy and fiber",
    examples: ["Brown rice", "Oats", "Whole wheat bread", "Quinoa"],
  },
  {
    name: "Protein Foods",
    color: "hsl(0, 84%, 60%)",
    percentage: 20,
    description: "Essential for building and repairing tissues",
    examples: ["Chicken", "Fish", "Eggs", "Beans", "Tofu"],
  },
  {
    name: "Dairy",
    color: "hsl(200, 80%, 50%)",
    percentage: 10,
    description: "Calcium and vitamin D for strong bones",
    examples: ["Milk", "Yogurt", "Cheese", "Fortified alternatives"],
  },
  {
    name: "Fats & Oils",
    color: "hsl(45, 100%, 50%)",
    percentage: 5,
    description: "Healthy fats for brain and heart health",
    examples: ["Olive oil", "Avocado", "Nuts", "Seeds"],
  },
];

const Diet = () => {
  const [selectedGroup, setSelectedGroup] = useState<FoodGroup | null>(null);
  const [draggedFood, setDraggedFood] = useState<string | null>(null);
  const [plateItems, setPlateItems] = useState<string[]>([]);

  const chartData = {
    labels: foodGroups.map((g) => g.name),
    datasets: [
      {
        data: foodGroups.map((g) => g.percentage),
        backgroundColor: foodGroups.map((g) => g.color),
        borderColor: "white",
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            family: "Poppins",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
    onClick: (_event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setSelectedGroup(foodGroups[index]);
      }
    },
  };

  const allFoods = foodGroups.flatMap((group) =>
    group.examples.map((food) => ({ food, group: group.name }))
  );

  const handleDragStart = (food: string) => {
    setDraggedFood(food);
  };

  const handleDrop = () => {
    if (draggedFood && !plateItems.includes(draggedFood)) {
      setPlateItems([...plateItems, draggedFood]);
      toast.success(`Added ${draggedFood} to your plate!`);
    }
    setDraggedFood(null);
  };

  const handleDownloadBrochure = () => {
    toast.success("Brochure download started! (Demo)");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Balanced Diet Guide
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn about the five essential food groups for optimal health
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Chart Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Food Groups Distribution
              </CardTitle>
              <CardDescription>
                Click on any section to learn more about that food group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedGroup ? selectedGroup.name : "Food Group Details"}
              </CardTitle>
              <CardDescription>
                {selectedGroup
                  ? "Nutritional information and examples"
                  : "Click on a section of the chart to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedGroup ? (
                <div className="space-y-4">
                  <div
                    className="h-3 rounded-full"
                    style={{ backgroundColor: selectedGroup.color }}
                  />
                  <div>
                    <h4 className="font-semibold mb-2">Benefits:</h4>
                    <p className="text-muted-foreground">{selectedGroup.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedGroup.examples.map((example) => (
                        <span
                          key={example}
                          className="bg-muted px-3 py-1 rounded-full text-sm"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="text-2xl font-bold text-primary">
                      {selectedGroup.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of your daily diet
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-muted-foreground">
                    Select a food group from the chart to see detailed information
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Build Your Plate Game */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>🍽️ Build Your Balanced Plate</CardTitle>
            <CardDescription>
              Drag and drop foods to create a balanced meal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Available Foods */}
              <div>
                <h4 className="font-semibold mb-4">Available Foods:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {allFoods.map(({ food, group }) => (
                    <div
                      key={food}
                      draggable
                      onDragStart={() => handleDragStart(food)}
                      className="bg-muted p-3 rounded-lg cursor-move hover:bg-primary/10 transition-colors border-2 border-transparent hover:border-primary"
                    >
                      <div className="font-medium">{food}</div>
                      <div className="text-xs text-muted-foreground">{group}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plate */}
              <div>
                <h4 className="font-semibold mb-4">Your Plate:</h4>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="min-h-[300px] bg-gradient-to-br from-muted to-muted/50 rounded-full border-4 border-dashed border-primary/30 p-6 flex flex-col items-center justify-center"
                >
                  {plateItems.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                      <div className="text-4xl mb-2">🍽️</div>
                      <p>Drag foods here</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {plateItems.map((item, index) => (
                        <span
                          key={index}
                          className="bg-card px-3 py-2 rounded-full text-sm font-medium shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                {plateItems.length > 0 && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setPlateItems([])}
                  >
                    Clear Plate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Download Our Nutrition Guide
                </h3>
                <p className="text-muted-foreground">
                  Get a comprehensive PDF brochure with healthy eating tips
                </p>
              </div>
              <Button
                onClick={handleDownloadBrochure}
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diet;
