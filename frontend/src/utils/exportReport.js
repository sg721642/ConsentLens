import { LEVEL_CONFIG } from "../data/appDatabase";

export default function exportPDF(results) {
  const now = new Date().toLocaleString();
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ConsentLens Audit Report</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Segoe UI',system-ui,sans-serif;background:#030712;color:#f8fafc;padding:40px}
  h1{font-size:28px;margin-bottom:4px}
  .sub{color:#94a3b8;font-size:13px;margin-bottom:32px}
  .app{background:rgba(13,21,38,0.8);border:1px solid rgba(99,102,241,0.2);border-radius:16px;padding:24px;margin-bottom:20px}
  .app-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
  .app-name{font-size:20px;font-weight:700}
  .score{font-size:36px;font-weight:800;line-height:1}
  .level{display:inline-block;padding:4px 12px;border-radius:8px;font-size:12px;font-weight:700;margin-top:4px}
  .summary{color:#94a3b8;font-size:14px;line-height:1.6;margin-bottom:16px}
  .perm{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px}
  .perm-tag{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;border:1px solid}
  .detail{color:#64748b;font-size:13px;line-height:1.5;border-top:1px solid rgba(99,102,241,0.1);padding-top:12px;margin-top:8px}
  .safer{background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.2);border-radius:10px;padding:12px;margin-top:12px}
  .safer-name{color:#10B981;font-weight:700;font-size:15px}
  .safer-reason{color:#94a3b8;font-size:12px;margin-top:4px}
  .footer{text-align:center;color:#475569;font-size:11px;margin-top:40px;padding-top:20px;border-top:1px solid rgba(99,102,241,0.1)}
</style></head><body>
<h1>ConsentLens Audit Report</h1>
<div class="sub">Generated ${now} · ArmorIQ Protocol v2.0</div>`;

  results.forEach((app) => {
    const cfg = LEVEL_CONFIG[app.level];
    const permTags = Object.entries(app.permissions)
      .map(([n, p]) => `<span class="perm-tag" style="color:${cfg.text};border-color:${cfg.borderAlpha}">${p.icon} ${n} +${p.pts}</span>`)
      .join("");

    html += `<div class="app">
  <div class="app-head">
    <div><div class="app-name">${app.name}</div><div style="color:#64748b;font-size:12px">${app.company} · ${app.category}</div></div>
    <div style="text-align:right"><div class="score" style="color:${cfg.text}">${app.score}</div><span class="level" style="color:${cfg.text};background:${cfg.bg};border:1px solid ${cfg.borderAlpha}">${cfg.icon} ${cfg.label}</span></div>
  </div>
  <div class="summary">${app.summary}</div>
  <div class="perm">${permTags}</div>
  ${app.dpdp ? '<div style="color:#EF4444;font-size:12px;font-weight:700">🇮🇳 FLAGGED UNDER DPDP ACT 2023</div>' : ''}
  <div class="detail">${app.detail}</div>
  ${app.safer ? `<div class="safer"><div class="safer-name">🛡️ ${app.safer.name} (Score: ${app.safer.score})</div><div class="safer-reason">${app.safer.reason}</div></div>` : ''}
</div>`;
  });

  html += `<div class="footer">ConsentLens · ArmorIQ Protocol · Zero data stored · ${results.length} app(s) audited</div></body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `consentlens-report-${Date.now()}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}