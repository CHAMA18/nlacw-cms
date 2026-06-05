'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LogInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden min-h-screen flex flex-col md:flex-row">
      {/* Left Split: Brand Imagery (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-surface-variant flex-col justify-between overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXw0PJb2FkArdbxLZo37IjDP_FDONUub7BPgduaP3FUdzivUO5pJ2Zkynoe_pFBCKbu_R9U5XjqknMSyxPgoSTZG0VD7jH2cS7OvAKFbumVjce4oA1n2ikKFPtxcwNOxzbJeWaYlazV-pJvlIvSVEViJDC8yE9j980ZTF4Lu2VO9vhf-60wl6-P89O2WpoDrpOfAb9maje-72EM9KUJbTNzinkDg3C3O0TTFy0KJP9ZLnUsDZZsv_9MaCXRWd9DTbWBXgnoB3KsCE')",
          }}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-tint/90 to-transparent" />

        {/* Content Overlay */}
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

      {/* Right Split: Form Canvas */}
      <div className="flex-1 flex flex-col justify-center items-center bg-surface-container-lowest min-h-screen p-margin-mobile md:p-margin-desktop relative">
        {/* Mobile Brand Anchor (Visible only on small screens) */}
        <div className="md:hidden absolute top-0 left-0 w-full p-margin-mobile flex justify-center border-b border-outline-variant/30 bg-surface-container-lowest">
          <span className="text-headline-md font-bold text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>NLACW</span>
        </div>

        <div className="w-full max-w-[440px] space-y-stack-lg mt-12 md:mt-0">
          {/* Header */}
          <div className="space-y-stack-sm text-center md:text-left">
            <h2
              className="text-headline-lg-mobile md:text-headline-lg text-on-surface"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Welcome Back
            </h2>
            <p className="text-body-md text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Sign in to your account to continue your work.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-stack-md" onSubmit={(e) => e.preventDefault()}>
            {/* Email Field */}
            <div className="space-y-stack-sm">
              <label
                className="block text-label-md text-on-surface-variant"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                htmlFor="email"
              >
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

            {/* Password Field */}
            <div className="space-y-stack-sm">
              <label
                className="block text-label-md text-on-surface-variant"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
                htmlFor="password"
              >
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
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline group-hover:text-primary transition-colors flex items-center justify-center p-1"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
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

            {/* Actions */}
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

              {/* Trust Signal */}
              <div className="flex items-center justify-center gap-1.5 text-secondary" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Secure &amp; Confidential
              </div>
            </div>
          </form>

          {/* Signup Redirect */}
          <div className="text-center border-t border-outline-variant/30 pt-stack-md">
            <span className="text-body-md text-on-surface-variant" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '24px' }}>
              Don&apos;t have an account?{' '}
            </span>
            <Link
              className="text-primary hover:text-primary-container transition-colors hover:underline underline-offset-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.01em' }}
              href="/auth/signup"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Minimal Footer for Transactional Page */}
        <div className="absolute bottom-0 w-full p-stack-md flex justify-center items-center">
          <p className="text-label-sm text-secondary/60 text-center" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.05em' }}>
            © 2024 National Legal Aid Clinic for Women. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
