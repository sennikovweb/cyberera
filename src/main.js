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

// ------------------- RESULTS TABLE -------------------
window.addEventListener("DOMContentLoaded", async () => {
  // Берём глобальное состояние isUuid, которое уже задано ранее
  const isUuid = getState("isUuid"); 

  // Если это страница события — не показываем таблицу
  if (isUuid) return;

  try {
    // Загружаем JSON с результатами
    const res = await fetch("/results.json");
    if (!res.ok) throw new Error("Файл results.json не найден");
    const data = await res.json();

    const container = document.getElementById("results-container");
    if (!container) return;

    // Создаём таблицу
    const table = document.createElement("table");
    table.className = "results-table";

    // Заголовок таблицы
    const header = document.createElement("tr");
    header.innerHTML = `
      <th>Пилот</th>
      <th>Время (сек)</th>
      <th>Дата</th>
    `;
    table.appendChild(header);

    // Добавляем строки с данными
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
});
// ------------------- END RESULTS TABLE -------------------
