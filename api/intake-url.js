// api/intake-url.js
// Bobert PI — URL fetch and text extraction for intake
// Accepts: { url: string }
// Returns: { text: string, title: string }
// No extra env vars needed — plain fetch

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let { url } = req.body;
  if (!url || !url.trim()) return res.status(400).json({ error: 'No URL provided' });

  // Normalize URL
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

  try {
    const fetchRes = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Bobert-Intake/1.0)',
        'Accept': 'text/html,application/xhtml+xml,text/plain',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!fetchRes.ok) {
      return res.status(200).json({
        text: '',
        title: '',
        warning: `Could not fetch URL — server returned ${fetchRes.status}`,
      });
    }

    const contentType = fetchRes.headers.get('content-type') || '';
    const rawBody = await fetchRes.text();

    let title = '';
    let text  = '';

    if (contentType.includes('text/html')) {
      // Extract title
      const titleMatch = rawBody.match(/<title[^>]*>([^<]+)<\/title>/i);
      title = titleMatch ? titleMatch[1].trim() : '';

      // Strip scripts, styles, nav, footer, header blocks
      let cleaned = rawBody
        .replace(/<script[\s\S]*?<\/script>/gi, ' ')
        .replace(/<style[\s\S]*?<\/style>/gi, ' ')
        .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
        .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
        .replace(/<header[\s\S]*?<\/header>/gi, ' ')
        .replace(/<!--[\s\S]*?-->/g, ' ');

      // Replace block-level tags with newlines to preserve structure
      cleaned = cleaned.replace(/<\/(p|div|li|tr|h[1-6]|br|section|article)>/gi, '\n');

      // Strip all remaining tags
      cleaned = cleaned.replace(/<[^>]+>/g, ' ');

      // Decode common HTML entities
      cleaned = cleaned
        .replace(/&amp;/g,  '&')
        .replace(/&lt;/g,   '<')
        .replace(/&gt;/g,   '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g,  "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–');

      // Collapse whitespace, remove blank lines beyond 2 in a row
      text = cleaned
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0)
        .join('\n')
        .replace(/\n{3,}/g, '\n\n');

    } else {
      // Plain text or other — use as-is, truncated
      text = rawBody.trim();
    }

    // Cap at 8000 chars to stay within AI token budget
    if (text.length > 8000) {
      text = text.slice(0, 8000) + '\n\n[Content truncated at 8,000 characters]';
    }

    return res.status(200).json({ text, title });

  } catch (err) {
    console.error('[intake-url]', err.message);
    // Don't hard-fail — return warning so the rest of the intake can still process
    return res.status(200).json({
      text: '',
      title: '',
      warning: `Could not fetch URL: ${err.message}`,
    });
  }
}
