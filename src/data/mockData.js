/**
 * NEXUS — Centralized Mock Data Architecture
 * 
 * All organizational interaction, employee profile, graph network,
 * community grouping, anomaly detection, and link prediction data.
 * Ready to be swapped with backend / API endpoints seamlessly.
 */

export const dashboardMetrics = {
  totalEmployees: {
    value: 248,
    change: "+4.2%",
    period: "vs last month",
    subtitle: "Active organizational directory"
  },
  totalInteractions: {
    value: 18492,
    formatted: "18,492",
    change: "+8.7%",
    period: "vs last month",
    subtitle: "Direct communications & collab events"
  },
  activeConnections: {
    value: 1842,
    formatted: "1,842",
    change: "+5.3%",
    period: "vs last month",
    subtitle: "Active pairwise edge density"
  },
  communities: {
    value: 24,
    formatted: "24",
    change: "Stable",
    period: "Louvain / GNN partition",
    subtitle: "Detected functional clusters"
  },
  anomalies: {
    value: 17,
    formatted: "17",
    change: "3 High Priority",
    period: "Last 7 days",
    subtitle: "Requires administrative review"
  }
};

export const interactionTrendsByPeriod = {
  "7d": [
    { date: "Sep 17", interactions: 2420, directMessages: 1540, meetings: 610, codeReviews: 270 },
    { date: "Sep 18", interactions: 2680, directMessages: 1720, meetings: 680, codeReviews: 280 },
    { date: "Sep 19", interactions: 2950, directMessages: 1890, meetings: 750, codeReviews: 310 },
    { date: "Sep 20", interactions: 2590, directMessages: 1680, meetings: 640, codeReviews: 270 },
    { date: "Sep 21", interactions: 1840, directMessages: 1180, meetings: 460, codeReviews: 200 },
    { date: "Sep 22", interactions: 2810, directMessages: 1790, meetings: 710, codeReviews: 310 },
    { date: "Sep 23", interactions: 3202, directMessages: 2040, meetings: 820, codeReviews: 342 }
  ],
  "30d": [
    { date: "Aug 25", interactions: 14200, directMessages: 9100, meetings: 3600, codeReviews: 1500 },
    { date: "Sep 01", interactions: 15800, directMessages: 10100, meetings: 3950, codeReviews: 1750 },
    { date: "Sep 08", interactions: 16950, directMessages: 10850, meetings: 4200, codeReviews: 1900 },
    { date: "Sep 15", interactions: 17820, directMessages: 11400, meetings: 4420, codeReviews: 2000 },
    { date: "Sep 23", interactions: 18492, directMessages: 11830, meetings: 4580, codeReviews: 2082 }
  ],
  "90d": [
    { date: "Jul W1", interactions: 12100, directMessages: 7800, meetings: 3100, codeReviews: 1200 },
    { date: "Jul W3", interactions: 13400, directMessages: 8600, meetings: 3400, codeReviews: 1400 },
    { date: "Aug W1", interactions: 14600, directMessages: 9350, meetings: 3700, codeReviews: 1550 },
    { date: "Aug W3", interactions: 15900, directMessages: 10200, meetings: 4000, codeReviews: 1700 },
    { date: "Sep W1", interactions: 17100, directMessages: 10950, meetings: 4300, codeReviews: 1850 },
    { date: "Sep W3", interactions: 18492, directMessages: 11830, meetings: 4580, codeReviews: 2082 }
  ],
  "1y": [
    { date: "Oct '25", interactions: 8900, directMessages: 5700, meetings: 2300, codeReviews: 900 },
    { date: "Dec '25", interactions: 10400, directMessages: 6650, meetings: 2700, codeReviews: 1050 },
    { date: "Feb '26", interactions: 12200, directMessages: 7800, meetings: 3150, codeReviews: 1250 },
    { date: "Apr '26", interactions: 14100, directMessages: 9000, meetings: 3650, codeReviews: 1450 },
    { date: "Jun '26", interactions: 16300, directMessages: 10400, meetings: 4200, codeReviews: 1700 },
    { date: "Aug '26", interactions: 17600, directMessages: 11250, meetings: 4500, codeReviews: 1850 },
    { date: "Sep '26", interactions: 18492, directMessages: 11830, meetings: 4580, codeReviews: 2082 }
  ]
};

export const employeesData = [
  {
    id: "E001",
    name: "Rahul Sharma",
    role: "Lead Research Scientist",
    department: "AI Research",
    email: "rahul.sharma@nexus.corp",
    connections: 48,
    interactions: 382,
    centrality: 0.82,
    status: "active",
    joinDate: "Jan 2024",
    projects: 5,
    incoming: 214,
    outgoing: 168,
    uniqueCollaborators: 48,
    communityId: "comm-01",
    bio: "Focuses on graph convolutional networks, self-supervised representation learning, and cross-departmental research workflows."
  },
  {
    id: "E002",
    name: "Elena Rostova",
    role: "Principal ML Engineer",
    department: "AI Research",
    email: "elena.rostova@nexus.corp",
    connections: 44,
    interactions: 349,
    centrality: 0.79,
    status: "active",
    joinDate: "Mar 2024",
    projects: 4,
    incoming: 195,
    outgoing: 154,
    uniqueCollaborators: 44,
    communityId: "comm-01",
    bio: "Specializes in scalable training infrastructure, temporal dynamic graphs, and distributed feature stores."
  },
  {
    id: "E003",
    name: "Marcus Vance",
    role: "VP of Product Engineering",
    department: "Engineering",
    email: "marcus.vance@nexus.corp",
    connections: 52,
    interactions: 421,
    centrality: 0.88,
    status: "active",
    joinDate: "Nov 2023",
    projects: 7,
    incoming: 260,
    outgoing: 161,
    uniqueCollaborators: 52,
    communityId: "comm-03",
    bio: "Key bridge between executive leadership, product strategy, and core engineering infrastructure."
  },
  {
    id: "E004",
    name: "Dr. Aris Thorne",
    role: "Staff Graph Architect",
    department: "AI Research",
    email: "aris.thorne@nexus.corp",
    connections: 41,
    interactions: 310,
    centrality: 0.75,
    status: "active",
    joinDate: "Feb 2024",
    projects: 4,
    incoming: 160,
    outgoing: 150,
    uniqueCollaborators: 41,
    communityId: "comm-01",
    bio: "Leading GNN node-classification pipelines and semantic graph indexing across company repositories."
  },
  {
    id: "E005",
    name: "Priya Patel",
    role: "Head of Data Platforms",
    department: "Data Science",
    email: "priya.patel@nexus.corp",
    connections: 46,
    interactions: 374,
    centrality: 0.81,
    status: "active",
    joinDate: "Jan 2024",
    projects: 6,
    incoming: 202,
    outgoing: 172,
    uniqueCollaborators: 46,
    communityId: "comm-02",
    bio: "Oversees streaming interaction logs, Kafka architectures, and semantic metadata extraction pipelines."
  },
  {
    id: "E006",
    name: "David Chen",
    role: "Senior Distributed Systems Engineer",
    department: "Infrastructure",
    email: "david.chen@nexus.corp",
    connections: 38,
    interactions: 295,
    centrality: 0.72,
    status: "active",
    joinDate: "Apr 2024",
    projects: 3,
    incoming: 145,
    outgoing: 150,
    uniqueCollaborators: 38,
    communityId: "comm-04",
    bio: "Maintains Kubernetes clusters, low-latency API gateways, and fault-tolerant service meshes."
  },
  {
    id: "E007",
    name: "Sarah Jenkins",
    role: "Principal UX Architect",
    department: "Product & Design",
    email: "sarah.jenkins@nexus.corp",
    connections: 39,
    interactions: 318,
    centrality: 0.74,
    status: "active",
    joinDate: "May 2024",
    projects: 5,
    incoming: 180,
    outgoing: 138,
    uniqueCollaborators: 39,
    communityId: "comm-03",
    bio: "Design system leader championing data visualization accessibility and cognitive-friendly analytics workflows."
  },
  {
    id: "E008",
    name: "Kofi Mensah",
    role: "Director of Organizational Ops",
    department: "People & Ops",
    email: "kofi.mensah@nexus.corp",
    connections: 43,
    interactions: 335,
    centrality: 0.77,
    status: "active",
    joinDate: "Oct 2023",
    projects: 4,
    incoming: 210,
    outgoing: 125,
    uniqueCollaborators: 43,
    communityId: "comm-05",
    bio: "Focuses on cross-functional communication hygiene, organizational health, and team cohesion metrics."
  },
  {
    id: "E009",
    name: "Aoi Takahashi",
    role: "Senior Graph Data Scientist",
    department: "Data Science",
    email: "aoi.takahashi@nexus.corp",
    connections: 35,
    interactions: 260,
    centrality: 0.68,
    status: "active",
    joinDate: "Jun 2024",
    projects: 3,
    incoming: 130,
    outgoing: 130,
    uniqueCollaborators: 35,
    communityId: "comm-02",
    bio: "Specialist in topological data analysis, clustering algorithms, and link prediction metrics."
  },
  {
    id: "E010",
    name: "Liam O'Connor",
    role: "Staff Backend Engineer",
    department: "Engineering",
    email: "liam.oconnor@nexus.corp",
    connections: 36,
    interactions: 275,
    centrality: 0.70,
    status: "active",
    joinDate: "Jul 2024",
    projects: 4,
    incoming: 140,
    outgoing: 135,
    uniqueCollaborators: 36,
    communityId: "comm-03",
    bio: "High-throughput message broker integration, graph database connectors, and query optimization."
  },
  {
    id: "E011",
    name: "Zoya Al-Mansoor",
    role: "NLP Research Fellow",
    department: "AI Research",
    email: "zoya.mansoor@nexus.corp",
    connections: 31,
    interactions: 220,
    centrality: 0.63,
    status: "active",
    joinDate: "Aug 2024",
    projects: 2,
    incoming: 105,
    outgoing: 115,
    uniqueCollaborators: 31,
    communityId: "comm-01",
    bio: "Semantic embeddings from asynchronous discussions, topic modeling, and interaction sentiment extraction."
  },
  {
    id: "E012",
    name: "Mateo Garcia",
    role: "Site Reliability Engineer",
    department: "Infrastructure",
    email: "mateo.garcia@nexus.corp",
    connections: 29,
    interactions: 198,
    centrality: 0.59,
    status: "active",
    joinDate: "Sep 2024",
    projects: 3,
    incoming: 98,
    outgoing: 100,
    uniqueCollaborators: 29,
    communityId: "comm-04",
    bio: "Automating zero-downtime rollouts, telemetry collection, and incident response routing."
  },
  {
    id: "E013",
    name: "Camila Duarte",
    role: "Product Manager — Interaction Insights",
    department: "Product & Design",
    email: "camila.duarte@nexus.corp",
    connections: 34,
    interactions: 285,
    centrality: 0.71,
    status: "active",
    joinDate: "Mar 2024",
    projects: 4,
    incoming: 165,
    outgoing: 120,
    uniqueCollaborators: 34,
    communityId: "comm-03",
    bio: "Aligning graph analytics outputs with organizational KPIs and management decision frameworks."
  },
  {
    id: "E014",
    name: "Alexander Becker",
    role: "Security & Governance Specialist",
    department: "Infrastructure",
    email: "alex.becker@nexus.corp",
    connections: 26,
    interactions: 175,
    centrality: 0.55,
    status: "active",
    joinDate: "Nov 2024",
    projects: 2,
    incoming: 85,
    outgoing: 90,
    uniqueCollaborators: 26,
    communityId: "comm-04",
    bio: "Ensuring zero-trust privacy compliance, role-based boundary preservation, and audit logging."
  },
  {
    id: "E015",
    name: "Tara Nair",
    role: "People Operations Partner",
    department: "People & Ops",
    email: "tara.nair@nexus.corp",
    connections: 30,
    interactions: 240,
    centrality: 0.65,
    status: "active",
    joinDate: "Dec 2024",
    projects: 3,
    incoming: 135,
    outgoing: 105,
    uniqueCollaborators: 30,
    communityId: "comm-05",
    bio: "Focuses on remote team engagement, cross-office collaboration patterns, and onboarding networks."
  }
];

export const topConnectedEmployees = [
  { id: "E003", name: "Marcus Vance", department: "Engineering", connections: 52, interactions: 421, centrality: 0.88, role: "VP of Product Engineering" },
  { id: "E001", name: "Rahul Sharma", department: "AI Research", connections: 48, interactions: 382, centrality: 0.82, role: "Lead Research Scientist" },
  { id: "E005", name: "Priya Patel", department: "Data Science", connections: 46, interactions: 374, centrality: 0.81, role: "Head of Data Platforms" },
  { id: "E002", name: "Elena Rostova", department: "AI Research", connections: 44, interactions: 349, centrality: 0.79, role: "Principal ML Engineer" },
  { id: "E008", name: "Kofi Mensah", department: "People & Ops", connections: 43, interactions: 335, centrality: 0.77, role: "Director of Organizational Ops" },
  { id: "E004", name: "Dr. Aris Thorne", department: "AI Research", connections: 41, interactions: 310, centrality: 0.75, role: "Staff Graph Architect" }
];

export const collaboratorsMap = {
  E001: [
    { id: "E002", name: "Elena Rostova", interactions: 114, lastInteraction: "2 hours ago", strength: 0.94, department: "AI Research" },
    { id: "E004", name: "Dr. Aris Thorne", interactions: 86, lastInteraction: "Yesterday", strength: 0.88, department: "AI Research" },
    { id: "E003", name: "Marcus Vance", interactions: 64, lastInteraction: "3 days ago", strength: 0.76, department: "Engineering" },
    { id: "E005", name: "Priya Patel", interactions: 52, lastInteraction: "5 days ago", strength: 0.70, department: "Data Science" },
    { id: "E011", name: "Zoya Al-Mansoor", interactions: 38, lastInteraction: "1 week ago", strength: 0.62, department: "AI Research" }
  ],
  E002: [
    { id: "E001", name: "Rahul Sharma", interactions: 114, lastInteraction: "2 hours ago", strength: 0.94, department: "AI Research" },
    { id: "E004", name: "Dr. Aris Thorne", interactions: 78, lastInteraction: "Yesterday", strength: 0.85, department: "AI Research" },
    { id: "E005", name: "Priya Patel", interactions: 65, lastInteraction: "2 days ago", strength: 0.75, department: "Data Science" },
    { id: "E006", name: "David Chen", interactions: 46, lastInteraction: "4 days ago", strength: 0.64, department: "Infrastructure" }
  ],
  E003: [
    { id: "E007", name: "Sarah Jenkins", interactions: 102, lastInteraction: "3 hours ago", strength: 0.91, department: "Product & Design" },
    { id: "E010", name: "Liam O'Connor", interactions: 88, lastInteraction: "Yesterday", strength: 0.84, department: "Engineering" },
    { id: "E001", name: "Rahul Sharma", interactions: 64, lastInteraction: "3 days ago", strength: 0.76, department: "AI Research" },
    { id: "E013", name: "Camila Duarte", interactions: 59, lastInteraction: "2 days ago", strength: 0.72, department: "Product & Design" }
  ]
};

// React Flow graph representations
export const networkNodes = [
  {
    id: "E001",
    type: "employeeNode",
    position: { x: 380, y: 220 },
    data: {
      id: "E001",
      name: "Rahul Sharma",
      role: "Lead Research Scientist",
      department: "AI Research",
      centrality: 0.82,
      connections: 48,
      interactions: 382,
      community: "AI & Neural Modeling",
      color: "#0284C7"
    }
  },
  {
    id: "E002",
    type: "employeeNode",
    position: { x: 260, y: 380 },
    data: {
      id: "E002",
      name: "Elena Rostova",
      role: "Principal ML Engineer",
      department: "AI Research",
      centrality: 0.79,
      connections: 44,
      interactions: 349,
      community: "AI & Neural Modeling",
      color: "#0284C7"
    }
  },
  {
    id: "E003",
    type: "employeeNode",
    position: { x: 620, y: 190 },
    data: {
      id: "E003",
      name: "Marcus Vance",
      role: "VP of Product Engineering",
      department: "Engineering",
      centrality: 0.88,
      connections: 52,
      interactions: 421,
      community: "Product Experience & Core UX",
      color: "#8B5CF6"
    }
  },
  {
    id: "E004",
    type: "employeeNode",
    position: { x: 200, y: 120 },
    data: {
      id: "E004",
      name: "Dr. Aris Thorne",
      role: "Staff Graph Architect",
      department: "AI Research",
      centrality: 0.75,
      connections: 41,
      interactions: 310,
      community: "AI & Neural Modeling",
      color: "#0284C7"
    }
  },
  {
    id: "E005",
    type: "employeeNode",
    position: { x: 420, y: 440 },
    data: {
      id: "E005",
      name: "Priya Patel",
      role: "Head of Data Platforms",
      department: "Data Science",
      centrality: 0.81,
      connections: 46,
      interactions: 374,
      community: "Data Pipelines & Governance",
      color: "#6366F1"
    }
  },
  {
    id: "E006",
    type: "employeeNode",
    position: { x: 120, y: 460 },
    data: {
      id: "E006",
      name: "David Chen",
      role: "Senior Distributed Systems",
      department: "Infrastructure",
      centrality: 0.72,
      connections: 38,
      interactions: 295,
      community: "Distributed Infrastructure & SRE",
      color: "#0D9488"
    }
  },
  {
    id: "E007",
    type: "employeeNode",
    position: { x: 800, y: 160 },
    data: {
      id: "E007",
      name: "Sarah Jenkins",
      role: "Principal UX Architect",
      department: "Product & Design",
      centrality: 0.74,
      connections: 39,
      interactions: 318,
      community: "Product Experience & Core UX",
      color: "#8B5CF6"
    }
  },
  {
    id: "E008",
    type: "employeeNode",
    position: { x: 550, y: 400 },
    data: {
      id: "E008",
      name: "Kofi Mensah",
      role: "Director of Organizational Ops",
      department: "People & Ops",
      centrality: 0.77,
      connections: 43,
      interactions: 335,
      community: "Talent & Organizational Flow",
      color: "#F59E0B"
    }
  },
  {
    id: "E009",
    type: "employeeNode",
    position: { x: 480, y: 60 },
    data: {
      id: "E009",
      name: "Aoi Takahashi",
      role: "Senior Graph Data Scientist",
      department: "Data Science",
      centrality: 0.68,
      connections: 35,
      interactions: 260,
      community: "Data Pipelines & Governance",
      color: "#6366F1"
    }
  },
  {
    id: "E010",
    type: "employeeNode",
    position: { x: 740, y: 320 },
    data: {
      id: "E010",
      name: "Liam O'Connor",
      role: "Staff Backend Engineer",
      department: "Engineering",
      centrality: 0.70,
      connections: 36,
      interactions: 275,
      community: "Product Experience & Core UX",
      color: "#8B5CF6"
    }
  },
  {
    id: "E011",
    type: "employeeNode",
    position: { x: 80, y: 250 },
    data: {
      id: "E011",
      name: "Zoya Al-Mansoor",
      role: "NLP Research Fellow",
      department: "AI Research",
      centrality: 0.63,
      connections: 31,
      interactions: 220,
      community: "AI & Neural Modeling",
      color: "#0284C7"
    }
  },
  {
    id: "E012",
    type: "employeeNode",
    position: { x: 260, y: 550 },
    data: {
      id: "E012",
      name: "Mateo Garcia",
      role: "Site Reliability Engineer",
      department: "Infrastructure",
      centrality: 0.59,
      connections: 29,
      interactions: 198,
      community: "Distributed Infrastructure & SRE",
      color: "#0D9488"
    }
  }
];

export const networkEdges = [
  { id: "e1-2", source: "E001", target: "E002", label: "114", data: { count: 114, weight: 0.94 } },
  { id: "e1-4", source: "E001", target: "E004", label: "86", data: { count: 86, weight: 0.88 } },
  { id: "e1-3", source: "E001", target: "E003", label: "64", data: { count: 64, weight: 0.76 } },
  { id: "e1-5", source: "E001", target: "E005", label: "52", data: { count: 52, weight: 0.70 } },
  { id: "e1-9", source: "E001", target: "E009", label: "42", data: { count: 42, weight: 0.66 } },
  { id: "e1-11", source: "E001", target: "E011", label: "38", data: { count: 38, weight: 0.62 } },
  { id: "e2-4", source: "E002", target: "E004", label: "78", data: { count: 78, weight: 0.85 } },
  { id: "e2-5", source: "E002", target: "E005", label: "65", data: { count: 65, weight: 0.75 } },
  { id: "e2-6", source: "E002", target: "E006", label: "46", data: { count: 46, weight: 0.64 } },
  { id: "e3-7", source: "E003", target: "E007", label: "102", data: { count: 102, weight: 0.91 } },
  { id: "e3-10", source: "E003", target: "E010", label: "88", data: { count: 88, weight: 0.84 } },
  { id: "e3-8", source: "E003", target: "E008", label: "57", data: { count: 57, weight: 0.73 } },
  { id: "e5-9", source: "E005", target: "E009", label: "74", data: { count: 74, weight: 0.82 } },
  { id: "e5-8", source: "E005", target: "E008", label: "49", data: { count: 49, weight: 0.68 } },
  { id: "e6-12", source: "E006", target: "E012", label: "68", data: { count: 68, weight: 0.79 } },
  { id: "e7-10", source: "E007", target: "E010", label: "53", data: { count: 53, weight: 0.71 } },
  { id: "e4-11", source: "E004", target: "E011", label: "45", data: { count: 45, weight: 0.67 } },
  { id: "e5-6", source: "E005", target: "E006", label: "37", data: { count: 37, weight: 0.58 } }
];

export const communitiesData = [
  {
    id: "comm-01",
    name: "AI & Neural Modeling",
    employeesCount: 32,
    interactionsCount: 640,
    topDepartments: ["AI Research", "Data Science"],
    avgConnectionStrength: 0.84,
    description: "Core algorithms, embedding spaces, and graph representation researchers collaborating daily on experimental benchmarks.",
    color: "#0284C7",
    keyMembers: ["Rahul Sharma", "Elena Rostova", "Dr. Aris Thorne", "Zoya Al-Mansoor"]
  },
  {
    id: "comm-02",
    name: "Data Pipelines & Governance",
    employeesCount: 28,
    interactionsCount: 512,
    topDepartments: ["Data Science", "Infrastructure"],
    avgConnectionStrength: 0.78,
    description: "Stream ingestion, telemetry hygiene, schema evolution, and real-time interaction event pipelines.",
    color: "#6366F1",
    keyMembers: ["Priya Patel", "Aoi Takahashi", "Vikram Seth", "Nadia Lin"]
  },
  {
    id: "comm-03",
    name: "Product Experience & Core UX",
    employeesCount: 24,
    interactionsCount: 482,
    topDepartments: ["Product & Design", "Engineering"],
    avgConnectionStrength: 0.74,
    description: "Visual exploration interfaces, interactive graph navigation canvases, and dashboard workflows.",
    color: "#8B5CF6",
    keyMembers: ["Marcus Vance", "Sarah Jenkins", "Liam O'Connor", "Camila Duarte"]
  },
  {
    id: "comm-04",
    name: "Distributed Infrastructure & SRE",
    employeesCount: 21,
    interactionsCount: 390,
    topDepartments: ["Infrastructure", "Engineering"],
    avgConnectionStrength: 0.71,
    description: "High-concurrency cluster orchestration, latency budget enforcement, and zero-trust perimeter network nodes.",
    color: "#0D9488",
    keyMembers: ["David Chen", "Mateo Garcia", "Alexander Becker"]
  },
  {
    id: "comm-05",
    name: "Talent & Organizational Flow",
    employeesCount: 18,
    interactionsCount: 290,
    topDepartments: ["People & Ops"],
    avgConnectionStrength: 0.69,
    description: "Internal mobility, team communication dynamics, collaborative bridge monitoring, and knowledge diffusion.",
    color: "#F59E0B",
    keyMembers: ["Kofi Mensah", "Tara Nair", "Grace Hooper"]
  }
];

export const anomaliesData = [
  {
    id: "ano-101",
    employeeAId: "E021",
    employeeAName: "Lukas Weber",
    employeeBId: "E089",
    employeeBName: "Maya Lin",
    detectedAt: "Today, 10:32 AM",
    timestamp: "2026-09-23T10:32:00Z",
    interactionChange: "Interaction frequency increased significantly",
    baselineFrequency: "2 msg / week",
    currentFrequency: "48 msg / 24hr",
    delta: "+2,300%",
    severity: "medium",
    status: "Requires Review",
    departmentA: "AI Research",
    departmentB: "Infrastructure",
    summary: "Spike in cross-functional synchronous messages detected following the unannounced deployment incident."
  },
  {
    id: "ano-102",
    employeeAId: "E003",
    employeeAName: "Marcus Vance",
    employeeBId: "E014",
    employeeBName: "Alexander Becker",
    detectedAt: "Today, 08:15 AM",
    timestamp: "2026-09-23T08:15:00Z",
    interactionChange: "Sudden cessation of routine cross-team sync",
    baselineFrequency: "15 interactions / week",
    currentFrequency: "0 interactions / 10 days",
    delta: "-100%",
    severity: "high",
    status: "Requires Review",
    departmentA: "Engineering",
    departmentB: "Infrastructure",
    summary: "Key governance handshake edge between VP of Engineering and Lead Security has halted abruptly."
  },
  {
    id: "ano-103",
    employeeAId: "E005",
    employeeAName: "Priya Patel",
    employeeBId: "E044",
    employeeBName: "Arthur Dent",
    detectedAt: "Yesterday, 16:40 PM",
    timestamp: "2026-09-22T16:40:00Z",
    interactionChange: "Unusual off-hours collaborative document editing",
    baselineFrequency: "03:00 - 05:00 UTC",
    currentFrequency: "Continuous nocturnal commits",
    delta: "+340%",
    severity: "low",
    status: "In Review",
    departmentA: "Data Science",
    departmentB: "Engineering",
    summary: "Elevated off-schedule synchronization detected across two teams working in different geographic timezones."
  },
  {
    id: "ano-104",
    employeeAId: "E001",
    employeeAName: "Rahul Sharma",
    employeeBId: "E008",
    employeeBName: "Kofi Mensah",
    detectedAt: "Sep 21, 14:10 PM",
    timestamp: "2026-09-21T14:10:00Z",
    interactionChange: "New high-centrality bridge between distinct clusters",
    baselineFrequency: "1 meeting / month",
    currentFrequency: "8 meetings / 4 days",
    delta: "+700%",
    severity: "medium",
    status: "Requires Review",
    departmentA: "AI Research",
    departmentB: "People & Ops",
    summary: "Establishment of an unexpected inter-cluster bridge between AI research lead and organizational ops."
  },
  {
    id: "ano-105",
    employeeAId: "E012",
    employeeAName: "Mateo Garcia",
    employeeBId: "E097",
    employeeBName: "Chloe Dupont",
    detectedAt: "Sep 20, 11:25 AM",
    timestamp: "2026-09-20T11:25:00Z",
    interactionChange: "Disproportionate one-way message volume ratio",
    baselineFrequency: "1.1 ratio (balanced)",
    currentFrequency: "9.4 ratio (unidirectional)",
    delta: "+754%",
    severity: "low",
    status: "Dismissed",
    departmentA: "Infrastructure",
    departmentB: "Product & Design",
    summary: "Automated alert webhook pipeline misattributed to user communication client channel."
  },
  {
    id: "ano-106",
    employeeAId: "E004",
    employeeAName: "Dr. Aris Thorne",
    employeeBId: "E052",
    employeeBName: "Jonas Richter",
    detectedAt: "Sep 19, 09:05 AM",
    timestamp: "2026-09-19T09:05:00Z",
    interactionChange: "Multi-channel burst following zero historical interaction",
    baselineFrequency: "0 interactions historically",
    currentFrequency: "32 interactions in 12hr",
    delta: "New edge",
    severity: "high",
    status: "Requires Review",
    departmentA: "AI Research",
    departmentB: "Legal & IP",
    summary: "High-density patent filing collaboration activated with no prior communication footprint."
  }
];

export const predictionsData = [
  {
    id: "pred-201",
    employeeAId: "E014",
    employeeAName: "Alexander Becker",
    departmentA: "Infrastructure",
    employeeBId: "E037",
    employeeBName: "Yasmine Farah",
    departmentB: "AI Research",
    predictionScore: 0.88,
    commonDepartment: "Cross-Functional",
    sharedConnections: 5,
    sharedConnectionNames: ["Rahul Sharma", "David Chen", "Priya Patel", "Dr. Aris Thorne", "Mateo Garcia"],
    rationale: "High topological affinity in GNN embedding space; both are primary contributors to security-constrained GNN deployment pipelines."
  },
  {
    id: "pred-202",
    employeeAId: "E002",
    employeeAName: "Elena Rostova",
    departmentA: "AI Research",
    employeeBId: "E007",
    employeeBName: "Sarah Jenkins",
    departmentB: "Product & Design",
    predictionScore: 0.82,
    commonDepartment: "Cross-Functional",
    sharedConnections: 4,
    sharedConnectionNames: ["Marcus Vance", "Rahul Sharma", "Liam O'Connor", "Camila Duarte"],
    rationale: "Strong 2-hop neighborhood overlap. Interactive graph visual components require direct model inference parameter binding."
  },
  {
    id: "pred-203",
    employeeAId: "E006",
    employeeAName: "David Chen",
    departmentA: "Infrastructure",
    employeeBId: "E009",
    employeeBName: "Aoi Takahashi",
    departmentB: "Data Science",
    predictionScore: 0.79,
    commonDepartment: "Cross-Functional",
    sharedConnections: 4,
    sharedConnectionNames: ["Priya Patel", "Mateo Garcia", "Elena Rostova", "Liam O'Connor"],
    rationale: "Complementary streaming feature store requirements and latency optimization on graph adjacency matrices."
  },
  {
    id: "pred-204",
    employeeAId: "E011",
    employeeAName: "Zoya Al-Mansoor",
    departmentA: "AI Research",
    employeeBId: "E013",
    employeeBName: "Camila Duarte",
    departmentB: "Product & Design",
    predictionScore: 0.76,
    commonDepartment: "Cross-Functional",
    sharedConnections: 3,
    sharedConnectionNames: ["Rahul Sharma", "Dr. Aris Thorne", "Marcus Vance"],
    rationale: "Topic modeling outputs awaiting product integration for employee sentiment taxonomy dashboard."
  },
  {
    id: "pred-205",
    employeeAId: "E008",
    employeeAName: "Kofi Mensah",
    departmentA: "People & Ops",
    employeeBId: "E002",
    employeeBName: "Elena Rostova",
    departmentB: "AI Research",
    predictionScore: 0.71,
    commonDepartment: "Cross-Functional",
    sharedConnections: 3,
    sharedConnectionNames: ["Rahul Sharma", "Priya Patel", "Marcus Vance"],
    rationale: "Organizational research initiative focusing on cognitive overload patterns in machine learning engineering teams."
  }
];
