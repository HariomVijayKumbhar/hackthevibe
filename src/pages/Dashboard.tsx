import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileWarning, Shield, PlusCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProgressBar } from '@/components/cyber/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ complaints: 0, modulesCompleted: 0, totalModules: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      const [complaintsRes, progressRes, modulesRes] = await Promise.all([
        supabase.from('complaints').select('id', { count: 'exact' }).eq('student_id', user.id),
        supabase.from('progress').select('id', { count: 'exact' }).eq('user_id', user.id).eq('completed', true),
        supabase.from('cyber_modules').select('id', { count: 'exact' }),
      ]);
      setStats({
        complaints: complaintsRes.count || 0,
        modulesCompleted: progressRes.count || 0,
        totalModules: modulesRes.count || 0,
      });
      setIsLoading(false);
    };
    fetchStats();
  }, [user]);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.fullName}!</h1>
          <p className="text-muted-foreground mt-1">Here's your dashboard overview</p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6"><Skeleton className="h-40" /><Skeleton className="h-40" /></div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10"><FileWarning className="h-6 w-6 text-primary" /></div>
                  <div><CardTitle className="text-lg">My Complaints</CardTitle><CardDescription>{stats.complaints} submitted</CardDescription></div>
                </CardHeader>
                <CardContent>
                  <Link to="/dashboard/complaints"><Button variant="outline" className="w-full">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 rounded-xl bg-accent/10"><Shield className="h-6 w-6 text-accent" /></div>
                  <div><CardTitle className="text-lg">Cyber Awareness</CardTitle><CardDescription>Learn to stay safe online</CardDescription></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProgressBar completed={stats.modulesCompleted} total={stats.totalModules} />
                  <Link to="/dashboard/cyber-awareness"><Button variant="outline" className="w-full">Continue Learning <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card border-dashed">
              <CardContent className="py-8 text-center">
                <PlusCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Need to Report an Incident?</h3>
                <p className="text-muted-foreground mb-4">Your identity is kept confidential</p>
                <Link to="/dashboard/complaints/new"><Button>Submit a Complaint</Button></Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}