'use client';

import { useState } from 'react';
import {
  Search,
  Upload,
  FileText,
  File,
  Download,
  Eye,
  Filter,
  FileCheck,
  FilePlus,
  ScrollText,
  Mail,
  Gavel,
  PenLine,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { documents, type DocumentCategory } from '@/lib/mock-data';

function getCategoryIcon(category: DocumentCategory) {
  switch (category) {
    case 'Intake Form':
      return <FilePlus className="w-4 h-4" />;
    case 'Affidavit':
      return <ScrollText className="w-4 h-4" />;
    case 'Court Order':
      return <Gavel className="w-4 h-4" />;
    case 'Correspondence':
      return <Mail className="w-4 h-4" />;
    case 'Contract':
      return <PenLine className="w-4 h-4" />;
    case 'Judgment':
      return <FileCheck className="w-4 h-4" />;
    default:
      return <File className="w-4 h-4" />;
  }
}

function getCategoryColor(category: DocumentCategory) {
  switch (category) {
    case 'Intake Form':
      return 'bg-teal-100 text-teal-700 border-teal-200';
    case 'Affidavit':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'Court Order':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'Correspondence':
      return 'bg-sky-100 text-sky-700 border-sky-200';
    case 'Contract':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    case 'Judgment':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function getDocStatusColor(status: string) {
  switch (status) {
    case 'Final':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Draft':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Review':
      return 'bg-sky-100 text-sky-800 border-sky-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

const formTemplates = [
  {
    id: 'TPL001',
    name: 'Client Intake Form',
    description: 'Standard client registration and intake form',
    category: 'Intake Form' as DocumentCategory,
    lastUpdated: '2026-01-15',
  },
  {
    id: 'TPL002',
    name: 'Affidavit Template - GBV',
    description: 'Affidavit template for gender-based violence cases',
    category: 'Affidavit' as DocumentCategory,
    lastUpdated: '2026-02-20',
  },
  {
    id: 'TPL003',
    name: 'Maintenance Application',
    description: 'Court application for child/spousal maintenance',
    category: 'Intake Form' as DocumentCategory,
    lastUpdated: '2026-03-10',
  },
  {
    id: 'TPL004',
    name: 'Protection Order Application',
    description: 'Application for protection order under Anti-GBV Act',
    category: 'Intake Form' as DocumentCategory,
    lastUpdated: '2026-04-05',
  },
  {
    id: 'TPL005',
    name: 'Custody Application',
    description: 'Application for child custody and access',
    category: 'Intake Form' as DocumentCategory,
    lastUpdated: '2026-05-01',
  },
  {
    id: 'TPL006',
    name: 'Consent to Act',
    description: 'Client consent form for legal representation',
    category: 'Contract' as DocumentCategory,
    lastUpdated: '2026-01-10',
  },
];

export function Documents() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'documents' | 'templates'>('documents');

  const categories: DocumentCategory[] = [
    'Intake Form',
    'Affidavit',
    'Court Order',
    'Correspondence',
    'Contract',
    'Judgment',
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      search === '' ||
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.caseName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const selectedDocData = documents.find((d) => d.id === selectedDoc);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Document Management</h2>
          <p className="text-slate-500 mt-1">Manage case documents and digital forms</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          onClick={() => setShowUploadDialog(true)}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 w-fit">
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'documents'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'templates'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Form Templates
        </button>
      </div>

      {activeTab === 'documents' ? (
        <>
          {/* Filters */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search documents by name or case..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
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
            </CardContent>
          </Card>

          {/* Documents Table */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/80">
                    <TableHead className="font-semibold">Document</TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">Category</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">Case</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">Uploaded By</TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="cursor-pointer hover:bg-teal-50/30 transition-colors"
                      onClick={() => setSelectedDoc(doc.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded ${getCategoryColor(doc.category).split(' ').slice(0, 2).join(' ')}`}>
                            {getCategoryIcon(doc.category)}
                          </div>
                          <span className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                            {doc.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className={`text-xs ${getCategoryColor(doc.category)}`}>
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-slate-600 truncate max-w-[150px]">
                        {doc.caseName}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-slate-600">
                        {doc.uploadedBy}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-slate-500">
                        {new Date(doc.uploadDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${getDocStatusColor(doc.status)}`}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                        {doc.fileSize}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredDocs.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm">No documents found matching your search.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Form Templates */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formTemplates.map((template) => (
            <Card
              key={template.id}
              className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(template.category).split(' ').slice(0, 2).join(' ')}`}>
                    {getCategoryIcon(template.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900">{template.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="outline" className={`text-[10px] ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </Badge>
                      <p className="text-[10px] text-slate-400">
                        Updated: {new Date(template.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Document Detail Dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <DialogContent className="max-w-md">
          {selectedDocData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  Document Details
                </DialogTitle>
                <DialogDescription>{selectedDocData.name}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Category</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getCategoryColor(selectedDocData.category)}`}>
                      {selectedDocData.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Status</p>
                    <Badge variant="outline" className={`text-xs mt-0.5 ${getDocStatusColor(selectedDocData.status)}`}>
                      {selectedDocData.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Related Case</p>
                  <p className="text-sm font-medium text-teal-700">{selectedDocData.caseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Uploaded By</p>
                    <p className="text-sm">{selectedDocData.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Upload Date</p>
                    <p className="text-sm">{new Date(selectedDocData.uploadDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">File Size</p>
                    <p className="text-sm">{selectedDocData.fileSize}</p>
                  </div>
                </div>
                {/* Document Preview Placeholder */}
                <div className="border border-slate-200 rounded-lg p-8 text-center bg-slate-50">
                  <File className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Document preview</p>
                  <p className="text-xs text-slate-400 mt-1">PDF viewer would render here</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
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
              <Upload className="w-5 h-5 text-teal-600" />
              Upload Document
            </DialogTitle>
            <DialogDescription>Upload a new document to the system</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Document Name</label>
              <Input placeholder="Enter document name" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <Select>
                  <SelectTrigger className="mt-1">
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
                <label className="text-sm font-medium text-slate-700">Status</label>
                <Select>
                  <SelectTrigger className="mt-1">
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
              <label className="text-sm font-medium text-slate-700">Related Case</label>
              <Select>
                <SelectTrigger className="mt-1">
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
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 font-medium">Click to upload or drag files here</p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX, JPG up to 10MB</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
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
