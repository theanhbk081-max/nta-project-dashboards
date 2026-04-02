# NTA Project Dashboards

Auto-generated project management dashboards. Powered by GoClaw `project_dashboard` tool.

## Structure

```
/                       Landing page (lists all projects)
/_shared/               Shared theme + navigation
/{project-slug}/        Per-project dashboard (auto-generated HTML)
```

## How It Works

1. GoClaw agent calls `project_dashboard(action="generate")`
2. Tool queries live DB (tasks, members, events, memory, KG)
3. Renders single-page HTML dashboard
4. Writes to `/{project-slug}/index.html` in this repo
5. Git push triggers Cloudflare Pages auto-deploy

## Adding a New Project

The `project_dashboard` tool handles this automatically:
- Creates `/{slug}/index.html` with full dashboard
- Updates `PROJECTS` array in root `index.html`
- Agent commits and pushes

## Deploy

Connected to Cloudflare Pages via Git integration.
Push to `main` branch → auto-deploy.
