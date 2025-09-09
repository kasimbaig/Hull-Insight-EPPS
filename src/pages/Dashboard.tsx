import { useState } from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, LineChart, Line, Area, AreaChart } from "recharts";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  // KPI data for different time periods
  const kpiDataSets = {
    '7d': [
      {
        title: "Fleet Operations",
        value: "147",
        change: "+2 this week",
        trend: "up" as const,
        color: "primary" as const
      },
      {
        title: "Inspection Queue", 
        value: "23",
        change: "+5 this week",
        trend: "up" as const,
        color: "warning" as const
      },
      {
        title: "Hull Assessments",
        value: "12",
        change: "+3 this week",
        trend: "up" as const, 
        color: "success" as const
      },
      {
        title: "Critical Alerts",
        value: "7",
        change: "-2 this week",
        trend: "down" as const,
        color: "destructive" as const
      }
    ],
    '30d': [
      {
        title: "Fleet Operations",
        value: "152",
        change: "+7 this month",
        trend: "up" as const,
        color: "primary" as const
      },
      {
        title: "Inspection Queue", 
        value: "45",
        change: "+12 this month",
        trend: "up" as const,
        color: "warning" as const
      },
      {
        title: "Hull Assessments",
        value: "67",
        change: "+18 this month",
        trend: "up" as const, 
        color: "success" as const
      },
      {
        title: "Critical Alerts",
        value: "15",
        change: "-5 this month",
        trend: "down" as const,
        color: "destructive" as const
      }
    ],
    '90d': [
      {
        title: "Fleet Operations",
        value: "165",
        change: "+20 this quarter",
        trend: "up" as const,
        color: "primary" as const
      },
      {
        title: "Inspection Queue", 
        value: "89",
        change: "+25 this quarter",
        trend: "up" as const,
        color: "warning" as const
      },
      {
        title: "Hull Assessments",
        value: "234",
        change: "+45 this quarter",
        trend: "up" as const, 
        color: "success" as const
      },
      {
        title: "Critical Alerts",
        value: "28",
        change: "-12 this quarter",
        trend: "down" as const,
        color: "destructive" as const
      }
    ]
  };

  const kpiData = kpiDataSets[selectedPeriod as keyof typeof kpiDataSets];

  // Chart data for different time periods
  const chartDataSets = {
    '7d': {
      barData: [
        { month: "Mon", Operational: 12, Maintenance: 2, Repair: 1 },
        { month: "Tue", Operational: 15, Maintenance: 1, Repair: 0 },
        { month: "Wed", Operational: 14, Maintenance: 3, Repair: 1 },
        { month: "Thu", Operational: 16, Maintenance: 2, Repair: 0 },
        { month: "Fri", Operational: 13, Maintenance: 1, Repair: 1 },
        { month: "Sat", Operational: 10, Maintenance: 0, Repair: 0 },
        { month: "Sun", Operational: 8, Maintenance: 0, Repair: 0 },
      ],
      pieData: [
        { name: "Active Vessels", value: 147 },
        { name: "Under Survey", value: 23 },
        { name: "In Dry Dock", value: 8 },
        { name: "Out of Service", value: 3 },
      ]
    },
    '30d': {
      barData: [
        { month: "Week 1", Operational: 45, Maintenance: 8, Repair: 3 },
        { month: "Week 2", Operational: 42, Maintenance: 6, Repair: 2 },
        { month: "Week 3", Operational: 48, Maintenance: 5, Repair: 1 },
        { month: "Week 4", Operational: 44, Maintenance: 7, Repair: 2 },
      ],
      pieData: [
        { name: "Active Vessels", value: 152 },
        { name: "Under Survey", value: 45 },
        { name: "In Dry Dock", value: 12 },
        { name: "Out of Service", value: 5 },
      ]
    },
    '90d': {
      barData: [
        { month: "Month 1", Operational: 180, Maintenance: 25, Repair: 8 },
        { month: "Month 2", Operational: 175, Maintenance: 20, Repair: 6 },
        { month: "Month 3", Operational: 185, Maintenance: 22, Repair: 5 },
      ],
      pieData: [
        { name: "Active Vessels", value: 165 },
        { name: "Under Survey", value: 89 },
        { name: "In Dry Dock", value: 28 },
        { name: "Out of Service", value: 12 },
      ]
    }
  };

  const { barData, pieData } = chartDataSets[selectedPeriod as keyof typeof chartDataSets];

  const COLORS = ["#00809D", "#00A8CC", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57"];

  // New chart data for different time periods
  const newChartDataSets = {
    '7d': {
      donutData: [
        { name: "Operational", value: 85, color: "#00809D" },
        { name: "Maintenance", value: 10, color: "#00A8CC" },
        { name: "Repair", value: 3, color: "#4ECDC4" },
        { name: "Out of Service", value: 2, color: "#FECA57" }
      ],
      lineData: [
        { day: "Mon", hull_inspections: 12, maintenance_tasks: 8, repairs: 2 },
        { day: "Tue", hull_inspections: 15, maintenance_tasks: 6, repairs: 1 },
        { day: "Wed", hull_inspections: 18, maintenance_tasks: 9, repairs: 3 },
        { day: "Thu", hull_inspections: 14, maintenance_tasks: 7, repairs: 1 },
        { day: "Fri", hull_inspections: 16, maintenance_tasks: 5, repairs: 2 },
        { day: "Sat", hull_inspections: 8, maintenance_tasks: 3, repairs: 0 },
        { day: "Sun", hull_inspections: 6, maintenance_tasks: 2, repairs: 0 }
      ]
    },
    '30d': {
      donutData: [
        { name: "Operational", value: 78, color: "#00809D" },
        { name: "Maintenance", value: 15, color: "#00A8CC" },
        { name: "Repair", value: 5, color: "#4ECDC4" },
        { name: "Out of Service", value: 2, color: "#FECA57" }
      ],
      lineData: [
        { week: "Week 1", hull_inspections: 45, maintenance_tasks: 28, repairs: 8 },
        { week: "Week 2", hull_inspections: 52, maintenance_tasks: 32, repairs: 6 },
        { week: "Week 3", hull_inspections: 48, maintenance_tasks: 25, repairs: 9 },
        { week: "Week 4", hull_inspections: 55, maintenance_tasks: 30, repairs: 7 }
      ]
    },
    '90d': {
      donutData: [
        { name: "Operational", value: 72, color: "#00809D" },
        { name: "Maintenance", value: 18, color: "#00A8CC" },
        { name: "Repair", value: 7, color: "#4ECDC4" },
        { name: "Out of Service", value: 3, color: "#FECA57" }
      ],
      lineData: [
        { month: "Month 1", hull_inspections: 180, maintenance_tasks: 95, repairs: 28 },
        { month: "Month 2", hull_inspections: 195, maintenance_tasks: 110, repairs: 32 },
        { month: "Month 3", hull_inspections: 210, maintenance_tasks: 125, repairs: 35 }
      ]
    }
  };

  const { donutData, lineData } = newChartDataSets[selectedPeriod as keyof typeof newChartDataSets];



  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Maritime Hull Management Overview • 
            <span className="ml-1 font-medium text-primary">
              {selectedPeriod === '7d' ? 'Last 7 Days' : selectedPeriod === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            {['7d', '30d', '90d'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={`text-xs transition-all duration-300 ${
                  selectedPeriod === period 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'hover:bg-muted-foreground/20'
                }`}
              >
                {period === '7d' ? 'Last 7 Days' : period === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard 
            key={`${selectedPeriod}-${index}`} 
            data={kpi} 
            className="transition-all duration-500 ease-in-out"
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Trend Bar Chart */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#00809D] transition-all duration-500">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Fleet Trend ({selectedPeriod === '7d' ? 'Last 7 Days' : selectedPeriod === '30d' ? 'Last 4 Weeks' : 'Last 3 Months'})
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} key={selectedPeriod}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Operational" fill="#00809D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Maintenance" fill="#00A8CC" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Repair" fill="#4ECDC4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Fleet Distribution Pie Chart */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#4ECDC4] transition-all duration-500">
          <h2 className="text-xl font-semibold text-foreground mb-6">Vessel Status Distribution</h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart key={selectedPeriod}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                outerRadius={90}
                fill="#00809D"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any, name: any) => [`${value}`, name]}
                labelStyle={{ color: '#00809D', fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span style={{ color: '#00809D', fontWeight: 'bold' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* New Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Status Donut Chart */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#45B7D1] transition-all duration-500">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Fleet Status Distribution ({selectedPeriod === '7d' ? 'Last 7 Days' : selectedPeriod === '30d' ? 'Last 30 Days' : 'Last 90 Days'})
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart key={selectedPeriod}>
              <Pie
                data={donutData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={100}
                fill="#00809D"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value}%`, 'Percentage']}
                labelStyle={{ color: '#00809D', fontWeight: 'bold' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span style={{ color: '#00809D', fontWeight: 'bold' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Hull Operations Trend Line Chart */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#96CEB4] transition-all duration-500">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Hull Operations Trend ({selectedPeriod === '7d' ? 'Daily' : selectedPeriod === '30d' ? 'Weekly' : 'Monthly'})
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData} key={selectedPeriod}>
              <XAxis 
                dataKey={selectedPeriod === '7d' ? 'day' : selectedPeriod === '30d' ? 'week' : 'month'} 
                stroke="#00809D"
                fontSize={12}
              />
              <YAxis stroke="#00809D" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #00809D',
                  borderRadius: '8px',
                  color: '#00809D'
                }}
                labelStyle={{ color: '#00809D', fontWeight: 'bold' }}
              />
              <Legend 
                formatter={(value) => <span style={{ color: '#00809D', fontWeight: 'bold' }}>{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="hull_inspections" 
                stroke="#00809D" 
                strokeWidth={3}
                dot={{ fill: '#00809D', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#00809D', strokeWidth: 2 }}
                name="Hull Inspections"
              />
              <Line 
                type="monotone" 
                dataKey="maintenance_tasks" 
                stroke="#00A8CC" 
                strokeWidth={3}
                dot={{ fill: '#00A8CC', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#00A8CC', strokeWidth: 2 }}
                name="Maintenance Tasks"
              />
              <Line 
                type="monotone" 
                dataKey="repairs" 
                stroke="#4ECDC4" 
                strokeWidth={3}
                dot={{ fill: '#4ECDC4', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#4ECDC4', strokeWidth: 2 }}
                name="Repairs"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

    </div>
  );
}