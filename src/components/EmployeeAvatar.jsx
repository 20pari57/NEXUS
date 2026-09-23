import React from 'react';

const DEPARTMENT_COLORS = {
  'AI Research': 'from-sky-500 to-indigo-600 text-white',
  'Data Science': 'from-indigo-500 to-purple-600 text-white',
  'Engineering': 'from-cyan-500 to-blue-600 text-white',
  'Product & Design': 'from-purple-500 to-pink-600 text-white',
  'Infrastructure': 'from-teal-500 to-emerald-600 text-white',
  'People & Ops': 'from-amber-500 to-orange-600 text-white'
};

export default function EmployeeAvatar({ name = '', department = '', size = 'md', className = '' }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase() || 'E';

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs font-semibold',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-lg font-bold',
    xl: 'w-20 h-20 text-2xl font-bold'
  };

  const colorClass = DEPARTMENT_COLORS[department] || 'from-slate-600 to-slate-800 text-white';

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br ${colorClass} shadow-xs shrink-0 select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title={`${name} (${department || 'Employee'})`}
    >
      <span>{initials}</span>
    </div>
  );
}
