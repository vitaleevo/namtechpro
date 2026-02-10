/**
 * i18n Translation System — Modular Architecture
 *
 * Translations are split into logical modules for maintainability:
 *   - common.ts  → nav, footer, hero, stats, partners, coreBusiness, whyChoose, testimonials, cta
 *   - pages.ts   → catalog, about, contact, services, supportPage, cleanEnergyPage, eventsPage, blogPage, booking
 *
 * This index file merges them into the familiar `translations` object
 * preserving full backward compatibility with all existing components.
 */
import { commonTranslations } from './common';
import { pageTranslations } from './pages';

export type Language = 'PT' | 'EN' | 'FR';

// Deep merge helper — combines common + page translations per language
function mergeTranslations<
    C extends Record<string, unknown>,
    P extends Record<string, unknown>
>(common: C, pages: P): C & P {
    return { ...common, ...pages } as C & P;
}

export const translations = {
    PT: mergeTranslations(commonTranslations.PT, pageTranslations.PT),
    EN: mergeTranslations(commonTranslations.EN, pageTranslations.EN),
    FR: mergeTranslations(commonTranslations.FR, pageTranslations.FR),
};

export type TranslationKeys = typeof translations.PT;
