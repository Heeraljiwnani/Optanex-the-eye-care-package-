-- Add consent columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS training_consent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS management_consent BOOLEAN DEFAULT FALSE;

-- Update the handle_new_user function to include consent metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url, training_consent, management_consent)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    (new.raw_user_meta_data->>'training_consent')::boolean,
    (new.raw_user_meta_data->>'management_consent')::boolean
  );
  RETURN new;
END;
$function$;
