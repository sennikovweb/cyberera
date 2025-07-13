import { getState, setState, getLocalFileElement } from "./sharedStates";
import { getAnimationDurationTime } from "./utils";
import { makeRaceClassButtons } from "./htmlWriters";
import { setTittle, startFileView } from "./uiChange";

export async function addLocalFile() {
  console.log('getLocalFileElement("input")', getLocalFileElement("input"));

  const file = getLocalFileElement("input").files[0];

  if (file) {
    //Проверяем, добавился ли файл
    if (getState("CONSOLE_DEBUG")) console.log("файле есть");
    getLocalFileElement("button").classList.add("_ready");
    getLocalFileElement("label").innerHTML = getState("textStrings").choosed;
    getLocalFileElement("label").classList.add("_active");
    getLocalFileElement("button").classList.add("_active");
    if (getLocalFileElement("label").classList.contains("_error-parsing")) {
      //Если добавляем файл после ошибки парсинга, убираем стили ошибки
      getLocalFileElement("label").classList.remove("_error-parsing");
    }
  } else {
    // Если не добавился, убираем стили того, как добавился, т.к. они могут быть
    if (getState("CONSOLE_DEBUG")) console.log("файл нет");
    getLocalFileElement("label").classList.remove("_active");
    getLocalFileElement("label").innerHTML = getState("textStrings").choose;
    getLocalFileElement("button").classList.remove("_ready");
  }
}

export async function loadingLocalFile(fileToUpload) {
  //процесс загрузки файла
  const stringJson = await processLoadingLocalFile(fileToUpload);
  return stringJson; // возвращаем значение прочитанного файла из промисса
}

export function processLoadingLocalFile(fileToUpload) {
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

export function parseLocalFile(stringJson) {
  // Парсим файл, ставим флаг ОК, если Ок
  let data;
  try {
    data = JSON.parse(stringJson);
    if (getState("CONSOLE_DEBUG")) console.log(data);

    setState("parsedOK", true);
    return data;
  } catch {
    if (getState("CONSOLE_DEBUG")) console.log("Ошибка Парсинга");
    setState("parsedOK", false);
  }
}

export async function startLocalFile(e) {
  //Нажатие на кнопку Загрузить - Самое начало
  e.preventDefault();
  const file = getLocalFileElement("input").files[0];

  if (file) {
    //Проверяем, есть ли файл

    const notParsedJson = await loadingLocalFile(file); //Здесь читаем файл и записываем его в переменную
    if (getState("CONSOLE_DEBUG")) console.log(notParsedJson);
    setState("mainObj", parseLocalFile(notParsedJson)); // Здесь парсим эту переменную
    if (getState("parsedOK")) {
      //Проверяем, норм ли спарсилось
      document.querySelector(".last-file").classList.add("_hidden");
      document.querySelector(".date-files").classList.add("_hidden");
      document.querySelector(".calendar").classList.add("_hidden");

      getLocalFileElement("tittle").classList.add("_hidden");

      makeRaceClassButtons();
      startFileView("local");
      setTittle("local");
    } else {
      //Если не спарсилось, рисуем ошибку
      getLocalFileElement("button").innerHTML = getState("textStrings").error;
      getLocalFileElement("button").classList.add("_error-parsing");
      getLocalFileElement("label").innerHTML = getState("textStrings").chooseAnother;
      getLocalFileElement("label").classList.add("_error-parsing");
      getLocalFileElement("button").classList.remove("_ready");
      setTimeout(() => {
        smoothTextChange(getLocalFileElement("button"), getState("textStrings").load);
        getLocalFileElement("button").classList.remove("_error-parsing");
      }, getAnimationDurationTime(getLocalFileElement("button")));
    }
  } else {
    //Если нет файла, показываем, как его нет и куда добавить
    if (getState("CONSOLE_DEBUG")) console.log("Файла нет");
    getLocalFileElement("label").classList.add("_error");
    setTimeout(() => {
      getLocalFileElement("label").classList.remove("_error");
    }, getAnimationDurationTime(getLocalFileElement("label")));
  }
}
