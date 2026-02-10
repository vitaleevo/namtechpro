/**
 * BACKWARD COMPATIBILITY re-export.
 *
 * All translations have been refactored into modular files:
 *   - translations/common.ts  (nav, footer, hero, etc.)
 *   - translations/pages.ts   (catalog, about, contact, etc.)
 *   - translations/index.ts   (merges everything)
 *
 * This file simply re-exports from the new location so that
 * all existing imports (`from './translations'`) continue to work.
 */
export { translations, type Language, type TranslationKeys } from './translations/index';
