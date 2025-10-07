import "./styles/style.scss";
import { getDayFiles } from "./js/getDatas";
import { EN_DICT, RU_DICT } from "./js/consts";
import { addLocalFile, startLocalFile } from "./js/localFileRead";
import { tabSwitch, roundStatsStrokeWidthChange, moveMonth } from "./js/uiChange";
import { loadFilesList, loadLastFile, urlUpload, loadDateFile } from "./js/loadData";
import { setState, getState, getButton, getLocalFileElement, getTab } from "./js/sharedStates";

////////////////////////////////////////////
// Эффекты для мобильных кнопок
if (window.matchMedia("((hover: none) and (pointer: coarse))").matches) {
  document.addEventListener("click", function (event) {
    if (event.target.closest("button")) {
      event.target.classList.add("_active-animation");
      setTimeout(() => event.target.classList.remove("_active-animation"), 100);
    }
  });
}

// ------------------- Установка состояния -------------------
setState("language", document.querySelector("html").getAttribute("lang"));
setState("textStrings", getState("language") == "ru" ? RU_DICT : EN_DICT);
setState("isUuid", new URLSearchParams(window.location.search).get("uuid"));

// ------------------- Инициализация страницы -------------------
if (getState("isUuid")) {
  loadFilesList(false);
  urlUpload(getState("isUuid"));
} else {
  document.querySelector(".main").classList.remove("_hide");
  document.querySelector(".wrapper").classList.remove("_hide");
  loadFilesList(true);
}

// ------------------- Календарь -------------------
document.querySelector(".calendar__prev-month").addEventListener("click", () => moveMonth("right", "left"));
document.querySelector(".calendar__next-month").addEventListener("click", () => moveMonth("left", "right"));

document.querySelector(".calendar__days").addEventListener("click", function (e) {
  const day = e.target.closest(".calendar__day");
  if (e.target == day && day.classList.contains("_day__file")) {
    getLocalFileElement("tittle").classList.add("_hidden");
    getLocalFileElement("label").classList.add("_hidden");
    openEvent(day.id, () => getDayFiles(day.id));
    e.target.classList.add("_active");
  }
});

// ------------------- Универсальная функция открытия события -------------------
function clearResultsTable() {
  const container = document.getElementById("results-container");
  if (container) container.innerHTML = "";
}

function openEvent(uuid, callback) {
  setState("isUuid", uuid);
  clearResultsTable();
  if (callback) callback();
}

// ------------------- Открытие события через клики -------------------
document.querySelector(".date-files__items").addEventListener("click", function(e) {
  const fileItem = e.target.closest(".file__item");
  if (!fileItem) return;
  openEvent(fileItem.id, () => loadDateFile(fileItem.id));
  const dateFileElements = document.querySelectorAll(".file__item");
  dateFileElements.forEach(elem => {
    if (elem !== fileItem) elem.classList.add("_hidden", "_no-event");
  });
  fileItem.classList.add("_active", "_uploading-file");
});

document.querySelector(".last-file__item").addEventListener("click", function() {
  openEvent(this.id, loadLastFile);
  this.classList.add("_active");
});

// ------------------- Загрузка локальных файлов -------------------
getLocalFileElement("input").addEventListener("change", addLocalFile);
getLocalFileElement("form").addEventListener("submit", startLocalFile);

// ------------------- Таб-система -------------------
getButton("pilots").addEventListener("click", function () {
  tabSwitch(getTab("main")[0].name, getTab("main"));
});
getButton("leaderboard").addEventListener("click", function () {
  tabSwitch(getTab("main")[1].name, getTab("main"));
});
getButton("rounds").addEventListener("click", function () {
  tabSwitch(getTab("main")[2].name, getTab("main"));
});

// ------------------- Адаптив для круговой статистики -------------------
window.addEventListener("resize", roundStatsStrokeWidthChange);

// ------------------- RESULTS TABLE -------------------
async function loadResultsTable() {
  try {
    const res = await fetch("/results.json");
    if (!res.ok) throw new Error("Файл results.json не найден");
    const data = await res.json();

    const container = document.getElementById("results-container");
    if (!container) return;

    const table = document.createElement("table");
    table.className = "results-table";

    const header = document.createElement("tr");
    header.innerHTML = `
      <th>Пилот</th>
      <th>Время (сек)</th>
      <th>Дата</th>
    `;
    table.appendChild(header);

    data.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.pilot}</td>
        <td>${row.time}</td>
        <td>${row.date}</td>
      `;
      table.appendChild(tr);
    });

    container.appendChild(table);

  } catch (err) {
    console.error("Ошибка при загрузке таблицы:", err);
    const container = document.getElementById("results-container");
    if (container) container.textContent = "Ошибка при загрузке таблицы результатов.";
  }
}

// Загружаем таблицу только на главной
window.addEventListener("DOMContentLoaded", () => {
  const isUuid = getState("isUuid");
  if (!isUuid || isUuid === "null" || isUuid === "") {
    loadResultsTable();
  }
});
