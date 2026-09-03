ALTER TABLE `projects` ADD `customer` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `scope` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `bid_due_date` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `bid_platform` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `package_strategy` text DEFAULT 'alternate' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `quantity_method` text DEFAULT 'manual' NOT NULL;