import React, { useState, useRef, useEffect } from 'react';
import { Plus, Edit3, Trash2, Move } from 'lucide-react';

const ConceptMap = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 400, y: 80, text: 'AI Coaching UI System', type: 'main', color: '#3B82F6' },
    { id: 2, x: 200, y: 180, text: 'Aim Analysis', type: 'category', color: '#EF4444' },
    { id: 3, x: 450, y: 180, text: 'Strategic Analysis', type: 'category', color: '#10B981' },
    { id: 24, x: 700, y: 180, text: 'Personal Growth Profile', type: 'category', color: '#F59E0B' },
    { id: 5, x: 150, y: 280, text: 'Live Feed Analysis', type: 'input', color: '#8B5CF6' },
    { id: 6, x: 300, y: 280, text: 'Clip Analysis', type: 'input', color: '#8B5CF6' },
    { id: 7, x: 500, y: 280, text: 'Dashboard Overview', type: 'ui', color: '#06B6D4' },
    { id: 9, x: 100, y: 380, text: 'Crosshair Placement', type: 'feature', color: '#EC4899' },
    { id: 10, x: 200, y: 380, text: 'Tracking Accuracy', type: 'feature', color: '#EC4899' },
    { id: 22, x: 300, y: 380, text: 'Reaction Time', type: 'feature', color: '#EC4899' },
    { id: 11, x: 400, y: 380, text: 'Positioning', type: 'feature', color: '#84CC16' },
    { id: 12, x: 500, y: 380, text: 'Team Coordination', type: 'feature', color: '#84CC16' },
    { id: 23, x: 600, y: 380, text: 'Ultimate Usage', type: 'feature', color: '#84CC16' },
    { id: 25, x: 700, y: 380, text: 'Skill Progression', type: 'feature', color: '#F97316' },
    { id: 26, x: 800, y: 380, text: 'Goal Setting', type: 'feature', color: '#F97316' },
    { id: 27, x: 750, y: 320, text: 'Performance Trends', type: 'feature', color: '#F97316' },
    { id: 15, x: 200, y: 480, text: 'Between Rounds', type: 'timing', color: '#6366F1' },
    { id: 16, x: 450, y: 480, text: 'Between Games', type: 'timing', color: '#6366F1' },
    { id: 28, x: 700, y: 480, text: 'Weekly Review', type: 'timing', color: '#6366F1' },
    { id: 17, x: 100, y: 580, text: 'Video Playback', type: 'element', color: '#14B8A6' },
    { id: 18, x: 250, y: 580, text: 'Priority Alerts', type: 'element', color: '#14B8A6' },
    { id: 19, x: 400, y: 580, text: 'Progress Tracking', type: 'element', color: '#14B8A6' },
    { id: 20, x: 550, y: 580, text: 'Action Items', type: 'element', color: '#14B8A6' },
    { id: 29, x: 700, y: 580, text: 'Growth Dashboard', type: 'element', color: '#14B8A6' },
    { id: 30, x: 850, y: 580, text: 'Achievement System', type: 'element', color: '#14B8A6' }
  ]);

  const [connections, setConnections] = useState([
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 24 },
    { from: 2, to: 5 }, { from: 2, to: 6 }, { from: 3, to: 5 }, { from: 3, to: 6 },
    { from: 24, to: 5 }, { from: 24, to: 6 },
    { from: 2, to: 7 }, { from: 3, to: 7 }, { from: 24, to: 7 },
    { from: 2, to: 9 }, { from: 2, to: 10 }, { from: 2, to: 22 },
    { from: 3, to: 11 }, { from: 3, to: 12 }, { from: 3, to: 23 },
    { from: 24, to: 25 }, { from: 24, to: 26 }, { from: 24, to: 27 },
    { from: 7, to: 15 }, { from: 7, to: 16 }, { from: 7, to: 28 },
    { from: 15, to: 17 }, { from: 15, to: 18 },
    { from: 16, to: 17 }, { from: 16, to: 19 }, { from: 16, to: 20 },
    { from: 28, to: 29 }, { from: 28, to: 30 },
    { from: 24, to: 19 }, { from: 25, to: 29 }, { from: 26, to: 30 }
  ]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [draggedNode, setDraggedNode] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const svgRef = useRef(null);

  const nodeDetails = {
    1: "Central hub for all coaching functionality",
    2: "Analyzes shooting mechanics, accuracy, and crosshair placement",
    3: "Evaluates positioning, timing, and tactical decisions",
    24: "Tracks long-term improvement and personal development",
    5: "Real-time analysis during gameplay",
    6: "Post-game analysis of recorded footage",
    7: "Main interface showing key metrics and coaching insights",
    9: "Tips for optimal crosshair positioning and pre-aiming",
    10: "Tracking accuracy metrics and improvement suggestions",
    22: "Analysis of click timing and flick shot performance",
    11: "Where to position for maximum effectiveness and safety",
    12: "Communication, callouts, and team play insights",
    23: "Timing and coordination of ultimate abilities",
    25: "Visual representation of skill development over time",
    26: "Set and track personal improvement goals",
    27: "Long-term performance analytics and patterns",
    15: "Quick actionable feedback during short breaks",
    16: "Comprehensive review and long-term improvement planning",
    28: "Weekly deep-dive analysis and goal adjustment",
    17: "Show clips with overlays and annotations",
    18: "Most critical issues to address immediately",
    19: "Track improvement over time with metrics",
    20: "Specific steps to improve performance next game",
    29: "Personalized growth visualization and milestone tracking",
    30: "Gamified progress rewards and achievement unlocks"
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    setShowDetails(true);
  };

  const handleNodeDoubleClick = (node) => {
    setSelectedNode(node);
    setIsEditing(true);
    setEditText(node.text);
  };

  const handleEditSubmit = () => {
    if (selectedNode && editText.trim()) {
      setNodes(nodes.map(node => 
        node.id === selectedNode.id ? { ...node, text: editText.trim() } : node
      ));
    }
    setIsEditing(false);
    setSelectedNode(null);
    setEditText('');
  };

  const handleMouseDown = (e, node) => {
    e.preventDefault();
    setDraggedNode(node);
  };

  const handleMouseMove = (e) => {
    if (draggedNode) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setNodes(nodes.map(n => n.id === draggedNode.id ? { ...n, x, y } : n));
    }
  };

  const handleMouseUp = () => setDraggedNode(null);

  const addNode = () => {
    const newNode = { id: Date.now(), x: 400, y: 300, text: 'New Node', type: 'feature', color: '#6B7280' };
    setNodes([...nodes, newNode]);
  };

  const deleteNode = () => {
    if (!selectedNode) return;
    setNodes(nodes.filter(n => n.id !== selectedNode.id));
    setConnections(connections.filter(c => c.from !== selectedNode.id && c.to !== selectedNode.id));
    setSelectedNode(null);
    setShowDetails(false);
  };

  useEffect(() => {
    const gm = e => handleMouseMove(e);
    const gu = () => handleMouseUp();
    if (draggedNode) {
      document.addEventListener('mousemove', gm);
      document.addEventListener('mouseup', gu);
    }
    return () => {
      document.removeEventListener('mousemove', gm);
      document.removeEventListener('mouseup', gu);
    };
  }, [draggedNode]);

  const getNodeById = id => nodes.find(n => n.id === id);

  return (
    <div className="w-full h-screen bg-gray-900 text-white overflow-hidden">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold mb-2">AI Coaching UI - Concept Map</h1>
        <div className="flex gap-2 flex-wrap">
          <button onClick={addNode} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-1">
            <Plus size={16} /> Add Node
          </button>
          <button onClick={deleteNode} disabled={!selectedNode} className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-3 py-1 rounded flex items-center gap-1">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>

      <div className="flex h-full">
        <div className="flex-1 relative">
          <svg ref={svgRef} width="100%" height="100%" className="bg-gray-900">
            {connections.map((c, i) => {
              const f = getNodeById(c.from);
              const t = getNodeById(c.to);
              if (!f || !t) return null;
              return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="#4B5563" strokeWidth={2} />;
            })}
            {nodes.map(n => (
              <g key={n.id}>
                <circle
                  cx={n.x} cy={n.y}
                  r={n.type === 'main' ? 40 : 30}
                  fill={n.color}
                  stroke={selectedNode?.id === n.id ? '#FBBF24' : '#374151'}
                  strokeWidth={selectedNode?.id === n.id ? 3 : 2}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => handleNodeClick(n)}
                  onDoubleClick={() => handleNodeDoubleClick(n)}
                  onMouseDown={e => handleMouseDown(e, n)}
                />
                <text
                  x={n.x} y={n.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={n.type === 'main' ? 16 : 14}
                  pointerEvents="none"
                  fill="white"
                  style={{ userSelect: 'none' }}
                >{n.text.length > 12 ? n.text.substring(0, 12) + '...' : n.text}</text>
              </g>
            ))}
          </svg>
        </div>

        {showDetails && selectedNode && (
          <div className="w-96 bg-gray-800 p-4 border-l border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Node Details</h3>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-white">×</button>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedNode.color }}></div>
                <span className="font-medium">{selectedNode.text}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">Type: {selectedNode.type}</p>
              <p className="text-sm text-gray-300">{nodeDetails[selectedNode.id] || "No description available"}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Actions:</h4>
              <button onClick={() => handleNodeDoubleClick(selectedNode)} className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-1">
                <Edit3 size={14} /> Edit
              </button>
              <button disabled className="w-full bg-gray-600 px-3 py-1 rounded flex items-center gap-1">
                <Move size={14} /> Drag on Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptMap;