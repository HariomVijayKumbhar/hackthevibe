import { useState } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CyberModule, Progress } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface ModuleViewerProps {
  module: CyberModule | null;
  progress?: Progress;
  onClose: () => void;
  onComplete: () => void;
}

export function ModuleViewer({ module, progress, onClose, onComplete }: ModuleViewerProps) {
  const { user } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const isCompleted = progress?.completed;

  if (!module) return null;

  const handleComplete = async () => {
    if (!user || isCompleted) return;

    setIsCompleting(true);
    try {
      const { error } = await supabase
        .from('progress')
        .upsert({
          user_id: user.id,
          module_id: module.id,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Module completed! Great job!');
      onComplete();
    } catch (error) {
      console.error('Error completing module:', error);
      toast.error('Failed to mark as complete');
    } finally {
      setIsCompleting(false);
    }
  };

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- **') && line.includes('**:')) {
        const [boldPart, rest] = line.slice(4).split('**:');
        return (
          <li key={index} className="ml-4 mb-1">
            <strong>{boldPart}:</strong>{rest}
          </li>
        );
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 mb-1">{line.slice(2)}</li>;
      }
      if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-4 mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 text-muted-foreground">{line}</p>;
    });
  };

  return (
    <Dialog open={!!module} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="shrink-0">
          <div className="flex items-start justify-between pr-8">
            <div>
              <DialogTitle className="text-xl">{module.title}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
            </div>
            {isCompleted && (
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 prose prose-sm max-w-none">
          {renderContent(module.content)}
        </div>

        <div className="shrink-0 pt-4 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!isCompleted && (
            <Button onClick={handleComplete} disabled={isCompleting}>
              {isCompleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Complete
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}