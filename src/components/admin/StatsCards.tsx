import { FileWarning, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Complaint } from '@/types';

interface StatsCardsProps {
  complaints: Complaint[];
}

export function StatsCards({ complaints }: StatsCardsProps) {
  const stats = {
    total: complaints.length,
    submitted: complaints.filter((c) => c.status === 'submitted').length,
    inReview: complaints.filter((c) => c.status === 'in_review').length,
    resolved: complaints.filter((c) => c.status === 'resolved').length,
  };

  const cards = [
    {
      title: 'Total Complaints',
      value: stats.total,
      icon: FileWarning,
      className: 'text-foreground',
    },
    {
      title: 'Submitted',
      value: stats.submitted,
      icon: AlertCircle,
      className: 'text-warning',
    },
    {
      title: 'In Review',
      value: stats.inReview,
      icon: Clock,
      className: 'text-primary',
    },
    {
      title: 'Resolved',
      value: stats.resolved,
      icon: CheckCircle2,
      className: 'text-success',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-5 w-5 ${card.className}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-bold ${card.className}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}