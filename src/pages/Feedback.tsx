import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, MessageSquare, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const savedReviews = localStorage.getItem('userReviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const handleSubmit = () => {
    if (!name.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all fields and select a rating.",
        variant: "destructive"
      });
      return;
    }

    const newReview: Review = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('userReviews', JSON.stringify(updatedReviews));

    // Show thank you animation
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);

    // Reset form
    setName("");
    setComment("");
    setRating(0);

    toast({
      title: "Thank You! 🎉",
      description: "Your feedback helps us improve!"
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Feedback Matters
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Help us make Healthy You even better for everyone
          </p>
        </div>

        {/* Average Rating Display */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {averageRating}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(parseFloat(averageRating))
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Share Your Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rate Your Experience</label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-10 w-10 cursor-pointer transition-all ${
                        star <= (hoverRating || rating)
                          ? "fill-secondary text-secondary scale-110"
                          : "text-muted-foreground hover:text-secondary/50"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback</label>
                <Textarea
                  placeholder="Tell us what you think about Healthy You..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Thank You Animation */}
        {showThankYou && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="animate-scale-in">
              <CardContent className="pt-6 text-center px-8 pb-8">
                <Heart className="h-20 w-20 text-secondary mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Thank You!
                </h2>
                <p className="text-muted-foreground">Your feedback is valuable to us</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Recent Reviews</h2>
          {reviews.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No reviews yet. Be the first to share your experience!
                </p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
