function parseTimeToSeconds(s) {
  if (!s) return Infinity;
  if (typeof s === "number") return s;
  s = String(s).trim();
  if (s === "") return Infinity;
  if (s.includes(":")) {
    const parts = s.split(":").map((p) => parseFloat(p.replace(",", ".")) || 0);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  const num = parseFloat(s.replace(",", "."));
  return Number.isFinite(num) ? num : Infinity;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) =>
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]
  );
}

async function renderAllResults() {
  const block = document.querySelector(".overall-results");
  const tbody = document.getElementById("all-results-body");
  const updated = block.querySelector(".overall-results__update");

  try {
    const resp = await fetch("/all_results.json", { cache: "no-cache" });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();

    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Нет данных</td></tr>';
      block.classList.remove("_hidden");
      return;
    }

    // Сортируем по лучшему времени
    data.sort((a, b) => parseTimeToSeconds(a.best) - parseTimeToSeconds(b.best));

    tbody.innerHTML = data
      .map((item, idx) =>
        `<tr><td>${idx + 1}</td><td>${escapeHtml(item.pilot)}</td><td>${escapeHtml(item.best)}</td></tr>`
      )
      .join("");

    const lastModified = resp.headers.get("last-modified");
    if (lastModified && updated) {
      updated.textContent = `🕓 Обновлено: ${new Date(lastModified).toLocaleString("ru-RU")}`;
    }

    block.classList.remove("_hidden");
    block.classList.add("_show");
  } catch (err) {
    console.error("Ошибка загрузки all_results.json:", err);
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:red;">Ошибка загрузки</td></tr>';
    block.classList.remove("_hidden");
  }
}

document.addEventListener("DOMContentLoaded", renderAllResults);
