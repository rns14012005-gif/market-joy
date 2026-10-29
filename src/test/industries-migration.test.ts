import { describe, expect, it } from "vitest";
import { INDUSTRIES_INDEX, loadIndustryByPath } from "@/content/industries/loader";

describe("industries migration", () => {
  it("migrated all 34 old industry URLs", () => expect(INDUSTRIES_INDEX.length).toBe(34));
  it("every entry has SEO title, description and a non-empty body", async () => {
    for (const i of INDUSTRIES_INDEX) {
      const e = await loadIndustryByPath(i.path);
      expect(e, i.path).not.toBeNull();
      expect(e!.seo.title, i.path).toBeTruthy();
      expect(e!.seo.description, i.path).toBeTruthy();
      expect(e!.html.replace(/<[^>]+>|\s/g, "").length, i.path).toBeGreaterThan(200);
    }
  });
});
