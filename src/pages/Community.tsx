import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, MessageCircle, Share2, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

const Community = () => {
  const [message, setMessage] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [posts, setPosts] = useState<{ text: string; author: string; date: string }[]>([]);

  useEffect(() => {
    // Load leaderboard from localStorage
    const scores = localStorage.getItem('quizLeaderboard');
    if (scores) {
      setLeaderboard(JSON.parse(scores));
    }

    // Load community posts
    const savedPosts = localStorage.getItem('communityPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handlePostMessage = () => {
    if (!message.trim()) return;
    
    const newPost = {
      text: message,
      author: "Guest User",
      date: new Date().toLocaleDateString()
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    setMessage("");
    toast({
      title: "Posted!",
      description: "Your message has been shared with the community."
    });
  };

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = "Join me on Healthy You - Eat Smart, Live Strong! 🌱";
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      instagram: `https://www.instagram.com/`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Community Hub
          </span>
        </h1>

        {/* Challenge of the Week */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Award className="h-6 w-6 text-secondary" />
              Healthy Challenge of the Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              🥗 <strong>7-Day Veggie Challenge:</strong> Include at least 5 different vegetables in your daily meals. Track your progress and share photos with the community!
            </p>
            <Button className="bg-secondary hover:bg-secondary/90">
              Join Challenge
            </Button>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Discussion Area */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Community Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your healthy eating tips or experiences..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button onClick={handlePostMessage} className="w-full">
                  Post Message
                </Button>

                <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
                  {posts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No posts yet. Be the first to share!
                    </p>
                  ) : (
                    posts.map((post, idx) => (
                      <Card key={idx} className="bg-muted/30">
                        <CardContent className="pt-4">
                          <p className="text-sm mb-2">{post.text}</p>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="font-semibold">{post.author}</span>
                            <span>{post.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-primary" />
                  Share with Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => shareToSocial('facebook')}
                    className="bg-[#1877F2] hover:bg-[#1877F2]/90"
                  >
                    Facebook
                  </Button>
                  <Button
                    onClick={() => shareToSocial('whatsapp')}
                    className="bg-[#25D366] hover:bg-[#25D366]/90"
                  >
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => shareToSocial('instagram')}
                    className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90"
                  >
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-secondary" />
                Quiz Champions Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {leaderboard.length === 0 ? (
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Take the quiz to appear on the leaderboard!
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        idx === 0
                          ? "bg-gradient-to-r from-secondary/20 to-secondary/10 border-2 border-secondary"
                          : idx === 1
                          ? "bg-primary/10 border border-primary/30"
                          : idx === 2
                          ? "bg-muted/50 border border-muted"
                          : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`text-2xl font-bold ${
                          idx === 0 ? "text-secondary" : 
                          idx === 1 ? "text-primary" : 
                          "text-muted-foreground"
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{entry.name}</div>
                          <div className="text-xs text-muted-foreground">{entry.date}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {entry.score}
                        <span className="text-sm text-muted-foreground">/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
