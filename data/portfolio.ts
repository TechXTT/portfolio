import {
  Blocks,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Network,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectLink = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  title: string;
  service: string;
  subtitle: string;
  description: string;
  tags: string[];
  href: string | null;
  links?: ProjectLink[];
  featured: boolean;
  badge?: string;
  signal: string;
  interfaces: string[];
  ships: string[];
};

export const profile = {
  name: "Martin Bozhilov",
  role: "Junior Software Engineer / Backend Developer",
  headline:
    "Backend developer building Go services, developer tools, and cloud-native product systems.",
  subheadline:
    "I’m Martin Bozhilov, a software developer focused on Go, APIs, database-driven systems, cloud deployment, and clean developer tooling.",
  location: "Eindhoven, Netherlands / Bulgaria",
  email: "martin@bozhilov.me",
  github: "https://github.com/TechXTT",
  linkedin: "https://www.linkedin.com/in/martin-bozhilov-796a6b225/",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const heroBadges = [
  "Go",
  "Backend Systems",
  "PostgreSQL",
  "gRPC",
  "Docker / Kubernetes",
  "Developer Tools",
  "Open Source",
];

export const socialLinks = [
  {
    label: "GitHub",
    href: profile.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
] satisfies Array<{ label: string; href: string; icon: LucideIcon }>;

export const stats = [
  { value: "46", label: "Public GitHub repositories" },
  { value: "25", label: "GitHub followers" },
  { value: "TORM v1", label: "Open-source Go ORM" },
  { value: "Fontys", label: "ICT student in Eindhoven" },
];

export const systemSignals = [
  { label: "primary runtime", value: "Go" },
  { label: "data layer", value: "PostgreSQL / Prisma" },
  { label: "delivery", value: "Railway / Vercel / Docker" },
  { label: "current focus", value: "backend product systems" },
];

export const buildLog = [
  {
    id: "001",
    label: "schema",
    value: "TORM turns declarative models into generated Go clients and migrations.",
  },
  {
    id: "002",
    label: "workers",
    value: "xolto runs API and background flows for missions, alerts, billing, and AI search.",
  },
  {
    id: "003",
    label: "contracts",
    value: "Bazaar connects Go services with escrow contracts, disputes, and marketplace UX.",
  },
];

export const operatingPrinciples = [
  {
    label: "contract first",
    value: "Design APIs, schemas, and generated clients so callers get predictable surfaces.",
  },
  {
    label: "small moving parts",
    value: "Prefer clear services, explicit workers, and boring deployment paths over clever glue.",
  },
  {
    label: "tooling earns its place",
    value: "Build automation when it removes repeated work or prevents a class of backend mistakes.",
  },
  {
    label: "ship with evidence",
    value: "Document setup, runtime assumptions, migrations, and the operational path around the code.",
  },
];

export const aboutParagraphs = [
  "I’m Martin Bozhilov, a junior software engineer and backend-focused developer with a strong focus on Go, APIs, database-driven applications, and cloud-native systems. I enjoy building practical tools that make development faster, cleaner, and more reliable.",
  "My public GitHub work spans TORM, a schema-driven Go ORM, xolto, a Go API and worker runtime, The Bazaar marketplace ecosystem, and full-stack product systems such as ELSYS and Assist. Across those projects I’ve worked with PostgreSQL, Prisma, Docker, Kubernetes, Railway, Vercel, OAuth, Stripe, and AI integrations.",
  "I’m currently studying Information and Communication Technology at Fontys University of Applied Sciences while continuing to build open-source tools, backend systems, and product-focused software.",
];

export const projects = [
  {
    title: "TORM",
    service: "torm.orm",
    subtitle: "Schema-driven Go ORM and CLI inspired by Prisma",
    description:
      "TORM is a lightweight Go ORM that uses a Prisma-style schema as the source of truth, then generates Go structs, a database client, service methods, and SQL migration files. It includes schema parsing, type-safe query builders, automated migrations, relation support, enums, UUIDs, and PostgreSQL-focused workflows.",
    tags: ["Go", "PostgreSQL", "ORM", "CLI", "Code Generation", "Migrations"],
    href: "https://github.com/TechXTT/TORM",
    links: [{ label: "Repository", href: "https://github.com/TechXTT/TORM" }],
    featured: true,
    badge: "Featured Open Source Tool",
    signal: "A toolchain project with parser, generator, migration, and client layers.",
    interfaces: ["schema.prisma", "Go client", "SQL migrations", "CLI commands"],
    ships: ["type-safe queries", "relation support", "enum/UUID support"],
  },
  {
    title: "xolto",
    service: "xolto.app",
    subtitle: "Go API and worker runtime for a used-electronics buying copilot",
    description:
      "xolto is a Go backend deployed behind api.xolto.app, with authenticated missions, search runs, AI-generated search queries, billing tiers, observability, email alerts, and frontend clients for buyers, admins, and the public landing page.",
    tags: ["Go", "Workers", "OAuth", "Stripe", "AI API", "Railway", "Observability"],
    href: "https://github.com/TechXTT/xolto",
    links: [
      { label: "API Repo", href: "https://github.com/TechXTT/xolto" },
      { label: "Buyer App", href: "https://dash.xolto.app" },
      { label: "Admin App", href: "https://admin.xolto.app" },
      { label: "Landing", href: "https://www.xolto.app" },
    ],
    featured: true,
    badge: "Current Product System",
    signal: "A product backend with auth, workers, alerts, AI-assisted search, and billing.",
    interfaces: ["REST API", "worker runtime", "buyer dashboard", "admin surface"],
    ships: ["missions/searches", "Stripe tiers", "email alerts"],
  },
  {
    title: "The Bazaar",
    service: "bazaar.market",
    subtitle: "Diploma thesis marketplace platform",
    description:
      "The Bazaar is a marketplace ecosystem split across a Go backend, TypeScript frontend, and Solidity/TypeScript escrow contract. The contract supports ETH and USDC orders, buyer release, refunds, batched claims, and ERC-792 / ERC-1497 dispute and evidence hooks.",
    tags: ["Go", "TypeScript", "Solidity", "Marketplace", "Escrow", "Smart Contracts"],
    href: "https://github.com/TechXTT/The-Bazaar",
    links: [
      { label: "Main Repo", href: "https://github.com/TechXTT/The-Bazaar" },
      { label: "Backend", href: "https://github.com/TechXTT/bazaar-backend" },
      { label: "Frontend", href: "https://github.com/TechXTT/bazaar-frontend" },
      { label: "Contract", href: "https://github.com/TechXTT/bazaar-contract" },
    ],
    featured: true,
    signal: "A multi-repo marketplace where backend, frontend, and escrow contracts meet.",
    interfaces: ["Go backend", "Next frontend", "Solidity escrow", "ABI sync"],
    ships: ["ETH/USDC orders", "dispute hooks", "batched claims"],
  },
  {
    title: "ELSYS Website",
    service: "elsys.cms",
    subtitle: "Multilingual school website with admin tooling",
    description:
      "ELSYS is a multilingual Bulgarian/English school website built with the Next.js App Router, localized JSON/Markdown content, a lightweight admin surface, Prisma-backed persistence, NextAuth, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Prisma", "NextAuth", "CMS", "Tailwind CSS"],
    href: "https://github.com/TechXTT/Elsys",
    links: [
      { label: "Repository", href: "https://github.com/TechXTT/Elsys" },
      { label: "Live Site", href: "https://elsys.vercel.app" },
    ],
    featured: false,
    signal: "A localized content system with admin flows and Prisma-backed persistence.",
    interfaces: ["localized routes", "admin UI", "content files", "Prisma DB"],
    ships: ["BG/EN content", "navigation caching", "auth-gated admin"],
  },
  {
    title: "Assist",
    service: "assist.app",
    subtitle: "Personal dashboard with AI, Gmail, and open banking integrations",
    description:
      "Assist is a single-user personal-life dashboard for schedule, tasks, money, health, briefings, and weekly reviews. It uses Next.js, Prisma, NextAuth, Google Calendar and Gmail integrations, AI-generated summaries, and PSD2 open-banking transaction sync.",
    tags: ["Next.js", "Prisma", "NextAuth", "Google APIs", "Open Banking", "AI"],
    href: "https://github.com/TechXTT/Assist",
    links: [{ label: "Repository", href: "https://github.com/TechXTT/Assist" }],
    featured: false,
    signal: "A personal operations dashboard with external APIs and deterministic fallbacks.",
    interfaces: ["Google APIs", "banking sync", "AI summaries", "Prisma ledger"],
    ships: ["Gmail receipts", "PSD2 import", "weekly review"],
  },
  {
    title: "Crypto Contract Observer",
    service: "observer.chain",
    subtitle: "Go event observer for blockchain contract activity",
    description:
      "A Go backend tool that observes Lock events on an Ethereum contract and votes on those events. It was developed during the Encorp.io internship and includes local setup, environment-based configuration, and documented observer flow.",
    tags: ["Go", "Ethereum", "Event Observer", "Backend", "Solidity", "Internship"],
    href: "https://github.com/TechXTT/contract-observer",
    links: [{ label: "Repository", href: "https://github.com/TechXTT/contract-observer" }],
    featured: false,
    signal: "A Go observer that listens to on-chain events and executes voting flow.",
    interfaces: ["Ethereum events", "Go process", "env config", "contract ABI"],
    ships: ["Lock event listener", "voting flow", "observer diagram"],
  },
] satisfies PortfolioProject[];

export const experience = [
  {
    company: "Opsie.ai",
    role: "Junior Software Engineer",
    period: "Current",
    points: [
      "Current LinkedIn-listed software engineering role.",
      "Continuing backend, product, and developer-tooling work alongside Fontys ICT studies.",
    ],
  },
  {
    company: "TORM",
    role: "Creator / Open Source Developer",
    period: "Feb 2025 - Jun 2025",
    points: [
      "Built a schema-driven Go ORM inspired by Prisma.",
      "Implemented schema parsing, generated Go models and clients, type-safe query helpers, relation handling, and migration workflows.",
      "Released TORM v1.0.0 and documented installation, commands, examples, and contribution flow.",
    ],
  },
  {
    company: "Assetify",
    role: "Mobile Developer",
    period: "Sep 2023 - Jun 2024",
    points: [
      "Developed a native mobile application using React Native.",
      "Adapted libraries to work natively on devices using Java and Swift.",
    ],
  },
  {
    company: "Encorp.io",
    role: "Backend & Crypto Developer Intern",
    period: "Jun 2023 - Jul 2023",
    points: [
      "Developed a crypto contract observer using Go, Ethereum, and Solidity.",
      "Built event-observation flow around Lock events and voting behavior.",
      "Worked in a large agile team using project management and tracking tools such as Jira.",
    ],
  },
  {
    company: "MediaHub",
    role: "Backend Developer Intern",
    period: "Jul 2022 - Aug 2022",
    points: [
      "Worked with the company’s IPTV product.",
      "Created a tester for backend services using Go.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Backend",
    icon: Code2,
    items: [
      "Go",
      "REST APIs",
      "gRPC",
      "WebSockets",
      "Gorilla/mux",
      "Gin",
      "Java Spring Boot",
      "Node.js",
      "TypeScript",
      "Python",
      "Backend services",
    ],
  },
  {
    title: "Databases & Tooling",
    icon: Database,
    items: [
      "PostgreSQL",
      "SQLite",
      "Prisma",
      "ORM design",
      "Migrations",
      "Code generation",
      "Testing tools",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    items: ["Docker", "Kubernetes", "Railway", "Vercel", "DigitalOcean", "Sentry", "Cloud deployment"],
  },
  {
    title: "Blockchain",
    icon: Blocks,
    items: ["Ethereum", "Solidity", "Hardhat", "Escrow contracts", "Crypto contract observers"],
  },
  {
    title: "Soft Skills",
    icon: Network,
    items: ["Decision making", "Communication", "Multitasking", "Teamwork", "Problem solving"],
  },
] satisfies Array<{ title: string; icon: LucideIcon; items: string[] }>;

export const education = [
  {
    institution: "Fontys University of Applied Sciences",
    program: "Information and Communication Technology",
    period: "Sep 2024 - Ongoing",
    details: [],
    icon: GraduationCap,
  },
  {
    institution: "Technology School “Electronic Systems” associated with TU-Sofia",
    program: "Software Programming",
    period: "Sep 2019 - Jun 2024",
    details: [
      "Diploma za sredno obrazovanie",
      "Certificate of professional qualification for Software Programming",
    ],
    icon: BriefcaseBusiness,
  },
  {
    institution: "IELTS",
    program: "English Language IELTS 7.5, C1",
    period: "Valid Oct 2023 - Oct 2025",
    details: [],
    icon: ShieldCheck,
  },
];

export const terminalLines = [
  "go build schema-driven-tools",
  "ship api workers on railway",
  "sync contracts + services",
];

export const terminalIcon = TerminalSquare;
