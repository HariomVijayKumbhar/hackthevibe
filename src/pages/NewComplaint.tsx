import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComplaintForm } from '@/components/complaints/ComplaintForm';

export default function NewComplaint() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-6"><h1 className="text-2xl font-bold">Submit a Complaint</h1><p className="text-muted-foreground">Report a ragging incident confidentially</p></div>
        <ComplaintForm />
      </div>
    </DashboardLayout>
  );
}