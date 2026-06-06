'use client';

import { useState } from 'react';
import {
  Upload,
  File,
  Download,
  Eye,
  FilePlus,
  ScrollText,
  Mail,
  Gavel,
  PenLine,
  FileCheck,
} from 'lucide-react';
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
import { documents, type DocumentCategory } from '@/lib/mock-data';

function getCategoryIcon(category: DocumentCategory) {
  switch (category) {
    case 'Intake Form': return 'description';
    case 'Affidavit': return 'gavel';
    case 'Court Order': return 'balance';
    case 'Correspondence': return 'mail';
    case 'Contract': return 'edit_document';
    case 'Judgment': return 'verified';
    default: return 'draft';
  }
}

function getCategoryBadge(category: DocumentCategory) {
  switch (category) {
    case 'Intake Form': return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', iconBg: 'bg-teal-100' };
    case 'Affidavit': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', iconBg: 'bg-amber-100' };
    case 'Court Order': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', iconBg: 'bg-red-100' };
    case 'Correspondence': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', iconBg: 'bg-blue-100' };
    case 'Contract': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', iconBg: 'bg-emerald-100' };
    case 'Judgment': return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', iconBg: 'bg-purple-100' };
    default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', iconBg: 'bg-slate-100' };
  }
}

function getDocStatusBadge(status: string) {
  switch (status) {
    case 'Final': return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    case 'Draft': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'Review': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' };
    default: return { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200', dot: 'bg-slate-400' };
  }
}

const formTemplates = [
  { id: 'TPL001', name: 'Client Intake Form', description: 'Standard client registration and intake form', category: 'Intake Form' as DocumentCategory, lastUpdated: '2026-01-15' },
  { id: 'TPL002', name: 'Affidavit Template - GBV', description: 'Affidavit template for gender-based violence cases', category: 'Affidavit' as DocumentCategory, lastUpdated: '2026-02-20' },
  { id: 'TPL003', name: 'Maintenance Application', description: 'Court application for child/spousal maintenance', category: 'Intake Form' as DocumentCategory, lastUpdated: '2026-03-10' },
  { id: 'TPL004', name: 'Protection Order Application', description: 'Application for protection order under Anti-GBV Act', category: 'Intake Form' as DocumentCategory, lastUpdated: '2026-04-05' },
  { id: 'TPL005', name: 'Custody Application', description: 'Application for child custody and access', category: 'Intake Form' as DocumentCategory, lastUpdated: '2026-05-01' },
  { id: 'TPL006', name: 'Consent to Act', description: 'Client consent form for legal representation', category: 'Contract' as DocumentCategory, lastUpdated: '2026-01-10' },
];

export function Documents() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories: DocumentCategory[] = ['Intake Form', 'Affidavit', 'Court Order', 'Correspondence', 'Contract', 'Judgment'];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      search === '' ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.caseName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);
  const showingStart = filteredDocs.length > 0 ? startIndex + 1 : 0;
  const showingEnd = Math.min(startIndex + itemsPerPage, filteredDocs.length);

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

  const selectedDocData = documents.find((d) => d.id === selectedDoc);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Document Management</h2>
          <p className="text-secondary text-sm">Manage case documents and digital forms</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-on-primary shadow-sm gap-2"
          onClick={() => setShowUploadDialog(true)}
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-1 bg-surface-container-low rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'documents'
              ? 'bg-surface-container-lowest text-on-surface shadow-sm'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'templates'
              ? 'bg-surface-container-lowest text-on-surface shadow-sm'
              : 'text-secondary hover:text-on-surface'
          }`}
        >
          Form Templates
        </button>
      </div>

      {activeTab === 'documents' ? (
        <>
          {/* Filters */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-on-surface placeholder:text-outline/70 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all text-sm"
                  placeholder="Search documents by name or case..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={categoryFilter} onValueChange={(v) => { setCategoryFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[150px] h-10 text-sm border-outline-variant/50">
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
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Document</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden md:table-cell">Category</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden lg:table-cell">Case</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden sm:table-cell">Uploaded By</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden sm:table-cell">Date</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold">Status</th>
                    <th className="py-3.5 px-5 text-[11px] text-on-surface-variant uppercase tracking-[0.08em] font-semibold hidden lg:table-cell">Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/15">
                  {paginatedDocs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-16 text-center">
                        <span className="material-symbols-outlined text-[40px] text-outline/30 mb-2 block">folder_off</span>
                        <p className="text-secondary text-sm font-medium">No documents found</p>
                        <p className="text-outline text-xs mt-1">Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedDocs.map((doc) => {
                      const catBadge = getCategoryBadge(doc.category);
                      const statusBadge = getDocStatusBadge(doc.status);
                      return (
                        <tr
                          key={doc.id}
                          className="hover:bg-primary/[0.03] transition-colors cursor-pointer group"
                          onClick={() => setSelectedDoc(doc.id)}
                        >
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${catBadge.iconBg}`}>
                                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{getCategoryIcon(doc.category)}</span>
                              </div>
                              <span className="text-sm font-medium text-on-surface truncate max-w-[200px] group-hover:text-primary transition-colors">
                                {doc.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 hidden md:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium border ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                              {doc.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 hidden lg:table-cell">
                            <span className="text-on-surface-variant text-sm truncate max-w-[150px] block">{doc.caseName}</span>
                          </td>
                          <td className="py-3.5 px-5 hidden sm:table-cell">
                            <span className="text-on-surface-variant text-sm">{doc.uploadedBy}</span>
                          </td>
                          <td className="py-3.5 px-5 hidden sm:table-cell">
                            <span className="text-secondary text-sm">
                              {new Date(doc.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                            </span>
                          </td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 hidden lg:table-cell">
                            <span className="text-secondary text-sm">{doc.fileSize}</span>
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
                Showing <span className="font-semibold text-on-surface">{showingStart}</span> to <span className="font-semibold text-on-surface">{showingEnd}</span> of <span className="font-semibold text-on-surface">{filteredDocs.length}</span> documents
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
        </>
      ) : (
        /* Form Templates */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formTemplates.map((template) => {
            const catBadge = getCategoryBadge(template.category);
            return (
              <div
                key={template.id}
                className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer p-5"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${catBadge.iconBg}`}>
                    <span className="material-symbols-outlined text-[20px] text-on-surface-variant">{getCategoryIcon(template.category)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-on-surface">{template.name}</h4>
                    <p className="text-xs text-secondary mt-1">{template.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                        {template.category}
                      </span>
                      <p className="text-[10px] text-outline">
                        {new Date(template.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Document Detail Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-md">
          {selectedDocData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">draft</span>
                  Document Details
                </DialogTitle>
                <DialogDescription>{selectedDocData.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-secondary">Category</p>
                    {(() => {
                      const catBadge = getCategoryBadge(selectedDocData.category);
                      return (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border mt-0.5 ${catBadge.bg} ${catBadge.text} ${catBadge.border}`}>
                          {selectedDocData.category}
                        </span>
                      );
                    })()}
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Status</p>
                    {(() => {
                      const statusBadge = getDocStatusBadge(selectedDocData.status);
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border mt-0.5 ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                          {selectedDocData.status}
                        </span>
                      );
                    })()}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-secondary">Related Case</p>
                  <p className="text-sm font-medium text-primary">{selectedDocData.caseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-secondary">Uploaded By</p>
                    <p className="text-sm text-on-surface">{selectedDocData.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Upload Date</p>
                    <p className="text-sm text-on-surface">{new Date(selectedDocData.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">File Size</p>
                    <p className="text-sm text-on-surface">{selectedDocData.fileSize}</p>
                  </div>
                </div>
                {/* Document Preview Placeholder */}
                <div className="border border-outline-variant/30 rounded-lg p-8 text-center bg-surface-container-low">
                  <span className="material-symbols-outlined text-[48px] text-outline/30 mb-2 block">description</span>
                  <p className="text-sm text-secondary">Document preview</p>
                  <p className="text-xs text-outline mt-1">PDF viewer would render here</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-outline-variant/50 gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" className="flex-1 border-outline-variant/50 gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" />
              Upload Document
            </DialogTitle>
            <DialogDescription>Upload a new document to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-on-surface">Document Name</label>
              <input className="w-full mt-1 px-3 py-2 border border-outline-variant/50 rounded-lg text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none" placeholder="Enter document name" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-on-surface">Category</label>
                <Select>
                  <SelectTrigger className="mt-1 border-outline-variant/50">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-on-surface">Status</label>
                <Select>
                  <SelectTrigger className="mt-1 border-outline-variant/50">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-on-surface">Related Case</label>
              <Select>
                <SelectTrigger className="mt-1 border-outline-variant/50">
                  <SelectValue placeholder="Select case" />
                </SelectTrigger>
                <SelectContent>
                  {documents.map((d) => (
                    <SelectItem key={d.caseId} value={d.caseId}>
                      {d.caseName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border-2 border-dashed border-outline-variant/40 rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-outline mx-auto mb-2" />
              <p className="text-sm text-on-surface font-medium">Click to upload or drag files here</p>
              <p className="text-xs text-outline mt-1">PDF, DOC, DOCX, JPG up to 10MB</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="border-outline-variant/50">
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-on-primary"
                onClick={() => setShowUploadDialog(false)}
              >
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
