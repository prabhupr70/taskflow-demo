# Spec: Team Workload Dashboard

## 1. Vision
The Team Workload Dashboard provides a "capacity heat map" of the entire team. A user (PM/Team Lead) should be able to identify who is overloaded (red) and who has capacity (green/neutral) within 5 seconds of opening the page.

## 2. Constraints (V1)
- **Read-Only:** V1 is a diagnostic view. No task reassignment or triage directly from the dashboard.
- **Frontend-Only:** Reuses existing `GET /api/team/:id/tasks` endpoint. No new backend required for V1.
- **N+1 Acceptable:** For 7 members, parallel API calls are acceptable.

## 3. Acceptance Criteria
- **Aggregated Data:** Show total task count and a breakdown by Priority (Urgent, High, Medium, Low).
- **Overload Indicator:** A clear visual signal (color/icon) when a member exceeds capacity.
- **Threshold Definition:** 
  - Overloaded if `total_estimated_hours > 40`.
  - For tasks with NO estimate, assume a default of 4 hours.
- **Visual Consistency:** Must use `docs/design-system.md` tokens and `/frontend-design` principles.

## 4. Variant Directions
I will build three interaction models for drilling into member details:
1. **Expandable Rows:** Inline expansion of the member card.
2. **Slide-Out Panel:** A side-drawer (High-Risk/High-Reward).
3. **Modal Deep-Dive:** A standard focused popup.

## 5. Test Plan
- **Rachel Torres (ID 3):** Must show as "Overloaded" (Red) in all variants based on seed data.
- **Mark (Healthy):** Must show as "Healthy" (Green/Neutral).
- **Toggle:** A toggle on the Team page to switch between "List View" and "Workload View".
