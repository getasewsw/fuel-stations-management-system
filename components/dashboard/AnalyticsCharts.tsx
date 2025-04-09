'use client'
import React from 'react'
import {
    LineChart, 
    Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
     AreaChart,
     Area,
} from 'recharts'
import { Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
    

} from "@/components/ui/card";
import data from '@/Data/analytics';

function AnalyticsCharts() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>Monthly fuel price trends and user activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="var(--primary)"
                fillOpacity={1}
                fill="url(#colorUv)"
                name="User Views"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="var(--chart-2)"
                fillOpacity={1}
                fill="url(#colorPv)"
                name="Page Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsCharts
