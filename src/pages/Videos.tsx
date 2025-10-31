import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import { useState } from "react";

interface VideoItem {
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  duration: string;
}

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const videos: VideoItem[] = [
    {
      title: "Detecting Food Adulteration",
      description: "Learn simple home tests to identify adulterated foods",
      thumbnail: "🔬",
      videoId: "dQw4w9WgXcQ",
      duration: "2:15"
    },
    {
      title: "Building a Balanced Diet",
      description: "Understanding the five essential food groups",
      thumbnail: "🥗",
      videoId: "dQw4w9WgXcQ",
      duration: "1:45"
    },
    {
      title: "Healthy Lifestyle Habits",
      description: "Daily routines for better health and wellness",
      thumbnail: "🏃",
      videoId: "dQw4w9WgXcQ",
      duration: "2:30"
    },
    {
      title: "BMI and Body Health",
      description: "Understanding your Body Mass Index",
      thumbnail: "⚖️",
      videoId: "dQw4w9WgXcQ",
      duration: "1:30"
    },
    {
      title: "Preventing Lifestyle Diseases",
      description: "Tips to avoid diabetes, hypertension, and obesity",
      thumbnail: "❤️",
      videoId: "dQw4w9WgXcQ",
      duration: "2:00"
    },
    {
      title: "Meal Planning Basics",
      description: "How to create a weekly healthy meal plan",
      thumbnail: "📋",
      videoId: "dQw4w9WgXcQ",
      duration: "1:50"
    }
  ];

  const openVideo = (video: VideoItem) => {
    setIsLoading(true);
    setSelectedVideo(video);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Educational Videos
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Quick and engaging health education in bite-sized videos
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, idx) => (
            <Card
              key={idx}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              onClick={() => openVideo(video)}
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="text-7xl text-center mb-2 group-hover:scale-110 transition-transform">
                    {video.thumbnail}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary/90 rounded-full p-4">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {video.description}
                </p>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Video className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <div className="flex items-center justify-center h-96 bg-muted/30 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                <p className="text-muted-foreground">Loading video...</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo?.videoId}?autoplay=1`}
                title={selectedVideo?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            {selectedVideo?.description}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos;
