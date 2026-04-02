/**
 * NTA Project Dashboards — Shared Navigation v2
 * Reads DASHBOARD_CONFIG from each page, generates top + mobile bottom nav.
 * Agent sets DASHBOARD_CONFIG per project; this script auto-renders.
 */
(function () {
  'use strict';

  var CFG = window.DASHBOARD_CONFIG;
  if (!CFG) return;

  var currentFile = location.pathname.split('/').pop() || 'index.html';

  // Set accent color as CSS variable
  if (CFG.accent) {
    document.documentElement.style.setProperty('--accent', CFG.accent);
  }

  // ---- Top Nav (desktop) ----
  var topEl = document.getElementById('topnav');
  if (topEl && CFG.pages) {
    var nav = document.createElement('nav');
    nav.style.cssText = 'position:sticky;top:0;z-index:100;background:var(--bg-nav);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0.5rem 1rem;display:flex;align-items:center;gap:0.5rem;overflow-x:auto;';

    // Brand
    var brand = document.createElement('a');
    brand.href = 'index.html';
    brand.innerHTML = (CFG.emoji || '') + ' <strong>' + (CFG.name || '') + '</strong>';
    brand.style.cssText = 'font-size:0.85rem;color:var(--text-primary);text-decoration:none;white-space:nowrap;margin-right:0.5rem;display:flex;align-items:center;gap:0.35rem;';
    nav.appendChild(brand);

    if (CFG.subtitle) {
      var sub = document.createElement('span');
      sub.textContent = CFG.subtitle;
      sub.style.cssText = 'font-size:0.7rem;color:var(--text-muted);white-space:nowrap;margin-right:0.75rem;';
      nav.appendChild(sub);
    }

    // Page links
    CFG.pages.forEach(function (p) {
      var a = document.createElement('a');
      a.href = p.href;
      var isActive = currentFile === p.href || (p.href === 'index.html' && currentFile === '');
      a.innerHTML = p.icon + ' ' + p.label;
      a.style.cssText = 'font-size:0.75rem;padding:0.35rem 0.6rem;border-radius:6px;text-decoration:none;white-space:nowrap;color:' + (isActive ? 'var(--text-primary)' : 'var(--text-muted)') + ';background:' + (isActive ? 'var(--bg-card)' : 'transparent') + ';' + (isActive ? 'border-bottom:2px solid var(--accent);' : '');
      nav.appendChild(a);
    });

    // Status badge
    if (CFG.statusBadge) {
      var sb = document.createElement('span');
      sb.textContent = CFG.statusBadge.text;
      sb.style.cssText = 'margin-left:auto;font-size:0.7rem;padding:2px 8px;border-radius:9999px;white-space:nowrap;background:' + (CFG.statusBadge.bg || 'rgba(239,68,68,0.2)') + ';color:' + (CFG.statusBadge.color || '#f87171') + ';';
      nav.appendChild(sb);
    }

    // Date
    var dt = document.createElement('span');
    dt.textContent = new Date().toLocaleDateString('vi-VN');
    dt.style.cssText = 'font-size:0.7rem;color:var(--text-muted);white-space:nowrap;' + (CFG.statusBadge ? '' : 'margin-left:auto;');
    nav.appendChild(dt);

    topEl.appendChild(nav);
  }

  // ---- Mobile Bottom Nav ----
  var botEl = document.getElementById('bottomnav');
  var mobilePages = CFG.mobilePages || (CFG.pages || []).slice(0, 7);
  if (botEl && mobilePages.length) {
    var mNav = document.createElement('nav');
    mNav.style.cssText = 'display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;background:var(--bg-nav);backdrop-filter:blur(12px);border-top:1px solid var(--border);padding:0.5rem 0.25rem;padding-bottom:calc(0.5rem + env(safe-area-inset-bottom));justify-content:space-around;';

    mobilePages.forEach(function (p) {
      var a = document.createElement('a');
      a.href = p.href;
      var isActive = currentFile === p.href;
      a.innerHTML = '<div style="font-size:18px;line-height:1">' + p.icon + '</div><div style="font-size:10px;margin-top:2px">' + (p.short || p.label) + '</div>';
      a.style.cssText = 'display:flex;flex-direction:column;align-items:center;text-decoration:none;padding:4px 6px;color:' + (isActive ? 'var(--accent)' : 'var(--text-muted)') + ';';
      mNav.appendChild(a);
    });

    botEl.appendChild(mNav);

    // Show mobile nav on small screens
    var style = document.createElement('style');
    style.textContent = '@media(max-width:768px){#bottomnav nav{display:flex!important;}}@media(min-width:769px){#bottomnav{display:none;}}';
    document.head.appendChild(style);
  }
})();
