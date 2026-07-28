'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Music, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  LogOut,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/hooks';
import { WEBSITE_URL } from '@/constants/config';

export const navLinks = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Categories', href: '/dashboard/categories', icon: FolderKanban },
  { name: 'Audio Files', href: '/dashboard/audio', icon: Music },
  { name: 'Hero Banners', href: '/dashboard/banners', icon: ImageIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-zinc-950 border-r border-zinc-900/80 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-900/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/storyhublogo.png" 
            alt="StoryHub Logo" 
            className="h-8.5 w-auto object-contain rounded-lg shrink-0 group-hover:scale-105 transition-transform" 
          />
          <span className="font-extrabold text-base tracking-tight text-white group-hover:text-red-500 transition-colors">
            Story<span className="text-red-500">Hub</span>
          </span>
        </Link>
        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
          Console
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3.5 py-6 space-y-1.5 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' 
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-4 border-t border-zinc-900/80 space-y-2">
        <a
          href={WEBSITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3.5 w-3.5 text-rose-500" />
        </a>

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all cursor-pointer border border-transparent hover:border-rose-500/20"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
