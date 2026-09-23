import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import EmployeeNode from './EmployeeNode.jsx';

const nodeTypes = {
  employeeNode: EmployeeNode
};

export default function GraphView({
  initialNodes = [],
  initialEdges = [],
  selectedNodeId = null,
  onNodeClick,
  onNodeSelect,
  showLabels = true,
  showWeights = true,
  className = '',
  height = '500px'
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state when props change
  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  React.useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  // Compute highlighted nodes and edges based on selectedNodeId
  const { styledNodes, styledEdges } = useMemo(() => {
    if (!selectedNodeId) {
      const normalEdges = edges.map(edge => ({
        ...edge,
        animated: false,
        label: showWeights && edge.data?.count ? `${edge.data.count} msgs` : undefined,
        labelStyle: { fontSize: 10, fill: '#475569', fontWeight: 600 },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9, rx: 4, stroke: '#e2e8f0' },
        style: { stroke: '#94a3b8', strokeWidth: 1.5, opacity: 0.75 },
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: '#94a3b8' }
      }));
      return { styledNodes: nodes, styledEdges: normalEdges };
    }

    const connectedNodeIds = new Set([selectedNodeId]);
    edges.forEach(e => {
      if (e.source === selectedNodeId) connectedNodeIds.add(e.target);
      if (e.target === selectedNodeId) connectedNodeIds.add(e.source);
    });

    const modifiedNodes = nodes.map(n => {
      const isSelected = n.id === selectedNodeId;
      const isConnected = connectedNodeIds.has(n.id);
      return {
        ...n,
        selected: isSelected,
        style: {
          opacity: isConnected ? 1 : 0.25,
          filter: isConnected ? 'none' : 'grayscale(60%)',
          transition: 'all 0.2s ease-in-out'
        }
      };
    });

    const modifiedEdges = edges.map(e => {
      const isIncident = e.source === selectedNodeId || e.target === selectedNodeId;
      return {
        ...e,
        animated: isIncident,
        label: showWeights && e.data?.count ? `${e.data.count} msgs` : undefined,
        labelStyle: {
          fontSize: 11,
          fill: isIncident ? '#0284c7' : '#94a3b8',
          fontWeight: isIncident ? 700 : 500
        },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.95, rx: 4, stroke: isIncident ? '#38bdf8' : '#e2e8f0' },
        style: {
          stroke: isIncident ? '#0284c7' : '#cbd5e1',
          strokeWidth: isIncident ? 2.5 : 1,
          opacity: isIncident ? 1 : 0.15,
          transition: 'all 0.2s ease-in-out'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 14,
          height: 14,
          color: isIncident ? '#0284c7' : '#cbd5e1'
        }
      };
    });

    return { styledNodes: modifiedNodes, styledEdges: modifiedEdges };
  }, [nodes, edges, selectedNodeId, showWeights]);

  const handleNodeClick = useCallback((event, node) => {
    if (onNodeSelect) {
      onNodeSelect(node.id === selectedNodeId ? null : node.id, node);
    }
    if (onNodeClick) {
      onNodeClick(node);
    }
  }, [onNodeClick, onNodeSelect, selectedNodeId]);

  return (
    <div style={{ height }} className={`w-full relative bg-slate-50/60 rounded-xl overflow-hidden border border-slate-200/80 ${className}`}>
      <ReactFlow
        nodes={styledNodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2.5}
        attributionPosition="bottom-right"
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="bg-white border border-slate-200 shadow-xs rounded-lg overflow-hidden m-3"
        />
        <MiniMap
          nodeStrokeWidth={2}
          nodeColor={(n) => n.data?.color || '#0284c7'}
          maskColor="rgba(241, 245, 249, 0.7)"
          className="bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-xs m-3"
          style={{ width: 110, height: 80 }}
        />
      </ReactFlow>
    </div>
  );
}
