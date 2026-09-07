import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  location: text("location").notNull().default(""),
  planDate: text("plan_date").notNull().default(""),
  // Replaces the old free-text `customer` column, which existed in the
  // schema from day one but was never actually written to by any UI
  // code (confirmed — addProject only ever sent `name`). Nullable:
  // quick field-entered projects may not have a customer assigned yet.
  customerId: integer("customer_id").references(() => customers.id),
  scope: text("scope").notNull().default(""),
  bidDueDate: text("bid_due_date").notNull().default(""),
  bidPlatform: text("bid_platform").notNull().default(""),
  packageStrategy: text("package_strategy").notNull().default("alternate"),
  quantityMethod: text("quantity_method").notNull().default("manual"),
  status: text("status").notNull().default("intake"),
  // Header copy shown in the workspace top bar. Replaces the old
  // project===\"valley\"?...:... conditionals in page.tsx — every project,
  // demo/pilot or real, carries its own display copy as data.
  eyebrow: text("eyebrow").notNull().default("FIELD INTAKE"),
  summary: text("summary").notNull().default(""),
  // Which fixture type row is selected by default when the project loads
  // (e.g. "D1", "L109"). Empty string = no default selection.
  defaultSelectedFixtureType: text("default_selected_fixture_type").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const fixtures = sqliteTable("fixtures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  fixtureType: text("fixture_type").notNull(),
  area: text("area").notNull().default("Interior"), // "Interior" | "Exterior"
  specifiedManufacturer: text("specified_manufacturer").notNull().default(""),
  specifiedCatalog: text("specified_catalog").notNull().default(""),
  alternateManufacturer: text("alternate_manufacturer").notNull().default(""),
  alternateCatalog: text("alternate_catalog").notNull().default(""),
  family: text("family").notNull().default(""),
  description: text("description").notNull().default(""),
  quantity: integer("quantity"),
  quantitySource: text("quantity_source").notNull().default("pending"),
  // "ready" | "review" | "factory" | "photometric" | "keep" — the
  // configurator's 5-state ConfigStatus enum, stored directly (not a
  // generic "unverified/verified" flag).
  reviewStatus: text("review_status").notNull().default("review"),
  exception: text("exception").notNull().default(""),
  requirements: text("requirements", { mode: "json" })
    .$type<string[]>()
    .notNull()
    .default([]),
  outOfScope: integer("out_of_scope", { mode: "boolean" }).notNull().default(false),
  evidenceLabel: text("evidence_label").notNull().default(""),
  evidenceUrl: text("evidence_url").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const vendorRules = sqliteTable("vendor_rules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  matchLabel: text("match_label").notNull(),
  targetManufacturer: text("target_manufacturer").notNull(),
  // Comma-separated match terms, same shape the UI already collects
  // (e.g. "Lightolier, Gardco"). Kept as a single text field rather than
  // JSON since it's edited as one comma-separated input in the UI.
  includesTerms: text("includes_terms").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const knowledgeRecords = sqliteTable("knowledge_records", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sourceFixtureId: integer("source_fixture_id").references(() => fixtures.id),
  category: text("category").notNull(),
  manufacturer: text("manufacturer").notNull(),
  productFamily: text("product_family").notNull().default(""),
  catalogNumber: text("catalog_number").notNull(),
  normalizedSpecs: text("normalized_specs", { mode: "json" })
    .$type<Record<string, string>>()
    .notNull()
    .default({}),
  confidence: text("confidence").notNull().default("unverified"),
  projectUses: integer("project_uses").notNull().default(1),
  lastVerifiedAt: text("last_verified_at"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").references(() => projects.id),
  fileName: text("file_name").notNull(),
  objectKey: text("object_key").notNull().unique(),
  contentType: text("content_type").notNull().default("application/octet-stream"),
  documentType: text("document_type").notNull().default("other"),
  revisionDate: text("revision_date"),
  uploadedAt: text("uploaded_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
