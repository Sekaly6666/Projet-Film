"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Janvier", noteMoyenne: 6.2 },
  { month: "Février", noteMoyenne: 6.8 },
  { month: "Mars", noteMoyenne: 7.5 },
  { month: "Avril", noteMoyenne: 7.2 },
  { month: "Mai", noteMoyenne: 7.8 },
];

const chartConfig = {
  noteMoyenne: {
    label: "Note Publique",
    color: "rgb(185, 28, 28)",
  },
};

export function AdminChart() {
  return (
    <Card className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-slate-900 text-lg font-bold">Évolution des Notes</CardTitle>
        <CardDescription className="text-slate-400 text-xs">Moyenne mensuelle globale de la communauté</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
       
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 10 }}
          >
            <CartesianGrid vertical={false} className="stroke-slate-100" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-xs fill-slate-450 font-medium"
            />
            <YAxis 
              domain={[0, 10]} 
              tickLine={false} 
              axisLine={false}
              className="text-xs fill-slate-450"
            />
           
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="noteMoyenne"
              type="monotone"
              stroke="var(--color-noteMoyenne)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--color-noteMoyenne)" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}