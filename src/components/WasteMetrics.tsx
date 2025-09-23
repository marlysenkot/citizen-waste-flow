import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, Recycle, Award, Target } from "lucide-react";

const wasteData = [
  { month: "Jan", recyclable: 45, organic: 30, general: 25 },
  { month: "Feb", recyclable: 52, organic: 35, general: 23 },
  { month: "Mar", recyclable: 48, organic: 32, general: 20 },
  { month: "Apr", recyclable: 61, organic: 38, general: 19 },
  { month: "May", recyclable: 55, organic: 40, general: 15 },
  { month: "Jun", recyclable: 67, organic: 45, general: 18 },
];

const pieData = [
  { name: "Recyclable", value: 55, color: "hsl(var(--success))" },
  { name: "Organic", value: 30, color: "hsl(var(--warning))" },
  { name: "General", value: 15, color: "hsl(var(--destructive))" },
];

const trendData = [
  { month: "Jan", ecoPoints: 120 },
  { month: "Feb", ecoPoints: 180 },
  { month: "Mar", ecoPoints: 240 },
  { month: "Apr", ecoPoints: 320 },
  { month: "May", ecoPoints: 380 },
  { month: "Jun", ecoPoints: 450 },
];

const chartConfig = {
  recyclable: {
    label: "Recyclable",
    color: "hsl(var(--success))",
  },
  organic: {
    label: "Organic",
    color: "hsl(var(--warning))",
  },
  general: {
    label: "General",
    color: "hsl(var(--destructive))",
  },
  ecoPoints: {
    label: "Eco Points",
    color: "hsl(var(--primary))",
  },
};

export function WasteMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Stats Cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Eco Points</CardTitle>
          <Award className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,450</div>
          <p className="text-xs text-muted-foreground">+180 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Collections</CardTitle>
          <Recycle className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
          <Target className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">75%</div>
          <p className="text-xs text-muted-foreground">Progress this month</p>
        </CardContent>
      </Card>

      {/* Charts */}
      <Card className="col-span-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Waste Collection Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="recyclable" fill="var(--color-recyclable)" />
                <Bar dataKey="organic" fill="var(--color-organic)" />
                <Bar dataKey="general" fill="var(--color-general)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Waste Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eco Points Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="ecoPoints" 
                  stroke="var(--color-ecoPoints)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-ecoPoints)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}