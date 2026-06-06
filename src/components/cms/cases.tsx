'use client';

import { useState } from 'react';
import {
  cases,
  staff,
  getStatusColor,
  getPriorityColor,
  type Office,
  type CaseType,
  type CaseStatus,
} from '@/lib/mock-data';

const caseTypes: CaseType[] = ['GBV', 'Property Dispute', 'Child Custody', 'Maintenance', 'Domestic Violence', 'Land Dispute', 'Inheritance'];
const statuses: CaseStatus[] = ['Active', 'Pending Review', 'Awaiting Court', 'Closed-Resolved', 'Closed-Unresolved'];
const offices: Office[] = ['Lusaka', 'Ndola', 'Livingstone'];
const lawyers = staff.filter((s) => s.role === 'Lawyer');

// Status badge with dot indicator and NLACW design tokens
function getStatusBadge(status: string) {
  switch (status) {
    case 'Active':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    case 'Awaiting Court':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
    case 'Pending Review':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'Closed-Resolved':
      return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' };
    case 'Closed-Unresolved':
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  }
}

// Priority badge with icon indicator
function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'Urgent':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '↑' };
    case 'High':
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: '↗' };
    case 'Medium':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '→' };
    case 'Low':
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', icon: '↓' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', icon: '→' };
  }
}

function getLawyerAvatar(name: string) {
  const parts = name.split(' ');
  return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.substring(0, 2);
}

export function Cases() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [lawyerFilter, setLawyerFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const itemsPerPage = 8;

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

  // Pagination
  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCases = filteredCases.slice(startIndex, startIndex + itemsPerPage);
  const showingStart = filteredCases.length > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredCases.length);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  // Status counts
  const activeCount = cases.filter((c) => c.status === 'Active').length;
  const pendingCount = cases.filter((c) => c.status === 'Pending Review').length;
  const awaitingCourtCount = cases.filter((c) => c.status === 'Awaiting Court').length;
  const closedResolvedCount = cases.filter((c) => c.status === 'Closed-Resolved').length;
  const closedUnresolvedCount = cases.filter((c) => c.status === 'Closed-Unresolved').length;

  const selectedCaseData = cases.find((c) => c.id === selectedCase);

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Active', count: activeCount, status: 'Active', color: 'from-emerald-500 to-emerald-600', dotColor: 'bg-emerald-400' },
          { label: 'Pending Review', count: pendingCount, status: 'Pending Review', color: 'from-amber-500 to-amber-600', dotColor: 'bg-amber-400' },
          { label: 'Awaiting Court', count: awaitingCourtCount, status: 'Awaiting Court', color: 'from-blue-500 to-blue-600', dotColor: 'bg-blue-400' },
          { label: 'Resolved', count: closedResolvedCount, status: 'Closed-Resolved', color: 'from-teal-500 to-teal-600', dotColor: 'bg-teal-400' },
          { label: 'Unresolved', count: closedUnresolvedCount, status: 'Closed-Unresolved', color: 'from-slate-400 to-slate-500', dotColor: 'bg-slate-400' },
        ].map((metric) => (
          <div
            key={metric.label}
            className={`bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-5 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              statusFilter === metric.status ? 'ring-2 ring-primary/30 border-primary/50 shadow-md' : ''
            }`}
            onClick={() => { setStatusFilter(statusFilter === metric.status ? 'all' : metric.status); setCurrentPage(1); }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${metric.dotColor}`} />
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">{metric.label}</span>
            </div>
            <p className="text-headline-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '30px', lineHeight: '38px', letterSpacing: '-0.01em' }}>{metric.count}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline/70 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
              placeholder="Search by Case ID, client name, or description..."
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="border border-outline-variant/50 rounded-lg px-3 py-2.5 min-w-[130px] focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-surface-container-lowest text-on-surface text-sm"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Types</option>
              {caseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <select
              className="border border-outline-variant/50 rounded-lg px-3 py-2.5 min-w-[130px] focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-surface-container-lowest text-on-surface text-sm"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Status</option>
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              className="border border-outline-variant/50 rounded-lg px-3 py-2.5 min-w-[130px] focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-surface-container-lowest text-on-surface text-sm hidden sm:block"
              value={officeFilter}
              onChange={(e) => { setOfficeFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Offices</option>
              {offices.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <select
              className="border border-outline-variant/50 rounded-lg px-3 py-2.5 min-w-[130px] focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none bg-surface-container-lowest text-on-surface text-sm hidden lg:block"
              value={lawyerFilter}
              onChange={(e) => { setLawyerFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Lawyers</option>
              {lawyers.map((l) => (
                <option key={l.id} value={l.id}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Active filter indicator */}
        {(typeFilter !== 'all' || statusFilter !== 'all' || officeFilter !== 'all' || lawyerFilter !== 'all' || search !== '') && (
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-outline-variant/20">
            <span className="text-xs text-secondary">Active filters:</span>
            {search !== '' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Search: &ldquo;{search}&rdquo;
                <button onClick={() => { setSearch(''); setCurrentPage(1); }} className="hover:text-on-primary-fixed-variant">×</button>
              </span>
            )}
            {typeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Type: {typeFilter}
                <button onClick={() => { setTypeFilter('all'); setCurrentPage(1); }} className="hover:text-on-primary-fixed-variant">×</button>
              </span>
            )}
            {statusFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Status: {statusFilter}
                <button onClick={() => { setStatusFilter('all'); setCurrentPage(1); }} className="hover:text-on-primary-fixed-variant">×</button>
              </span>
            )}
            {officeFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Office: {officeFilter}
                <button onClick={() => { setOfficeFilter('all'); setCurrentPage(1); }} className="hover:text-on-primary-fixed-variant">×</button>
              </span>
            )}
            {lawyerFilter !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Lawyer: {lawyers.find(l => l.id === lawyerFilter)?.name}
                <button onClick={() => { setLawyerFilter('all'); setCurrentPage(1); }} className="hover:text-on-primary-fixed-variant">×</button>
              </span>
            )}
            <button
              className="text-xs text-error hover:underline ml-1"
              onClick={() => { setSearch(''); setTypeFilter('all'); setStatusFilter('all'); setOfficeFilter('all'); setLawyerFilter('all'); setCurrentPage(1); }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Case ID</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Client</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Type</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Status</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden sm:table-cell">Assigned</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden md:table-cell">Office</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden lg:table-cell">Next Court</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center">
                    <span className="material-symbols-outlined text-[40px] text-outline/30 mb-2 block">search_off</span>
                    <p className="text-secondary text-sm font-medium">No cases found</p>
                    <p className="text-outline text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedCases.map((c) => {
                  const statusBadge = getStatusBadge(c.status);
                  const priorityBadge = getPriorityBadge(c.priority);
                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-primary/[0.03] transition-colors cursor-pointer group ${
                        selectedCase === c.id ? 'bg-primary/[0.06]' : ''
                      }`}
                      onClick={() => setSelectedCase(selectedCase === c.id ? null : c.id)}
                    >
                      <td className="py-3.5 px-5">
                        <span className="text-primary font-semibold text-sm group-hover:underline decoration-primary/30 underline-offset-2">
                          {c.id}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-on-surface text-sm font-medium">{c.clientName}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center px-2.5 py-1 bg-surface-container rounded-md text-[12px] text-on-surface-variant font-medium border border-outline-variant/20">
                          {c.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 hidden sm:table-cell">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-primary-container/20 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0">
                            {getLawyerAvatar(c.assignedLawyer)}
                          </div>
                          <span className="text-on-surface-variant text-sm">{c.assignedLawyer}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 hidden md:table-cell">
                        <span className="text-on-surface-variant text-sm">{c.office}</span>
                      </td>
                      <td className="py-3.5 px-5 hidden lg:table-cell">
                        {c.nextCourtDate ? (
                          <span className="inline-flex items-center gap-1.5 text-on-surface-variant text-sm">
                            <span className="material-symbols-outlined text-[16px] text-outline">calendar_today</span>
                            {new Date(c.nextCourtDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </span>
                        ) : (
                          <span className="text-outline/50 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold border ${priorityBadge.bg} ${priorityBadge.text} ${priorityBadge.border}`}>
                          <span className="text-[10px]">{priorityBadge.icon}</span>
                          {c.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-outline-variant/20 px-5 py-3.5 flex items-center justify-between bg-surface-container-lowest/50">
          <p className="text-xs text-secondary hidden sm:block">
            Showing <span className="font-semibold text-on-surface">{showingStart}</span> to <span className="font-semibold text-on-surface">{showingEnd}</span> of <span className="font-semibold text-on-surface">{filteredCases.length}</span> results
          </p>
          <div className="flex items-center gap-1.5">
            <button
              className="inline-flex items-center gap-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-secondary hover:bg-surface-container-low hover:text-on-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              Previous
            </button>
            {getPageNumbers().map((page, idx) =>
              typeof page === 'string' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-outline text-xs">...</span>
              ) : (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                    currentPage === page
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-secondary hover:bg-surface-container-low hover:text-on-surface'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              className="inline-flex items-center gap-1 px-3 py-2 border border-outline-variant/40 rounded-lg text-secondary hover:bg-surface-container-low hover:text-on-surface transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
