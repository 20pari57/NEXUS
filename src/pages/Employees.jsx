import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Users
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import EmployeeAvatar from '../components/EmployeeAvatar.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import { fetchEmployees } from '../api/employees.js';

export default function Employees() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialSearch);
  const [department, setDepartment] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortBy, setSortBy] = useState('centrality');
  const [sortOrder, setSortOrder] = useState('desc');

  const [employees, setEmployees] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchEmployees({
          search,
          department,
          role: roleFilter === 'All' ? '' : roleFilter,
          sortBy,
          sortOrder
        });
        setEmployees(res.data);
        setDepartmentsList(res.departments);
        setCurrentPage(1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, department, roleFilter, sortBy, sortOrder]);

  // Handle URL query sync
  const handleSearchChange = (val) => {
    setSearch(val);
    if (val) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Pagination slicing
  const totalPages = Math.ceil(employees.length / pageSize) || 1;
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        subtitle="Explore employees and their interaction profiles, degree centrality, and organizational footprint."
      />

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, or title..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Departments</option>
              {departmentsList.filter(d => d !== 'All').map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Sort By Option */}
          <div className="relative">
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-');
                setSortBy(sb);
                setSortOrder(so);
              }}
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="centrality-desc">Highest Centrality</option>
              <option value="centrality-asc">Lowest Centrality</option>
              <option value="connections-desc">Most Connections</option>
              <option value="interactions-desc">Most Interactions</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>

          {/* Reset Filters */}
          {(search || department !== 'All' || roleFilter !== 'All') && (
            <div className="flex items-center">
              <button
                onClick={() => {
                  setSearch('');
                  setDepartment('All');
                  setRoleFilter('All');
                  setSearchParams({});
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold px-2 py-1.5"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Employees Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-6">
            <LoadingState message="Fetching organizational directory..." rows={6} />
          </div>
        ) : employees.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No matching employees found"
            description="No employee profiles match the current filter or search criteria. Try clearing the search or filters."
            actionText="Reset Filters"
            onAction={() => {
              setSearch('');
              setDepartment('All');
              setRoleFilter('All');
            }}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th
                      className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>Employee</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Role</th>
                    <th
                      className="py-3 px-4 text-right cursor-pointer hover:text-slate-800 transition-colors"
                      onClick={() => handleSort('connections')}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Connections</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-right cursor-pointer hover:text-slate-800 transition-colors"
                      onClick={() => handleSort('interactions')}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Interactions</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th
                      className="py-3 px-4 text-right cursor-pointer hover:text-slate-800 transition-colors"
                      onClick={() => handleSort('centrality')}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span>Centrality</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {paginatedEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      onClick={() => navigate(`/employees/${emp.id}`)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <EmployeeAvatar name={emp.name} department={emp.department} size="sm" />
                          <div>
                            <span className="font-semibold text-slate-900 block hover:text-cyan-600 transition-colors">
                              {emp.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono block">
                              {emp.id} · {emp.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {emp.role}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-800 font-semibold">
                        {emp.connections}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-800 font-semibold">
                        {emp.interactions}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-cyan-700 font-bold">
                        {emp.centrality.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <StatusBadge status={emp.status} label="Active" />
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium">
                          View <ExternalLink className="w-3 h-3 ml-1" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="p-4 border-t border-slate-200/80 flex items-center justify-between gap-2 text-xs text-slate-500">
              <span className="tabular-nums">
                Showing <strong className="text-slate-800">{(currentPage - 1) * pageSize + 1}</strong> to{' '}
                <strong className="text-slate-800">
                  {Math.min(currentPage * pageSize, employees.length)}
                </strong> of{' '}
                <strong className="text-slate-800">{employees.length}</strong> employees
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="px-2 font-mono tabular-nums text-slate-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
