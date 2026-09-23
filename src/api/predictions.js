/**
 * Predictions API Service Layer
 */
import { predictionsData } from '../data/mockData.js';

export async function fetchPredictions({ minScore = 0.7, department = 'All' } = {}) {
  let list = [...predictionsData];

  if (minScore > 0) {
    list = list.filter(p => p.predictionScore >= minScore);
  }

  if (department && department !== 'All') {
    list = list.filter(p => p.departmentA === department || p.departmentB === department);
  }

  return {
    predictions: list,
    total: list.length,
    isModelConnected: false,
    disclaimer: "Demo predictions — GNN model not connected yet."
  };
}
