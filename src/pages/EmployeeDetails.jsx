import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  TrendingUp,
  Users,
  FolderGit2,
  Activity,
  Calendar,
  Mail,
  Shield,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import GraphView from '../components/GraphView.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { fetchEmployeeById } from '../api/employees.js';
import { fetchNetworkGraph } from '../api/interactions.js';

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [localGraph, setLocalGraph] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const empDetails = await fetchEmployeeById(id);
        const fullGraph = await fetchNetworkGraph();

        // Build 1-hop local neighborhood graph around this employee
        const targetId = empDetails.employee.id;
        const incidentEdges = fullGraph.edges.filter(
          e => e.source === targetId || e.target === targetId
        );
        const neighborIds = new Set([targetId]);
        incidentEdges.forEach(e => {
          neighborIds.add(e.source);
          neighborIds.add(e.target);
        });

        const neighborhoodNodes = fullGraph.nodes.filter(n => neighborIds.has(n.id));

        setData(empDetails);
        setLocalGraph({ nodes: neighborhoodNodes, edges: incidentEdges });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading || !data) {
    return <LoadingState message="Loading employee interaction profile..." rows={6} />;
  }

  const { employee, collaborators, activityHistory } = data;

  return (
    <div className="space-y-6">
      {/* Back button & Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('/employees')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Employee Directory</span>
        </button>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <EmployeeAvatar
              name={employee.name}
              department={employee.department}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {employee.name}
                </h1>
                <StatusBadge status={employee.status} label="Active Member" />
                <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 border border-cyan-200/60 px-2 py-0.5 rounded-md">
                  {employee.id}
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                <span className="font-semibold text-slate-800">{employee.role}</span>
                <span className="text-slate-300">·</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                  {employee.department}
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{employee.email}</span>
                </span>
              </div>

              {employee.bio && (
                <p className="mt-2.5 text-xs text-slate-500 max-w-2xl leading-relaxed">
                  {employee.bio}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <Link
              to={`/network?selected=${employee.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Explore in Network</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards: Connections, Interactions, Projects, Centrality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Direct Connections"
          value={employee.connections}
          change="+3 new"
          period="Last 30 days"
          subtitle="Unique 1-hop network edges"
          icon={Users}
        />
        <StatCard
          title="Total Interactions"
          value={employee.interactions}
          change="+12.4%"
          period="Monthly frequency"
          subtitle="Messages, threads & events"
          icon={Activity}
        />
        <StatCard
          title="Active Projects"
          value={employee.projects || 4}
          period="Across 2 departments"
          subtitle="Cross-functional initiatives"
          icon={FolderGit2}
        />
        <StatCard
          title="Centrality Score"
          value={employee.centrality.toFixed(2)}
          period="Top 5% organizational hub"
          subtitle="Eigenvector centrality index"
          icon={Shield}
          className="border-cyan-200/80 bg-cyan-50/20"
        />
      </div>

      {/* Section: Local Interaction Network using React Flow */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-600" />
              <span>Local Interaction Network (1-Hop Subgraph)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct communication channels and collaborators centered around {employee.name}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {localGraph.nodes.length} nodes · {localGraph.edges.length} edges
          </span>
        </div>

        <GraphView
          initialNodes={localGraph.nodes}
          initialEdges={localGraph.edges}
          selectedNodeId={employee.id}
          onNodeClick={(node) => {
            if (node.id !== employee.id) {
              navigate(`/employees/${node.id}`);
            }
          }}
          height="400px"
        />
      </div>

      {/* Section Grid: Interaction Activity & Interaction Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interaction Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
                <span>Interaction Activity Trend</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Weekly communication events profile
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Past 5 Days</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val} interactions`, 'Activity']}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#0284c7', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#00C6FF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interaction Summary Box */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Interaction Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              Directional flow of communication
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-emerald-100 text-emerald-700">
                    <ArrowDownLeft className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Incoming Interactions
                    </span>
                    <span className="text-[10px] text-slate-400">Direct inquiries & requests</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                  {employee.incoming || Math.round(employee.interactions * 0.55)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-sky-100 text-sky-700">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Outgoing Interactions
                    </span>
                    <span className="text-[10px] text-slate-400">Broadcasts & answers</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                  {employee.outgoing || Math.round(employee.interactions * 0.45)}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-purple-100 text-purple-700">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">
                      Unique Collaborators
                    </span>
                    <span className="text-[10px] text-slate-400">Distinct communication peers</span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-slate-900 tabular-nums">
                  {employee.uniqueCollaborators || employee.connections}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono text-center">
            Last logged interaction: 2 hours ago
          </div>
        </div>
      </div>

      {/* Section: Top Collaborators Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Top Collaborators
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Strongest pairwise tie strength and recurring collaboration partners
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-4">Collaborator</th>
                <th className="py-2.5 px-4">Department</th>
                <th className="py-2.5 px-4 text-right">Interactions</th>
                <th className="py-2.5 px-4">Last Interaction</th>
                <th className="py-2.5 px-4 text-right">Relationship Strength</th>
                <th className="py-2.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-normal">
              {collaborators.map((collab) => (
                <tr
                  key={collab.id}
                  onClick={() => navigate(`/employees/${collab.id}`)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <EmployeeAvatar name={collab.name} department={collab.department} size="sm" />
                      <div>
                        <span className="font-semibold text-slate-900 block hover:text-cyan-600 transition-colors">
                          {collab.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {collab.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {collab.department || 'AI Research'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 font-medium">
                    {collab.interactions}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {collab.lastInteraction}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-cyan-600 h-1.5 rounded-full"
                          style={{ width: `${(collab.strength || 0.75) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-slate-800 text-[11px]">
                        {((collab.strength || 0.75) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium">
                      View Profile <ExternalLink className="w-3 h-3 ml-1" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
