CREATE TABLE "events" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"bar_name" varchar(100) NOT NULL,
	"location" varchar(100) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"max_people" integer,
	"image_url" varchar(255),
	"price" integer,
	"host_user" bigint NOT NULL,
	"created_at" timestamp NOT NULL,
	"modify_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_host_user" ON "events" USING btree ("host_user");
