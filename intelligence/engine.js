// Bobert Intelligence Engine
// Pure orchestration helpers. External platforms remain tools, not the OS.

const STATUSES = Object.freeze([
  'verified',
  'supported',
  'inferred',
  'unknown',
  'conflicting',
]);

const INPUT_TYPES = Object.freeze([
  'screenshot',
  'email',
  'url',
  'article',
  'note',
  'document',
  'manual_entry',
]);

function makeEvidence(input, capturedAt = new Date().toISOString()) {
  if (!input || !INPUT_TYPES.includes(input.type)) {
    throw new Error('Invalid intelligence input type');
  }

  return {
    evidence_id: input.evidence_id || `ev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type: input.type === 'screenshot' || input.type === 'document' ? 'capture' : input.type,
    source: input.source || 'user_capture',
    url: input.source_url || null,
    supports: input.supports || 'Original captured evidence',
    captured_at: capturedAt,
  };
}

function makeClaim(text, status, evidenceIds = [], confidence = 'not_applicable', notes = '') {
  if (!STATUSES.includes(status)) throw new Error(`Invalid claim status: ${status}`);
  if (!Array.isArray(evidenceIds)) throw new Error('evidenceIds must be an array');

  return {
    claim_id: `claim_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    text,
    status,
    confidence,
    evidence_ids: evidenceIds,
    notes,
  };
}

function makeResearchQuestion(question, priority = 'normal', reason = '') {
  return {
    question,
    priority,
    status: 'open',
    reason,
  };
}

function makeAction(action, reason, evidenceIds = []) {
  return {
    action,
    reason,
    evidence_ids: evidenceIds,
    status: 'recommended',
  };
}

// Prevent the most dangerous failure mode: an inference leaking into outbound copy.
function claimsAllowedForExternalUse(claims = []) {
  return claims.filter(c => c.status === 'verified' || c.status === 'supported');
}

function buildRecord({ input, entities = {}, claims = [], signals = [], researchQuestions = [], recommendedActions = [] }) {
  const capturedAt = new Date().toISOString();
  const evidence = [makeEvidence(input, capturedAt)];

  return {
    record_id: `intel_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    captured_at: capturedAt,
    inputs: [{
      type: input.type,
      source: input.source || 'user_capture',
      source_url: input.source_url || null,
      captured_by: input.captured_by || 'user',
    }],
    entities,
    claims,
    signals,
    evidence,
    research_questions: researchQuestions,
    recommended_actions: recommendedActions,
  };
}

module.exports = {
  STATUSES,
  INPUT_TYPES,
  makeEvidence,
  makeClaim,
  makeResearchQuestion,
  makeAction,
  claimsAllowedForExternalUse,
  buildRecord,
};
