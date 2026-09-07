// Client-side PDF text extraction for fixture schedules.
// Ported from the proven heuristic in the repo's original intake.html
// (schedule-page detection + auto/manual-fallback sizing), adapted for
// the pi/app-source React app. Runs entirely in the browser via
// PDF.js from CDN - no server round-trip for the PDF itself, only the
// extracted text goes to the extraction API.
//
// Two-step design: scan the PDF for candidate schedule pages (fast,
// no API call), then let the user confirm which page(s) are actually
// the real fixture schedule before building the text that gets sent
// to the extraction API. Real drawing sets routinely have several
// pages that share generic schedule-table language (panel schedules,
// mechanical schedules, etc.) without being the lighting schedule -
// a human confirming 1-2 real pages is more reliable than a heuristic
// guessing which combination to auto-send.

declare global {
  interface Window {
    pdfjsLib?: {
      GlobalWorkerOptions: { workerSrc: string };
      getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<PdfJsDocument> };
    };
  }
}

type PdfJsDocument = {
  numPages: number;
  getPage: (n: number) => Promise<{ getTextContent: () => Promise<{ items: { str: string }[] }> }>;
};

const PDFJS_SCRIPT_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

let pdfjsLoadPromise: Promise<void> | null = null;

function loadPdfJs(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("PDF extraction only runs in the browser."));
  if (window.pdfjsLib) return Promise.resolve();
  if (pdfjsLoadPromise) return pdfjsLoadPromise;
  pdfjsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = PDFJS_SCRIPT_URL;
    script.onload = () => {
      if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js from CDN."));
    document.head.appendChild(script);
  });
  return pdfjsLoadPromise;
}

const SCHEDULE_PHRASES = [
  "fixture schedule", "luminaire schedule", "lighting fixture schedule",
  "lighting schedule", "light fixture schedule", "site lighting schedule",
  "exterior lighting schedule", "interior lighting schedule",
];
// Pages that clearly belong to a different discipline's schedule - if one of
// these appears and no lighting phrase does, don't treat it as a lighting
// schedule even if it happens to share generic header words (type,
// description, voltage, etc. show up in panel/mechanical schedules too).
const NEGATIVE_SCHEDULE_PHRASES = [
  "panel schedule", "panelboard schedule", "circuit schedule",
  "mechanical schedule", "equipment schedule", "plumbing fixture schedule",
  "door schedule", "window schedule", "diffuser schedule",
];
const SCHEDULE_HEADER_WORDS = [
  "type", "manufacturer", "catalog", "description", "mounting",
  "voltage", "lamp", "wattage", "remarks", "symbol",
];
const SCHEDULE_HEADER_MIN_MATCHES = 4;
// Must match the server's actual truncation budget in
// app/api/extract-schedule/route.ts - if these drift apart, the UI can
// report a page selection as "fits" while the server silently drops
// content past its own limit. Keep in sync.
export const SCHEDULE_AUTO_EXTRACT_LIMIT = 24000;

export type PageMatchStrength = "strong" | "weak";

function scheduleMatchStrength(lowerText: string): PageMatchStrength | "none" {
  const hasPositivePhrase = SCHEDULE_PHRASES.some((p) => lowerText.indexOf(p) !== -1);
  if (hasPositivePhrase) return "strong";
  const hasNegativePhrase = NEGATIVE_SCHEDULE_PHRASES.some((p) => lowerText.indexOf(p) !== -1);
  if (hasNegativePhrase) return "none"; // looks like a different discipline's schedule
  const headerMatches = SCHEDULE_HEADER_WORDS.filter((w) => lowerText.indexOf(w) !== -1);
  return headerMatches.length >= SCHEDULE_HEADER_MIN_MATCHES ? "weak" : "none";
}

export type ScannedPage = {
  num: number;
  text: string;
  strength: PageMatchStrength;
  preview: string; // short snippet for the confirmation UI
};

export type PdfScanResult = {
  fileName: string;
  totalPages: number;
  firstPageText: string;
  candidates: ScannedPage[]; // sorted: strong matches first, then weak, page-order within each
};

function buildPreview(text: string): string {
  const collapsed = text.replace(/\s+/g, " ").trim();
  return collapsed.length > 160 ? collapsed.slice(0, 160) + "…" : collapsed;
}

export async function scanPdfForSchedulePages(file: File): Promise<PdfScanResult> {
  await loadPdfJs();
  const pdfjsLib = window.pdfjsLib;
  if (!pdfjsLib) throw new Error("PDF.js failed to load.");

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let firstPageText = "";
  const candidates: ScannedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    if (i === 1) firstPageText = pageText;
    const strength = scheduleMatchStrength(pageText.toLowerCase());
    if (strength !== "none") {
      candidates.push({ num: i, text: pageText, strength, preview: buildPreview(pageText) });
    }
  }

  candidates.sort((a, b) => {
    if (a.strength === b.strength) return a.num - b.num;
    return a.strength === "strong" ? -1 : 1;
  });

  return { fileName: file.name, totalPages: pdf.numPages, firstPageText, candidates };
}

export type BuiltScheduleText = {
  text: string;
  withinBudget: boolean;
  totalChars: number;
  pageNums: number[];
};

// Combines only the user-confirmed pages (no re-parsing the PDF - uses the
// text already captured during scanPdfForSchedulePages).
export function buildScheduleText(scan: PdfScanResult, selectedPageNums: number[]): BuiltScheduleText {
  const chosen = scan.candidates
    .filter((p) => selectedPageNums.includes(p.num))
    .sort((a, b) => a.num - b.num);

  const scheduleFullText = chosen.map((p) => `[Page ${p.num}]\n${p.text}`).join("\n\n");
  const text = `[Page 1]\n${scan.firstPageText}\n\n[FIXTURE SCHEDULE CONTENT — pages ${chosen.map((p) => p.num).join(", ")}]\n${scheduleFullText}`;

  return {
    text,
    withinBudget: scheduleFullText.length <= SCHEDULE_AUTO_EXTRACT_LIMIT,
    totalChars: scheduleFullText.length,
    pageNums: chosen.map((p) => p.num),
  };
}
