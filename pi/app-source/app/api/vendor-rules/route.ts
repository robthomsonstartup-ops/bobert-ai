import { getDb } from "@/db";
import { vendorRules } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const rows = await getDb().select().from(vendorRules).orderBy(asc(vendorRules.id));
  return Response.json(rows);
}

export async function POST(request: Request) {
  const body = (await request.json()) as { matchLabel?: string; targetManufacturer?: string; includesTerms?: string };
  if (!body.matchLabel?.trim() || !body.targetManufacturer?.trim() || !body.includesTerms?.trim()) {
    return Response.json({ error: "matchLabel, targetManufacturer, and includesTerms are all required" }, { status: 400 });
  }
  const [created] = await getDb().insert(vendorRules).values({
    matchLabel: body.matchLabel.trim(),
    targetManufacturer: body.targetManufacturer.trim(),
    includesTerms: body.includesTerms.trim(),
  }).returning();
  return Response.json(created, { status: 201 });
}
