// api/sales-capture.js
// Bobert Sales Capture bridge for Apple Mail -> HubSpot -> Claude.
//
// POST body:
// {
//   "action": "analyze" | "log" | "task",
//   "email": {
//     "fromName": "Bob Bowman",
//     "fromEmail": "bob@example.com",
//     "toEmail": "rob@example.com",
//     "subject": "Subject",
//     "body": "Email body",
//     "date": "2026-09-10T14:00:00-04:00"
//   },
//   "instruction": "optional user direction",
//   "task": { "subject": "...", "dueDate": "2026-09-14" }
// }
//
// Environment variables:
//   SALES_CAPTURE_SECRET   shared secret used by the Mac Shortcut
//   HUBSPOT_ACCESS_TOKEN    HubSpot private app token
//   ANTHROPIC_API_KEY      Anthropic API key
//   ANTHROPIC_MODEL        optional; defaults to claude-sonnet-4-5

const HUBSPOT = 'https://api.hubapi.com';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';

function json(res, status, body) {
  return res.status(status).json(body);
}

function requireConfig() {
  const missing = [];
  if (!process.env.SALES_CAPTURE_SECRET) missing.push('SALES_CAPTURE_SECRET');
  if (!process.env.HUBSPOT_ACCESS_TOKEN) missing.push('HUBSPOT_ACCESS_TOKEN');
  if (!process.env.ANTHROPIC_API_KEY) missing.push('ANTHROPIC_API_KEY');
  return missing;
}

async function hubspot(path, options = {}) {
  const response = await fetch(`${HUBSPOT}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    const error = new Error(data?.message || `HubSpot ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

async function findContact(email) {
  if (!email) return null;
  const data = await hubspot('/crm/v3/objects/contacts/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
      properties: ['email', 'firstname', 'lastname', 'jobtitle', 'company', 'phone', 'lastmodifieddate'],
      limit: 1,
    }),
  });
  return data.results?.[0] || null;
}

async function getContactContext(contactId) {
  if (!contactId) return null;
  return hubspot(`/crm/v3/objects/contacts/${contactId}?properties=email,firstname,lastname,jobtitle,company,phone,lastmodifieddate&associations=companies,deals`);
}

async function findCompanyByDomain(email) {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase();
  const data = await hubspot('/crm/v3/objects/companies/search', {
    method: 'POST',
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: 'domain', operator: 'EQ', value: domain }] }],
      properties: ['name', 'domain', 'website', 'industry', 'lifecyclestage', 'hs_lastmodifieddate'],
      limit: 1,
    }),
  });
  return data.results?.[0] || null;
}

async function getRecentActivities(contactId) {
  if (!contactId) return [];
  const associations = await hubspot(`/crm/v4/objects/contacts/${contactId}/associations/emails?limit=20`).catch(() => ({ results: [] }));
  const ids = (associations.results || []).map(r => r.toObjectId).filter(Boolean).slice(-10);
  if (!ids.length) return [];

  const results = [];
  for (const id of ids) {
    const item = await hubspot(`/crm/v3/objects/emails/${id}?properties=hs_timestamp,hs_email_subject,hs_email_text,hs_email_direction,hs_email_from_email,hs_email_to_email`).catch(() => null);
    if (item) results.push(item);
  }
  return results;
}

async function callClaude(email, context, instruction) {
  const system = `You are Bobert, a sales workflow assistant for Rob Thomson at LPA CSI.
Your job is to interpret one selected Apple Mail message using the available HubSpot context.
Be concise and practical. Do not invent facts. Distinguish facts from recommendations.
Rob wants low-pressure, professional sales communication and a clean CRM.
Return valid JSON only with these fields:
{
  "summary": "what happened",
  "salesStatus": "current status",
  "hubspotMatch": "matched contact/company/deal context",
  "recommendedAction": "best next action",
  "followUpDate": "YYYY-MM-DD or null",
  "logRecommended": true,
  "taskRecommended": false,
  "replyRecommended": false,
  "replyDraft": "optional short reply or null",
  "crmNote": "short note suitable for HubSpot"
}`;

  const user = `SELECTED EMAIL\nFrom: ${email.fromName || ''} <${email.fromEmail || ''}>\nTo: ${email.toEmail || ''}\nSubject: ${email.subject || ''}\nDate: ${email.date || ''}\n\n${email.body || ''}\n\nHUBSPOT CONTEXT\n${JSON.stringify(context, null, 2)}\n\nUSER INSTRUCTION\n${instruction || 'Use your best judgment.'}`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1200,
      temperature: 0,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `Anthropic ${response.status}`);
  const text = data?.content?.map(x => x.text || '').join('') || '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Claude did not return JSON.');
  return JSON.parse(match[0]);
}

async function logEmail(email, contactId, companyId) {
  const properties = {
    hs_timestamp: email.date || new Date().toISOString(),
    hs_email_direction: 'EMAIL',
    hs_email_status: 'SENT',
    hs_email_subject: email.subject || '',
    hs_email_text: email.body || '',
    hs_email_from_email: email.fromEmail || '',
    hs_email_to_email: email.toEmail || '',
  };

  const associations = [];
  if (contactId) associations.push({ to: { id: String(contactId) }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 26 }] });
  if (companyId) associations.push({ to: { id: String(companyId) }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 186 }] });

  return hubspot('/crm/v3/objects/emails', {
    method: 'POST',
    body: JSON.stringify({ properties, associations }),
  });
}

async function createTask(task, contactId, companyId) {
  const properties = {
    hs_timestamp: task.dueDate ? `${task.dueDate}T09:00:00-04:00` : new Date().toISOString(),
    hs_task_subject: task.subject || 'Sales follow-up',
    hs_task_body: task.body || '',
    hs_task_status: 'NOT_STARTED',
    hs_task_priority: task.priority || 'MEDIUM',
  };
  const associations = [];
  if (contactId) associations.push({ to: { id: String(contactId) }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 204 }] });
  if (companyId) associations.push({ to: { id: String(companyId) }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 192 }] });
  return hubspot('/crm/v3/objects/tasks', { method: 'POST', body: JSON.stringify({ properties, associations }) });
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Sales-Capture-Secret');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const missing = requireConfig();
  if (missing.length) return json(res, 500, { error: 'Missing server configuration', missing });

  if (req.headers['x-sales-capture-secret'] !== process.env.SALES_CAPTURE_SECRET) {
    return json(res, 401, { error: 'Unauthorized' });
  }

  try {
    const { action = 'analyze', email, instruction, task } = req.body || {};
    if (!email?.fromEmail && !email?.toEmail) return json(res, 400, { error: 'Email sender/recipient is required.' });

    const contact = await findContact(email.fromEmail || email.toEmail);
    const company = await findCompanyByDomain(email.fromEmail || email.toEmail);
    const context = {
      contact: contact ? await getContactContext(contact.id) : null,
      company,
      recentActivities: contact ? await getRecentActivities(contact.id) : [],
    };

    if (action === 'analyze') {
      const analysis = await callClaude(email, context, instruction);
      return json(res, 200, { ok: true, action, analysis, context });
    }

    if (action === 'log') {
      const logged = await logEmail(email, contact?.id, company?.id);
      return json(res, 200, { ok: true, action, logged, contact, company });
    }

    if (action === 'task') {
      const created = await createTask(task || {}, contact?.id, company?.id);
      return json(res, 200, { ok: true, action, task: created, contact, company });
    }

    return json(res, 400, { error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('[sales-capture]', err);
    return json(res, err.status || 500, { error: err.message, details: err.data || null });
  }
};
