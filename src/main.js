import "./styles/style.scss";
import { getDayFiles } from "./js/getDatas";
import { EN_DICT, RU_DICT } from "./js/consts";
import { addLocalFile, startLocalFile } from "./js/localFileRead";
import { tabSwitch, roundStatsStrokeWidthChange, moveMonth } from "./js/uiChange";
import { loadFilesJson, loadLastFile, urlUpload, loadDateFile } from "./js/loadData";
import { setState, getState, getButton, getLocalFileElement, getTab } from "./js/sharedStates";

// let consecutivesCount = 3;
// const getState('CONSOLE_DEBUG') = false;

// let getState("textStrings");
////////////////////////////////////////////
if (window.matchMedia("((hover: none) and (pointer: coarse))").matches) {
  //Анимация кнопок на тач экранах
  document.addEventListener("click", function (event) {
    if (event.target.closest("button")) {
      event.target.classList.add("_active-animation");
      setTimeout(() => {
        event.target.classList.remove("_active-animation"); ///
      }, 100);
    }
  });
}
////////////////////////////////////////////
setState("language", document.querySelector("html").getAttribute("lang"));
setState("textStrings", getState("language") == "ru" ? RU_DICT : getState("language") == "en" && EN_DICT);

setState("isLive", new URLSearchParams(window.location.search).get("uuid"));
setState("isEvent", new URLSearchParams(window.location.search).get("event"));

if (getState("isLive")) {
  document.querySelector(".wrapper").classList.add("_hide");
  urlUpload("live");
} else if (getState("isEvent")) {
  document.querySelector(".wrapper").classList.add("_hide");
  urlUpload("event");
} else {
  document.querySelector(".main").classList.remove("_hide");
  loadFilesJson();
}
///////////////////////////////////

//Календарь///////////////////////////
document.querySelector(".calendar__days").addEventListener("click", function (e) {
  const day = e.target.closest(".calendar__day");
  if (e.target == day && day.classList.contains("_day__file")) {
    getLocalFileElement("tittle").classList.add("_hidden");
    getLocalFileElement("label").classList.add("_hidden");
    const dateStr = e.target.id;
    getDayFiles(dateStr);
    e.target.classList.add("_active");
  }
});

document.querySelector(".date-files__items").addEventListener("click", function (e) {
  if (e.target.closest(".file__item")) {
    const fileItemElement = e.target.closest(".file__item");

    const fileName = fileItemElement.id;
    const dateFileElements = document.querySelectorAll(".file__item");

    dateFileElements.forEach((elem) => {
      if (elem != fileItemElement) {
        elem.classList.add("_hidden", "_no-event");
      }
    });
    const lastFileTittle = document.querySelector(".last-file__tittle");
    const calendarElement = document.querySelector(".calendar");
    const languageElement = document.querySelector(".language");

    languageElement.classList.add("_hidden");
    lastFileTittle.classList.add("_hidden");
    calendarElement.classList.add("_hidden");

    fileItemElement.classList.add("_active", "flie-item_uploading");
    loadDateFile(fileName);
  }
});

document.querySelector(".calendar__prev-month").addEventListener("click", () => moveMonth("right", "left"));
document.querySelector(".calendar__next-month").addEventListener("click", () => moveMonth("left", "right"));

//////////////////////////////////////////
// const lastFileButton = document.querySelector(".last-file__item");

// let currentClass; //Переменная класса
// let currentClassChoosed = false; //Первый класс не выбран

// let notParsedJson; // переменная НЕспарсинного файла
// let mainObj; // переменная спарсинного файла
// let parsedOK = false; // Флаг успешного парсинга файла
// let lastHoleShot;

//////////////////////////////////////////////////////

document.querySelector(".last-file__item").addEventListener("click", function () {
  const lastFileTittle = document.querySelector(".last-file__tittle");
  const calendarElement = document.querySelector(".calendar");
  const localFileTittle = document.querySelector(".local-file__tittle");
  const localFileForm = document.querySelector(".local-file__form");
  const dateFilesElement = document.querySelector(".date-files");
  const labelElement = document.querySelector(".local-file__label");
  const languageElement = document.querySelector(".language");
  const lastFileButton = document.querySelector(".last-file__item");

  languageElement.classList.add("_hidden");
  dateFilesElement.classList.add("_hidden");
  labelElement.classList.add("_hidden");
  localFileTittle.classList.add("_hidden");
  localFileForm.classList.add("_hidden");
  calendarElement.classList.add("_hidden");
  lastFileTittle.classList.add("_hidden");
  lastFileButton.classList.add("_active");

  loadLastFile();
});

getLocalFileElement("input").addEventListener("change", addLocalFile);
getLocalFileElement("form").addEventListener("submit", startLocalFile);

// const mainForm = {
//   tittle: document.querySelector(".main-tittle"),
//   form: document.querySelector(".main-form"),
//   input: document.querySelector(".main-form__file"),
//   label: document.querySelector(".main-form__label"),
//   button: document.querySelector(".main-form__button"),
//   subtittle: document.querySelector(".main-subtittle"),
// };

// const buttons = {
//   element: document.querySelector(".buttons"),
//   container: document.querySelector(".buttons__container"),
//   pilots: document.querySelector(".buttons__pilots"),
//   leaderboard: document.querySelector(".buttons__leaderboard"),
//   rounds: document.querySelector(".buttons__rounds"),
//   statistic: document.querySelector(".round__statistic-button"),
//   view: document.querySelector(".round__view-button"),
// };

// let tabsPilotsVs;

// let graphMouseFlag;
// let graphTouchFlag;
// let akcentArr;
// let lapsIdData = [];
// let pilotsVsDuel = [];

getButton("pilots").addEventListener("click", function () {
  tabSwitch(getTab("main")[0].name, getTab("main"));
});

getButton("leaderboard").addEventListener("click", function () {
  tabSwitch(getTab("main")[1].name, getTab("main"));
});

getButton("rounds").addEventListener("click", function () {
  tabSwitch(getTab("main")[2].name, getTab("main"));
});

window.addEventListener("resize", function () {
  roundStatsStrokeWidthChange();
});
