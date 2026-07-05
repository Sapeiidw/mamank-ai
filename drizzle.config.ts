import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// drizzle-kit runs outside the Next.js runtime, so load .env* ourselves.
// See node_modules/next/dist/docs/01-app/02-guides/environment-variables.md
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
