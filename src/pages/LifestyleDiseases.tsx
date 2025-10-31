import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AlertCircle, Heart, Activity } from "lucide-react";
import { toast } from "sonner";

interface Disease {
  id: number;
  name: string;
  icon: string;
  color: string;
  causes: string[];
  symptoms: string[];
  prevention: string[];
}

interface QuizQuestion {
  question: string;
  riskFactor: string;
}

const diseases: Disease[] = [
  {
    id: 1,
    name: "Diabetes",
    icon: "💉",
    color: "hsl(200, 80%, 50%)",
    causes: [
      "Excessive sugar consumption",
      "Sedentary lifestyle",
      "Genetic predisposition",
      "Obesity and poor diet",
    ],
    symptoms: [
      "Frequent urination",
      "Excessive thirst",
      "Unexplained weight loss",
      "Fatigue and blurred vision",
    ],
    prevention: [
      "Maintain healthy weight",
      "Regular physical activity",
      "Balanced diet with less sugar",
      "Regular health checkups",
    ],
  },
  {
    id: 2,
    name: "Hypertension",
    icon: "❤️",
    color: "hsl(0, 84%, 60%)",
    causes: [
      "High salt intake",
      "Stress and anxiety",
      "Lack of exercise",
      "Excessive alcohol consumption",
    ],
    symptoms: [
      "Headaches",
      "Chest pain",
      "Dizziness",
      "Shortness of breath",
    ],
    prevention: [
      "Reduce salt in diet",
      "Manage stress effectively",
      "Exercise regularly",
      "Limit alcohol intake",
    ],
  },
  {
    id: 3,
    name: "Obesity",
    icon: "⚖️",
    color: "hsl(36, 100%, 50%)",
    causes: [
      "Overeating and poor diet",
      "Physical inactivity",
      "Hormonal imbalances",
      "Genetic factors",
    ],
    symptoms: [
      "Excessive body fat",
      "Difficulty in movement",
      "Joint pain",
      "Breathing problems",
    ],
    prevention: [
      "Balanced nutrition",
      "Regular exercise",
      "Portion control",
      "Adequate sleep",
    ],
  },
];

const riskQuestions: QuizQuestion[] = [
  { question: "Do you exercise less than 3 times per week?", riskFactor: "physical" },
  { question: "Do you consume fast food more than twice a week?", riskFactor: "diet" },
  { question: "Do you have a family history of lifestyle diseases?", riskFactor: "genetic" },
  { question: "Do you sleep less than 6 hours per night?", riskFactor: "sleep" },
  { question: "Do you experience frequent stress or anxiety?", riskFactor: "mental" },
  { question: "Do you consume sugary drinks daily?", riskFactor: "diet" },
  { question: "Is your BMI over 25?", riskFactor: "weight" },
  { question: "Do you smoke or use tobacco?", riskFactor: "habit" },
];

const LifestyleDiseases = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [yesCount, setYesCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleQuizAnswer = (answer: boolean) => {
    if (answer) setYesCount(yesCount + 1);

    if (currentQuestion < riskQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRiskLevel = () => {
    if (yesCount <= 2) return { level: "Low", color: "text-green-600", message: "Great! You're maintaining a healthy lifestyle." };
    if (yesCount <= 4) return { level: "Moderate", color: "text-yellow-600", message: "Consider making some lifestyle improvements." };
    return { level: "High", color: "text-red-600", message: "Please consult a healthcare professional and make immediate lifestyle changes." };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setYesCount(0);
    setShowResult(false);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Lifestyle Diseases Awareness
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Understanding common lifestyle diseases and how to prevent them
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <p className="text-sm text-muted-foreground">
                Of deaths globally are due to lifestyle diseases
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-secondary mb-2">80%</div>
              <p className="text-sm text-muted-foreground">
                Of heart disease can be prevented with lifestyle changes
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">90%</div>
              <p className="text-sm text-muted-foreground">
                Of type 2 diabetes is preventable through healthy habits
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Disease Carousel */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Common Lifestyle Diseases
            </CardTitle>
          </CardHeader>
          <CardContent className="px-12">
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {diseases.map((disease) => (
                  <CarouselItem key={disease.id}>
                    <div className="p-6">
                      <div className="text-center mb-8">
                        <div className="text-8xl mb-4">{disease.icon}</div>
                        <h3 className="text-3xl font-bold mb-2" style={{ color: disease.color }}>
                          {disease.name}
                        </h3>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <AlertCircle className="h-5 w-5" />
                              Causes
                            </h4>
                            <ul className="space-y-2">
                              {disease.causes.map((cause, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <span className="text-red-600 mt-0.5">•</span>
                                  <span>{cause}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <Activity className="h-5 w-5" />
                              Symptoms
                            </h4>
                            <ul className="space-y-2">
                              {disease.symptoms.map((symptom, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <span className="text-yellow-600 mt-0.5">•</span>
                                  <span>{symptom}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                              <Heart className="h-5 w-5" />
                              Prevention
                            </h4>
                            <ul className="space-y-2">
                              {disease.prevention.map((prev, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <span className="text-green-600 mt-0.5">✓</span>
                                  <span>{prev}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>

        {/* Risk Assessment CTA */}
        <Card className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Check Your Risk Level</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Take our quick 8-question assessment to understand your risk for lifestyle diseases
            </p>
            <Button
              size="lg"
              onClick={() => setShowQuiz(true)}
              className="bg-primary hover:bg-primary/90 text-lg px-8"
            >
              Start Risk Assessment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Dialog */}
      <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {showResult ? "Your Risk Assessment Results" : `Question ${currentQuestion + 1} of ${riskQuestions.length}`}
            </DialogTitle>
          </DialogHeader>

          {!showResult ? (
            <div className="py-8">
              <p className="text-xl mb-8 text-center">
                {riskQuestions[currentQuestion].question}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleQuizAnswer(false)}
                  className="w-32"
                >
                  No
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleQuizAnswer(true)}
                  className="w-32 bg-primary"
                >
                  Yes
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="text-6xl mb-6">
                {yesCount <= 2 ? "✅" : yesCount <= 4 ? "⚠️" : "🚨"}
              </div>
              <h3 className={`text-3xl font-bold mb-4 ${getRiskLevel().color}`}>
                {getRiskLevel().level} Risk
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {getRiskLevel().message}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                You answered "Yes" to {yesCount} out of {riskQuestions.length} questions
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  Close
                </Button>
                <Button
                  onClick={() => {
                    resetQuiz();
                    setTimeout(() => setShowQuiz(true), 100);
                  }}
                  className="bg-primary"
                >
                  Retake Assessment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LifestyleDiseases;
