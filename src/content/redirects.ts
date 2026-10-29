/**
 * Old WordPress URL -> new route. Applied in src/routes/$.tsx as a 301.
 * Only entries that are NOT already served at the identical path belong here.
 */
export const REDIRECTS: Record<string, string> = {
  // A case study links to this old page; the closest existing route is the client reviews page (assumption - confirm).
  "/what-our-clients-say": "/client-reviews/",
};
