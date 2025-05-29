ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "provider_type" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "user_notification" ALTER COLUMN "notification_type" SET DATA TYPE varchar(20);