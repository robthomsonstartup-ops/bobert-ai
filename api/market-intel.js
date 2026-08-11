// api/market-intel.js
// Bobert MI engine. Accepts {query}. Returns {companyName,description,fitScore,fitReasoning,signals}
// Env: TAVILY_API_KEY, GROQ_API_KEY (same keys as capture-intel.js, no new vendor)
const TAVILY_KEY = process.env.TAVILY_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

async function tavilySearch(query) {
if (!TAVILY_KEY) return null;
try {
const res = await fetch('https://api.tavily.com/search', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ api_key: TAVILY_KEY, query, search_depth: 'basic', max_results: 5, include_answer: true }),
});
const data = await res.json();
if (!data.results) return null;
return { answer: data.answer || null, results: data.results.map(r => ({ title: r.title, url: r.url, content: r.content?.slice(0, 500) || '' })) };
} catch { return null; }
}

async function synthesizeWithGroq(prompt) {
if (!GROQ_KEY) return null;
try {
const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
method: 'POST',
headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: prompt }], temperature: 0.2, max_tokens: 900 }),
});
const data = await res.json();
if (data?.error) return null;
return data?.choices?.[0]?.message?.content || null;
} catch { return null; }
}

async function scoreCompany(query, searchResults) {
const searchText = (searchResults?.results || []).map((r, i) => `Source ${i + 1} (${r.url}): ${r.title}\n${r.content}`).join('\n\n');
const summary = searchResults?.answer ? `Search summary: ${searchResults.answer}\n\n` : '';
const prompt = `You are Bobert's Market Intelligence engine, modeled on a national account-scoring framework for construction/lighting-electrical prospecting across four target sectors: Data Center, Distribution/Warehouse, Design-Build/GC, and Electrical/MEP.

COMPANY QUERY: ${query}

${summary}WEB SEARCH RESULTS:
${searchText || 'No search results available.'}

Return ONLY valid JSON, no other text:
{
  "companyName": "best-guess company name",
  "sector": "one of: Data Center | Distribution / Warehouse | Design-Build / GC | Electrical / MEP | Other",
  "accountType": "role in the vertical, e.g. Owner / Developer / Operator, National GC, Developer / GC, National EC",
  "description": "1-2 sentence description of what the company does",
  "fitScore": 0,
  "priority": "A, B, or C -- A = strong active fit with a current trigger, B = fits but needs a sharper trigger, C = weak or no fit",
  "growthSignal": "short label for the growth driver, e.g. AI/hyperscale expansion, Build-to-suit development",
  "activePipeline": "specific active project/expansion detail found in search results -- dollar amount, square footage, building count, timeline. Use \"No specific active project found\" if search results do not support one -- never invent figures.",
  "fitReasoning": "1-2 sentences explaining the score",
  "timing": "NOW, DEVELOP, SECONDARY, or UNKNOWN",
  "reasonToCall": "one sentence -- the specific trigger that makes this company worth reaching out to now",
  "targetContacts": ["job title 1", "job title 2"],
  "nextAction": "one concrete next step, e.g. Identify decision maker / verify current project",
  "signals": ["short factual signal 1", "short factual signal 2"]
}

targetContacts must be ROLE TITLES only (e.g. VP of Construction, Director of Development, Facilities/Real Estate Director) -- never a named individual, no contact-enrichment vendor is connected yet.

Scoring guide: fitScore 90-100 / priority A = active construction or expansion happening now, clear GC/developer/owner role, lighting/electrical relevant scope. fitScore 60-89 / priority B = fits the vertical but no clear current trigger. fitScore below 60 / priority C = weak or no relevance. If search results are too thin, use fitScore 0, priority "C", activePipeline "No specific active project found", targetContacts [], signals [] -- never fabricate specifics not in the search results.`;

const text = await synthesizeWithGroq(prompt);
if (!text) return null;
const match = text.match(/\{[\s\S]*\}/);
if (!match) return null;
try { return JSON.parse(match[0]); } catch { return null; }
}

async function scoreCompanyRetailHospitality(query, searchResults) {
const searchText = (searchResults?.results || []).map((r, i) => `Source ${i + 1} (${r.url}): ${r.title}\n${r.content}`).join('\n\n');
const summary = searchResults?.answer ? `Search summary: ${searchResults.answer}\n\n` : '';

const prompt = `You are LPA CSI's Market Intelligence engine, scoring how well a company fits LPA CSI's core business: custom-designed lighting and display fixtures for retail and hospitality brands, sold as a design-and-supply relationship.

LPA CSI is NOT scoring against a fixed vertical list. The question is not "is this company in construction" -- it's "does this company need custom lighting/fixture design, and are they growing." Established accounts include Lululemon (full US/Canada design+supply rollout), Skims (store lighting build-out), and Converse (piloting custom illuminated wall, track heads, mannequin stanchion for a corporate display, evaluating rollout).

COMPANY QUERY: ${query}

${summary}WEB SEARCH RESULTS:
${searchText || 'No search results available.'}

Return ONLY valid JSON, no other text:
{
  "companyName": "best-guess company name",
  "sector": "one of: Retail - Apparel | Retail - Footwear | Retail - Other | Hospitality - Hotel | Hospitality - Restaurant | Hospitality - Other | Other",
  "accountType": "e.g. Brand / Retailer, Hotel Group, Restaurant Group",
  "description": "1-2 sentence description of what the company does",
  "fitScore": 0,
  "priority": "A, B, or C -- A = custom design need AND a real growth signal, B = custom design need present but growth signal weak or unconfirmed, or supply-only fit, C = no custom design angle and no growth signal, regardless of brand size or fame",
  "growthSignal": "short label for the expansion evidence found",
  "activePipeline": "specific pilot or rollout detail found in search results. Use \"No specific active project found\" if not supported -- never invent figures.",
  "fitReasoning": "1-2 sentences explaining the score",
  "timing": "NOW, DEVELOP, or UNKNOWN",
  "reasonToCall": "one sentence -- the specific trigger",
  "targetContacts": ["job title 1", "job title 2"],
  "nextAction": "one concrete next step",
  "signals": ["short factual signal 1", "short factual signal 2"]
}

targetContacts must be ROLE TITLES only (e.g. VP of Store Design, Director of Construction, VP of Real Estate, Director of Visual Merchandising, Facilities Director) -- never a named individual, no contact-enrichment vendor is connected yet.

Brand size and fame are NOT scoring factors on their own -- a small regional brand with a real growth signal scores higher than a famous brand with no expansion evidence.

Scoring guide -- fitScore MUST align with priority, do not set them independently: fitScore 80-100 / priority A = custom design need AND a real growth signal (pilot with expansion intent, or confirmed multi-location rollout). fitScore 40-79 / priority B = custom design need present but growth signal weak, unconfirmed, or supply-only fit. fitScore 0-39 / priority C = no custom design angle and no growth signal. If search results are too thin, use fitScore 0, priority "C", growthSignal "No expansion signal found", activePipeline "No specific active project found", targetContacts [], signals [] -- never fabricate specifics not in the search results.`;

const text = await synthesizeWithGroq(prompt);
if (!text) return null;
const match = text.match(/\{[\s\S]*\}/);
if (!match) return null;
try { return JSON.parse(match[0]); } catch { return null; }
}


module.exports = async function handler(req, res) {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
if (req.method === 'OPTIONS') return res.status(200).end();
if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

const { query, lens } = req.body;
if (!query || !query.trim()) {
return res.status(400).json({ error: 'Company name or URL is required.' });
}

try {
const searchResults = await tavilySearch(query);

if (!searchResults && !TAVILY_KEY) {
return res.status(200).json({ companyName: query, sector: 'Other', accountType: 'Unknown', description: 'Search is not configured yet.', fitScore: 0, priority: 'C', growthSignal: 'Unknown', activePipeline: 'No specific active project found', fitReasoning: 'No search data available.', timing: 'UNKNOWN', reasonToCall: 'Insufficient data.', targetContacts: [], nextAction: 'Configure search to evaluate this company.', signals: [] });
}

const scored = lens === 'retail' ? await scoreCompanyRetailHospitality(query, searchResults) : await scoreCompany(query, searchResults);

if (!scored) {
return res.status(200).json({ companyName: query, sector: 'Other', accountType: 'Unknown', description: 'Could not generate a scored profile.', fitScore: 0, priority: 'C', growthSignal: 'Unknown', activePipeline: 'No specific active project found', fitReasoning: 'Insufficient data.', timing: 'UNKNOWN', reasonToCall: 'Insufficient data.', targetContacts: [], nextAction: 'Try a more specific company name or URL.', signals: [] });
}

return res.status(200).json(scored);
} catch (err) {
console.error('[market-intel]', err.message);
return res.status(500).json({ error: err.message });
}
};
