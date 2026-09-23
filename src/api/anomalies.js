/**
 * Anomalies API Service Layer
 */
import { anomaliesData } from '../data/mockData.js';

let currentAnomalies = [...anomaliesData];

export async function fetchAnomalies({ severity = 'All', status = 'All', department = 'All' } = {}) {
  let list = [...currentAnomalies];

  if (severity && severity !== 'All') {
    list = list.filter(a => a.severity.toLowerCase() === severity.toLowerCase());
  }

  if (status && status !== 'All') {
    list = list.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }

  if (department && department !== 'All') {
    list = list.filter(a => a.departmentA === department || a.departmentB === department);
  }

  const counts = {
    total: currentAnomalies.length,
    high: currentAnomalies.filter(a => a.severity === 'high').length,
    medium: currentAnomalies.filter(a => a.severity === 'medium').length,
    low: currentAnomalies.filter(a => a.severity === 'low').length,
    requiresReview: currentAnomalies.filter(a => a.status === 'Requires Review').length
  };

  return { anomalies: list, counts };
}

export async function updateAnomalyStatus(id, newStatus) {
  currentAnomalies = currentAnomalies.map(a => a.id === id ? { ...a, status: newStatus } : a);
  return { success: true, id, status: newStatus };
}
