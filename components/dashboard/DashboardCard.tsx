import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactElement<any>;
}

function DashboardCard({ title, count, icon }: DashboardCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              {React.cloneElement(icon, {
                className: "h-6 w-6 text-primary",
              })}
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{count}</span>
              <span className="text-xs text-muted-foreground">Total {title}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardCard;
