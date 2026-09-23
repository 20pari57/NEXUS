import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Layers,
  AlertTriangle,
  ArrowRight,
  X,
  CornerDownLeft,
  Sparkles,
  Command
} from 'lucide-react';
import { employeesData, communitiesData, anomaliesData } from '../data/mockData.js';
import EmployeeAvatar from './EmployeeAvatar.jsx';

export default function GlobalSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // If not open, parent will handle open, but this is handled globally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search filtering logic
  const trimmed = query.trim().toLowerCase();

  const filteredEmployees = employeesData.filter(emp => {
    if (!trimmed) return true;
    return (
      emp.name.toLowerCase().includes(trimmed) ||
      emp.id.toLowerCase().includes(trimmed) ||
      emp.role.toLowerCase().includes(trimmed) ||
      emp.department.toLowerCase().includes(trimmed) ||
      emp.email.toLowerCase().includes(trimmed)
    );
  }).slice(0, 5);

  const filteredCommunities = communitiesData.filter(comm => {
    if (!trimmed) return true;
    return (
      comm.name.toLowerCase().includes(trimmed) ||
      comm.id.toLowerCase().includes(trimmed) ||
      comm.description.toLowerCase().includes(trimmed) ||
      comm.topDepartments.some(d => d.toLowerCase().includes(trimmed))
    );
  }).slice(0, 4);

  const filteredAnomalies = anomaliesData.filter(ano => {
    if (!trimmed) return true;
    return (
      ano.id.toLowerCase().includes(trimmed) ||
      ano.employeeAName.toLowerCase().includes(trimmed) ||
      ano.employeeBName.toLowerCase().includes(trimmed) ||
      ano.employeeAId.toLowerCase().includes(trimmed) ||
      ano.employeeBId.toLowerCase().includes(trimmed) ||
      ano.interactionChange.toLowerCase().includes(trimmed) ||
      ano.severity.toLowerCase().includes(trimmed)
    );
  }).slice(0, 4);

  // Compile combined results list for keyboard navigation
  const results = [];
  if (activeCategory === 'all' || activeCategory === 'employees') {
    filteredEmployees.forEach(item => results.push({ type: 'employee', data: item, key: `emp-${item.id}` }));
  }
  if (activeCategory === 'all' || activeCategory === 'communities') {
    filteredCommunities.forEach(item => results.push({ type: 'community', data: item, key: `comm-${item.id}` }));
  }
  if (activeCategory === 'all' || activeCategory === 'anomalies') {
    filteredAnomalies.forEach(item => results.push({ type: 'anomaly', data: item, key: `ano-${item.id}` }));
  }

  const handleSelect = (item) => {
    onClose();
    if (item.type === 'employee') {
      navigate(`/employees/${item.data.id}`);
    } else if (item.type === 'community') {
      navigate('/communities');
    } else if (item.type === 'anomaly') {
      navigate('/anomalies');
    }
  };

  const handleKeyDownInInput = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (results.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % (results.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-indigo-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search employees (e.g. Rahul, E001), communities (comm-01), or anomalies (ano-101)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInInput}
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono font-medium px-2 py-1 rounded-md bg-slate-200/70 text-slate-600 hover:bg-slate-300"
          >
            ESC
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'All Results', count: results.length },
            { id: 'employees', label: 'Employees', count: filteredEmployees.length },
            { id: 'communities', label: 'Communities', count: filteredCommunities.length },
            { id: 'anomalies', label: 'Anomalies', count: filteredAnomalies.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                activeCategory === tab.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-slate-100">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-600">No records found matching "{query}"</p>
              <p className="mt-1">Try searching with an ID like E001, comm-01, or ano-101</p>
            </div>
          ) : (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;

              if (item.type === 'employee') {
                const emp = item.data;
                return (
                  <div
                    key={item.key}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-indigo-50/80 border border-indigo-200/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <EmployeeAvatar name={emp.name} department={emp.department} size="sm" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {emp.name}
                          </span>
                          <span className="text-[10px] font-mono text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.2 rounded font-semibold">
                            {emp.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {emp.role} · {emp.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 tabular-nums">
                        {emp.connections} conn · {emp.centrality.toFixed(2)} c-score
                      </span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              }

              if (item.type === 'community') {
                const comm = item.data;
                return (
                  <div
                    key={item.key}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-indigo-50/80 border border-indigo-200/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {comm.name}
                          </span>
                          <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded font-semibold">
                            {comm.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {comm.employeesCount} members · {comm.interactionsCount} interactions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500">
                        {comm.topDepartments.join(', ')}
                      </span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              }

              if (item.type === 'anomaly') {
                const ano = item.data;
                return (
                  <div
                    key={item.key}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isSelected ? 'bg-rose-50/80 border border-rose-200/80' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {ano.employeeAName} & {ano.employeeBName}
                          </span>
                          <span className="text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded font-semibold">
                            {ano.id}
                          </span>
                          <span className="text-[10px] font-bold uppercase px-1.5 rounded bg-amber-100 text-amber-800">
                            {ano.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {ano.interactionChange}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400">
                        {ano.detectedAt}
                      </span>
                      <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-600' : 'text-slate-300'}`} />
                    </div>
                  </div>
                );
              }

              return null;
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Use <strong className="text-slate-600">↑</strong> <strong className="text-slate-600">↓</strong> to navigate</span>
            <span>·</span>
            <span><strong className="text-slate-600">Enter</strong> to open</span>
            <span>·</span>
            <span><strong className="text-slate-600">ESC</strong> to exit</span>
          </div>
          <span className="font-mono text-[10px]">NEXUS Unified Graph Index</span>
        </div>
      </div>
    </div>
  );
}
