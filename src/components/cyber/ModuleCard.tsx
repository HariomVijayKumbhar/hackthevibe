import { 
  Fish, 
  Lock, 
  Smartphone, 
  Globe, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CyberModule, Progress } from '@/types';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: CyberModule;
  progress?: Progress;
  onSelect: (module: CyberModule) => void;
}

const iconMap: Record<string, typeof Fish> = {
  fish: Fish,
  lock: Lock,
  smartphone: Smartphone,
  globe: Globe,
};

export function ModuleCard({ module, progress, onSelect }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || BookOpen;
  const isCompleted = progress?.completed;

  return (
    <Card 
      className={cn(
        'shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer group',
        isCompleted && 'ring-2 ring-success/30'
      )}
      onClick={() => onSelect(module)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className={cn(
            'p-3 rounded-xl transition-colors',
            isCompleted 
              ? 'bg-success/10 text-success' 
              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
          )}>
            <Icon className="h-6 w-6" />
          </div>
          {isCompleted && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mt-4">{module.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {module.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant={isCompleted ? 'outline' : 'default'} 
          className="w-full"
        >
          {isCompleted ? 'Review Module' : 'Start Learning'}
        </Button>
      </CardContent>
    </Card>
  );
}