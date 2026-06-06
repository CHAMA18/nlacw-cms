'use client';

import { useState, useEffect } from 'react';
import { Sidebar, type NavItem } from '@/components/cms/sidebar';
import { Dashboard } from '@/components/cms/dashboard';
import { Clients } from '@/components/cms/clients';
import { Cases } from '@/components/cms/cases';
import { CalendarModule } from '@/components/cms/calendar';
import { Documents } from '@/components/cms/documents';
import { Tasks } from '@/components/cms/tasks';
import { Reports } from '@/components/cms/reports';
import { Settings } from '@/components/cms/settings';
import { Menu, Bell, HelpCircle, LogOut, User, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { staff } from '@/lib/mock-data';

const currentUser = staff[0];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth form state
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [signUpShowPassword, setSignUpShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Check localStorage on mount for persisted session
  useEffect(() => {
    const saved = localStorage.getItem('nlacw_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('nlacw_auth', 'true');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    localStorage.setItem('nlacw_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nlacw_auth');
    setEmail('');
    setPassword('');
    setActiveNav('dashboard');
  };

  // ─── Auth Screens ─────────────────────────────────────────────
  if (!isAuthenticated) {
    if (isSignUp) {
      return (
        <div className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden min-h-screen flex flex-col md:flex-row">
          {/* Left Split: Brand Imagery */}
          <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-surface-variant flex-col justify-between overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXw0PJb2FkArdbxLZo37IjDP_FDONUub7BPgduaP3FUdzivUO5pJ2Zkynoe_pFBCKbu_R9U5XjqknMSyxPgoSTZG0VD7jH2cS7OvAKFbumVjce4oA1n2ikKFPtxcwNOxzbJeWaYlazV-pJvlIvSVEViJDC8yE9j980ZTF4Lu2VO9vhf-60wl6-P89O2WpoDrpOfAb9maje-72EM9KUJbTNzinkDg3C3O0TTFy0KJP9ZLnUsDZZsv_9MaCXRWd9DTbWBXgnoB3KsCE')",
              }}
            />
            <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-tint/90 to-transparent" />
            <div className="relative z-10 p-margin-desktop h-full flex flex-col justify-between">
              <div>
                <span className="text-headline-md font-bold text-on-primary tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>NLACW</span>
                <div className="mt-2 w-12 h-1 bg-primary-fixed-dim rounded-full" />
              </div>
              <div className="max-w-md">
                <h1 className="text-display-lg text-on-primary mb-stack-md leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Empower.<br />Protect.
                </h1>
                <p className="text-body-lg text-primary-fixed-dim/90" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '28px' }}>
                  Join the platform that powers legal aid for women and children across Zambia. Create your account to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Right Split: Sign Up Form */}
          <div className="flex-1 flex flex-col justify-center items-center bg-surface-container-lowest min-h-screen p-margin-mobile md:p-margin-desktop relative">
            <div className="md:hidden absolute top-0 left-0 w-full p-margin-mobile flex justify-center border-b border-outline-variant/30 bg-surface-container-lowest">
              <span className="text-headline-md font-bold text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>NLACW</span>
            </div>

            <div className="w-full max-w-[440px] space-y-stack-lg mt-12 md:mt-0">
              <div className="space-y-stack-sm text-center md:text-left">
                <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                  Create Account
                </h2>
                <p className="text-body-md text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Register to access the NLACW Case Management System.
                </p>
              </div>

              <form className="space-y-stack-md" onSubmit={handleSignUp}>
                {/* Full Name */}
                <div className="space-y-stack-sm">
                  <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="signup-name">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    id="signup-name"
                    placeholder="Jane Doe"
                    required
                    type="text"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                  />
                </div>

                {/* Email */}
                <div className="space-y-stack-sm">
                  <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="signup-email">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    id="signup-email"
                    placeholder="jane.doe@example.com"
                    required
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                  />
                </div>

                {/* Password */}
                <div className="space-y-stack-sm">
                  <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="signup-password">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all pr-12"
                      id="signup-password"
                      placeholder="••••••••"
                      required
                      type={signUpShowPassword ? 'text' : 'password'}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors flex items-center justify-center p-1" type="button" onClick={() => setSignUpShowPassword(!signUpShowPassword)}>
                      <span className="material-symbols-outlined text-[20px] select-none">
                        {signUpShowPassword ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-stack-sm">
                  <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="signup-confirm-password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                    id="signup-confirm-password"
                    placeholder="••••••••"
                    required
                    type="password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                  />
                </div>

                {/* Terms */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary mt-0.5"
                  />
                  <span className="text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '14px', lineHeight: '20px' }}>
                    I agree to the{' '}
                    <a href="#" className="text-primary hover:underline underline-offset-4">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary hover:underline underline-offset-4">Privacy Policy</a>
                  </span>
                </label>

                <div className="pt-stack-sm space-y-stack-md">
                  <button
                    className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-lg hover:bg-primary-container hover:text-on-primary-container hover:shadow-md transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                    type="submit"
                    disabled={!agreedToTerms}
                  >
                    Create Account
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <div className="flex items-center justify-center gap-1.5 text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Secure &amp; Confidential
                  </div>
                </div>
              </form>

              <div className="text-center border-t border-outline-variant/30 pt-stack-md">
                <span className="text-body-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                  Already have an account?{' '}
                </span>
                <button
                  className="text-primary hover:text-primary-container transition-colors hover:underline underline-offset-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                  onClick={() => setIsSignUp(false)}
                >
                  Sign in
                </button>
              </div>
            </div>

            <div className="absolute bottom-0 w-full p-stack-md flex justify-center items-center">
              <p className="text-label-sm text-secondary/60 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
                © 2024 National Legal Aid Clinic for Women. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // ─── Login Screen ──────────────────────────────────────────
    return (
      <div className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden min-h-screen flex flex-col md:flex-row">
        {/* Left Split: Brand Imagery */}
        <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-surface-variant flex-col justify-between overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXw0PJb2FkArdbxLZo37IjDP_FDONUub7BPgduaP3FUdzivUO5pJ2Zkynoe_pFBCKbu_R9U5XjqknMSyxPgoSTZG0VD7jH2cS7OvAKFbumVjce4oA1n2ikKFPtxcwNOxzbJeWaYlazV-pJvlIvSVEViJDC8yE9j980ZTF4Lu2VO9vhf-60wl6-P89O2WpoDrpOfAb9maje-72EM9KUJbTNzinkDg3C3O0TTFy0KJP9ZLnUsDZZsv_9MaCXRWd9DTbWBXgnoB3KsCE')",
            }}
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-tint/90 to-transparent" />
          <div className="relative z-10 p-margin-desktop h-full flex flex-col justify-between">
            <div>
              <span className="text-headline-md font-bold text-on-primary tracking-tight" style={{ fontFamily: 'Inter, sans-serif' }}>NLACW</span>
              <div className="mt-2 w-12 h-1 bg-primary-fixed-dim rounded-full" />
            </div>
            <div className="max-w-md">
              <h1 className="text-display-lg text-on-primary mb-stack-md leading-tight" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Justice,<br />Accessible.
              </h1>
              <p className="text-body-lg text-primary-fixed-dim/90" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '28px' }}>
                Access your secure workspace to manage cases, track progress, and deliver legal assistance where it matters most.
              </p>
            </div>
          </div>
        </div>

        {/* Right Split: Login Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-surface-container-lowest min-h-screen p-margin-mobile md:p-margin-desktop relative">
          <div className="md:hidden absolute top-0 left-0 w-full p-margin-mobile flex justify-center border-b border-outline-variant/30 bg-surface-container-lowest">
            <span className="text-headline-md font-bold text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>NLACW</span>
          </div>

          <div className="w-full max-w-[440px] space-y-stack-lg mt-12 md:mt-0">
            <div className="space-y-stack-sm text-center md:text-left">
              <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                Welcome Back
              </h2>
              <p className="text-body-md text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Sign in to your account to continue your work.
              </p>
            </div>

            <form className="space-y-stack-md" onSubmit={handleLogin}>
              {/* Email */}
              <div className="space-y-stack-sm">
                <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                  id="email"
                  placeholder="jane.doe@example.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                />
              </div>

              {/* Password */}
              <div className="space-y-stack-sm">
                <label className="block text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }} htmlFor="password">
                  Password
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all pr-12"
                    id="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors flex items-center justify-center p-1" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined text-[20px] select-none">
                      {showPassword ? 'visibility' : 'visibility_off'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary"
                  />
                  <span className="text-label-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px' }}>
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-label-md text-primary hover:text-primary-container transition-colors hover:underline underline-offset-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px' }}
                >
                  Forgot password?
                </a>
              </div>

              <div className="pt-stack-sm space-y-stack-md">
                <button
                  className="w-full bg-primary text-on-primary py-3.5 px-6 rounded-lg hover:bg-primary-container hover:text-on-primary-container hover:shadow-md transition-all flex items-center justify-center gap-2 group"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                  type="submit"
                >
                  Sign In
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <div className="flex items-center justify-center gap-1.5 text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Secure &amp; Confidential
                </div>
              </div>
            </form>

            <div className="text-center border-t border-outline-variant/30 pt-stack-md">
              <span className="text-body-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
                Don&apos;t have an account?{' '}
              </span>
              <button
                className="text-primary hover:text-primary-container transition-colors hover:underline underline-offset-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                onClick={() => setIsSignUp(true)}
              >
                Create account
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 w-full p-stack-md flex justify-center items-center">
            <p className="text-label-sm text-secondary/60 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
              © 2024 National Legal Aid Clinic for Women. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Authenticated Dashboard ────────────────────────────────
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

            {/* User Avatar Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2.5 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-[#0d7c71] overflow-hidden border border-[#bdc9c6] shadow-sm flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-[#bffff4]">M</span>
                  </div>
                  <span className="hidden md:block text-[14px] font-medium text-[#0b1c30]">
                    {currentUser.name}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-[14px] font-medium text-[#0b1c30]">{currentUser.name}</p>
                    <p className="text-[12px] text-[#3e4947]">{currentUser.email}</p>
                    <p className="text-[11px] text-[#7bd6c9] font-semibold">{currentUser.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer text-[#0b1c30] focus:text-[#0b1c30]"
                    onClick={() => setActiveNav('settings')}
                  >
                    <Settings2 className="mr-2 h-4 w-4 text-[#3e4947]" />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-[#ba1a1a] focus:text-[#ba1a1a] focus:bg-[#ffdad6]/50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
