CREATE TABLE `customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	UNIQUE(`name`)
);
--> statement-breakpoint
INSERT INTO `customers` (`name`) SELECT DISTINCT `customer` FROM `projects` WHERE `customer` IS NOT NULL AND trim(`customer`) != '';--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`location` text DEFAULT '' NOT NULL,
	`plan_date` text DEFAULT '' NOT NULL,
	`customer_id` integer,
	`scope` text DEFAULT '' NOT NULL,
	`bid_due_date` text DEFAULT '' NOT NULL,
	`bid_platform` text DEFAULT '' NOT NULL,
	`package_strategy` text DEFAULT 'alternate' NOT NULL,
	`quantity_method` text DEFAULT 'manual' NOT NULL,
	`status` text DEFAULT 'intake' NOT NULL,
	`eyebrow` text DEFAULT 'FIELD INTAKE' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`default_selected_fixture_type` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "name", "location", "plan_date", "customer_id", "scope", "bid_due_date", "bid_platform", "package_strategy", "quantity_method", "status", "eyebrow", "summary", "default_selected_fixture_type", "created_at", "updated_at")
SELECT p."id", p."name", p."location", p."plan_date", c."id", p."scope", p."bid_due_date", p."bid_platform", p."package_strategy", p."quantity_method", p."status", p."eyebrow", p."summary", p."default_selected_fixture_type", p."created_at", p."updated_at"
FROM `projects` p
LEFT JOIN `customers` c ON c."name" = p."customer";--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
