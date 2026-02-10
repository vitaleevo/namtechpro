/**
 * Centralised application constants.
 * Single source of truth for values used across the entire frontend.
 */

// ─── Admin Configuration ────────────────────────────────────────────────────
// Reads from NEXT_PUBLIC_ADMIN_EMAIL environment variable.
// Set in .env.local or Vercel dashboard. Falls back to hardcoded value.
export const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "namtechproo@gmail.com";

// ─── Company Information ────────────────────────────────────────────────────
export const COMPANY_NAME = "Namtech Pro";
export const COMPANY_DOMAIN = "namtechpro.com";
export const COMPANY_DESCRIPTION =
    "Especialistas em integração de sistemas de navegação, rádio e energia industrial em Angola.";

// ─── SEO Defaults ───────────────────────────────────────────────────────────
export const SEO_DEFAULTS = {
    siteName: "Namtech Pro",
    locale: "pt_AO",
    type: "website" as const,
    twitterCard: "summary_large_image" as const,
};

// ─── Routes ─────────────────────────────────────────────────────────────────
export const BACKOFFICE_BASE = "/namtechprobackoffice";
