import { CASE_STUDIES_INDEX, loadCaseStudy } from "./case-studies/loader";
import { INDUSTRY_NEWS_INDEX, loadIndustryNews } from "./industry-news/loader";
import { PRESS_RELEASES_INDEX, loadPressRelease } from "./press-releases/loader";
import { CPT_META, type CptEntry, type CptIndexItem, type CptType } from "./cpt-types";

export { CPT_META };
export type { CptEntry, CptIndexItem, CptType };

export const CPT: Record<
  CptType,
  { index: readonly CptIndexItem[]; load: (slug: string) => Promise<CptEntry | null> }
> = {
  "case-studies": { index: CASE_STUDIES_INDEX, load: loadCaseStudy },
  "industry-news": { index: INDUSTRY_NEWS_INDEX, load: loadIndustryNews },
  "press-releases": { index: PRESS_RELEASES_INDEX, load: loadPressRelease },
};

/** Maps the first URL segment of an old WordPress URL to a content type. */
export const CPT_BY_SEGMENT: Record<string, CptType> = {
  "case-studies": "case-studies",
  "industry-news": "industry-news",
  "press-release": "press-releases",
};
