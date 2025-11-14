import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Apple, Leaf, Droplets } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SeasonalRecommendation {
  id: string;
  season: 'winter' | 'summer' | 'rainy';
  title: string;
  description: string;
  recommended_foods: string[];
  recommended_fruits: string[];
  dietary_guidance: string;
  health_benefits: string[];
  icon: string;
  color: string;
}

export default function Seasonal() {
  const [recommendations, setRecommendations] = useState<SeasonalRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const { data, error } = await supabase
        .from('seasonal_recommendations')
        .select('*')
        .eq('is_active', true)
        .order('season');

      if (error) throw error;

      setRecommendations((data as SeasonalRecommendation[]) || []);
    } catch (error: any) {
      toast({
        title: 'Error Loading Recommendations',
        description: error.message || 'Failed to load seasonal recommendations',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Seasonal Health Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the best foods and health tips for every season. Eat right, stay healthy all year round!
          </p>
        </div>

        {/* Seasonal Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {recommendations.map((recommendation) => (
            <Card
              key={recommendation.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2"
              style={{ borderColor: recommendation.color }}
            >
              <CardHeader
                className="text-center pb-4"
                style={{ 
                  background: `linear-gradient(135deg, ${recommendation.color}15, ${recommendation.color}05)` 
                }}
              >
                <div className="text-6xl mb-3">{recommendation.icon}</div>
                <CardTitle className="text-2xl capitalize">
                  {recommendation.season}
                </CardTitle>
                <CardDescription className="text-base">
                  {recommendation.title}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {recommendation.description}
                </p>

                {/* Recommended Foods */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Recommended Foods</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.recommended_foods.map((food, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recommended Fruits */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Apple className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Recommended Fruits</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.recommended_fruits.map((fruit, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {fruit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Dietary Guidance */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Dietary Guidance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recommendation.dietary_guidance}
                  </p>
                </div>

                {/* Health Benefits */}
                <div>
                  <h3 className="font-semibold text-sm mb-3">Health Benefits</h3>
                  <ul className="space-y-2">
                    {recommendation.health_benefits.map((benefit, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Pro Tip:</strong> These recommendations are based on traditional wisdom and modern nutrition science. 
                Adjust your diet based on your personal health needs and consult a healthcare professional for personalized advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
