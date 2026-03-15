# iPhone 15 Showcase Landing Page - React, Vite, Typescript, 3D Model, Three.js, GSAP, TailwindCSS Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-black)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.169-black)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88ce02)](https://gsap.com/)

An interactive, single-page product showcase inspired by the Apple iPhone 15 Pro experience. It is built for **learning and instruction**: you get a full React + TypeScript codebase with 3D (Three.js), scroll and timeline animations (GSAP), and a responsive UI (Tailwind CSS). There is no backend or database—only frontend assets, optional error monitoring (Sentry), and a small proxy endpoint for Sentry in production. You can run it locally with no environment variables; everything is documented below for reuse and teaching.

- **Live Demo:** [https://iphone15-showcase.vercel.app/](https://iphone15-showcase.vercel.app/)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [How to Run](#how-to-run)
6. [Environment Variables & .env](#environment-variables--env)
7. [API Endpoints & Routes](#api-endpoints--routes)
8. [Components & Functionality](#components--functionality)
9. [Reusing Components in Other Projects](#reusing-components-in-other-projects)
10. [Libraries & Dependencies](#libraries--dependencies)
11. [Deployment](#deployment)
12. [Keywords](#keywords)
13. [Conclusion](#conclusion)
14. [License](#license)

---

## Project Overview

**iPhone 15 Showcase** is a frontend-only, educational landing page that demonstrates:

- **React 18** with **TypeScript** and **Vite 7** for a fast, type-safe build.
- **Three.js** (via `@react-three/fiber` and `@react-three/drei`) for an interactive 3D iPhone model with color and size toggles.
- **GSAP** for scroll-triggered and timeline-based animations (hero, highlights, features, model transitions).
- **Tailwind CSS** for layout and styling; **Lucide React** for the footer copyright icon.
- **Sentry** for error tracking and session replay, with an optional tunnel (`/api/monitoring`) so requests are not blocked by ad blockers.

The app is a **single-page application (SPA)**. All content is on one scrollable page; routing is handled by Vercel (or Netlify) rewrites so that every path serves `index.html`. There is no custom REST API for business logic—only the Sentry tunnel endpoint for monitoring.

---

## Features

| Feature                       | Description                                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3D iPhone model**           | Interactive GLB model with color (Natural, Blue, White, Black Titanium) and size (6.1" / 6.7") selection. Uses `useGLTF`, `useTexture`, and material updates.              |
| **GSAP animations**           | Hero and CTA fade-in; highlights title and links; features scroll-triggered text and image scale; model view transitions via timeline; how-it-works chip and text fade-in. |
| **Video highlights carousel** | Four product videos with play/pause/replay, progress indicators, and slide transition. State-driven with refs for video and progress elements.                             |
| **Responsive layout**         | Mobile-first layout with Tailwind breakpoints; navbar, hero video, and sections adapt to viewport.                                                                         |
| **Sentry integration**        | Error tracking, performance traces, and session replay. Events are sent via tunnel `/api/monitoring` so they work even when Sentry’s domain is blocked.                    |
| **Reusable components**       | Each section is a separate component (Navbar, Hero, Highlights, Model, Features, HowItWorks, Footer) so you can copy or adapt them in other React projects.                |

---

## Technology Stack

- **React 18.3** – UI components and hooks.
- **TypeScript 5.6** – Typed JavaScript; no `any` in app code.
- **Vite 7** – Dev server, HMR, and production build.
- **Tailwind CSS 3.4** – Utility-first CSS and theme (e.g. `screen-max-width`, `common-padding`).
- **Three.js & @react-three/fiber** – 3D scene and React bindings; **@react-three/drei** – helpers (View, OrbitControls, useGLTF, useTexture, Environment, Lightformer).
- **GSAP 3.12 & @gsap/react** – Animations and ScrollTrigger; `useGSAP` for React-safe tweens.
- **Sentry (React + Vite plugin)** – Frontend monitoring; optional source map upload when `SENTRY_AUTH_TOKEN` is set.
- **Lucide React** – Icon set (e.g. `Copyright` in Footer).
- **ESLint + typescript-eslint** – Linting and type-aware rules.

---

## Project Structure

```bash
iphone-landing/
├── .env.example                # Optional env vars template; copy to .env and see comments for learners
├── index.html                 # Entry HTML; meta tags, preloads, root div, script to main.tsx
├── package.json               # Scripts (dev, build, lint, preview) and dependencies
├── tsconfig.json              # TypeScript config for src and vite.config
├── vite.config.ts             # Alias /assets → public/assets; dev proxy /api/monitoring; Sentry plugin (optional)
├── vercel.json                # SPA rewrites: all paths → /index.html
├── netlify.toml               # Netlify build and SPA redirects (if you deploy there)
├── postcss.config.js          # PostCSS with Tailwind and Autoprefixer
├── tailwind.config.js         # Tailwind theme (colors, etc.) and content paths
├── api/
│   └── monitoring.ts          # Vercel Edge: POST /api/monitoring → forwards to Sentry ingest (tunnel)
├── public/
│   ├── vite.svg               # Favicon / app icon
│   ├── assets/
│   │   ├── images/            # SVGs (apple, search, bag, etc.), JPEGs/PNGs (hero, colors, chip, frame)
│   │   └── videos/            # MP4s (hero, smallHero, highlight-*, explore, frame)
│   └── models/
│       └── scene.glb          # 3D iPhone model used by IPhone component
└── src/
    ├── main.tsx               # Sentry.init (with tunnel), ReactDOM.createRoot, App
    ├── App.tsx                 # Root layout: Navbar, Hero, Highlights, Model, Features, HowItWorks, Footer (wrapped with Sentry.withProfiler)
    ├── index.css               # Tailwind directives and custom utility classes
    ├── vite-env.d.ts           # Vite client types reference
    ├── constants/
    │   └── index.ts            # navLists, highlightsSlides, models, sizes, footerLinks; types (HighlightSlide, ModelItem, SizeOption)
    ├── utils/
    │   ├── index.ts            # Asset URL strings (images, videos) under /assets/...
    │   └── animations.ts       # animateWithGsap (scroll-triggered), animateWithGsapTimeline (model view transition)
    └── components/
        ├── Navbar.tsx         # Header: logo, nav links, search & bag icons (fixed layout to avoid flicker)
        ├── Hero.tsx           # Title, responsive hero video, CTA; useGSAP for fade-in
        ├── Highlights.tsx     # Section heading, links, VideoCarousel
        ├── VideoCarousel.tsx  # Four videos, progress indicators, play/pause/replay
        ├── Model.tsx          # 3D section: heading, two ModelViews, color/size controls, Canvas + View.Port
        ├── ModelView.tsx      # Single 3D viewport: camera, lights, OrbitControls, IPhone (Suspense + Loader)
        ├── IPhone.tsx         # GLB mesh + dynamic color/texture from ModelItem
        ├── Lights.tsx         # Environment + Lightformers + spotLights for 3D scene
        ├── Loader.tsx         # Simple loading fallback for Suspense (3D load)
        ├── Features.tsx       # Scroll-driven text and images; explore video and copy
        ├── HowItWorks.tsx     # A17 Pro chip section: image, video, text blocks
        └── Footer.tsx         # Shop info, divider, copyright (Lucide Copyright icon + year), footer links
```

---

## How to Run

You do **not** need a `.env` file or any environment variables to run the app locally. Optional env is documented in the next section.

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd iphone-landing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

4. **Lint**

   ```bash
   npm run lint
   ```

   Uses ESLint with TypeScript and `--max-warnings 0`.

5. **Build for production**

   ```bash
   npm run build
   ```

   Output is in `dist/`. To preview:

   ```bash
   npm run preview
   ```

---

## Environment Variables & .env

- **To run the app (dev or build):** No `.env` or environment variables are required. Sentry is **off** by default; the app runs without any monitoring.

- **Template for optional variables:** The repo includes a **`.env.example`** file with commented descriptions of every optional variable. Use it as a reference or copy it to create your own `.env` when you need one:

  ```bash
  cp .env.example .env
  ```

  Then edit `.env` and uncomment only the lines you need. **Do not commit `.env`** (it is listed in `.gitignore`). Learners can read `.env.example` to see what each variable does and where to get the values.

- **Optional – Enable Sentry (when you have your own project)**  
  The Sentry setup is ready but inactive until you set:
  - **`VITE_SENTRY_DSN`** – Your Sentry DSN (e.g. `https://key@org.ingest.sentry.io/projectId`). When set, the client initializes Sentry and uses the tunnel `/api/monitoring`.
  - **`SENTRY_INGEST_URL`** – (Production) In Vercel (or your host), set this to your envelope URL (e.g. `https://org.ingest.sentry.io/api/projectId/envelope/`) so `api/monitoring.ts` can forward events. If unset, the tunnel returns 204 and no request is sent to Sentry.
  - **`VITE_SENTRY_INGEST_URL`** – (Development) Same envelope URL; when set, Vite’s proxy forwards `/api/monitoring` to it in dev.
  - **`SENTRY_AUTH_TOKEN`** – (Build) For the Sentry Vite plugin to upload source maps; only used when running `npm run build`.

  You do **not** need to add any of these to use or deploy this project; they are only for when you want to turn on Sentry with your own project. See **`.env.example`** for copy-paste templates and instructions.

---

## API Endpoints & Routes

- **Frontend:** The app is a single-page application. There are no frontend “routes” in the code; everything is one page. For deployment, **Vercel** (and optionally Netlify) rewrite all requests to `index.html` so refreshes and direct URLs work.

- **Backend / API:** There is no business-logic backend. The only “API” is:
  - **`POST /api/monitoring`**  
    Implemented in `api/monitoring.ts` (Vercel Edge). When `SENTRY_INGEST_URL` is set, the handler forwards Sentry envelopes to your ingest URL (tunnel so ad blockers don’t block `*.sentry.io`). If `SENTRY_INGEST_URL` is not set, it returns 204. The client only initializes Sentry when `VITE_SENTRY_DSN` is set; otherwise no events are sent.

---

## Components & Functionality

| Component         | Role                                                                        | Main ideas for learners                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navbar**        | Top bar: logo, nav labels, search/bag icons.                                | Fixed-size wrappers and preloaded images prevent layout shift on load.                                                                                |
| **Hero**          | Headline, hero video (responsive src), CTA.                                 | `useState` for video source by width; `useEffect` for resize listener; `useGSAP` for opacity/y animations.                                            |
| **Highlights**    | Section title, “Watch the film/event” links, carousel.                      | `useGSAP` for title and link stagger; delegates to VideoCarousel.                                                                                     |
| **VideoCarousel** | Four slides: video + text; progress bars; play/pause/replay.                | Refs for video elements and progress spans; GSAP for slide position and progress width; state for `videoId`, `isPlaying`, `isLastVideo`, etc.         |
| **Model**         | “Take a closer look”: two 3D views (small/large), color dots, size buttons. | `useRef` for camera controls and THREE.Group refs; GSAP timeline in `useEffect` when `size` changes; `animateWithGsapTimeline` swaps view visibility. |
| **ModelView**     | One 3D viewport: camera, lights, OrbitControls, IPhone.                     | Drei `View` for viewport; `OrbitControls` ref to read azimuth for state sync; `Suspense` + Loader around IPhone.                                      |
| **IPhone**        | Renders GLB meshes; applies `ModelItem` color and texture.                  | `useGLTF` for scene; `useTexture` for item image; `useEffect` to set material colors (excluding screen/glass keys).                                   |
| **Lights**        | Environment map + Lightformers + spotLights.                                | Drei `Environment` and `Lightformer`; Three.js `spotLight` for key lights.                                                                            |
| **Loader**        | Shown while 3D model loads.                                                 | Drei `Html` with a simple “Loading…” block.                                                                                                           |
| **Features**      | “Explore the full story”: headings, video, two images, two text blocks.     | `animateWithGsap` with ScrollTrigger for heading and `.g_grow` / `.g_text`; ref for video play on complete.                                           |
| **HowItWorks**    | A17 Pro chip: image, video frame, copy.                                     | `gsap.from` for chip; `animateWithGsap` for `.g_fadeIn` text.                                                                                         |
| **Footer**        | Shop text, divider, copyright (icon + year), legal links.                   | Lucide `Copyright`; `new Date().getFullYear()`; list from `footerLinks`.                                                                              |

Data flow: **constants** (nav, slides, models, sizes, footer links) and **utils** (asset URLs, animation helpers) are imported where needed. No global state library; local `useState`/`useRef` per component.

---

## Reusing Components in Other Projects

Each section is a self-contained component. To reuse:

1. Copy the component file(s) you need (e.g. `Navbar.tsx`, `Hero.tsx`).
2. Copy any dependencies:
   - **Constants:** from `constants/index.ts` (and the types if you use TypeScript).
   - **Utils:** from `utils/index.ts` (asset paths) and `utils/animations.ts` if you use GSAP helpers.
   - **Assets:** ensure the same paths exist in your `public/` (or adjust the URLs in utils).
3. Install the same libraries (React, GSAP, Tailwind, Three/drei/fiber if you use 3D).
4. Compose in your app, e.g.:

```tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* ... */}
    </main>
  );
}
```

- **Navbar:** Expects `appleImg`, `searchImg`, `bagImg` and `navLists` (from utils/constants). Replace with your own assets/links if needed.
- **Hero:** Uses `heroVideo`, `smallHeroVideo` from utils; swap for your video URLs.
- **Model + ModelView + IPhone:** Require `public/models/scene.glb` and the `models`/`sizes` constants; IPhone expects a `ModelItem` with `color` and `img`. You can reuse the same GLB or point to another model and adjust types.
- **Footer:** Uses `footerLinks` and Lucide `Copyright`; change links and copy as needed.

---

## Libraries & Dependencies

| Package                        | Purpose                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| **react / react-dom**          | Component model and DOM rendering.                                                               |
| **@gsap/react**                | `useGSAP` hook so GSAP tweens/ScrollTrigger are cleaned up when the component unmounts.          |
| **gsap**                       | Animations; `gsap.to`, `gsap.from`, `gsap.timeline`, ScrollTrigger for scroll-linked animations. |
| **three**                      | 3D library: scene, meshes, materials, lights.                                                    |
| **@react-three/fiber**         | Renders Three.js as React components (e.g. `<mesh>`, `<ambientLight>`).                          |
| **@react-three/drei**          | Helpers: `View`, `OrbitControls`, `useGLTF`, `useTexture`, `Environment`, `Lightformer`, `Html`. |
| **@sentry/react**              | Error capture, performance traces, session replay; `Sentry.init`, `Sentry.withProfiler`.         |
| **lucide-react**               | Icon components (e.g. `Copyright`).                                                              |
| **vite**                       | Dev server and production bundler.                                                               |
| **@vitejs/plugin-react**       | React Fast Refresh and JSX transform for Vite.                                                   |
| **tailwindcss**                | Utility CSS and theme.                                                                           |
| **typescript**                 | Type checking and TS support in the build.                                                       |
| **typescript-eslint / eslint** | Linting with TypeScript-aware rules.                                                             |

Example of how GSAP is used with ScrollTrigger:

```ts
// utils/animations.ts – scroll-triggered tween
animateWithGsap("#features_title", { y: 0, opacity: 1 });
// When #features_title enters view (top 85%), it animates from current state to y:0, opacity:1.
```

---

## Deployment

- **Vercel (recommended):** Connect the repo to Vercel. Build command: `npm run build`. Output directory: `dist`. Root directory: project root. `vercel.json` already contains the SPA rewrite; no extra config needed. The `api/` folder is deployed as Vercel Edge functions, so `POST /api/monitoring` works in production.

- **Netlify:** Use `netlify.toml` (build command and publish directory). Add a redirect so all paths serve `index.html` (same idea as Vercel rewrites). Note: `api/monitoring` is a Vercel Edge function; on Netlify you would need a Netlify Function or similar if you want to keep the Sentry tunnel.

---

## Keywords

iPhone 15 Showcase, Apple iPhone 15 Pro Max, React, Vite, TypeScript, Three.js, GSAP, Tailwind CSS, 3D model, product landing page, SPA, @react-three/fiber, @react-three/drei, Sentry, Vercel, error monitoring, scroll animation, interactive demo, educational project, Arnob Mahmud.

---

## Conclusion

This repository is a **learning-oriented** frontend project: a single-page iPhone 15–style showcase with 3D, animations, and monitoring. You can run it without any `.env`, reuse individual components in other React apps, and use it as a reference for React + TypeScript, Vite, Three.js, and GSAP. There is no backend or database; the only “API” is the optional Sentry tunnel for production monitoring.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
