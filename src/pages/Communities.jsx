import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Users,
  MessageSquare,
  Network,
  Info,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GraphView from '../components/GraphView.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { fetchCommunities } from '../api/communities.js';
import { fetchNetworkGraph } from '../api/interactions.js';

export default function Communities() {
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [commRes, graphRes] = await Promise.all([
          fetchCommunities(),
          fetchNetworkGraph()
        ]);
        setCommunities(commRes.communities);
        setSelectedCommunity(commRes.communities[0] || null);
        setGraphData(graphRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return <LoadingState message="Detecting functional organizational clusters..." rows={6} />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Communities"
        subtitle="Communities represent groups of employees with strong interaction patterns identified across topological graphs."
        badge={
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>Demo / Mock Data</span>
          </span>
        }
      />

      {/* Model Disclaimer Notice */}
      <div className="bg-sky-50/60 border border-sky-200/80 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-900 leading-relaxed">
          <strong className="font-semibold">Simulated Topological Grouping:</strong> These community boundaries represent Louvain modularity partitions on mock interaction logs. Once the GNN backend is active, real spectral clustering and unsupervised GraphSAGE embeddings will replace this demo layer.
        </div>
      </div>

      {/* Community Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {communities.map((comm) => {
          const isSelected = selectedCommunity?.id === comm.id;
          return (
            <div
              key={comm.id}
              onClick={() => setSelectedCommunity(comm)}
              className={`bg-white rounded-xl border p-5 shadow-xs cursor-pointer transition-all ${
                isSelected
                  ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  {comm.id}
                </span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: comm.color || '#0284c7' }}
                  title="Cluster Color"
                />
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-1">
                {comm.name}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {comm.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Employees</span>
                  <span className="font-mono font-bold text-slate-800">
                    {comm.employeesCount} members
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Interactions</span>
                  <span className="font-mono font-bold text-slate-800">
                    {comm.interactionsCount}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Avg Strength:</span>
                <span className="font-mono font-bold text-cyan-700">
                  {comm.avgConnectionStrength.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Graph Visualization */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-600" />
              <span>Multi-Community Graph Topology</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Nodes colored by detected functional community
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Selected Focus:</span>
            <span className="font-semibold text-slate-800">
              {selectedCommunity?.name || 'All'}
            </span>
          </div>
        </div>

        <GraphView
          initialNodes={graphData.nodes}
          initialEdges={graphData.edges}
          height="480px"
        />
      </div>
    </div>
  );
}
