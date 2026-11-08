
import { useCallback, useState } from "react";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeMouseHandler,
  type OnNodesChange,
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
      "The central identity in this demonstration. Other information categories connect to it.",
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
      "Publicly shared preferences and group memberships may reveal hobbies and personal interests.",
    privacyTip:
      "Consider which interests you want to share publicly.",
  },
  activities: {
    title: "Online activities",
    explanation:
      "Information about online participation can sometimes reveal habits or patterns.",
    privacyTip:
      "Be cautious about publicly sharing schedules, travel plans, or repeated routines.",
  },
  public: {
    title: "Public information",
    explanation:
      "Information made public in different places may become easier to connect when viewed together.",
    privacyTip:
      "Check what personal information is publicly visible and remove details you no longer need to share.",
  },
};

const categoryOptions = [
  { id: "social", label: "Social activity" },
  { id: "interests", label: "Interests" },
  { id: "activities", label: "Online activities" },
  { id: "public", label: "Public information" },
];

const initialNodes: Node[] = [
  {
    id: "you",
    position: { x: 250, y: 160 },
    data: { label: "Alex Morgan (Fictional) — Dhaka" },
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
  style: {
    background: "#30285a",
    color: "#f1efff",
    border: "1px solid #a78bfa",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: 600,
  },
},
  {
  id: "interests",
  position: { x: 450, y: 40 },
  data: { label: "Interests" },
  style: {
    background: "#30285a",
    color: "#f1efff",
    border: "1px solid #a78bfa",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: 600,
  },
},
  {
  id: "activities",
  position: { x: 60, y: 300 },
  data: { label: "Online activities" },
  style: {
    background: "#30285a",
    color: "#f1efff",
    border: "1px solid #a78bfa",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: 600,
  },
},
  {
  id: "public",
  position: { x: 450, y: 300 },
  data: { label: "Public information" },
  style: {
    background: "#30285a",
    color: "#f1efff",
    border: "1px solid #a78bfa",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: 600,
  },
},
];

const initialEdges: Edge[] = [
  { id: "e1", source: "you", target: "social", animated: true },
  { id: "e2", source: "you", target: "interests", animated: true },
  { id: "e3", source: "you", target: "activities", animated: true },
  { id: "e4", source: "you", target: "public", animated: true },
];

function FootprintGraph() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nextPosition, setNextPosition] = useState(0);
const [profileName, setProfileName] = useState("Alex Morgan");
  const [profileLocation, setProfileLocation] = useState("Dhaka");
  const [profileInterests, setProfileInterests] = useState<string[]>([]);
  const selectedTopic = selectedId
  ? topics[selectedId] ??
    (selectedId.startsWith("profile-interest-")
      ? {
          title: selectedId.replace("profile-interest-", ""),
          explanation:
            "This is an example of an interest that someone may reveal through their public profile or online activity.",
          privacyTip:
            "Think carefully about which personal preferences you want to make publicly visible.",
        }
      : null)
  : null;
  const selectedPatterns: string[] = [];

if (profileLocation.trim()) {
  selectedPatterns.push(
    `A shared location (${profileLocation}) may provide geographic context.`
  );
}

if (profileInterests.length > 0) {
  selectedPatterns.push(
    `Interests such as ${profileInterests.join(", ")} may reveal hobbies or preferences.`
  );
}

if (profileLocation.trim() && profileInterests.length > 0) {
  selectedPatterns.push(
    "Combined, these details may help others infer a person's lifestyle or routines. This is a possibility, not proof."
  );
}
const privacyInsights: string[] = [];

if (profileLocation.trim()) {
  privacyInsights.push(
    "Location exposure: A publicly shared location can provide geographic context. Avoid sharing your exact home address or daily whereabouts."
  );
}

if (profileInterests.length > 0) {
  privacyInsights.push(
    "Interest exposure: Shared interests can reveal hobbies and preferences. Review which details are visible to the public."
  );
}

if (profileLocation.trim() && profileInterests.length > 0) {
  privacyInsights.push(
    "Combined information: Separate details can become more revealing when viewed together. Share only what is necessary."
  );
}
  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((currentNodes) => applyNodeChanges(changes, currentNodes));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((currentEdges) => addEdge(connection, currentEdges));
  }, []);

  const handleNodeClick: NodeMouseHandler = (_event, node) => {
    setSelectedId(node.id);
  };

  const addCategory = (categoryId: string) => {
    const alreadyExists = nodes.some((node) => node.id === categoryId);

    if (alreadyExists) return;

    const topic = topics[categoryId];
    if (!topic) return;

    const label = categoryOptions.find(
      (option) => option.id === categoryId
    )?.label;

    if (!label) return;

    const newNode: Node = {
  id: categoryId,
  position: {
    x: 100 + (nextPosition % 2) * 300,
    y: 80 + Math.floor(nextPosition / 2) * 180,
  },
  data: { label },
  style: {
    background: "#30285a",
    color: "#f1efff",
    border: "1px solid #a78bfa",
    borderRadius: "12px",
    padding: "14px",
    fontWeight: 600,
  },
};

    const newEdge: Edge = {
      id: `you-${categoryId}`,
      source: "you",
      target: categoryId,
      animated: true,
    };

    setNodes((currentNodes) => [...currentNodes, newNode]);
    setEdges((currentEdges) => [...currentEdges, newEdge]);
    setNextPosition((position) => position + 1);
    setSelectedId(categoryId);
  };

 const removeSelected = () => {
  if (!selectedId || selectedId === "you") return;

  const idsToRemove = new Set([selectedId]);

 if (selectedId === "interests") {
  profileInterests.forEach((interest) => {
    idsToRemove.add(`profile-interest-${interest}`);
  });

  setProfileInterests([]);
}

  setNodes((currentNodes) =>
    currentNodes.filter((node) => !idsToRemove.has(node.id))
  );

  setEdges((currentEdges) =>
    currentEdges.filter(
      (edge) =>
        !idsToRemove.has(edge.source) &&
        !idsToRemove.has(edge.target)
    )
  );

  setSelectedId(null);
};
  const handleInterestChange = (interest: string, checked: boolean) => {
  const nextInterests = checked
    ? [...profileInterests, interest]
    : profileInterests.filter((item) => item !== interest);

  setProfileInterests(nextInterests);

  const interestNodes: Node[] = nextInterests.map((item, index) => ({
    id: `profile-interest-${item}`,
    position: { x: 650, y: 40 + index * 70 },
    data: { label: item },
    style: {
      background: "#30285a",
      color: "#f1efff",
      border: "1px solid #41d9f5",
      borderRadius: "12px",
      padding: "12px",
      fontWeight: 600,
    },
  }));

  setNodes((currentNodes) => [
    ...currentNodes.filter(
      (node) => !node.id.startsWith("profile-interest-")
    ),
    ...interestNodes,
  ]);

  setEdges((currentEdges) => [
    ...currentEdges.filter(
      (edge) =>
        !edge.source.startsWith("profile-interest-") &&
        !edge.target.startsWith("profile-interest-")
    ),
    ...nextInterests.map((item) => ({
      id: `interests-${item}`,
      source: "interests",
      target: `profile-interest-${item}`,
      animated: true,
    })),
  ]);
};
const resetDemo = () => {
  setNodes(initialNodes);
  setEdges(initialEdges);
  setSelectedId(null);
  setNextPosition(0);
  setProfileName("Alex Morgan");
  setProfileLocation("Dhaka");
  setProfileInterests([]);
};
  const selectedIsRemovable =
    selectedId !== null && selectedId !== "you";

 return (
  <div>
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid rgba(183, 162, 255, 0.25)",
        borderRadius: "14px",
        background: "rgba(34, 31, 69, 0.65)",
      }}
    >
      <h3 style={{ color: "#c4b5fd", marginTop: 0 }}>
        Create a fictional profile
      </h3>

      <label
        htmlFor="profile-name"
        style={{ display: "block", color: "#f1efff", marginBottom: "8px" }}
      >
        Fictional profile name
      </label>

      <input
        id="profile-name"
        type="text"
        value={profileName}
        onChange={(event) => {
  const value = event.target.value;
  setProfileName(value);

  setNodes((currentNodes) =>
    currentNodes.map((node) =>
      node.id === "you"
        ? {
            ...node,
            data: {
              ...node.data,
              label: `${value.trim() || "You"} (Fictional) — ${profileLocation.trim() || "Location not set"}`,
            },
          }
        : node
    )
  );
}}
        placeholder="Enter a fictional name"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          borderRadius: "9px",
          border: "1px solid #a78bfa",
          background: "#201b40",
          color: "#f1efff",
          boxSizing: "border-box",
        }}
      />
            <label
        htmlFor="profile-location"
        style={{
          display: "block",
          color: "#f1efff",
          marginTop: "16px",
          marginBottom: "8px",
        }}
      >
        Fictional location
      </label>

      <input
        id="profile-location"
        type="text"
        value={profileLocation}
        onChange={(event) => {
  const value = event.target.value;
  setProfileLocation(value);

  setNodes((currentNodes) =>
    currentNodes.map((node) =>
      node.id === "you"
        ? {
            ...node,
            data: {
              ...node.data,
              label: `${profileName.trim() || "You"} (Fictional) — ${value.trim() || "Location not set"}`,
            },
          }
        : node
    )
  );
}}
        placeholder="Enter a fictional location"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px",
          borderRadius: "9px",
          border: "1px solid #a78bfa",
          background: "#201b40",
          color: "#f1efff",
          boxSizing: "border-box",
        }}
      />
            <h4 style={{ color: "#c4b5fd", marginBottom: "10px" }}>
        Fictional interests
      </h4>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {["Technology", "Gaming", "Music", "Sports", "Travel", "Photography"].map(
          (interest) => (
            <label
              key={interest}
              style={{ color: "#f1efff", display: "flex", gap: "6px" }}
            >
              <input
                type="checkbox"
                checked={profileInterests.includes(interest)}
               onChange={(event) => {
  handleInterestChange(interest, event.target.checked);
}}
              />
              {interest}
            </label>
          )
        )}
      </div>
      <p style={{ color: "#c4b5fd", marginTop: "12px" }}>
  Selected interests:{" "}
  {profileInterests.length > 0
    ? profileInterests.join(", ")
    : "None selected"}
</p>
    </div>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "16px",
      }}
    >
        {categoryOptions.map((option) => {
          const exists = nodes.some((node) => node.id === option.id);

          return (
            <button
              key={option.id}
              type="button"
              disabled={exists}
              onClick={() => addCategory(option.id)}
              style={{
                padding: "10px 14px",
                border: "1px solid rgba(183, 162, 255, 0.35)",
                borderRadius: "10px",
                color: exists ? "#8984a8" : "#f1efff",
                background: exists
                  ? "rgba(80, 75, 110, 0.35)"
                  : "rgba(114, 87, 216, 0.7)",
                cursor: exists ? "not-allowed" : "pointer",
                opacity: exists ? 0.6 : 1,
              }}
            >
              {exists ? "Added: " : "+ Add: "}
              {option.label}
            </button>
          );
        })}
      </div>

      <div style={{ width: "100%", height: "480px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
         onEdgesChange={(changes) =>
  setEdges((currentEdges) =>
    applyEdgeChanges(changes, currentEdges)
  )
}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
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
  position="bottom-center"
  style={{
    width: 150,
    height: 90,
  }}
/>
        </ReactFlow>
      </div>
<div
  style={{
    marginTop: "20px",
    padding: "20px",
    border: "1px solid rgba(65, 217, 245, 0.3)",
    borderRadius: "14px",
    background: "rgba(34, 31, 69, 0.65)",
    color: "#f1efff",
  }}
>
  <h3 style={{ color: "#41d9f5", marginTop: 0 }}>
    Pattern Connections
  </h3>

  {selectedPatterns.length > 0 ? (
    <ul style={{ lineHeight: 1.8, paddingLeft: "20px" }}>
      {selectedPatterns.map((pattern, index) => (
        <li key={index}>{pattern}</li>
      ))}
    </ul>
  ) : (
    <p style={{ color: "#b8b2d2" }}>
      Add fictional profile details to explore possible information patterns.
    </p>
  )}
</div>
          <div
        style={{
          marginTop: "20px",
          padding: "20px",
          border: "1px solid rgba(244, 184, 96, 0.3)",
          borderRadius: "14px",
          background: "rgba(34, 31, 69, 0.65)",
          color: "#f1efff",
        }}
      >
        <h3 style={{ color: "#f4b860", marginTop: 0 }}>
          Privacy Risk Insights
        </h3>

        {privacyInsights.length > 0 ? (
          <ul style={{ lineHeight: 1.8, paddingLeft: "20px" }}>
            {privacyInsights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#b8b2d2" }}>
            Add fictional profile details to explore potential privacy risks.
          </p>
        )}

        <p style={{ color: "#b8b2d2", fontSize: "13px", marginBottom: 0 }}>
          These are educational indicators, not a real security assessment.
        </p>
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
            Select a node to explore its meaning and privacy implications.
          </p>
        )}

        <button
          type="button"
          onClick={removeSelected}
          disabled={!selectedIsRemovable}
          style={{
            marginTop: "10px",
            padding: "10px 15px",
            border: "1px solid rgba(255, 130, 150, 0.35)",
            borderRadius: "9px",
            color: selectedIsRemovable ? "#ffd5df" : "#8984a8",
            background: "rgba(180, 60, 90, 0.25)",
            cursor: selectedIsRemovable ? "pointer" : "not-allowed",
            opacity: selectedIsRemovable ? 1 : 0.5,
          }}
        >
          Remove selected category
        </button>
                <button
          type="button"
          onClick={resetDemo}
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}

export default FootprintGraph;

