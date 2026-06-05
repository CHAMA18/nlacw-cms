'use client';

import { useState } from 'react';
import {
  Shield,
  Building,
  User,
  Bell,
  Lock,
  Edit,
  Plus,
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { staff, type UserRole, type Office } from '@/lib/mock-data';

function getRoleBadgeColor(role: UserRole) {
  switch (role) {
    case 'Admin':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Lawyer':
      return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'Paralegal':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Intern':
      return 'bg-sky-100 text-sky-800 border-sky-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

const rolePermissions: Record<UserRole, string[]> = {
  Admin: [
    'Full system access',
    'User management',
    'System configuration',
    'All case access',
    'Report generation',
    'Data export',
  ],
  Lawyer: [
    'Case management',
    'Document upload/download',
    'Client records',
    'Court date management',
    'Report viewing',
    'Task assignment',
  ],
  Paralegal: [
    'Case viewing',
    'Document upload',
    'Client records (limited)',
    'Task management',
    'Calendar viewing',
  ],
  Intern: [
    'Case viewing (limited)',
    'Document viewing',
    'Task viewing',
    'Calendar viewing',
  ],
};

const offices = [
  {
    name: 'Lusaka (Head Office)',
    address: 'Corner of Independence Avenue and Nasser Road, Lusaka',
    phone: '+260 211 252 284',
    email: 'lusaka@nlacw.org.zm',
    staffCount: 4,
    activeCases: 112,
  },
  {
    name: 'Ndola Office',
    address: '16 Broadway Street, Ndola, Copperbelt Province',
    phone: '+260 212 610 397',
    email: 'ndola@nlacw.org.zm',
    staffCount: 3,
    activeCases: 78,
  },
  {
    name: 'Livingstone Office',
    address: 'Mosi-oa-Tunya Road, Livingstone, Southern Province',
    phone: '+260 213 321 556',
    email: 'livingstone@nlacw.org.zm',
    staffCount: 3,
    activeCases: 57,
  },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState<'users' | 'offices' | 'permissions' | 'preferences'>('users');
  const [notifications, setNotifications] = useState({
    courtReminders: true,
    taskDeadlines: true,
    caseUpdates: true,
    weeklyDigest: false,
  });

  const tabs = [
    { id: 'users' as const, label: 'User Management', icon: User },
    { id: 'offices' as const, label: 'Office Configuration', icon: Building },
    { id: 'permissions' as const, label: 'Role Permissions', icon: Shield },
    { id: 'preferences' as const, label: 'System Preferences', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-1">Manage users, offices, and system configuration</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Staff Members</CardTitle>
                <CardDescription>All registered users in the system</CardDescription>
              </div>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Office</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Email</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Active Cases</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8 border border-slate-200">
                          <AvatarFallback className="bg-teal-100 text-teal-700 text-xs font-semibold">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{member.name}</p>
                          <p className="text-xs text-slate-500">{member.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-slate-600">
                      {member.office}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-slate-500">
                      {member.email}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm font-medium text-slate-900">
                      {member.activeCases}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-teal-600">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Offices Tab */}
      {activeTab === 'offices' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {offices.map((office) => (
            <Card key={office.name} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-teal-50">
                    <Building className="w-5 h-5 text-teal-600" />
                  </div>
                  <CardTitle className="text-sm font-semibold">{office.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="text-sm text-slate-700">{office.address}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Contact</p>
                  <p className="text-sm text-slate-700">{office.phone}</p>
                  <p className="text-sm text-teal-600">{office.email}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-lg font-bold text-slate-900">{office.staffCount}</p>
                    <p className="text-xs text-slate-500">Staff Members</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-teal-600">{office.activeCases}</p>
                    <p className="text-xs text-slate-500">Active Cases</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit Office
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.entries(rolePermissions) as [UserRole, string[]][]).map(([role, permissions]) => (
            <Card key={role} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-600" />
                  <CardTitle className="text-sm font-semibold">{role}</CardTitle>
                  <Badge variant="outline" className={`text-xs ml-auto ${getRoleBadgeColor(role)}`}>
                    {role}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  {role === 'Admin' && 'Full system access with all privileges'}
                  {role === 'Lawyer' && 'Legal practitioner with case management access'}
                  {role === 'Paralegal' && 'Support staff with limited case access'}
                  {role === 'Intern' && 'Trainee with view-only access'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {permissions.map((perm) => (
                    <li key={perm} className="flex items-center gap-2 text-sm text-slate-700">
                      <Lock className="w-3.5 h-3.5 text-teal-500" />
                      {perm}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Notification Settings</CardTitle>
              <CardDescription>Configure how you receive system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Court Date Reminders</p>
                  <p className="text-xs text-slate-500">Receive reminders before court appearances</p>
                </div>
                <Switch
                  checked={notifications.courtReminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, courtReminders: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Task Deadline Alerts</p>
                  <p className="text-xs text-slate-500">Get notified about upcoming task deadlines</p>
                </div>
                <Switch
                  checked={notifications.taskDeadlines}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, taskDeadlines: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Case Status Updates</p>
                  <p className="text-xs text-slate-500">Notifications when case status changes</p>
                </div>
                <Switch
                  checked={notifications.caseUpdates}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, caseUpdates: checked })
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-900">Weekly Digest</p>
                  <p className="text-xs text-slate-500">Receive a weekly summary email</p>
                </div>
                <Switch
                  checked={notifications.weeklyDigest}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, weeklyDigest: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-500">System Version</p>
                  <p className="font-medium">NLACW-CMS v2.4.1</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Last Updated</p>
                  <p className="font-medium">5 June 2026</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Database</p>
                  <p className="font-medium">PostgreSQL 15.4</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">License</p>
                  <p className="font-medium">LAZ Enterprise</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
