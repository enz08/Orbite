/* =========================================================================
   ORBITE — code commun à TOUTES les pages
   (en-tête, pied de page, assistant IA, fond étoilé, formats de date)
   ========================================================================= */

const TYPE_LABELS = {
  eclipse: "Éclipse",
  meteores: "Pluie de météores",
  planete: "Planète",
  lune: "Lune",
  saison: "Saison",
  lancement: "Lancement",
  ceremonie: "Cérémonie"
};

const TYPE_ICONS = {
  eclipse: "\u25CF", // ●
  meteores: "\u2739", // ✹
  planete: "\u25CB", // ○
  lune: "\u263D", // ☽
  saison: "\u2699", // ⚙ (utilisé comme repère neutre)
  lancement: "\u25B2", // ▲
  ceremonie: "\u2605" // ★
};

const MOIS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];
const JOURS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

function fmtDateLong(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getDate()} ${MOIS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtDateShort(iso) {
  const d = new Date(iso + "T00:00:00");
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}



// Ancre stable d'une actu (utilisée par /actus et par le bandeau de l'accueil)
function actuAnchor(a) {
  const slug = String(a.titre).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
  return "actu-" + a.date + "-" + slug;
}

/* -------------------------------------------------------------------- */
/* En-tête / pied de page / assistant : écrits UNE fois ici             */
/* -------------------------------------------------------------------- */
(function initLayout() {
  const page = document.body.dataset.page || "";
  const active = page === "article" ? "articles" : page;
  const NAV = [
    ["accueil", "/", "Accueil"],
    ["calendrier", "/calendrier", "Calendrier"],
    ["actus", "/actus", "Actus"],
    ["iss", "/wheretheiss", "ISS"],
    ["articles", "/articles/", "Articles"]
  ];
  const links = NAV.map(([id, href, label]) =>
    `<a class="nav-link" href="${href}"${id === active ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("\n      ");

  const headerHtml = `<a class="skip-link" href="#main">Aller au contenu</a>
<header class="site-header">
  <div class="wrap">
    <a class="logo" href="/">
      <span class="dot" aria-hidden="true"></span>
      Orbite
    </a>
    <nav class="main-nav" aria-label="Navigation principale">
      ${links}
    </nav>
    <button class="nav-toggle" id="nav-toggle" aria-label="Ouvrir le menu">&#9776;</button>
  </div>
</header>`;

  const footerHtml = `<footer class="site-footer">
  <div class="wrap footer-newsletter">
    <div class="footer-newsletter-text">
      <span class="kicker">Newsletter</span>
      <h3>Le ciel du mois directement dans votre boîte mail !</h3>
      <p>Les événements à ne pas manquer, une fois par mois. Pas de spam, désinscription en un clic.</p>
    </div>
    <div class="footer-newsletter-embed">
      <form
        action="https://e6c53f7f.sibforms.com/serve/MUIFAAsoEhDwDlJLOu1e7S2fcgEmpEbFXLsGkmIg4orckmNsNoFfMOIJ558W5egWa-pkj3s2_lDEN__o0Mfjsiwp490hLhJdpT6sIPQFJajF1o0P4iOuKudbs_BV5NLgfv-yKVZJci6Zpb0usf4M5vToif_YuidDB_B8QKM38HTLGRvg3xSWCemOOTiKYIWu9N9dSgpOXbU97sXmIw=="
        method="post"
        id="sib-form"
        name="sib-form"
        class="newsletter-form"
        target="_blank"
        novalidate
      >
        <div class="newsletter-form-row">
          <input type="text" name="EMAIL" id="EMAIL" required placeholder="Ton adresse e-mail" aria-label="Adresse e-mail" autocomplete="off">
          <button type="submit">S'inscrire</button>
        </div>

        <label class="newsletter-optin">
          <input type="checkbox" name="OPT_IN" id="OPT_IN" value="1" required>
          <span>J'accepte de recevoir la newsletter d'Orbite et confirme avoir pris connaissance de la <a href="https://www.brevo.com/fr/legal/privacypolicy/" target="_blank" rel="nofollow noopener">politique de confidentialité de Brevo</a>.</span>
        </label>

        <!-- Champ anti-robot Brevo : doit rester vide et invisible, ne pas retirer -->
        <input type="text" name="email_address_check" value="" tabindex="-1" autocomplete="off" style="position:absolute; left:-5000px;" aria-hidden="true">
        <input type="hidden" name="locale" value="fr">
      </form>
      <p class="newsletter-note">Propulsé par Brevo.</p>
    </div>
  </div>
  <div class="wrap" style="display:flex; justify-content:space-between; width:100%; flex-wrap:wrap; gap:12px; padding-top: 24px;">
    <span>Orbite © <span id="year-now"></span> — site personnel d'astronomie</span>
    <span><a href="/mentions-legales.html" style="color:inherit;">Mentions légales</a> · Fait main, hébergé sur GitHub Pages</span>
  </div>
</footer>`;
  const chatHtml = `<!-- Assistant Orbite (chatbot IA) : relais Cloudflare Worker, voir le script en bas de page -->
<button type="button" class="chat-toggle" id="chat-toggle" aria-expanded="false" aria-controls="chat-panel">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-24 12 12)"/><circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none"/></svg>
  <span>Poser une question</span>
</button>

<section class="chat-panel" id="chat-panel" role="dialog" aria-label="Assistant Orbite" hidden>
  <header class="chat-head">
    <div>
      <h2 class="chat-title">Assistant Orbite</h2>
      <p class="chat-sub">Une question sur le ciel, un événement ou un article du site ?</p>
    </div>
    <button type="button" class="chat-close" id="chat-close" aria-label="Fermer l'assistant">&times;</button>
  </header>
  <div class="chat-log" id="chat-log" role="log" aria-live="polite"></div>
  <div class="chat-suggestions" id="chat-suggestions">
    <button type="button">Que puis-je observer dans les prochaines semaines ?</button>
    <button type="button">Quelles sont les dernières actus spatiales ?</button>
    <button type="button">Comment débuter l'observation du ciel ?</button>
  </div>
  <form class="chat-form" id="chat-form" autocomplete="off">
    <label class="chat-sr" for="chat-input">Ta question</label>
    <input type="text" id="chat-input" maxlength="500" placeholder="Écris ta question" required>
    <button type="submit" id="chat-send">Envoyer</button>
  </form>
  <p class="chat-note">Réponses générées par une IA : vérifie les dates importantes avant de t'organiser.</p>
</section>
`;

  function put(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }
  put("site-header", headerHtml);
  put("site-footer", footerHtml);
  put("site-chat", chatHtml);

  const year = document.getElementById("year-now");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.getElementById("nav-toggle");
  if (toggle) toggle.addEventListener("click", () => {
    document.querySelector(".main-nav").classList.toggle("open");
  });
})();

/* -------------------------------------------------------------------- */
/* Fond étoilé (uniquement si la page a un <canvas id="stars-canvas">)  */
/* -------------------------------------------------------------------- */
function drawStars() {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, stars;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    const count = Math.floor((w * h) / 4500);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      p: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.015 + 0.004
    }));
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(s.p + t * s.speed);
      ctx.globalAlpha = twinkle;
      ctx.fillStyle = "#e8e5da";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
}
drawStars();

/* -------------------------------------------------------------------- */
/* Assistant Orbite (chat IA)                                           */
/* -------------------------------------------------------------------- */
/**
 * =========================================================================
 *  ASSISTANT ORBITE (chat IA)
 * =========================================================================
 *  Le navigateur envoie la question à un relais Cloudflare Worker, qui
 *  interroge le modèle. La clé n'est jamais dans le site.
 *  Le contexte envoyé (événements, actus, articles) est construit à partir
 *  des tableaux EVENTS, ACTUS et ARTICLES : rien à mettre à jour ici.
 * =========================================================================
 */
(function () {
  "use strict";

  var ENDPOINT = "https://nova-ai.hugo-philippon08.workers.dev";
  var MAX_HISTORY = 6;
  var MAX_CONTEXT = 6000;

  var toggle = document.getElementById("chat-toggle");
  var panel = document.getElementById("chat-panel");
  var closeBtn = document.getElementById("chat-close");
  var log = document.getElementById("chat-log");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var sendBtn = document.getElementById("chat-send");
  var suggestions = document.getElementById("chat-suggestions");
  if (!toggle || !panel || !form) return;

  var history = [];
  var pending = false;
  var welcomed = false;
  var contextCache = null;

  // ----- Construction du contexte à partir des données du site -----

  function plainText(html) {
    var doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
  }
  function clip(text, max) {
    return text.length > max ? text.slice(0, max - 1).trim() + "…" : text;
  }
  function parseDay(s) {
    var p = String(s).split("-");
    return new Date(+p[0], (+p[1] || 1) - 1, +p[2] || 1);
  }
  function frDate(s) {
    return parseDay(s).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  }

  function buildContext() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var since = new Date(today.getTime() - 7 * 86400000);

    var events = (typeof EVENTS !== "undefined" ? EVENTS : [])
      .filter(function (e) { return e && e.date && parseDay(e.date) >= since; })
      .sort(function (a, b) { return parseDay(a.date) - parseDay(b.date); });

    var actus = (typeof ACTUS !== "undefined" ? ACTUS : [])
      .slice()
      .sort(function (a, b) { return parseDay(b.date) - parseDay(a.date); })
      .slice(0, 5);

    var articles = typeof ARTICLES !== "undefined" ? ARTICLES : [];

    function render(eventCount) {
      var lines = [];
      var evs = events.slice(0, eventCount);
      if (evs.length) {
        lines.push("Calendrier des événements du ciel (à venir) :");
        evs.forEach(function (e) {
          var line = "- " + frDate(e.date) + " : " + e.titre + ". " + clip(plainText(e.description), 150);
          if (e.visibilite) line += " Visibilité : " + clip(plainText(e.visibilite), 110);
          lines.push(line);
        });
      }
      if (actus.length) {
        lines.push("", "Dernières actus spatiales du site :");
        actus.forEach(function (a) {
          lines.push("- " + frDate(a.date) + " : " + a.titre + ". " + clip(plainText(a.resume), 90));
        });
      }
      if (articles.length) {
        lines.push("", "Articles disponibles sur le site :");
        articles.forEach(function (a) {
          lines.push("- " + (a.categorie ? a.categorie + " : " : "") + a.titre);
        });
      }
      return lines.join("\n");
    }

    var count = 12;
    var text = render(count);
    while (text.length > MAX_CONTEXT && count > 0) {
      count -= 1;
      text = render(count);
    }
    return text.slice(0, MAX_CONTEXT);
  }

  // ----- Interface -----

  function addMessage(text, who) {
    var el = document.createElement("div");
    el.className = "chat-msg chat-msg-" + who;
    el.textContent = text;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  }

  function openChat() {
    panel.hidden = false;
    toggle.hidden = true;
    toggle.setAttribute("aria-expanded", "true");
    if (!welcomed) {
      addMessage("Bonjour ! Je peux t'aider à repérer les prochains événements du ciel ou à retrouver un article du site. Que veux-tu savoir ?", "bot");
      welcomed = true;
    }
    input.focus();
  }

  function closeChat() {
    panel.hidden = true;
    toggle.hidden = false;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  }

  function setPending(on) {
    pending = on;
    sendBtn.disabled = on;
    input.disabled = on;
  }

  async function ask(message) {
    if (pending) return;
    message = message.trim();
    if (!message) return;

    suggestions.hidden = true;
    addMessage(message, "user");
    input.value = "";
    setPending(true);

    var wait = addMessage("", "bot");
    wait.classList.add("chat-msg-wait");
    wait.innerHTML = '<span class="chat-dots" aria-label="Réponse en cours"><span>•</span><span>•</span><span>•</span></span>';

    if (contextCache === null) contextCache = buildContext();

    var reply = "";
    try {
      var res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          history: history.slice(-MAX_HISTORY),
          context: contextCache
        })
      });
      var data = await res.json();
      reply = (data && data.reply) || "";
      if (res.ok && reply) {
        history.push({ role: "user", content: message });
        history.push({ role: "assistant", content: reply });
      }
      if (!reply) reply = "L'assistant n'a pas pu répondre. Réessaie dans un instant.";
    } catch (err) {
      reply = "Impossible de joindre l'assistant. Vérifie ta connexion et réessaie.";
    }

    wait.classList.remove("chat-msg-wait");
    wait.textContent = reply;
    log.scrollTop = log.scrollHeight;
    setPending(false);
    input.focus();
  }

  toggle.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);
  panel.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeChat();
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ask(input.value);
  });
  suggestions.addEventListener("click", function (e) {
    var btn = e.target.closest("button");
    if (btn) ask(btn.textContent);
  });
})();

