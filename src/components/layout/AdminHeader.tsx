'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/hooks';
import { WEBSITE_URL } from '@/constants/config';
import { navLinks } from './Sidebar';

export function AdminHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <>
      <header className="flex md:hidden items-center justify-between px-5 h-16 bg-zinc-950/90 backdrop-blur border-b border-zinc-900/80 z-20">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/storyhublogo.png" 
            alt="StoryHub Logo" 
            className="h-8 w-auto object-contain rounded-lg shrink-0" 
          />
          <span className="font-extrabold text-base tracking-tight text-white">
            Story<span className="text-red-500">Hub</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
            Console
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <Menu className="h-5.5 w-5.5" />}
        </button>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-zinc-950/98 backdrop-blur-md z-10 flex flex-col p-6 space-y-6">
          <nav className="flex-1 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive 
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="h-5.5 w-5.5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-3 pt-4 border-t border-zinc-900">
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-5 py-3 rounded-xl text-sm font-semibold text-zinc-400 bg-zinc-900 hover:text-white transition-all"
            >
              <span>View Public Site</span>
              <ExternalLink className="h-4 w-4 text-rose-500" />
            </a>

            <button
              onClick={logout}
              className="flex w-full items-center gap-4 px-5 py-3 rounded-xl text-base font-bold text-rose-500 hover:bg-rose-500/10 transition-all border border-rose-500/20"
            >
              <LogOut className="h-5.5 w-5.5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
