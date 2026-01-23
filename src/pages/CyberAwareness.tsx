import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ModuleCard } from '@/components/cyber/ModuleCard';
import { ModuleViewer } from '@/components/cyber/ModuleViewer';
import { ProgressBar } from '@/components/cyber/ProgressBar';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CyberModule, Progress } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function CyberAwareness() {
  const { user } = useAuth();
  const [modules, setModules] = useState<CyberModule[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [selectedModule, setSelectedModule] = useState<CyberModule | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    const [modulesRes, progressRes] = await Promise.all([
      supabase.from('cyber_modules').select('*').order('display_order'),
      supabase.from('progress').select('*').eq('user_id', user.id),
    ]);
    setModules((modulesRes.data as CyberModule[]) || []);
    setProgress((progressRes.data as Progress[]) || []);
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, [user]);

  const completedCount = progress.filter((p) => p.completed).length;
  const getProgress = (moduleId: string) => progress.find((p) => p.module_id === moduleId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div><h1 className="text-2xl font-bold">Cyber Awareness</h1><p className="text-muted-foreground">Learn essential skills to stay safe online</p></div>
        
        <ProgressBar completed={completedCount} total={modules.length} />

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-64" />)}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((m) => <ModuleCard key={m.id} module={m} progress={getProgress(m.id)} onSelect={setSelectedModule} />)}
          </div>
        )}

        <ModuleViewer module={selectedModule} progress={selectedModule ? getProgress(selectedModule.id) : undefined} onClose={() => setSelectedModule(null)} onComplete={fetchData} />
      </div>
    </DashboardLayout>
  );
}