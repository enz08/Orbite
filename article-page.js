/* ORBITE — pages d'article : boutons d'avis (pouce haut / bas) */

const AVIS_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdNeZP4RJ6XieVLYupta_PSTIciI9DY_-cuefKb-GOTvDHuRg/formResponse";
const AVIS_FORM_FIELDS = {
  article: "entry.1124769971", // question "Article"
  date: "entry.11045041",    // question "Date"
  avis: "entry.1278941782"     // question "Avis"
};


function setupArticleAvis(detail, article) {
  const storageKey = `orbite-avis:${article.date}:${article.titre}`;
  const question = detail.querySelector(".avis-question");
  const buttons = detail.querySelector(".avis-buttons");
  const merci = detail.querySelector(".avis-merci");

  const showMerci = () => {
    question.classList.add("hidden");
    buttons.classList.add("hidden");
    merci.classList.remove("hidden");
  };

  let alreadyVoted = false;
  try {
    alreadyVoted = !!localStorage.getItem(storageKey);
  } catch (e) {
    alreadyVoted = false;
  }

  if (alreadyVoted) {
    showMerci();
    return;
  }

  detail.querySelectorAll(".avis-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const vote = btn.dataset.vote;
      try {
        sendAvisToGoogleForm(article, vote);
      } catch (e) {
        console.warn("[Orbite] Erreur lors de l'envoi de l'avis :", e);
      }
      try {
        localStorage.setItem(storageKey, vote);
      } catch (e) {
        /* stockage indisponible : on affiche quand même le message de remerciement */
      }
      showMerci();
    });
  });
}

function avisFormIsConfigured() {
  const values = [AVIS_FORM_URL, ...Object.values(AVIS_FORM_FIELDS)];
  return values.every((v) => v && !v.includes("VOTRE_ID"));
}

function sendAvisToGoogleForm(article, vote) {
  if (!avisFormIsConfigured()) {
    // Formulaire pas encore configuré : le vote n'est pas envoyé (voir instructions en haut du script).
    console.warn("[Orbite] Avis non envoyé : AVIS_FORM_URL / AVIS_FORM_FIELDS ne sont pas configurés.");
    return;
  }
  const data = new URLSearchParams();
  data.append(AVIS_FORM_FIELDS.article, article.titre);
  data.append(AVIS_FORM_FIELDS.date, article.date);
  data.append(AVIS_FORM_FIELDS.avis, vote === "up" ? "👍 Positif" : "👎 Négatif");
  // mode "no-cors" : on ne peut pas lire la réponse, mais l'envoi fonctionne bien
  // (c'est la méthode standard pour poster dans un Google Form depuis un site externe).
  fetch(AVIS_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data.toString(),
    keepalive: true
  }).catch((err) => console.warn("[Orbite] Envoi de l'avis échoué :", err));
}


(function () {
  const detail = document.getElementById("article-detail");
  if (!detail) return;
  const h1 = detail.querySelector("h1");
  const time = detail.querySelector("time");
  if (!h1 || !time) return;
  // Même clé qu'avant : un lecteur ayant déjà voté ne revoit pas les boutons
  setupArticleAvis(detail, { titre: h1.textContent.trim(), date: time.getAttribute("datetime") });
})();
