import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Share2,
  Layers,
  AlertTriangle,
  Sparkles,
  Settings,
  X,
  Database,
  Cpu
} from 'lucide-react';
import NexusLogo from './NexusLogo.jsx';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/network', label: 'Interaction Network', icon: Share2 },
  { path: '/communities', label: 'Communities', icon: Layers },
  { path: '/anomalies', label: 'Anomalies', icon: AlertTriangle, badge: '17' },
  { path: '/predictions', label: 'Predictions', icon: Sparkles }
];

const SECONDARY_ITEMS = [
  { path: '/settings', label: 'Settings', icon: Settings }
];

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  onCloseMobile
}) {
  const location = useLocation();

  const renderNavLink = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path || 
      (item.path !== '/' && location.pathname.startsWith(item.path));

    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={onCloseMobile}
        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
          isActive
            ? 'bg-cyan-500/10 text-cyan-700 font-bold border-l-3 border-cyan-600'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
        } ${isCollapsed ? 'justify-center px-2' : ''}`}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon
          className={`w-4 h-4 shrink-0 transition-colors ${
            isActive ? 'text-cyan-600' : 'text-slate-400 group-hover:text-slate-600'
          }`}
        />
        
        {!isCollapsed && (
          <span className="truncate flex-1">
            {item.label}
          </span>
        )}

        {!isCollapsed && item.badge && (
          <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-100 text-rose-700">
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 select-none">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200/80">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-2 overflow-hidden">
          <NexusLogo size="sm" showSubtitle={!isCollapsed} />
        </NavLink>
        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Intelligence
            </p>
          )}
          <nav className="space-y-1">
            {NAV_ITEMS.map(renderNavLink)}
          </nav>
        </div>

        <div>
          <div className="my-3 border-t border-slate-100 mx-2" />
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              System
            </p>
          )}
          <nav className="space-y-1">
            {SECONDARY_ITEMS.map(renderNavLink)}
          </nav>
        </div>
      </div>

      {/* Model Status indicator at bottom */}
      {!isCollapsed ? (
        <div className="p-3.5 m-3 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-[11px] font-bold text-slate-800">GNN Engine Ready</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Frontend API layer active. Mock graph topology loaded.
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[9px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>API Layer Connected</span>
          </div>
        </div>
      ) : (
        <div className="p-3 text-center" title="GNN Engine Ready">
          <span className="w-2 h-2 inline-block rounded-full bg-emerald-500"></span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out z-20 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="fixed top-0 bottom-0 left-0 w-inherit h-full">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 w-72 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
