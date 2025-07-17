import { getState, setState } from "./sharedStates";
import { calendarRender, makeRaceClassButtons } from "./htmlWriters";
import { startFileView, setTittle } from "./uiChange";
import { getLiveState, setShareUrl } from "./utils";
import { tittleCounter, checkLiveData } from "./liveDataCounter";

export async function urlUpload(type) {
  try {
    const eventUrl = new URL(window.location.href);
    console.log("type", type);

    if (type == "uuid") {
      const fullLiveData = await getLiveData(getState("isUuid"));
      setState("mainObj", fullLiveData.results);
      setState("liveTimestamp", fullLiveData.date);
      makeRaceClassButtons();

      startFileView("uuid", " ");

      setTittle("uuid", "", fullLiveData.eventName);

      tittleCounter(); //Времени прошло
      checkLiveData(); //Открыть счётчик
      eventUrl.searchParams.set(type, `${getState("isUuid")}`);
    } else if (type == "event") {
      setState("mainObj", await getEventData(getState("isEvent")));
      makeRaceClassButtons();

      startFileView("event", getState("isEvent"));

      setTittle("event", getState("isEvent"));
      eventUrl.searchParams.set(type, `${getState("isEvent")}`);
    }

    const shareUrlElement = document.querySelector(".author__share-url");
    shareUrlElement.textContent = eventUrl.href;
    const languageElement = getState("language") == "ru" ? document.querySelector(`.language__EN`) : getState("language") == "en" && document.querySelector(`.language__RU`);
    const newLanguageChangeLink = `${languageElement.getAttribute("href")}?${type}=${eventUrl.searchParams.get(`${type}`)}`;
    languageElement.setAttribute("href", `${newLanguageChangeLink}`);
  } catch (error) {
    console.error("error", error);

    const wrapperElement = document.querySelector(".wrapper");
    wrapperElement.classList.add("_error");
  }
}

export async function getLiveData(uuid) {
  const data = await fetch(`/api/getData?uuid=${uuid}`);

  if (!data.ok) throw new Error("Ошибка загрузки");
  const dataJson = await data.json();

  return dataJson.data;
}

export async function getEventData(event) {
  const fileName = `${event}.json`;

  const url = `/api/proxy?path=results.jsons/${fileName}`;
  const data = await fetch(url);
  if (!data.ok) throw new Error("Ошибка загрузки");
  return await data.json();
}

export async function loadFilesJsonOld() {
  calendarRender(false);
  let responseDataFiles;

  try {
    const url = `/api/proxy?path=files.json`;

    //  const url = `files.json`; //Для локальной проверки

    const response = await fetch(url);

    if (!response.ok) throw new Error("Ошибка загрузки");
    const responseData = await response.json();

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
      obj.monthName = getState("textStrings").monthsNames[date.getMonth()];
      obj.day = date.getDate();
      obj.hours = date.getHours();
      obj.minutes = date.getMinutes();
      setState("filesJson", [...getState("filesJson"), obj]);
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

    const lastFile = getState("filesJson")[getState("filesJson").length - 1];
    document.querySelector(".last-file__file-name-value").innerHTML = lastFile.displayName;
    document.querySelector(".last-file__date-value").innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`;
    document.querySelector(".last-file__time-value").innerHTML = `${lastFile.hours}:${lastFile.minutes}`;

    calendarRender(true);
  } catch (error) {
    console.error("Не удалось загрузить файл:", error);
  }
}

export async function loadFilesList() {
  calendarRender(false);
  try {
    const response = await fetch("/api/loadFiles.js");

    if (!response.ok) throw new Error("Ошибка загрузки");
    const responseData = await response.json();

    responseData.files.forEach((file) => {
      ///Собираем объект всех файлов из репозитория
      const obj = {};

      try {
        const [datePart, timePart] = file.meta.eventStart.split(" ");
        const [year, month, day] = datePart.split("-").map(Number);
        const [hour, minute] = timePart.split(":").map((n) => n.padStart(2, "0"));
        const date = new Date(year, month - 1, day, hour, minute, second);

        obj.liveState = getLiveState(Date.now(), date.getTime());
        obj.displayName = file.meta.title;
        obj.date = date;
        obj.uuid = file.uuid;
        obj.year = year;
        obj.month = month;
        obj.monthName = getState("textStrings").monthsNames[month];
        obj.day = day;
        obj.hours = hour;
        obj.minutes = minute;
        setState("filesList", [...getState("filesList"), obj]);
      } catch (error) {
        console.error(error);
      }
    });
    console.log('getState("filesList")', getState("filesList"));

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

    const lastFile = getState("filesList")[getState("filesList").length - 1];
    document.querySelector(".last-file__file-name-value").innerHTML = lastFile.displayName;
    document.querySelector(".last-file__date-value").innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`;
    document.querySelector(".last-file__time-value").innerHTML = `${lastFile.hours}:${lastFile.minutes}`;
    calendarRender(true);
  } catch (error) {
    console.error("Не удалось загрузить список файлов:", error);
  }
}

export async function loadLastFile() {
  const lastFileButton = document.querySelector(".last-file__item");
  const loadTimer = setTimeout(() => {
    lastFileButton.classList.add("_loading");
  }, 500);

  document.querySelector(".last-file__tittle").classList.add("_hidden");
  document.querySelector(".calendar").classList.add("_hidden");
  document.querySelector(".local-file__tittle").classList.add("_hidden");
  document.querySelector(".local-file__form").classList.add("_hidden");
  document.querySelector(".date-files").classList.add("_hidden");
  document.querySelector(".local-file__label").classList.add("_hidden");
  document.querySelector(".language").classList.add("_hidden");
  try {
    const fileName = getState("filesJson")[getState("filesJson").length - 1].fileName;
    const url = `/api/proxy?path=results.jsons/${fileName}`;

    //  const fileName = `2025-06-24_19-31_Whoopclub.json`; //Для локальной проверки
    //  const url = fileName; //Для локальной проверки

    const data = await fetch(url);

    if (!data.ok) throw new Error("Ошибка загрузки");

    setState("mainObj", await data.json());
    makeRaceClassButtons();
    startFileView("last", getState("filesJson")[getState("filesJson").length - 1].fileName);
    setTittle("event", getState("filesJson")[getState("filesJson").length - 1].fileName);
    setShareUrl(getState("filesJson")[getState("filesJson").length - 1].fileName);
  } catch (error) {
    console.log("error", error);

    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}

export async function loadDateFile(fileName) {
  const fileItemElement = document.querySelector("._uploading-file");
  const loadTimer = setTimeout(() => {
    fileItemElement.classList.add("_loading");
  }, 500);

  document.querySelector(".last-file__tittle").classList.add("_hidden");
  document.querySelector(".calendar").classList.add("_hidden");
  document.querySelector(".language").classList.add("_hidden");

  try {
    const url = `/api/proxy?path=results.jsons/${fileName}`;

    const data = await fetch(url);
    if (!data.ok) throw new Error("Ошибка загрузки");
    setState("mainObj", await data.json());

    makeRaceClassButtons();

    startFileView("date", fileName);
    setTittle("event", fileName);
    setShareUrl(fileName);
  } catch (error) {
    fileItemElement.classList.remove("_loading");
    fileItemElement.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}
