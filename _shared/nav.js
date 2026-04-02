/**
 * NTA Project Dashboards — Shared Navigation
 * Auto-generates top nav + breadcrumb from DASHBOARD_REGISTRY.
 * Each project's index.html includes this script.
 */
(function () {
  'use strict';

  // Registry: add new projects here
  const DASHBOARD_REGISTRY = window.__DASHBOARD_REGISTRY || [];

  const currentPath = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';

  function buildNav() {
    const nav = document.createElement('nav');
    nav.id = 'shared-nav';
    nav.style.cssText = `
      position:sticky;top:0;z-index:100;
      background:rgba(15,17,23,0.85);backdrop-filter:blur(12px);
      border-bottom:1px solid #2a2b35;padding:0.75rem 1.5rem;
      display:flex;align-items:center;gap:1rem;flex-wrap:wrap;
    `;

    // Home link
    const home = document.createElement('a');
    home.href = '/';
    home.textContent = 'NTA Dashboards';
    home.style.cssText = 'font-weight:700;font-size:1rem;color:#818cf8;text-decoration:none;';
    nav.appendChild(home);

    // Separator
    const sep = document.createElement('span');
    sep.textContent = '|';
    sep.style.cssText = 'color:#71717a;';
    nav.appendChild(sep);

    // Project links
    DASHBOARD_REGISTRY.forEach(function (p) {
      const a = document.createElement('a');
      a.href = p.path;
      a.textContent = p.name;
      const isActive = currentPath === p.path.replace(/\/$/, '');
      a.style.cssText = `
        font-size:0.875rem;padding:0.25rem 0.75rem;border-radius:6px;text-decoration:none;
        color:${isActive ? '#e4e4e7' : '#a1a1aa'};
        background:${isActive ? '#22232d' : 'transparent'};
      `;
      nav.appendChild(a);
    });

    // Timestamp
    const ts = document.createElement('span');
    ts.style.cssText = 'margin-left:auto;font-size:0.75rem;color:#71717a;';
    ts.textContent = 'Last updated: ' + (document.querySelector('meta[name="generated-at"]')?.content || '—');
    nav.appendChild(ts);

    document.body.prepend(nav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildNav);
  } else {
    buildNav();
  }
})();
