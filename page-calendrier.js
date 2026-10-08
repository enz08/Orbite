/* ORBITE — page /calendrier (une seule URL : le jour ouvert est mémorisé dans #AAAA-MM-JJ) */

let calYear, calMonth; // calMonth: 0-11

function eventsByDate(iso) {
  return EVENTS.filter((e) => e.date === iso);
}

function renderCalendar() {
  const label = document.getElementById("cal-month-label");
  label.textContent = `${MOIS_FR[calMonth]} ${calYear}`;

  const grid = document.getElementById("cal-grid");
  grid.innerHTML = "";
  JOURS_FR.forEach((j) => {
    const el = document.createElement("div");
    el.className = "cal-dow";
    el.textContent = j;
    grid.appendChild(el);
  });

  const firstDay = new Date(calYear, calMonth, 1);
  // Lundi = 0
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const todayIso = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < startOffset; i++) {
    const el = document.createElement("div");
    el.className = "cal-day empty";
    grid.appendChild(el);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = eventsByDate(iso);
    const el = document.createElement("div");
    el.className = "cal-day" + (dayEvents.length ? " has-event" : "") + (iso === todayIso ? " today" : "");
    el.textContent = day;
    if (dayEvents.length) {
      const dotRow = document.createElement("div");
      dotRow.className = "dot-row";
      dayEvents.forEach(() => {
        const dot = document.createElement("span");
        dotRow.appendChild(dot);
      });
      el.appendChild(dotRow);
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", `${day} ${MOIS_FR[calMonth]} — ${dayEvents.length} événement(s)`);
      const openDay = () => { showDay(iso); history.replaceState(null, "", "#" + iso); };
      el.addEventListener("click", openDay);
      el.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openDay(); } });
    }
    grid.appendChild(el);
  }

  // Par défaut, afficher tous les événements du mois affiché
  const monthEvents = EVENTS.filter((e) => e.date.startsWith(`${calYear}-${String(calMonth + 1).padStart(2, "0")}`));
  if (monthEvents.length) {
    renderEventList(monthEvents, `Événements de ${MOIS_FR[calMonth]} ${calYear}`);
  } else {
    renderEventList([], `Aucun événement enregistré en ${MOIS_FR[calMonth]} ${calYear}`);
  }
}

function renderEventList(events, heading) {
  const headingEl = document.getElementById("event-list-heading");
  const listEl = document.getElementById("event-list");
  headingEl.textContent = heading;
  listEl.innerHTML = "";

  events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .forEach((e) => {
      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <div class="row-top">
          <span class="tag type-${e.type}">${TYPE_ICONS[e.type] || ""} ${TYPE_LABELS[e.type] || e.type}</span>
          <span class="date-mono">${fmtDateShort(e.date)}</span>
        </div>
        <h3>${e.titre}</h3>
        <p>${e.description}</p>
        <span class="visibilite">${e.visibilite}</span>
      `;
      listEl.appendChild(card);
    });
}


// Affiche le détail d'un jour précis (et positionne le calendrier sur son mois)
function showDay(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return;
  calYear = d.getFullYear();
  calMonth = d.getMonth();
  renderCalendar();
  renderEventList(eventsByDate(iso), `${d.getDate()} ${MOIS_FR[calMonth]} ${calYear}`);
}

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();

  const clearHash = () => history.replaceState(null, "", location.pathname);

  document.getElementById("cal-prev").addEventListener("click", () => {
    calMonth--;
    if (calMonth < 0) { calMonth = 11; calYear--; }
    clearHash();
    renderCalendar();
  });
  document.getElementById("cal-next").addEventListener("click", () => {
    calMonth++;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    clearHash();
    renderCalendar();
  });

  const hash = location.hash.slice(1);
  if (/^\d{4}-\d{2}-\d{2}$/.test(hash)) showDay(hash);
  else renderCalendar();
}

initCalendar();
