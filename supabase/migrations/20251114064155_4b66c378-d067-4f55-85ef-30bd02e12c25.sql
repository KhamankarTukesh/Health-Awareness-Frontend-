-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('guest', 'user', 'mentor', 'community_moderator', 'premium');

-- Create enum for seasons
CREATE TYPE public.season_type AS ENUM ('winter', 'summer', 'rainy');

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create seasonal_recommendations table
CREATE TABLE public.seasonal_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season public.season_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  recommended_foods TEXT[] NOT NULL DEFAULT '{}',
  recommended_fruits TEXT[] NOT NULL DEFAULT '{}',
  dietary_guidance TEXT NOT NULL,
  health_benefits TEXT[] NOT NULL DEFAULT '{}',
  icon TEXT,
  color TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create environment_rules table
CREATE TABLE public.env_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_name TEXT NOT NULL UNIQUE,
  description TEXT,
  temperature_min DECIMAL,
  temperature_max DECIMAL,
  humidity_min DECIMAL,
  humidity_max DECIMAL,
  aqi_min INTEGER,
  aqi_max INTEGER,
  recommended_foods TEXT[] NOT NULL DEFAULT '{}',
  pollution_tips TEXT[] NOT NULL DEFAULT '{}',
  health_warnings TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  priority INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seasonal_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.env_rules ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to get user's highest role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role
      WHEN 'premium' THEN 5
      WHEN 'community_moderator' THEN 4
      WHEN 'mentor' THEN 3
      WHEN 'user' THEN 2
      WHEN 'guest' THEN 1
    END DESC
  LIMIT 1
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Moderators can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'community_moderator'));

CREATE POLICY "Only moderators can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'community_moderator'));

-- RLS Policies for seasonal_recommendations (public read, moderator write)
CREATE POLICY "Anyone can view active seasonal recommendations"
  ON public.seasonal_recommendations FOR SELECT
  USING (is_active = true);

CREATE POLICY "Moderators can manage seasonal recommendations"
  ON public.seasonal_recommendations FOR ALL
  USING (public.has_role(auth.uid(), 'community_moderator'));

-- RLS Policies for env_rules (public read, moderator write)
CREATE POLICY "Anyone can view active environment rules"
  ON public.env_rules FOR SELECT
  USING (is_active = true);

CREATE POLICY "Moderators can manage environment rules"
  ON public.env_rules FOR ALL
  USING (public.has_role(auth.uid(), 'community_moderator'));

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email)
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_seasonal_recommendations_updated_at
  BEFORE UPDATE ON public.seasonal_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_env_rules_updated_at
  BEFORE UPDATE ON public.env_rules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Insert default seasonal recommendations
INSERT INTO public.seasonal_recommendations (season, title, description, recommended_foods, recommended_fruits, dietary_guidance, health_benefits, icon, color) VALUES
('winter', 'Winter Wellness Foods', 'Stay warm and boost immunity with these winter superfoods', 
  ARRAY['Root vegetables', 'Whole grains', 'Nuts', 'Seeds', 'Ginger', 'Garlic', 'Turmeric', 'Ghee'],
  ARRAY['Oranges', 'Pomegranates', 'Guava', 'Apples', 'Dates'],
  'Focus on warm, cooked foods. Include healthy fats and proteins. Drink warm water and herbal teas. Avoid cold and raw foods.',
  ARRAY['Boosts immunity', 'Keeps body warm', 'Improves digestion', 'Strengthens bones', 'Enhances skin health'],
  '❄️', '#3B82F6'),

('summer', 'Summer Cooling Foods', 'Stay hydrated and cool with these refreshing summer foods',
  ARRAY['Cucumber', 'Yogurt', 'Coconut water', 'Leafy greens', 'Mint', 'Coriander', 'Buttermilk', 'Rice'],
  ARRAY['Watermelon', 'Mango', 'Papaya', 'Berries', 'Melon', 'Lychee'],
  'Eat light, cooling foods. Stay hydrated with water and fresh juices. Avoid heavy, oily, and spicy foods. Include salads and fresh fruits.',
  ARRAY['Prevents dehydration', 'Cools body naturally', 'Improves skin glow', 'Aids digestion', 'Boosts energy levels'],
  '☀️', '#F59E0B'),

('rainy', 'Monsoon Immunity Boosters', 'Stay healthy during monsoons with these immunity-boosting foods',
  ARRAY['Turmeric', 'Ginger', 'Garlic', 'Black pepper', 'Honey', 'Soups', 'Herbal teas', 'Steamed vegetables'],
  ARRAY['Pomegranate', 'Apples', 'Pears', 'Plums', 'Cherries'],
  'Boost immunity with warm, cooked meals. Avoid street food and raw vegetables. Drink boiled water. Include probiotics like yogurt.',
  ARRAY['Strengthens immunity', 'Prevents infections', 'Improves digestion', 'Reduces inflammation', 'Enhances respiratory health'],
  '🌧️', '#10B981');

-- Insert default environment rules
INSERT INTO public.env_rules (rule_name, description, temperature_min, temperature_max, humidity_min, humidity_max, aqi_min, aqi_max, recommended_foods, pollution_tips, health_warnings, priority) VALUES
('hot_dry_clean', 'Hot and dry weather with good air quality',
  30, 50, 0, 40, 0, 50,
  ARRAY['Watermelon', 'Cucumber', 'Coconut water', 'Yogurt', 'Mint', 'Leafy greens'],
  ARRAY['Stay in shade during peak hours', 'Use sunscreen', 'Wear light clothing'],
  ARRAY['Risk of dehydration', 'Heat exhaustion possible'],
  1),

('cold_humid_clean', 'Cold and humid weather with good air quality',
  0, 15, 60, 100, 0, 50,
  ARRAY['Ginger tea', 'Garlic', 'Turmeric milk', 'Nuts', 'Root vegetables', 'Ghee'],
  ARRAY['Wear warm layers', 'Keep windows open for ventilation', 'Maintain indoor humidity'],
  ARRAY['Risk of cold and flu', 'Joint pain may increase'],
  1),

('moderate_polluted', 'Moderate pollution levels (AQI 51-100)',
  15, 30, 40, 70, 51, 100,
  ARRAY['Vitamin C rich foods', 'Antioxidant foods', 'Green tea', 'Turmeric', 'Honey'],
  ARRAY['Limit outdoor activities', 'Wear N95 mask outdoors', 'Use air purifier indoors', 'Keep windows closed during peak pollution'],
  ARRAY['Sensitive groups should reduce prolonged outdoor exertion'],
  2),

('unhealthy_pollution', 'Unhealthy air quality (AQI 101-200)',
  10, 40, 20, 80, 101, 200,
  ARRAY['Jaggery', 'Tulsi leaves', 'Neem', 'Vitamin C foods', 'Beetroot', 'Carrots', 'Omega-3 rich foods'],
  ARRAY['Avoid outdoor exercise', 'Wear N95/N99 mask', 'Use HEPA air purifiers', 'Steam inhalation twice daily', 'Keep indoor plants'],
  ARRAY['Everyone should reduce outdoor activities', 'Breathing difficulties may increase', 'Eye irritation common'],
  3),

('hazardous_pollution', 'Hazardous air quality (AQI 201+)',
  0, 50, 0, 100, 201, 500,
  ARRAY['Detox foods (jaggery, neem)', 'Antioxidant-rich vegetables', 'Turmeric milk', 'Citrus fruits', 'Walnuts', 'Flaxseeds'],
  ARRAY['Stay indoors with closed windows', 'Use high-efficiency air purifiers', 'Wear N99 mask if going out is essential', 'Avoid all physical exertion', 'Consult doctor if symptoms appear'],
  ARRAY['HEALTH ALERT: Everyone should avoid all outdoor activities', 'Serious respiratory issues likely', 'Emergency measures needed'],
  4);