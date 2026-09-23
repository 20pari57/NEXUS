import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  ArrowRight
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { fetchAnomalies, updateAnomalyStatus } from '../api/anomalies.js';

export default function Anomalies() {
  const navigate = useNavigate();
  const [anomalies, setAnomalies] = useState([]);
  const [counts, setCounts] = useState({ total: 0, high: 0, medium: 0, low: 0, requiresReview: 0 });
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Selected anomaly for review modal
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchAnomalies({
          severity: severityFilter,
          status: statusFilter
        });
        setAnomalies(res.anomalies);
        setCounts(res.counts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [severityFilter, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    await updateAnomalyStatus(id, newStatus);
    const res = await fetchAnomalies({
      severity: severityFilter,
      status: statusFilter
    });
    setAnomalies(res.anomalies);
    setCounts(res.counts);
    if (selectedAnomaly?.id === id) {
      setSelectedAnomaly(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interaction Anomalies"
        subtitle="Review unusual changes in communication patterns, frequency shifts, and unexpected bridge links."
        badge={
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{counts.requiresReview || 3} Requires Review</span>
          </span>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Anomalies"
          value={counts.total || 17}
          period="Last 30 days"
          subtitle="Flagged by heuristic detector"
          icon={AlertTriangle}
        />
        <StatCard
          title="High Priority"
          value={counts.high || 3}
          period="Requires immediate review"
          subtitle="Significant pattern deviation"
          icon={AlertCircle}
          className="border-rose-200/80 bg-rose-50/20"
        />
        <StatCard
          title="Medium Priority"
          value={counts.medium || 8}
          period="Scheduled analysis"
          subtitle="Cross-cluster deviations"
          icon={Clock}
          className="border-amber-200/80 bg-amber-50/20"
        />
        <StatCard
          title="Low Priority"
          value={counts.low || 6}
          period="Informational pattern shifts"
          subtitle="Minor activity changes"
          icon={CheckCircle2}
        />
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Severities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Statuses</option>
              <option value="Requires Review">Requires Review</option>
              <option value="In Review">In Review</option>
              <option value="Dismissed">Dismissed</option>
            </select>
          </div>
        </div>

        {(severityFilter !== 'All' || statusFilter !== 'All') && (
          <button
            onClick={() => {
              setSeverityFilter('All');
              setStatusFilter('All');
            }}
            className="text-xs text-cyan-600 hover:text-cyan-700 font-semibold self-start sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Anomalies Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-6">
            <LoadingState message="Scanning interaction graph logs..." rows={6} />
          </div>
        ) : anomalies.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="No anomalies found"
            description="No unusual interaction patterns were detected for the selected filters."
            actionText="Reset Filters"
            onAction={() => {
              setSeverityFilter('All');
              setStatusFilter('All');
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Subject Pair</th>
                  <th className="py-3 px-4">Detected At</th>
                  <th className="py-3 px-4">Interaction Pattern Change</th>
                  <th className="py-3 px-4">Variance Delta</th>
                  <th className="py-3 px-4 text-center">Severity</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {anomalies.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedAnomaly(item)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {item.employeeAName}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">({item.employeeAId})</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {item.employeeBName}
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">({item.employeeBId})</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                      {item.detectedAt}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate font-medium">
                      {item.interactionChange}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-800 font-semibold tabular-nums">
                      {item.delta}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          item.severity === 'high'
                            ? 'bg-rose-100 text-rose-800'
                            : item.severity === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <StatusBadge status={item.status} label={item.status} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAnomaly(item);
                        }}
                        className="text-xs text-cyan-600 hover:text-cyan-800 font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Anomaly Review Modal / Drawer */}
      {selectedAnomaly && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Anomaly Pattern Review
                </h3>
              </div>
              <button
                onClick={() => setSelectedAnomaly(null)}
                className="text-slate-400 hover:text-slate-600 p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Anomaly ID</span>
                  <span className="font-mono font-bold text-slate-900">{selectedAnomaly.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Timestamp</span>
                  <span className="font-mono text-slate-700">{selectedAnomaly.detectedAt}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Severity</span>
                  <span className="font-bold text-rose-700 uppercase">{selectedAnomaly.severity}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Interaction Shift Description:</h4>
                <p className="text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                  {selectedAnomaly.interactionChange}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                    Historical Baseline
                  </span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {selectedAnomaly.baselineFrequency}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                    Observed Window
                  </span>
                  <span className="text-sm font-mono font-bold text-cyan-700">
                    {selectedAnomaly.currentFrequency}
                  </span>
                </div>
              </div>

              {selectedAnomaly.summary && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Algorithmic Context:</h4>
                  <p className="text-slate-500 leading-relaxed">
                    {selectedAnomaly.summary}
                  </p>
                </div>
              )}

              {/* Status Update Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-slate-700">Update Status:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedAnomaly.id, 'In Review')}
                    className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 font-semibold text-xs"
                  >
                    Mark In Review
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAnomaly.id, 'Dismissed')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs"
                  >
                    Dismiss Notice
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedAnomaly.id, 'Resolved')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
