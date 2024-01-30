CREATE TABLE `habits_completions` (
	`id` text PRIMARY KEY NOT NULL,
	`habit_id` text NOT NULL,
	`date` text NOT NULL,
	`completed` integer NOT NULL
);
