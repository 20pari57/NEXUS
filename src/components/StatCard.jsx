import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  period,
  subtitle,
  icon: Icon,
  accent = 'indigo',
  className = ''
}) {
  const isPositive = typeof change === 'string' && change.startsWith('+');
  const isNegative = typeof change === 'string' && change.startsWith('-');
  const isNeutral = !isPositive && !isNegative;

  return (
    <div className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:border-slate-300 transition-all ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-slate-500 tracking-tight uppercase">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border border-slate-100">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
          {value}
        </span>
        
        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold tabular-nums ${
              isPositive
                ? 'text-emerald-700'
                : isNegative
                ? 'text-rose-700'
                : 'text-slate-600'
            }`}
          >
            {isPositive && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5 shrink-0" />}
            {isNegative && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5 shrink-0" />}
            {isNeutral && <Minus className="w-3 h-3 mr-0.5 shrink-0" />}
            {change}
          </span>
        )}
      </div>

      {(subtitle || period) && (
        <div className="mt-1 text-xs text-slate-500 flex items-center gap-1 truncate">
          <span>{subtitle || period}</span>
          {subtitle && period && (
            <>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400">{period}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
