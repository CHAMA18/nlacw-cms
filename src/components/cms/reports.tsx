'use client';

import {
  TrendingUp,
  Clock,
  Target,
  Building,
  Download,
  Printer,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  dashboardKPIs,
  monthlyOutcomes,
  officePerformance,
  caseTypeAnalysis,
  casesByType,
} from '@/lib/mock-data';

const outcomeChartConfig = {
  resolved: { label: 'Resolved', color: '#10B981' },
  unresolved: { label: 'Unresolved', color: '#EF4444' },
  ongoing: { label: 'Ongoing', color: '#F59E0B' },
};

const officeChartConfig = {
  successRate: { label: 'Success Rate %', color: '#0D9488' },
};

const PIE_COLORS = ['#0D9488', '#14B8A6', '#2DD4BF', '#F59E0B', '#F97316', '#EF4444', '#8B5CF6'];

function getRateBadge(rate: number) {
  if (rate >= 75) return { bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' };
  if (rate >= 60) return { bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' };
  return { bg: 'bg-red-50', text: 'text-red-700', bar: 'bg-red-500' };
}

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Reports & Analytics</h2>
          <p className="text-secondary text-sm">Case statistics, outcomes, and office performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-outline-variant/50 gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" size="sm" className="border-outline-variant/50 gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, iconBg: 'bg-primary/10', iconColor: 'text-primary', label: 'Success Rate', value: `${dashboardKPIs.successRate}%`, sub: '+5% from last quarter', valueColor: 'text-primary' },
          { icon: Target, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', label: 'Cases Resolved', value: '259', sub: 'This fiscal year', valueColor: 'text-emerald-600' },
          { icon: Clock, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', label: 'Avg. Duration', value: '4.7', sub: 'Months per case', valueColor: 'text-amber-600' },
          { icon: Building, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', label: 'Active Offices', value: '3', sub: 'Lusaka, Ndola, Livingstone', valueColor: 'text-orange-600' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${card.iconBg}`}>
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <span className="text-xs text-secondary">{card.label}</span>
              </div>
              <p className={`text-2xl font-bold ${card.valueColor}`}>{card.value}</p>
              <p className="text-xs text-secondary mt-1">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Case Outcome Analysis Chart */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Case Outcome Analysis</h3>
            <p className="text-sm text-secondary mt-0.5">Monthly breakdown of resolved, unresolved, and ongoing cases</p>
          </div>
        </div>
        <ChartContainer config={outcomeChartConfig} className="h-[300px] w-full">
          <BarChart data={monthlyOutcomes} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="resolved" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="ongoing" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
            <Bar dataKey="unresolved" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Office Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6">
          <div className="mb-4 border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline-md text-headline-md text-on-surface">Office Performance Comparison</h3>
            <p className="text-sm text-secondary mt-0.5">Success rate by office location</p>
          </div>
          <ChartContainer config={officeChartConfig} className="h-[260px] w-full">
            <BarChart data={officePerformance} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="office" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="successRate" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* Case Type Distribution */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6">
          <div className="mb-4 border-b border-outline-variant/20 pb-3">
            <h3 className="font-headline-md text-headline-md text-on-surface">Case Type Distribution</h3>
            <p className="text-sm text-secondary mt-0.5">All cases by type</p>
          </div>
          <ChartContainer
            config={Object.fromEntries(
              casesByType.map((item, i) => [item.type, { label: item.type, color: PIE_COLORS[i] }])
            )}
            className="h-[260px] w-full"
          >
            <PieChart>
              <Pie
                data={casesByType}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={3}
              >
                {casesByType.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent nameKey="type" />} />
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Office Performance Table */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md text-on-surface">Office Performance Details</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Office</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Total</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Resolved</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Rate</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {officePerformance.map((item) => {
                  const rateBadge = getRateBadge(item.successRate);
                  return (
                    <tr key={item.office} className="hover:bg-primary/[0.02] transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-[16px] text-primary">corporate_fare</span>
                          </div>
                          <span className="text-sm font-medium text-on-surface">{item.office}</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right text-sm text-on-surface-variant">{item.totalCases}</td>
                      <td className="py-3 px-5 text-right text-sm text-on-surface-variant">{item.resolved}</td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${rateBadge.bar}`} style={{ width: `${item.successRate}%` }} />
                          </div>
                          <span className={`text-xs font-semibold min-w-[36px] ${rateBadge.text}`}>{item.successRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right text-sm text-secondary">{item.avgDuration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Case Type Analysis Table */}
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md text-on-surface">Case Type Analysis</h3>
          </div>
          <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low sticky top-0 z-10">
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Type</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Total</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Resolved</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Rate</th>
                  <th className="py-3 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/15">
                {caseTypeAnalysis.map((item) => {
                  const rateBadge = getRateBadge(item.successRate);
                  return (
                    <tr key={item.type} className="hover:bg-primary/[0.02] transition-colors">
                      <td className="py-3 px-5">
                        <span className="text-sm font-medium text-on-surface">{item.type}</span>
                      </td>
                      <td className="py-3 px-5 text-right text-sm text-on-surface-variant">{item.totalCases}</td>
                      <td className="py-3 px-5 text-right text-sm text-on-surface-variant">{item.resolved}</td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${rateBadge.bar}`} style={{ width: `${item.successRate}%` }} />
                          </div>
                          <span className={`text-xs font-semibold min-w-[36px] ${rateBadge.text}`}>{item.successRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-right text-sm text-secondary">{item.avgDuration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
