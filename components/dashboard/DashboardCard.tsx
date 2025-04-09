import React from 'react';
import { LucideIcon } from 'lucide-react';
import  {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Newspaper, Receipt} from 'lucide-react'
interface DashboardCardProps {
  title: string;
  count: number;
  description: string;
  icon: React.ReactElement<LucideIcon>;
}
//       <CommandItem>
//         <Settings className="mr-2 h-4 w-4" />
//         <span>Settings</span>
//         <CommandShortcut>⌘S</CommandShortcut>
//       </CommandItem>
//       <CommandItem>
//      

function DashboardCard({title, count, description, icon}: DashboardCardProps) {
  return (
    
      <Card className=" bg-slate-200 dark:bg-slate-700 p-4 pb-0">
        <CardContent>
          <h3 className='text-3xl mb-4 text-center font-bold text-slate-600 dark:text-slate-300'>
            {title}
            </h3>
            <div className='flex ga p-5 justify-center items-center'>
{icon}
<h3 className="text-5xl font-semibold text-slate-400 dark:text-slate-200">
  {count}
</h3>
            </div>
        </CardContent>
    
    </Card>
  )
}

export default DashboardCard
