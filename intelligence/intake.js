// Bobert Intelligence Intake
// Browser-side capture layer. This intentionally does not claim to perform OCR or web research yet.
// It preserves the original input and creates a structured job for the intelligence engine.

(function (global) {
  const STORAGE_KEY = 'bobert_intelligence_queue_v1';

  function id(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  function readQueue() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (_) { return []; }
  }

  function writeQueue(queue) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    return queue;
  }

  function createJob(input) {
    if (!input || !input.type) throw new Error('An input type is required');
    const job = {
      job_id: id('job'),
      created_at: new Date().toISOString(),
      status: 'captured',
      input: {
        type: input.type,
        name: input.name || null,
        text: input.text || null,
        source_url: input.source_url || null,
        metadata: input.metadata || {},
      },
      stages: {
        identify: 'queued',
        extract: 'queued',
        expand: 'queued',
        verify: 'queued',
        decide: 'queued',
        act: 'queued',
        learn: 'queued',
      },
      evidence_policy: 'No unsupported inference may be presented as verified fact.',
    };
    const queue = readQueue();
    queue.unshift(job);
    writeQueue(queue);
    return job;
  }

  function queueCount() { return readQueue().length; }

  global.BobertIntake = { createJob, readQueue, writeQueue, queueCount };
})(window);
