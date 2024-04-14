CREATE TYPE "position_type" AS ENUM (
  'developer',
  'designer',
  'techlead',
  'devops',
  'qa',
  'agile_lead'
);

CREATE TABLE "projects" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "project_id" integer DEFAULT null,
  "title" varchar,
  "description" varchar,
  "status" varchar DEFAULT 'active',
  "started_at" timestamptz,
  "created_at" timestamptz DEFAULT now(),
  "ended_at" timestamptz
);

CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "username" varchar,
  "password" varchar,
  "created_at" timestamptz DEFAULT now()
);

CREATE TABLE "tasks" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
  "project_id" integer NOT NULL,
  "title" varchar,
  "description" text,
  "is_finished" bool,
  "ended_at" timestamptz,
  "created_at" timestamptz DEFAULT now()
);

CREATE TABLE "collaborators" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "position" position_type
);

CREATE TABLE "estimations" (
  "task_id" integer NOT NULL,
  "collaborator_id" integer NOT NULL,
  "task_hour" integer
);

COMMENT ON COLUMN "tasks"."description" IS 'Content of the task';

ALTER TABLE "tasks" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "estimations" ADD FOREIGN KEY ("collaborator_id") REFERENCES "collaborators" ("id");

ALTER TABLE "estimations" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");
