import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import EmployeeAvatar from './EmployeeAvatar.jsx';

/**
 * Custom React Flow Node for Employee Nodes
 */
function EmployeeNode({ data, selected }) {
  const { name, role, department, centrality, connections, id } = data;

  return (
    <div
      className={`group relative min-w-[170px] max-w-[210px] bg-white rounded-xl border p-2.5 shadow-xs transition-all duration-200 cursor-pointer ${
        selected
          ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-md scale-105'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* React Flow Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-cyan-500 !border-white border-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-purple-500 !border-white border-2"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-2 h-2 !bg-slate-400 !border-white border-2"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-2 h-2 !bg-slate-400 !border-white border-2"
      />

      <div className="flex items-center gap-2">
        <EmployeeAvatar name={name} department={department} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs font-bold text-slate-900 truncate" title={name}>
              {name}
            </h4>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">
              {id}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 truncate" title={role}>
            {department}
          </p>
        </div>
      </div>

      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-600 tabular-nums">
        <span>
          <strong className="font-semibold text-slate-800">{connections}</strong> conn
        </span>
        <span className="text-cyan-700 font-semibold bg-cyan-50 px-1 rounded">
          {centrality ? centrality.toFixed(2) : '0.00'} c-score
        </span>
      </div>
    </div>
  );
}

export default memo(EmployeeNode);
