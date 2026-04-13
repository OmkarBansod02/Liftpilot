import { db } from "@/lib/db";
import { sites, pages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const DEMO_SITE_NAME = "Liftpilot Demo";
const DEMO_SITE_URL = "http://localhost:3000/demo";
const DEMO_PAGE_TITLE = "Acme Launch — Demo Landing Page";

export async function ensureDemoPage(): Promise<{ pageId: string; siteId: string }> {
  const existingSite = await db
    .select({ id: sites.id })
    .from(sites)
    .where(eq(sites.name, DEMO_SITE_NAME))
    .limit(1);

  let siteId: string;

  if (existingSite.length > 0) {
    siteId = existingSite[0].id;
  } else {
    const [inserted] = await db
      .insert(sites)
      .values({ name: DEMO_SITE_NAME, url: DEMO_SITE_URL })
      .returning({ id: sites.id });
    siteId = inserted.id;
  }

  const existingPage = await db
    .select({ id: pages.id })
    .from(pages)
    .where(eq(pages.siteId, siteId))
    .limit(1);

  if (existingPage.length > 0) {
    return { pageId: existingPage[0].id, siteId };
  }

  const [page] = await db
    .insert(pages)
    .values({
      siteId,
      url: DEMO_SITE_URL,
      title: DEMO_PAGE_TITLE,
      primaryConversionEvent: "form_submit",
    })
    .returning({ id: pages.id });

  return { pageId: page.id, siteId };
}
