'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Eye,
  Calendar,
  User,
  FileText,
  CheckSquare,
  ArrowRight,
  Gavel,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  cases,
  staff,
  getStatusColor,
  getPriorityColor,
  type Office,
  type CaseType,
  type CaseStatus,
} from '@/lib/mock-data';

const workflowSteps = [
  { label: 'Intake', statuses: ['Pending Review'] },
  { label: 'Active', statuses: ['Active'] },
  { label: 'Court', statuses: ['Awaiting Court'] },
  { label: 'Resolved', statuses: ['Closed-Resolved', 'Closed-Unresolved'] },
];

export function Cases() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [lawyerFilter, setLawyerFilter] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showIntakeDialog, setShowIntakeDialog] = useState(false);

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || c.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesOffice = officeFilter === 'all' || c.office === officeFilter;
    const matchesLawyer = lawyerFilter === 'all' || c.assignedLawyerId === lawyerFilter;
    return matchesSearch && matchesType && matchesStatus && matchesOffice && matchesLawyer;
  });

  const selectedCaseData = cases.find((c) => c.id === selectedCase);

  const caseTypes: CaseType[] = ['GBV', 'Property Dispute', 'Child Custody', 'Maintenance', 'Domestic Violence', 'Land Dispute', 'Inheritance'];
  const statuses: CaseStatus[] = ['Active', 'Pending Review', 'Awaiting Court', 'Closed-Resolved', 'Closed-Unresolved'];
  const offices: Office[] = ['Lusaka', 'Ndola', 'Livingstone'];
  const lawyers = staff.filter((s) => s.role === 'Lawyer');

  const getWorkflowProgress = (status: string) => {
    const stepIndex = workflowSteps.findIndex((step) => step.statuses.includes(status));
    return stepIndex >= 0 ? ((stepIndex + 1) / workflowSteps.length) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Case Management</h2>
          <p className="text-slate-500 mt-1">Track and manage all legal cases across offices</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          onClick={() => setShowIntakeDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statuses.map((status) => {
          const count = cases.filter((c) => c.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
              className={`p-3 rounded-lg border transition-all text-left ${
                statusFilter === status
                  ? 'border-teal-500 bg-teal-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <p className="text-xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-500 mt-0.5">{status}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by Case ID, client name, or description..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue placeholder="Case Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {caseTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={officeFilter} onValueChange={setOfficeFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offices</SelectItem>
                {offices.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={lawyerFilter} onValueChange={setLawyerFilter}>
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue placeholder="Assigned Lawyer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lawyers</SelectItem>
                {lawyers.map((l) => (
                  <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="font-semibold">Case ID</TableHead>
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Type</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Assigned</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Office</TableHead>
                <TableHead className="font-semibold hidden xl:table-cell">Next Court</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((c) => (
                <TableRow
                  key={c.id}
                  className="cursor-pointer hover:bg-teal-50/30 transition-colors"
                  onClick={() => setSelectedCase(c.id)}
                >
                  <TableCell className="font-mono text-sm font-medium text-teal-700">
                    {c.id}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-slate-900">{c.clientName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs font-normal">
                      {c.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(c.status)}`}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-600">
                    {c.assignedLawyer}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm text-slate-600">{c.office}</TableCell>
                  <TableCell className="hidden xl:table-cell text-sm text-slate-600">
                    {c.nextCourtDate
                      ? new Date(c.nextCourtDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })
                      : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(c.priority)}`}>
                      {c.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredCases.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No cases found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Case Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedCaseData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-50">
                    <Gavel className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{selectedCaseData.id}</p>
                    <p className="text-sm font-normal text-slate-500">
                      {selectedCaseData.type} · {selectedCaseData.clientName}
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>Case details and progress</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Status Workflow */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Case Progress</h4>
                  <div className="flex items-center gap-1">
                    {workflowSteps.map((step, idx) => {
                      const isActive = step.statuses.includes(selectedCaseData.status);
                      const isPast =
                        workflowSteps.findIndex((s) =>
                          s.statuses.includes(selectedCaseData.status)
                        ) > idx;
                      return (
                        <div key={step.label} className="flex items-center flex-1">
                          <div
                            className={`flex-1 p-2 rounded-lg text-center text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-teal-600 text-white shadow-sm'
                                : isPast
                                ? 'bg-teal-100 text-teal-700'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {step.label}
                          </div>
                          {idx < workflowSteps.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-slate-300 mx-1 flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Case Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Client</p>
                    <p className="text-sm font-medium">{selectedCaseData.clientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Case Type</p>
                    <Badge variant="outline" className="text-xs mt-0.5">{selectedCaseData.type}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getStatusColor(selectedCaseData.status)}`}>
                      {selectedCaseData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Assigned Lawyer</p>
                    <p className="text-sm font-medium">{selectedCaseData.assignedLawyer}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Office</p>
                    <p className="text-sm font-medium">{selectedCaseData.office}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Priority</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getPriorityColor(selectedCaseData.priority)}`}>
                      {selectedCaseData.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Filing Date</p>
                    <p className="text-sm font-medium">
                      {new Date(selectedCaseData.filingDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Next Court Date</p>
                    <p className="text-sm font-medium">
                      {selectedCaseData.nextCourtDate
                        ? new Date(selectedCaseData.nextCourtDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })
                        : 'Not scheduled'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Court</p>
                    <p className="text-sm font-medium">{selectedCaseData.courtName || 'N/A'}</p>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Case Description</h4>
                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg leading-relaxed">
                    {selectedCaseData.description}
                  </p>
                </div>

                {/* Opposing Party */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">Opposing Party</h4>
                  <p className="text-sm text-slate-600">{selectedCaseData.opposingParty}</p>
                </div>

                <Separator />

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <FileText className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">{selectedCaseData.documentsCount}</p>
                    <p className="text-xs text-slate-500">Documents</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <CheckSquare className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">{selectedCaseData.tasksCount}</p>
                    <p className="text-xs text-slate-500">Tasks</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-slate-900">
                      {Math.max(
                        1,
                        Math.ceil(
                          (new Date().getTime() -
                            new Date(selectedCaseData.filingDate).getTime()) /
                            (1000 * 60 * 60 * 24 * 30)
                        )
                      )}
                    </p>
                    <p className="text-xs text-slate-500">Months Active</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Case Intake Dialog */}
      <Dialog open={showIntakeDialog} onOpenChange={setShowIntakeDialog}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-600" />
              New Case Intake
            </DialogTitle>
            <DialogDescription>Register a new legal case in the NLACW system</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-2">
            {/* Client Information */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                Client Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Client</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Search or select client..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cases.map((c) => (
                        <SelectItem key={c.clientId} value={c.clientId}>
                          {c.clientName} ({c.clientId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">New Client? (Enter Name)</label>
                  <Input placeholder="If not in list above" className="mt-1" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Case Details */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Gavel className="w-4 h-4 text-teal-600" />
                Case Details
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-slate-700">Case Type</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        {caseTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">Priority</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Case Description</label>
                  <textarea
                    className="w-full mt-1 p-2 border rounded-md text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Describe the case details..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Opposing Party</label>
                  <Input placeholder="Name of opposing party" className="mt-1" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Assignment */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                Assignment
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-slate-700">Assigned Lawyer</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select lawyer" />
                    </SelectTrigger>
                    <SelectContent>
                      {lawyers.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.name} ({l.activeCases} active cases)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Office</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select office" />
                    </SelectTrigger>
                    <SelectContent>
                      {offices.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Supporting Documents */}
            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                Supporting Documents
              </h4>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-medium">Click to upload or drag files here</p>
                <p className="text-xs text-slate-400 mt-1">PDF, DOC, JPG up to 10MB each</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowIntakeDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => setShowIntakeDialog(false)}
              >
                Create Case
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
