"use client";
import React, { useMemo, useCallback } from "react";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
  Edge,
  Node,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

import { initialNodes, initialEdges } from "@/utils/graphInfo";
import { useIsModalOpenContext } from "@/contexts/IsModalOpenContext";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const nodeWidth = 182;
  const nodeHeight = 80;

  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

interface NodeData {
  label: string;
}

export default function Graph() {
  const { setIsPrincipalModalSectionOpen } = useIsModalOpenContext();

  const handleNodeClick = (nodeId: string) => {
    setIsPrincipalModalSectionOpen({ value: true, id: Number(nodeId) });
  };

  // Generate initial nodes and edges with layout
  const { nodes: initialLayoutedNodes, edges: initialLayoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    []
  );

  // State for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialLayoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialLayoutedEdges);

  const nodeTypes = useMemo(
    () => ({
      custom: ({ data, id }: { data: NodeData; id: string }) => {
        const hasIncoming = edges.some((edge) => edge.target === id);
        const hasOutgoing = edges.some((edge) => edge.source === id);

        return (
          <div
            className="p-4 bg-purpleLogo text-white rounded-lg flex flex-col text-center text-sm h-[62px] min-w-[200px] justify-center cursor-pointer transition ease-in-out duration-300 hover:bg-customPurpleBtn"
            onClick={() => handleNodeClick(id)}
          >
            {hasIncoming && (
              <Handle type="target" position={Position.Top} id="target" />
            )}
            {hasOutgoing && (
              <Handle type="source" position={Position.Bottom} id="source" />
            )}
            <strong>{data.label}</strong>
          </div>
        );
      },
    }),
    [edges]
  );

  const edgeStyles = {
    stroke: "var(--greenLogo)",
    strokeWidth: 5,
    markerEnd: "url(#arrow)",
    smoothness: 1,
    zIndex: 10,
  };

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, style: edgeStyles }, eds)),
    [setEdges]
  );

  return (
    <div className="w-[100vw] h-[calc(100vh-2.5rem)] lg:w-[76vw] text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
