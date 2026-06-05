'use client';

import { useState } from 'react';
import { Sidebar, type NavItem } from '@/components/cms/sidebar';
import { Dashboard } from '@/components/cms/dashboard';
import { Clients } from '@/components/cms/clients';
import { Cases } from '@/components/cms/cases';
import { CalendarModule } from '@/components/cms/calendar';
import { Documents } from '@/components/cms/documents';
import { Tasks } from '@/components/cms/tasks';
import { Reports } from '@/components/cms/reports';
import { Settings } from '@/components/cms/settings';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveNav} />;
      case 'clients':
        return <Clients />;
      case 'cases':
        return <Cases />;
      case 'calendar':
        return <CalendarModule />;
      case 'documents':
        return <Documents />;
      case 'tasks':
        return <Tasks />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActiveNav} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          activeItem={activeNav}
          onNavigate={(item) => {
            setActiveNav(item);
            setMobileMenuOpen(false);
          }}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10">
            <Sidebar
              activeItem={activeNav}
              onNavigate={(item) => {
                setActiveNav(item);
                setMobileMenuOpen(false);
              }}
              collapsed={false}
              onToggleCollapse={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-slate-900 capitalize">
                {activeNav === 'gbv' ? 'GBV' : activeNav}
              </h1>
              <span className="text-xs text-slate-400 hidden sm:inline">
                — National Legal Aid Clinic for Women
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 hidden sm:inline">
              {new Date().toLocaleDateString('en-GB', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
