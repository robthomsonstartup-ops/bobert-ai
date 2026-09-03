import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  location: text("location").notNull().default(""),
  planDate: text("plan_date").notNull().default(""),
  customer: text("customer").notNull().default(""),
  scope: text("scope").notNull().default(""),
  bidDueDate: text("bid_due_date").notNull().default(""),
  bidPlatform: text("bid_platform").notNull().default(""),
  packageStrategy: text("package_strategy").notNull().default("alternate"),
  quantityMethod: text("quantity_method").notNull().default("manual"),
  status: text("status").notNull().default("intake"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const fixtures = sqliteTable("fixtures", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: integer("project_id").notNull().references(() => projects.id),
  fixtureType: text("fixture_type").notNull(),
  specifiedManufacturer: text("specified_manufacturer").notNull().default(""),
  specifiedCatalog: text("specified_catalog").notNull().default(""),
  alternateManufacturer: text("alternate_manufacturer").notNull().default(""),
  alternateCatalog: text("alternate_catalog").notNull().default(""),
  description: text("description").notNull().default(""),
  quantity: integer("quantity"),
  quantitySource: text("quantity_source").notNull().default("pending"),
  reviewStatus: text("review_status").notNull().default("unverified"),
  evidenceLabel: text("evidence_label").notNull().default(""),
  evidenceUrl: text("evidence_url").notNull().default(""),
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
