/* ORBITE — page /articles/ : liste, recherche, suggestion de sujet */

const SUJET_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScMeg0-7_6JTDMy5yVW7Wqcep5ieHjutZIXMwA4ZPI3hQD94g/formResponse";
const SUJET_FORM_FIELDS = {
  sujet: "entry.222107729" // question "Sujet"
};


// Normalise une chaîne pour la recherche : minuscules, sans accents
function normalizeSearchText(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

// Retire les balises HTML d'un texte (pour indexer le contenu d'un article)
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html || "";
  return div.textContent || div.innerText || "";
}

// Construit un index de recherche par article (titre + catégorie + extrait + contenu)
function getArticleSearchIndex(a) {
  if (a._searchIndex === undefined) {
    a._searchIndex = normalizeSearchText(
      [a.titre, a.categorie, a.extrait, (a.motsCles || []).join(" ")].join(" ")
    );
  }
  return a._searchIndex;
}

function renderArticles(query) {
  const grid = document.getElementById("article-grid");
  grid.innerHTML = "";

  const terms = normalizeSearchText(query || "")
    .split(/\s+/)
    .filter(Boolean);

  const filtered = ARTICLES
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter((a) => {
      if (terms.length === 0) return true;
      const index = getArticleSearchIndex(a);
      // Chaque mot tapé doit se retrouver quelque part dans l'article
      return terms.every((t) => index.includes(t));
    });

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="article-search-empty">Aucun article ne correspond à cette recherche.</p>`;
    return;
  }

  filtered.forEach((a) => {
    const btn = document.createElement("a");
    btn.href = `/articles/${a.id}`;
    btn.className = "article-card";
    btn.innerHTML = `
      ${a.image ? `<img class="thumb" src="${a.image}" alt="" loading="lazy">` : ""}
      <span class="cat">${a.categorie}</span>
      <h3>${a.titre}</h3>
      <p>${a.extrait}</p>
      <span class="date-mono">${fmtDateShort(a.date)}</span>
    `;
    grid.appendChild(btn);
  });
}

function initArticleSearch() {
  const input = document.getElementById("article-search-input");
  if (!input) return;
  input.addEventListener("input", () => renderArticles(input.value));
}

const SUJET_COOLDOWN_MS = 10 * 60 * 1000; // 1 suggestion max toutes les 10 minutes par visiteur
const SUJET_STORAGE_KEY = "orbite-sujet-last";

function sujetFormIsConfigured() {
  const values = [SUJET_FORM_URL, ...Object.values(SUJET_FORM_FIELDS)];
  return values.every((v) => v && !v.includes("VOTRE_ID"));
}

function initSujetForm() {
  const form = document.getElementById("sujet-form");
  if (!form) return;
  const input = document.getElementById("sujet-input");
  const count = document.getElementById("sujet-count");
  const btn = document.getElementById("sujet-btn");
  const msg = document.getElementById("sujet-msg");
  const hp = document.getElementById("sujet-hp");

  const show = (text, ok) => {
    msg.textContent = text;
    msg.className = "sujet-msg " + (ok ? "ok" : "err");
  };

  input.addEventListener("input", () => {
    count.textContent = input.value.length + " / 300";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const sujet = input.value.trim();

    if (hp.value) return; // robot : on ignore
    if (sujet.length < 3) {
      show("Écris au moins quelques mots pour décrire ton idée.", false);
      return;
    }

    try {
      const last = parseInt(localStorage.getItem(SUJET_STORAGE_KEY) || "0", 10);
      if (Date.now() - last < SUJET_COOLDOWN_MS) {
        show("Merci, ta suggestion précédente est bien arrivée. Réessaie dans quelques minutes.", false);
        return;
      }
    } catch (err) { /* stockage indisponible : pas de limite côté navigateur */ }

    if (!sujetFormIsConfigured()) {
      console.warn("[Orbite] Sujet non envoyé : SUJET_FORM_URL / SUJET_FORM_FIELDS ne sont pas configurés.");
      show("L'envoi n'est pas disponible pour le moment.", false);
      return;
    }

    const data = new URLSearchParams();
    data.append(SUJET_FORM_FIELDS.sujet, sujet);
    btn.disabled = true;

    // mode "no-cors" : on ne lit pas la réponse, mais l'envoi dans le Google Form fonctionne.
    fetch(SUJET_FORM_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data.toString(),
      keepalive: true
    }).then(() => {
      try { localStorage.setItem(SUJET_STORAGE_KEY, String(Date.now())); } catch (err) {}
      input.value = "";
      count.textContent = "0 / 300";
      show("Merci ! Ton idée est bien partie, on la lira avec attention.", true);
    }).catch(() => {
      show("L'envoi a échoué, réessaie dans un instant.", false);
    }).then(() => { btn.disabled = false; });
  });
}


renderArticles();
initArticleSearch();
initSujetForm();
