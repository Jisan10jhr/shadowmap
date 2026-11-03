
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "you",
    position: { x: 250, y: 160 },
    data: { label: "You (Fictional)" },
    style: {
      background: "#a78bfa",
      color: "#17132d",
      border: "2px solid #c4b5fd",
      borderRadius: "14px",
      padding: "14px",
      fontWeight: 700,
    },
  },
  {
    id: "social",
    position: { x: 60, y: 40 },
    data: { label: "Social activity" },
  },
  {
    id: "interests",
    position: { x: 450, y: 40 },
    data: { label: "Interests" },
  },
  {
    id: "activities",
    position: { x: 60, y: 300 },
    data: { label: "Online activities" },
  },
  {
    id: "public",
    position: { x: 450, y: 300 },
    data: { label: "Public information" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1", source: "you", target: "social", animated: true },
  { id: "e2", source: "you", target: "interests", animated: true },
  { id: "e3", source: "you", target: "activities", animated: true },
  { id: "e4", source: "you", target: "public", animated: true },
];

function FootprintGraph() {
  return (
    <div style={{ width: "100%", height: "480px" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        proOptions={{ hideAttribution: false }}
      >
        <Background color="#766b9e" gap={22} />
        <Controls />
        <MiniMap
          nodeColor="#a78bfa"
          maskColor="rgba(16, 16, 39, 0.65)"
        />
      </ReactFlow>
    </div>
  );
}

export default FootprintGraph;
