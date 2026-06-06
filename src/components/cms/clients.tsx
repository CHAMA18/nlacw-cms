'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { clients, cases, getClientStatusColor, type Office, type CaseType } from '@/lib/mock-data';

function getClientStatusBadge(status: string) {
  switch (status) {
    case 'Active':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    case 'Inactive':
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
    case 'Pending':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  }
}

function getCategoryBadge(category: string) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'GBV': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    'Domestic Violence': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
    'Maintenance': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'Property Dispute': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'Child Custody': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
    'Land Dispute': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Inheritance': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  };
  return colors[category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' };
}

export function Clients() {
  const [search, setSearch] = useState('');
  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      search === '' ||
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      client.nrc.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search);
    const matchesOffice = officeFilter === 'all' || client.office === officeFilter;
    const matchesCategory = categoryFilter === 'all' || client.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesOffice && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);
  const showingStart = filteredClients.length > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredClients.length);

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

  const selectedClientData = clients.find((c) => c.id === selectedClient);
  const clientCases = selectedClientData
    ? cases.filter((c) => c.clientId === selectedClientData.id)
    : [];

  const categories: CaseType[] = ['GBV', 'Property Dispute', 'Child Custody', 'Maintenance', 'Domestic Violence', 'Land Dispute', 'Inheritance'];
  const offices: Office[] = ['Lusaka', 'Ndola', 'Livingstone'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Client Management</h2>
          <p className="text-secondary text-sm">Manage and track all registered clients across offices</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-on-primary shadow-sm gap-2"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline/70 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
              placeholder="Search by name, NRC, or phone..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={officeFilter} onValueChange={(v) => { setOfficeFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[140px] h-10 text-sm border-outline-variant/50">
                <SelectValue placeholder="Office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offices</SelectItem>
                {offices.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px] h-10 text-sm border-outline-variant/50">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
              <SelectTrigger className="w-full sm:w-[130px] h-10 text-sm border-outline-variant/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Client</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">NRC</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden md:table-cell">Category</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden lg:table-cell">Office</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden sm:table-cell text-center">Cases</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Status</th>
                <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden lg:table-cell">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/15">
              {paginatedClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <span className="material-symbols-outlined text-[40px] text-outline/30 mb-2 block">person_off</span>
                    <p className="text-secondary text-sm font-medium">No clients found</p>
                    <p className="text-outline text-xs mt-1">Try adjusting your search or filter criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedClients.map((client) => {
                  const statusBadge = getClientStatusBadge(client.status);
                  const catBadge = getCategoryBadge(client.category);
                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-primary/[0.03] transition-colors cursor-pointer group"
                      onClick={() => setSelectedClient(client.id)}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary-container/15 flex items-center justify-center text-[11px] font-bold text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                            {client.firstName[0]}{client.lastName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-on-surface">
                              {client.firstName} {client.lastName}
                            </p>
                            <p className="text-[11px] text-secondary">{client.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-on-surface-variant text-sm font-mono tracking-tight">{client.nrc}</span>
                      </td>
                      <td className="py-3.5 px-5 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium border ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                          {client.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 hidden lg:table-cell">
                        <span className="text-on-surface-variant text-sm">{client.office}</span>
                      </td>
                      <td className="py-3.5 px-5 hidden sm:table-cell text-center">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold ${
                          client.casesCount > 3 ? 'bg-primary/10 text-primary' : 'bg-surface-container text-secondary'
                        }`}>
                          {client.casesCount}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 hidden lg:table-cell">
                        <span className="text-on-surface-variant text-sm">
                          {new Date(client.registrationDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
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
            Showing <span className="font-semibold text-on-surface">{showingStart}</span> to <span className="font-semibold text-on-surface">{showingEnd}</span> of <span className="font-semibold text-on-surface">{filteredClients.length}</span> clients
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

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedClientData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary-container/20 flex items-center justify-center text-sm font-bold text-primary border-2 border-primary/20">
                    {selectedClientData.firstName[0]}{selectedClientData.lastName[0]}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-on-surface">
                      {selectedClientData.firstName} {selectedClientData.lastName}
                    </p>
                    <p className="text-sm font-normal text-secondary">
                      ID: {selectedClientData.id}
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>Client profile and case history</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-semibold text-on-surface mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-outline" />
                      <span className="text-on-surface-variant">{selectedClientData.phone}</span>
                    </div>
                    {selectedClientData.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-outline" />
                        <span className="text-on-surface-variant">{selectedClientData.email}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-sm col-span-1 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-outline mt-0.5" />
                      <span className="text-on-surface-variant">
                        {selectedClientData.address}, {selectedClientData.town},{' '}
                        {selectedClientData.province} Province
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Details */}
                <div>
                  <h4 className="text-sm font-semibold text-on-surface mb-3">Details</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-secondary">NRC</p>
                      <p className="text-sm font-mono font-medium text-on-surface">{selectedClientData.nrc}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Office</p>
                      <p className="text-sm font-medium text-on-surface">{selectedClientData.office}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Category</p>
                      {(() => {
                        const catBadge = getCategoryBadge(selectedClientData.category);
                        return (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border mt-0.5 ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                            {selectedClientData.category}
                          </span>
                        );
                      })()}
                    </div>
                    <div>
                      <p className="text-xs text-secondary">Status</p>
                      {(() => {
                        const statusBadge = getClientStatusBadge(selectedClientData.status);
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border mt-0.5 ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                            {selectedClientData.status}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                {selectedClientData.notes && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-on-surface mb-2">Notes</h4>
                      <p className="text-sm text-on-surface-variant bg-surface-container-low p-3 rounded-lg">
                        {selectedClientData.notes}
                      </p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Case History */}
                <div>
                  <h4 className="text-sm font-semibold text-on-surface mb-3">
                    Case History ({clientCases.length})
                  </h4>
                  {clientCases.length > 0 ? (
                    <div className="space-y-2">
                      {clientCases.map((c) => {
                        const statusBadge = getStatusBadge(c.status);
                        return (
                          <div
                            key={c.id}
                            className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium text-on-surface">
                                {c.id} - {c.type}
                              </p>
                              <p className="text-xs text-secondary mt-0.5">
                                Assigned to {c.assignedLawyer} · {c.office}
                              </p>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                              {c.status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-secondary">No cases found for this client.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>Register a new client in the NLACW system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-on-surface">First Name</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Enter first name" />
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface">Last Name</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Enter last name" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-on-surface">NRC Number</label>
              <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="e.g., 123456/78/1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-on-surface">Phone</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="+260 9XX XXX XXX" />
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface">Email (Optional)</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-on-surface">Address</label>
              <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Plot/House number, Township" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-on-surface">Town</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Town" />
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface">Province</label>
                <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Province" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-on-surface">Category</label>
                <Select>
                  <SelectTrigger className="mt-1 border-outline-variant/50">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface">Office</label>
                <Select>
                  <SelectTrigger className="mt-1 border-outline-variant/50">
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
            <div>
              <label className="text-sm font-medium text-on-surface">Notes</label>
              <textarea
                className="w-full mt-1 p-2.5 border border-outline-variant/50 rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="Additional notes about the client..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="border-outline-variant/50">
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-on-primary"
                onClick={() => setShowAddDialog(false)}
              >
                Register Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Re-use getStatusBadge from cases
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
