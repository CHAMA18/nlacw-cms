'use client';

import {
  Briefcase,
  PlusCircle,
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Gavel,
  FileCheck,
  Calendar,
  MoreHorizontal,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  dashboardKPIs,
  caseStatusBreakdown,
  activities,
  calendarEvents,
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
    iconBg: 'bg-[#0d7c71]/10',
    iconColor: 'text-[#006158]',
    changeBg: 'bg-[#006158]/10',
    changeColor: 'text-[#006158]',
  },
  {
    title: 'New Intakes (This Week)',
    value: 34,
    change: '+8%',
    trend: 'up' as const,
    icon: PlusCircle,
    iconBg: 'bg-[#d6e0f3]/30',
    iconColor: 'text-[#555f6f]',
    changeBg: 'bg-[#006158]/10',
    changeColor: 'text-[#006158]',
  },
  {
    title: 'Pending Review',
    value: 89,
    change: '-3%',
    trend: 'down' as const,
    icon: Clock,
    iconBg: 'bg-[#667070]/10',
    iconColor: 'text-[#4e5857]',
    changeBg: 'bg-[#ba1a1a]/10',
    changeColor: 'text-[#ba1a1a]',
  },
  {
    title: 'Resolution Rate',
    value: '73%',
    change: '+5%',
    trend: 'up' as const,
    icon: TrendingUp,
    iconBg: 'bg-[#0d7c71]/10',
    iconColor: 'text-[#006158]',
    changeBg: 'bg-[#006158]/10',
    changeColor: 'text-[#006158]',
  },
  {
    title: 'Total Clients',
    value: dashboardKPIs.totalClients.toLocaleString(),
    change: '+2%',
    trend: 'up' as const,
    icon: Users,
    iconBg: 'bg-[#d6e0f3]/30',
    iconColor: 'text-[#555f6f]',
    changeBg: 'bg-[#006158]/10',
    changeColor: 'text-[#006158]',
  },
  {
    title: 'Urgent Alerts',
    value: 42,
    change: '+15%',
    trend: 'up' as const,
    icon: AlertTriangle,
    iconBg: 'bg-[#ffdad6]/30',
    iconColor: 'text-[#ba1a1a]',
    changeBg: 'bg-[#ba1a1a]/10',
    changeColor: 'text-[#ba1a1a]',
    valueColor: 'text-[#ba1a1a]',
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const upcomingEvents = calendarEvents
    .filter((e) => new Date(e.date) >= new Date('2026-06-05'))
    .slice(0, 6);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-[30px] lg:text-[48px] font-bold text-[#0b1c30] leading-[1.17] tracking-[-0.02em]">
          Dashboard
        </h2>
        <p className="text-[18px] text-[#3e4947] mt-2 leading-7">
          Welcome back, Mwamba. Here&apos;s an overview of NLACW operations.
        </p>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white rounded-lg p-4 border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`w-10 h-10 rounded-full ${kpi.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
                <div className={`flex items-center ${kpi.changeColor} ${kpi.changeBg} px-2 py-1 rounded-full`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[12px] font-semibold ml-1 tracking-[0.05em]">{kpi.change}</span>
                </div>
              </div>
              <p className="text-[12px] text-[#3e4947] mb-1 font-medium tracking-[0.05em]">{kpi.title}</p>
              <h3 className={`text-[30px] font-bold leading-[38px] tracking-[-0.01em] ${kpi.valueColor || 'text-[#0b1c30]'}`}>
                {kpi.value}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-8 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-[#bdc9c6] pb-2">
            <h3 className="text-[20px] font-semibold text-[#0b1c30] leading-7">Case Intake Trends</h3>
            <button className="text-[#006158] hover:text-[#0d7c71] transition-colors p-1 rounded hover:bg-[#eff4ff]">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 relative w-full">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 250">
              <defs>
                <linearGradient id="teal-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006158" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#006158" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line className="chart-grid" x1="40" x2="780" y1="20" y2="20" stroke="#E2E8F0" strokeDasharray="4" />
              <line className="chart-grid" x1="40" x2="780" y1="70" y2="70" stroke="#E2E8F0" strokeDasharray="4" />
              <line className="chart-grid" x1="40" x2="780" y1="120" y2="120" stroke="#E2E8F0" strokeDasharray="4" />
              <line className="chart-grid" x1="40" x2="780" y1="170" y2="170" stroke="#E2E8F0" strokeDasharray="4" />
              <line className="chart-grid" x1="40" x2="780" y1="220" y2="220" stroke="#E2E8F0" strokeDasharray="4" />
              {/* Y-Axis Labels */}
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="end" x="30" y="25">60</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="end" x="30" y="75">45</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="end" x="30" y="125">30</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="end" x="30" y="175">15</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="end" x="30" y="225">0</text>
              {/* Area Fill */}
              <path fill="url(#teal-gradient)" d="M 60 170 C 120 120, 180 180, 240 100 C 300 40, 360 80, 420 140 C 480 190, 540 100, 600 60 C 660 30, 720 90, 780 110 L 780 220 L 60 220 Z" />
              {/* Line */}
              <path stroke="#006158" strokeWidth="2" fill="none" d="M 60 170 C 120 120, 180 180, 240 100 C 300 40, 360 80, 420 140 C 480 190, 540 100, 600 60 C 660 30, 720 90, 780 110" />
              {/* Data Points */}
              <circle fill="#ffffff" stroke="#006158" strokeWidth="2" cx="60" cy="170" r="4" />
              <circle fill="#ffffff" stroke="#006158" strokeWidth="2" cx="240" cy="100" r="4" />
              <circle fill="#ffffff" stroke="#006158" strokeWidth="2" cx="420" cy="140" r="4" />
              <circle fill="#ffffff" stroke="#006158" strokeWidth="2" cx="600" cy="60" r="4" />
              <circle fill="#ffffff" stroke="#006158" strokeWidth="2" cx="780" cy="110" r="4" />
              {/* X-Axis Labels */}
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="60" y="240">Jul</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="180" y="240">Sep</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="300" y="240">Nov</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="420" y="240">Jan</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="540" y="240">Mar</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="660" y="240">May</text>
              <text className="fill-[#3e4947]" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.05em' }} textAnchor="middle" x="780" y="240">Jun</text>
            </svg>
          </div>
        </div>

        {/* Donut Chart Card */}
        <div className="bg-white rounded-lg border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-8 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6 border-b border-[#bdc9c6] pb-2">
            <h3 className="text-[20px] font-semibold text-[#0b1c30] leading-7">Cases by Office</h3>
            <button className="text-[#006158] hover:text-[#0d7c71] transition-colors p-1 rounded hover:bg-[#eff4ff]">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <svg className="w-48 h-48" viewBox="0 0 100 100">
              {/* Lusaka - 55% */}
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#006158" strokeDasharray="140 111.3" strokeDashoffset="25" strokeWidth="16" />
              {/* Ndola - 28% */}
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#0d7c71" strokeDasharray="70 181.3" strokeDashoffset="-115" strokeWidth="16" />
              {/* Livingstone - 17% */}
              <circle cx="50" cy="50" fill="transparent" r="40" stroke="#7bd6c9" strokeDasharray="41.3 210" strokeDashoffset="-185" strokeWidth="16" />
              {/* Center Text */}
              <text className="fill-[#0b1c30]" style={{ fontSize: '14px', fontWeight: '600' }} textAnchor="middle" x="50" y="45">Total</text>
              <text className="fill-[#0b1c30]" style={{ fontSize: '16px', fontWeight: '700' }} textAnchor="middle" x="50" y="60">247</text>
            </svg>
            {/* Legend */}
            <div className="w-full mt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#006158]" />
                  <span className="text-[14px] text-[#3e4947] font-medium">Lusaka</span>
                </div>
                <span className="text-[14px] text-[#0b1c30] font-medium">55%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0d7c71]" />
                  <span className="text-[14px] text-[#3e4947] font-medium">Ndola</span>
                </div>
                <span className="text-[14px] text-[#0b1c30] font-medium">28%</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#7bd6c9]" />
                  <span className="text-[14px] text-[#3e4947] font-medium">Livingstone</span>
                </div>
                <span className="text-[14px] text-[#0b1c30] font-medium">17%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Activity Feed + Upcoming Court Dates + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 pb-3 border-b border-[#bdc9c6]">
            <h3 className="text-[20px] font-semibold text-[#0b1c30] leading-7">Recent Activity</h3>
            <p className="text-[14px] text-[#3e4947] mt-0.5">Latest updates across all cases</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-[#eff4ff] transition-colors border-b border-[#bdc9c6]/50 last:border-0"
              >
                <div className="mt-0.5">
                  {activity.type === 'court' && <Gavel className="w-4 h-4 text-[#ba1a1a]" />}
                  {activity.type === 'document' && <FileCheck className="w-4 h-4 text-[#006158]" />}
                  {activity.type === 'task' && <Calendar className="w-4 h-4 text-[#a88848]" />}
                  {activity.type === 'client' && <Users className="w-4 h-4 text-[#0d7c71]" />}
                  {activity.type === 'case' && <Briefcase className="w-4 h-4 text-[#006158]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-[#0b1c30] leading-snug">{activity.action}</p>
                  <p className="text-[12px] text-[#3e4947] mt-0.5">
                    {activity.user} · {new Date(activity.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Court Dates */}
        <div className="bg-white rounded-lg border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 pb-3 border-b border-[#bdc9c6]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[20px] font-semibold text-[#0b1c30] leading-7">Upcoming Court Dates</h3>
                <p className="text-[14px] text-[#3e4947] mt-0.5">Next scheduled appearances</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#006158] hover:text-[#0d7c71] text-[12px] font-semibold"
                onClick={() => onNavigate('calendar')}
              >
                View All
              </Button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {upcomingEvents
              .filter((e) => e.type === 'Court Hearing' || e.type === 'Deadline')
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-[#eff4ff] transition-colors border-b border-[#bdc9c6]/50 last:border-0"
                >
                  <div className="text-center min-w-[48px]">
                    <p className="text-lg font-bold text-[#006158]">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-[10px] uppercase text-[#3e4947] font-semibold tracking-[0.05em]">
                      {new Date(event.date).toLocaleDateString('en-GB', { month: 'short' })}
                    </p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium text-[#0b1c30] truncate">{event.title}</p>
                    <p className="text-[12px] text-[#3e4947] mt-0.5">{event.time} · {event.location}</p>
                    <Badge variant="outline" className={`text-[10px] mt-1 ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Case Status Breakdown */}
        <div className="bg-white rounded-lg border border-[#bdc9c6] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="p-4 pb-3 border-b border-[#bdc9c6]">
            <h3 className="text-[20px] font-semibold text-[#0b1c30] leading-7">Case Status Overview</h3>
            <p className="text-[14px] text-[#3e4947] mt-0.5">All cases by current status</p>
          </div>
          <div className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[12px] font-semibold text-[#3e4947] tracking-[0.05em]">Status</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#3e4947] tracking-[0.05em] text-right">Count</TableHead>
                  <TableHead className="text-[12px] font-semibold text-[#3e4947] tracking-[0.05em] text-right">%</TableHead>
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
                          <span className="text-[14px] text-[#0b1c30]">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-[14px] text-[#0b1c30]">{item.count}</TableCell>
                      <TableCell className="text-right text-[14px] text-[#3e4947]">{percentage}%</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
