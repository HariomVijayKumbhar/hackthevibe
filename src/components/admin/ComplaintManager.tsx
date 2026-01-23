import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle2, AlertCircle, Eye, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Complaint, ComplaintStatus } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ComplaintManagerProps {
  complaint: Complaint;
  onUpdate: () => void;
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

export function ComplaintManager({ complaint, onUpdate }: ComplaintManagerProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<ComplaintStatus>(complaint.status);

  const status = statusConfig[currentStatus];
  const StatusIcon = status.icon;

  const handleStatusChange = async (newStatus: ComplaintStatus) => {
    if (newStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('complaints')
        .update({ status: newStatus })
        .eq('id', complaint.id);

      if (error) throw error;

      setCurrentStatus(newStatus);
      toast.success(`Status updated to ${statusConfig[newStatus].label}`);
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setIsUpdating(false);
    }
  };

  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split('@');
    if (localPart.length <= 2) return `${localPart[0]}***@${domain}`;
    return `${localPart.slice(0, 2)}***@${domain}`;
  };

  return (
    <Card className="shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight line-clamp-2">
              {complaint.title}
            </CardTitle>
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

        {complaint.profiles && (
          <div className="text-sm text-muted-foreground border-t pt-3">
            <span className="font-medium">Student: </span>
            {complaint.profiles.full_name} ({maskEmail(complaint.profiles.email)})
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t">
          {complaint.image_url && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Evidence
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

          <div className="flex items-center gap-2 ml-auto">
            {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
            <Select
              value={currentStatus}
              onValueChange={(value) => handleStatusChange(value as ComplaintStatus)}
              disabled={isUpdating}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in_review">In Review</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}