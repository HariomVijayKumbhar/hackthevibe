import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Complaint, ComplaintStatus } from '@/types';
import { cn } from '@/lib/utils';

interface ComplaintCardProps {
  complaint: Complaint;
  showStudentInfo?: boolean;
}

const statusConfig: Record<ComplaintStatus, { label: string; icon: typeof Clock; className: string }> = {
  submitted: {
    label: 'Submitted',
    icon: AlertCircle,
    className: 'status-submitted',
  },
  in_review: {
    label: 'In Review',
    icon: Clock,
    className: 'status-in-review',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle2,
    className: 'status-resolved',
  },
};

export function ComplaintCard({ complaint, showStudentInfo = false }: ComplaintCardProps) {
  const status = statusConfig[complaint.status];
  const StatusIcon = status.icon;

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {complaint.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(complaint.created_at), { addSuffix: true })}
            </p>
          </div>
          <Badge variant="outline" className={cn('shrink-0', status.className)}>
            <StatusIcon className="h-3 w-3 mr-1" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {complaint.description}
        </p>

        {showStudentInfo && complaint.profiles && (
          <div className="text-sm text-muted-foreground border-t pt-3">
            <span className="font-medium">Student: </span>
            {complaint.profiles.full_name} ({maskEmail(complaint.profiles.email)})
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          {complaint.image_url && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Evidence
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Attached Evidence</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={complaint.image_url}
                    alt="Complaint evidence"
                    className="w-full rounded-lg object-contain max-h-[70vh]"
                  />
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          <p className="text-xs text-muted-foreground ml-auto">
            ID: {complaint.id.slice(0, 8)}...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function maskEmail(email: string): string {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return `${localPart[0]}***@${domain}`;
  return `${localPart.slice(0, 2)}***@${domain}`;
}