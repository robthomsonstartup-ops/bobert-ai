// Client-side PDF text extraction for fixture schedules.
// Ported from the proven heuristic in the repo's original intake.html
// (schedule-page detection + auto/manual-fallback sizing), adapted for
// the pi/app-source React app. Runs entirely in the browser via
// PDF.js from CDN - no server round-trip for the PDF itself, only the
// extracted text goes to the extraction API.

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
  "lighting schedule", "light fixture schedule",
];
const SCHEDULE_HEADER_WORDS = [
  "type", "manufacturer", "catalog", "description", "mounting",
  "voltage", "lamp", "wattage", "remarks", "symbol",
];
const SCHEDULE_HEADER_MIN_MATCHES = 4;
const SCHEDULE_AUTO_EXTRACT_LIMIT = 80000;

function isScheduleTablePage(lowerText: string): boolean {
  const hasPhrase = SCHEDULE_PHRASES.some((p) => lowerText.indexOf(p) !== -1);
  if (hasPhrase) return true;
  const headerMatches = SCHEDULE_HEADER_WORDS.filter((w) => lowerText.indexOf(w) !== -1);
  return headerMatches.length >= SCHEDULE_HEADER_MIN_MATCHES;
}

export type PdfExtractResult = {
  text: string;
  mode: "auto" | "manual-fallback" | "none";
  schedulePageNums: number[];
  totalPages: number;
};

export async function extractPdfScheduleText(file: File): Promise<PdfExtractResult> {
  await loadPdfJs();
  const pdfjsLib = window.pdfjsLib;
  if (!pdfjsLib) throw new Error("PDF.js failed to load.");

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let firstPageText = "";
  const schedulePages: { num: number; text: string }[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    if (i === 1) firstPageText = pageText;
    if (isScheduleTablePage(pageText.toLowerCase())) schedulePages.push({ num: i, text: pageText });
  }

  const scheduleFullText = schedulePages.map((p) => `[Page ${p.num}]\n${p.text}`).join("\n\n");
  let result = `[Page 1]\n${firstPageText}`;
  let mode: PdfExtractResult["mode"] = "none";

  if (schedulePages.length === 0) {
    result += "\n\n[No pages matched fixture schedule detection in this document]";
    mode = "none";
  } else if (scheduleFullText.length <= SCHEDULE_AUTO_EXTRACT_LIMIT) {
    result += `\n\n[FIXTURE SCHEDULE CONTENT — pages ${schedulePages.map((p) => p.num).join(", ")}]\n${scheduleFullText}`;
    mode = "auto";
  } else {
    const pageNums = schedulePages.map((p) => p.num).join(", ");
    result += `\n\n[SUSPECTED FIXTURE SCHEDULE PAGES: ${pageNums}]\nCombined content (${scheduleFullText.length} characters) is too large to extract automatically. Try a smaller PDF (just the schedule sheet) or paste the schedule text directly.`;
    mode = "manual-fallback";
  }

  return { text: result, mode, schedulePageNums: schedulePages.map((p) => p.num), totalPages: pdf.numPages };
}
