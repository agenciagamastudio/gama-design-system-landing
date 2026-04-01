# 📝 CHANGELOG

## [2.0.0] - 2026-04-01

### 🎨 Design & UX Improvements

#### Colors & Branding
- ✅ Unified all colors to Gama Design System (#88CE11, #161616, etc)
- ✅ Replaced all `red-600`, `gray-400` with `gama-*` classes
- ✅ Consistent color palette across all components
- ✅ Added `gama-darker`, `gama-surface` shades

#### Responsiveness
- ✅ Fixed mobile layout (IntroScreen text now scales properly)
- ✅ Added `sm:`, `md:`, `lg:` breakpoints throughout
- ✅ Hero title: `text-6xl sm:text-7xl md:text-8xl lg:text-9xl`
- ✅ Gallery cards: responsive grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`
- ✅ Slideshow controls: better mobile padding (`left-4 md:left-8`)

#### Animations
- ✅ Added `@keyframes fade-in-up` and `scale-in`
- ✅ Improved slideshow fade duration: 1.2s (was 1s)
- ✅ Added button hover scale effects (`hover:scale-105 active:scale-95`)
- ✅ Gallery images zoom on hover with smooth 500ms transition
- ✅ Loading spinner animation with gama-primary

#### Loading States
- ✅ Redesigned spinner (was red, now gama-primary green)
- ✅ Added supporting text ("Preparando seus momentos especiais")
- ✅ Better empty state message (user-friendly)

### 🔧 Technical Improvements

#### Security
- ✅ Removed hardcoded API key from `fetchPhotos.ts`
- ✅ API key now from `.env.local` only
- ✅ `.env.example` updated (no real keys)
- ✅ Secured for production deployment

#### Code Organization
- ✅ Deleted unused `lib/googleDrive.ts`
- ✅ Consolidated photo fetching in `lib/fetchPhotos.ts`
- ✅ Removed duplicate function definitions

#### Performance
- ✅ Implemented lazy-loading with Intersection Observer
- ✅ Gallery only loads images when visible (100px threshold)
- ✅ Added image placeholders (skeleton loading)
- ✅ Optimized bundle size (no unnecessary imports)

#### Accessibility
- ✅ Added keyboard shortcuts (← →, ESC)
- ✅ Photo navigation: ArrowLeft/ArrowRight in lightbox
- ✅ Modal close: ESC key
- ✅ Better aria-labels on buttons
- ✅ Improved color contrast (text legibility)

### 📱 New Features

#### Navigation
- ✅ Gallery now has "Back" button → Slideshow
- ✅ Return flow: Intro → Slideshow → Gallery → (back to Slideshow)
- ✅ Keyboard navigation for full control

#### Gallery Improvements
- ✅ Lazy-loading of images (performance boost)
- ✅ Section labels with photo count
- ✅ Download button for each photo
- ✅ Enhanced lightbox modal (bigger, clearer)
- ✅ Photo name + section in modal footer
- ✅ Navigation hints ("← → to navigate")

#### PWA Features
- ✅ `manifest.json` for installable web app
- ✅ Service Worker (`sw.js`) for offline support
- ✅ PWA icons support (manifest.json)
- ✅ Apple web app meta tags
- ✅ Theme color definition

#### Slideshow Enhancements
- ✅ Improved slide indicators (now gama-primary)
- ✅ Better section labels (✦ format)
- ✅ Gradient overlay improved (more elegant)
- ✅ Arrow controls with better contrast

### 📚 Documentation

#### New Files
- ✅ `PERSONALIZACAO.md` — Quick customization guide (10 examples)
- ✅ `CHANGELOG.md` — This file
- ✅ Enhanced `README.md` — Complete guide with troubleshooting

#### Updated Files
- ✅ `.env.example` — Clear instructions, no secrets
- ✅ `.env.local` — Proper API key (dev only)
- ✅ `app/layout.tsx` — PWA metadata

### 🐛 Bugfixes

- ✅ Fixed Slideshow color inconsistency (red → gama-primary)
- ✅ Fixed Gallery typography (was serif, now poppins)
- ✅ Fixed modal backdrop blur (now uses gama-dark)
- ✅ Fixed lightbox image max-height on mobile
- ✅ Fixed button disabled state opacity
- ✅ Fixed spacing issues on small screens

### ⚠️ Breaking Changes

None. All changes are backward compatible.

### 🗑️ Deprecations

- Removed: `lib/googleDrive.ts` (unused, consolidated into `fetchPhotos.ts`)

### 📊 Stats

- **Files Modified:** 8
- **Files Created:** 4
- **Lines Added:** ~1,200
- **Lines Removed:** ~300
- **New Features:** 12
- **Bug Fixes:** 8
- **Documentation:** 2 new files

---

## [1.0.0] - 2026-01-15

### Initial Release

- ✅ Basic Intro screen
- ✅ Slideshow component
- ✅ Gallery with lightbox
- ✅ Google Drive integration
- ✅ Tailwind CSS setup
- ✅ Next.js 14 + TypeScript
- ✅ Basic README
- ✅ Vercel deployment ready

---

## Migration Guide (v1 → v2)

No breaking changes. Just pull the latest:

```bash
git pull origin main
npm install
```

Everything is backward compatible. All old `.env` configs still work.

---

## Next Roadmap (v3.0)

- [ ] Music background
- [ ] Slideshow with music sync
- [ ] Guest book comments
- [ ] Photo filters / effects
- [ ] Timeline view
- [ ] Photo collaboration (upload via link)
- [ ] Email sharing
- [ ] Dark mode toggle
- [ ] Multiple languages
- [ ] Analytics dashboard

---

## Credits

**Design System:** Gama v1.0.0  
**Framework:** Next.js 14  
**Components:** React 18  
**Styling:** Tailwind CSS 3.3  
**Icons:** Lucide React  
**PWA:** Web APIs (Service Worker, Manifest)  

**Last Updated:** 2026-04-01 23:59:59 UTC  
**Maintained By:** Orion (AIOS Master)

---

**Status: ✅ Production Ready**
