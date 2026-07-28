'use client';

import React from 'react';
import { Sidebar, AdminHeader } from '@/components/layout';
import { useAuth } from '@/hooks';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { authorized, loading } = useAuth();

  if (loading || !authorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <p className="text-zinc-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTAINER */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* MOBILE HEADER */}
        <AdminHeader />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-zinc-950">
          {children}
        </main>
      </div>
    </div>
  );
}
