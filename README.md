# RJ Groups Travel Agency - Website + Admin

React 19 + Vite. Same folder structure and gold/ink design system as before, now with an admin panel, CMS-driven packages, SEO/GEO/AEO, legal pages, preloader and 3D / scroll animations.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # also regenerates public/sitemap.xml
npm test && npm run lint
```

## Admin
- URL: `/admin` (login at `/admin/login`)
- Default login: `admin@rjgroups.in` / `RJ@Admin2026` (set `VITE_ADMIN_EMAIL` / `VITE_ADMIN_PASSWORD` in `.env`, or change it in Admin > Marketing & Settings > Security). **Change it before going live.**
- Dashboard, Packages (add / edit / duplicate / publish / delete), Categories, Enquiries & Leads (CSV export), Marketing & Settings (announcement bar, lead pop-up, GA4, Meta Pixel, WhatsApp, sitemap, backup).

### Package categories (each has its own page `/packages/<key>`)
`international`, `domestic`, `honeymoon`, `friends`, `couple`, `family`, `place` (place-wise), `offer`.

### Customisable package options
In the package editor > Customisation: add groups (single choice or multi add-ons) with per-person prices. Visitors choose options on the package page, change travellers, see a live estimate and send it as an enquiry.

## What is connected to admin
Home "Travel packages", Packages page (domestic, international, popular), category pages, package pages, category banners, announcement bar, pop-up, contact numbers, analytics IDs, sitemap export.
Still static (edit in code): About, Contact, Trips, Services, Testimonials, FAQ copy.

## Folder structure (new items marked +)
```
src/
  Layouts/            Home, Packages, About, Contact, Trips, ...
    + PackageCategory, PackageDetail, Legal, LocalSEO, Admin/*
  Components/
    + Admin-Components, Packages-Components/CategoryBrowse
  Shared-Components/  Navbar, Footer, SEO, ...
    + Preloader, CookieConsent, MarketingScripts, AnnouncementBar,
      FloatingActions, LeadPopup, Newsletter, EnquiryForm, PackageCard,
      Reveal, Tilt3D, Marquee, ScrollProgress, JsonLd
  + data/ (seed, legal text, local areas)  + services/ (db, auth)
  + hooks/  + utils/ (schema, sitemap, tracking)  + styles/extras.css
scripts/generate-sitemap.mjs   public/robots.txt, llms.txt
```

## SEO / GEO / AEO
- Unique title, description, canonical, Open Graph, geo meta per page; admin-editable per package.
- JSON-LD: TouristTrip + Offer, CollectionPage/ItemList, FAQPage, BreadcrumbList, TravelAgency (local), speakable.
- AEO: "Quick answer" block + FAQs on every category/package/local page, written from live package data.
- GEO: `llms.txt`, robots.txt allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended; local landing pages `/travel-agency-in/<city>` (edit `src/data/localAreas.js`).
- Sitemap generated at build (and downloadable from Admin).

## Marketing
Announcement bar, exit-intent lead pop-up, floating WhatsApp/call, newsletter, package quote form, UTM capture on every lead, GA4 + Meta Pixel events (consent-based).

## Legal
`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`, consent banner with Accept / Reject / Customise and a re-open link. Text is a solid template based on Indian law (DPDP Act 2023, IT Act, Consumer Protection Act 2019) - **have a lawyer review it** and check the refund/cancellation and jurisdiction wording against your real policies.

## Going live - important
Data and admin login currently live in the browser (localStorage). That means:
1. Admin edits are visible only in the browser where they were made. To publish them to all visitors you need a backend (Node/Express + database, Firebase, Supabase, or a headless CMS). All reads/writes go through `src/services/db.js` and `src/services/auth.js`, so that is the only layer to replace.
2. The login only hides the admin screens; it is not real security. Do not rely on it for sensitive data.
3. Enquiries from visitors will not reach your admin until a backend exists. Until then, WhatsApp/phone are the live channels.
4. This is a single-page app: for best SEO, prerender or server-render public pages (e.g. Vite SSG / Next.js) when you go live.
5. Replace stock photos with your own (e.g. a real Kanyakumari image) in Admin > Packages.
