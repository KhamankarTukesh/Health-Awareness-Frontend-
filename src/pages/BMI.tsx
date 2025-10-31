import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "sonner";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  tip: string;
}

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bmiResult");
    if (saved) {
      setResult(JSON.parse(saved));
    }
  }, []);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to meters
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      toast.error("Please enter valid height and weight values");
      return;
    }

    const bmi = w / (h * h);
    let category = "";
    let color = "";
    let tip = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "hsl(var(--health-underweight))";
      tip = "Consider eating more nutrient-dense foods and consult a nutritionist.";
    } else if (bmi < 25) {
      category = "Normal Weight";
      color = "hsl(var(--health-normal))";
      tip = "Great job! Maintain your healthy lifestyle with balanced meals and exercise.";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "hsl(var(--health-overweight))";
      tip = "Focus on portion control and regular physical activity.";
    } else {
      category = "Obese";
      color = "hsl(var(--health-obese))";
      tip = "Consult a healthcare professional for a personalized weight management plan.";
    }

    const bmiResult = { bmi: parseFloat(bmi.toFixed(1)), category, color, tip };
    setResult(bmiResult);
    localStorage.setItem("bmiResult", JSON.stringify(bmiResult));
    toast.success("BMI calculated successfully!");
  };

  const percentage = result ? Math.min((result.bmi / 40) * 100, 100) : 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BMI Calculator
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Body Mass Index and get personalized health insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Enter Your Details
              </CardTitle>
              <CardDescription>
                Provide your height and weight to calculate your BMI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="text-lg"
                />
              </div>

              <Button
                onClick={calculateBMI}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>Based on your measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Circular Progress */}
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="transform -rotate-90 w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke="hsl(var(--muted))"
                        strokeWidth="16"
                        fill="none"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        stroke={result.color}
                        strokeWidth="16"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        strokeDashoffset={`${2 * Math.PI * 80 * (1 - percentage / 100)}`}
                        className="transition-all duration-1000 ease-out"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold" style={{ color: result.color }}>
                        {result.bmi}
                      </span>
                      <span className="text-sm text-muted-foreground">BMI</span>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="text-center">
                  <div
                    className="inline-block px-6 py-2 rounded-full font-semibold text-white text-lg"
                    style={{ backgroundColor: result.color }}
                  >
                    {result.category}
                  </div>
                </div>

                {/* Health Tip */}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">Health Tip:</h4>
                  <p className="text-sm text-muted-foreground">{result.tip}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMI;
