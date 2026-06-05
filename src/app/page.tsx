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
import { Menu, Bell, HelpCircle } from 'lucide-react';
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
    <div className="flex h-screen bg-[#F8F9FF] overflow-hidden">
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

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopNavBar */}
        <header className="bg-[#F8F9FF] border-b border-[#bdc9c6] h-16 flex justify-between items-center px-4 md:px-10 w-full sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 text-[#3e4947]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="font-semibold text-[20px] text-[#0b1c30] leading-7 hidden lg:block">
              National Legal Aid Clinic for Women
            </div>
            <div className="font-semibold text-[20px] text-[#0b1c30] leading-7 lg:hidden">
              NLACW
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2 text-[#3e4947] hover:text-[#006158] transition-colors active:scale-90">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-[#3e4947] hover:text-[#006158] transition-colors active:scale-90">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0d7c71] overflow-hidden border border-[#bdc9c6] shadow-sm flex items-center justify-center">
              <span className="text-[12px] font-semibold text-[#bffff4]">M</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 w-full max-w-[1440px] mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
