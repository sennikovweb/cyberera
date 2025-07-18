import { getState, setState } from "./sharedStates";
import { calendarRender, makeRaceClassButtons } from "./htmlWriters";
import { startFileView, setTittle } from "./uiChange";
import { getDateStrings, getLiveState, setShareUrl } from "./utils";
import { tittleCounter, checkLiveData } from "./liveDataCounter";

export async function urlUpload() {
  try {
    const eventUrl = new URL(window.location.href);

    const fullLiveData = await getLiveData(getState("isUuid"));
    setState("mainObj", fullLiveData.results);
    setState("liveTimestamp", fullLiveData.lastUpdate);

    makeRaceClassButtons();

    startFileView("uuid");

    const isLive = getLiveState(Date.now(), fullLiveData.lastUpdate);

    if (isLive) {
      tittleCounter(fullLiveData.eventName);
      checkLiveData(); //Открыть счётчик
    } else {
      setTittle(getState("isUuid"));
    }

    eventUrl.searchParams.set("uuid", `${getState("isUuid")}`);

    const shareUrlElement = document.querySelector(".author__share-url");
    shareUrlElement.textContent = eventUrl.href;
    const languageElement = getState("language") == "ru" ? document.querySelector(`.language__EN`) : getState("language") == "en" && document.querySelector(`.language__RU`);
    const newLanguageChangeLink = `${languageElement.getAttribute("href")}?uuid=${eventUrl.searchParams.get('uuid')}`;
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

// export async function getEventData(event) {
//   const fileName = `${event}.json`;

//   const url = `/api/proxy?path=results.jsons/${fileName}`;
//   const data = await fetch(url);
//   if (!data.ok) throw new Error("Ошибка загрузки");
//   return await data.json();
// }

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
    document.querySelector(".last-file__file-name-value").innerHTML = lastFile.eventName;
    document.querySelector(".last-file__date-value").innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`;
    document.querySelector(".last-file__time-value").innerHTML = `${lastFile.hours}:${lastFile.minutes}`;

    calendarRender(true);
  } catch (error) {
    console.error("Не удалось загрузить файл:", error);
  }
}

export async function loadFilesList(calendar) {
  if (calendar) calendarRender(false);

  try {
    const response = await fetch("/api/loadFiles.js");

    if (!response.ok) throw new Error("Ошибка загрузки");
    const responseData = await response.json();

    responseData.files.forEach((file) => {
      ///Собираем объект всех файлов из репозитория
      const obj = {};
      if (file.meta.eventStart) {
        const { date, year, month, day, hours, minutes } = getDateStrings(file.meta.eventStart);
        obj.date = date;
        obj.year = year;
        obj.month = month - 1;
        obj.day = day;
        obj.hours = hours;
        obj.minutes = minutes;

        obj.liveState = getLiveState(Date.now(), date.getTime());
        obj.eventName = file.meta.eventName;
        obj.uuid = file.uuid;
        obj.monthName = getState("textStrings").monthsNames[month - 1];
        setState("filesList", [...getState("filesList"), obj]);
      }
    });

    if (calendar) {
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

      const latestFile = getState("filesList").reduce((latest, current) => {
        return current.date > latest.date ? current : latest;
      }, getState("filesList")[0]);

      document.querySelector(".last-file__file-name-value").innerHTML = latestFile.eventName;
      document.querySelector(".last-file__date-value").innerHTML = `${latestFile.day} ${latestFile.monthName} ${latestFile.year}`;
      document.querySelector(".last-file__time-value").innerHTML = `${latestFile.hours}:${latestFile.minutes}`;
      if (latestFile.liveState == true) document.querySelector(".last-file__time-value").classList.add("_live");

      calendarRender(true);
    }
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
    const latestFile = getState("filesList").reduce((latest, current) => {
      return current.date > latest.date ? current : latest;
    }, getState("filesList")[0]);

    const url = `/api/getData?uuid=${latestFile.uuid}`;

    const data = await fetch(url);

    if (!data.ok) throw new Error("Ошибка загрузки");

    const fullResponse = await data.json();

    setState("mainObj", fullResponse.data.results);
    makeRaceClassButtons();
    startFileView("last");
    setTittle(latestFile.uuid);
    setShareUrl(latestFile.uuid);
  } catch (error) {
    console.log("error", error);

    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}

export async function loadDateFile(uuid) {
  const fileItemElement = document.querySelector("._uploading-file");
  const loadTimer = setTimeout(() => {
    fileItemElement.classList.add("_loading");
  }, 500);

  document.querySelector(".last-file__tittle").classList.add("_hidden");
  document.querySelector(".calendar").classList.add("_hidden");
  document.querySelector(".language").classList.add("_hidden");

  try {
    const url = `/api/getData?uuid=${uuid}`;

    const data = await fetch(url);

    if (!data.ok) throw new Error("Ошибка загрузки");

    const fullResponse = await data.json();

    setState("mainObj", fullResponse.data.results);
    makeRaceClassButtons();

    startFileView("date");

    setTittle(uuid, fullResponse.data.eventName);
    setShareUrl(uuid);
  } catch (error) {
    fileItemElement.classList.remove("_loading");
    fileItemElement.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}
