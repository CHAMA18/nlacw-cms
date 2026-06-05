'use client';

import {
  TrendingUp,
  Clock,
  Target,
  Building,
  Download,
  Printer,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  monthlyOutcomes,
  officePerformance,
  caseTypeAnalysis,
  casesByType,
  casesByOffice,
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

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
          <p className="text-slate-500 mt-1">Case statistics, outcomes, and office performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-teal-50">
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </div>
              <span className="text-xs text-slate-500">Success Rate</span>
            </div>
            <p className="text-2xl font-bold text-teal-600">{dashboardKPIs.successRate}%</p>
            <p className="text-xs text-slate-500 mt-1">+5% from last quarter</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-emerald-50">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-slate-500">Cases Resolved</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">259</p>
            <p className="text-xs text-slate-500 mt-1">This fiscal year</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-50">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-xs text-slate-500">Avg. Duration</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">4.7</p>
            <p className="text-xs text-slate-500 mt-1">Months per case</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-orange-50">
                <Building className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs text-slate-500">Active Offices</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">3</p>
            <p className="text-xs text-slate-500 mt-1">Lusaka, Ndola, Livingstone</p>
          </CardContent>
        </Card>
      </div>

      {/* Case Outcome Analysis Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Case Outcome Analysis</CardTitle>
          <CardDescription>Monthly breakdown of resolved, unresolved, and ongoing cases</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Office Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Office Performance Comparison</CardTitle>
            <CardDescription>Success rate by office location</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={officeChartConfig} className="h-[260px] w-full">
              <BarChart data={officePerformance} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="office" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="successRate" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Case Type Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Case Type Distribution</CardTitle>
            <CardDescription>All cases by type</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Office Performance Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Office Performance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Office</TableHead>
                  <TableHead className="text-xs text-right">Total</TableHead>
                  <TableHead className="text-xs text-right">Resolved</TableHead>
                  <TableHead className="text-xs text-right">Rate</TableHead>
                  <TableHead className="text-xs text-right">Avg Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {officePerformance.map((item) => (
                  <TableRow key={item.office}>
                    <TableCell className="font-medium text-sm">{item.office}</TableCell>
                    <TableCell className="text-right text-sm">{item.totalCases}</TableCell>
                    <TableCell className="text-right text-sm">{item.resolved}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          item.successRate >= 75
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : item.successRate >= 70
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}
                      >
                        {item.successRate}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-slate-500">
                      {item.avgDuration}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Case Type Analysis Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Case Type Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs text-right">Total</TableHead>
                    <TableHead className="text-xs text-right">Resolved</TableHead>
                    <TableHead className="text-xs text-right">Rate</TableHead>
                    <TableHead className="text-xs text-right">Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseTypeAnalysis.map((item) => (
                    <TableRow key={item.type}>
                      <TableCell className="font-medium text-sm">{item.type}</TableCell>
                      <TableCell className="text-right text-sm">{item.totalCases}</TableCell>
                      <TableCell className="text-right text-sm">{item.resolved}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            item.successRate >= 75
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                              : item.successRate >= 60
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          }`}
                        >
                          {item.successRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-sm text-slate-500">
                        {item.avgDuration}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
