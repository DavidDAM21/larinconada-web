-- Create profiles table extending auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  is_active_member BOOLEAN DEFAULT false,
  stripe_customer_id TEXT,
  subscription_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trigger function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Service role can do everything (for webhooks)
CREATE POLICY "Service role has full access"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create blog_posts table for mock data
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for blog_posts
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blog posts
CREATE POLICY "Blog posts are publicly readable"
  ON public.blog_posts
  FOR SELECT
  USING (true);

-- Insert mock blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author) VALUES
(
  'Bienvenido a nuestra asociación',
  'bienvenido-asociacion',
  'Descubre los beneficios de formar parte de nuestra comunidad.',
  'En nuestra asociación encontrarás un espacio de colaboración y crecimiento. Ofrecemos eventos exclusivos, networking y recursos para todos nuestros miembros. ¡Únete a nosotros y forma parte de algo especial!',
  'Equipo de La Rinconada'
),
(
  'Eventos exclusivos para socios',
  'eventos-exclusivos-socios',
  'Accede a eventos únicos diseñados especialmente para nuestros miembros.',
  'Como socio activo, tendrás acceso a eventos mensuales, talleres especializados y conferencias con expertos del sector. Nuestro calendario está lleno de oportunidades para aprender y conectar con otros profesionales.',
  'María González'
),
(
  'Recursos y herramientas disponibles',
  'recursos-herramientas',
  'Explora la biblioteca de recursos exclusivos para socios.',
  'Hemos creado una completa biblioteca de recursos digitales, plantillas, guías y herramientas que te ayudarán en tu desarrollo profesional. Todo esto está disponible 24/7 para nuestros miembros activos.',
  'Carlos Martínez'
);
