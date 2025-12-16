-- Create profiles table for user information
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create eye power tracking table for Optitrack
CREATE TABLE public.eye_power_records (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  checkup_date date NOT NULL,
  left_eye_power decimal(4,2),
  right_eye_power decimal(4,2),
  left_eye_cylinder decimal(4,2),
  right_eye_cylinder decimal(4,2),
  left_eye_axis integer,
  right_eye_axis integer,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.eye_power_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own eye power records" 
ON public.eye_power_records 
FOR ALL 
USING (auth.uid() = user_id);

-- Create prescriptions table for PrescriptTracker
CREATE TABLE public.prescriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prescription_date date NOT NULL,
  doctor_name text,
  clinic_name text,
  image_url text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own prescriptions" 
ON public.prescriptions 
FOR ALL 
USING (auth.uid() = user_id);

-- Create medical history table for EyeChronicle
CREATE TABLE public.medical_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  condition_name text NOT NULL,
  diagnosis_date date,
  treatment text,
  status text CHECK (status IN ('ongoing', 'resolved', 'monitoring')),
  doctor_name text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own medical history" 
ON public.medical_history 
FOR ALL 
USING (auth.uid() = user_id);

-- Create screening results table for Optiscreen
CREATE TABLE public.screening_results (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type text NOT NULL CHECK (test_type IN ('diabetic_retinopathy', 'macular_degeneration', 'color_blindness', 'snellen')),
  test_date timestamp with time zone NOT NULL DEFAULT now(),
  result jsonb NOT NULL,
  risk_level text CHECK (risk_level IN ('low', 'moderate', 'high')),
  recommendations text,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own screening results" 
ON public.screening_results 
FOR ALL 
USING (auth.uid() = user_id);

-- Create blue light exposure table for GalrGuard
CREATE TABLE public.blue_light_exposure (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,
  screen_time_minutes integer NOT NULL DEFAULT 0,
  blue_light_exposure_score decimal(5,2),
  device_usage jsonb,
  breaks_taken integer DEFAULT 0,
  eye_strain_level integer CHECK (eye_strain_level BETWEEN 1 AND 10),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blue_light_exposure ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own blue light data" 
ON public.blue_light_exposure 
FOR ALL 
USING (auth.uid() = user_id);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('prescriptions', 'prescriptions', false),
  ('retinal-images', 'retinal-images', false),
  ('avatars', 'avatars', true);

-- Create storage policies for prescriptions
CREATE POLICY "Users can upload their own prescriptions" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own prescriptions" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'prescriptions' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for retinal images
CREATE POLICY "Users can upload their own retinal images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'retinal-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own retinal images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'retinal-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_history_updated_at
  BEFORE UPDATE ON public.medical_history
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();