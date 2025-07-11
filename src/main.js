import { writePilotsHTML, writeLeaderboardHTML, writeRoundsHTML, writeRound, writeInRoundHTML, writeAllLapsHTML, writePilotsVs } from "./js/htmlWriters";
import { getAnimationDurationTime, lapTimeConverter, getNumFromText } from "./js/utils";
import {
  classSwitch,
  tabSwitch,
  tabHeightChange,
  modalOnOff,
  spoilerOnOff,
  lapNodeShow,
  allLapsGraphScale,
  pilotsVsGraphScale,
  allLapsGraphChoosing,
  pilotsVsGraphChoosing,
  startRound,
  pauseRound,
  speedChange,
  roundStatsStrokeWidthChange,
  smoothTextChange,
  textChange,
} from "./js/uiChange";
import { allLapsShow, pilotsVsShow, roundShow, inRoundShow, spoilerButtonAnimation } from "./js/animations";
import { EN_DICT, RU_DICT } from "./js/consts";
import "./styles/style.scss";
const touchZapros = window.matchMedia("((hover: none) and (pointer: coarse))");
let consecutivesCount = 3;
const CONSOLE_DEBUG = false;

// let textStrings;
const language = document.querySelector("html").getAttribute("lang");

const textStrings = language == "ru" ? RU_DICT : language == "en" && EN_DICT;
// if (language == 'ru') {

// 	textStrings =
// } else if (language == 'en') {

// 	textStrings =
// }

if (touchZapros.matches) {
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

let filesJson = [];

//Проверка, есть ли ивент в url
const isEvent = new URLSearchParams(window.location.search).get("event");

const isLive = new URLSearchParams(window.location.search).get("uuid");

async function getLiveData(uuid) {
  const data = await fetch(`https://rh-results-viewer.vercel.app/api/getData?uuid=${uuid}`);

  if (!data.ok) throw new Error("Ошибка загрузки");
  const dataJson = await data.json();
  console.log("dataJsondataJson", dataJson);

  mainObj = dataJson.data.data.results;
}

async function getEventData(event) {
  const fileName = `${event}.json`;
  // const url = fileName
  const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`;
  const data = await fetch(url);
  if (!data.ok) throw new Error("Ошибка загрузки");
  mainObj = await data.json();

  console.log("EVENT", mainObj);
}

if (isLive) {
  const wrapperElement = document.querySelector(".wrapper");
  wrapperElement.classList.add("_hide");

  urlUpload("live");
} else if (isEvent) {
  const wrapperElement = document.querySelector(".wrapper");
  wrapperElement.classList.add("_hide");
  urlUpload("event");
  console.log("urlEvent");
} else {
  const mainElement = document.querySelector(".main");
  mainElement.classList.remove("_hide");
  console.log("no event on url");
}

// Загрузка ивента по имени из url
async function urlUpload(type) {
  try {
    if (type == "live") {
      await getLiveData(isLive);
      makeRaceClassButtons();
      startFileView("live", "123");
    } else if (type == "event") {
      await getEventData(isEvent);
      makeRaceClassButtons();
      startFileView("url", isEvent);
    }

    const eventUrl = new URL(window.location.href);

    eventUrl.searchParams.set("event", `${isEvent}`);

    const shareUrlElement = document.querySelector(".author__share-url");

    shareUrlElement.textContent = eventUrl.href;
    if (language == "ru") {
      const languageElement = document.querySelector(".language__EN");
      const newLanguageChangeLink = `${languageElement.getAttribute("href")}?event=${eventUrl.searchParams.get("event")}`;
      console.log("newLanguageChangeLinkRUU", newLanguageChangeLink);

      languageElement.setAttribute("href", `${newLanguageChangeLink}`);
    } else if (language == "en") {
      const languageElement = document.querySelector(".language__RU");
      const newLanguageChangeLink = `${languageElement.getAttribute("href")}?event=${eventUrl.searchParams.get("event")}`;
      console.log("newLanguageChangeLinkENNNN", newLanguageChangeLink);

      languageElement.setAttribute("href", `${newLanguageChangeLink}`);
    }
  } catch (error) {
    const wrapperElement = document.querySelector(".wrapper");
    wrapperElement.classList.add("_error");
  }
}

//Календарь///////////////////////////
let currentMonth = new Date();
const daysElement = document.querySelector(".calendar__days");

daysElement.addEventListener("click", function (e) {
  const day = e.target.closest(".calendar__day");

  if (e.target == day && day.classList.contains("_day__file")) {
    mainForm.subtittle.classList.add("_hidden");
    mainForm.label.classList.add("_hidden");
    const dateStr = e.target.id;
    getDayFiles(dateStr);
    e.target.classList.add("_active");
  }
});
const dateFilesItemsElement = document.querySelector(".date-files__items");

dateFilesItemsElement.addEventListener("click", function (e) {
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
    dateFileUpload(fileName);
  }
});

function calendarRender(filesloaded) {
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const monthHeaderElement = document.querySelector(".calendar__current-month");

  monthHeaderElement.innerHTML = `${textStrings.monthsNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

  // const nextMonthDays = 6 - lastDay.getDay() + ((firstDay.getDay() <= 4) && (firstDay.getDay() != 0) ? 1 + 7 : 1)

  const prevMonthDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const totalDays = 42;
  const nextMonthDays = totalDays - lastDay.getDate() - prevMonthDays;

  const today = new Date();

  daysElement.innerHTML = "";

  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement("button");
    dayElement.classList.add("calendar__day");

    let dayNumber, isCurrentMonth;

    if (i <= prevMonthDays) {
      dayNumber = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0).getDate() - prevMonthDays + i;
      isCurrentMonth = false;
    } else if (i > prevMonthDays + lastDay.getDate()) {
      dayNumber = i - (prevMonthDays + lastDay.getDate());
      isCurrentMonth = false;
    } else {
      dayNumber = i - prevMonthDays;
      isCurrentMonth = true;
    }

    if (currentMonth.getFullYear() == today.getFullYear() && currentMonth.getMonth() == today.getMonth() && dayNumber == today.getDate() && isCurrentMonth) {
      dayElement.classList.add("_day__today");
    }

    let isHaveFiles;
    filesJson.forEach((file) => {
      if (file.year == currentMonth.getFullYear() && file.month == currentMonth.getMonth() && file.day == dayNumber && isCurrentMonth) {
        isHaveFiles = true;
        dayElement.classList.add("_day__file");
      }
    });

    const dateStr = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${dayNumber}`;

    if (isHaveFiles) dayElement.id = dateStr;

    if (!isCurrentMonth) {
      dayElement.classList.add("_day__other-month");
    }
    dayElement.innerHTML = dayNumber;

    if (!filesloaded) {
      dayElement.classList.add("_no-files");
    } else {
      const calendarHeaderElement = document.querySelector(".calendar__header");
      calendarHeaderElement.classList.remove("_no-files");
    }
    daysElement.append(dayElement);
  }
}

const prevButton = document.querySelector(".calendar__prev-month");
const nextButton = document.querySelector(".calendar__next-month");

async function moveMonth(start, stop) {
  prevButton.classList.add("_no-event");
  nextButton.classList.add("_no-event");

  const dateFilesElement = document.querySelector(".date-files__items");
  dateFilesElement.classList.add("_hidden");

  const monthHeaderElement = document.querySelector(".calendar__current-month");

  monthHeaderElement.classList.add(`_hidden-${start}`);
  daysElement.classList.add(`_hidden-${start}`);

  await new Promise((resolve) => {
    daysElement.addEventListener("transitionend", resolve, { once: true });
  });

  daysElement.style.transition = "none";
  monthHeaderElement.style.transition = "none";
  daysElement.classList.remove(`_hidden-${start}`);
  monthHeaderElement.classList.remove(`_hidden-${start}`);
  monthHeaderElement.classList.add(`_hidden-${stop}`);
  daysElement.classList.add(`_hidden-${stop}`);

  await new Promise((resolve) => requestAnimationFrame(resolve));

  if (start == "right") {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
  } else if (start == "left") {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
  }
  calendarRender(true);

  await new Promise((resolve) => requestAnimationFrame(resolve));

  dateFilesElement.innerHTML = "";
  daysElement.style.transition = "";
  monthHeaderElement.style.transition = "";
  monthHeaderElement.classList.remove(`_hidden-${stop}`);
  daysElement.classList.remove(`_hidden-${stop}`);
  prevButton.classList.remove("_no-event");
  nextButton.classList.remove("_no-event");
}

prevButton.addEventListener("click", () => moveMonth("right", "left"));
nextButton.addEventListener("click", () => moveMonth("left", "right"));

//////////////////////////////////////////

//Файлы для календаря//////////////

async function filesJsonLoad() {
  calendarRender(false);
  let responseDataFiles;

  try {
    // const url = `https://rh-results-viewer.vercel.app/api/proxy?path=files.json`

    const url = `files.json`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Ошибка загрузки");
    const responseData = await response.json();

    // console.log('responseData', responseData);
    responseDataFiles = responseData.files;

    responseDataFiles.forEach((file) => {
      ///Собираем объект всех файлов из репозитория
      const obj = {};
      const [datePart, timePart, displayName] = file.split("_");
      const isoString = `${datePart}T${timePart.replace("-", ":")}`;
      const date = new Date(isoString);
      obj.displayName = displayName.split(".")[0].replace(/-/g, " ");
      obj.date = date;
      obj.fileName = file;
      obj.year = date.getFullYear();
      obj.month = date.getMonth();
      obj.monthName = textStrings.monthsNames[date.getMonth()];
      obj.day = date.getDate();
      obj.hours = date.getHours();
      obj.minutes = date.getMinutes();
      filesJson.push(obj);
    });

    const spanLoadeingElement = document.querySelector("._no-files-span");
    const daysElement = document.querySelector(".calendar__days");
    spanLoadeingElement.classList.add("_hidden");
    daysElement.classList.add("_hide-loading");

    spanLoadeingElement.addEventListener("transitionend", function (e) {
      if (e.propertyName == "opacity") {
        const lastFileItemElement = document.querySelector(".last-file__item");
        lastFileItemElement.classList.remove("_no-files");
        daysElement.classList.remove("_hide-loading");
        const calendarDaysElement = document.querySelector(".calendar__days");
        calendarDaysElement.classList.remove("_no-files");
      }
    });

    const lastFileNameElement = document.querySelector(".last-file__file-name-value");
    const lastFileDateElement = document.querySelector(".last-file__date-value");
    const lastFileTimeElement = document.querySelector(".last-file__time-value");

    const lastFile = filesJson[filesJson.length - 1];
    lastFileNameElement.innerHTML = lastFile.displayName;
    lastFileDateElement.innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`;
    lastFileTimeElement.innerHTML = `${lastFile.hours}:${lastFile.minutes}`;

    calendarRender(true);

    console.log("filessss", filesJson);
  } catch (error) {
    console.error("Не удалось загрузить файл:", error);
  }
}

filesJsonLoad();

function getDayFiles(date) {
  const dayButtons = document.querySelectorAll(".calendar__day");
  dayButtons.forEach((button) => {
    if (button.classList.contains("_active")) button.classList.remove("_active");
  });

  const dateFilesElement = document.querySelector(".date-files__items");
  if (!dateFilesElement.classList.contains("_hidden")) dateFilesElement.classList.add("_hidden");

  setTimeout(() => {
    dateFilesElement.innerHTML = "";

    filesJson.forEach((file) => {
      const fileDateArr = `${file.year}-${file.month}-${file.day}`;

      if (date == fileDateArr) {
        const fileItemElement = {
          item: document.createElement("div"),
          name: document.createElement("div"),
          nameTittle: document.createElement("div"),
          nameValue: document.createElement("div"),
          date: document.createElement("div"),
          dateTittle: document.createElement("div"),
          dateValue: document.createElement("div"),
          time: document.createElement("div"),
          timeTittle: document.createElement("div"),
          timeValue: document.createElement("div"),
        };

        fileItemElement.item.classList.add("file__item", "pseudo-button");
        fileItemElement.item.id = file.fileName;
        fileItemElement.name.classList.add("file__file-name");
        fileItemElement.nameTittle.classList.add("file__file-name-tittle");
        fileItemElement.nameValue.classList.add("file__file-name-value");
        fileItemElement.date.classList.add("file__date");
        fileItemElement.dateTittle.classList.add("file__date-tittle");
        fileItemElement.dateValue.classList.add("file__date-value");
        fileItemElement.time.classList.add("file__time");
        fileItemElement.timeTittle.classList.add("file__time-tittle");
        fileItemElement.timeValue.classList.add("file__time-value");

        fileItemElement.nameTittle.innerHTML = `${textStrings.event}:`;
        fileItemElement.nameValue.innerHTML = file.displayName;

        fileItemElement.dateTittle.innerHTML = `${textStrings.date}:`;
        fileItemElement.dateValue.innerHTML = `${file.day} ${file.monthName} ${file.year}`;

        fileItemElement.timeTittle.innerHTML = `${textStrings.time}:`;
        fileItemElement.timeValue.innerHTML = `${file.hours}:${file.minutes}`;

        fileItemElement.item.append(fileItemElement.name, fileItemElement.date, fileItemElement.time);
        fileItemElement.name.append(fileItemElement.nameTittle, fileItemElement.nameValue);
        fileItemElement.date.append(fileItemElement.dateTittle, fileItemElement.dateValue);
        fileItemElement.time.append(fileItemElement.timeTittle, fileItemElement.timeValue);

        dateFilesElement.append(fileItemElement.item);
      }
    });
    setTimeout(() => {
      dateFilesElement.classList.remove("_hidden");
    }, 20);
  }, 310);
}

async function dateFileUpload(fileName) {
  const fileItemElement = document.querySelector(".flie-item_uploading");
  const loadTimer = setTimeout(() => {
    fileItemElement.classList.add("_loading");
  }, 500);

  try {
    const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`;

    const data = await fetch(url);
    if (!data.ok) throw new Error("Ошибка загрузки");
    mainObj = await data.json();

    makeRaceClassButtons();

    setTimeout(() => {
      fileItemElement.classList.add("_hidden");
      fileItemElement.addEventListener("transitionend", function (e) {
        if (e.propertyName == "opacity") {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          startFileView("date", fileName);

          const eventUrl = new URL(window.location.href);
          eventUrl.searchParams.set("event", `${fileName.slice(0, -5)}`);

          history.pushState({}, "", eventUrl);

          const shareUrlElement = document.querySelector(".author__share-url");
          shareUrlElement.textContent = eventUrl.href;
        }
      });
    }, 400);
  } catch (error) {
    fileItemElement.classList.remove("_loading");
    fileItemElement.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}

////////////////////////////

const lastFileButton = document.querySelector(".last-file__item");

let currentClass; //Переменная класса
let currentClassChoosed = false; //Первый класс не выбран

let notParsedJson; // переменная НЕспарсинного файла
let mainObj; // переменная спарсинного файла
let parsedOK = false; // Флаг успешного парсинга файла

//////////////////////////////////////////////////////

async function lastFileUpload() {
  const lastFileButton = document.querySelector(".last-file__item");
  const loadTimer = setTimeout(() => {
    lastFileButton.classList.add("_loading");
  }, 500);

  try {
    // const fileName = filesJson[filesJson.length - 1].fileName;
    // const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`

    const fileName = `2025-06-24_19-31_Whoopclub.json`;
    const url = fileName;

    const data = await fetch(url);

    if (!data.ok) throw new Error("Ошибка загрузки");

    mainObj = await data.json();

    makeRaceClassButtons();
    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_move");

    lastFileButton.addEventListener("transitionend", function (e) {
      if (e.propertyName === "transform") {
        startFileView("local", filesJson[filesJson.length - 1].fileName);

        const eventUrl = new URL(window.location.href);
        eventUrl.searchParams.set("event", `${fileName.slice(0, -5)}`);

        history.pushState({}, "", eventUrl);

        const shareUrlElement = document.querySelector(".author__share-url");
        shareUrlElement.textContent = eventUrl.href;
      }
    });
  } catch (error) {
    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}

lastFileButton.addEventListener("click", function () {
  const lastFileTittle = document.querySelector(".last-file__tittle");
  const calendarElement = document.querySelector(".calendar");
  const mainSubtittleElement = document.querySelector(".main-subtittle");
  const mainForm = document.querySelector(".main-form");
  const dateFilesElement = document.querySelector(".date-files");
  const labelElement = document.querySelector(".main-form__label");
  const languageElement = document.querySelector(".language");

  languageElement.classList.add("_hidden");
  dateFilesElement.classList.add("_hidden");
  labelElement.classList.add("_hidden");
  mainSubtittleElement.classList.add("_hidden");
  mainForm.classList.add("_hidden");
  calendarElement.classList.add("_hidden");
  lastFileTittle.classList.add("_hidden");

  lastFileButton.classList.add("_active");
  lastFileUpload();
});

const mainForm = {
  tittle: document.querySelector(".main-tittle"),
  form: document.querySelector(".main-form"),
  input: document.querySelector(".main-form__file"),
  label: document.querySelector(".main-form__label"),
  button: document.querySelector(".main-form__button"),
  subtittle: document.querySelector(".main-subtittle"),
};

const buttons = {
  element: document.querySelector(".buttons"),
  container: document.querySelector(".buttons__container"),
  pilots: document.querySelector(".buttons__pilots"),
  leaderboard: document.querySelector(".buttons__leaderboard"),
  rounds: document.querySelector(".buttons__rounds"),
  statistic: document.querySelector(".round__statistic-button"),
  view: document.querySelector(".round__view-button"),
};

let tabsMain;
let tabsLeader;
let tabsRounds;
let tabsPilotsVs;

let graphMouseFlag;
let graphTouchFlag;
let akcentArr;
let lapsIdData = [];
let pilotsVsDuel = [];

mainForm.input.addEventListener("change", async function () {
  //Событие добавление файла
  const file = mainForm.input.files[0];

  if (file) {
    //Проверяем, добавился ли файл
    if (CONSOLE_DEBUG) console.log("файле есть");
    mainForm.button.classList.add("_ready");
    mainForm.label.innerHTML = textStrings.choosed;
    mainForm.label.classList.add("_active");
    mainForm.button.classList.add("_active");
    if (mainForm.label.classList.contains("_error-parsing")) {
      //Если добавляем файл после ошибки парсинга, убираем стили ошибки
      mainForm.label.classList.remove("_error-parsing");
    }
  } else {
    // Если не добавился, убираем стили того, как добавился, т.к. они могут быть
    if (CONSOLE_DEBUG) console.log("файл нет");
    mainForm.label.classList.remove("_active");
    mainForm.label.innerHTML = textStrings.choose;
    mainForm.button.classList.remove("_ready");
  }
});

async function fileLoading(fileToUpload) {
  //процесс загрузки файла
  const stringJson = await fileProcessUpload(fileToUpload);
  return stringJson; // возвращаем значение прочитанного файла из промисса
}

function fileProcessUpload(fileToUpload) {
  // здесь делаем промис, который fullfilled когда файл загрузится
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    reader.readAsText(fileToUpload);

    reader.onload = function () {
      const data = reader.result;
      resolve(data);
    };

    reader.onerror = function () {
      const error = reader.error;
      reject(error);
    };
  });
}

function fileToParse(stringJson) {
  // Парсим файл, ставим флаг ОК, если Ок
  let data;
  try {
    data = JSON.parse(stringJson);
    if (CONSOLE_DEBUG) console.log(data);

    parsedOK = true;
    return data;
  } catch {
    if (CONSOLE_DEBUG) console.log("Ошибка Парсинга");
    parsedOK = false;
  }
}

async function startButtonClick(e) {
  //Нажатие на кнопку Загрузить - Самое начало
  e.preventDefault();
  const file = mainForm.input.files[0];

  if (file) {
    //Проверяем, есть ли файл

    notParsedJson = await fileLoading(file); //Здесь читаем файл и записываем его в переменную
    if (CONSOLE_DEBUG) console.log(notParsedJson);
    mainObj = fileToParse(notParsedJson); // Здесь парсим эту переменную
    if (parsedOK) {
      //Проверяем, норм ли спарсилось, и если да, убираем форму ввода и показываем дальнейшие кнопки

      makeRaceClassButtons();
      startFileView("load");
    } else {
      //Если не спарсилось, рисуем ошибку
      mainForm.button.innerHTML = textStrings.error;
      mainForm.button.classList.add("_error-parsing");
      mainForm.label.innerHTML = textStrings.chooseAnother;
      mainForm.label.classList.add("_error-parsing");
      mainForm.button.classList.remove("_ready");
      setTimeout(() => {
        smoothTextChange(mainForm.button, textStrings.load);
        mainForm.button.classList.remove("_error-parsing");
      }, getAnimationDurationTime(mainForm.button));
    }
  } else {
    //Если нет файла, показываем, как его нет и куда добавить
    if (CONSOLE_DEBUG) console.log("Файла нет");
    mainForm.label.classList.add("_error");
    setTimeout(() => {
      mainForm.label.classList.remove("_error");
    }, getAnimationDurationTime(mainForm.label));
  }
}

function makeRaceClassButtons() {
  //Делаем кнопки Классов
  const classButtonsContainer = document.querySelector(".class-switch-buttons__container");
  const raceClasses = mainObj.classes;

  // let tabsClasses = [];
  for (let raceClass in raceClasses) {
    if (mainObj.heats_by_class[raceClass].length != 0) {
      const classSwitchButton = document.createElement("button");
      classSwitchButton.classList.add(`class-switch-buttons__class-${raceClass}`, "_button", "class-switch-buttons__button");
      classSwitchButton.innerHTML = raceClasses[raceClass].name;
      classButtonsContainer.append(classSwitchButton);
      classSwitchButton.setAttribute("value", `${raceClass}`);
      classSwitchButton.addEventListener("click", classSwitch);

      // if (!currentClassChoosed) {			//С таким учловием будет выбран 1 класс
      // 	currentClass = raceClass
      // 	classSwitchButton.classList.add('_active', '_no-event')
      // 	currentClassChoosed = true;
      // }
    }
  }

  const classSwitchButtons = document.querySelectorAll(".class-switch-buttons__button");
  const lastClassButtonSwitch = classSwitchButtons[classSwitchButtons.length - 1];
  lastClassButtonSwitch.classList.add("_active", "_no-event");

  currentClass = lastClassButtonSwitch.getAttribute("value");
}

function startFileView(fileType, fileName) {
  try {
    consecutivesCount = mainObj.consecutives_count;
  } catch (error) {
    if (CONSOLE_DEBUG) console.log("Не найдена информация о consecutives count");
  }

  const tabWrapper = document.querySelector(".tabs-wrapper");
  tabWrapper.append(writePilotsHTML(), writeLeaderboardHTML(), writeRoundsHTML()); //добавляем HTML пилоты, круги, подряд и раунды

  //определяем вкладки, чтобы навесить на них событие, тут же информация для tabSwitch функции
  tabsMain = [
    { name: "pilots", opened: false, element: document.querySelector(".pilots") },
    { name: "leaderboard", opened: false, element: document.querySelector(".leaderboard") },
    { name: "rounds", opened: false, element: document.querySelector(".rounds") },
  ];

  tabsLeader = [
    { name: "lap", opened: false, element: document.querySelector(".leaderboard-lap") },
    { name: "consecutive", opened: false, element: document.querySelector(".leaderboard-consecutive") },
    { name: "count", opened: false, element: document.querySelector(".leaderboard-count") },
    { name: "average", opened: false, element: document.querySelector(".leaderboard-average") },
  ];
  buttons.lap = document.querySelector(".leaderboard__lap-button");
  buttons.consecutive = document.querySelector(".leaderboard__consecutive-button");
  buttons.count = document.querySelector(".leaderboard__count-button");
  buttons.average = document.querySelector(".leaderboard__average-button");

  tabsRounds = getTabsRounds();

  tabsRounds.forEach((tab) => {
    const tabName = tab.name;
    buttons[tabName] = document.querySelector(`.rounds__${tabName}`);
  });

  tabsMain[0].element.addEventListener("click", pilotTabAction); //открываем события вкладки Pilots
  tabsMain[1].element.addEventListener("click", leaderboardTabAction); //открываем события вкладки Leaderboard

  tabsMain[2].element.addEventListener("click", roundsTabAction); //открываем события вкладки Rounds

  tabSwitch(tabsLeader[0].name, tabsLeader);
  const leaderboardItemsElement = document.querySelector(".leaderboard__items");
  tabHeightChange(tabsLeader[0].element, leaderboardItemsElement, true);

  tabSwitch(tabsRounds[0].name, tabsRounds);
  const roundsItemsElement = document.querySelector(".rounds__items");

  tabHeightChange(tabsRounds[0].element, roundsItemsElement, true);

  if (fileType != "classSwitch") {
    const shareElement = document.querySelector(".author__share");

    shareElement.classList.remove("_hide");

    shareElement.addEventListener("click", async function () {
      const urlToCopy = document.querySelector(".author__share-url").textContent;
      try {
        await navigator.clipboard.writeText(urlToCopy);

        shareElement.classList.add("_success");
        const timer = setTimeout(() => {
          shareElement.classList.remove("_success");
          clearTimeout(timer);
        }, 1000);
      } catch (error) {
        shareElement.classList.add("_error");
        const timer = setTimeout(() => {
          shareElement.classList.remove("_error");
          clearTimeout(timer);
        }, 1000);
      }
    });

    const windowWidth = window.innerWidth; // ширина окна, сколько надо проехаться кнопками за границу
    const buttonWidth = mainForm.button.offsetWidth; //ширина кнопки, чтобы не торчали края
    const labelWidth = mainForm.label.offsetWidth; //ширина label чтобы не торчали края

    const lastFileElement = document.querySelector(".last-file");
    const dateFilesElement = document.querySelector(".date-files");
    const calendarElement = document.querySelector(".calendar");

    if (fileType == "load") {
      lastFileElement.classList.add("_hidden");
      mainForm.button.style.transition = "all 1s ease";
      mainForm.button.style.transform = `translate(${windowWidth / 2 + buttonWidth}px, 0px)`; //едем
      mainForm.label.style.transition = "all 1s ease";
      mainForm.label.style.transform = `translate(-${windowWidth / 2 + labelWidth}px, 0px)`; //едем
      mainForm.subtittle.classList.add("_hidden");
      dateFilesElement.classList.add("_hidden");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    }

    mainForm.subtittle.classList.add("_hidden");

    setTimeout(() => {
      //меняем после анимации кнопки и label, которые ниже.
      const mainDisplayName = document.querySelector(".main-tittle__display-name");
      const mainDate = document.querySelector(".main-tittle__date");
      const mainTime = document.querySelector(".main-tittle__time");
      if (fileType != "load" && fileType != "live") {
        const [datePart, timePart, displayName] = fileName.split("_");
        const isoString = `${datePart}T${timePart.replace("-", ":")}`;
        const date = new Date(isoString);
        console.log("date", date);

        mainDisplayName.innerHTML = displayName.split(".")[0].replace(/-/g, " ");
        mainDate.innerHTML = `${date.getDate()} ${textStrings.monthsNames[date.getMonth()]} ${date.getFullYear()}`;
        mainTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
      } else if (fileType == "load") {
        const day = getDateinfo("day");
        const year = getDateinfo("year");
        const time = getDateinfo("time");
        mainDisplayName.innerHTML = `${textStrings.event}`;
        mainDate.innerHTML = `${day} ${year}`;
        mainTime.innerHTML = `${time}`;
      }
      mainForm.tittle.classList.remove("_hidden");
      lastFileElement.remove();
      calendarElement.remove();
      dateFilesElement.remove();
      if (fileType == "url" || fileType == "live") {
        const mainElement = document.querySelector(".main");
        const wrapperElement = document.querySelector(".wrapper");

        mainElement.classList.remove("_hide");
        wrapperElement.classList.add("_to-hide");
        const hideEnd = setTimeout(() => {
          wrapperElement.classList.remove("_to-hide");
          wrapperElement.classList.remove("_hide");
          clearTimeout(hideEnd);
        }, 1000);
      }
    }, 500);

    setTimeout(() => {
      const classButtonsContainer = document.querySelector(".class-switch-buttons__container");
      mainForm.button.remove();
      mainForm.form.remove();
      mainForm.subtittle.remove();
      buttons.container.classList.add("_active");
      classButtonsContainer.classList.add("_active");

      const homeElement = document.querySelector(".home");
      homeElement.classList.remove("_hidden");
    }, 500);
  } else {
    setTimeout(() => {
      const buttonsContainer = document.querySelector(".class-switch-buttons__container");
      buttonsContainer.classList.remove("_no-event");

      const buttonPilots = document.querySelector(".buttons__pilots");
      const buttonLeaderboard = document.querySelector(".buttons__leaderboard");
      const buttonRounds = document.querySelector(".buttons__rounds");
      buttonPilots.classList.add("_ready");
      buttonLeaderboard.classList.add("_ready");
      buttonRounds.classList.add("_ready");
    }, 450);
  }
  setTimeout(() => {
    tabSwitch(tabsMain[1].name, tabsMain);
  }, 550);
}

mainForm.form.addEventListener("submit", startButtonClick); //событие нажатия на кнопку

function pilotTabAction(e) {
  //Это события вкладки Pilots

  if (e.target.closest(".pilots__pilot-name")) {
    //если нажата с именем делаем spoilerOn;
    const pilotItem = e.target.parentNode;
    const stats = e.target.nextElementSibling;
    const statsChildren = stats.children;
    if (CONSOLE_DEBUG) console.log(statsChildren);

    for (let i = 2; i < statsChildren.length - 2; i++) {
      statsChildren[i].classList.toggle("_active");
    }
    e.target.classList.toggle("_active");
    pilotItem.classList.toggle("_active");
    spoilerOnOff(stats, e.target);
  }

  if (e.target.closest("._button-spoiler")) {
    //если нажат спойлер, делам spoilerOn и анимация спойлера
    const parentElement = e.target.parentNode;

    const statsToOpen = e.target.nextElementSibling;
    const allStats = statsToOpen.querySelectorAll("._stat-item");
    const bestTimes = parentElement.querySelectorAll(".pilots__best-lap-time-value");
    const bestConsecutives = parentElement.querySelectorAll(".pilots__best-consecutives-time-value");

    if (CONSOLE_DEBUG) console.log("STAT", statsToOpen);

    let mainTime;
    const firstTime = allStats[0];
    const firstTimePosition = firstTime.offsetTop;
    let mainTimePosition;

    if (statsToOpen.classList.contains("pilots__best-lap-items")) {
      mainTime = bestTimes[0];
      mainTimePosition = mainTime.offsetTop;
    } else if (statsToOpen.classList.contains("pilots__best-consecutives-items")) {
      mainTime = bestConsecutives[0];
      mainTimePosition = mainTime.offsetTop;
    }

    if (statsToOpen.classList.contains("_active")) {
      mainTime.style.top = null;
    } else {
      if (CONSOLE_DEBUG) console.log(mainTime);

      if (CONSOLE_DEBUG) console.log("top", firstTimePosition - mainTimePosition + 10 + 5);

      mainTime.style.top = `${firstTimePosition - mainTimePosition + 10 + 5}px`;
    }

    spoilerButtonAnimation(e.target);
    spoilerOnOff(statsToOpen, e.target);
    const statsTittle = statsToOpen.querySelector(".stats-tittles");
    statsTittle.classList.toggle("_active");
    allStats.forEach((stat, index) => {
      if (index != allStats.length - 1) {
        stat.classList.toggle("_active");
      }
    });
  }

  if (e.target.closest(".pilots__all-laps-button")) {
    //если нажата все круги
    const parent = e.target.closest(".pilots__item");
    const nameElement = parent.querySelector(".pilots__pilot-name");
    const name = nameElement.innerHTML; //ищем имя

    const tabWrapper = document.querySelector(".tabs-wrapper");
    tabWrapper.after(writeAllLapsHTML(name)); //добавляем HTML все круги

    const allLapsElement = document.querySelector(".all-laps");
    const exitButton = document.querySelector(".all-laps__exit-button");
    const allLapsArea = document.querySelector(".all-laps__laps-area");
    const allLapsLaps = document.querySelector(".all-laps__laps");
    const allLapsLap = document.querySelectorAll(".all-laps__lap");
    const pseudoLap = document.querySelector(".all-laps__pseudo-lap");
    const plusBtn = document.querySelector(".all-laps__plus");
    const minusBtn = document.querySelector(".all-laps__minus");
    const slider = document.querySelector(".all-laps__slider");

    //Здесь считаем начальную ширину графика, чтобы влез в контейнер.
    //величину области показа, минус псевдо круг и финальный круг и падинги делим на количество кругов
    //получаем ширину одног круга для Grid
    allLapsLaps.style.gridTemplateColumns = `7px repeat(${allLapsLap.length - 1},${
      (allLapsArea.offsetWidth - pseudoLap.offsetWidth - allLapsLap[allLapsLap.length - 1].offsetWidth - parseInt(getComputedStyle(allLapsArea).paddingLeft) * 2 - 10) / (allLapsLap.length - 1)
    }px)7px`;

    setTimeout(() => {
      //небольшая задержка для подстраховки, чтоб отрисовался html, а потом показывать
      modalOnOff(allLapsElement, true); //Показываем контейнеры
      allLapsShow(allLapsElement, e.target, name);
    }, 10);

    minusBtn.classList.add("_no-event"); //Запрещаем кнопку МИНУС, так как это самый маленький масштаб

    plusBtn.addEventListener("click", () => allLapsGraphScale("plus"));
    minusBtn.addEventListener("click", () => allLapsGraphScale("minus"));
    slider.addEventListener("input", () => allLapsGraphChoosing(name, "_active"));

    allLapsArea.addEventListener("scroll", function () {
      //при скролле двигаются цифры... сомнительно
      const averageLine = document.querySelector(".all-laps__average-line");
      const maxLine = document.querySelector(".all-laps__max-line");
      const averageValue = averageLine.querySelector("span");
      const maxValue = maxLine.querySelector("span");
      averageValue.style.transform = `translate(${allLapsArea.scrollLeft}px, 0)`;
      maxValue.style.transform = `translate(${allLapsArea.scrollLeft}px, 0)`;
    });

    allLapsArea.addEventListener("click", function (e) {
      //клик по графику
      const laps = document.querySelectorAll(".all-laps__lap");
      if (e.target.closest(".all-laps__lap-graph") || e.target.closest(".all-laps__lap-graph-obj")) {
        const currentLap = e.target.closest(".all-laps__lap");
        let currentIndex;
        laps.forEach((element, index) => {
          if (element == currentLap) {
            currentIndex = index;
            return;
          }
        });
        slider.value = currentIndex;
        allLapsGraphChoosing(name, "_active");
      }
    });

    allLapsArea.addEventListener("touchstart", function (e) {
      //старт перетаскивания ползунка
      const currentLap = e.target.closest(".all-laps__lap");
      if (currentLap.classList.contains("_choosed")) {
        currentLap.classList.add("_hold");
        const allLapsAreaHeight = allLapsArea.offsetHeight;
        const allLapsAreaHeightScroll = allLapsArea.clientHeight;
        allLapsArea.style.paddingBottom = `${allLapsAreaHeight - allLapsAreaHeightScroll}px`;
        allLapsArea.classList.add("_lock");
        graphTouchFlag = true;
      }
    });

    allLapsArea.addEventListener("touchend", function (e) {
      //отпустили ползунок
      const allLaps = document.querySelectorAll(".all-laps__lap");
      allLaps.forEach((element) => {
        element.classList.remove("_choosed");
        element.classList.remove("_hold");

        if (element.classList.contains("_active") || element.classList.contains("_active-permanent")) {
          element.classList.add("_choosed");
        }
      });
      allLapsArea.classList.remove("_lock");
      allLapsArea.style.paddingBottom = null;
      graphTouchFlag = false;
    });

    allLapsArea.addEventListener("touchmove", function (e) {
      //тащим ползунок
      const allLapsAreaPosition = allLapsArea.offsetTop;
      const allLapsAreaHalfHeight = allLapsArea.offsetHeight / 2;
      const elem = document.elementFromPoint(e.touches[0].clientX, allLapsAreaPosition + allLapsAreaHalfHeight);
      if (graphTouchFlag) {
        if (CONSOLE_DEBUG) console.log("ELEM", elem);

        const laps = document.querySelectorAll(".all-laps__lap");
        const currentLap = elem.closest(".all-laps__lap");
        let currentIndex;
        laps.forEach((element, index) => {
          if (element == currentLap) {
            currentIndex = index;
            return;
          }
        });
        slider.value = currentIndex;
        allLapsGraphChoosing(name, "_active-permanent");
      }
    });

    exitButton.addEventListener("click", function () {
      //Нажимае на крест - выходим
      modalOnOff(allLapsElement, false);
      setTimeout(() => {
        allLapsElement.remove();
      }, 500);
    });
  }

  if (e.target.closest("._button-time")) {
    // Нажатие кнопки времени, готовимся отрисовать inRound

    const parent = e.target.closest(".pilots__item"); //Собираем  информацию о раунде
    const nameElement = parent.querySelector(".pilots__pilot-name");
    const name = nameElement.innerHTML;

    const heat = getHeat(name);

    let lapData; //выбраный круг
    let otherLapData; //круги в раунде выбранного

    //Проверяем, круг или подряд
    if (e.target.classList.contains("pilots__best-lap-time-value")) {
      lapData = getLapData(e.target.innerHTML, "lap", name, heat, "current"); //получаем выбранный кргу
      if (CONSOLE_DEBUG) console.log("LAP DATA", e.target.innerHTML);

      otherLapData = getLapData(e.target.innerHTML, "lap", name, heat, "other"); //получаем отсальные круги раунда

      if (CONSOLE_DEBUG) console.log("G E T L A P", lapData);
      if (CONSOLE_DEBUG) console.log("G E T O T H E R", otherLapData);
    }

    //Проверяем, круг или подряд
    if (e.target.classList.contains("pilots__best-consecutives-time-value")) {
      lapData = getLapData(e.target.innerHTML, "consecutive", name, heat, "current"); //получаем выбранные круги подряд
      otherLapData = getLapData(e.target.innerHTML, "consecutive", name, heat, "other"); //получаем остальные круги раунда

      if (CONSOLE_DEBUG) console.log("G E T C O N S", lapData);
      if (CONSOLE_DEBUG) console.log("G E T O T H E R", otherLapData);
    }
    if (CONSOLE_DEBUG) console.log("NAME BEFORE INROUND", lapData);

    buttons.element.after(writeInRoundHTML(lapData, otherLapData, name)); //Отрисовываем inRound

    const inRoundElement = document.querySelector(".in-round");

    setTimeout(() => {
      // таймаут 10мс, чтобы HTML успел отрисоваться, а потом пошла анимация появления
      modalOnOff(inRoundElement, true);
      inRoundShow(inRoundElement, e.target);
    }, 10);

    const exitButton = inRoundElement.querySelector("._button-exit");
    const inRoundArea = inRoundElement.querySelector(".in-round__round-area-laps");

    inRoundArea.addEventListener("click", function (e) {
      //Нажимае на круг - показывается время
      if (e.target.closest(".in-round__lap-column")) {
        const column = e.target;
        const lap = e.target.parentNode;
        const lapNode = lap.nextElementSibling;

        lapNodeShow(lapNode, column, 3000);
      }
    });

    exitButton.addEventListener("click", function () {
      //Нажимае на крест - выходим
      modalOnOff(inRoundElement, false);
      setTimeout(() => {
        inRoundElement.remove();
      }, 500);
    });

    const addButton = document.querySelector(".in-round__to-round-button");

    addButton.addEventListener("click", function () {
      fromInRoundToRoundAction(addButton);
    });
  }

  if (e.target.classList.contains("label__span")) {
    const labelSpan = e.target;
    const labelElement = e.target.parentNode;
    const InputElement = labelElement.nextElementSibling;

    labelElement.classList.toggle("_active");
    InputElement.checked = !InputElement.checked;
    if (CONSOLE_DEBUG) console.log("labelSpan", labelSpan);
    if (CONSOLE_DEBUG) console.log("labelElement", labelElement);
    if (CONSOLE_DEBUG) console.log("InputElement", InputElement.name);
    if (CONSOLE_DEBUG) console.log("InputElementCheck", InputElement.checked);

    const pilotsVsLabels = document.querySelectorAll(".pilots-vs-form-input__label");
    const pilotsVsInputs = document.querySelectorAll(".pilots-vs-form-input");

    pilotsVsInputs.forEach((value, key) => {
      if (pilotsVsInputs[key].checked && pilotsVsInputs[key].name != pilotsVsDuel[0]) {
        pilotsVsDuel.push(value.name);
      } else if (!pilotsVsInputs[key].checked && pilotsVsInputs[key].name == InputElement.name) {
        pilotsVsDuel = [];
      }
    });

    if (pilotsVsDuel.length == 2) {
      console.log(pilotsVsDuel[0]);
      console.log(pilotsVsDuel[1]);

      console.log("pilotsVsDuel[0], pilotsVsDuel[1]", pilotsVsDuel[0], pilotsVsDuel[1]);

      pilotsVsActions(pilotsVsDuel[0], pilotsVsDuel[1]);

      setTimeout(() => {
        pilotsVsLabels.forEach((label) => {
          label.classList.remove("_active");
        });
        pilotsVsInputs.forEach((value, key) => {
          pilotsVsInputs[key].checked = false;
          pilotsVsDuel = [];
        });
      }, 500);
    }
  }

  // const pilotsVsInputs = document.querySelectorAll('.pilots-vs-form-input');
  // const pilotsVsLabels = document.querySelectorAll('.pilots-vs-form-input__label');
  // pilotsVsLabels.forEach(label => {
  // 	const labelSpan = label.querySelector('span')
  // 	labelSpan.addEventListener('click', function () {
  // 		label.classList.toggle('_active')
  // 	})
  // })
}

function fromInRoundToRoundAction(buttonPressed) {
  // const tittleName = document.querySelector('.in-round__tittle-name')
  // const tittleRound = document.querySelector('.in-round__tittle-round')
  // const nameText = tittleName.firstElementChild.innerHTML;
  // const roundText = tittleRound.firstElementChild.innerHTML;

  // const heatNum = getHeat(nameText)
  // const roundNum = getNumFromText(roundText)

  // if(CONSOLE_DEBUG)console.log('tittleName', heatNum);
  // if(CONSOLE_DEBUG)console.log('tittleRound', roundNum);

  const heatNumElement = document.querySelector(".in-round__heatNum");
  const roundNumElement = document.querySelector(".in-round__roundNum");

  if (CONSOLE_DEBUG) console.log("VALLLLLLLLUW-123123-1-23-12-312", heatNumElement.getAttribute("value"));
  const roundNum = roundNumElement.getAttribute("value");
  const heatNum = heatNumElement.getAttribute("value");

  goToRoundAction(roundNum, heatNum, buttonPressed);

  //Если надо убрать

  // setTimeout(() => {
  // 	const inRoundElement = document.querySelector('.in-round')
  // 	modalOnOff(inRoundElement, false);
  // 	setTimeout(() => {
  // 		inRoundElement.remove();
  // 	}, 50);
  // }, 500);
}

function leaderboardTabAction(e) {
  const itemsElement = document.querySelector(".leaderboard__items");
  if (e.target.closest(".leaderboard__lap-button")) {
    tabSwitch(tabsLeader[0].name, tabsLeader);

    tabHeightChange(tabsLeader[0].element, itemsElement, false);

    // setTimeout(() => {
    // 	const tabWidth = tabsLeader[0].element.offsetHeight;
    // 	const itemElementWidth = itemsElement.offsetHeight;

    // 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

    // }, getTransitionDurationTime(tabsLeader[0].element));
  }
  if (e.target.closest(".leaderboard__consecutive-button")) {
    tabSwitch(tabsLeader[1].name, tabsLeader);

    tabHeightChange(tabsLeader[1].element, itemsElement, false);

    // setTimeout(() => {
    // 	const tabWidth = tabsLeader[1].element.offsetHeight;
    // 	const itemElementWidth = itemsElement.offsetHeight;

    // 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

    // }, getTransitionDurationTime(tabsLeader[1].element));
  }
  if (e.target.closest(".leaderboard__count-button")) {
    tabSwitch(tabsLeader[2].name, tabsLeader);

    tabHeightChange(tabsLeader[2].element, itemsElement, false);

    // setTimeout(() => {
    // 	const tabWidth = tabsLeader[2].element.offsetHeight;
    // 	const itemElementWidth = itemsElement.offsetHeight;

    // 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`
    // }, getTransitionDurationTime(tabsLeader[2].element));
  }
  if (e.target.closest(".leaderboard__average-button")) {
    tabSwitch(tabsLeader[3].name, tabsLeader);

    tabHeightChange(tabsLeader[3].element, itemsElement, false);

    // setTimeout(() => {
    // 	const tabWidth = tabsLeader[3].element.offsetHeight;
    // 	const itemElementWidth = itemsElement.offsetHeight;

    // 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

    // }, getTransitionDurationTime(tabsLeader[3].element));
  }

  if (e.target.closest("._button-time")) {
    const parent = e.target.parentNode; //Собираем  информацию о раунде
    const nameElement = parent.firstElementChild;
    const name = nameElement.children[1].innerHTML;
    // if(CONSOLE_DEBUG)console.log(name);

    const heat = getHeat(name);

    let lapData; //выбраный круг
    let otherLapData; //круги в раунде выбранного

    //Проверяем, круг или подряд
    if (e.target.classList.contains("leaderboard-lap__time")) {
      lapData = getLapData(e.target.innerHTML, "lap", name, heat, "current"); //получаем выбранный кргу
      if (CONSOLE_DEBUG) console.log("LAP DATA", e.target.innerHTML);

      otherLapData = getLapData(e.target.innerHTML, "lap", name, heat, "other"); //получаем отсальные круги раунда

      if (CONSOLE_DEBUG) console.log("G E T L A P", lapData);
      if (CONSOLE_DEBUG) console.log("G E T O T H E R", otherLapData);
    }

    //Проверяем, круг или подряд
    if (e.target.classList.contains("leaderboard-consecutive__time")) {
      lapData = getLapData(e.target.innerHTML, "consecutive", name, heat, "current"); //получаем выбранные круги подряд
      otherLapData = getLapData(e.target.innerHTML, "consecutive", name, heat, "other"); //получаем остальные круги раунда

      if (CONSOLE_DEBUG) console.log("G E T C O N S", lapData);
      if (CONSOLE_DEBUG) console.log("G E T O T H E R", otherLapData);
    }

    if (CONSOLE_DEBUG) console.log("NAME BEFORE INROUND", lapData);

    buttons.element.after(writeInRoundHTML(lapData, otherLapData, name)); //Отрисовываем inRound

    const inRoundElement = document.querySelector(".in-round");

    setTimeout(() => {
      // таймаут 10мс, чтобы HTML успел отрисоваться, а потом пошла анимация появления
      modalOnOff(inRoundElement, true);
      inRoundShow(inRoundElement, e.target);
    }, 10);

    const exitButton = inRoundElement.querySelector("._button-exit");
    const inRoundArea = inRoundElement.querySelector(".in-round__round-area-laps");

    inRoundArea.addEventListener("click", function (e) {
      //Нажимае на круг - показывается время
      if (e.target.closest(".in-round__lap-column")) {
        const column = e.target;
        const lap = e.target.parentNode;
        const lapNode = lap.nextElementSibling;
        lapNodeShow(lapNode, column, 3000);
      }
    });

    exitButton.addEventListener("click", function () {
      //Нажимае на крест - выходим
      modalOnOff(inRoundElement, false);
      setTimeout(() => {
        inRoundElement.remove();
      }, 500);
    });

    const addButton = document.querySelector(".in-round__to-round-button");

    addButton.addEventListener("click", function () {
      fromInRoundToRoundAction(addButton);
    });
  }
}

function goToRoundAction(round, heat, buttonPressed) {
  const tabWrap = document.querySelector(".tabs-wrapper");
  currentRoundInfo = getRound(+round, +heat);
  tabWrap.after(writeRound(+round, +heat));
  const roundElement = document.querySelector(".round");
  const exitButton = document.querySelector(".round__exit-button");

  setTimeout(() => {
    modalOnOff(roundElement, true);
    roundShow(roundElement, buttonPressed);
  }, 10);
  const pilotsElement = document.querySelector(".round__graph-area-pilots");
  const pilotsPadding = parseInt(getComputedStyle(pilotsElement).paddingRight);
  const scrollWidth = pilotsElement.offsetWidth - pilotsElement.clientWidth;

  pilotsElement.style.paddingRight = `${pilotsPadding - scrollWidth}px`;

  const pilots = document.querySelectorAll(".round__graph-area-pilot");

  pilots.forEach((pilotElement, pilotIndex) => {
    const pilotName = pilotElement.querySelector(".round__graph-area-name").innerHTML;
    const pilotLaps = pilotElement.querySelectorAll(".round__graph-area-lap");
    intervals[pilotName] = [];
    lapState[pilotName] = [];
    pilotsIntervalCount[pilotName] = [];
    pilotsName.push(pilotName);
    if (CONSOLE_DEBUG) console.log(pilotName);
    if (CONSOLE_DEBUG) console.log(pilotLaps);
    let pilotLapsArr = [];

    pilotLaps.forEach((element, index) => {
      pilotLapsArr.push(element);
      intervals[pilotName].push(null);
      if (index == 0) {
        lapState[pilotName].push(false);
      } else {
        lapState[pilotName].push(false);
      }

      if (index == pilotLaps.length - 1) {
        lapsByPilot[pilotName] = pilotLapsArr;
      }
    });

    currentRoundInfo.forEach((element, index) => {
      if (element[element.length - 1] == pilotName) {
        const lapQuantity = element.length - 2;
        const times = [];
        for (let i = 0; i <= lapQuantity; i++) {
          if (i == 0) {
            const holeFloat = lapTimeConverter(element[i], "float");
            const holeStep = +holeFloat;
            holeShots[pilotName] = {};
            holeShots[pilotName].timeout = +holeStep.toFixed(0) * 100;
            holeShots[pilotName].state = false;
            holeShots[pilotName].state = null;
          } else {
            const lapTimeFloat = lapTimeConverter(element[i].lapTime, "float");
            const timeStep = +lapTimeFloat;
            if (CONSOLE_DEBUG) console.log("LAP TIMEEEEEEE", lapTimeFloat);

            times.push(+timeStep.toFixed(0));
            pilotsIntervalCount[pilotName].push(1);
          }
        }
        lapTimeStep[pilotName] = times;
      }
    });
  });

  const slider = document.querySelector(".round__slider");
  slider.oninput = () => speedChange(slider);

  speedChange(slider);

  tabsRound = [
    { name: "view", opened: false, element: document.querySelector(".round__view") },
    { name: "statistic", opened: false, element: document.querySelector(".round__statistic") },
  ];

  buttons.rounds = document.querySelector(".buttons__rounds");
  buttons.statistic = document.querySelector(".round__statistic-button");
  buttons.view = document.querySelector(".round__view-button");

  const roundButtons = document.querySelector(".round__buttons");
  const roundPlayButton = document.querySelector(".round__play-button");
  const paragraph = roundPlayButton.firstElementChild;

  roundButtons.addEventListener("click", function (e) {
    const viewButton = roundButtons.querySelector(".round__view-button");
    const statisticButton = roundButtons.querySelector(".round__statistic-button");
    if (e.target == viewButton) {
      tabSwitch(tabsRound[0].name, tabsRound);
      // if (roundPlayState != 'end') {
      // 	textChange(paragraph, `< p > Пауза</ > `, 150);
      // 	startRound();
      // 	roundPlayState = 'play';
      // }
    }
    if (e.target == statisticButton) {
      tabSwitch(tabsRound[1].name, tabsRound);
      // if (roundPlayState != 'end') {
      // 	textChange(paragraph, `< p > Старт</ > `, 150);
      // 	pauseRound();
      // 	roundPlayState = 'pause';
      // }
    }
  });

  roundPlayButton.addEventListener("click", function (e) {
    const paragraph = roundPlayButton.firstElementChild;
    if (roundPlayState == "play") {
      textChange(paragraph, `<p>${textStrings.roundsTab.play}</p>`, 150);
      pauseRound();
      roundPlayState = "pause";
    } else if (roundPlayState == "pause") {
      textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 150);
      startRound();
      roundPlayState = "play";
    } else if (roundPlayState == "end") {
      for (nameForLap in lapsByPilot) {
        const laps = lapsByPilot[nameForLap];
        laps.forEach((lap) => {
          lap.style.transition = `all 0.8s ease`;
          lap.style.width = `0%`;
          lap.classList.remove("_akcent");
          setTimeout(() => {
            lap.style.transition = null;
          }, 800);
        });
      }

      const roundPlayButton = document.querySelector(".round__play-button");
      const slider = document.querySelector(".round__slider");
      roundPlayButton.classList.add("_no-event");
      slider.classList.add("_no-event");

      setTimeout(() => {
        textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 250);
      }, 300);
      setTimeout(() => {
        startRound();
      }, 800);
      roundPlayState = "play";
    }
  });

  exitButton.addEventListener("click", function () {
    //Нажимае на крест - выходим
    pauseRound();
    modalOnOff(roundElement, false);
    setTimeout(() => {
      clearInterval(intervalButtonsAccept);
      for (const holeNames in holeShots) {
        const holeObj = holeShots[holeNames];
        clearInterval(holeObj.interval);
        if (CONSOLE_DEBUG) console.log("holeObj", holeObj);
      }

      lastHoleShot = false;
      tabsRound = [];
      pilotsName = [];
      lapsByPilot = {};
      intervals = {};
      lapTimeStep = {};
      lapState = {};
      holeShots = {};
      pilotsIntervalCount = {};
      currentRoundInfo = null;
      roundPlayState = "pause";
    }, 400);

    setTimeout(() => {
      roundElement.remove();
    }, 500);
  });

  tabSwitch(tabsRound[0].name, tabsRound);
  roundStatsStrokeWidthChange();
}

let tabsRound = [];
let pilotsName = [];
let lapsByPilot = {};
let intervals = {};
let lapTimeStep = {};
let lapState = {};
let holeShots = {};
let pilotsIntervalCount = {};
let currentRoundInfo = null;
let roundSpeed = 1.5;
let roundPlayState = "pause";
let intervalButtonsAccept;
const speedNames = {
  3: 0.3,
  2: 0.5,
  1.1: 1,
  // '1': 2.5,
  1: 2,
};
const speedValues = [3, 2, 1.1, 1];

function roundsTabAction(e) {
  const itemsElement = document.querySelector(".rounds__items");

  const heatTabs = getTabsRounds();

  heatTabs.forEach((heat, index) => {
    if (e.target.closest(`.rounds__${heat.name} `)) {
      if (CONSOLE_DEBUG) console.log(`${textStrings.roundsTab.heat} ${heat.name} `);
      tabSwitch(tabsRounds[index].name, tabsRounds);
      tabHeightChange(tabsRounds[index].element, itemsElement, false);
    }
  });

  if (e.target.closest(".rounds__item")) {
    // let roundNum;
    // let heatNum;

    const roundText = e.target.innerHTML;
    let heatText;
    heatTabs.forEach((heat) => {
      if (heat.element.classList.contains("_active")) {
        // const tabName = heat.name;
        // heatText = buttons[tabName].innerHTML;
        heatText = heat.name;
      }
    });

    const roundNum = getNumFromText(roundText);
    const heatNum = getNumFromText(heatText);

    // const heatArr = [...heatText]
    // const heatNums = []
    // heatArr.forEach((el, index) => {
    // 	if (el == el.match(/\d+/g)) {
    // 		heatNums.push(el)
    // 	}
    // 	if (index == heatArr.length - 1) {
    // 		heatNum = heatNums.join('')
    // 	}
    // })

    if (CONSOLE_DEBUG) console.log(heatNum);
    if (CONSOLE_DEBUG) console.log(roundNum);

    goToRoundAction(roundNum, heatNum, e.target);
  }
}

buttons.pilots.addEventListener("click", function () {
  tabSwitch(tabsMain[0].name, tabsMain);
});

buttons.leaderboard.addEventListener("click", function () {
  tabSwitch(tabsMain[1].name, tabsMain);
});

buttons.rounds.addEventListener("click", function () {
  tabSwitch(tabsMain[2].name, tabsMain);
});

function pilotsVsActions(nameForFunctions1, nameForFunctions2) {
  const html = writePilotsVs(nameForFunctions1, nameForFunctions2);
  const tabwrap = document.querySelector(".tabs-wrapper");
  tabwrap.after(html);
  setAkcentValues(akcentArr);

  const pilotsVsElement = document.querySelector(".pilots-vs");
  const pilotsVsPseudoLap = document.querySelector(".pilots-vs__pseudo-lap");
  const pilotsVsAllLapsArea = document.querySelector(".pilots-vs__laps-area");
  const pilotsVsAllLapsLaps = document.querySelector(".pilots-vs__laps");
  const pilotsVsAllLapsLap = document.querySelectorAll(".pilots-vs__lap");
  const pilotsVsExitBtn = document.querySelector(".pilots-vs__exit-button");
  buttons.pilotsVsAllLaps = document.querySelector(".pilots-vs__all-laps-button");
  buttons.pilotsVsStatistic = document.querySelector(".pilots-vs__statistic-button");
  const name1 = document.querySelector(".pilots-vs_name1");
  const name2 = document.querySelector(".pilots-vs_name2");

  pilotsVsAllLapsLaps.style.gridTemplateColumns = `7px repeat(${pilotsVsAllLapsLap.length - 1},${
    (pilotsVsAllLapsArea.offsetWidth -
      pilotsVsPseudoLap.offsetWidth -
      pilotsVsAllLapsLap[pilotsVsAllLapsLap.length - 1].offsetWidth -
      parseInt(getComputedStyle(pilotsVsAllLapsArea).paddingLeft) * 2 -
      10) /
    (pilotsVsAllLapsLap.length - 1)
  }px)7px`;
  setTimeout(() => {
    //небольшая задержка для подстраховки, чтоб отрисовался html, а потом показывать
    modalOnOff(pilotsVsElement, true); //Показываем контейнеры
    pilotsVsShow(pilotsVsElement);
  }, 10);

  tabsPilotsVs = [
    { name: "pilotsVsAllLaps", opened: false, element: document.querySelector(".pilots-vs__all-laps-tab") },
    { name: "pilotsVsStatistic", opened: false, element: document.querySelector(".pilots-vs__statistic-tab") },
  ];

  tabSwitch(tabsPilotsVs[0].name, tabsPilotsVs);
  name1.classList.add("_active");
  name2.classList.add("_active");

  buttons.pilotsVsAllLaps.addEventListener("click", () => {
    tabSwitch(tabsPilotsVs[0].name, tabsPilotsVs);
    name1.classList.add("_active");
    name2.classList.add("_active");
  });
  buttons.pilotsVsStatistic.addEventListener("click", () => {
    tabSwitch(tabsPilotsVs[1].name, tabsPilotsVs);
    name1.classList.remove("_active");
    name2.classList.remove("_active");
  });

  const otherLaps = document.querySelector(".pilots-vs__stat-stroke_best-lap-others");
  const otherCons = document.querySelector(".pilots-vs__stat-stroke_best-consecutive-others");
  const spoilerPilotsVs = document.querySelectorAll(".pilots-vs__spoiler-button");

  spoilerPilotsVs[0].addEventListener("click", () => {
    spoilerPilotsVs[0].classList.toggle("_active");
    spoilerOnOff(otherLaps, spoilerPilotsVs[0]);
  });
  spoilerPilotsVs[1].addEventListener("click", () => {
    spoilerPilotsVs[1].classList.toggle("_active");
    spoilerOnOff(otherCons, spoilerPilotsVs[1]);
  });

  pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, "_active");

  const pilotsVsPlusBtn = document.querySelector(".pilots-vs__plus");
  const pilotsVsMinusBtn = document.querySelector(".pilots-vs__minus");
  const sliderPilotsVs = document.querySelector(".pilots-vs__slider");

  pilotsVsMinusBtn.classList.add("_no-event");

  pilotsVsPlusBtn.addEventListener("click", () => pilotsVsGraphScale("plus"));
  pilotsVsMinusBtn.addEventListener("click", () => pilotsVsGraphScale("minus"));
  sliderPilotsVs.addEventListener("input", () => pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, "_active"));

  pilotsVsAllLapsArea.addEventListener("scroll", function () {
    //при скролле двигаются цифры... сомнительно
    const averageLine = document.querySelector(".pilots-vs__average-line");
    const maxLine = document.querySelector(".pilots-vs__max-line");
    const averageValue = averageLine.querySelector("span");
    const maxValue = maxLine.querySelector("span");
    averageValue.style.transform = `translate(${pilotsVsAllLapsArea.scrollLeft}px, 0)`;
    maxValue.style.transform = `translate(${pilotsVsAllLapsArea.scrollLeft}px, 0)`;
  });

  pilotsVsAllLapsArea.addEventListener("click", function (e) {
    //клик по графику
    const laps = document.querySelectorAll(".pilots-vs__lap");

    if (e.target.closest(".pilots-vs__lap-graph") || e.target.closest(".pilots-vs__lap-graph-obj")) {
      const currentLap = e.target.closest(".pilots-vs__lap");
      let currentIndex;
      laps.forEach((element, index) => {
        if (element == currentLap) {
          currentIndex = index;
          return;
        }
      });
      sliderPilotsVs.value = currentIndex;
      if (CONSOLE_DEBUG) console.log("sliderPilotsVs.value", sliderPilotsVs.value);

      pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, "_active");
    }
  });

  pilotsVsAllLapsArea.addEventListener("touchstart", function (e) {
    //старт перетаскивания ползунка
    const currentLap = e.target.closest(".pilots-vs__lap");
    if (currentLap.classList.contains("_choosed")) {
      currentLap.classList.add("_hold");
      const allLapsAreaHeight = pilotsVsAllLapsArea.offsetHeight;
      const allLapsAreaHeightScroll = pilotsVsAllLapsArea.clientHeight;
      pilotsVsAllLapsArea.style.paddingBottom = `${allLapsAreaHeight - allLapsAreaHeightScroll}px`;
      pilotsVsAllLapsArea.classList.add("_lock");
      graphTouchFlag = true;
    }
  });

  pilotsVsAllLapsArea.addEventListener("touchend", function (e) {
    //отпустили ползунок
    const allLaps = document.querySelectorAll(".pilots-vs__lap");

    allLaps.forEach((element) => {
      element.classList.remove("_hold");
      element.classList.remove("_choosed");
      if (element.classList.contains("_active") || element.classList.contains("_active-permanent")) {
        element.classList.add("_choosed");
      }
    });

    pilotsVsAllLapsArea.classList.remove("_lock");
    pilotsVsAllLapsArea.style.paddingBottom = null;
    graphTouchFlag = false;
  });

  pilotsVsAllLapsArea.addEventListener("touchmove", function (e) {
    //тащим ползунок

    // const pilotsVsAreaPosition = pilotsVsAllLapsArea.offsetTop;
    // const pilotsVsAreaHalfHeight = pilotsVsAllLapsArea.offsetHeight / 2;
    const tabContainer = document.querySelector(".pilots-vs__statistic-tab-container");

    const pilotsVsAreaPosition = tabContainer.offsetTop;
    const pilotsVsAreaHalfHeight = tabContainer.offsetHeight / 2;

    const elem = document.elementFromPoint(e.touches[0].clientX, pilotsVsAreaPosition + pilotsVsAreaHalfHeight);
    if (graphTouchFlag) {
      if (CONSOLE_DEBUG) console.log("ELEM", elem);

      const laps = document.querySelectorAll(".pilots-vs__lap");
      const currentLap = elem.closest(".pilots-vs__lap");

      let currentIndex;
      laps.forEach((element, index) => {
        if (element == currentLap) {
          currentIndex = index;
          return;
        }
      });
      sliderPilotsVs.value = currentIndex;
      pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, "_active-permanent");
    }
  });

  pilotsVsExitBtn.addEventListener("click", function () {
    //Нажимае на крест - выходим
    modalOnOff(pilotsVsElement, false);
    setTimeout(() => {
      lapsIdData = [];
      pilotsVsElement.remove();
    }, 500);
  });
}

function setAkcentValues(akcentArrHere) {
  const akcentElements = {
    bestLap1: document.querySelector(".pilots-vs__stat-stroke-value_best-lap-1"),
    bestLap2: document.querySelector(".pilots-vs__stat-stroke-value_best-lap-2"),

    bestConsecutive1: document.querySelector(".pilots-vs__stat-stroke-value_best-consecutive-1"),
    bestConsecutive2: document.querySelector(".pilots-vs__stat-stroke-value_best-consecutive-2"),

    average1: document.querySelector(".pilots-vs__stat-stroke-value_average-1"),
    average2: document.querySelector(".pilots-vs__stat-stroke-value_average-2"),

    totalLaps1: document.querySelector(".pilots-vs__stat-stroke-value_total-laps-1"),
    totalLaps2: document.querySelector(".pilots-vs__stat-stroke-value_total-laps-2"),
  };

  if (CONSOLE_DEBUG) console.log("akcentElements", akcentArrHere[2]);
  // if(CONSOLE_DEBUG)console.log('');

  akcentElements[`bestLap${akcentArrHere[0]}`].classList.add("_akcent");
  akcentElements[`bestConsecutive${akcentArrHere[1]}`].classList.add("_akcent");
  akcentElements[`average${akcentArrHere[2]}`].classList.add("_akcent");
  akcentElements[`totalLaps${akcentArrHere[3]}`].classList.add("_akcent");
}

function getRoundsByHeats() {
  const heatsObj = {};

  // let heats;

  // const fullData = mainObj;
  // for (objStroke in fullData) {
  // 	if (objStroke == 'heats') {
  // 		heats = fullData[objStroke];
  // 	} else if (fullData[objStroke].heats) {
  // 		heats = fullData[objStroke].heats
  // 	}
  // }

  const classHeats = mainObj.heats_by_class[currentClass];
  const heats = mainObj.heats;

  for (let heat in heats) {
    if (classHeats.includes(+heat)) {
      const rounds = [];
      const heatNum = heat;
      const heatRounds = heats[heat].rounds;
      heatRounds.forEach((round) => {
        rounds.push(round.id);
      });
      heatsObj[heatNum] = rounds;
    }
  }

  return heatsObj;
}

let lastHoleShot;

window.addEventListener("resize", function () {
  roundStatsStrokeWidthChange();
});
