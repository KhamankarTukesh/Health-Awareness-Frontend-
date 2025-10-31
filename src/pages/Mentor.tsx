import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Target, Dumbbell, Scale } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
}

interface DayPlan {
  day: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  exercise: string;
  tip: string;
  completed: boolean;
}

const goals: Goal[] = [
  {
    id: "lose-weight",
    title: "Lose Weight",
    icon: Scale,
    color: "hsl(0, 84%, 60%)",
    description: "Calorie deficit diet with cardio exercises",
  },
  {
    id: "stay-fit",
    title: "Stay Fit",
    icon: Target,
    color: "hsl(122, 39%, 49%)",
    description: "Balanced nutrition with moderate activity",
  },
  {
    id: "gain-strength",
    title: "Gain Strength",
    icon: Dumbbell,
    color: "hsl(36, 100%, 50%)",
    description: "High protein diet with strength training",
  },
];

const weeklyPlans: Record<string, DayPlan[]> = {
  "lose-weight": [
    {
      day: 1,
      breakfast: "Oatmeal with berries and almonds",
      lunch: "Grilled chicken salad with olive oil",
      dinner: "Steamed fish with vegetables",
      exercise: "30 min brisk walking + 10 min stretching",
      tip: "Drink 8 glasses of water throughout the day",
      completed: false,
    },
    {
      day: 2,
      breakfast: "Green smoothie with spinach and banana",
      lunch: "Quinoa bowl with grilled vegetables",
      dinner: "Vegetable soup with whole grain bread",
      exercise: "20 min jogging + 15 min yoga",
      tip: "Avoid sugary drinks and processed foods",
      completed: false,
    },
    {
      day: 3,
      breakfast: "Scrambled eggs with whole wheat toast",
      lunch: "Brown rice with dal and cucumber salad",
      dinner: "Grilled turkey with roasted vegetables",
      exercise: "25 min cycling + core exercises",
      tip: "Sleep for 7-8 hours for better metabolism",
      completed: false,
    },
    {
      day: 4,
      breakfast: "Greek yogurt with honey and nuts",
      lunch: "Chickpea salad with lemon dressing",
      dinner: "Baked salmon with steamed broccoli",
      exercise: "30 min swimming or water aerobics",
      tip: "Practice mindful eating, chew slowly",
      completed: false,
    },
    {
      day: 5,
      breakfast: "Whole grain cereal with low-fat milk",
      lunch: "Vegetable stir-fry with tofu",
      dinner: "Grilled chicken breast with salad",
      exercise: "Interval training - 20 min",
      tip: "Track your meals and progress daily",
      completed: false,
    },
    {
      day: 6,
      breakfast: "Avocado toast on multigrain bread",
      lunch: "Lentil soup with mixed greens",
      dinner: "Grilled fish tacos with cabbage slaw",
      exercise: "Dance workout - 30 min",
      tip: "Celebrate small victories and stay motivated",
      completed: false,
    },
    {
      day: 7,
      breakfast: "Protein smoothie bowl with fruits",
      lunch: "Grilled vegetables with hummus wrap",
      dinner: "Chicken stir-fry with brown rice",
      exercise: "Light yoga and meditation - 30 min",
      tip: "Meal prep for the week ahead",
      completed: false,
    },
  ],
  "stay-fit": [
    {
      day: 1,
      breakfast: "Whole grain toast with peanut butter",
      lunch: "Chicken wrap with vegetables",
      dinner: "Pasta with marinara and salad",
      exercise: "30 min moderate cardio",
      tip: "Maintain consistent meal times",
      completed: false,
    },
    {
      day: 2,
      breakfast: "Fruit smoothie with protein powder",
      lunch: "Tuna sandwich with side salad",
      dinner: "Grilled chicken with sweet potato",
      exercise: "Strength training - upper body",
      tip: "Stay active throughout the day",
      completed: false,
    },
    {
      day: 3,
      breakfast: "Pancakes with fresh berries",
      lunch: "Vegetable soup with crackers",
      dinner: "Baked fish with quinoa",
      exercise: "Yoga and flexibility - 40 min",
      tip: "Listen to your body's needs",
      completed: false,
    },
    {
      day: 4,
      breakfast: "Eggs Benedict with spinach",
      lunch: "Caesar salad with grilled chicken",
      dinner: "Beef stir-fry with vegetables",
      exercise: "Swimming - 30 min",
      tip: "Mix up your exercise routine",
      completed: false,
    },
    {
      day: 5,
      breakfast: "Granola with Greek yogurt",
      lunch: "Veggie burger with sweet potato fries",
      dinner: "Grilled salmon with asparagus",
      exercise: "Cycling - 40 min",
      tip: "Stay hydrated before, during, after exercise",
      completed: false,
    },
    {
      day: 6,
      breakfast: "French toast with fruit",
      lunch: "Chicken and vegetable stir-fry",
      dinner: "Turkey meatballs with pasta",
      exercise: "Team sports or group fitness class",
      tip: "Exercise with friends for motivation",
      completed: false,
    },
    {
      day: 7,
      breakfast: "Breakfast burrito with eggs",
      lunch: "Mediterranean salad with feta",
      dinner: "Grilled shrimp with rice pilaf",
      exercise: "Recovery day - light stretching",
      tip: "Plan your meals and workouts for next week",
      completed: false,
    },
  ],
  "gain-strength": [
    {
      day: 1,
      breakfast: "Protein pancakes with eggs",
      lunch: "Chicken breast with brown rice and vegetables",
      dinner: "Steak with sweet potato and broccoli",
      exercise: "Heavy compound lifts - legs & back",
      tip: "Progressive overload is key to strength gains",
      completed: false,
    },
    {
      day: 2,
      breakfast: "Omelette with cheese and whole wheat toast",
      lunch: "Tuna pasta with mixed vegetables",
      dinner: "Grilled chicken with quinoa",
      exercise: "Chest and triceps workout",
      tip: "Rest between sets for full recovery",
      completed: false,
    },
    {
      day: 3,
      breakfast: "Greek yogurt bowl with granola and nuts",
      lunch: "Beef and vegetable stir-fry",
      dinner: "Salmon with brown rice",
      exercise: "Active recovery - light cardio and stretching",
      tip: "Adequate rest is crucial for muscle growth",
      completed: false,
    },
    {
      day: 4,
      breakfast: "Protein smoothie with banana and peanut butter",
      lunch: "Turkey sandwich with avocado",
      dinner: "Pork chops with roasted vegetables",
      exercise: "Shoulders and arms workout",
      tip: "Focus on proper form over heavy weights",
      completed: false,
    },
    {
      day: 5,
      breakfast: "Scrambled eggs with sausage and toast",
      lunch: "Chicken thighs with rice and beans",
      dinner: "Grilled fish with pasta",
      exercise: "Legs and core workout",
      tip: "Never skip leg day!",
      completed: false,
    },
    {
      day: 6,
      breakfast: "Bagel with cream cheese and smoked salmon",
      lunch: "Beef burrito bowl",
      dinner: "BBQ chicken with cornbread",
      exercise: "Back and biceps workout",
      tip: "Mind-muscle connection improves results",
      completed: false,
    },
    {
      day: 7,
      breakfast: "Full breakfast with eggs, bacon, and toast",
      lunch: "Pizza with chicken and vegetables",
      dinner: "Grilled steak with loaded baked potato",
      exercise: "Rest day - light stretching only",
      tip: "Recovery is when muscles actually grow",
      completed: false,
    },
  ],
};

const motivationalQuotes = [
  "The only bad workout is the one that didn't happen.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't wish for it, work for it.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Believe in yourself and all that you are.",
  "Progress, not perfection.",
];

const Mentor = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([]);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const selectGoal = (goalId: string) => {
    setSelectedGoal(goalId);
    setWeekPlan(weeklyPlans[goalId]);
    toast.success(`${goals.find(g => g.id === goalId)?.title} plan activated!`);
  };

  const toggleDayCompletion = (dayIndex: number) => {
    const updatedPlan = [...weekPlan];
    updatedPlan[dayIndex].completed = !updatedPlan[dayIndex].completed;
    setWeekPlan(updatedPlan);
    
    if (updatedPlan[dayIndex].completed) {
      toast.success(`Day ${dayIndex + 1} completed! Great work! 🎉`);
    }
  };

  const completedDays = weekPlan.filter(day => day.completed).length;
  const progressPercentage = (completedDays / 7) * 100;

  const downloadPlan = () => {
    toast.success("Weekly plan download started! (Demo)");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Personal Health Mentor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your goal and get a personalized 7-day plan with meals, exercises, and daily tips
          </p>
        </div>

        {/* Motivational Quote */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5">
          <CardContent className="p-8 text-center">
            <p className="text-xl md:text-2xl font-semibold italic text-foreground transition-all duration-500">
              "{motivationalQuotes[currentQuote]}"
            </p>
          </CardContent>
        </Card>

        {!selectedGoal ? (
          /* Goal Selection */
          <div className="grid md:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <Card
                key={goal.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => selectGoal(goal.id)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <goal.icon
                      className="h-20 w-20 mx-auto group-hover:scale-110 transition-transform"
                      style={{ color: goal.color }}
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{goal.title}</h3>
                  <p className="text-muted-foreground mb-6">{goal.description}</p>
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Select This Goal
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Weekly Plan Display */
          <div className="space-y-6">
            {/* Progress Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Weekly Progress</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedGoal(null);
                      setWeekPlan([]);
                    }}
                  >
                    Change Goal
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  {/* Circular Progress */}
                  <div className="relative w-32 h-32">
                    <svg className="transform -rotate-90 w-32 h-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--muted))"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="hsl(var(--primary))"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                        className="transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-primary">{completedDays}</span>
                      <span className="text-xs text-muted-foreground">/ 7 days</span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {goals.find(g => g.id === selectedGoal)?.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {completedDays === 7
                        ? "🎉 Congratulations! You've completed the week!"
                        : `${7 - completedDays} days remaining. Keep going!`}
                    </p>
                    <Button onClick={downloadPlan} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Weekly Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Plans */}
            <div className="grid gap-4">
              {weekPlan.map((day, index) => (
                <Card
                  key={day.day}
                  className={`transition-all ${
                    day.completed ? "bg-primary/5 border-primary" : ""
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {day.completed && <span className="text-primary">✓</span>}
                        Day {day.day}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => toggleDayCompletion(index)}
                        variant={day.completed ? "default" : "outline"}
                      >
                        {day.completed ? "Completed" : "Mark Complete"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          🍳 Breakfast
                        </h4>
                        <p className="text-sm text-muted-foreground">{day.breakfast}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          🍽️ Lunch
                        </h4>
                        <p className="text-sm text-muted-foreground">{day.lunch}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          🌙 Dinner
                        </h4>
                        <p className="text-sm text-muted-foreground">{day.dinner}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          💪 Exercise
                        </h4>
                        <p className="text-sm text-muted-foreground">{day.exercise}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          💡 Daily Tip
                        </h4>
                        <p className="text-sm text-muted-foreground">{day.tip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentor;
