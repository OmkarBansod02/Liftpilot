import { z } from "zod";

const publicPageUrlSchema = z.string().trim().url().refine(
  (value) => {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  },
  {
    message: "URL must use http or https.",
  },
);

export const createAuditInputSchema = z.object({
  url: publicPageUrlSchema,
});

export type CreateAuditInput = z.infer<typeof createAuditInputSchema>;
