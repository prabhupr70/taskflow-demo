# TaskFlow Bug Tracker

> **Purpose:** Track all bugs and issues found during the Builder module lessons — whether discovered by student, AI, or fixed automatically. Updated continuously across all Builder lessons.
> **How to use:** Add a new row for each new bug found or fixed. Update `Current Status` and `Priority` as work progresses. Never delete rows — use status `🟢 CLOSED` when resolved.
> **File location:** [taskflowdemo/docs/bug-tracker.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/bug-tracker.md)
> **Last updated:** 2026-05-06 17:55 PST (post Builder L2)

---

## Summary (Weekly Status Report)

| Metric | Count |
|--------|-------|
| Total items logged | 6 |
| 🔴 Open — Bugs (not started) | 2 |
| 🟡 Open — Minor bugs / monitoring | 1 |
| 🔴 Open — Blockers / decisions required | 2 |
| 🟡 Open — Architecture risk (monitor) | 1 |
| 🟢 Closed (fixed) | 0 |
| P1 — Critical | 2 |
| P2 — High | 2 |
| P3 — Low | 2 |

**Status narrative:** 6 items tracked across Builder L1–L2. Bug #1 root cause confirmed (App.jsx L33 typo — one-character fix, scheduled for L5). Bug #2 (workload dashboard) now has a complete scoping brief — frontend-only build, 2 pre-build decisions required from PM before L4. Bug #3 is a minor copy fix. Items #4–#6 are pre-build blockers and risks surfaced during L2 scoping — must be resolved before L4 (Build) begins.

---

## Bug Log

| ID | Builder # | Date + Time | Priority | Bug Description | Current Status | Comments |
|----|-----------|-------------|----------|----------------|----------------|---------|
| 1 | Builder L2 | 2026-05-06 14:37 PST | **P1 — Critical** | **Settings page renders nothing — root cause found** — NavLink in [App.jsx](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/App.jsx) L33 points to `/setting` (singular) but Route is `path="/settings"` (plural). URL mismatch — route never matches. Settings component and API both work — only the link is broken. Fix: change `to="/setting"` → `to="/settings"` in App.jsx L33. | 🔴 OPEN | Root cause confirmed in L2 via architecture analysis. One-character fix. Scheduled for Builder L5 (Ship) via git + PR. |
| 2 | Builder L1 | 2026-05-06 13:24 PST | **P2 — High** | **Team page has no workload data** — Team tab shows names, roles, avatars only. No task assignments, capacity, or priority breakdown visible. Not useful for PM planning. | 🔴 OPEN | Scoping complete — see [docs/workload-dashboard-scoping.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/workload-dashboard-scoping.md). Frontend-only build (API already exists). Build target: Builder L4. Blocked by items #4 and #5 below. |
| 3 | Builder L1 | 2026-05-06 13:33 PST | **P3 — Low** | **Copy inconsistency: "product team" vs "project" terminology** — Team page subtitle reads "Your product team members" ([Team.jsx](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/pages/Team.jsx) L14). Rest of app uses "project" language consistently. Minor UX inconsistency, no functional impact. | 🟡 OPEN | Found independently in L1 exploration. One-line fix in Team.jsx L14. No schedule yet — fix whenever convenient in L3 or L4. |
| 4 | Builder L2 | 2026-05-06 17:50 PST | **P1 — Critical (Blocker)** | **PM decision required: overload threshold not defined** — The workload dashboard overload indicator needs a concrete threshold before any code can be written. Options: total tasks > N, urgent+high count > N, or hours-based using `estimated_hours`. Without this, the `useWorkload.js` hook cannot implement the overload flag. | 🔴 OPEN | **Owner: PM (Prasanna).** Engineering cannot proceed until this is defined. Surfaced in [docs/workload-dashboard-scoping.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/workload-dashboard-scoping.md). Must resolve before Builder L4 begins. |
| 5 | Builder L2 | 2026-05-06 17:50 PST | **P2 — High (Decision)** | **Scope decision: triage/reassignment — v1 or v2?** — Feature notes mention "click into someone's workload and see what could be reassigned." The `PUT /api/tasks/:id` API exists and supports `assignee_id` updates. However, the in-page reassignment UX (select member → pick task → confirm → refresh) adds meaningful component complexity. Recommended: defer to v2. | 🔴 OPEN | **Owner: PM (Prasanna).** Recommendation is v2. PM to confirm before L4 scoping is finalized. Surfaced in [docs/workload-dashboard-scoping.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/workload-dashboard-scoping.md). |
| 6 | Builder L2 | 2026-05-06 17:50 PST | **P3 — Low (Architecture Risk)** | **N+1 API call pattern in workload hook** — Fetching tasks for 7 members requires 7 separate calls to `GET /api/team/:id/tasks`. Acceptable for demo scale (7 members). For production with 50+ members, a bulk endpoint `GET /api/team/workload` would be needed. Not a blocker for L4 but worth raising with engineering as a scale consideration. | 🟡 OPEN | Document and note in planning. Engineering to advise whether to accept N+1 for v1 or add bulk endpoint now. Surfaced via [docs/architecture-overview.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/architecture-overview.md) analysis in L2. |
| 7 | Builder L3 | 2026-05-11 12:30 PST | **P3 — Low** | **Missing Accessibility Labels** in [Tasks.jsx](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/pages/Tasks.jsx) L58 — Filter dropdowns have no `<label>` or `aria-label`. Screen readers cannot identify the purpose of these filters. | 🔴 OPEN | Found during L3 "Polish Audit". Low priority but important for accessibility compliance. |
| 8 | Builder L3 | 2026-05-11 12:30 PST | **P3 — Low** | **Hardcoded Inline Styles** in [Tasks.jsx](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/pages/Tasks.jsx) L59 — Using blobs of inline styles instead of a shared CSS class for filter dropdowns. Makes global UI updates difficult. | 🔴 OPEN | Found during L3 "Polish Audit". Debt that complicates future design changes. |
| 9 | Builder L3 | 2026-05-11 12:30 PST | **P3 — Low** | **Empty State Inconsistency** — "No tasks found" is plain text without icons. Should match the new icon-based visual language established on the Dashboard. | 🔴 OPEN | Found during L3 "Polish Audit". Minor UX polish to improve the "Empty State" feel. |
| 10 | Builder L3 | 2026-05-11 12:30 PST | **P3 — Low** | **Button Hover State Inconsistency** — Some interactive elements use `var(--color-surface-hover)` or `opacity`, while others have no visual feedback on hover. | 🔴 OPEN | Found during L3 "Polish Audit". Makes parts of the app feel "laggy" or non-interactive. |

---

## Status & Priority Legend

| Status | Meaning |
|--------|---------|
| 🔴 OPEN | Known, not yet started |
| 🟡 OPEN | Known, minor — being monitored |
| 🔵 IN PROGRESS | Actively being worked on |
| 🟢 CLOSED | Fixed and verified |
| ⏸️ DEFERRED | Acknowledged, scheduled for a specific future lesson |

| Priority | Meaning |
|----------|---------|
| P1 — Critical | Blocks core functionality or build. Must resolve before next lesson. |
| P2 — High | Degrades experience or requires a decision. Fix in current or next lesson. |
| P3 — Low | Minor / cosmetic / monitor only. No urgency. |
