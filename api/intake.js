// api/intake.js
// SUPERSEDED (Sept 2026): the fixture-schedule-to-quote job is now handled
// by pi/app-source (see pi/STATUS.md). This file still handles bid-invite
// email / RFP text intake and is left running as-is until the pi/ approach
// is verified end-to-end and Rob signs off on retiring this.
// Bobert Job Intake Engine — personal tool for CSI
// Accepts: { text } — raw pasted bid invite email, RFP, or notes
// Returns: structured intake JSON
//
// Env vars required:
//   GROQ_API_KEY — Groq (Llama 3.3 70B) AI synthesis

const GROQ_KEY = process.env.GROQ_API_KEY;

async function processIntake(text) {
  if (!GROQ_KEY) {
    throw new Error('GROQ_API_KEY not configured');
  }

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  const prompt = `You are a job intake assistant for a commercial lighting and controls sales rep.
Today's date is ${today}.
The rep has pasted a bid invite email, RFP, or project notes. Extract and organize everything into the JSON structure below.

Be literal — only mark something as "present" if it is explicitly mentioned in the text. Mark as "missing" if it is the type of document that would normally be needed but is not mentioned. Mark as "unknown" only if it is genuinely unclear.

INPUT TEXT:
"""
${text}
"""

Return ONLY valid JSON matching this exact structure. No markdown, no explanation, just JSON:
{
  "project": {
    "name": "project name or null",
    "bid_invite_title": "subject line or title if present or null",
    "gc_customer": "GC or source company name or null",
    "end_client": "owner or end client if mentioned or null",
    "location": "city, state or address or null",
    "bid_due_date": "date as written or null",
    "bid_due_time": "time as written or null",
    "job_walk_date": "pre-bid or job walk date if mentioned or null",
    "bid_board": "platform name (e.g. BuildingConnected, SmartBid) or null",
    "bid_board_link": "URL if present or null",
    "access_key": "invite code or access key if present or null",
    "scope": "brief description of project scope",
    "trade_codes": "lighting, electrical, controls, or as listed or null",
    "status": "bid/no-bid status if stated, else 'not stated'"
  },
  "contacts": [
    {
      "name": "full name",
      "company": "company",
      "role": "title or role",
      "email": "email or null",
      "phone": "phone or null",
      "source": "where this contact appeared in the text",
      "relationship": "new prospect | existing customer | unknown"
    }
  ],
  "quote_checklist": {
    "lighting_drawings": "present | missing | unknown",
    "electrical_drawings": "present | missing | unknown",
    "fixture_schedule": "present | missing | unknown",
    "lighting_specs": "present | missing | unknown",
    "controls_narrative": "present | missing | unknown",
    "controls_drawings": "present | missing | unknown",
    "bom": "present | missing | unknown",
    "addenda": "present | missing | unknown",
    "alternates": "present | missing | unknown",
    "substitution_requirements": "present | missing | unknown",
    "approved_manufacturers": "present | missing | unknown",
    "bid_form": "present | missing | unknown",
    "scope_notes": "present | missing | unknown",
    "shipping_requirements": "present | missing | unknown",
    "phasing_requirements": "present | missing | unknown"
  },
  "missing_items": [
    "prioritized list of items needed before quoting — fixture schedule first if missing, then electrical drawings, lighting plans, specs, controls scope, addenda, bid form, alternates clarification"
  ],
  "deal": {
    "deal_name": "Project Name — GC/Company",
    "stage": "Bid Received | Qualifying | Quoting | Bid Submitted | Awarded | No Bid",
    "priority": "A | B | C",
    "next_action": "specific next step",
    "follow_up_date": "suggested follow-up date based on bid due date or null",
    "internal_note": "2-3 sentence summary of opportunity and why it matters commercially"
  },
  "box_folders": {
    "01_bid_invite": ["list files or links that belong here"],
    "02_drawings": ["list files or links that belong here"],
    "03_fixture_schedule": ["list files or links that belong here"],
    "04_specs": ["list files or links that belong here"],
    "05_controls": ["list files or links that belong here"],
    "06_addenda": ["list files or links that belong here"],
    "07_vendor_quotes": [],
    "08_quote": [],
    "09_customer_communication": ["list emails or contacts that belong here"],
    "10_award_handoff": []
  },
  "flags": {
    "urgent": false,
    "urgent_reason": "reason if urgent or null",
    "quote_risk": false,
    "quote_risk_reason": "reason if at risk or null",
    "new_prospect": false,
    "files_download_needed": false,
    "files_download_note": "what needs to be retrieved or null",
    "handoff_status": "HubSpot-only intake | Ready for NetSuite job creation | Needs PM review | Needs designer review | Needs quote/BOM review"
  }
}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.1,
      max_tokens: 2000,
    }),
  });

  const data = await res.json();
  if (data?.error) throw new Error(data.error.message || 'Groq error');

  const raw = data?.choices?.[0]?.message?.content || '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON returned from AI');

  try {
    return JSON.parse(match[0]);
  } catch (e) {
    throw new Error('Failed to parse AI response as JSON');
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'No text provided' });
  }
  if (text.length > 100000) {
    return res.status(400).json({ error: 'Text too long — please trim to under 100,000 characters' });
  }

  try {
    const intake = await processIntake(text.trim());
    return res.status(200).json({ intake, processedAt: new Date().toISOString() });
  } catch (err) {
    console.error('[intake]', err.message);
    return res.status(500).json({ error: err.message });
  }
};
