import { getState, setState } from "./sharedStates";
import { getAnimationDurationTime } from "./utils";
import { makeRaceClassButtons } from "./htmlWriters";

export async function addLocalFile() {
  const file = mainForm.input.files[0];

  if (file) {
    //Проверяем, добавился ли файл
    if (getState("CONSOLE_DEBUG")) console.log("файле есть");
    mainForm.button.classList.add("_ready");
    mainForm.label.innerHTML = getState("textStrings").choosed;
    mainForm.label.classList.add("_active");
    mainForm.button.classList.add("_active");
    if (mainForm.label.classList.contains("_error-parsing")) {
      //Если добавляем файл после ошибки парсинга, убираем стили ошибки
      mainForm.label.classList.remove("_error-parsing");
    }
  } else {
    // Если не добавился, убираем стили того, как добавился, т.к. они могут быть
    if (getState("CONSOLE_DEBUG")) console.log("файл нет");
    mainForm.label.classList.remove("_active");
    mainForm.label.innerHTML = getState("textStrings").choose;
    mainForm.button.classList.remove("_ready");
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
  const file = mainForm.input.files[0];

  if (file) {
    //Проверяем, есть ли файл

    const notParsedJson = await loadingLocalFile(file); //Здесь читаем файл и записываем его в переменную
    if (getState("CONSOLE_DEBUG")) console.log(notParsedJson);
    setState("mainObj", parseLocalFile(notParsedJson)); // Здесь парсим эту переменную
    if (getState("parsedOK")) {
      //Проверяем, норм ли спарсилось, и если да, убираем форму ввода и показываем дальнейшие кнопки
      makeRaceClassButtons();
      startFileView("load");
    } else {
      //Если не спарсилось, рисуем ошибку
      mainForm.button.innerHTML = getState("textStrings").error;
      mainForm.button.classList.add("_error-parsing");
      mainForm.label.innerHTML = getState("textStrings").chooseAnother;
      mainForm.label.classList.add("_error-parsing");
      mainForm.button.classList.remove("_ready");
      setTimeout(() => {
        smoothTextChange(mainForm.button, getState("textStrings").load);
        mainForm.button.classList.remove("_error-parsing");
      }, getAnimationDurationTime(mainForm.button));
    }
  } else {
    //Если нет файла, показываем, как его нет и куда добавить
    if (getState("CONSOLE_DEBUG")) console.log("Файла нет");
    mainForm.label.classList.add("_error");
    setTimeout(() => {
      mainForm.label.classList.remove("_error");
    }, getAnimationDurationTime(mainForm.label));
  }
}
