/**
 * Centralised application constants.
 * Single source of truth for values used across the entire frontend.
 */

// ─── Admin Configuration ────────────────────────────────────────────────────
export const ADMIN_EMAIL = "namtechproo@gmail.com";

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
