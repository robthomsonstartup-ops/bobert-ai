CREATE TABLE `documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`file_name` text NOT NULL,
	`object_key` text NOT NULL,
	`content_type` text DEFAULT 'application/octet-stream' NOT NULL,
	`document_type` text DEFAULT 'other' NOT NULL,
	`revision_date` text,
	`uploaded_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `documents_object_key_unique` ON `documents` (`object_key`);--> statement-breakpoint
CREATE TABLE `fixtures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`fixture_type` text NOT NULL,
	`specified_manufacturer` text DEFAULT '' NOT NULL,
	`specified_catalog` text DEFAULT '' NOT NULL,
	`alternate_manufacturer` text DEFAULT '' NOT NULL,
	`alternate_catalog` text DEFAULT '' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`quantity` integer,
	`review_status` text DEFAULT 'unverified' NOT NULL,
	`evidence_label` text DEFAULT '' NOT NULL,
	`evidence_url` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `knowledge_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`source_fixture_id` integer,
	`category` text NOT NULL,
	`manufacturer` text NOT NULL,
	`product_family` text DEFAULT '' NOT NULL,
	`catalog_number` text NOT NULL,
	`normalized_specs` text DEFAULT '{}' NOT NULL,
	`confidence` text DEFAULT 'unverified' NOT NULL,
	`project_uses` integer DEFAULT 1 NOT NULL,
	`last_verified_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`source_fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`plan_date` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'intake' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
