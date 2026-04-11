import { z } from "zod";

const postgresUrlSchema = z.string().min(1).refine(
  (value) => {
    try {
      const url = new URL(value);

      return url.protocol === "postgres:" || url.protocol === "postgresql:";
    } catch {
      return false;
    }
  },
  {
    message: "DATABASE_URL must be a valid Postgres connection URL.",
  },
);

const envSchema = z.object({
  DATABASE_URL: postgresUrlSchema,
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});

export type Env = z.infer<typeof envSchema>;
