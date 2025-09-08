import { useState } from "react";
import { Calendar, Users, Ship, AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, LineChart, Line } from "recharts";

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

  // Recent activity data for different time periods
  const activityDataSets = {
    '7d': [
      {
        id: 1,
        type: "survey_submitted",
        title: "Daily Survey Submitted",
        description: "INS Vikrant - Daily Hull Inspection",
        status: "pending",
        time: "2 hours ago",
        user: "Lt. Commander Singh"
      },
      {
        id: 2,
        type: "plan_approved",
        title: "Emergency Plan Approved",
        description: "INS Kolkata - Emergency Repair Plan",
        status: "approved",
        time: "4 hours ago", 
        user: "Admiral Nair"
      },
      {
        id: 3,
        type: "survey_reviewed",
        title: "Survey Under Review",
        description: "INS Chennai - Daily Hull Survey",
        status: "under_review",
        time: "6 hours ago",
        user: "Captain Sharma"
      },
      {
        id: 4,
        type: "action_overdue",
        title: "Daily Action Overdue",
        description: "INS Mumbai - Hull Compartment C-302",
        status: "overdue",
        time: "1 day ago",
        user: "System Alert"
      }
    ],
    '30d': [
      {
        id: 1,
        type: "survey_submitted",
        title: "Weekly Survey Submitted",
        description: "INS Vikrant - Weekly Hull Survey",
        status: "pending",
        time: "2 hours ago",
        user: "Lt. Commander Singh"
      },
      {
        id: 2,
        type: "plan_approved",
        title: "Monthly Plan Approved",
        description: "INS Kolkata - Monthly Maintenance Plan",
        status: "approved",
        time: "4 hours ago", 
        user: "Admiral Nair"
      },
      {
        id: 3,
        type: "survey_reviewed",
        title: "Survey Under Review",
        description: "INS Chennai - Weekly Hull Survey",
        status: "under_review",
        time: "6 hours ago",
        user: "Captain Sharma"
      },
      {
        id: 4,
        type: "action_overdue",
        title: "Weekly Action Overdue",
        description: "INS Mumbai - Hull Compartment C-302",
        status: "overdue",
        time: "3 days ago",
        user: "System Alert"
      }
    ],
    '90d': [
      {
        id: 1,
        type: "survey_submitted",
        title: "Quarterly Survey Submitted",
        description: "INS Vikrant - Q4 2024 Hull Survey",
        status: "pending",
        time: "2 hours ago",
        user: "Lt. Commander Singh"
      },
      {
        id: 2,
        type: "plan_approved",
        title: "Quarterly Plan Approved",
        description: "INS Kolkata - Q4 Maintenance Plan",
        status: "approved",
        time: "4 hours ago", 
        user: "Admiral Nair"
      },
      {
        id: 3,
        type: "survey_reviewed",
        title: "Survey Under Review",
        description: "INS Chennai - Q4 2024 Hull Survey",
        status: "under_review",
        time: "6 hours ago",
        user: "Captain Sharma"
      },
      {
        id: 4,
        type: "action_overdue",
        title: "Quarterly Action Overdue",
        description: "INS Mumbai - Hull Compartment C-302",
        status: "overdue",
        time: "1 week ago",
        user: "System Alert"
      }
    ]
  };

  // Upcoming tasks data for different time periods
  const taskDataSets = {
    '7d': [
      {
        id: 1,
        title: "Daily Hull Inspection - INS Vikrant",
        vessel: "INS Vikrant",
        dueDate: "Today, 4:00 PM",
        priority: "high"
      },
      {
        id: 2,
        title: "Emergency Repair Review - INS Shivalik", 
        vessel: "INS Shivalik",
        dueDate: "Tomorrow, 10:00 AM",
        priority: "medium"
      },
      {
        id: 3,
        title: "Daily Equipment Check",
        vessel: "INS Kolkata",
        dueDate: "Tomorrow, 2:00 PM",
        priority: "low"
      }
    ],
    '30d': [
      {
        id: 1,
        title: "Weekly Survey Review - INS Vikrant",
        vessel: "INS Vikrant",
        dueDate: "This Week",
        priority: "high"
      },
      {
        id: 2,
        title: "Monthly Plan Approval - INS Shivalik", 
        vessel: "INS Shivalik",
        dueDate: "Next Week",
        priority: "medium"
      },
      {
        id: 3,
        title: "Monthly Equipment Inspection",
        vessel: "INS Kolkata",
        dueDate: "Dec 20, 2024",
        priority: "low"
      }
    ],
    '90d': [
      {
        id: 1,
        title: "Quarterly Survey Review - INS Vikrant",
        vessel: "INS Vikrant",
        dueDate: "This Month",
        priority: "high"
      },
      {
        id: 2,
        title: "Quarterly Plan Approval - INS Shivalik", 
        vessel: "INS Shivalik",
        dueDate: "Next Month",
        priority: "medium"
      },
      {
        id: 3,
        title: "Q1 2025 Survey Planning",
        vessel: "INS Kolkata",
        dueDate: "Dec 15, 2024",
        priority: "low"
      }
    ]
  };

  const recentActivity = activityDataSets[selectedPeriod as keyof typeof activityDataSets];
  const upcomingTasks = taskDataSets[selectedPeriod as keyof typeof taskDataSets];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="status-approved">Approved</Badge>;
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>;
      case 'under_review':
        return <Badge className="status-pending">Under Review</Badge>;
      case 'overdue':
        return <Badge className="status-rejected">Overdue</Badge>;
      default:
        return <Badge className="status-draft">Draft</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

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
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Fleet Trend ({selectedPeriod === '7d' ? 'Last 7 Days' : selectedPeriod === '30d' ? 'Last 4 Weeks' : 'Last 3 Months'})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
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
          <h2 className="text-xl font-semibold text-foreground mb-4">Vessel Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart key={selectedPeriod}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#00809D"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#00809D]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00809D] rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
            </div>
            <Button variant="outline" size="sm" className="hover:bg-[#00809D] hover:text-white transition-colors">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={activity.id} className="group relative">
                <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-muted/50 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00809D] to-[#00A8CC] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      {activity.type === 'survey_submitted' && <FileText className="h-5 w-5 text-white" />}
                      {activity.type === 'plan_approved' && <CheckCircle className="h-5 w-5 text-white" />}
                      {activity.type === 'survey_reviewed' && <Clock className="h-5 w-5 text-white" />}
                      {activity.type === 'action_overdue' && <AlertTriangle className="h-5 w-5 text-white" />}
                    </div>
                    {index < recentActivity.length - 1 && (
                      <div className="w-0.5 h-8 bg-gradient-to-b from-[#00809D] to-transparent mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-[#00809D] transition-colors">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{activity.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{activity.user}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20 border-l-4 border-l-[#4ECDC4]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#4ECDC4] rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Upcoming Tasks</h2>
            </div>
            <Badge variant="secondary" className="bg-[#4ECDC4]/20 text-[#4ECDC4] border-[#4ECDC4]/30 font-semibold">
              {upcomingTasks.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="group relative">
                <div className="p-4 bg-white/50 rounded-xl border border-muted/50 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-[#4ECDC4] transition-colors">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700 border border-red-200' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-green-100 text-green-700 border border-green-200'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Ship className="h-3 w-3" />
                      <span className="font-medium">{task.vessel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                  
                  {/* Priority indicator line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" className="w-full mt-4 hover:bg-[#4ECDC4] hover:text-white transition-colors" size="sm">
            View All Tasks
          </Button>
        </Card>
      </div>

    </div>
  );
}