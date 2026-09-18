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
import * as XLSX from "xlsx";

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
  customerId: number | null;
  customerName: string | null;
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

type Customer = {
  id: number;
  name: string;
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
const getCustomers = () => apiRequest<Customer[]>("/api/customers");
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
  const [customers, setCustomers] = useState<Customer[]>([]);

  // --- UI-only state ---
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | ConfigStatus>("all");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState<"success" | "warning">("success");
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectCustomer, setNewProjectCustomer] = useState("");
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

  // --- Initial load: project list + vendor rules + customers ---
  useEffect(() => {
    (async () => {
      try {
        const [projectRows, ruleRows, customerRows] = await Promise.all([getProjects(), getVendorRules(), getCustomers()]);
        setProjects(projectRows);
        setVendorRules(ruleRows);
        setCustomers(customerRows);
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
  // Groups the project picker by customer so the list stays navigable as
  // project count grows — flat alphabetical-by-customer, with projects
  // that have no customer assigned yet trailing in their own group.
  const projectsByCustomer = useMemo(() => {
    const groups = new Map<string, Project[]>();
    for (const p of projects) {
      const key = p.customerName ?? "";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(p);
    }
    const named = [...groups.entries()].filter(([k]) => k !== "").sort(([a], [b]) => a.localeCompare(b));
    const unassigned = groups.get("") ?? [];
    return unassigned.length > 0 ? [...named, ["No customer assigned", unassigned] as [string, Project[]]] : named;
  }, [projects]);
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
      const created = await createProjectApi({ name, customerName: newProjectCustomer.trim(), eyebrow: "FIELD INTAKE", summary: "" });
      setProjects((p) => [created, ...p]);
      setNewProjectName("");
      setNewProjectCustomer("");
      setShowNewProject(false);
      currentProjectIdRef.current = created.id;
      setProjectId(created.id);
      setFixtures([]);
      setSelectedId(null);
      setFilter("all");
      // Refresh in case creating this project also created a brand-new customer.
      getCustomers().then(setCustomers).catch(() => {});
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
    let text: string;
    if (file.name.toLowerCase().endsWith('.pdf')) {
      const scan = await scanPdfForSchedulePages(file);
      const allPages = scan.pages.map((pg) => pg.pageNumber);
      text = await buildScheduleText(file, allPages);
    } else {
      text = await file.text();
    }
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
  const fileSlug = (activeProject?.name ?? "project").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");

  function download() {
    const headers = ["TYPE", "AREA", "SPECIFIED MFR", "SPECIFIED CATALOG #", "ALT MANUFACTURER", "ALT CATALOG #", "DESCRIPTION", "QTY", "QTY SOURCE", "STATUS"];
    const rows = fixtures.map((x) => [
      x.fixtureType, x.area, x.specifiedManufacturer, x.specifiedCatalog,
      x.alternateManufacturer || "", x.alternateCatalog || "",
      x.description, x.quantity ?? 0, x.quantitySource,
      STATUS_LABELS[x.reviewStatus] ?? x.reviewStatus,
    ]);
    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    ws["!cols"] = [8,10,18,30,18,30,28,6,14,12].map((w) => ({ wch: w }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Drawing Truth BOM");
    XLSX.writeFile(wb, `${fileSlug}-Drawing-Truth-BOM.xlsx`);
  }

  function createQuote() {
    if (!release) return;
    const TARGET_MARGIN = 0.25;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, [
      [activeProject?.name ?? "Project"],
      ["LPA CSI Quote Export", new Date().toLocaleDateString()],
      [],
      ["Target Margin", TARGET_MARGIN],
      [],
      ["TYPE", "MANUFACTURER", "CATALOG #", "DESCRIPTION", "QTY", "PRICE/EA", "EXT. AMOUNT"],
    ], { origin: "A1" });
    const dataStart = 7;
    const quoteRows = scopedRows.map((x) => [
      x.fixtureType,
      x.alternateManufacturer || x.specifiedManufacturer,
      x.alternateCatalog || x.specifiedCatalog,
      x.description,
      x.quantity ?? 0,
      "",
      "",
    ]);
    XLSX.utils.sheet_add_aoa(ws, quoteRows, { origin: `A${dataStart}` });
    quoteRows.forEach((_, i) => {
      const row = dataStart + i;
      ws[`G${row}`] = { f: `E${row}*F${row}`, t: "n" };
    });
    ws["!cols"] = [8,18,30,32,6,10,12].map((w) => ({ wch: w }));
    XLSX.utils.book_append_sheet(wb, ws, "Quote");
    XLSX.writeFile(wb, `${fileSlug}-Quote.xlsx`);
    setNotice("Quote Excel file created from approved alternates. Add pricing in column F.");
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
          <button onClick={() => setNotice("Program Knowledge — coming soon.")}><Library />Knowledge</button>
          <button onClick={() => setNotice("Reviews — coming soon.")}><ShieldCheck />Reviews</button>
          <button onClick={() => setNotice("Exports — coming soon.")}><FileSpreadsheet />Exports</button>
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
              {projectsByCustomer.map(([customerName, group]) => (
                <optgroup key={customerName} label={customerName}>
                  {group.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </optgroup>
              ))}
              <option value="__new__">+ New project…</option>
            </select>
          </div>
          <div className="top-actions">
            <input ref={officeInput} hidden type="file" accept=".csv,.tsv,.txt,.pdf" onChange={(e) => e.target.files?.[0] && importOfficeCounts(e.target.files[0])} />
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
            <datalist id="known-customers">{customers.map((c) => <option key={c.id} value={c.name} />)}</datalist>
            <Input placeholder="Customer (optional)" value={newProjectCustomer} onChange={(e) => setNewProjectCustomer(e.target.value)} list="known-customers" style={{ maxWidth: 220 }} />
            <Button onClick={addProject}>Create project</Button>
            <Button variant="outline" onClick={() => { setShowNewProject(false); setNewProjectName(""); setNewProjectCustomer(""); }}>Cancel</Button>
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
                    <Button variant="outline" onClick={download}><Download />Export BOM</Button>
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
