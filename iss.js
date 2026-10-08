/* ORBITE — page /wheretheiss : ISS en direct */

const ISS_TRAIL_SPAN = 92 * 60;   // secondes
const ISS_TRAIL_STEP = 180;       // 1 point historique toutes les 3 min
let issTrail = [];                // [{ t, lon, lat }] triés par t

function addTrailPoints(points) {
  const byT = new Map(issTrail.map((p) => [p.t, p]));
  points.forEach((p) => byT.set(p.t, p));
  issTrail = Array.from(byT.values()).sort((a, b) => a.t - b.t);
  const last = issTrail.length ? issTrail[issTrail.length - 1].t : 0;
  issTrail = issTrail.filter((p) => p.t >= last - ISS_TRAIL_SPAN);
  renderTrail();
}

function renderTrail() {
  const el = document.getElementById("iss-trail");
  if (!el) return;
  let d = "";
  issTrail.forEach((p, i) => {
    const x = (p.lon + 180).toFixed(2);
    const y = (90 - p.lat).toFixed(2);
    const jump = i === 0 || Math.abs(p.lon - issTrail[i - 1].lon) > 180; // passage de la ligne de changement de date
    d += (jump ? "M" : "L") + x + "," + y;
  });
  el.setAttribute("d", d);
}

function loadTrailHistory() {
  const now = Math.floor(Date.now() / 1000);
  const stamps = [];
  for (let t = now - ISS_TRAIL_SPAN; t < now; t += ISS_TRAIL_STEP) stamps.push(t);
  const chunks = [];
  for (let i = 0; i < stamps.length; i += 10) chunks.push(stamps.slice(i, i + 10)); // 10 max par requête
  chunks.reduce((chain, chunk) => chain.then(() =>
    fetch("https://api.wheretheiss.at/v1/satellites/25544/positions?units=kilometers&timestamps=" + chunk.join(","))
      .then((res) => { if (!res.ok) throw new Error("positions"); return res.json(); })
      .then((arr) => addTrailPoints(arr.map((o) => ({ t: o.timestamp, lon: o.longitude, lat: o.latitude }))))
      .then(() => new Promise((r) => setTimeout(r, 1100))) // reste sous la limite de requêtes
      .catch(() => {})
  ), Promise.resolve());
}

function updateISS() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((res) => {
      if (!res.ok) throw new Error("Réponse invalide");
      return res.json();
    })
    .then((data) => {
      document.getElementById("iss-lat").textContent = data.latitude.toFixed(2) + "°";
      document.getElementById("iss-lon").textContent = data.longitude.toFixed(2) + "°";
      document.getElementById("iss-alt").textContent = Math.round(data.altitude) + " km";
      document.getElementById("iss-speed").textContent =
        Math.round(data.velocity).toLocaleString("fr-FR") + " km/h";
      document.getElementById("iss-visibility").textContent =
        data.visibility === "daylight" ? "Face éclairée" : "Dans l'ombre de la Terre";
      document.getElementById("iss-updated").textContent = new Date(data.timestamp * 1000).toLocaleTimeString("fr-FR");

      const x = data.longitude + 180;
      const y = 90 - data.latitude;
      const dot = document.getElementById("iss-dot");
      const glow = document.getElementById("iss-dot-glow");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      glow.setAttribute("cx", x);
      glow.setAttribute("cy", y);
      addTrailPoints([{ t: data.timestamp, lon: data.longitude, lat: data.latitude }]);
      const eclipsed = data.visibility !== "daylight";
      dot.classList.toggle("eclipsed", eclipsed);
      glow.classList.toggle("eclipsed", eclipsed);

      document.getElementById("iss-error").classList.add("hidden");
    })
    .catch(() => {
      document.getElementById("iss-error").classList.remove("hidden");
    });
}

function initISS() {
  updateISS();
  loadTrailHistory();
  setInterval(() => {
    if (!document.hidden) updateISS();
  }, 5000);
}


initISS();
