// Runs automatically before `npm run build` (see package.json "prebuild").
import { writeFileSync } from "node:fs";
import { CATEGORIES, PACKAGES } from "../src/data/seed.js";
import { LOCAL_AREAS } from "../src/data/localAreas.js";
import { buildSitemap } from "../src/utils/sitemap.js";

const domain = (process.env.VITE_APP_DOMAIN || "https://rjgroups.in").replace(/\/$/, "");
const xml = buildSitemap({ domain, categories: CATEGORIES, packages: PACKAGES, areas: LOCAL_AREAS });
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written (${(xml.match(/<url>/g) || []).length} URLs) for ${domain}`);
