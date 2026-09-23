/**
 * Interactions & Network Graph API Service Layer
 */
import { dashboardMetrics, interactionTrendsByPeriod, networkNodes, networkEdges } from '../data/mockData.js';

export async function fetchDashboardMetrics() {
  return dashboardMetrics;
}

export async function fetchInteractionTrends(period = '7d') {
  return interactionTrendsByPeriod[period] || interactionTrendsByPeriod['7d'];
}

export async function fetchNetworkGraph({ department = 'All', minWeight = 0, searchQuery = '' } = {}) {
  let nodes = [...networkNodes];
  let edges = [...networkEdges];

  if (department && department !== 'All') {
    const validNodeIds = new Set(nodes.filter(n => n.data.department === department).map(n => n.id));
    nodes = nodes.filter(n => validNodeIds.has(n.id));
    edges = edges.filter(e => validNodeIds.has(e.source) && validNodeIds.has(e.target));
  }

  if (minWeight > 0) {
    edges = edges.filter(e => (e.data?.weight || 0) >= minWeight);
    const connectedNodeIds = new Set();
    edges.forEach(e => {
      connectedNodeIds.add(e.source);
      connectedNodeIds.add(e.target);
    });
    // Keep nodes that still have connections or match query
    nodes = nodes.filter(n => connectedNodeIds.has(n.id));
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    nodes = nodes.map(node => ({
      ...node,
      selected: node.data.name.toLowerCase().includes(q) || node.id.toLowerCase().includes(q)
    }));
  }

  return { nodes, edges };
}
