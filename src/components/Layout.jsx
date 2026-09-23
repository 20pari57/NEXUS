import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F5F6FA] text-slate-900 flex flex-col antialiased">
      {/* Top Navbar with Logo, Navigation Pills, Search & Profile */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
        <Outlet />
      </main>

      {/* Clean minimal footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-xs text-slate-500">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">NEXUS</span>
            <span>·</span>
            <span>Employee Interaction Intelligence Platform</span>
          </div>
          <div className="text-slate-400 text-[11px] font-mono">
            Graph Neural Network (GNN) Modeling · Connected to Unified Service Layer
          </div>
        </div>
      </footer>
    </div>
  );
}
