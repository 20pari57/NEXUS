import React from 'react';
import {
  Sliders,
  Eye,
  Layout,
  Sun,
  Moon,
  Check,
  RotateCcw,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

export default function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Platform Settings"
        subtitle="Manage graph rendering preferences, analytics defaults, and display parameters."
        actions={
          <button
            onClick={resetSettings}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        }
      />

      {/* 1. Appearance Section */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sun className="w-4 h-4 text-cyan-600" />
            <span>Interface Appearance</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred visual mode for charts and canvases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div
            onClick={() => updateSetting('theme', 'light')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              settings.theme === 'light'
                ? 'border-cyan-500 bg-cyan-50/20 ring-1 ring-cyan-500/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Light Mode (Default)</span>
                <span className="text-[11px] text-slate-500">High-contrast white & slate</span>
              </div>
            </div>
            {settings.theme === 'light' && <Check className="w-4 h-4 text-cyan-600" />}
          </div>

          <div
            onClick={() => updateSetting('theme', 'dark')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              settings.theme === 'dark'
                ? 'border-cyan-500 bg-cyan-50/20 ring-1 ring-cyan-500/20'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">Dark Mode</span>
                <span className="text-[11px] text-slate-500">Reduced glare for nighttime</span>
              </div>
            </div>
            {settings.theme === 'dark' && <Check className="w-4 h-4 text-cyan-600" />}
          </div>
        </div>
      </div>

      {/* 2. Graph Preferences */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-600" />
            <span>Graph Canvas Preferences</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure React Flow nodal layout and edge physics behaviors.
          </p>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Show Employee Nodal Labels</span>
              <span className="text-slate-400">Display names and roles directly on topological graph nodes</span>
            </div>
            <button
              onClick={() => updateSetting('showEmployeeLabels', !settings.showEmployeeLabels)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                settings.showEmployeeLabels ? 'bg-cyan-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.showEmployeeLabels ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Show Interaction Weights on Edges</span>
              <span className="text-slate-400">Render message and meeting count badges on connecting edges</span>
            </div>
            <button
              onClick={() => updateSetting('showInteractionWeights', !settings.showInteractionWeights)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                settings.showInteractionWeights ? 'bg-cyan-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.showInteractionWeights ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800 block">Auto-Fit Graph Viewport</span>
              <span className="text-slate-400">Automatically bound and center nodes on initial graph render</span>
            </div>
            <button
              onClick={() => updateSetting('autoFitGraph', !settings.autoFitGraph)}
              className={`w-10 h-5 rounded-full transition-colors relative ${
                settings.autoFitGraph ? 'bg-cyan-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transition-transform absolute top-0.5 ${
                  settings.autoFitGraph ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Dashboard Preferences */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layout className="w-4 h-4 text-cyan-600" />
            <span>Dashboard Defaults</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Default initial time ranges and organizational views.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Default Time Range
            </label>
            <select
              value={settings.defaultTimeRange}
              onChange={(e) => updateSetting('defaultTimeRange', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days (Recommended)</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Past 1 Year</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">
              Default Department Filter
            </label>
            <select
              value={settings.defaultDepartment}
              onChange={(e) => updateSetting('defaultDepartment', e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Departments</option>
              <option value="AI Research">AI Research</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Product & Design">Product & Design</option>
            </select>
          </div>
        </div>
      </div>

      {/* 4. Backend & API Service Architecture Readiness */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-bold text-slate-900">
            GNN Backend & API Service Integration
          </h3>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          The frontend architecture is modular and API-ready. All endpoints in <code className="font-mono text-cyan-800 bg-cyan-50 px-1 py-0.5 rounded">src/api/</code> return standardized Promise payloads matching future FastAPI schemas for GCN/GraphSAGE models.
        </p>

        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
          <div><strong className="text-slate-900">Active Service Layer:</strong> Local In-Memory Mock Adapter</div>
          <div><strong className="text-slate-900">Future API Gateway:</strong> /api/v1/gnn/interactions</div>
          <div><strong className="text-slate-900">Target Pipeline:</strong> PostgreSQL &rarr; Graph Builder &rarr; PyTorch Geometric (GNN)</div>
        </div>
      </div>
    </div>
  );
}
