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

// Status badge color mapping matching the HTML design
function getStatusBadge(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Awaiting Court':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Pending Review':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Closed-Resolved':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Closed-Unresolved':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

// Priority badge color mapping matching the HTML design
function getPriorityBadge(priority: string) {
  switch (priority) {
    case 'Urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function Cases() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [lawyerFilter, setLawyerFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Status counts
  const activeCount = cases.filter((c) => c.status === 'Active').length;
  const pendingCount = cases.filter((c) => c.status === 'Pending Review').length;
  const awaitingCourtCount = cases.filter((c) => c.status === 'Awaiting Court').length;
  const closedResolvedCount = cases.filter((c) => c.status === 'Closed-Resolved').length;
  const closedUnresolvedCount = cases.filter((c) => c.status === 'Closed-Unresolved').length;

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          className={`bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 shadow-soft cursor-pointer transition-all ${
            statusFilter === 'Active' ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:border-outline-variant/60'
          }`}
          onClick={() => { setStatusFilter(statusFilter === 'Active' ? 'all' : 'Active'); setCurrentPage(1); }}
        >
          <p className="text-display-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em' }}>{activeCount}</p>
          <p className="text-label-md text-secondary mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>Active</p>
        </div>
        <div
          className={`bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 shadow-soft cursor-pointer transition-all ${
            statusFilter === 'Pending Review' ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:border-outline-variant/60'
          }`}
          onClick={() => { setStatusFilter(statusFilter === 'Pending Review' ? 'all' : 'Pending Review'); setCurrentPage(1); }}
        >
          <p className="text-display-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em' }}>{pendingCount}</p>
          <p className="text-label-md text-secondary mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>Pending Review</p>
        </div>
        <div
          className={`bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 shadow-soft cursor-pointer transition-all ${
            statusFilter === 'Awaiting Court' ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:border-outline-variant/60'
          }`}
          onClick={() => { setStatusFilter(statusFilter === 'Awaiting Court' ? 'all' : 'Awaiting Court'); setCurrentPage(1); }}
        >
          <p className="text-display-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em' }}>{awaitingCourtCount}</p>
          <p className="text-label-md text-secondary mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>Awaiting Court</p>
        </div>
        <div
          className={`bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 shadow-soft cursor-pointer transition-all ${
            statusFilter === 'Closed-Resolved' ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:border-outline-variant/60'
          }`}
          onClick={() => { setStatusFilter(statusFilter === 'Closed-Resolved' ? 'all' : 'Closed-Resolved'); setCurrentPage(1); }}
        >
          <p className="text-display-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em' }}>{closedResolvedCount}</p>
          <p className="text-label-md text-secondary mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>Closed-Resolved</p>
        </div>
        <div
          className={`bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-6 shadow-soft cursor-pointer transition-all hidden md:block ${
            statusFilter === 'Closed-Unresolved' ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:border-outline-variant/60'
          }`}
          onClick={() => { setStatusFilter(statusFilter === 'Closed-Unresolved' ? 'all' : 'Closed-Unresolved'); setCurrentPage(1); }}
        >
          <p className="text-display-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.02em' }}>{closedUnresolvedCount}</p>
          <p className="text-label-md text-secondary mt-1" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>Closed-Unresolved</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-4 shadow-soft flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 border border-outline-variant/50 rounded-md text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
            placeholder="Search by Case ID, client name, or description..."
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
          <select
            className="border border-outline-variant/50 rounded-md px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-on-surface"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Types</option>
            <option value="Domestic Violence">Domestic Violence</option>
            <option value="Maintenance">Maintenance</option>
            <option value="GBV">GBV</option>
            <option value="Property Dispute">Property Dispute</option>
            <option value="Child Custody">Child Custody</option>
            <option value="Land Dispute">Land Dispute</option>
            <option value="Inheritance">Inheritance</option>
          </select>
          <select
            className="border border-outline-variant/50 rounded-md px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-on-surface"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Awaiting Court">Awaiting Court</option>
            <option value="Closed-Resolved">Closed-Resolved</option>
            <option value="Closed-Unresolved">Closed-Unresolved</option>
          </select>
          <select
            className="border border-outline-variant/50 rounded-md px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-on-surface hidden sm:block"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
            value={officeFilter}
            onChange={(e) => { setOfficeFilter(e.target.value); setCurrentPage(1); }}
          >
            <option value="all">All Offices</option>
            <option value="Lusaka">Lusaka</option>
            <option value="Ndola">Ndola</option>
            <option value="Livingstone">Livingstone</option>
          </select>
          <select
            className="border border-outline-variant/50 rounded-md px-4 py-2 min-w-[140px] focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white text-on-surface hidden lg:block"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
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

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/30 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-bright/50">
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Case ID</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Client</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Type</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Status</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider hidden sm:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Assigned</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider hidden md:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Office</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider hidden lg:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Next Court</th>
                <th className="py-4 px-6 text-label-sm text-secondary uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {paginatedCases.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-secondary">
                    No cases found matching your search criteria.
                  </td>
                </tr>
              ) : (
                paginatedCases.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-lowest/50 transition-colors group">
                    <td className="py-3 px-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                      <a className="text-primary font-medium group-hover:underline" href="#">{c.id}</a>
                    </td>
                    <td className="py-3 px-6 text-on-surface font-medium" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>{c.clientName}</td>
                    <td className="py-3 px-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                      <span className="px-2 py-1 border border-outline-variant/40 rounded-full text-[13px] text-secondary">{c.type}</span>
                    </td>
                    <td className="py-3 px-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                      <span className={`px-3 py-1 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5 border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-secondary hidden sm:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>{c.assignedLawyer}</td>
                    <td className="py-3 px-6 text-secondary hidden md:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>{c.office}</td>
                    <td className="py-3 px-6 text-secondary hidden lg:table-cell" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                      {c.nextCourtDate
                        ? new Date(c.nextCourtDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                        : '—'}
                    </td>
                    <td className="py-3 px-6" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                      <span className={`px-3 py-1 rounded-full text-[13px] font-medium border ${getPriorityBadge(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-outline-variant/30 px-6 py-4 flex items-center justify-between bg-surface-container-lowest">
          <p className="text-label-md text-secondary hidden sm:block" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}>
            Showing {showingStart} to {showingEnd} of {filteredCases.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 border border-outline-variant/50 rounded-md text-secondary hover:bg-surface-container-low transition-colors disabled:opacity-50"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'border border-outline-variant/50 text-secondary hover:bg-surface-container-low'
                }`}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            {totalPages > 3 && <span className="text-secondary px-1">...</span>}
            <button
              className="px-3 py-1.5 border border-outline-variant/50 rounded-md text-secondary hover:bg-surface-container-low transition-colors"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
