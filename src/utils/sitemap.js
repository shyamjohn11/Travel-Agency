/* Builds sitemap.xml. Pure function - used by scripts/generate-sitemap.mjs and Admin > Settings. */
const STATIC = [
  ["/", "1.0", "weekly"], ["/packages", "0.9", "weekly"], ["/trips", "0.7", "monthly"],
  ["/about", "0.7", "monthly"], ["/contact", "0.8", "monthly"],
  ["/privacy-policy", "0.3", "yearly"], ["/terms-and-conditions", "0.3", "yearly"], ["/cookie-policy", "0.3", "yearly"],
];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildSitemap({ domain, categories, packages, areas, today = new Date().toISOString().slice(0, 10) }) {
  const rows = [];
  const add = (path, priority, freq, lastmod = today, image) =>
    rows.push(
      `  <url>\n    <loc>${esc(domain + path)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>${
        image ? `\n    <image:image><image:loc>${esc(image.startsWith("http") ? image : domain + image)}</image:loc></image:image>` : ""
      }\n  </url>`
    );
  STATIC.forEach(([p, pr, f]) => add(p, pr, f));
  categories.forEach((c) => add(`/packages/${c.key}`, "0.8", "weekly", today, c.image));
  packages.filter((p) => p.status === "published").forEach((p) => add(`/package/${p.slug}`, "0.7", "weekly", (p.updatedAt || today).slice(0, 10), p.image));
  areas.forEach((a) => add(`/travel-agency-in/${a.key}`, "0.6", "monthly"));
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join("\n")}\n</urlset>\n`;
}
