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
     ResponsiveContainer
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
    <>
      <Card>
        <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Analytics Views</CardDescription>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </CardHeader>
      </Card>
    </>
  )
}

export default AnalyticsCharts
