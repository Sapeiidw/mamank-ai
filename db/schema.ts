import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Example table to verify the Drizzle + Postgres setup end to end.
// Replace or extend with real domain tables as features are built.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
