# Namtech Pro Knowledge Base

## Project Overview
Namtech Pro is a maritime industry platform built with Next.js, Tailwind CSS, and Convex.

## Technical Stack
- **Frontend**: Next.js 15 (Turbopack), Tailwind CSS v4, Framer Motion
- **Backend**: Convex
- **Authentication**: Clerk
- **Design System**: Midnight Industrial (Transitioning back to Light Mode per user request)

## UI Migration History
### 2026-05-05: Full Removal of Solar Energy Infrastructure
- Successfully purged all references to "Energia Solar" and "Clean Energy" from the platform.
- Deleted `CleanEnergyContent.tsx` and removed the `energia-limpa` service route.
- Audited and removed all solar-related translation keys (PT, EN, FR).
- Updated SEO metadata and backoffice placeholders to focus strictly on Maritime, Industrial, and Technical services.
- The platform is now officially "solar-free".

### 2026-05-05: Reversion to Light Mode & No-Blur Policy
- The user requested to stop the Dark Mode migration and return to **Light Mode**.
- Successfully replaced all remaining `bg-slate-950` instances across `/atualidades`, `/contactos`, `/sobre`, `/termos`, `/privacidade`, `/agendamento` and their corresponding content components.
- Converted `BlogList.tsx`, `ContactContent.tsx` to Light Mode.
- Removed ALL occurrences of `backdrop-blur-*` and `blur-*` across the application (including the backoffice dashboard and modals). Replaced with solid semi-transparent backgrounds (e.g. `bg-slate-900/90`).
- Primary colors:
  - Background: `#ffffff` (White) and `#f8fafc` (Slate 50)
  - Text: `#0f172a` (Slate 900) and `#475569` (Slate 600)
  - Primary Accent: `#265398` (Namtech Blue)
  - Secondary Accent: `#F59E0B` (Gold/Orange)

## Pages & Components Tracking
### Home Page (`/`)
- **HeroSection**: `frontend/src/features/home/HeroSection.tsx`
- **ProductGrid**: `frontend/src/features/home/ProductGrid.tsx`
- **NewsSection**: `frontend/src/features/home/NewsSection.tsx`

### Service Pages (`/servicos`)
- **Main Services**: `frontend/src/features/services/ServicesContent.tsx`
- **Support**: `frontend/src/features/services/SupportContent.tsx`
- **Service Detail**: `frontend/src/features/services/ServiceDetailContent.tsx`

### Catalog (`/catalogo`)
- **Main Catalog**: `frontend/src/features/catalog/CatalogContent.tsx`
- **Product Detail**: `frontend/src/features/catalog/ProductDetailContent.tsx`

### Utility Pages
- **Contact**: `frontend/src/app/contactos/page.tsx` & `ContactContent.tsx`
- **Events**: `frontend/src/app/eventos/page.tsx` & `EventsContent.tsx`
- **Blog**: `frontend/src/app/blog/page.tsx`, `atualidades/page.tsx` & `BlogList.tsx`
- **Legal**: `privacidade/page.tsx`, `termos/page.tsx`
- **404**: `not-found.tsx`

## Known Issues
### Clerk Runtime Error
- **Error**: `failed_to_load_clerk_js_timeout`
- **Status**: The application works on production but occasionally fails on localhost due to Clerk timeout. The `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is currently set for `.dev`.

## Rules for Implementation
1. **Always Consult This File First**: Before making any change, check the status of the page/component here.
2. **Light Mode Priority**: All components must use light backgrounds (`bg-white` or `bg-slate-50`) and high-contrast dark text (`text-slate-900`). **NEVER use `bg-slate-950`** for main container backgrounds.
3. **No Blur**: Maintain the strict "no-blur" policy. Do NOT use `backdrop-blur` or `blur`. Use solid colors with opacity (e.g., `bg-black/80`).
4. **Be Direct**: Implement changes without wordy explanations.
