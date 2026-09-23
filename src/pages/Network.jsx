import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Maximize2,
  ExternalLink,
  Users,
  Share2,
  Activity,
  Layers,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GraphView from '../components/GraphView.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { fetchNetworkGraph } from '../api/interactions.js';
import { fetchEmployeeById } from '../api/employees.js';

export default function Network() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const querySelected = searchParams.get('selected');
  const [selectedNodeId, setSelectedNodeId] = useState(querySelected || null);
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);

  const [department, setDepartment] = useState('All');
  const [minWeight, setMinWeight] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');

  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  // Load graph data based on filters
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchNetworkGraph({
          department,
          minWeight,
          searchQuery
        });
        setGraphData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [department, minWeight, searchQuery]);

  // Load selected employee details when node selected
  useEffect(() => {
    async function loadEmployee() {
      if (selectedNodeId) {
        const details = await fetchEmployeeById(selectedNodeId);
        setSelectedEmployeeData(details);
      } else {
        setSelectedEmployeeData(null);
      }
    }
    loadEmployee();
  }, [selectedNodeId]);

  const handleNodeSelect = (nodeId, node) => {
    setSelectedNodeId(nodeId);
    if (nodeId) {
      setSearchParams({ selected: nodeId });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setDepartment('All');
    setMinWeight(0);
    setTimeRange('30d');
    setSearchQuery('');
    setSelectedNodeId(null);
    setSearchParams({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interaction Network"
        subtitle="Interactive Graph Neural Network topological workspace. Inspect pairwise interaction paths, clusters, and nodal centrality."
        actions={
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Graph</span>
          </button>
        }
      />

      {/* Filter and Control Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Employee search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter nodes by employee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Department Filter */}
          <div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="All">All Departments</option>
              <option value="AI Research">AI Research</option>
              <option value="Engineering">Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Product & Design">Product & Design</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="People & Ops">People & Ops</option>
            </select>
          </div>

          {/* Time range filter */}
          <div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="7d">Timeframe: 7 Days</option>
              <option value="30d">Timeframe: 30 Days</option>
              <option value="90d">Timeframe: 90 Days</option>
              <option value="1y">Timeframe: 1 Year</option>
            </select>
          </div>

          {/* Interaction Strength slider */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-[11px] font-semibold text-slate-600 whitespace-nowrap">
              Min Weight:
            </span>
            <input
              type="range"
              min="0"
              max="0.9"
              step="0.1"
              value={minWeight}
              onChange={(e) => setMinWeight(parseFloat(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-cyan-700 font-bold w-7 text-right">
              {minWeight > 0 ? minWeight.toFixed(1) : 'All'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace: Graph Canvas + Selected Employee Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Graph Canvas Column */}
        <div className={`transition-all duration-300 ${selectedNodeId ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-800">
                  Interactive Node Network
                </span>
                <span className="text-xs text-slate-400">
                  ({graphData.nodes.length} nodes active)
                </span>
              </div>

              <div className="text-[11px] text-slate-400">
                Click any node to inspect incident connections
              </div>
            </div>

            {loading ? (
              <LoadingState message="Rendering network graph layout..." rows={8} />
            ) : (
              <GraphView
                initialNodes={graphData.nodes}
                initialEdges={graphData.edges}
                selectedNodeId={selectedNodeId}
                onNodeSelect={handleNodeSelect}
                height="620px"
              />
            )}
          </div>
        </div>

        {/* Selected Employee Details Inspector Panel (Right side) */}
        {selectedNodeId && selectedEmployeeData && (
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-5 animate-in fade-in slide-in-from-right-3 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <EmployeeAvatar
                  name={selectedEmployeeData.employee.name}
                  department={selectedEmployeeData.employee.department}
                  size="md"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {selectedEmployeeData.employee.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedEmployeeData.employee.role}
                  </p>
                  <span className="inline-block text-[10px] font-mono text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded mt-0.5">
                    {selectedEmployeeData.employee.id} · {selectedEmployeeData.employee.department}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleNodeSelect(null)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
                aria-label="Close panel"
              >
                ✕
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Connections</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {selectedEmployeeData.employee.connections}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Interactions</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {selectedEmployeeData.employee.interactions}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-cyan-50/50 border border-cyan-100">
                <span className="text-[10px] text-cyan-600 block uppercase font-medium">Centrality</span>
                <span className="text-sm font-bold text-cyan-700 font-mono">
                  {selectedEmployeeData.employee.centrality.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Top Collaborators in Graph */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Top Collaborators</span>
                <span className="text-[10px] text-slate-400 font-normal">Connected Edges</span>
              </h4>

              <div className="space-y-2">
                {selectedEmployeeData.collaborators.slice(0, 4).map(collab => (
                  <div
                    key={collab.id}
                    onClick={() => handleNodeSelect(collab.id)}
                    className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-100 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <EmployeeAvatar name={collab.name} department={collab.department} size="xs" />
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block">
                          {collab.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {collab.interactions} interactions
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                onClick={() => navigate(`/employees/${selectedEmployeeData.employee.id}`)}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Open Full Interaction Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
