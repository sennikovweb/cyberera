import "./styles/style.scss";
import { getDayFiles } from "./js/getDatas";
import { EN_DICT, RU_DICT } from "./js/consts";
import { addLocalFile, startLocalFile } from "./js/localFileRead";
import { tabSwitch, roundStatsStrokeWidthChange, moveMonth } from "./js/uiChange";
import { loadFilesList, loadLastFile, urlUpload, loadDateFile } from "./js/loadData";
import { setState, getState, getButton, getLocalFileElement, getTab } from "./js/sharedStates";

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

setState("isUuid", new URLSearchParams(window.location.search).get("uuid"));
// setState("isEvent", new URLSearchParams(window.location.search).get("event"));

if (getState("isUuid")) {
  loadFilesList(false);
  urlUpload("uuid");
} else {
  document.querySelector(".main").classList.remove("_hide");
  document.querySelector(".wrapper").classList.remove("_hide");
  loadFilesList(true);
}

///////////////////////////////////
document.querySelector(".calendar__prev-month").addEventListener("click", () => moveMonth("right", "left"));
document.querySelector(".calendar__next-month").addEventListener("click", () => moveMonth("left", "right"));

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

    fileItemElement.classList.add("_active", "_uploading-file");
    loadDateFile(fileName);
  }
});

//////////////////////////////////////////
document.querySelector(".last-file__item").addEventListener("click", function () {
  document.querySelector(".last-file__item").classList.add("_active");
  loadLastFile();
});

getLocalFileElement("input").addEventListener("change", addLocalFile);
getLocalFileElement("form").addEventListener("submit", startLocalFile);

//////////////////////////////////////////
getButton("pilots").addEventListener("click", function () {
  tabSwitch(getTab("main")[0].name, getTab("main"), "main");
});

getButton("leaderboard").addEventListener("click", function () {
  tabSwitch(getTab("main")[1].name, getTab("main"), "main");
});

getButton("rounds").addEventListener("click", function () {
  tabSwitch(getTab("main")[2].name, getTab("main"), "main");
});

window.addEventListener("resize", function () {
  roundStatsStrokeWidthChange();
});
