import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Complaint } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function Complaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('complaints')
        .select('*')
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
      setComplaints((data as Complaint[]) || []);
      setIsLoading(false);
    };
    fetchComplaints();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-2xl font-bold">My Complaints</h1><p className="text-muted-foreground">Track the status of your reports</p></div>
          <Link to="/dashboard/complaints/new"><Button><PlusCircle className="h-4 w-4 mr-2" />New Complaint</Button></Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48" />)}</div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Inbox className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No complaints yet</h3>
            <p className="text-muted-foreground mb-4">Submit your first complaint to get started</p>
            <Link to="/dashboard/complaints/new"><Button>Submit Complaint</Button></Link>
          </div>
        ) : (
          <div className="grid gap-4">{complaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)}</div>
        )}
      </div>
    </DashboardLayout>
  );
}