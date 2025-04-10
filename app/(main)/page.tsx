import {Button} from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { Flame, Fuel, LucideIcon, MessageCircle, User } from 'lucide-react';
import {Newspaper, Receipt} from 'lucide-react'
import PostsTable from "@/components/posts/PostsTable";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";

export default function Home() {
  return (
<>
    <div className="flex flex-col justify-between gap-5 mb-6 md:flex-row">
      <DashboardCard 
      title = 'Price'
       count = {120} 
       icon= {<Receipt className=  'text-slate-400' size={72} /> }
       />
       <DashboardCard 
      title = 'Station'
       count = {99} 
       icon= {<Fuel className=  'text-slate-400' size={72} /> }
       />
       <DashboardCard 
      title = 'Users'
       count = {700} 
       icon= {<User className=  'text-slate-400' size={72} /> }
       />
       <DashboardCard 
      title = 'Fuel Types'
       count = {120} 
       icon= {<Flame className=  'text-slate-400' size={72} /> }
       />
       </div>

       <PostsTable title= 'latest result' limit={5} />
      <AnalyticsCharts />
    </>
  );
}
