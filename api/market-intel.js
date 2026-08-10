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
const prompt = `You are Bobert's Market Intelligence engine. Score how well a company fits Bobert's target vertical: commercial construction, lighting/electrical contractors, general contractors, and commercial real estate developers who need lighting/controls work.

COMPANY QUERY: ${query}

${summary}WEB SEARCH RESULTS:
${searchText || 'No search results available.'}

Return ONLY valid JSON, no other text:
{
  "companyName": "best-guess company name",
  "description": "1-2 sentence description of what the company does",
  "fitScore": 0,
  "fitReasoning": "1-2 sentences explaining the score",
  "signals": ["short factual signal 1", "short factual signal 2"]
}

fitScore must be an integer 0-100: 100 = perfect fit (GC/electrical contractor/developer in commercial construction), 0 = no relevance at all. If search results are too thin, return fitScore 0, description "Insufficient public information found.", empty signals array. Never fabricate specifics not supported by the search results.`;

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

const { query } = req.body;
if (!query || !query.trim()) {
return res.status(400).json({ error: 'Company name or URL is required.' });
}

try {
const searchResults = await tavilySearch(query);

if (!searchResults && !TAVILY_KEY) {
return res.status(200).json({ companyName: query, description: 'Search is not configured yet.', fitScore: 0, fitReasoning: 'No search data available.', signals: [] });
}

const scored = await scoreCompany(query, searchResults);

if (!scored) {
return res.status(200).json({ companyName: query, description: 'Could not generate a scored profile.', fitScore: 0, fitReasoning: 'Insufficient data.', signals: [] });
}

return res.status(200).json(scored);
} catch (err) {
console.error('[market-intel]', err.message);
return res.status(500).json({ error: err.message });
}
};
