import { getState, setState } from "./sharedStates";
import { calendarRender, makeRaceClassButtons } from "./htmlWriters";
import { startFileView } from "./uiChange";

export async function urlUpload(type) {
  try {
    const eventUrl = new URL(window.location.href);
	 console.log('type',type);
	 
    if (type == "live") {
      await getLiveData(getState("isLive"));
      makeRaceClassButtons();
      startFileView("live", " ");

      eventUrl.searchParams.set(type, `${getState("isLive")}`);
    } else if (type == "event") {
      await getEventData(getState("isEvent"));
      makeRaceClassButtons();
      startFileView("url", getState("isEvent"));

      eventUrl.searchParams.set(type, `${getState("isEvent")}`);
    }

    const shareUrlElement = document.querySelector(".author__share-url");
    shareUrlElement.textContent = eventUrl.href;
    const languageElement = getState("language") == "ru" ? document.querySelector(`.language__EN`) : getState("language") == "ru" && document.querySelector(`.language__RU`);
    const newLanguageChangeLink = `${languageElement.getAttribute("href")}?${type}=${eventUrl.searchParams.get(`${type}`)}`;
    languageElement.setAttribute("href", `${newLanguageChangeLink}`);
  } catch (error) {
    const wrapperElement = document.querySelector(".wrapper");
    wrapperElement.classList.add("_error");
  }
}

export async function getLiveData(uuid) {
  const data = await fetch(`https://rh-results-viewer.vercel.app/api/getData?uuid=${uuid}`);

  if (!data.ok) throw new Error("Ошибка загрузки");
  const dataJson = await data.json();

  setState("mainObj", dataJson.data.data.results);
}

export async function getEventData(event) {
  const fileName = `${event}.json`;

  const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`;
  const data = await fetch(url);
  if (!data.ok) throw new Error("Ошибка загрузки");
  setState("mainObj", await data.json());
}

export async function loadFilesJson() {
  calendarRender(false);
  let responseDataFiles;

  try {
    //  const url = `https://rh-results-viewer.vercel.app/api/proxy?path=files.json`

    const url = `files.json`; //Для локальной проверки

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
      // filesJson.push(obj);
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

    const lastFile = getState("filesJson")[getState("filesJson").length - 1];
    lastFileNameElement.innerHTML = lastFile.displayName;
    lastFileDateElement.innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`;
    lastFileTimeElement.innerHTML = `${lastFile.hours}:${lastFile.minutes}`;

    calendarRender(true);
  } catch (error) {
    console.error("Не удалось загрузить файл:", error);
  }
}

export async function loadDateFile(fileName) {
  const fileItemElement = document.querySelector(".flie-item_uploading");
  const loadTimer = setTimeout(() => {
    fileItemElement.classList.add("_loading");
  }, 500);

  try {
    const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`;

    const data = await fetch(url);
    if (!data.ok) throw new Error("Ошибка загрузки");
    setState("mainObj", await data.json());

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

export async function loadLastFile() {
  const lastFileButton = document.querySelector(".last-file__item");
  const loadTimer = setTimeout(() => {
    lastFileButton.classList.add("_loading");
  }, 500);

  try {
    //  const fileName = filesJson[filesJson.length - 1].fileName;
    //  const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`

    const fileName = `2025-06-24_19-31_Whoopclub.json`; //Для локальной проверки
    const url = fileName; //Для локальной проверки

    const data = await fetch(url);

    if (!data.ok) throw new Error("Ошибка загрузки");

    setState("mainObj", await data.json());
    makeRaceClassButtons();
    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_move");

    lastFileButton.addEventListener("transitionend", function (e) {
      if (e.propertyName === "transform") {
        startFileView("local", getState("filesJson")[getState("filesJson").length - 1].fileName);

        const eventUrl = new URL(window.location.href);
        eventUrl.searchParams.set("event", `${fileName.slice(0, -5)}`);

        history.pushState({}, "", eventUrl);

        const shareUrlElement = document.querySelector(".author__share-url");
        shareUrlElement.textContent = eventUrl.href;
      }
    });
  } catch (error) {
    console.log("error", error);

    lastFileButton.classList.remove("_loading");
    lastFileButton.classList.add("_loading-error");
  }
  clearTimeout(loadTimer);
}
