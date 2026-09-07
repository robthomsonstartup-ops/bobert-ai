"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle, Check, ChevronRight, Clipboard, Download, FileSpreadsheet,
  Filter, Library, Lightbulb, Search, Settings2, ShieldCheck, Sparkles, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { scanPdfForSchedulePages, buildScheduleText, type PdfScanResult } from "./pdf-extract";

// ---------------------------------------------------------------------------
// Types — mirror db/schema.ts. Kept local to this file since it's currently
// the only consumer; promote to a shared module if a second page needs them.
// ---------------------------------------------------------------------------

type ConfigStatus = "ready" | "review" | "factory" | "photometric" | "keep";

type Project = {
  id: number;
  name: string;
  location: string;
  planDate: string;
  customer: string;
  scope: string;
  bidDueDate: string;
  bidPlatform: string;
  packageStrategy: string;
  quantityMethod: string;
  status: string;
  eyebrow: string;
  summary: string;
  defaultSelectedFixtureType: string;
  createdAt: string;
  updatedAt: string;
};

type Fixture = {
  id: number;
  projectId: number;
  fixtureType: string;
  area: "Interior" | "Exterior";
  specifiedManufacturer: string;
  specifiedCatalog: string;
  alternateManufacturer: string;
  alternateCatalog: string;
  family: string;
  description: string;
  quantity: number | null;
  quantitySource: string;
  reviewStatus: ConfigStatus;
  exception: string;
  requirements: string[];
  outOfScope: boolean;
  evidenceLabel: string;
  evidenceUrl: string;
  updatedAt: string;
};

type VendorRule = {
  id: number;
  matchLabel: string;
  targetManufacturer: string;
  includesTerms: string;
};

const STATUS_LABELS: Record<ConfigStatus, string> = {
  ready: "Ready",
  review: "Configure",
  factory: "Factory check",
  photometric: "Photometric",
  keep: "Keep specified",
};

const csvCell = (v: string | number) => `"${String(v).replaceAll('"', '""')}"`;

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

async function apiRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data && typeof data === "object" && "error" in data ? String((data as { error: string }).error) : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

const getProjects = () => apiRequest<Project[]>("/api/projects");
const createProjectApi = (body: Record<string, string>) =>
  apiRequest<Project>("/api/projects", { method: "POST", body: JSON.stringify(body) });
const patchProjectApi = (id: number, body: Record<string, string>) =>
  apiRequest<Project>(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(body) });
const getFixtures = (projectId: number) => apiRequest<Fixture[]>(`/api/projects/${projectId}/fixtures`);
const createFixtureApi = (projectId: number, body: Record<string, unknown>) =>
  apiRequest<Fixture>(`/api/projects/${projectId}/fixtures`, { method: "POST", body: JSON.stringify(body) });
const createFixturesBatchApi = (projectId: number, rows: Record<string, unknown>[]) =>
  apiRequest<Fixture[]>(`/api/projects/${projectId}/fixtures`, { method: "POST", body: JSON.stringify({ fixtures: rows }) });
const patchFixtureApi = (projectId: number, fixtureId: number, body: Record<string, unknown>) =>
  apiRequest<Fixture>(`/api/projects/${projectId}/fixtures`, { method: "PATCH", body: JSON.stringify({ fixtureId, ...body }) });
const getVendorRules = () => apiRequest<VendorRule[]>("/api/vendor-rules");
const createVendorRuleApi = (body: Record<string, string>) =>
  apiRequest<VendorRule>("/api/vendor-rules", { method: "POST", body: JSON.stringify(body) });

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Home() {
  // --- Data loaded from D1 ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [fixturesLoading, setFixturesLoading] = useState(false);
  const [vendorRules, setVendorRules] = useState<VendorRule[]>([]);

  // --- UI-only state ---
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | ConfigStatus>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "warning">("success");
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [showAddFixture, setShowAddFixture] = useState(false);
  const [newFixture, setNewFixture] = useState({
    type: "", area: "Interior" as "Interior" | "Exterior", specified: "", specifiedCatalog: "", description: "", qty: 1,
  });
  const [showAddRule, setShowAddRule] = useState(false);
  const [newRule, setNewRule] = useState({ match: "", target: "", includes: "" });

  const officeInput = useRef<HTMLInputElement>(null);
  const scheduleInput = useRef<HTMLInputElement>(null);
  const [extracting, setExtracting] = useState(false);
  const [pdfScan, setPdfScan] = useState<PdfScanResult | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  // Tracks which project is *currently* selected, updated synchronously
  // (unlike projectId state, which only updates on next render). Async
  // fixture loads compare against this when they resolve — if the user
  // has since switched projects, the stale response is discarded instead
  // of overwriting the UI with the wrong project's fixtures.
  const currentProjectIdRef = useRef<number | null>(null);

  function notify(text: string, type: "success" | "warning" = "success") {
    setNotice(text);
    setNoticeType(type);
  }

  // --- Initial load: project list + vendor rules ---
  useEffect(() => {
    (async () => {
      try {
        const [projectRows, ruleRows] = await Promise.all([getProjects(), getVendorRules()]);
        setProjects(projectRows);
        setVendorRules(ruleRows);
        if (projectRows.length > 0) selectProject(projectRows[0].id, projectRows);
      } catch (err) {
        notify(`Failed to load projects: ${(err as Error).message}`, "warning");
      } finally {
        setProjectsLoaded(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadFixtures(id: number) {
    setFixturesLoading(true);
    try {
      const rows = await getFixtures(id);
      if (currentProjectIdRef.current !== id) return; // stale — user switched projects since this call started
      setFixtures(rows);
    } catch (err) {
      if (currentProjectIdRef.current !== id) return;
      notify(`Failed to load fixtures: ${(err as Error).message}`, "warning");
      setFixtures([]);
    } finally {
      if (currentProjectIdRef.current === id) setFixturesLoading(false);
    }
  }

  function selectProject(id: number, projectList: Project[] = projects) {
    currentProjectIdRef.current = id;
    setProjectId(id);
    setFilter("all");
    setNotice("");
    const project = projectList.find((p) => p.id === id);
    setSelectedId(null); // resolved once fixtures load, below
    loadFixturesAndSelect(id, project?.defaultSelectedFixtureType ?? "");
  }

  async function loadFixturesAndSelect(id: number, defaultType: string) {
    setFixturesLoading(true);
    try {
      const rows = await getFixtures(id);
      if (currentProjectIdRef.current !== id) return; // stale — user switched projects since this call started
      setFixtures(rows);
      const preferred = rows.find((r) => r.fixtureType === defaultType);
      setSelectedId((preferred ?? rows[0])?.id ?? null);
    } catch (err) {
      if (currentProjectIdRef.current !== id) return;
      notify(`Failed to load fixtures: ${(err as Error).message}`, "warning");
      setFixtures([]);
    } finally {
      if (currentProjectIdRef.current === id) setFixturesLoading(false);
    }
  }

  // --- Derived values ---
  const activeProject = projects.find((p) => p.id === projectId) ?? null;
  const configured = activeProject ? activeProject.status !== "intake" : false;
  const active = fixtures.find((x) => x.id === selectedId) ?? fixtures[0];
  const visible = fixtures.filter(
    (x) => (filter === "all" || x.reviewStatus === filter) &&
      `${x.fixtureType} ${x.specifiedManufacturer} ${x.alternateManufacturer} ${x.family}`.toLowerCase().includes(query.toLowerCase())
  );
  const scopedRows = fixtures.filter((x) => !x.outOfScope);
  const total = scopedRows.reduce((s, x) => s + (x.quantity ?? 0), 0);
  const exceptions = scopedRows.filter((x) => ["review", "factory", "photometric"].includes(x.reviewStatus)).length;
  const ready = scopedRows.filter((x) => ["ready", "keep"].includes(x.reviewStatus)).length;
  const release = exceptions === 0 && scopedRows.length > 0;
  const statusCounts = useMemo(
    () => Object.fromEntries((["ready", "review", "factory", "photometric", "keep"] as ConfigStatus[]).map((s) => [s, fixtures.filter((x) => x.reviewStatus === s).length])),
    [fixtures]
  );
  const preferredVendors = useMemo(() => {
    const base = [
      "LSI", "Coronet", "BEST Lighting", "Lumenture", "Juno", "Nora", "Columbia", "Cree", "Hubbell", "Lithonia",
      "Acuity", "RAB", "Keystone", "Eaton", "GE Current", "Signify", "Lutron", "Leviton", "Legrand", "Philips",
      "Selux", "Visa Lighting", "Vode", "Eureka", "Finelite", "Prudential", "Amerlux", "Focal Point",
    ];
    const fromApproved = fixtures
      .filter((x) => x.reviewStatus === "ready" && x.alternateManufacturer && !base.includes(x.alternateManufacturer))
      .map((x) => x.alternateManufacturer);
    return [...new Set([...base, ...fromApproved])].sort();
  }, [fixtures]);

  // --- Vendor rule matching ---
  function matchVendorRule(specifiedManufacturer: string): { target: string; ruleLabel: string } | null {
    const s = specifiedManufacturer.toLowerCase();
    for (const rule of vendorRules) {
      const terms = rule.includesTerms.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
      if (terms.some((t) => s.includes(t)) || s.includes(rule.matchLabel.toLowerCase())) {
        return { target: rule.targetManufacturer, ruleLabel: rule.matchLabel };
      }
    }
    return null;
  }

  async function buildAlternatePackage() {
    if (!projectId) return;
    let matched = 0, unmatched = 0;
    const patches: { fixtureId: number; alternateManufacturer?: string; family?: string; exception: string }[] = [];
    const nextRows = fixtures.map((x) => {
      if (x.alternateManufacturer) return x; // already assigned — don't clobber
      const hit = matchVendorRule(x.specifiedManufacturer);
      if (hit) {
        matched++;
        const patch = {
          alternateManufacturer: hit.target,
          family: "Vendor rule match — verify specific model and catalog #",
          exception: `Matched vendor rule "${hit.ruleLabel}" → ${hit.target}. Confirm exact model and enter catalog #.`,
        };
        patches.push({ fixtureId: x.id, ...patch });
        return { ...x, ...patch };
      }
      unmatched++;
      if (!x.exception) {
        const exception = "No vendor rule matched this manufacturer. Assign an alternate manually or add a rule.";
        patches.push({ fixtureId: x.id, exception });
        return { ...x, exception };
      }
      return x;
    });
    setFixtures(nextRows);
    try {
      await Promise.all(patches.map((p) => patchFixtureApi(projectId, p.fixtureId, p)));
      await patchProjectApi(projectId, { status: "configured" });
      setProjects((ps) => ps.map((p) => (p.id === projectId ? { ...p, status: "configured" } : p)));
      notify(`Vendor rules applied: ${matched} matched, ${unmatched} need manual assignment.`, unmatched > 0 && matched === 0 ? "warning" : "success");
    } catch (err) {
      notify(`Some matches failed to save: ${(err as Error).message}. Reloading to stay in sync.`, "warning");
      loadFixtures(projectId);
    }
  }

  async function addVendorRule() {
    if (!newRule.match.trim() || !newRule.target.trim() || !newRule.includes.trim()) {
      notify("Fill in all three fields to add a vendor rule.", "warning");
      return;
    }
    try {
      const created = await createVendorRuleApi({
        matchLabel: newRule.match.trim(), targetManufacturer: newRule.target.trim(), includesTerms: newRule.includes.trim(),
      });
      setVendorRules((v) => [...v, created]);
      notify(`Rule added: ${created.matchLabel} → ${created.targetManufacturer}. Applies next time you build the alternate package.`);
      setNewRule({ match: "", target: "", includes: "" });
      setShowAddRule(false);
    } catch (err) {
      notify(`Failed to add rule: ${(err as Error).message}`, "warning");
    }
  }

  // --- Project management ---
  async function addProject() {
    const name = newProjectName.trim();
    if (!name) {
      notify("Enter a project name before creating it.", "warning");
      return;
    }
    try {
      const created = await createProjectApi({ name, eyebrow: "FIELD INTAKE", summary: "" });
      setProjects((p) => [created, ...p]);
      setNewProjectName("");
      setShowNewProject(false);
      currentProjectIdRef.current = created.id;
      setProjectId(created.id);
      setFixtures([]);
      setSelectedId(null);
      setFilter("all");
      notify(`${name} created. Add fixtures below as you walk the job.`);
    } catch (err) {
      notify(`Failed to create project: ${(err as Error).message}`, "warning");
    }
  }

  // --- Fixture mutations ---
  function applyLocal(id: number, patch: Partial<Fixture>) {
    setFixtures((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  async function persistFixture(id: number, patch: Record<string, unknown>) {
    if (!projectId) return;
    try {
      await patchFixtureApi(projectId, id, patch);
    } catch (err) {
      notify(`Failed to save change: ${(err as Error).message}. Reloading to stay in sync.`, "warning");
      loadFixtures(projectId);
    }
  }

  function toggleOutOfScope(id: number) {
    const row = fixtures.find((x) => x.id === id);
    if (!row) return;
    const outOfScope = !row.outOfScope;
    applyLocal(id, { outOfScope });
    persistFixture(id, { outOfScope });
  }

  function updateQuantity(id: number, quantity: number) {
    const patch = { quantity: Math.max(0, quantity || 0), quantitySource: "Manual override" };
    applyLocal(id, patch);
    persistFixture(id, patch);
  }

  function updateAlternateManufacturer(id: number, alternateManufacturer: string) {
    const row = fixtures.find((x) => x.id === id);
    const reviewStatus = row?.reviewStatus === "keep" ? "keep" : "review";
    const exception = "Alternate manufacturer changed; review before release.";
    applyLocal(id, { alternateManufacturer, reviewStatus, exception });
    persistFixture(id, { alternateManufacturer, reviewStatus, exception });
  }

  function updateAlternateCatalog(id: number, alternateCatalog: string) {
    const row = fixtures.find((x) => x.id === id);
    const reviewStatus = row?.reviewStatus === "keep" ? "keep" : "review";
    const exception = "Catalog number entered; review before release.";
    applyLocal(id, { alternateCatalog, reviewStatus, exception });
    persistFixture(id, { alternateCatalog, reviewStatus, exception });
  }

  function isPlausibleCatalogNumber(v: string): boolean {
    const s = v.trim();
    if (s.length < 3) return false;
    if (!/[0-9]/.test(s)) return false;
    if (!/[A-Za-z]/.test(s)) return false;
    if (/^(.)\1*$/.test(s.replace(/[^A-Za-z0-9]/g, ""))) return false; // rejects things like "dddd"
    return true;
  }

  function approve(id: number) {
    const row = fixtures.find((x) => x.id === id);
    if (!row) return;
    if (row.reviewStatus !== "keep" && !row.alternateCatalog) {
      notify("Add a verified alternate catalog number before approving this fixture.", "warning");
      return;
    }
    if (row.reviewStatus !== "keep" && row.alternateCatalog && !isPlausibleCatalogNumber(row.alternateCatalog)) {
      notify(`"${row.alternateCatalog}" doesn't look like a real catalog number — needs letters and numbers, e.g. LD6 or HBLED12. Double-check against the manufacturer's cut sheet.`, "warning");
      return;
    }
    const patch = { reviewStatus: "ready" as ConfigStatus, exception: "User reviewed and approved" };
    applyLocal(id, patch);
    persistFixture(id, patch);
    notify(`${row.fixtureType} approved and saved.`);
  }

  function keepSpecified(id: number) {
    const row = fixtures.find((x) => x.id === id);
    if (!row) return;
    const patch = {
      alternateManufacturer: row.specifiedManufacturer,
      alternateCatalog: row.specifiedCatalog,
      reviewStatus: "keep" as ConfigStatus,
      exception: "Retained as specified by user.",
    };
    applyLocal(id, patch);
    persistFixture(id, patch);
    notify(`${row.fixtureType} retained as specified.`);
  }

  function resetToReview(id: number) {
    const row = fixtures.find((x) => x.id === id);
    if (!row) return;
    const patch = { reviewStatus: "review" as ConfigStatus, exception: "Reset for re-review." };
    applyLocal(id, patch);
    persistFixture(id, patch);
    notify(`${row.fixtureType} reset for review.`);
  }

  async function addFixture() {
    if (!projectId) return;
    if (!newFixture.type.trim()) {
      notify("Enter a fixture type before adding it.", "warning");
      return;
    }
    try {
      const created = await createFixtureApi(projectId, {
        fixtureType: newFixture.type.trim(),
        area: newFixture.area,
        specifiedManufacturer: newFixture.specified.trim() || "Field entry — unverified",
        specifiedCatalog: newFixture.specifiedCatalog.trim(),
        description: newFixture.description.trim(),
        quantity: Math.max(0, newFixture.qty || 0),
        quantitySource: "Field count",
        reviewStatus: "review",
        exception: "Added from the field; needs drawing-truth verification and alternate assignment.",
      });
      setFixtures((r) => [...r, created]);
      setSelectedId(created.id);
      setShowAddFixture(false);
      setNewFixture({ type: "", area: "Interior", specified: "", specifiedCatalog: "", description: "", qty: 1 });
      notify(`${created.fixtureType} added — ${created.quantity ?? 0} units. Configure or keep specified next.`);
    } catch (err) {
      notify(`Failed to add fixture: ${(err as Error).message}`, "warning");
    }
  }

  async function importOfficeCounts(file: File) {
    if (!projectId) return;
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    const updates: { fixtureId: number; quantity: number; quantitySource: string }[] = [];
    const nextRows = fixtures.map((row) => {
      for (const line of lines) {
        const cells = line.split(/,|\t/).map((v) => v.trim().replace(/^"|"$/g, ""));
        const qty = Number(cells[1]);
        if (cells[0]?.toUpperCase() === row.fixtureType.toUpperCase() && Number.isFinite(qty)) {
          const quantitySource = `Office count · ${file.name}`;
          updates.push({ fixtureId: row.id, quantity: qty, quantitySource });
          return { ...row, quantity: qty, quantitySource };
        }
      }
      return row;
    });
    setFixtures(nextRows);
    notify(`${updates.length} office counts matched by fixture type. Unmatched rows were left unchanged.`, updates.length === 0 ? "warning" : "success");
    try {
      await Promise.all(updates.map((u) => patchFixtureApi(projectId, u.fixtureId, { quantity: u.quantity, quantitySource: u.quantitySource })));
    } catch (err) {
      notify(`Some office counts failed to save: ${(err as Error).message}. Reloading to stay in sync.`, "warning");
      loadFixtures(projectId);
    }
  }

  // --- PDF schedule extraction ---
  async function startScheduleScan(file: File) {
    setExtracting(true);
    notify(`Scanning ${file.name} for fixture schedule pages…`);
    try {
      const scan = await scanPdfForSchedulePages(file);
      if (scan.candidates.length === 0) {
        notify('No fixture schedule pages detected in this PDF. Try a different file, or use "Add fixture" to enter it manually.', "warning");
        return;
      }
      setPdfScan(scan);
      const strongNums = scan.candidates.filter((p) => p.strength === "strong").map((p) => p.num);
      setSelectedPages(strongNums.length > 0 ? strongNums : [scan.candidates[0].num]);
      notify(`Found ${scan.candidates.length} candidate page(s) out of ${scan.totalPages}. Confirm which one(s) are the real fixture schedule below.`);
    } catch (err) {
      notify(`Scan error: ${(err as Error).message}`, "warning");
    } finally {
      setExtracting(false);
    }
  }

  function togglePageSelection(num: number) {
    setSelectedPages((p) => (p.includes(num) ? p.filter((n) => n !== num) : [...p, num].sort((a, b) => a - b)));
  }

  function cancelPageSelection() {
    setPdfScan(null);
    setSelectedPages([]);
    setNotice("");
  }

  async function confirmScheduleExtraction() {
    if (!projectId || !pdfScan || selectedPages.length === 0) {
      notify("Select at least one page before extracting.", "warning");
      return;
    }
    const built = buildScheduleText(pdfScan, selectedPages);
    if (!built.withinBudget) {
      notify(`Selected pages are too large (${built.totalChars} characters). Select fewer pages - just the actual schedule table, not the whole sheet if it has a legend/notes.`, "warning");
      return;
    }
    setExtracting(true);
    const fileName = pdfScan.fileName;
    notify(`Extracting fixtures from page(s) ${built.pageNums.join(", ")}…`);
    try {
      const res = await fetch("/api/extract-schedule", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: built.text }),
      });
      const data = (await res.json()) as {
        fixtures?: { type?: string; area?: string; specified?: string; specifiedCatalog?: string; description?: string; qty?: number; confidence?: string }[];
        error?: string;
      };
      if (!res.ok || data.error) {
        notify(data.error || `Extraction failed (${res.status}).`, "warning");
        return;
      }
      const found = data.fixtures || [];
      if (found.length === 0) {
        notify('No fixture rows extracted with confidence from the selected page(s). This drawing may need manual entry via "Add fixture."', "warning");
        return;
      }
      const rows = found.map((f) => ({
        fixtureType: String(f.type || "").trim() || "?",
        area: f.area === "Exterior" ? "Exterior" : "Interior",
        specifiedManufacturer: String(f.specified || "").trim() || "Unclear from drawing",
        specifiedCatalog: String(f.specifiedCatalog || "").trim(),
        description: String(f.description || "").trim(),
        quantity: Number(f.qty) || 0,
        quantitySource: `PDF extraction · ${fileName} (p.${built.pageNums.join(",")})`,
        reviewStatus: "review",
        exception: `Extracted from drawing (${f.confidence || "unknown"} confidence) — verify against source before approving.`,
      }));
      const created = await createFixturesBatchApi(projectId, rows);
      setFixtures((r) => [...r, ...created]);
      const low = found.filter((f) => (f.confidence || "").includes("low")).length;
      notify(
        `${created.length} fixture type(s) extracted from page(s) ${built.pageNums.join(", ")}.${low ? ` ${low} flagged low-confidence.` : ""} Verify every row against the drawing before approving.`,
        low > 0 ? "warning" : "success"
      );
      setPdfScan(null);
      setSelectedPages([]);
    } catch (err) {
      notify(`Extraction error: ${(err as Error).message}`, "warning");
    } finally {
      setExtracting(false);
    }
  }

  // --- Export ---
  const bom = scopedRows.map((x) =>
    [x.fixtureType, x.alternateManufacturer, x.alternateCatalog || "", x.family, x.description, x.quantity ?? 0, x.quantitySource, STATUS_LABELS[x.reviewStatus]].map(csvCell).join(",")
  );
  const fileSlug = (activeProject?.name ?? "project").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");

  function download() {
    const blob = new Blob([["TYPE", "MANUFACTURER", "CATALOG #", "FAMILY", "DESCRIPTION", "QTY", "QTY SOURCE", "STATUS"].map(csvCell).join(",") + "\n" + bom.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileSlug}-Alternate-BOM.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function createQuote() {
    if (!release) return;
    const quoteRows = scopedRows.map((x) =>
      [x.fixtureType, x.alternateManufacturer, x.alternateCatalog || x.specifiedCatalog, "", x.description, x.quantity ?? 0].map(csvCell).join(",")
    );
    const blob = new Blob([["TYPE", "MANUFACTURER", "CATALOG #", "DIM", "DESCRIPTION", "QTY"].map(csvCell).join(",") + "\n" + quoteRows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileSlug}-Company-Quote-Import.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    setNotice("Released quote-import file created from approved alternates only.");
  }

  async function copy() {
    await navigator.clipboard.writeText(
      fixtures.map((x) => `${x.fixtureType}\t${x.alternateManufacturer}\t${x.family}\t\t${x.description}\t${x.quantity ?? 0}`).join("\n")
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  // ---------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------

  if (!projectsLoaded) {
    return <main className="app-shell"><div className="notice page-notice">Loading Bobert…</div></main>;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <img
            src="data:image/png;base64,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"
            alt="Bobert"
            className="brand-mark"
          />
          bobert.ai
        </div>
        <p>LIGHTING INTELLIGENCE</p>
        <nav>
          <button className="active"><Lightbulb />Configurator</button>
          <button><Library />Knowledge</button>
          <button><ShieldCheck />Reviews</button>
          <button><FileSpreadsheet />Exports</button>
        </nav>
        <div className="side-note">
          <Sparkles />
          <strong>Shared company brain</strong>
          <small>Every verified job improves the next one.</small>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <small>ACTIVE PROJECT</small>
            <select
              value={projectId ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "__new__") { setShowNewProject(true); return; }
                if (v) selectProject(Number(v));
              }}
            >
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              <option value="__new__">+ New project…</option>
            </select>
          </div>
          <div className="top-actions">
            <input ref={officeInput} hidden type="file" accept=".csv,.tsv,.txt" onChange={(e) => e.target.files?.[0] && importOfficeCounts(e.target.files[0])} />
            <input ref={scheduleInput} hidden type="file" accept="application/pdf" onChange={(e) => { const f = e.target.files?.[0]; if (f) startScheduleScan(f); e.target.value = ""; }} />
            <Button variant="outline" onClick={() => scheduleInput.current?.click()} disabled={extracting || !projectId}><Upload />{extracting ? "Extracting…" : "Upload schedule (PDF)"}</Button>
            <Button variant="outline" onClick={() => officeInput.current?.click()} disabled={!projectId}><Upload />Import office counts</Button>
            <Button variant="outline" onClick={copy} disabled={!projectId}><Clipboard />{copied ? "Copied" : "Copy quote rows"}</Button>
            <Button onClick={download} disabled={fixtures.length === 0}><Download />Export BOM</Button>
          </div>
        </header>

        {notice ? (
          <div className={`notice page-notice ${noticeType === "warning" ? "notice-warning" : ""}`}>
            {noticeType === "warning" ? <AlertTriangle style={{ width: 14, height: 14, marginRight: 6, display: "inline-block", verticalAlign: "-2px" }} /> : null}
            {notice}
          </div>
        ) : null}

        {showNewProject ? (
          <div className="notice page-notice" style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <Input placeholder="Project name (e.g. Main Street Dealership — Springfield)" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} style={{ maxWidth: 360 }} />
            <Button onClick={addProject}>Create project</Button>
            <Button variant="outline" onClick={() => { setShowNewProject(false); setNewProjectName(""); }}>Cancel</Button>
          </div>
        ) : null}

        {pdfScan ? (
          <div className="launch-card" style={{ flexDirection: "column", alignItems: "stretch", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles />
              <div>
                <h2>Confirm the fixture schedule page(s)</h2>
                <p>{pdfScan.fileName} — {pdfScan.candidates.length} candidate page(s) found out of {pdfScan.totalPages}. Strong matches (explicit &quot;fixture schedule&quot; title) are pre-checked; review before extracting.</p>
              </div>
            </div>
            <div style={{ display: "grid", gap: 6 }}>
              {pdfScan.candidates.map((p) => (
                <label key={p.num} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", background: selectedPages.includes(p.num) ? "#fff" : "#fafafa", border: "1px solid #eee", borderRadius: 6, cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedPages.includes(p.num)} onChange={() => togglePageSelection(p.num)} style={{ marginTop: 3 }} />
                  <div>
                    <b>Page {p.num}</b> <Badge className={`status ${p.strength === "strong" ? "ready" : "pending"}`}>{p.strength === "strong" ? "Title match" : "Unconfirmed"}</Badge>
                    <div style={{ fontSize: ".72rem", color: "#666", marginTop: 2 }}>{p.preview}</div>
                  </div>
                </label>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={confirmScheduleExtraction} disabled={extracting || selectedPages.length === 0}>{extracting ? "Extracting…" : `Extract selected page(s) (${selectedPages.length})`}</Button>
              <Button variant="outline" onClick={cancelPageSelection}>Cancel</Button>
            </div>
          </div>
        ) : null}

        <div className="content">
          <section className="project-head">
            <div>
              <p className="eyebrow">{activeProject?.eyebrow ?? "FIELD INTAKE"}</p>
              <h1>{activeProject?.name ?? "No project selected"}</h1>
              <p>{fixturesLoading ? "Loading fixtures…" : fixtures.length === 0 ? "No fixtures yet — add them below as you walk the job." : activeProject?.summary || "Field-entered fixtures · verify drawing truth and assign alternates"}</p>
            </div>
            <Button size="lg" onClick={buildAlternatePackage} disabled={configured || !projectId}><Sparkles />{configured ? "Rules applied" : "Build alternate package"}</Button>
          </section>

          <section className="pipeline">
            <div className="done"><Check />Intake</div><ChevronRight />
            <div className="done"><Check />Drawing truth</div><ChevronRight />
            <div className={configured ? "done" : "current"}>{configured ? <Check /> : <Settings2 />}Configure</div><ChevronRight />
            <div className={configured ? "current" : ""}>Review exceptions</div><ChevronRight />
            <div className={release ? "done" : "locked"}>Excel quote</div>
          </section>

          <section className="metrics">
            <article><strong>{fixtures.length}</strong><span>Fixture types</span></article>
            <article><strong>{total}</strong><span>Total units</span></article>
            <article><strong>{configured ? ready : 0}</strong><span>Assigned / retained</span></article>
            <article className={exceptions ? "warn" : "good"}><strong>{configured ? exceptions : "—"}</strong><span>Exceptions to review</span></article>
          </section>

          {!configured && projectId ? (
            <section className="launch-card">
              <Sparkles />
              <div><h2>Drawing truth is ready</h2><p>One click applies LPA CSI&apos;s vendor rules to the schedule, assigns preferred manufacturers, and preserves unmatched decorative fixtures.</p></div>
              <Button onClick={buildAlternatePackage}>Build alternates</Button>
            </section>
          ) : null}

          <section className="rules">
            <div><Settings2 /><strong>Preferred vendor rules</strong></div>
            {vendorRules.map((r) => <span key={r.id}>{r.matchLabel}<ChevronRight /><b>{r.targetManufacturer}</b></span>)}
            <Button variant="outline" onClick={() => setShowAddRule((v) => !v)}>+ Add rule</Button>
          </section>

          {showAddRule ? (
            <div className="launch-card">
              <Settings2 />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", width: "100%" }}>
                <Input placeholder="Rule label (e.g. Signify brands)" value={newRule.match} onChange={(e) => setNewRule((r) => ({ ...r, match: e.target.value }))} style={{ maxWidth: 200 }} />
                <Input placeholder="Target manufacturer (e.g. LSI)" value={newRule.target} onChange={(e) => setNewRule((r) => ({ ...r, target: e.target.value }))} style={{ maxWidth: 160 }} />
                <Input placeholder="Match terms, comma-separated (e.g. Lightolier, Gardco)" value={newRule.includes} onChange={(e) => setNewRule((r) => ({ ...r, includes: e.target.value }))} style={{ maxWidth: 320 }} />
                <Button onClick={addVendorRule}>Add rule</Button>
              </div>
            </div>
          ) : null}

          <section className="work-grid">
            <article className="table-card">
              <div className="toolbar">
                <div><h2>Configurator</h2><p>Automation handles the normal path. Review only flagged exceptions.</p></div>
                <div className="search"><Search /><Input placeholder="Search fixtures" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
                <Button variant="outline" onClick={() => setShowAddFixture((v) => !v)} disabled={!projectId}><Upload />Add fixture</Button>
              </div>

              {showAddFixture ? (
                <div className="launch-card">
                  <Sparkles />
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", width: "100%" }}>
                    <Input placeholder="Type (e.g. A1)" value={newFixture.type} onChange={(e) => setNewFixture((f) => ({ ...f, type: e.target.value }))} style={{ maxWidth: 120 }} />
                    <select value={newFixture.area} onChange={(e) => setNewFixture((f) => ({ ...f, area: e.target.value as "Interior" | "Exterior" }))}>
                      <option value="Interior">Interior</option>
                      <option value="Exterior">Exterior</option>
                    </select>
                    <Input placeholder="Specified manufacturer" value={newFixture.specified} onChange={(e) => setNewFixture((f) => ({ ...f, specified: e.target.value }))} style={{ maxWidth: 200 }} />
                    <Input placeholder="Specified catalog #" value={newFixture.specifiedCatalog} onChange={(e) => setNewFixture((f) => ({ ...f, specifiedCatalog: e.target.value }))} style={{ maxWidth: 220 }} />
                    <Input placeholder="Description" value={newFixture.description} onChange={(e) => setNewFixture((f) => ({ ...f, description: e.target.value }))} style={{ maxWidth: 220 }} />
                    <Input type="number" placeholder="Qty" value={newFixture.qty} onChange={(e) => setNewFixture((f) => ({ ...f, qty: +e.target.value }))} style={{ maxWidth: 90 }} />
                    <Button onClick={addFixture}>Add</Button>
                  </div>
                </div>
              ) : null}

              <div className="filters">
                <button className={filter === "all" ? "on" : ""} onClick={() => setFilter("all")}><Filter />All {fixtures.length}</button>
                {(["ready", "review", "factory", "photometric", "keep"] as ConfigStatus[]).map((s) => (
                  <button key={s} className={filter === s ? "on" : ""} onClick={() => setFilter(s)}>{STATUS_LABELS[s]} {statusCounts[s]}</button>
                ))}
              </div>

              {fixturesLoading ? (
                <div className="table-wrap"><p style={{ padding: 24, textAlign: "center", opacity: 0.7 }}>Loading fixtures…</p></div>
              ) : fixtures.length === 0 ? (
                <div className="table-wrap"><p style={{ padding: 24, textAlign: "center", opacity: 0.7 }}>No fixtures yet. Click &quot;Add fixture&quot; above to start entering what&apos;s on the schedule or what you&apos;re seeing on site.</p></div>
              ) : (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th style={{ width: 34 }}></th><th>Type</th><th>Drawing truth</th><th>Preferred alternate</th><th>Qty</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {visible.map((x) => (
                        <tr key={x.id} className={selectedId === x.id ? "selected" : ""} onClick={() => setSelectedId(x.id)} style={x.outOfScope ? { opacity: 0.45 } : undefined}>
                          <td onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked={!x.outOfScope} onChange={() => toggleOutOfScope(x.id)} title={x.outOfScope ? "Excluded from scope - click to include" : "In scope - click to exclude"} />
                          </td>
                          <td>
                            <b style={x.outOfScope ? { textDecoration: "line-through" } : undefined}>{x.fixtureType}</b>
                            <small>{x.area}</small>
                            {x.outOfScope ? <small style={{ color: "#dc2626", fontWeight: 700, display: "block" }}>Not lighting scope</small> : null}
                          </td>
                          <td>
                            <b>{x.specifiedManufacturer}</b>
                            <small>{x.description}</small>
                            {x.specifiedCatalog ? <code style={{ display: "block", marginTop: 2, fontSize: ".68rem", color: "#444" }}>{x.specifiedCatalog}</code> : <small style={{ color: "#dc2626", fontWeight: 700 }}>No catalog # captured</small>}
                          </td>
                          <td>
                            <b>{configured ? x.alternateManufacturer || "Not assigned" : "Pending"}</b>
                            <small>{configured ? x.family || "Enter alternate catalog #" : "Run configurator"}</small>
                          </td>
                          <td>
                            <Input type="number" value={x.quantity ?? 0} onClick={(e) => e.stopPropagation()} onChange={(e) => updateQuantity(x.id, +e.target.value)} />
                            <small>{x.quantitySource}</small>
                          </td>
                          <td><Badge className={`status ${configured ? x.reviewStatus : "pending"}`}>{configured ? STATUS_LABELS[x.reviewStatus] : "Pending"}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>

            {active ? (
              <aside className="review">
                <div className="review-top"><span>{active.fixtureType}</span><Badge className={`status ${active.reviewStatus}`}>{STATUS_LABELS[active.reviewStatus]}</Badge></div>
                <h2>{active.alternateManufacturer || "No alternate assigned yet"}</h2>
                <p className="family">{active.family}</p>
                <div className="truth"><small>SPECIFIED BASIS</small><strong>{active.specifiedManufacturer}</strong><code>{active.specifiedCatalog}</code></div>
                <div className="catalog-entry">
                  <small>ALTERNATE MANUFACTURER</small>
                  <datalist id="preferred-vendors">{preferredVendors.map((v) => <option key={v} value={v} />)}</datalist>
                  <Input value={active.alternateManufacturer || ""} onChange={(e) => updateAlternateManufacturer(active.id, e.target.value)} placeholder="e.g. LSI, Coronet, BEST Lighting" list="preferred-vendors" />
                </div>
                <div className="catalog-entry">
                  <small>VERIFIED ALTERNATE CATALOG #</small>
                  <Input value={active.alternateCatalog || ""} onChange={(e) => updateAlternateCatalog(active.id, e.target.value)} placeholder="Enter or paste confirmed catalog number" />
                </div>
                <div className="requirements"><small>NORMALIZED REQUIREMENTS</small>{active.requirements.map((r) => <span key={r}>{r}</span>)}</div>
                <div className={`exception ${active.reviewStatus}`}>
                  <AlertTriangle />
                  <div><small>AUTOMATION DECISION</small><p>{active.exception || "No exception recorded."}</p></div>
                </div>
                <div className="source"><ShieldCheck /><p><b>Quantity traceable</b><br />{active.quantity ?? 0} units · {active.quantitySource}</p></div>
                {!["ready", "keep"].includes(active.reviewStatus) ? (
                  <div className="review-actions">
                    <Button variant="outline" onClick={() => keepSpecified(active.id)}>Keep specified</Button>
                    <Button onClick={() => approve(active.id)}><Check />Approve alternate</Button>
                  </div>
                ) : (
                  <div className="review-actions">
                    <Button variant="outline" onClick={() => resetToReview(active.id)}>Undo / reset</Button>
                    <Button className="full" variant="outline" disabled><Check />Ready for BOM</Button>
                  </div>
                )}
              </aside>
            ) : null}
          </section>

          <section className={`release ${release ? "open" : "blocked"}`}>
            <div>
              {release ? <ShieldCheck /> : <AlertTriangle />}
              <div>
                <h2>{release ? "Company quote export ready" : "Company quote export is protected"}</h2>
                <p>{release ? "All fixture lines passed review and can be written into the locked quote template." : `${exceptions} fixture types still need configuration, factory confirmation, or photometric review. Review CSV remains available.`}</p>
              </div>
            </div>
            <Button disabled={!release} onClick={createQuote}><FileSpreadsheet />Create quote import</Button>
          </section>
        </div>
      </section>
    </main>
  );
}
