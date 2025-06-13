
-- Create API Endpoints Table
CREATE TABLE IF NOT EXISTS public.api_endpoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  description TEXT,
  parameters JSONB,
  request_body_schema JSONB,
  response_body_schema JSONB,
  request_samples JSONB,
  response_samples JSONB,
  tags TEXT[],
  is_internal BOOLEAN DEFAULT true,
  is_documented BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies to secure API endpoints
ALTER TABLE public.api_endpoints ENABLE ROW LEVEL SECURITY;

-- Only admin users can access API endpoints
CREATE POLICY "Allow admin access to API endpoints" 
ON public.api_endpoints 
USING (auth.jwt() ->> 'role' = 'admin');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to update timestamps
CREATE TRIGGER update_api_endpoints_updated_at
BEFORE UPDATE ON public.api_endpoints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
