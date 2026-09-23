import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  Settings,
  Menu,
  X,
  Share2,
  Users,
  LayoutDashboard,
  Layers,
  AlertTriangle,
  Sparkles,
  Command
} from 'lucide-react';
import NexusLogo from './NexusLogo.jsx';
import GlobalSearchModal from './GlobalSearchModal.jsx';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/employees', label: 'Employees', icon: Users },
  { path: '/network', label: 'Network', icon: Share2 },
  { path: '/communities', label: 'Communities', icon: Layers },
  { path: '/anomalies', label: 'Anomalies', icon: AlertTriangle, badge: '17' },
  { path: '/predictions', label: 'Predictions', icon: Sparkles }
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo with Tagline matching the Peoplexio screenshot */}
          <div className="flex items-center gap-3">
            <NavLink to="/" className="flex flex-col group">
              <div className="flex items-center gap-2">
                <NexusLogo size="sm" showSubtitle={false} />
                <span className="font-extrabold tracking-tight text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">
                  NEXUS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Empower. Connect. Understand.
              </span>
            </NavLink>
          </div>

          {/* Center Navigation Pill Bar (Matching the screenshot's rounded pill menu) */}
          <nav className="hidden xl:flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-full border border-slate-200/60 shadow-2xs">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#282255] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Tools: Search, Settings, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Trigger (Command Palette shortcut) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 rounded-full border border-slate-200/80 transition-all cursor-pointer"
              title="Search (⌘K or Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline font-medium">Search</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white rounded-md text-slate-500 border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Settings Button */}
            <NavLink
              to="/settings"
              className={`p-2 rounded-full border border-slate-200/80 transition-colors hidden sm:flex items-center justify-center ${
                location.pathname === '/settings'
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              title="Platform Settings"
            >
              <Settings className="w-4 h-4" />
            </NavLink>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full border border-slate-200/80 text-slate-600 hover:bg-slate-100 transition-colors relative flex items-center justify-center"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Network Notifications
                    </span>
                    <span className="text-[10px] font-mono text-indigo-600 font-semibold">
                      3 unread
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto text-xs">
                    <div
                      onClick={() => {
                        navigate('/anomalies');
                        setShowNotifications(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer"
                    >
                      <p className="font-semibold text-slate-900">High Priority Surge</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">E021 & E089 messaging frequency increased by 2,300%</p>
                      <span className="text-[10px] text-slate-400 font-mono">10:32 AM</span>
                    </div>
                    <div
                      onClick={() => {
                        navigate('/predictions');
                        setShowNotifications(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer"
                    >
                      <p className="font-semibold text-slate-900">New Link Prediction</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">High affinity detected between Alexander Becker & Yasmine Farah</p>
                      <span className="text-[10px] text-slate-400 font-mono">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <NavLink to="/settings" className="flex items-center gap-2 pl-1 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3730A3] to-[#6366F1] text-white text-xs font-bold flex items-center justify-center ring-2 ring-slate-100 group-hover:ring-indigo-300 transition-all shadow-2xs">
                AS
              </div>
            </NavLink>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Pill Navigation */}
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200/70 flex flex-col gap-1.5 animate-in slide-in-from-top duration-200">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center justify-between ${
                    isActive
                      ? 'bg-[#282255] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
            <NavLink
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </NavLink>
          </div>
        )}
      </header>

      {/* Global Command Palette Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
