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
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { staff } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';

export type NavItem = 'dashboard' | 'clients' | 'cases' | 'calendar' | 'documents' | 'tasks' | 'reports' | 'settings';

interface SidebarProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems: { id: NavItem; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cases', label: 'Cases', icon: Briefcase },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const currentUser = staff[0]; // Admin user

export function Sidebar({ activeItem, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth/login');
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={`hidden md:flex flex-col h-screen bg-[#121c2a] text-[#98f3e5] transition-all duration-300 ${
          collapsed ? 'w-[68px]' : 'w-[280px]'
        }`}
      >
        {/* Header / Branding */}
        <div className="px-6 mb-8 pt-8">
          {!collapsed ? (
            <>
              <h1 className="text-[20px] font-semibold text-[#98f3e5] leading-7">NLACW CMS</h1>
              <p className="text-[12px] text-[#bdc7da]/70 mt-1 font-semibold tracking-[0.05em]">Legal Management</p>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="w-9 h-9 rounded-lg bg-[#0d7c71] flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#bffff4]" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2 px-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <div key={item.id}>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`w-full flex items-center justify-center p-3 transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 text-[#98f3e5] border-l-4 border-[#0d7c71]'
                            : 'text-[#bdc7da]/70 hover:bg-white/5 hover:text-[#98f3e5]'
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
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-white/10 text-[#98f3e5] border-l-4 border-[#0d7c71] cursor-pointer'
                        : 'text-[#bdc7da]/70 hover:bg-white/5 hover:text-[#98f3e5] cursor-pointer'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-[16px] font-normal leading-6">{item.label}</span>
                  </button>
                )}
              </div>
            );
          })}

          {/* Settings pushed to bottom when not collapsed */}
          {!collapsed && <div className="flex-1" />}
        </nav>

        {/* User Profile */}
        {!collapsed ? (
          <div className="p-4">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
              <div className="w-8 h-8 rounded-full bg-[#0d7c71] overflow-hidden border border-[#bdc9c6] shadow-sm flex items-center justify-center">
                <span className="text-[12px] font-semibold text-[#bffff4]">M</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-white truncate">{currentUser.name}</p>
                <p className="text-[11px] text-[#7bd6c9] font-medium">{currentUser.role}</p>
              </div>
              <button className="text-[#bdc7da]/50 hover:text-white transition-colors p-1" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="w-full flex justify-center p-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#0d7c71] overflow-hidden border border-[#6e7977] shadow-sm flex items-center justify-center">
                  <span className="text-[12px] font-semibold text-[#bffff4]">M</span>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground">{currentUser.role}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-white/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full text-[#bdc7da]/50 hover:text-white hover:bg-white/5 justify-center"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span className="ml-2 text-[12px]">Collapse</span>}
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
