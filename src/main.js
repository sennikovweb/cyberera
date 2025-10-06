import "./styles/style.scss";
import { getDayFiles } from "./js/getDatas";
import { EN_DICT, RU_DICT } from "./js/consts";
import { addLocalFile, startLocalFile } from "./js/localFileRead";
import { tabSwitch, roundStatsStrokeWidthChange, moveMonth } from "./js/uiChange";
import { loadFilesList, loadLastFile, urlUpload, loadDateFile } from "./js/loadData";
import { setState, getState, getButton, getLocalFileElement, getTab } from "./js/sharedStates";

////////////////////////////////////////////
if (window.matchMedia("((hover: none) and (pointer: coarse))").matches) {
  document.addEventListener("click", function (event) {
    if (event.target.closest("button")) {
      event.target.classList.add("_active-animation");
      setTimeout(() => event.target.classList.remove("_active-animation"), 100);
    }
  });
}

setState("language", document.querySelector("html").getAttribute("lang"));
setState("textStrings", getState("language") == "ru" ? RU_DICT : EN_DICT);
setState("isUuid", new URLSearchParams(window.location.search).get("uuid"));

if (getState("isUuid")) {
  loadFilesList(false);
  urlUpload("uuid");
} else {
  document.querySelector(".main").classList.remove("_hide");
  document.querySelector(".wrapper").classList.remove("_hide");
  loadFilesList(true);
}

document.querySelector(".calendar__prev-month").addEventListener("click", () => moveMonth("right", "left"));
document.querySelector(".calendar__next-month").addEventListener("click", () => moveMonth("left", "right"));

document.querySelector(".calendar__days").addEventListener("click", function (e) {
  const day = e.target.closest(".calendar__day");
  if (e.target == day && day.classList.contains("_day__file")) {
    getLocalFileElement("tittle").classList.add("_hidden");
    getLocalFileElement("label").classList.add("_hidden");
    getDayFiles(e.target.id);
    e.target.classList.add("_active");
  }
});

document.querySelector(".date-files__items").addEventListener("click", function (e) {
  const fileItemElement = e.target.closest(".file__item");
  if (!fileItemElement) return;

  const dateFileElements = document.querySelectorAll(".file__item");
  dateFileElements.forEach((elem) => {
    if (elem != fileItemElement) elem.classList.add("_hidden", "_no-event");
  });

  fileItemElement.classList.add("_active", "_uploading-file");
  loadDateFile(fileItemElement.id);
});

document.querySelector(".last-file__item").addEventListener("click", function () {
  this.classList.add("_active");
  loadLastFile();
});

getLocalFileElement("input").addEventListener("change", addLocalFile);
getLocalFileElement("form").addEventListener("submit", startLocalFile);

getButton("pilots").addEventListener("click", function () {
  tabSwitch(getTab("main")[0].name, getTab("main"));
});
getButton("leaderboard").addEventListener("click", function () {
  tabSwitch(getTab("main")[1].name, getTab("main"));
});
getButton("rounds").addEventListener("click", function () {
  tabSwitch(getTab("main")[2].name, getTab("main"));
});

window.addEventListener("resize", roundStatsStrokeWidthChange);

//////////////////////////////////////////
// Таблица "Результаты последней трассы"

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

async function renderOverallResults() {
  const block = document.querySelector(".overall-results");
  if (!block) return;
  const tbody = block.querySelector("tbody");
  const updated = block.querySelector(".overall-results__update");

  const params = new URLSearchParams(window.location.search);
  if (params.has("uuid")) {
    block.remove();
    return;
  }

  try {
    const resp = await fetch("/results.json", { cache: "no-cache" });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();

    if (!Array.isArray(data) || data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Нет данных</td></tr>';
      block.classList.remove("_hidden");
      return;
    }

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
    console.error("Ошибка загрузки results.json:", err);
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:red;">Ошибка загрузки</td></tr>';
    block.classList.remove("_hidden");
  }
}

document.addEventListener("DOMContentLoaded", renderOverallResults);
