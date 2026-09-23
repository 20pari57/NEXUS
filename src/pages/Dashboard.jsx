import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users,
  Layers,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Share2,
  Calendar as CalendarIcon,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  Clock,
  Laptop,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import GraphView from '../components/GraphView.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import featuredAvatar from '../assets/images/avatar_featured_employee_1790185585054.jpg';

import { fetchDashboardMetrics, fetchInteractionTrends, fetchNetworkGraph } from '../api/interactions.js';
import { fetchTopConnectedEmployees, fetchEmployees } from '../api/employees.js';

export default function Dashboard() {
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [topEmployees, setTopEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Time tracker / Live pulse state
  const [isPlaying, setIsPlaying] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(155); // 02:35

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState({
    departments: true,
    devices: true,
    connectors: false
  });

  // Interactive Anomaly / Review Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'Welcome Kit & Node Setup', date: 'Sep 12, 09:30', done: true, tag: 'Setup' },
    { id: 2, title: 'AI & Eng Weekly Team Sync', date: 'Sep 13, 10:30', done: true, tag: 'Sync' },
    { id: 3, title: 'Cross-Cluster Anomaly E021', date: 'Sep 14, 12:00', done: false, tag: 'Anomaly' },
    { id: 4, title: 'Evaluate Bridge Link E004', date: 'Sep 15, 14:45', done: false, tag: 'Prediction' },
    { id: 5, title: 'GNN Spectral Matrix Review', date: 'Sep 16, 16:00', done: false, tag: 'Topological' }
  ]);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const toggleAccordion = (key) => {
    setOpenAccordion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [mRes, gRes, tRes] = await Promise.all([
          fetchDashboardMetrics(),
          fetchNetworkGraph(),
          fetchTopConnectedEmployees()
        ]);
        setMetrics(mRes);
        setGraphData(gRes);
        setTopEmployees(tRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const completedCount = checklist.filter(c => c.done).length;

  if (loading && !metrics) {
    return <LoadingState message="Loading NEXUS Intelligence Platform..." rows={8} />;
  }

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Title & Progress Stats Strip (Exactly matching the Peoplexio UI reference) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 pb-2">
        {/* Left: Greeting + Segmented status pills */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome in, <span className="text-[#302868]">NEXUS</span>
          </h1>
          
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            {/* Direct Collab pill (Dark purple filled) */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2B2353] text-white font-medium shadow-xs">
              <span className="text-slate-300 text-[11px]">Interactions</span>
              <span className="font-bold text-white">18%</span>
            </div>

            {/* Active Density pill (Lavender filled) */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#705CF6] text-white font-medium shadow-xs">
              <span className="text-purple-100 text-[11px]">Active Links</span>
              <span className="font-bold text-white">24%</span>
            </div>

            {/* Project Velocity / Hatched bar pill */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
              <span className="text-slate-500 text-[11px]">Network Flow</span>
              <span className="font-bold text-slate-900">65%</span>
              <div className="w-16 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-purple-400 to-indigo-600 rounded-full"
                  style={{ width: '65%' }}
                />
              </div>
            </div>

            {/* Anomaly Rate pill */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
              <span className="text-slate-500 text-[11px]">Anomaly Rate</span>
              <span className="font-bold text-rose-600">12%</span>
            </div>
          </div>
        </div>

        {/* Right: Key counters with modern sleek icons (128 / 248 Employees, 36 Communities, 54 Anomalies) */}
        <div className="flex items-center gap-6 sm:gap-8 self-start lg:self-auto bg-white/70 backdrop-blur-xs p-3 px-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono block leading-none">
                {metrics?.totalEmployees?.value || '248'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Employees</span>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono block leading-none">
                {metrics?.communities?.formatted || '24'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Communities</span>
            </div>
          </div>

          <div className="w-px h-8 bg-slate-200" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-mono block leading-none">
                {metrics?.anomalies?.formatted || '17'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Anomalies</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 1: 4 Key Cards matching the Peoplexio visual architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        {/* Card 1: Featured Key Hub Leader (Portrait card with bottom gradient tag) - lg:col-span-3 */}
        <div
          onClick={() => navigate('/employees/E001')}
          className="lg:col-span-3 bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm relative group cursor-pointer h-[290px] flex flex-col justify-end"
        >
          <img
            src={featuredAvatar}
            alt="Ananya Sharma"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#20184E]/95 via-[#20184E]/40 to-transparent" />

          {/* Floating Top Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold border border-white/30">
              Top Network Hub
            </span>
          </div>

          {/* Bottom Card Content */}
          <div className="relative z-10 p-5 text-white">
            <div className="flex items-end justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  Ananya Sharma
                </h3>
                <p className="text-xs text-purple-200 font-medium">
                  Senior AI Lead & Hub
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 text-right">
                <span className="text-xs font-mono font-bold text-white block">
                  0.94
                </span>
                <span className="text-[9px] text-purple-200 uppercase tracking-wider block">
                  Centrality
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Hiring / Interaction Progress with Bar Chart - lg:col-span-3 */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-[290px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Interaction Progress
              </span>
              <Link to="/network" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 font-mono">
                24
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Active ties today
              </span>
            </div>

            <div className="mt-0.5 text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span>↑ 20% vs last month</span>
            </div>
          </div>

          {/* Stylized Weekly Bar Chart matching the Peoplexio UI */}
          <div className="relative pt-4">
            {/* Peak floating badge */}
            <div className="absolute top-0 right-10 -translate-y-1">
              <span className="px-2 py-0.5 rounded-md bg-[#705CF6] text-white text-[10px] font-mono font-bold shadow-xs">
                24 Ties
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
              {[
                { day: 'S', height: 35, active: false },
                { day: 'M', height: 65, active: false },
                { day: 'T', height: 50, active: false },
                { day: 'W', height: 75, active: false },
                { day: 'T', height: 95, active: true },
                { day: 'F', height: 40, active: false },
                { day: 'S', height: 20, active: false }
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="w-full bg-slate-100 rounded-full h-full flex items-end">
                    <div
                      className={`w-full rounded-full transition-all duration-500 ${
                        bar.active
                          ? 'bg-[#705CF6] shadow-sm'
                          : 'bg-indigo-600/70 hover:bg-indigo-600'
                      }`}
                      style={{ height: `${bar.height}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Network Pulse / Time Tracker Gauge - lg:col-span-3 */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-[290px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">
              Live Network Pulse
            </span>
            <Link to="/network" className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative flex items-center justify-center my-auto py-2">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Dotted / Background Ring */}
              <circle
                cx="72"
                cy="72"
                r="56"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeDasharray="4 4"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="72"
                cy="72"
                r="56"
                stroke="#705CF6"
                strokeWidth="7"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * 0.35}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>

            {/* Center Time / Value */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-mono font-extrabold text-slate-900 tracking-tight">
                {formatTimer(secondsElapsed)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                Active Cycle
              </span>
            </div>
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pause tracker' : 'Resume tracker'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <span className="text-[11px] text-slate-500 font-medium">
                {isPlaying ? 'Live Streaming' : 'Paused'}
              </span>
            </div>

            <div className="p-1.5 rounded-full bg-purple-50 text-[#705CF6]">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Card 4: Interaction Channels & Review Checklist Header - lg:col-span-3 */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between h-[290px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Channel Density
              </span>
              <span className="text-xs font-mono font-extrabold text-slate-900">
                18%
              </span>
            </div>

            {/* Distribution Segmented Bar */}
            <div className="mt-3 flex items-center gap-1.5">
              <div className="flex-1 bg-[#705CF6] h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                Chat
              </div>
              <div className="flex-1 bg-[#282255] h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                Syncs
              </div>
              <div className="w-10 bg-slate-200 h-8 rounded-xl flex items-center justify-center text-slate-500 text-[11px] font-bold">
                Git
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>30% Direct</span>
              <span>25% Video</span>
              <span>0% Async</span>
            </div>
          </div>

          {/* Quick Anomaly Metric Preview */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  3 High Surges
                </span>
                <span className="text-[10px] text-slate-500">Requires review</span>
              </div>
            </div>
            <Link
              to="/anomalies"
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 shadow-2xs"
            >
              Review
            </Link>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: Left Panels + Center Calendar + Right Onboarding/Review Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (lg:col-span-3): Expandable Panels matching Pension/Devices in Peoplexio */}
        <div className="lg:col-span-3 space-y-3">
          
          {/* Accordion 1: Department Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <button
              onClick={() => toggleAccordion('departments')}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-900 text-left"
            >
              <span>Department Distribution</span>
              {openAccordion.departments ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordion.departments && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                {[
                  { name: 'AI Research', count: 68, color: 'bg-indigo-500' },
                  { name: 'Engineering', count: 74, color: 'bg-sky-500' },
                  { name: 'Data Science', count: 42, color: 'bg-purple-500' },
                  { name: 'Product & Design', count: 36, color: 'bg-pink-500' },
                  { name: 'Infrastructure', count: 28, color: 'bg-emerald-500' }
                ].map((dept, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${dept.color}`} />
                      <span className="text-slate-600">{dept.name}</span>
                    </div>
                    <span className="font-mono font-semibold text-slate-900">{dept.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Devices & Connectors (like the MacBook Air card in the screenshot) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <button
              onClick={() => toggleAccordion('devices')}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-900 text-left"
            >
              <span>Ingested Platforms</span>
              {openAccordion.devices ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {openAccordion.devices && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2.5">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        Slack Enterprise
                      </span>
                      <span className="text-[10px] text-slate-400">
                        18.4k messages/wk
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        GitHub Org Activity
                      </span>
                      <span className="text-[10px] text-slate-400">
                        940 PR reviews/wk
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Accordion 3: Quick Summary Items */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Topological Summary</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span>GNN Embeddings Cache</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Center Column (lg:col-span-6): Interactive Collaboration Calendar / Timeline matching the Peoplexio UI */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            {/* Calendar Navigation Header */}
            <div className="flex items-center justify-between mb-4">
              <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" />
                <span>August</span>
              </button>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#705CF6]" />
                <span className="text-sm font-extrabold text-slate-900">
                  September 2026
                </span>
              </div>

              <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
                <span>October</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Days of Week row */}
            <div className="grid grid-cols-6 gap-2 text-center text-xs pb-3 border-b border-slate-100">
              {[
                { day: 'Mon', num: 22, active: false },
                { day: 'Tue', num: 23, active: false },
                { day: 'Wed', num: 24, active: true },
                { day: 'Thu', num: 25, active: false },
                { day: 'Fri', num: 26, active: false },
                { day: 'Sat', num: 27, active: false }
              ].map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[11px] text-slate-400 font-medium">{d.day}</span>
                  <span
                    className={`mt-1 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      d.active
                        ? 'bg-[#302868] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d.num}
                  </span>
                </div>
              ))}
            </div>

            {/* Hourly schedule timeline with event cards */}
            <div className="relative mt-4 space-y-4 text-xs font-mono">
              
              {/* 09:00 am Row */}
              <div className="flex items-start gap-4">
                <span className="text-slate-400 text-[11px] w-16 shrink-0 pt-1">09:00 am</span>
                <div className="flex-1" />
              </div>

              {/* 10:00 am Row with Scheduled Event Card */}
              <div className="flex items-start gap-4">
                <span className="text-slate-400 text-[11px] w-16 shrink-0 pt-1">10:00 am</span>
                <div className="flex-1 -mt-4">
                  {/* Event Card: Weekly Team Sync (Lavender filled card like in reference) */}
                  <div className="p-3 rounded-2xl bg-[#ECE7FE] border border-purple-200/80 shadow-2xs text-slate-900 font-sans">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">
                        Weekly Graph Model Sync
                      </h4>
                      <div className="flex items-center -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          RS
                        </div>
                        <div className="w-5 h-5 rounded-full bg-purple-500 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          EC
                        </div>
                        <div className="w-5 h-5 rounded-full bg-slate-400 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          +2
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-purple-900/80 mt-0.5">
                      Discuss interaction graph topology & weight recalculation
                    </p>
                  </div>
                </div>
              </div>

              {/* 11:00 am Row */}
              <div className="flex items-start gap-4">
                <span className="text-slate-400 text-[11px] w-16 shrink-0 pt-1">11:00 am</span>
                <div className="flex-1" />
              </div>

              {/* 12:00 pm Row with Scheduled Event Card */}
              <div className="flex items-start gap-4">
                <span className="text-slate-400 text-[11px] w-16 shrink-0 pt-1">12:00 pm</span>
                <div className="flex-1 -mt-2">
                  {/* Event Card: Cross-Cluster Onboarding (Warm peach/amber card like in reference) */}
                  <div className="p-3 rounded-2xl bg-[#FFF5E6] border border-amber-200/80 shadow-2xs text-slate-900 font-sans ml-12">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">
                        Cross-Cluster Alignment
                      </h4>
                      <div className="flex items-center -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-amber-500 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          AS
                        </div>
                        <div className="w-5 h-5 rounded-full bg-rose-500 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          MD
                        </div>
                        <div className="w-5 h-5 rounded-full bg-slate-500 border border-white text-[9px] text-white font-bold flex items-center justify-center">
                          +3
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-amber-900/80 mt-0.5">
                      Analyze cross-functional collaboration between AI & Product
                    </p>
                  </div>
                </div>
              </div>

              {/* 01:00 pm Row */}
              <div className="flex items-start gap-4">
                <span className="text-slate-400 text-[11px] w-16 shrink-0 pt-1">01:00 pm</span>
                <div className="flex-1" />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Scheduled Sessions: <strong>4 this week</strong></span>
            <Link to="/network" className="text-[#705CF6] hover:underline font-semibold flex items-center gap-1">
              <span>View interaction network map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (lg:col-span-3): Onboarding Task / Anomaly Review Checklist (Dark card matching screenshot) */}
        <div className="lg:col-span-3 bg-[#241E47] text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white tracking-tight">
                Review Checklist
              </h3>
              <span className="text-sm font-mono font-bold text-purple-200">
                {completedCount}/{checklist.length}
              </span>
            </div>

            {/* Checklist items list */}
            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-purple-300 shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className={`text-xs font-semibold block truncate ${item.done ? 'line-through text-slate-400' : 'text-white'}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] text-purple-300/70 font-mono block">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <button className="shrink-0 text-purple-300 hover:text-white">
                    {item.done ? (
                      <div className="w-5 h-5 rounded-full bg-[#705CF6] flex items-center justify-center text-white">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-white/30" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-white/10 text-center">
            <Link
              to="/anomalies"
              className="text-xs font-semibold text-purple-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore all 17 pattern anomalies</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 3: Interactive Network Graph Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Live Employee Interaction Graph
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Interactive GNN Topology
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any employee node to open their full collaboration profile and pairwise ties.
            </p>
          </div>

          <Link
            to="/network"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            <span>Open Dedicated Graph Workspace</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Embedded React Flow Graph */}
        <GraphView
          initialNodes={graphData.nodes}
          initialEdges={graphData.edges}
          onNodeClick={(node) => {
            if (node?.id) navigate(`/employees/${node.id}`);
          }}
          height="460px"
        />
      </div>

    </div>
  );
}
