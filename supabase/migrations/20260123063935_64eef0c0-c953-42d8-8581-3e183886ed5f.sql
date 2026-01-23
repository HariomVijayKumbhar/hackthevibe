-- Create storage bucket for complaint evidence images
INSERT INTO storage.buckets (id, name, public) VALUES ('evidence', 'evidence', true);

-- Storage policies for evidence bucket
CREATE POLICY "Anyone can view evidence images"
ON storage.objects FOR SELECT
USING (bucket_id = 'evidence');

CREATE POLICY "Authenticated users can upload evidence"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'evidence' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own evidence"
ON storage.objects FOR DELETE
USING (bucket_id = 'evidence' AND auth.uid()::text = (storage.foldername(name))[1]);