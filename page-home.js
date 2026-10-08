/* ORBITE — page d'accueil : prochain événement, bandeau à la une, photo NASA */

function renderNextEvent() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = EVENTS.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const el = document.getElementById("hero-next-value");
  if (upcoming.length === 0) {
    el.textContent = "Aucun événement à venir dans le calendrier";
    return;
  }
  const next = upcoming[0];
  el.textContent = `${next.titre} — ${fmtDateLong(next.date)}`;
}

function buildSmartMenuItems() {
  const items = [];

  ARTICLES
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .forEach((a) => {
      items.push({
        kind: "article",
        kicker: "Nouvel article",
        titre: a.titre,
        date: a.date,
        image: a.image || null,
        icon: "\u2726",
        ref: a
      });
    });

  ACTUS
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .forEach((a, idx) => {
      items.push({
        kind: "actu",
        kicker: "Actu",
        titre: a.titre,
        date: a.date,
        image: a.image || null,
        icon: "\u25B2",
        index: idx,
        ref: a
      });
    });

  const todayIso = new Date().toISOString().slice(0, 10);
  EVENTS
    .filter((e) => e.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)
    .forEach((e) => {
      items.push({
        kind: "event",
        kicker: "Évènement",
        titre: e.titre,
        date: e.date,
        image: null,
        icon: TYPE_ICONS[e.type] || "\u2605",
        ref: e
      });
    });

  return items;
}

function renderSmartSlide(item) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "smart-slide";

  const thumb = item.image
    ? `<span class="smart-slide-thumb" style="background-image:url('${item.image}')"></span>`
    : `<span class="smart-slide-thumb smart-slide-thumb--icon">${item.icon}</span>`;

  btn.innerHTML = `
    ${thumb}
    <span class="smart-slide-body">
      <span class="smart-slide-kicker">${item.kicker} &middot; ${fmtDateShort(item.date)}</span>
      <span class="smart-slide-title">${item.titre}</span>
    </span>
  `;

  btn.addEventListener("click", () => goToSmartItem(item));
  return btn;
}

function goToSmartItem(item) {
  // Chaque élément pointe vers une vraie page
  if (item.kind === "article") location.href = `/articles/${item.ref.id}`;
  else if (item.kind === "actu") location.href = `/actus#${actuAnchor(item.ref)}`;
  else if (item.kind === "event") location.href = `/calendrier#${item.ref.date}`;
}

function initSmartMenu() {
  const container = document.getElementById("smart-menu");
  const track = document.getElementById("smart-menu-track");
  if (!container || !track) return;

  const items = buildSmartMenuItems();
  if (items.length === 0) {
    container.classList.add("hidden");
    return;
  }

  track.innerHTML = "";
  // Deux copies successives pour boucler sans coupure visible
  items.concat(items).forEach((item) => track.appendChild(renderSmartSlide(item)));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // pas de défilement automatique

  const SPEED = 35; // pixels par seconde
  let paused = false;
  let resumeTimeout = null;
  let lastTime = null;
  // Position flottante gérée à part : sur iPhone/iPad (Safari), scrollLeft est
  // arrondi à l'entier, donc "scrollLeft += 0.5" ne bougeait jamais.
  let pos = container.scrollLeft;

  function step(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    const delta = Math.min((timestamp - lastTime) / 1000, 0.1);
    lastTime = timestamp;

    if (container.offsetParent !== null) {
      if (paused) {
        // L'utilisateur fait défiler à la main : on suit sa position
        pos = container.scrollLeft;
      } else {
        pos += SPEED * delta;
        const half = track.scrollWidth / 2;
        if (half > 0 && pos >= half) pos -= half;
        container.scrollLeft = pos;
      }
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  function pause() {
    paused = true;
    if (resumeTimeout) clearTimeout(resumeTimeout);
  }
  function scheduleResume() {
    if (resumeTimeout) clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => { paused = false; }, 2500);
  }

  container.addEventListener("pointerdown", pause);
  container.addEventListener("pointerup", scheduleResume);
  container.addEventListener("pointerleave", scheduleResume);
  container.addEventListener("touchstart", pause, { passive: true });
  container.addEventListener("touchend", scheduleResume, { passive: true });
  container.addEventListener("wheel", () => { pause(); scheduleResume(); }, { passive: true });
}


/* -------------------------------------------------------------------- */
/* Photo NASA du jour de naissance (APOD)                                */
/* -------------------------------------------------------------------- */
function initApod() {
  // NASA a déplacé l'APOD vers science.nasa.gov. L'ancienne API (api.nasa.gov/planetary/apod)
  // répond encore, mais renvoie un faux résultat (logo NASA + titre "NASA Science")
  // et sera archivée le 1er décembre 2026. On utilise donc le nouvel endpoint,
  // qui prend la date au format aammjj (ex. 17 sept. 2026 -> 260917). Aucune clé API requise.
  const APOD_ENDPOINT = "https://science.nasa.gov/wp-json/wp/v2/apod-basic/";

  const dateInput = document.getElementById("apod-date-input");
  const submitBtn = document.getElementById("apod-submit-btn");
  const output = document.getElementById("apod-output");

  dateInput.max = new Date().toISOString().slice(0, 10);

  submitBtn.addEventListener("click", async () => {
    const date = dateInput.value;
    if (!date) {
      output.innerHTML = `<p class="apod-message">Choisis une date pour continuer.</p>`;
      return;
    }

    submitBtn.disabled = true;
    output.innerHTML = `<p class="apod-loading">Chargement de l'image NASA…</p>`;

    try {
      const code = date.slice(2).replace(/-/g, "");
      const response = await fetch(APOD_ENDPOINT + code);

      if (!response.ok) {
        if (response.status === 404 || response.status === 400) {
          output.innerHTML = `<p class="apod-message">Aucune photo disponible pour cette date : les archives de la NASA commencent le 16 juin 1995.</p>`;
        } else if (response.status === 429) {
          output.innerHTML = `<p class="apod-message">Trop de requêtes envoyées à la NASA. Réessaie un peu plus tard.</p>`;
        } else {
          output.innerHTML = `<p class="apod-message">Une erreur est survenue (code ${response.status}). Réessaie plus tard.</p>`;
        }
        return;
      }

      let data = await response.json();
      if (Array.isArray(data)) data = data.find((d) => d.date === date);

      // Validation stricte : on préfère un message d'erreur à un faux résultat
      if (!data || !data.title || !(data.hdurl || data.url)) {
        output.innerHTML = `<p class="apod-message">Les données reçues de la NASA sont incomplètes. Réessaie plus tard.</p>`;
        return;
      }
      renderApod(data, output, date);
    } catch (err) {
      output.innerHTML = `<p class="apod-message">Impossible de contacter la NASA. Vérifie ta connexion et réessaie.</p>`;
    } finally {
      submitBtn.disabled = false;
    }
  });
}

function renderApod(data, output, fallbackDate) {
  const title = apodHtmlToText(data.title);
  const isHttps = (u) => typeof u === "string" && /^https:\/\//i.test(u);
  const imageUrl = isHttps(data.hdurl) ? data.hdurl : null;
  const permalink = isHttps(data.permalink) ? data.permalink : (isHttps(data.url) ? data.url : null);

  let mediaHtml;
  if (data.media_type === "image" && imageUrl) {
    const alt = apodHtmlToText(data.alt) || title;
    mediaHtml = `<img src="${escapeAttrApod(capApodImage(imageUrl))}" alt="${escapeAttrApod(alt)}" loading="lazy" />`;
  } else {
    // Vidéo ou média non affichable ici : on renvoie vers la page NASA
    mediaHtml = `<div class="apod-result-text"><p>Ce contenu du jour n'est pas une image.${
      permalink ? ` <a href="${escapeAttrApod(permalink)}" target="_blank" rel="noopener">Le voir sur le site de la NASA</a>.` : ""
    }</p></div>`;
  }

  const credit = apodHtmlToText(data.credit || data.copyright);
  const creditHtml = credit
    ? `<span class="apod-copyright">Crédit : ${escapeHtmlApod(credit)}</span>`
    : "";

  const dateStr = data.date || fallbackDate;
  const [year, month, day] = dateStr.split("-");
  const explanationEn = apodCleanExplanation(data.explanation);
  const token = ++apodRenderToken;

  output.innerHTML = `
    <div class="apod-result">
      ${mediaHtml}
      <div class="apod-result-text">
        <span class="apod-date">${day}/${month}/${year}</span>
        <h3>${escapeHtmlApod(title)}</h3>
        <p class="apod-explanation">${escapeHtmlApod(explanationEn)}</p>
        <span class="apod-translation-note"></span>
        ${creditHtml}
      </div>
    </div>
  `;

  setupApodTranslation(dateStr, explanationEn, output, token);
}

// Le nouvel endpoint renvoie du HTML (liens, gras…) : on le convertit en texte brut.
function apodHtmlToText(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(String(html), "text/html");
  return (doc.body.textContent || "").replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

// Retire le "Explanation:" de début et les avis de fin ("APOD's email…", "Tomorrow's picture…")
function apodCleanExplanation(html) {
  let text = apodHtmlToText(html).replace(/^Explanation:\s*/i, "");
  const cut = text.search(/APOD['\u2019]s\s+(email|submission|main NASA site)/i);
  if (cut > 0) text = text.slice(0, cut);
  return text.trim();
}

// Les images NASA peuvent faire 4000 px+ : on limite à 1600 px pour que ça charge vite sur mobile.
function capApodImage(url, max = 1600) {
  try {
    const u = new URL(url);
    const w = parseInt(u.searchParams.get("w"), 10);
    const h = parseInt(u.searchParams.get("h"), 10);
    if (w && h && Math.max(w, h) > max) {
      const k = max / Math.max(w, h);
      u.searchParams.set("w", Math.round(w * k));
      u.searchParams.set("h", Math.round(h * k));
    }
    return u.toString();
  } catch (e) {
    return url;
  }
}

function escapeAttrApod(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Traduction automatique EN -> FR de l'explication (service gratuit MyMemory, sans clé).
// Sans e-mail : 5 000 caractères/jour par visiteur (compté par adresse IP).
// Avec e-mail : 50 000 caractères/jour, mais partagés par tous les visiteurs. Il sert ici de réserve
// quand le quota personnel d'un visiteur est épuisé. Mets une adresse valide et dédiée au site :
// elle est visible par tous dans le code de la page.
const APOD_TRANSLATE_EMAIL = "news.orbite@gmail.com";

let apodRenderToken = 0; // évite qu'une ancienne traduction écrase une recherche plus récente

async function setupApodTranslation(date, textEn, output, token) {
  const p = output.querySelector(".apod-explanation");
  const note = output.querySelector(".apod-translation-note");
  if (!p || !note || !textEn) return;

  let textFr = apodCacheGet(date);
  if (!textFr) {
    note.textContent = "Traduction en français en cours…";
    try {
      textFr = await translateApodToFrench(textEn);
      apodCacheSet(date, textFr);
    } catch (err) {
      if (token !== apodRenderToken) return;
      note.textContent = "Traduction indisponible pour le moment : texte original en anglais.";
      return;
    }
  }
  if (token !== apodRenderToken) return;

  let showFr = true;
  p.textContent = textFr;
  note.textContent = "Traduction automatique · ";
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "apod-lang-toggle";
  btn.textContent = "Voir l'original (anglais)";
  btn.addEventListener("click", () => {
    showFr = !showFr;
    p.textContent = showFr ? textFr : textEn;
    btn.textContent = showFr ? "Voir l'original (anglais)" : "Voir la traduction française";
  });
  note.appendChild(btn);
}

async function translateApodToFrench(text) {
  const chunks = splitApodText(text);
  const parts = await Promise.all(chunks.map(translateApodChunk));
  return parts.join(" ");
}

// Stratégie : on essaie d'abord SANS e-mail (chaque visiteur a alors son propre quota de 5 000 caractères/jour,
// compté par adresse IP). Si ce quota est épuisé, on bascule sur l'e-mail (quota de 50 000 caractères/jour,
// mais partagé entre tous les visiteurs du site).
let apodAnonQuotaHit = false;

async function translateApodChunk(chunk) {
  if (!apodAnonQuotaHit || !APOD_TRANSLATE_EMAIL) {
    try {
      return await requestApodTranslation(chunk, "");
    } catch (err) {
      if (!(err && err.quota && APOD_TRANSLATE_EMAIL)) throw err;
      apodAnonQuotaHit = true;
    }
  }
  return requestApodTranslation(chunk, APOD_TRANSLATE_EMAIL);
}

async function requestApodTranslation(chunk, email) {
  const params = new URLSearchParams({ q: chunk, langpair: "en|fr" });
  if (email) params.set("de", email);
  const res = await fetch("https://api.mymemory.translated.net/get?" + params.toString());
  if (res.status === 429) {
    const e = new Error("Quota dépassé");
    e.quota = true;
    throw e;
  }
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  const out = data && data.responseData && data.responseData.translatedText;
  // Quota dépassé : MyMemory répond parfois quand même avec un texte d'avertissement
  if (Number(data.responseStatus) === 429 || /MYMEMORY WARNING/i.test(out || "")) {
    const e = new Error("Quota dépassé");
    e.quota = true;
    throw e;
  }
  if (Number(data.responseStatus) !== 200 || !out) throw new Error("Traduction refusée");
  return apodHtmlToText(out);
}

// MyMemory accepte 500 octets max par requête : on découpe en blocs d'environ 250 à 400 caractères,
// de préférence à la fin d'une phrase.
function splitApodText(text, max = 400, soft = 250) {
  const chunks = [];
  let cur = "";
  for (const word of text.split(/\s+/)) {
    if (!word) continue;
    if (cur && cur.length + 1 + word.length > max) {
      chunks.push(cur);
      cur = "";
    }
    cur = cur ? cur + " " + word : word;
    if (cur.length >= soft && /[.!?]["')\]]*$/.test(word)) {
      chunks.push(cur);
      cur = "";
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

// Cache local : on ne retraduit pas deux fois la même date (économise le quota).
function apodCacheGet(date) {
  try { return localStorage.getItem("orbite-apod-fr:" + date); } catch (e) { return null; }
}
function apodCacheSet(date, text) {
  try { localStorage.setItem("orbite-apod-fr:" + date, text); } catch (e) { /* stockage indisponible */ }
}

// Sécurité : évite l'injection HTML via les champs texte renvoyés par l'API
function escapeHtmlApod(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}



renderNextEvent();
initApod();
initSmartMenu();
