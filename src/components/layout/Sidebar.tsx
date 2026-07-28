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
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/hooks';

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
    <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-zinc-800">
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

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-md shadow-red-600/20' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
