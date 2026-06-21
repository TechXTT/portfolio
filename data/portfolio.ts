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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectLink = {
  label: string;
  href: string;
};

/** Volatile, GitHub-sourced metadata. Authored copy always wins over this. */
export type ProjectLive = {
  stars?: number;
  language?: string;
  lastPushed?: string; // ISO date
  latestRelease?: string; // e.g. "v1.0.0"
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
  /** "owner/name" — the repo this project syncs from, if any. */
  repo?: string;
  /** Live GitHub metadata, populated at request time by the merge layer. */
  live?: ProjectLive;
};

export const profile = {
  name: "Martin Bozhilov",
  role: "Junior Software Engineer / Backend Developer",
  shortRole: "Backend Engineer",
  monogram: "MB",
  headline:
    "Backend developer building Go services, developer tools, and cloud-native product systems.",
  subheadline:
    "I’m Martin Bozhilov, a software developer focused on Go, APIs, database-driven systems, cloud deployment, and clean developer tooling.",
  location: "Eindhoven, Netherlands / Sofia, Bulgaria",
  locationShort: "Eindhoven, NL / Sofia, BG",
  email: "martin@bozhilov.me",
  github: "https://github.com/TechXTT",
  githubHandle: "github.com/TechXTT",
  githubUsername: "TechXTT",
  linkedin: "https://www.linkedin.com/in/martin-b-bozhilov",
  linkedinHandle: "linkedin.com/in/martin-b-bozhilov",
};

/** Thin status strip at the very top of the page. */
export const statusBar = {
  status: "Available for work",
  location: "Eindhoven, NL / Sofia, BG",
  stack: ["Go", "APIs", "Postgres", "K8s"],
};

/**
 * Architecture node-graph for the hero "System Map" panel.
 * `nodes` are the primary vertical path (accent connectors); `branches`
 * hang off a primary node id (secondary --line connectors).
 */
export const systemMap = {
  file: "architecture.map",
  nodes: [
    { id: "clients", label: "CLIENTS" },
    { id: "api", label: "GO · API", primary: true },
    { id: "postgres", label: "POSTGRESQL" },
    { id: "delivery", label: "RAILWAY · VERCEL · DOCKER" },
  ],
  branches: [
    { from: "api", label: "WORKERS" },
    { from: "postgres", label: "PRISMA" },
  ],
} satisfies {
  file: string;
  nodes: Array<{ id: string; label: string; primary?: boolean }>;
  branches: Array<{ from: string; label: string }>;
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

/**
 * Hero stats. `value`/`label` are authored fallbacks; `key` lets the merge
 * layer overwrite the numeric/release value with live GitHub data when present.
 */
export type Stat = {
  value: string;
  label: string;
  key?: "repos" | "followers" | "release";
};

export const stats: Stat[] = [
  { value: "46", label: "Public GitHub repositories", key: "repos" },
  { value: "26", label: "GitHub followers", key: "followers" },
  { value: "TORM v1", label: "Open-source Go ORM", key: "release" },
  { value: "Fontys", label: "ICT student · Eindhoven" },
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
  "I'm Martin Bozhilov, a backend developer from Bulgaria focused on Go, APIs, database-driven systems, and cloud-native architecture. I build practical open-source tools, and I care about distributed systems, clean developer tooling, and interfaces other people can trust.",
  "My public GitHub work spans TORM, a schema-driven Go ORM, xolto, a Go API and worker runtime, The Bazaar marketplace ecosystem, and full-stack product systems such as ELSYS and Assist. Across those projects I’ve worked with PostgreSQL, Prisma, Docker, Kubernetes, Railway, Vercel, OAuth, Stripe, and AI integrations.",
  "I’m currently studying Information and Communication Technology at Fontys University of Applied Sciences while continuing to build open-source tools, backend systems, and product-focused software.",
];

export const projects = [
  {
    title: "TORM",
    repo: "TechXTT/TORM",
    service: "torm.orm",
    subtitle: "Schema-driven Go ORM and CLI inspired by Prisma",
    description:
      "TORM is a lightweight Go ORM that uses a Prisma-style schema as the source of truth, then generates Go structs, a database client, service methods, and SQL migration files. Shipped as v1.0.0 across 27 releases, installable via `go install github.com/TechXTT/TORM/cmd/torm@latest`, and published on pkg.go.dev.",
    tags: ["Go", "PostgreSQL", "ORM", "CLI", "Code Generation", "Migrations"],
    href: "https://github.com/TechXTT/TORM",
    links: [
      { label: "Repository", href: "https://github.com/TechXTT/TORM" },
      { label: "pkg.go.dev", href: "https://pkg.go.dev/github.com/TechXTT/TORM" },
    ],
    featured: true,
    badge: "v1.0.0 · OSS",
    signal: "A toolchain project with parser, generator, migration, and client layers.",
    interfaces: ["schema.prisma", "Go client", "SQL migrations", "CLI commands"],
    ships: ["type-safe queries", "relation support", "enum/UUID support"],
  },
  {
    title: "xolto",
    repo: "TechXTT/xolto",
    service: "xolto.app",
    subtitle: "Go API and worker runtime for a used-electronics buying copilot",
    description:
      "Go API + worker runtime behind api.xolto.app. Scores used-electronics listings from Marktplaats, Vinted, and OLX.bg into buy / negotiate / skip verdicts — with Google OAuth, Stripe Free/Buyer/Pro tiers, SSE deal alerts, and Sentry observability.",
    tags: ["Go", "Workers", "OAuth", "Stripe", "SSE", "Sentry", "Railway"],
    href: "https://github.com/TechXTT/xolto",
    links: [
      { label: "API", href: "https://api.xolto.app" },
      { label: "Buyer App", href: "https://dash.xolto.app" },
      { label: "Admin App", href: "https://admin.xolto.app" },
      { label: "Landing", href: "https://www.xolto.app" },
    ],
    featured: true,
    badge: "Product",
    signal: "A product backend with auth, workers, alerts, AI-assisted search, and billing.",
    interfaces: ["REST API", "worker runtime", "buyer dashboard", "admin surface"],
    ships: ["missions/searches", "Stripe tiers", "email alerts"],
  },
  {
    title: "The Bazaar",
    repo: "TechXTT/The-Bazaar",
    service: "bazaar.market",
    subtitle: "Diploma-thesis blockchain marketplace platform",
    description:
      "The Bazaar is a diploma-thesis marketplace ecosystem — a monorepo of bazaar-backend, bazaar-contract, and bazaar-frontend submodules under The-Bazaar. The Solidity/TypeScript escrow contract supports ETH and USDC orders, buyer release, refunds, batched claims, and ERC-792 / ERC-1497 dispute and evidence hooks.",
    tags: ["Go", "TypeScript", "Solidity", "Marketplace", "Escrow", "Smart Contracts"],
    href: "https://github.com/TechXTT/The-Bazaar",
    links: [
      { label: "Main Repo", href: "https://github.com/TechXTT/The-Bazaar" },
      { label: "Backend", href: "https://github.com/TechXTT/bazaar-backend" },
      { label: "Frontend", href: "https://github.com/TechXTT/bazaar-frontend" },
      { label: "Contract", href: "https://github.com/TechXTT/bazaar-contract" },
    ],
    featured: true,
    badge: "Thesis",
    signal: "A multi-repo marketplace where backend, frontend, and escrow contracts meet.",
    interfaces: ["Go backend", "Next frontend", "Solidity escrow", "ABI sync"],
    ships: ["ETH/USDC orders", "dispute hooks", "batched claims"],
  },
  {
    title: "ELSYS Website",
    repo: "TechXTT/Elsys",
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
    repo: "TechXTT/Assist",
    service: "assist.app",
    subtitle: "Personal dashboard with AI, Gmail, and open banking integrations",
    description:
      "A single-user life dashboard for schedule, tasks, money, health, briefings, and weekly reviews. Next.js 14 + Prisma + NextAuth, with Anthropic Haiku 4.5 summaries (deterministic fallback), Gmail receipt scanning, and PSD2 open-banking sync — Revolut + ~2500 banks via Enable Banking.",
    tags: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Anthropic", "Open Banking"],
    href: "https://github.com/TechXTT/Assist",
    links: [{ label: "Repository", href: "https://github.com/TechXTT/Assist" }],
    featured: false,
    signal: "A personal operations dashboard with external APIs and deterministic fallbacks.",
    interfaces: ["Google APIs", "banking sync", "AI summaries", "Prisma ledger"],
    ships: ["Gmail receipts", "PSD2 import", "weekly review"],
  },
  {
    title: "Crypto Contract Observer",
    repo: "TechXTT/contract-observer",
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

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  periodLabel: string;
  type: string;
  current?: boolean;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Opsie.ai",
    role: "Junior Software Engineer",
    period: "Jan 2026 - Mar 2026",
    periodLabel: "2026 / Jan–Mar",
    type: "Full-time",
    points: [
      "Software engineering role building backend and product features.",
      "Worked on backend, product, and developer-tooling alongside Fontys ICT studies.",
    ],
  },
  {
    company: "TORM",
    role: "Creator / Open Source Developer",
    period: "Feb 2025 - Jun 2025",
    periodLabel: "2025 / Feb–Jun",
    type: "Open source",
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
    periodLabel: "2023–24 / Sep–Jun",
    type: "Part-time",
    points: [
      "Developed a native mobile application using React Native.",
      "Adapted libraries to work natively on devices using Java and Swift.",
    ],
  },
  {
    company: "Encorp.io",
    role: "Backend & Crypto Developer Intern",
    period: "Jun 2023 - Jul 2023",
    periodLabel: "2023 / Jun–Jul",
    type: "Internship",
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
    periodLabel: "2022 / Jul–Aug",
    type: "Internship",
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

export type EducationItem = {
  institution: string;
  program: string;
  period: string;
  category: string;
  location: string;
  details: string[];
  icon: LucideIcon;
};

export const education: EducationItem[] = [
  {
    institution: "Fontys University of Applied Sciences",
    program: "Information and Communication Technology",
    period: "Sep 2024 - Ongoing",
    category: "University",
    location: "Eindhoven, NL",
    details: [],
    icon: GraduationCap,
  },
  {
    institution: "Technology School “Electronic Systems” associated with TU-Sofia",
    program: "Software Programming",
    period: "Sep 2019 - Jun 2024",
    category: "Secondary",
    location: "Sofia, BG",
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
    category: "Certification",
    location: "British Council",
    details: [],
    icon: ShieldCheck,
  },
];

/** Key/value rows for the Contact "CONTACT.INFO" card. */
export const contactInfo = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", value: profile.githubHandle, href: profile.github },
  { label: "LinkedIn", value: profile.linkedinHandle, href: profile.linkedin },
  { label: "Location", value: profile.locationShort, href: null },
] satisfies Array<{ label: string; value: string; href: string | null }>;

export const footerNote = "Designed as a system.";
