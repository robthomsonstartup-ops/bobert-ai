import { env } from "cloudflare:workers";

const SYSTEM_PROMPT = `You are a lighting fixture schedule extraction assistant for a commercial lighting sales and quoting team.

You will be given raw text extracted from a construction drawing's electrical/lighting fixture schedule page(s). This text may be messy - extracted from a table layout, columns may be jumbled, spacing may be inconsistent.

Your job: extract every distinct fixture TYPE row you can find with reasonable confidence, and return them as structured JSON.

STRICT RULES - these matter more than completeness:
- Never invent a fixture type, manufacturer, catalog number, description, or quantity that is not clearly present in the text.
- If a field is not clearly present for a given fixture type, leave it as an empty string rather than guessing.
- If you cannot confidently identify any fixture schedule rows in the text, return an empty array - do not force a result.
- Do not merge two different fixture types into one row, and do not split one fixture type into two rows.
- Do not invent additional fixture types beyond what's actually in the text.
- Preserve manufacturer names and catalog/order numbers EXACTLY as they appear, character for character. Do not normalize, correct, or "clean up" catalog numbers - a single wrong character is a real ordering error downstream.
- Mark your own confidence honestly per row. If the table formatting made a row ambiguous, say so with "low" confidence rather than silently guessing.

Return ONLY valid JSON, no markdown code fences, no commentary before or after, in this exact shape:
{
  "fixtures": [
    {
      "type": "fixture type designator as shown, e.g. A1 or D1",
      "area": "Interior or Exterior - infer from context if reasonably clear, otherwise Interior",
      "specified": "manufacturer name as shown",
      "specifiedCatalog": "catalog or order number as shown, exact characters",
      "description": "fixture description as shown",
      "qty": 0,
      "confidence": "high, medium, or low"
    }
  ]
}`;

export async function POST(request: Request) {
  let body: { text?: string };
  try {
    body = await request.json() as { text?: string };
  } catch {
    return Response.json({ error: "Request body must be JSON with a 'text' field." }, { status: 400 });
  }

  const text = body.text?.trim() ?? "";
  if (text.length < 20) {
    return Response.json({ error: "Not enough text provided. Paste more of the fixture schedule." }, { status: 400 });
  }

  const GROQ_KEY = (env as unknown as { GROQ_API_KEY?: string }).GROQ_API_KEY;
  if (!GROQ_KEY) {
    return Response.json(
      { error: "GROQ_API_KEY not configured. Add it to .dev.vars for local dev (see pi/app-source/.dev.vars.example)." },
      { status: 500 }
    );
  }

  const truncated = text.slice(0, 100000);

  let groqResponse: Response;
  try {
    groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${GROQ_KEY}` },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: truncated },
        ],
        temperature: 0.1,
        max_tokens: 4000,
      }),
    });
  } catch (err) {
    return Response.json({ error: `Could not reach Groq API: ${(err as Error).message}` }, { status: 502 });
  }

  if (!groqResponse.ok) {
    const errText = await groqResponse.text();
    return Response.json({ error: `Groq API error ${groqResponse.status}: ${errText.slice(0, 300)}` }, { status: 502 });
  }

  const data = await groqResponse.json() as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content ?? "";

  let parsed: { fixtures?: unknown };
  try {
    const cleaned = content.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
    return Response.json(
      { error: "Failed to parse the AI's response as JSON. Try again, or extract fewer pages at once.", raw: content.slice(0, 500) },
      { status: 502 }
    );
  }

  const fixtures = Array.isArray(parsed.fixtures) ? parsed.fixtures : [];
  return Response.json({ fixtures });
}
