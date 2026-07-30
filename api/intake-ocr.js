// api/intake-ocr.js
// Bobert PI — image/screenshot OCR for intake
// Accepts: { image: base64string }
// Returns: { text: string }
// Env vars: GOOGLE_API_KEY

const GOOGLE_KEY = process.env.GOOGLE_API_KEY;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { image } = req.body;
  if (!image) return res.status(400).json({ error: 'No image provided' });

  if (!GOOGLE_KEY) {
    return res.status(500).json({ error: 'GOOGLE_API_KEY not configured' });
  }

  try {
    const b64 = image.replace(/^data:image\/\w+;base64,/, '');

    const visionRes = await fetch(
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

    const data = await visionRes.json();
    if (data.error) throw new Error(data.error.message || 'Vision API error');

    const response   = data?.responses?.[0];
    const rawText    = response?.fullTextAnnotation?.text || '';
    const logos      = (response?.logoAnnotations || [])
      .filter(l => l.score > 0.5)
      .map(l => l.description);

    // Build clean text: logos first (they're high-confidence names), then OCR body
    const parts = [];
    if (logos.length > 0) parts.push(`Companies/logos detected: ${logos.join(', ')}`);
    if (rawText.trim())   parts.push(rawText.trim());

    const text = parts.join('\n\n');

    return res.status(200).json({ text: text || '(No text detected in image)' });

  } catch (err) {
    console.error('[intake-ocr]', err.message);
    return res.status(500).json({ error: err.message });
  }
}
