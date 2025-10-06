import "./styles/style.scss";
import { getDayFiles } from "./js/getDatas";
import { EN_DICT, RU_DICT } from "./js/consts";
import { addLocalFile, startLocalFile } from "./js/localFileRead";
import { tabSwitch, roundStatsStrokeWidthChange, moveMonth } from "./js/uiChange";
import { loadFilesList, loadLastFile, urlUpload, loadDateFile } from "./js/loadData";
import { setState, getState, getButton, getLocalFileElement, getTab } from "./js/sharedStates";

////////////////////////////////////////////
// helper: безопасное добавление слушателя
function safeAddListener(el, event, handler, options) {
  if (!el) {
    console.warn(`Элемент для слушателя ${event} не найден.`);
    return;
  }
  el.addEventListener(event, handler, options);
}

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
  const mainEl = document.querySelector(".main");
  const wrapperEl = document.querySelector(".wrapper");
  if (mainEl) mainEl.classList.remove("_hide");
  if (wrapperEl) wrapperEl.classList.remove("_hide");
  loadFilesList(true);
}

// calendar prev/next
const prevMonthBtn = document.querySelector(".calendar__prev-month");
const nextMonthBtn = document.querySelector(".calendar__next-month");
safeAddListener(prevMonthBtn, "click", () => moveMonth("right", "left"));
safeAddListener(nextMonthBtn, "click", () => moveMonth("left", "right"));

// calendar days click
const calendarDays = document.querySelector(".calendar__days");
safeAddListener(calendarDays, "click", function (e) {
  const day = e.target.closest(".calendar__day");
  if (e.target == day && day.classList.contains("_day__file")) {
    const tittleEl = getLocalFileElement("tittle");
    const labelEl = getLocalFileElement("label");
    if (tittleEl) tittleEl.classList.add("_hidden");
    if (labelEl) labelEl.classList.add("_hidden");
    getDayFiles(e.target.id);
    day.classList.add("_active");
  }
});

// date-files items click
const dateFilesItems = document.querySelector(".date-files__items");
safeAddListener(dateFilesItems, "click", function (e) {
  const fileItemElement = e.target.closest(".file__item");
  if (!fileItemElement) return;

  const dateFileElements = document.querySelectorAll(".file__item");
  dateFileElements.forEach((elem) => {
    if (elem != fileItemElement) elem.classList.add("_hidden", "_no-event");
  });

  fileItemElement.classList.add("_active", "_uploading-file");
  loadDateFile(fileItemElement.id);
});

// last file click
const lastFileItem = document.querySelector(".last-file__item");
safeAddListener(lastFileItem, "click", function () {
  this.classList.add("_active");
  loadLastFile();
});

// local file inputs
const localInput = getLocalFileElement("input");
if (localInput) safeAddListener(localInput, "change", addLocalFile);

const localForm = getLocalFileElement("form");
if (localForm) safeAddListener(localForm, "submit", startLocalFile);

// tab buttons (без падений если элемента нет)
const btnPilots = getButton("pilots");
if (btnPilots) {
  safeAddListener(btnPilots, "click", function () {
    const t = getTab("main");
    if (t && t[0]) tabSwitch(t[0].name, t);
  });
} else {
  console.warn("Кнопка pilots не найдена");
}

const btnLeaderboard = getButton("leaderboard");
if (btnLeaderboard) {
  safeAddListener(btnLeaderboard, "click", function () {
    const t = getTab("main");
    if (t && t[1]) tabSwitch(t[1].name, t);
  });
} else {
  console.warn("Кнопка leaderboard не найдена");
}

const btnRounds = getButton("rounds");
if (btnRounds) {
  safeAddListener(btnRounds, "click", function () {
    const t = getTab("main");
    if (t && t[2]) tabSwitch(t[2].name, t);
  });
} else {
  console.warn("Кнопка rounds не найдена");
}

safeAddListener(window, "resize", roundStatsStrokeWidthChange);

// === POPUP ЛИДЕРБОРД ===
// Добавляем код попапа в конце — безопасно, только если DOM содержит нужные элементы
(function setupLeaderboardPopup() {
  const popup = document.getElementById("leaderboardPopup");
  const openBtn = document.querySelector(".buttons__leaderboard");
  const closeBtn = popup ? popup.querySelector(".popup__close") : null;
  const tbody = popup ? popup.querySelector("#leaderboardTable tbody") : null;

  async function loadLeaderboard() {
    if (!tbody) return;
    try {
      const response = await fetch("/leaderboard.json");
      if (!response.ok) throw new Error("Не удалось получить /leaderboard.json: " + response.status);
      const data = await response.json();
      tbody.innerHTML = "";

      data.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row["№"] ?? ""}</td>
          <td>${row["Пилот"] ?? ""}</td>
          <td>${row["ЛучшийКруг"] ?? ""}</td>
        `;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error("Ошибка загрузки лидерборда:", err);
      if (tbody) tbody.innerHTML = "<tr><td colspan='3'>Ошибка загрузки данных</td></tr>";
    }
  }

  if (openBtn && popup) {
    safeAddListener(openBtn, "click", async (e) => {
      // предотвращаем дефолтное поведение (если это ссылка)
      if (e && e.preventDefault) e.preventDefault();
      await loadLeaderboard();
      popup.classList.add("_active");
      popup.setAttribute("aria-hidden", "false");
    });
  } else {
    if (!openBtn) console.warn("Кнопка открытия лидерборда ('.buttons__leaderboard') не найдена.");
    if (!popup) console.warn("Попап лидерборда ('#leaderboardPopup') не найден.");
  }

  if (closeBtn && popup) {
    safeAddListener(closeBtn, "click", () => {
      popup.classList.remove("_active");
      popup.setAttribute("aria-hidden", "true");
    });
  }

  if (popup) {
    safeAddListener(popup, "click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("_active");
        popup.setAttribute("aria-hidden", "true");
      }
    });
  }
})();
