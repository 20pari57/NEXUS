import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Share2,
  ArrowRight,
  Info,
  Sliders,
  ExternalLink,
  Users,
  CheckCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetchPredictions } from '../api/predictions.js';

export default function Predictions() {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);
  const [minScore, setMinScore] = useState(0.7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchPredictions({ minScore });
        setPredictions(res.predictions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [minScore]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interaction Predictions"
        subtitle="Potential future connections identified by the topological interaction model and link prediction scoring."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Demo Predictions</span>
          </span>
        }
      />

      {/* Prominent GNN Not Connected Notice */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 leading-relaxed">
          <strong className="font-semibold">Demo predictions — GNN model not connected yet.</strong>
          <span className="block mt-0.5 text-amber-900">
            These candidates simulate the output of link-prediction layers (e.g., Graph Autoencoders / GNN dot-product decoders). Real-time embeddings will be ingested once the FastAPI backend is operational.
          </span>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-700">
            Minimum Prediction Confidence:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={minScore}
              onChange={(e) => setMinScore(parseFloat(e.target.value))}
              className="accent-cyan-600 w-32 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-cyan-700 tabular-nums">
              {(minScore * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {predictions.length} candidate edges identified
        </div>
      </div>

      {/* Predictions Table / Cards */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-6">
            <LoadingState message="Calculating potential link embeddings..." rows={5} />
          </div>
        ) : predictions.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No prediction candidates match criteria"
            description="Lower the confidence score threshold to view lower-probability future connection candidates."
            actionText="Reset Confidence to 70%"
            onAction={() => setMinScore(0.7)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Candidate Pair</th>
                  <th className="py-3 px-4 text-center">Prediction Score</th>
                  <th className="py-3 px-4">Department Affinity</th>
                  <th className="py-3 px-4 text-center">Shared Connections</th>
                  <th className="py-3 px-4">Structural Rationale</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {predictions.map((pred) => (
                  <tr key={pred.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => navigate(`/employees/${pred.employeeAId}`)}
                          className="hover:underline cursor-pointer flex items-center gap-1.5"
                        >
                          <EmployeeAvatar name={pred.employeeAName} department={pred.departmentA} size="xs" />
                          <span className="font-semibold text-slate-900">{pred.employeeAName}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <div
                          onClick={() => navigate(`/employees/${pred.employeeBId}`)}
                          className="hover:underline cursor-pointer flex items-center gap-1.5"
                        >
                          <EmployeeAvatar name={pred.employeeBName} department={pred.departmentB} size="xs" />
                          <span className="font-semibold text-slate-900">{pred.employeeBName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono font-bold">
                        <span>{(pred.predictionScore * 100).toFixed(0)}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {pred.commonDepartment}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-bold text-slate-800">
                        {pred.sharedConnections} mutual
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-sm text-[11px] leading-relaxed">
                      {pred.rationale}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => navigate(`/network?selected=${pred.employeeAId}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-cyan-700 hover:text-cyan-900 hover:bg-cyan-50 rounded-lg transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Inspect in Graph</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
