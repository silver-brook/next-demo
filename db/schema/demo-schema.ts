import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
export const demo = pgTable("demo", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const demoSelectSchema = createSelectSchema(demo);
export const demoUpdateSchema = createUpdateSchema(demo);
export const demoInsertSchema = createInsertSchema(demo);
