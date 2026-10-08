/* ORBITE — page /actus : fil des actus (chaque actu a une ancre : /actus#actu-2026-09-28-...) */

function renderActus() {
  const feed = document.getElementById("actu-feed");
  feed.innerHTML = "";
  ACTUS
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .forEach((a) => {
      const item = document.createElement("article");
      item.className = "actu-item";
      item.id = actuAnchor(a);
      item.innerHTML = `
        <span class="date-mono">${fmtDateShort(a.date)}</span>
        <div>
          ${a.image ? `<img class="actu-image" src="${a.image}" alt="" loading="lazy">` : ""}
          <h3>${a.titre}</h3>
          <p>${a.resume}</p>
          <span class="source">${a.source}</span>
        </div>
      `;
      feed.appendChild(item);
    });
}

function highlightFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("actu-item--highlight");
  setTimeout(() => el.classList.remove("actu-item--highlight"), 2200);
}

renderActus();
highlightFromHash();
