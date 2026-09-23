/**
 * Communities API Service Layer
 */
import { communitiesData } from '../data/mockData.js';

export async function fetchCommunities() {
  return {
    communities: communitiesData,
    totalCount: communitiesData.length,
    isMock: true,
    algorithm: 'Louvain Modularization / GNN Spectral Clustering (Simulated)'
  };
}
