import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trophy, Timer, Share2 } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which food group provides the most energy?",
    options: ["Proteins", "Carbohydrates", "Vitamins", "Minerals"],
    correct: 1,
    category: "Nutrition Basics",
  },
  {
    id: 2,
    question: "What is the main function of proteins in the body?",
    options: ["Energy storage", "Building and repairing tissues", "Regulating temperature", "Producing vitamins"],
    correct: 1,
    category: "Proteins",
  },
  {
    id: 3,
    question: "Which vitamin is known as the 'sunshine vitamin'?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct: 3,
    category: "Vitamins",
  },
  {
    id: 4,
    question: "How many food groups are in a balanced diet?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    category: "Diet Planning",
  },
  {
    id: 5,
    question: "Which mineral is essential for strong bones and teeth?",
    options: ["Iron", "Calcium", "Zinc", "Sodium"],
    correct: 1,
    category: "Minerals",
  },
  {
    id: 6,
    question: "What percentage of the human body is water?",
    options: ["40%", "50%", "60%", "70%"],
    correct: 2,
    category: "Hydration",
  },
  {
    id: 7,
    question: "Which food is rich in Omega-3 fatty acids?",
    options: ["Chicken", "Salmon", "Beef", "Pork"],
    correct: 1,
    category: "Healthy Fats",
  },
  {
    id: 8,
    question: "What is the recommended daily water intake for adults?",
    options: ["4 glasses", "6 glasses", "8 glasses", "10 glasses"],
    correct: 2,
    category: "Hydration",
  },
  {
    id: 9,
    question: "Which nutrient helps with iron absorption?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correct: 1,
    category: "Vitamins",
  },
  {
    id: 10,
    question: "What type of carbohydrates should you consume more of?",
    options: ["Simple sugars", "Complex carbohydrates", "Refined grains", "Processed foods"],
    correct: 1,
    category: "Carbohydrates",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    if (!quizStarted || showResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, currentQuestion, showResult]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
      toast.success("Correct! 🎉");
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1000);
    } else {
      toast.error("Oops! Try the next one!");
    }

    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setShowResult(true);
      setQuizStarted(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "You're a Nutrition Hero! 🏆";
    if (percentage >= 70) return "Great Job! Keep Learning! 🌟";
    if (percentage >= 50) return "Good Effort! You're on the right track! 👍";
    return "Keep Practicing! You'll get there! 💪";
  };

  if (!quizStarted && !showResult) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-6xl mb-6">🎮</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Food Groups Quiz
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Test your nutrition knowledge with 10 fun questions!
          </p>
          <div className="bg-card p-8 rounded-2xl shadow-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Quiz Rules:</h3>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>✓ 10 multiple-choice questions</li>
              <li>✓ 30 seconds per question</li>
              <li>✓ Instant feedback on each answer</li>
              <li>✓ Track your progress with a score</li>
            </ul>
          </div>
          <Button
            size="lg"
            onClick={startQuiz}
            className="bg-primary hover:bg-primary/90 text-lg px-12 py-6"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 20}%`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Timer className="h-5 w-5" />
              <span className="text-2xl">{timeLeft}s</span>
            </div>
            <div className="text-lg font-semibold">
              Question {currentQuestion + 1}/{questions.length}
            </div>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="animate-scale-in">
          <CardHeader>
            <div className="text-sm text-primary font-semibold mb-2">
              {questions[currentQuestion].category}
            </div>
            <CardTitle className="text-2xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left h-auto py-4 px-6 text-lg transition-all ${
                  selectedAnswer === null
                    ? "hover:bg-primary/10 hover:border-primary"
                    : selectedAnswer === index
                    ? index === questions[currentQuestion].correct
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "bg-red-100 border-red-500 text-red-700"
                    : index === questions[currentQuestion].correct
                    ? "bg-green-100 border-green-500 text-green-700"
                    : ""
                }`}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Results Dialog */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">
              <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
              Quiz Complete!
            </DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary my-6">
                {score}/{questions.length}
              </div>
              <p className="text-xl font-semibold text-foreground">
                {getScoreMessage()}
              </p>
              <div className="flex gap-3 justify-center mt-6">
                <Button onClick={startQuiz} className="bg-primary">
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    toast.success("Score shared! (Demo)");
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;
