CREATE TABLE `claimed_rewards` (
	`id` text PRIMARY KEY NOT NULL,
	`reward_id` text NOT NULL,
	`date` text NOT NULL,
	`claimed` integer NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `reward_points` (
	`id` text PRIMARY KEY NOT NULL,
	`points` integer NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`points_to_claim` integer NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE habits_completions ADD `earned_points` integer NOT NULL;