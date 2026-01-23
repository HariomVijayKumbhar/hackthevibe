import { Progress as ProgressUI } from '@/components/ui/progress';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Learning Progress</span>
        <span className="font-medium text-primary">
          {completed}/{total} modules ({percentage}%)
        </span>
      </div>
      <ProgressUI value={percentage} className="h-3" />
    </div>
  );
}