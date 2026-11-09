# NoteHub — Personal Notes Workspace

A modern personal notes workspace built with **Next.js, React, and TypeScript**. Create an account, sign in, capture thoughts, and organize your notes in one place.

**Project type:** Individual learning / portfolio project  
**Developer:** [Dmytro Severyn](https://github.com/dlmak1)

> NoteHub uses the public GoIT NoteHub API for authentication and note storage. This repository contains the Next.js application and its server-side API proxy, **not** a self-hosted database or a custom backend service.

## Features

- **Authentication:** registration, sign-in, sign-out, session checks, and refresh handling.
- **Protected routes:** access control for notes and profile pages using the Next.js proxy.
- **Notes:** view, create, and delete notes with category tags.
- **Discoverability:** search, tag filtering, and pagination.
- **Draft recovery:** note drafts are stored locally with Zustand persistence.
- **Profile:** view account information and edit a username.
- **Thoughtful UI:** responsive layout, loading and empty states, and accessible form labels.

## Tech stack

| Area | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| State | Zustand, TanStack Query |
| Forms | Formik, Yup |
| Requests | Axios, Next.js route handlers |
| Styling | CSS Modules, modern-normalize |
| Other | React Hot Toast, react-paginate, use-debounce |

## App routes

| Path | Purpose |
| --- | --- |
| `/` | Landing page |
| `/sign-up` | Create an account |
| `/sign-in` | Sign in |
| `/notes/filter/all` | Notes workspace (requires sign-in) |
| `/notes/filter/[tag]` | Filter notes by category |
| `/profile` | Account details (requires sign-in) |
| `/profile/edit` | Update account information |

## How it works

The browser talks to **Next.js API route handlers**, which forward requests to the external NoteHub API at `https://notehub-api.goit.study`. Authentication uses cookies and session-refresh logic; protected pages redirect unauthenticated visitors to sign-in.

The landing page includes an **illustrative preview**: the example notes there are static design content and are not loaded from a real user account.

## Run locally

**Requirements:** Node.js 20.9+ and npm.

```bash
git clone https://github.com/dlmak1/09-auth.git
cd 09-auth
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Register or sign in to access your private notes.

No app-specific environment variables are currently required in this repository. The backend URL is configured in `app/api/api.ts`. **An internet connection and a working external GoIT API are required** for authentication and note operations.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint checks |
| `npm run format` | Format files with Prettier |

## Project structure

```text
app/
  (auth routes)/      # Sign-in and sign-up
  (private routes)/   # Protected notes and profile screens
  api/                # Next.js API proxy routes
  page.tsx            # Public landing page
components/           # Shared UI components
lib/
  api/                # Client and server API functions
  store/              # Zustand stores
proxy.ts              # Route access and session handling
types/                # Shared TypeScript types
```

## Roadmap

- Add an online demo deployment and screenshots.
- Improve automated test coverage and accessibility checks.
- Replace assignment-provided social preview URLs with an original project graphic.

---

Built by **[Dmytro Severyn](https://github.com/dlmak1)** as part of frontend/fullstack learning.
