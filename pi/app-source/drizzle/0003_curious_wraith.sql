CREATE TABLE `vendor_rules` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`match_label` text NOT NULL,
	`target_manufacturer` text NOT NULL,
	`includes_terms` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_fixtures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`fixture_type` text NOT NULL,
	`area` text DEFAULT 'Interior' NOT NULL,
	`specified_manufacturer` text DEFAULT '' NOT NULL,
	`specified_catalog` text DEFAULT '' NOT NULL,
	`alternate_manufacturer` text DEFAULT '' NOT NULL,
	`alternate_catalog` text DEFAULT '' NOT NULL,
	`family` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`quantity` integer,
	`quantity_source` text DEFAULT 'pending' NOT NULL,
	`review_status` text DEFAULT 'review' NOT NULL,
	`exception` text DEFAULT '' NOT NULL,
	`requirements` text DEFAULT '[]' NOT NULL,
	`out_of_scope` integer DEFAULT false NOT NULL,
	`evidence_label` text DEFAULT '' NOT NULL,
	`evidence_url` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_fixtures`("id", "project_id", "fixture_type", "specified_manufacturer", "specified_catalog", "alternate_manufacturer", "alternate_catalog", "description", "quantity", "quantity_source", "review_status", "evidence_label", "evidence_url", "updated_at") SELECT "id", "project_id", "fixture_type", "specified_manufacturer", "specified_catalog", "alternate_manufacturer", "alternate_catalog", "description", "quantity", "quantity_source", "review_status", "evidence_label", "evidence_url", "updated_at" FROM `fixtures`;--> statement-breakpoint
DROP TABLE `fixtures`;--> statement-breakpoint
ALTER TABLE `__new_fixtures` RENAME TO `fixtures`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `projects` ADD `eyebrow` text DEFAULT 'FIELD INTAKE' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `summary` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `default_selected_fixture_type` text DEFAULT '' NOT NULL;
