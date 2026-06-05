'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  MapPin,
  X,
  ChevronDown,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { clients, cases, getClientStatusColor, type Office, type CaseType } from '@/lib/mock-data';

export function Clients() {
  const [search, setSearch] = useState('');
  const [officeFilter, setOfficeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

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
          <h2 className="text-2xl font-bold text-slate-900">Client Management</h2>
          <p className="text-slate-500 mt-1">Manage and track all registered clients across offices</p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, NRC, or phone..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={officeFilter} onValueChange={setOfficeFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Office" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Offices</SelectItem>
                {offices.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
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
              <SelectTrigger className="w-full sm:w-[140px]">
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
        </CardContent>
      </Card>

      {/* Client Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80">
                <TableHead className="font-semibold">Client</TableHead>
                <TableHead className="font-semibold">NRC</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Category</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Office</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">Cases</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer hover:bg-teal-50/30 transition-colors"
                  onClick={() => setSelectedClient(client.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 border border-slate-200">
                        <AvatarFallback className="bg-teal-100 text-teal-700 text-xs font-semibold">
                          {client.firstName[0]}{client.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-slate-900">
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{client.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 font-mono">{client.nrc}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-xs font-normal">
                      {client.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-600">{client.office}</TableCell>
                  <TableCell className="hidden sm:table-cell text-sm font-medium text-slate-900">{client.casesCount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${getClientStatusColor(client.status)}`}>
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                    {new Date(client.registrationDate).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredClients.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">No clients found matching your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Client Detail Dialog */}
      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selectedClientData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-teal-500">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-sm font-semibold">
                      {selectedClientData.firstName[0]}{selectedClientData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold">
                      {selectedClientData.firstName} {selectedClientData.lastName}
                    </p>
                    <p className="text-sm font-normal text-slate-500">
                      ID: {selectedClientData.id}
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>Client profile and case history</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Contact Information */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">{selectedClientData.phone}</span>
                    </div>
                    {selectedClientData.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{selectedClientData.email}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-sm col-span-1 sm:col-span-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <span className="text-slate-600">
                        {selectedClientData.address}, {selectedClientData.town},{' '}
                        {selectedClientData.province} Province
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Details */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Details</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">NRC</p>
                      <p className="text-sm font-mono font-medium">{selectedClientData.nrc}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Office</p>
                      <p className="text-sm font-medium">{selectedClientData.office}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Category</p>
                      <Badge variant="outline" className="text-xs mt-0.5">
                        {selectedClientData.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Status</p>
                      <Badge
                        variant="outline"
                        className={`text-xs mt-0.5 ${getClientStatusColor(selectedClientData.status)}`}
                      >
                        {selectedClientData.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                {selectedClientData.notes && (
                  <>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Notes</h4>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                        {selectedClientData.notes}
                      </p>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Case History */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">
                    Case History ({clientCases.length})
                  </h4>
                  {clientCases.length > 0 ? (
                    <div className="space-y-2">
                      {clientCases.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {c.id} - {c.type}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Assigned to {c.assignedLawyer} · {c.office}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${getClientStatusColor(c.status === 'Active' ? 'Active' : c.status === 'Awaiting Court' ? 'Pending' : c.status === 'Closed-Resolved' ? 'Inactive' : 'Pending')}`}
                          >
                            {c.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">No cases found for this client.</p>
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
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <Input placeholder="Enter first name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <Input placeholder="Enter last name" className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">NRC Number</label>
              <Input placeholder="e.g., 123456/78/1" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <Input placeholder="+260 9XX XXX XXX" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email (Optional)</label>
                <Input placeholder="email@example.com" className="mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Address</label>
              <Input placeholder="Plot/House number, Township" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Town</label>
                <Input placeholder="Town" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Province</label>
                <Input placeholder="Province" className="mt-1" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Category</label>
                <Select>
                  <SelectTrigger className="mt-1">
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
            <div>
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                className="w-full mt-1 p-2 border rounded-md text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Additional notes about the client..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
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
