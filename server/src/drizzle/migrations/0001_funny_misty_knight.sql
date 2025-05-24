ALTER TABLE "events" ADD COLUMN "status" smallint DEFAULT 1 NOT NULL;
COMMENT ON COLUMN events.status IS '狀態，1 表示正常，2 表示已刪除';