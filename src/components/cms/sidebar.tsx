'use client';

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  FileText,
  CheckSquare,
  BarChart3,
  Settings,
  Scale,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { staff } from '@/lib/mock-data';

export type NavItem = 'dashboard' | 'clients' | 'cases' | 'calendar' | 'documents' | 'tasks' | 'reports' | 'settings';

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: NavItem; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'cases', label: 'Cases', icon: Briefcase },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const currentUser = staff[0]; // Admin user

export function Sidebar({ activeItem, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`flex flex-col h-screen bg-slate-900 text-white transition-all duration-300 ${
          collapsed ? 'w-[68px]' : 'w-[260px]'
        }`}
      >
        {/* Header / Branding */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-base font-bold tracking-tight text-white">NLACW</h1>
              <p className="text-[11px] text-slate-400 leading-tight">Case Management System</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <li key={item.id}>
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onNavigate(item.id)}
                          className={`w-full flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="font-medium">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <button
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 font-medium'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800 font-normal'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Separator className="bg-slate-700/50" />

        {/* User Profile */}
        <div className="p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
              <Avatar className="w-9 h-9 border-2 border-teal-500">
                <AvatarFallback className="bg-teal-600 text-white text-xs font-semibold">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-[11px] text-teal-400 font-medium">{currentUser.role}</p>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors p-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="w-full flex justify-center p-2">
                  <Avatar className="w-8 h-8 border-2 border-teal-500">
                    <AvatarFallback className="bg-teal-600 text-white text-xs font-semibold">
                      {currentUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-slate-700/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full text-slate-400 hover:text-white hover:bg-slate-800 justify-center"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
