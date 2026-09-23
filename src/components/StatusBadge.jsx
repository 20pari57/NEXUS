import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function StatusBadge({ status = 'normal', label, className = '' }) {
  const norm = (status || '').toLowerCase();

  let config = {
    bg: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: Info,
    text: label || 'Normal'
  };

  if (norm.includes('high') || norm.includes('anomaly') || norm.includes('critical') || norm.includes('requires review')) {
    config = {
      bg: 'bg-rose-50 text-rose-700 border-rose-200/80',
      icon: AlertCircle,
      text: label || 'Anomaly'
    };
  } else if (norm.includes('medium') || norm.includes('warn') || norm.includes('in review')) {
    config = {
      bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
      icon: AlertTriangle,
      text: label || 'Review'
    };
  } else if (norm.includes('active') || norm.includes('normal') || norm.includes('success') || norm.includes('resolved')) {
    config = {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      icon: CheckCircle2,
      text: label || 'Active'
    };
  } else if (norm.includes('low') || norm.includes('dismissed') || norm.includes('info')) {
    config = {
      bg: 'bg-sky-50 text-sky-800 border-sky-200/80',
      icon: Info,
      text: label || 'Notice'
    };
  }

  const IconComponent = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.bg} ${className} whitespace-nowrap`}>
      <IconComponent className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{config.text}</span>
    </span>
  );
}
