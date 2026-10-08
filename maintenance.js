/* =========================================================================
   ORBITE — MODE MAINTENANCE (couvre TOUTES les pages)
   -------------------------------------------------------------------------
   Pour FERMER le site   : mets  MAINTENANCE = true
   Pour le ROUVRIR       : mets  MAINTENANCE = false
   (GitHub garde le fichier en cache ~10 min : le changement n'est pas instantané.)

   Pour voir le vrai site pendant la maintenance : ouvre n'importe quelle page
   avec  ?apercu=1  (ex. orbite.kdns.fr/actus?apercu=1). Pour quitter : ?apercu=0
   ATTENTION : ce n'est PAS un verrou de sécurité (le contenu reste accessible à
   qui désactive JavaScript). C'est un écran « on revient bientôt ».
   ========================================================================= */
(function () {
  var MAINTENANCE = false;
  var RETOUR = "18h";   // texte du « Retour estimé »

  if (!MAINTENANCE) return;

  try {
    var q = location.search.match(/[?&]apercu=([01])/);
    if (q) localStorage.setItem("orbite-apercu", q[1]);
    if (localStorage.getItem("orbite-apercu") === "1") return;
  } catch (e) {}

  var css = '<style id="mt-style">' +
    'html,body{background:#0b0e17!important;margin:0}' +
    'body>*:not(#orbite-maintenance){display:none!important}' +
    '#orbite-maintenance{--bg:#0b0e17;--surface:#131826;--surface-2:#1a2133;--line:rgba(231,228,218,.11);--line-strong:rgba(231,228,218,.22);--text:#e8e5da;--text-dim:#8d93a6;--gold:#d3a85c;--gold-dim:#a9884b;--cyan:#6fa8c0;--red:#c26a5a;' +
    'position:fixed;inset:0;z-index:2147483000;overflow:auto;display:flex;flex-direction:column;background:var(--bg);color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}' +
    '#orbite-maintenance *{box-sizing:border-box}' +
    '#orbite-maintenance .mt-head{position:relative;z-index:2;background:rgba(11,14,23,.88);border-bottom:1px solid var(--line)}' +
    '#orbite-maintenance .mt-wrap{max-width:1080px;margin:0 auto;padding:0 24px;width:100%}' +
    '#orbite-maintenance .mt-head .mt-wrap{display:flex;align-items:center;justify-content:space-between;height:68px}' +
    '#orbite-maintenance .mt-logo{font-family:Fraunces,Georgia,serif;font-size:1.25rem;font-weight:600;display:flex;align-items:center;gap:9px}' +
    '#orbite-maintenance .mt-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px 1px var(--gold)}' +
    '#orbite-maintenance .mt-status{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim);display:inline-flex;align-items:center;gap:8px}' +
    '#orbite-maintenance .mt-pulse{width:7px;height:7px;border-radius:50%;background:var(--red);box-shadow:0 0 8px 1px var(--red);animation:mt-pulse 2.2s ease-in-out infinite}' +
    '@keyframes mt-pulse{0%,100%{opacity:1}50%{opacity:.35}}' +
    '#orbite-maintenance .mt-hero{position:relative;overflow:hidden;flex:1;display:flex;align-items:center}' +
    '#orbite-maintenance canvas{position:absolute;inset:0;width:100%;height:100%;opacity:.9}' +
    '#orbite-maintenance .mt-inner{position:relative;padding-top:72px;padding-bottom:72px;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:48px}' +
    '#orbite-maintenance .mt-eyebrow{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:.78rem;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:18px}' +
    '#orbite-maintenance h1{font-family:Fraunces,Georgia,serif;font-weight:600;letter-spacing:-.01em;margin:0;font-size:clamp(2.2rem,5vw,3.6rem);max-width:14ch;line-height:1.08;color:var(--text)}' +
    '#orbite-maintenance .mt-lead{max-width:46ch;color:var(--text-dim);margin:18px 0 0;font-size:1.05rem}' +
    '#orbite-maintenance .mt-card{margin-top:36px;display:inline-flex;align-items:center;gap:16px;border:1px solid var(--line-strong);border-radius:3px;padding:14px 20px;background:rgba(19,24,38,.6)}' +
    '#orbite-maintenance .mt-label{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:.72rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.07em;display:block;margin-bottom:4px}' +
    '#orbite-maintenance .mt-value{font-family:Fraunces,Georgia,serif;font-size:1.05rem;color:var(--text)}' +
    '#orbite-maintenance .mt-sep{width:1px;align-self:stretch;background:var(--line-strong)}' +
    '#orbite-maintenance .mt-btn{margin-top:28px;font:500 .92rem Inter,sans-serif;padding:11px 20px;border-radius:3px;border:1px solid var(--gold);background:var(--gold);color:#14140f;cursor:pointer}' +
    '#orbite-maintenance .mt-btn:hover{background:#e0b96f}' +
    '#orbite-maintenance .mt-art{position:relative;width:100%;max-width:380px;aspect-ratio:1;margin:0 auto}' +
    '#orbite-maintenance .mt-art svg{width:100%;height:100%;overflow:visible}' +
    '#orbite-maintenance .mt-ring{fill:none;stroke:var(--line-strong);stroke-width:1}' +
    '#orbite-maintenance .mt-dash{stroke-dasharray:2 6}' +
    '#orbite-maintenance .mt-orb{transform-origin:200px 200px;animation:mt-spin 22s linear infinite}' +
    '#orbite-maintenance .mt-slow{animation-duration:40s;animation-direction:reverse}' +
    '@keyframes mt-spin{to{transform:rotate(360deg)}}' +
    '#orbite-maintenance .mt-foot{position:relative;z-index:2;border-top:1px solid var(--line);padding:24px 0 28px;color:var(--text-dim);font-size:.85rem}' +
    '@media(max-width:820px){#orbite-maintenance .mt-inner{grid-template-columns:1fr;gap:36px;padding-top:48px;padding-bottom:56px}#orbite-maintenance .mt-art{max-width:260px;order:-1}#orbite-maintenance .mt-card{flex-wrap:wrap}}' +
    '@media(prefers-reduced-motion:reduce){#orbite-maintenance *{animation:none!important}}' +
    '</style>';

  var html = '<div id="orbite-maintenance" role="main">' +
    '<div class="mt-head"><div class="mt-wrap"><span class="mt-logo"><span class="mt-dot"></span>Orbite</span>' +
    '<span class="mt-status" role="status"><span class="mt-pulse"></span>Maintenance</span></div></div>' +
    '<div class="mt-hero"><canvas id="mt-stars" aria-hidden="true"></canvas>' +
    '<div class="mt-wrap mt-inner"><div>' +
    '<span class="mt-eyebrow">Almanach du ciel · Hors ligne</span>' +
    '<h1>Orbite fait une brève manœuvre.</h1>' +
    '<p class="mt-lead">Le site est momentanément en maintenance : nous peaufinons quelques réglages pour vous offrir un ciel plus net. Merci de votre patience, nous revenons très vite.</p>' +
    '<div class="mt-card"><div><span class="mt-label">Statut</span><span class="mt-value">Maintenance en cours</span></div>' +
    '<span class="mt-sep"></span><div><span class="mt-label">Retour estimé</span><span class="mt-value">' + RETOUR + '</span></div></div><br>' +
    '<button type="button" class="mt-btn" onclick="location.reload()">Réessayer</button></div>' +
    '<div class="mt-art" aria-hidden="true"><svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">' +
    '<circle class="mt-ring" cx="200" cy="200" r="90"/><circle class="mt-ring mt-dash" cx="200" cy="200" r="140"/><circle class="mt-ring" cx="200" cy="200" r="185"/>' +
    '<circle cx="200" cy="200" r="34" fill="#1a2133" stroke="#a9884b"/><circle cx="200" cy="200" r="5" fill="#d3a85c"/>' +
    '<g class="mt-orb"><circle cx="290" cy="200" r="6" fill="#d3a85c"/></g>' +
    '<g class="mt-orb mt-slow"><circle cx="200" cy="60" r="4.5" fill="#6fa8c0"/></g>' +
    '<g class="mt-orb" style="animation-duration:60s"><circle cx="385" cy="200" r="3" fill="#e8e5da"/></g>' +
    '</svg></div></div></div>' +
    '<div class="mt-foot"><div class="mt-wrap">Orbite — site personnel d\'astronomie</div></div></div>';

  document.write(css + html);
  document.title = "Maintenance en cours — Orbite";

  document.addEventListener("DOMContentLoaded", function () {
    var c = document.getElementById("mt-stars");
    if (!c || !c.getContext) return;
    var ctx = c.getContext("2d"), w, h, stars;
    var calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    function resize() {
      w = c.width = c.offsetWidth; h = c.height = c.offsetHeight;
      stars = []; var n = Math.floor((w * h) / 4500);
      for (var i = 0; i < n; i++) stars.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + .2, p: Math.random() * 6.28, s: Math.random() * .015 + .004 });
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h); ctx.fillStyle = "#e8e5da";
      for (var i = 0; i < stars.length; i++) { var s = stars[i]; ctx.globalAlpha = calm ? 1 : .55 + .45 * Math.sin(s.p + t * s.s); ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill(); }
      ctx.globalAlpha = 1; if (!calm) requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize); resize(); requestAnimationFrame(draw);
  });
})();
