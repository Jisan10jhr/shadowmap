
import { useState } from "react";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type Topic = {
  title: string;
  explanation: string;
  privacyTip: string;
};

const topics: Record<string, Topic> = {
  you: {
    title: "Fictional identity",
    explanation:
      "This is the center of the demonstration. Other information categories connect to this fictional identity.",
    privacyTip:
      "Avoid sharing identifying details publicly unless you understand who can access them.",
  },
  social: {
    title: "Social activity",
    explanation:
      "Public posts, comments, and interactions may reveal interests, opinions, and parts of someone's routine.",
    privacyTip:
      "Review your audience settings and think before posting personal details.",
  },
  interests: {
    title: "Interests",
    explanation:
      "Publicly shared preferences, followed topics, and group memberships may reveal hobbies and personal interests.",
    privacyTip:
      "Consider which interests you want to share publicly and which you prefer to keep private.",
  },
  activities: {
    title: "Online activities",
    explanation:
      "Information about online participation and activities can sometimes reveal habits or patterns.",
    privacyTip:
      "Be cautious about publicly sharing schedules, travel plans, or repeated routines.",
  },
  public: {
    title: "Public information",
    explanation:
      "Information intentionally made public in different places may become easier to connect when viewed together.",
    privacyTip:
      "Check what personal information is publicly visible and remove details you no longer need to share.",
  },
};

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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    const topic = topics[node.id];

    if (topic) {
      setSelectedTopic(topic);
    }
  };

  return (
    <div>
      <div style={{ width: "100%", height: "480px" }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          onNodeClick={handleNodeClick}
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

      <div
        style={{
          marginTop: "18px",
          padding: "20px",
          border: "1px solid rgba(183, 162, 255, 0.25)",
          borderRadius: "14px",
          background: "rgba(34, 31, 69, 0.65)",
          color: "#f1efff",
        }}
        aria-live="polite"
      >
        {selectedTopic ? (
          <>
            <h3 style={{ color: "#c4b5fd", marginTop: 0 }}>
              {selectedTopic.title}
            </h3>
            <p style={{ color: "#b8b2d2", lineHeight: 1.7 }}>
              {selectedTopic.explanation}
            </p>
            <p style={{ color: "#f4b860", lineHeight: 1.7 }}>
              <strong>Privacy tip:</strong> {selectedTopic.privacyTip}
            </p>
          </>
        ) : (
          <p style={{ color: "#b8b2d2", margin: 0 }}>
            Select any graph node to learn what it represents and discover a
            practical privacy tip.
          </p>
        )}
      </div>
    </div>
  );
}

export default FootprintGraph;
