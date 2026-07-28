// api/capture-intel.js
// Bobert field intel engine — web version
// Accepts: { photo: base64, lat, lng, note }
// Returns: { ocr, intel, contacts, location }
//
// Env vars required:
//   GOOGLE_API_KEY   — Google Cloud Vision + Places
//   TAVILY_API_KEY   — Tavily web search
//   GROQ_API_KEY     — Groq (free) AI synthesis
//   APOLLO_API_KEY   — Apollo.io contacts (optional)

const GOOGLE_KEY = process.env.GOOGLE_API_KEY;
const TAVILY_KEY = process.env.TAVILY_API_KEY;
const GROQ_KEY   = process.env.GROQ_API_KEY;
const APOLLO_KEY = process.env.APOLLO_API_KEY;

// ── Google Vision OCR ─────────────────────────────────────────────────────────

async function runVision(base64Image) {
  if (!GOOGLE_KEY) return null;
  // Strip data URL prefix if present
  const b64 = base64Image.replace(/^data:image\/\w+;base64,/, '');
  try {
    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [{
            image: { content: b64 },
            features: [
              { type: 'TEXT_DETECTION',  maxResults: 1  },
              { type: 'LOGO_DETECTION',  maxResults: 10 },
            ],
          }],
        }),
      }
    );
    const data = await res.json();
    const response   = data?.responses?.[0];
    const annotation = response?.fullTextAnnotation;
    const logos      = (response?.logoAnnotations || [])
      .filter(l => l.score > 0.5)
      .map(l => l.description);

    const rawText = annotation?.text || '';
    const lines   = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 2);

    const phones   = (rawText.match(/(\(?\d{3}\)?[\s\-.]?\d{3}[\s\-.]?\d{4})/g) || []).map(p => p.trim());
    const websites = (rawText.match(/(www\.[^\s]+|[^\s]+\.(com|net|org|co|io|build|construction))/gi) || []).map(w => w.trim());

    const companies = extractCompanyCandidates(lines, logos);
    const projectName = lines[0] || logos[0] || null;
    const squareFootage = extractSquareFootage(rawText);

    return { rawText, lines, companies, logos, phones, websites, projectName, squareFootage };
  } catch (e) {
    console.error('Vision error:', e.message);
    return null;
  }
}

function extractCompanyCandidates(lines, logos = []) {
  const skip = /^\d[\d,.\s]*\s*(SF|SQ\s*FT|ACRES?)$/i;
  const noise = /^(FOR\s+(LEASE|SALE)|COMING\s+SOON|LEASING|AVAILABLE|www\.)/i;
  const body  = lines.slice(1);
  const textCands = body.filter(l => l.length > 3 && !skip.test(l) && !noise.test(l) && /[a-zA-Z]{3}/.test(l));
  const all = [...logos, ...textCands.filter(c => !logos.some(l => l.toLowerCase() === c.toLowerCase()))];
  return all.slice(0, 6);
}

function extractSquareFootage(text) {
  const m = text.match(/([\d,]+)\s*SF/i);
  return m ? parseInt(m[1].replace(/,/g, ''), 10) : null;
}

// ── Google Places reverse geocode ─────────────────────────────────────────────

async function reverseGeocode(lat, lng) {
  if (!GOOGLE_KEY || !lat || !lng) return null;
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_KEY}`
    );
    const data = await res.json();
    return data?.results?.[0]?.formatted_address || null;
  } catch {
    return null;
  }
}

// ── Tavily search ─────────────────────────────────────────────────────────────

async function tavilySearch(query) {
  if (!TAVILY_KEY) return null;
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key:      TAVILY_KEY,
        query,
        search_depth: 'basic',
        max_results:  5,
        include_answer: true,
      }),
    });
    const data = await res.json();
    if (!data.results) return null;
    return {
      answer:  data.answer || null,
      results: data.results.map(r => ({ title: r.title, url: r.url, content: r.content?.slice(0, 500) || '' })),
    };
  } catch { return null; }
}

function buildQueries(companies, locationHint, projectName, phones, squareFootage) {
  const queries = [];
  const loc = locationHint || '';
  if (projectName && loc) queries.push(`"${projectName}" ${loc} developer real estate`);
  else if (projectName)   queries.push(`"${projectName}" developer construction commercial`);
  if (phones?.length > 0) queries.push(`${phones[0]} commercial real estate brokerage`);
  if (projectName && squareFootage) {
    queries.push(`"${projectName}" ${Math.round(squareFootage/1000)}000 SF industrial warehouse development`);
  } else if (companies.length > 0 && loc) {
    queries.push(`${companies[0]} ${loc} commercial real estate development project`);
  }
  return queries.slice(0, 3);
}

// ── Groq synthesis ────────────────────────────────────────────────────────────

async function synthesizeWithGroq(prompt) {
  if (!GROQ_KEY) return null;
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 1400,
      }),
    });
    const data = await res.json();
    if (data?.error) return null;
    return data?.choices?.[0]?.message?.content || null;
  } catch { return null; }
}

async function generateIntelCard(ocr, locationHint, searchResults, note) {
  const searchText = searchResults.filter(Boolean).map((r, i) => {
    const snips = r.results?.map(s => `- ${s.title}: ${s.content}`).join('\n') || '';
    return `Search ${i+1}:\n${r.answer ? `Summary: ${r.answer}\n` : ''}${snips}`;
  }).join('\n\n');

  const prompt = `You are Bobert, a field intelligence assistant for a commercial lighting and controls sales rep. A rep captured a construction or commercial development site. Generate a concise sales intel card.

SIGN / SITE DATA:
- Project name: ${ocr?.projectName || 'Unknown'}
- Location: ${locationHint || 'Unknown'}
- Square footage: ${ocr?.squareFootage ? ocr.squareFootage.toLocaleString() + ' SF' : 'Unknown'}
- Text on sign: ${ocr?.rawText?.slice(0, 300) || 'No OCR — voice/manual capture'}
- Companies/logos on sign: ${ocr?.companies?.join(', ') || 'None identified'}
- Rep note: ${note || 'None'}

WEB SEARCH RESULTS:
${searchText || 'No search results — Tavily key not configured.'}

Return ONLY valid JSON:
{
  "projectName": "full project name",
  "location": "city, state",
  "projectScope": "1-2 sentence description",
  "squareFootage": "SF if known or null",
  "deliveryTimeline": "expected completion or null",
  "developer": { "name": "or null", "background": "1 sentence or null", "nationalAccountPotential": true },
  "gc": { "name": "or null", "background": "or null", "routingNote": "how lighting flows through this GC" },
  "leasingAgent": { "name": null, "company": null, "phone": null },
  "keyPeople": [{ "name": "name", "title": "title", "company": "company", "angle": "outreach angle" }],
  "lightingOpportunity": "what lighting/controls scope exists",
  "routingNote": "who to contact first and why",
  "outreachPaths": [
    { "label": "Path 1", "approach": "1-2 sentence strategy" },
    { "label": "Path 2", "approach": "1-2 sentence strategy" }
  ],
  "missingInfo": "what the rep still needs to find"
}`;

  const text = await synthesizeWithGroq(prompt);
  if (!text) return null;
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

// ── Apollo contacts ───────────────────────────────────────────────────────────

async function getContacts(companyName) {
  if (!APOLLO_KEY || !companyName) return [];
  try {
    const res = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': APOLLO_KEY },
      body: JSON.stringify({
        q_organization_name: companyName,
        page: 1,
        per_page: 5,
        person_seniorities: ['owner', 'c_suite', 'vp', 'director', 'manager', 'senior'],
      }),
    });
    const data = await res.json();
    return (data.people || []).map(p => ({
      name:    [p.first_name, p.last_name].filter(Boolean).join(' '),
      title:   p.title || null,
      email:   p.email || null,
      phone:   p.phone_numbers?.[0]?.sanitized_number || null,
      linkedin: p.linkedin_url || null,
      company: p.organization?.name || companyName,
    }));
  } catch { return []; }
}

// ── Handler ───────────────────────────────────────────────────────────────────

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { photo, lat, lng, note } = req.body;

  try {
    // Run OCR and reverse geocode in parallel
    const [ocr, address] = await Promise.all([
      photo ? runVision(photo) : Promise.resolve(null),
      (lat && lng) ? reverseGeocode(lat, lng) : Promise.resolve(null),
    ]);

    const locationHint = address || (lat && lng ? `${lat.toFixed(4)}, ${lng.toFixed(4)}` : null);

    // Build search queries and run Tavily
    const companies   = ocr?.companies || [];
    const projectName = ocr?.projectName;
    const phones      = ocr?.phones || [];
    const squareFt    = ocr?.squareFootage;

    const queries = buildQueries(companies, locationHint, projectName, phones, squareFt);
    const searchResults = await Promise.all(queries.map(q => tavilySearch(q)));

    // Generate intel card and fetch contacts in parallel
    const primaryCompany = companies[0] || null;
    const [intel, contacts] = await Promise.all([
      generateIntelCard(ocr, locationHint, searchResults, note),
      primaryCompany ? getContacts(primaryCompany) : Promise.resolve([]),
    ]);

    return res.status(200).json({
      ocr,
      intel,
      contacts,
      location: { address: locationHint, lat, lng },
      sources:  queries,
    });

  } catch (err) {
    console.error('[capture-intel]', err.message);
    return res.status(500).json({ error: err.message });
  }
};
