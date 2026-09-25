// Bobert server-side intelligence adapter example.
// Deploy this behind /api/ingest. Keep API keys in server environment variables.
// This intentionally returns normalized Bobert JSON rather than provider-native output.

export async function ingest(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });

  // TODO: parse multipart/form-data and obtain source_text/file.
  const { account_hint = '', contact_hint = '', source_url = '', source_type = 'note', source_text = '' } = req.body || {};

  const prompt = `You are Bobert, a sales intelligence engine. Analyze the supplied evidence only.\n\nAccount hint: ${account_hint}\nContact hint: ${contact_hint}\nSource type: ${source_type}\nSource URL: ${source_url}\nEvidence:\n${source_text}\n\nReturn ONLY valid JSON with keys: entity, facts, inferences, unknowns, identity_conflicts, proposed_updates, next_action. Facts require evidence. Inferences must be labeled as such. Never invent company identity or contact details.`;

  // Provider adapter goes here. Example shape:
  // const result = await claudeAdapter({ prompt, file });
  // return res.json(normalize(result));

  return res.status(501).json({
    error: 'AI provider adapter not connected yet',
    contract: '/api/ingest',
    received: { account_hint, contact_hint, source_url, source_type, has_source_text: Boolean(source_text) }
  });
}

export function normalize(providerResult) {
  return {
    entity: providerResult.entity || { account: {}, contact: {} },
    facts: Array.isArray(providerResult.facts) ? providerResult.facts : [],
    inferences: Array.isArray(providerResult.inferences) ? providerResult.inferences : [],
    unknowns: Array.isArray(providerResult.unknowns) ? providerResult.unknowns : [],
    identity_conflicts: Array.isArray(providerResult.identity_conflicts) ? providerResult.identity_conflicts : [],
    proposed_updates: Array.isArray(providerResult.proposed_updates) ? providerResult.proposed_updates : [],
    next_action: providerResult.next_action || { action: '', reason: '' }
  };
}
