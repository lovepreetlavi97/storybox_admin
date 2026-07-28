'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks';
import { navLinks } from './Sidebar';

export function AdminHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <header className="flex md:hidden items-center justify-between px-6 h-16 bg-zinc-900 border-b border-zinc-800 z-20">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/storyhublogo.png" 
            alt="StoryHub Logo" 
            className="h-8 w-auto object-contain rounded shrink-0" 
          />
          <span className="font-black text-base tracking-tight text-white">
            Story<span className="text-red-500">Hub</span>
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-zinc-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-zinc-950/95 z-10 flex flex-col p-6 space-y-6">
          <nav className="flex-1 space-y-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-xl text-base font-semibold transition-all ${
                    isActive 
                      ? 'bg-red-600 text-white' 
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={logout}
            className="flex w-full items-center gap-4 px-5 py-3.5 rounded-xl text-base font-semibold text-red-500 hover:bg-red-500/10 transition-all border border-red-500/20"
          >
            <LogOut className="h-6 w-6" />
            Logout
          </button>
        </div>
      )}
    </>
  );
}
