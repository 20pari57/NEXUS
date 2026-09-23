/**
 * Employees API Service Layer
 * Simulates async backend requests; ready for FastAPI / GraphQL backend.
 */
import { employeesData, topConnectedEmployees, collaboratorsMap } from '../data/mockData.js';

export async function fetchEmployees({ search = '', department = '', role = '', sortBy = 'centrality', sortOrder = 'desc' } = {}) {
  let filtered = [...employeesData];

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(emp => 
      emp.name.toLowerCase().includes(q) || 
      emp.id.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q)
    );
  }

  if (department && department !== 'All') {
    filtered = filtered.filter(emp => emp.department === department);
  }

  if (role && role !== 'All') {
    filtered = filtered.filter(emp => emp.role.toLowerCase().includes(role.toLowerCase()));
  }

  filtered.sort((a, b) => {
    const valA = a[sortBy] ?? 0;
    const valB = b[sortBy] ?? 0;
    if (typeof valA === 'string') {
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return sortOrder === 'asc' ? valA - valB : valB - valA;
  });

  return {
    data: filtered,
    total: filtered.length,
    departments: ['All', 'AI Research', 'Engineering', 'Data Science', 'Product & Design', 'Infrastructure', 'People & Ops']
  };
}

export async function fetchEmployeeById(id) {
  const employee = employeesData.find(e => e.id === id) || employeesData[0];
  const collaborators = collaboratorsMap[id] || [
    { id: 'E001', name: 'Rahul Sharma', interactions: 62, lastInteraction: '1 day ago', strength: 0.81, department: 'AI Research' },
    { id: 'E003', name: 'Marcus Vance', interactions: 45, lastInteraction: '3 days ago', strength: 0.72, department: 'Engineering' }
  ];

  return {
    employee,
    collaborators,
    activityHistory: [
      { date: 'Mon', count: Math.round(employee.interactions * 0.18) },
      { date: 'Tue', count: Math.round(employee.interactions * 0.22) },
      { date: 'Wed', count: Math.round(employee.interactions * 0.28) },
      { date: 'Thu', count: Math.round(employee.interactions * 0.20) },
      { date: 'Fri', count: Math.round(employee.interactions * 0.12) }
    ]
  };
}

export async function fetchTopConnectedEmployees() {
  return topConnectedEmployees;
}
