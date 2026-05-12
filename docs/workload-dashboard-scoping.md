# Scoping Brief: Team Workload Dashboard

> **Input:** [docs/workload-dashboard-notes.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/workload-dashboard-notes.md)
> **Architecture reference:** [docs/architecture-overview.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/architecture-overview.md)
> **Scoped:** 2026-05-06 against full codebase read

---

## What You'd Need to Build

**1. `useWorkload.js` hook** *(new file: `client/src/hooks/useWorkload.js`)*
Fetches tasks for every team member via `GET /api/team/:id/tasks`, aggregates the results by priority per member, and computes an overload flag. This is the data layer for the entire feature. Pattern to follow: `useTeam.js` wraps `useApi` — `useWorkload` will call the team list first, then fan out per member.

**2. Extended `WorkloadCard.jsx`** *(new file: `client/src/components/team/WorkloadCard.jsx`)*
Extends the existing `MemberCard` layout (avatar, name, role) with a workload section beneath: total task count, priority breakdown (urgent / high / medium / low counts), and an overload indicator (color or icon). Replaces `MemberCard` on the Team page when workload data is available, or sits alongside it.

**3. Overload indicator** *(within `WorkloadCard.jsx`)*
Visual signal when a member is overloaded — colored border, warning icon, or background tint using existing CSS tokens (`--color-error: #ef4444`, `--color-warning: #f59e0b`). The threshold definition ("what counts as overloaded?") is a product decision, not an engineering one — needs to be specified before build.

**4. Updated `Team.jsx`** *(modify existing: `client/src/pages/Team.jsx`)*
Replace `useTeam` + `MemberList` with `useWorkload` + the new `WorkloadList`/`WorkloadCard` components. One file, ~10 lines changed.

---

## What Already Exists (Reuse — Don't Rebuild)

| Existing asset | File | How it's reused |
|---------------|------|----------------|
| **`GET /api/team/:id/tasks`** — per-member task list | [server/routes/teams.js](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/server/routes/teams.js) | **No new API needed.** This endpoint already returns all tasks assigned to a member, with priority included. |
| `tasks` table has `priority` + `estimated_hours` | [server/db/schema.sql](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/server/db/schema.sql) | **No database changes.** Priority breakdown and hours-based workload are already stored. |
| `MemberCard.jsx` + `MemberList.jsx` | [client/src/components/team/](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/components/team/) | Base layout (avatar initials, name, role, email) — extend rather than replace. |
| `Badge.jsx` | [client/src/components/common/Badge.jsx](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/components/common/Badge.jsx) | Maps priority strings to color tags — reuse for priority breakdown chips. |
| `useApi.js` | [client/src/hooks/useApi.js](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/hooks/useApi.js) | Base hook pattern (loading/error/data/refetch) — `useWorkload` follows the same pattern. |
| Status/overload color tokens | [client/src/styles/tokens.css](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/styles/tokens.css) | `--color-error`, `--color-warning`, `--color-success` — use these for overload color coding, no new styles needed. |
| `isOverdue()`, `formatRelativeDate()` | [client/src/utils/format-date.js](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/client/src/utils/format-date.js) | Reuse for overdue task highlighting within a member's workload. |
| Seed data has intentional imbalance | [server/db/seed.sql](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/server/db/seed.sql) | Rachel (ID 3) is seeded with 14 tasks, multiple urgent. The overload indicator will fire on real data immediately — no test setup needed. |

---

## Dependencies & Unknowns

**1. N+1 API calls — acceptable for now, conversation needed for scale**
Fetching workload for 7 members means 7 separate calls to `GET /api/team/:id/tasks`. For 7 members this is fine. For a real product with 50+ members it would be a problem. Two paths: (a) accept N+1 for v1 given demo scale, or (b) add a new `GET /api/team/workload` endpoint that returns all members with task summaries in one call. This is an engineering conversation to have before committing to the hook design.

**2. Overload threshold — product decision, not code**
The notes say "way too many high-priority items" — but the code needs a number. Is it: total tasks > N? Urgent+high count > N? Percentage of capacity based on `estimated_hours`? This must be defined before a developer writes the overload flag logic. **Owner: PM (you), not engineering.**

**3. Triage / reassignment from dashboard — strong candidate for v2**
The notes flag "click into someone's workload and see what could be reassigned." The `PUT /api/tasks/:id` endpoint exists and supports `assignee_id` updates. But the UX for in-page task reassignment (select member → pick task → confirm → update → refresh) adds meaningful complexity to the component. Recommending defer to v2. V1 scope: view workload. V2 scope: act on it.

---

## Where the Difficulty Is

| Piece | Difficulty | Why |
|-------|-----------|-----|
| `WorkloadCard.jsx` UI | 🟢 Low | Extend `MemberCard` layout, use existing tokens and `Badge`. Visual work, well-patterned. |
| `Team.jsx` update | 🟢 Low | Swap `useTeam`/`MemberList` for `useWorkload`/`WorkloadCard`. ~10 lines. |
| Priority breakdown display | 🟢 Low | `Badge.jsx` already maps priority strings to colors. Count per priority, render N badges. |
| `useWorkload.js` hook | 🟡 Medium | Parallel fetches for all members, aggregate results, handle per-member loading states. More complex than `useTeam` (which is one call). Follows existing patterns but fans out. |
| Overload threshold logic | 🟡 Medium | Not a code problem — a product decision. Once defined, the code is simple. **Blocker until PM decides the threshold.** |
| Triage / reassignment UX | 🔴 High (if v1) | Non-trivial interaction design inside a card. Modal or inline? Which tasks shown? Confirmation step? Recommend v2. |

---

## Build Summary

**This is a frontend-only feature for v1.**

- No new API endpoints required
- No database schema changes
- No new CSS tokens
- 2 new files (`useWorkload.js`, `WorkloadCard.jsx`) + 1 modified file (`Team.jsx`)
- Key blocker before build: PM to define overload threshold

**Before walking into planning, ask engineering:**
- "For 7 members, are you comfortable with 7 parallel API calls, or should we add a bulk workload endpoint now?"
- "What's your estimated effort for `useWorkload.js` given the fan-out pattern?"

**Before planning, decide yourself:**
- What is the overload threshold? (e.g., total tasks > 10? urgent+high > 4?)
- Is triage/reassignment in v1 or v2?

---

> **Full architecture reference:** [docs/architecture-overview.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/architecture-overview.md)
> **Bug tracker:** [docs/bug-tracker.md](file:///c:/Prasanna/Personal/Education-Technical/CC4PMs/taskflowdemo/docs/bug-tracker.md)
