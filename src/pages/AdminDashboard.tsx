import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatsCards } from '@/components/admin/StatsCards';
import { ComplaintManager } from '@/components/admin/ComplaintManager';
import { supabase } from '@/integrations/supabase/client';
import { Complaint, ComplaintStatus } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ComplaintStatus>('all');
  const [search, setSearch] = useState('');

  const fetchComplaints = async () => {
    const { data } = await supabase.from('complaints').select('*, profiles!complaints_student_id_fkey(*)').order('created_at', { ascending: false });
    setComplaints((data as Complaint[]) || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchComplaints(); }, []);

  const filtered = complaints.filter((c) => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">Admin Dashboard</h1><p className="text-muted-foreground">Manage and review all complaints</p></div>

        {isLoading ? <Skeleton className="h-32" /> : <StatsCards complaints={complaints} />}

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search complaints..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48" />)}</div>
        ) : (
          <div className="grid gap-4">{filtered.map((c) => <ComplaintManager key={c.id} complaint={c} onUpdate={fetchComplaints} />)}</div>
        )}
      </div>
    </AdminLayout>
  );
}