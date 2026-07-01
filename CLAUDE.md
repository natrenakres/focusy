# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server on http://localhost:3000
npm run build    # Type-check (vue-tsc -b) then build to dist/
npm run preview  # Serve the production build
```

- Node version is pinned in `.nvmrc` (v22.18.0).
- There is **no lint script and no test suite**. Type safety is enforced by `vue-tsc` during `build` under strict TS (`strict`, `noUnusedLocals`, `noUnusedParameters` — unused code fails the build). Run `npm run build` to validate changes.

## Stack

Vue 3 (`<script setup>` SFCs) + TypeScript + Vite. Tailwind CSS v4 (configured via the `@tailwindcss/vite` plugin, not a `tailwind.config` file — theme lives in `src/style.css`). UI components are shadcn-vue (new-york style, built on `reka-ui`) under `src/components/ui/`, managed via `components.json`. Icons are `@tabler/icons-vue`. Forms use `@tanstack/vue-form` + `zod`. Toasts via `vue-sonner`. `@` is aliased to `src/`.

When adding UI primitives, prefer the shadcn-vue CLI / existing `src/components/ui/*` patterns over hand-rolling. Compose classes with `cn()` from `@/lib/utils`.

## Architecture

This is a **local-first, frontend-only** app — there is no backend in this repo. All persistence is browser `localStorage` via `@vueuse/core`'s `useStorage`. (`project/docs/04-architecture.md` describes a planned Fastify/Postgres/BetterAuth backend, but none of it is implemented yet — treat it as roadmap, not reality.)

### State management pattern (important)

There is **no Pinia**. Stores are plain composables in `src/stores/` that follow a deliberate convention: the reactive state is declared **at module scope, outside the exported function**, so every caller of `useXxxStore()` shares the same singleton state. The function only exposes actions and computed views. When editing or adding a store, keep state module-level — declaring it inside the function would silently break sharing across components.

Stores and their `localStorage` keys:
- `useProjectsStore` (`focusy:projects`) — the primary domain store. Projects own their `tasks` array; the active project is tracked by `selectedProjectId`. Holds progress/totals computeds and all task mutations (add/delete/setActive/increment pomodoro/complete). On load it runs `normalizeProject`/`normalizeTask` to backfill fields added in later versions — **add to these normalizers when introducing new persisted fields**, since old `localStorage` data won't have them.
- `useSessionStore` (`focusy:currentSession`, `focusy:sessionHistory`) — focus-session lifecycle (start/complete, expected-end-time from work-hour settings).
- `useAppSettingsStore` (`focusy:appSettings`) — weekly/daily hours, lunch break.
- `useTaskStore` (`task-list`) — legacy/standalone task list, largely superseded by tasks-inside-projects in `useProjectsStore`. Prefer the projects store for task work.

### Pomodoro engine

`src/features/usePomodoro.ts` is the timer core. It is **timestamp-based, not interval-counting**: `remaining` is computed from a persisted `startedAt` plus duration and the live `useTimestamp`, so the timer stays correct across page reloads and tab backgrounding. Status (`start`/`pause`/`stop`), state (`pomodoro`/`shortBreak`/`longBreak`), and completed count all persist under `pomodoro:*` keys. After every 4th completed pomodoro (`ONE_POMODORO_COUNT`) it switches to a long break. It fires the `onPomodoroCompleted` callback, web notifications, a sound, and updates `document.title` with the countdown.

Wiring: `PomodoroTimer.vue` instantiates `usePomodoro` (reading default durations from `VITE_*` env vars) and emits `pomodoro-completed` → `ProjectContent.vue` calls `incrementActiveTaskPomodoro(projectId)`, which credits the project's currently active task.

### Component layout

`App.vue` → shadcn `SidebarProvider` shell: `AppSidebar` (project list/nav) + `SidebarInset` (`AppHeader` + `ProjectContent`). `ProjectContent.vue` is the main pane: toolbar, pomodoro timer, progress, and task list for `selectedProject`.

### Configuration

`.env` holds `VITE_*` vars consumed at build time: pomodoro/break durations and work-hour defaults (weekly/daily hours, lunch break). Note default pomodoro values in `.env` are small (for testing); store fallbacks use the realistic 40h/8h/30min defaults.

## Project docs

The `project/` directory contains product/planning docs (vision, scope, PRDs, epics, roadmap, task breakdowns) — largely in Turkish. Consult these for product intent and v1 scope when implementing features.
