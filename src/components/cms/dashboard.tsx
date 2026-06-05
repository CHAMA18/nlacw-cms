'use client';

import {
  Briefcase,
  Plus,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Gavel,
  FileCheck,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  dashboardKPIs,
  monthlyCaseIntake,
  casesByType,
  casesByOffice,
  caseStatusBreakdown,
  activities,
  calendarEvents,
  getStatusColor,
  getEventTypeColor,
  type NavItem,
} from '@/lib/mock-data';

interface DashboardProps {
  onNavigate: (item: NavItem) => void;
}

const kpiCards = [
  {
    title: 'Total Active Cases',
    value: dashboardKPIs.totalActiveCases,
    change: '+12%',
    trend: 'up' as const,
    icon: Briefcase,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    title: 'New This Month',
    value: dashboardKPIs.newCasesThisMonth,
    change: '+8%',
    trend: 'up' as const,
    icon: Plus,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Awaiting Court',
    value: dashboardKPIs.casesAwaitingCourt,
    change: '-3%',
    trend: 'down' as const,
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    title: 'Success Rate',
    value: `${dashboardKPIs.successRate}%`,
    change: '+5%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    title: 'Total Clients',
    value: dashboardKPIs.totalClients.toLocaleString(),
    change: '+2%',
    trend: 'up' as const,
    icon: Users,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    title: 'Pending Reviews',
    value: dashboardKPIs.pendingReviews,
    change: '-7%',
    trend: 'down' as const,
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
];

const intakeChartConfig = {
  cases: {
    label: 'New Cases',
    color: '#0D9488',
  },
};

const typeChartConfig = {
  count: {
    label: 'Cases',
  },
  GBV: { label: 'GBV', color: '#0D9488' },
  'Domestic Violence': { label: 'Domestic Violence', color: '#14B8A6' },
  Maintenance: { label: 'Maintenance', color: '#2DD4BF' },
  'Property Dispute': { label: 'Property Dispute', color: '#F59E0B' },
  'Child Custody': { label: 'Child Custody', color: '#F97316' },
  Inheritance: { label: 'Inheritance', color: '#EF4444' },
  'Land Dispute': { label: 'Land Dispute', color: '#8B5CF6' },
};

const officeChartConfig = {
  count: {
    label: 'Cases',
  },
  Lusaka: { label: 'Lusaka', color: '#0D9488' },
  Ndola: { label: 'Ndola', color: '#14B8A6' },
  Livingstone: { label: 'Livingstone', color: '#2DD4BF' },
};

const PIE_COLORS = ['#0D9488', '#14B8A6', '#2DD4BF'];

export function Dashboard({ onNavigate }: DashboardProps) {
  const upcomingEvents = calendarEvents
    .filter((e) => new Date(e.date) >= new Date('2026-06-05'))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-slate-500 mt-1">
          Welcome back, Mwamba. Here&apos;s an overview of NLACW operations.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${kpi.bg}`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-0.5 text-xs font-medium ${
                      kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Intake Trend */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Case Intake Trends</CardTitle>
            <CardDescription>Monthly new cases over the past 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={intakeChartConfig} className="h-[280px] w-full">
              <LineChart data={monthlyCaseIntake} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="#0D9488"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0D9488' }}
                  activeDot={{ r: 6, fill: '#0D9488' }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Cases by Office (Pie) */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Cases by Office</CardTitle>
            <CardDescription>Distribution across NLACW offices</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={officeChartConfig} className="h-[280px] w-full">
              <PieChart>
                <Pie
                  data={casesByOffice}
                  dataKey="count"
                  nameKey="office"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {casesByOffice.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cases by Type Bar Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Cases by Type</CardTitle>
          <CardDescription>Current active cases categorized by type</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={typeChartConfig} className="h-[300px] w-full">
            <BarChart data={casesByType} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="type" tick={{ fontSize: 11 }} stroke="#94a3b8" angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {casesByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bottom Row: Activity Feed + Upcoming Court Dates + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest updates across all cases</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                >
                  <div className="mt-0.5">
                    {activity.type === 'court' && <Gavel className="w-4 h-4 text-red-500" />}
                    {activity.type === 'document' && <FileCheck className="w-4 h-4 text-teal-500" />}
                    {activity.type === 'task' && <Calendar className="w-4 h-4 text-amber-500" />}
                    {activity.type === 'client' && <Users className="w-4 h-4 text-emerald-500" />}
                    {activity.type === 'case' && <Briefcase className="w-4 h-4 text-teal-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 leading-snug">{activity.action}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activity.user} · {new Date(activity.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Court Dates */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Upcoming Court Dates</CardTitle>
                <CardDescription>Next scheduled appearances</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-teal-600 hover:text-teal-700 text-xs"
                onClick={() => onNavigate('calendar')}
              >
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto">
              {upcomingEvents
                .filter((e) => e.type === 'Court Hearing' || e.type === 'Deadline')
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                  >
                    <div className="text-center min-w-[48px]">
                      <p className="text-lg font-bold text-teal-600">
                        {new Date(event.date).getDate()}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 font-medium">
                        {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{event.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{event.time} · {event.location}</p>
                      <Badge variant="outline" className={`text-[10px] mt-1 ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Status Breakdown */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Case Status Overview</CardTitle>
            <CardDescription>All cases by current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs text-right">Count</TableHead>
                  <TableHead className="text-xs text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStatusBreakdown.map((item) => {
                  const total = caseStatusBreakdown.reduce((sum, i) => sum + i.count, 0);
                  const percentage = ((item.count / total) * 100).toFixed(1);
                  return (
                    <TableRow key={item.status}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-sm">{item.count}</TableCell>
                      <TableCell className="text-right text-sm text-slate-500">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
