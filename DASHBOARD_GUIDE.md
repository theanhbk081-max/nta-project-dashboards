# Dashboard Guide — Agent Instructions

This repo hosts static HTML dashboards deployed to Cloudflare Pages.
Each project lives in its own `/{slug}/` directory with multiple HTML pages.

## Repo Structure

```
/                           Landing page (auto-managed by project_dashboard tool)
/_shared/
  theme.css                 Shared CSS variables + component classes
  nav.js                    Auto-generates nav from DASHBOARD_CONFIG
  templates/
    overview.html           Reference template — hero, KPIs, sprints, milestones, charts
    tasks.html              Reference template — task board with filters
    milestones.html         Reference template — vertical timeline
    decisions.html          Reference template — decision cards
/{slug}/
  index.html                Project overview page (auto-generated or hand-written)
  tasks.html                Task board
  milestones.html           Milestones & roadmap
  decisions.html            Decisions log
  ...                       Any additional pages
```

## Creating a New Project

1. Create directory: `/{slug}/`
2. Copy templates from `_shared/templates/` as starting point
3. Fill in real data — replace `<!-- comments -->` with actual content
4. Set `DASHBOARD_CONFIG` in each page (see below)

## DASHBOARD_CONFIG

Every page must define this before `<div id="topnav">`:

```html
<script>
window.DASHBOARD_CONFIG = {
  name: 'Project Name',           // Brand text in nav
  subtitle: 'Page Title',         // Shown next to brand
  emoji: '📊',                    // Brand icon
  accent: '#818cf8',              // Theme color (CSS --accent)
  pages: [
    { href: 'index.html', icon: '🏠', label: 'Tổng Quan' },
    { href: 'tasks.html', icon: '✅', label: 'Tasks' },
    { href: 'milestones.html', icon: '🎯', label: 'Milestones' },
    { href: 'decisions.html', icon: '⚡', label: 'Quyết Định' },
  ],
  // Optional:
  statusBadge: { text: '🔴 AT RISK', bg: 'rgba(239,68,68,0.2)', color: '#f87171' },
  mobilePages: [...],             // Override which pages show on mobile bottom nav
};
</script>
```

The `pages` array is shared across all pages of the same project — keep it identical.

## Page HTML Skeleton

Every page follows this structure:

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Name — Page Title</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config={darkMode:'class'}</script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../_shared/theme.css">
</head>
<body class="dark">

<script>
window.DASHBOARD_CONFIG = { /* ... */ };
</script>
<div id="topnav"></div>
<div id="bottomnav"></div>

<div class="container" style="padding-top:2rem">
  <!-- PAGE CONTENT HERE -->
  <div style="margin-bottom:3rem"></div>
</div>

<script src="../_shared/nav.js"></script>
</body>
</html>
```

## Available CSS Classes

From `_shared/theme.css`:

| Class | Usage |
|-------|-------|
| `.card` | Content card with hover effect |
| `.card-glow` | Card with subtle glow shadow |
| `.stat-card` | KPI number card (centered) |
| `.stat-value` | Large number inside stat-card |
| `.stat-label` | Caption below stat-value |
| `.badge` | Inline pill (combine with variant) |
| `.badge-success` `.badge-warning` `.badge-danger` `.badge-info` `.badge-muted` `.badge-accent` | Badge color variants |
| `.progress-bar` + `.progress-fill` | Horizontal progress bar |
| `.hero` | Full-width gradient section |
| `.gradient-text` | Animated gradient text |
| `.section-header` | Section title with icon gap |
| `.milestone-item` | Timeline item (vertical line + dot) |
| `.milestone-item.done` `.at-risk` `.missed` | Milestone state colors |
| `.decision-tag` | Small decision ID tag |
| `.alert` + `.alert-danger` `.alert-warning` `.alert-info` | Alert/blocker cards |
| `.task-row` | Horizontal task row |
| `.task-id` `.task-subject` | Task row columns |
| `.filter-chip` + `.active` | Clickable filter pills |
| `.sprint-card` + `.active` `.overdue` | Sprint progress cards |
| `.table-wrap` | Responsive table wrapper |
| `.container` | Centered max-width container |

## CSS Variables

```css
--bg-primary: #0f1117    --accent: #818cf8
--bg-secondary: #1a1f35  --success: #22c55e
--bg-card: #1e2130       --warning: #eab308
--bg-card-hover: #252838 --danger: #ef4444
--border: #2d3748        --info: #3b82f6
--text-primary: #e4e4e7
--text-secondary: #a1a1aa
--text-muted: #71717a
```

## Editing Existing Pages

When updating a project page:

1. Read the current HTML file
2. Identify the section to change (KPI numbers, task rows, milestone status, etc.)
3. Edit only the changed section — don't rewrite the entire file
4. Keep `DASHBOARD_CONFIG` and `<head>` intact

Common edits:
- **Update KPI numbers**: Change values inside `.stat-value` spans
- **Update progress bars**: Change `width:XX%` in `.progress-fill` style
- **Change milestone status**: Update class (`done`, `at-risk`, `missed`) and badge text
- **Add/remove tasks**: Insert/remove `.task-row` divs
- **Add blocker**: Insert `.alert-danger` div
- **Update decision status**: Change badge from `badge-warning` to `badge-success`

## Charts (Optional)

For pages with charts, include Chart.js CDN in `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

Chart.js renders into `<canvas>` elements. See `overview.html` template for examples.

## Deploy Rules

**CRITICAL**: These rules are non-negotiable.

1. **Never** auto-deploy without explicit owner confirmation
2. Always state the target slug before publishing
3. Workflow:
   - Write/edit files locally → commit → confirm with owner → push
   - Or use `project_dashboard(action="generate", slug="...", publish=true)` with owner approval
4. The `project_dashboard` tool's `generate` action creates the auto-generated `index.html` only
5. Custom pages (milestones, decisions, etc.) are written directly by the agent

## Linking to Auto-Generated Dashboard

The `project_dashboard` tool generates `/{slug}/index.html` from live DB data.
Custom pages coexist alongside it — they share the same nav via `DASHBOARD_CONFIG`.

Typical project structure:
- `index.html` — Auto-generated by `project_dashboard(generate, slug="...")` from team_tasks DB
- `tasks.html` — Agent-written, detailed task board with business context
- `milestones.html` — Agent-written, project milestones and roadmap
- `decisions.html` — Agent-written, decision log with rationale

The auto-generated `index.html` provides live KPI data; custom pages add business narrative.
