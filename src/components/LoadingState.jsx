import React from 'react';

export default function LoadingState({ message = 'Loading organizational network data...', rows = 4 }) {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        <div className="space-y-2">
          <div className="h-4 w-40 bg-slate-200 rounded"></div>
          <div className="h-3 w-24 bg-slate-100 rounded"></div>
        </div>
      </div>

      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 rounded-lg w-full flex items-center px-4 justify-between">
            <div className="h-3 w-1/4 bg-slate-200 rounded"></div>
            <div className="h-3 w-1/6 bg-slate-200 rounded"></div>
            <div className="h-3 w-1/6 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-center text-slate-400 font-medium">
        {message}
      </p>
    </div>
  );
}
