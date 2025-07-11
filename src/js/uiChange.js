import { getButton, getState, setState, addButton, getLocalFileElement } from "./sharedStates";
import { getTransitionDurationTime } from "./utils";
import { getHeat, getLapsByName, getTabsRounds } from "./getDatas";
import { writePilotsHTML, writeLeaderboardHTML, writeRoundsHTML, calendarRender } from "./htmlWriters";
import { pilotTabAction, roundsTabAction, leaderboardTabAction } from "./actions";


let tabsMain;
let tabsLeader;
let tabsRounds;
export function startFileView(fileType, fileName) {
  try {
    setState("consecutivesCount", getState("mainObj").consecutives_count);
  } catch (error) {
    if (getState("CONSOLE_DEBUG")) console.log("Не найдена информация о consecutives count");
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

  addButton("lap", document.querySelector(".leaderboard__lap-button"));
  addButton("consecutive", document.querySelector(".leaderboard__consecutive-button"));
  addButton("count", document.querySelector(".leaderboard__count-button"));
  addButton("average", document.querySelector(".leaderboard__average-button"));

  tabsRounds = getTabsRounds();

  tabsRounds.forEach((tab) => {
    const tabName = tab.name;
    addButton(tabName, document.querySelector(`.rounds__${tabName}`));
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
    const buttonWidth = getLocalFileElement('button').offsetWidth; //ширина кнопки, чтобы не торчали края
    const labelWidth = getLocalFileElement('label').offsetWidth; //ширина label чтобы не торчали края

    const lastFileElement = document.querySelector(".last-file");
    const dateFilesElement = document.querySelector(".date-files");
    const calendarElement = document.querySelector(".calendar");

    if (fileType == "load") {
      lastFileElement.classList.add("_hidden");
      getLocalFileElement('button').style.transition = "all 1s ease";
      getLocalFileElement('button').style.transform = `translate(${windowWidth / 2 + buttonWidth}px, 0px)`; //едем
      getLocalFileElement('label').style.transition = "all 1s ease";
      getLocalFileElement('label').style.transform = `translate(-${windowWidth / 2 + labelWidth}px, 0px)`; //едем
      getLocalFileElement('tittle').classList.add("_hidden");
      dateFilesElement.classList.add("_hidden");
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 300);
    }

    getLocalFileElement('tittle').classList.add("_hidden");

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
        mainDate.innerHTML = `${date.getDate()} ${getState("textStrings").monthsNames[date.getMonth()]} ${date.getFullYear()}`;
        mainTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
      } else if (fileType == "load") {
        const day = getDateinfo("day");
        const year = getDateinfo("year");
        const time = getDateinfo("time");
        mainDisplayName.innerHTML = `${getState("textStrings").event}`;
        mainDate.innerHTML = `${day} ${year}`;
        mainTime.innerHTML = `${time}`;
      }
      document.querySelector('.main-tittle').classList.remove("_hidden");
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
      getLocalFileElement('button').remove();
      getLocalFileElement('form').remove();
      getLocalFileElement('tittle').remove();
      getButton("container").classList.add("_active");
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

export function classSwitch(e) {
  const curentButton = e.target;
  const allButtons = document.querySelectorAll(".class-switch-buttons__button");
  const buttonsContainer = document.querySelector(".class-switch-buttons__container");
  const raceClassNum = curentButton.getAttribute("value");
  buttonsContainer.classList.add("_no-event");

  allButtons.forEach((button) => {
    if (getState("CONSOLE_DEBUG")) console.log("button", button);
    button.classList.remove("_active", "_no-event");
  });
  curentButton.classList.add("_active", "_no-event");

  tabSwitch("closeAll", tabsMain);
  currentClass = raceClassNum;

  setTimeout(() => {
    const pilotsTab = document.querySelector(".pilots");
    const leaderboardTab = document.querySelector(".leaderboard");
    const roundsTab = document.querySelector(".rounds");
    pilotsTab.remove();
    leaderboardTab.remove();
    roundsTab.remove();
  }, 50);

  setTimeout(() => {
    startFileView("classSwitch");
  }, 150);
}

export function tabSwitch(toOpen, tabss) {
  //функция смены вкладок
  let closingtime = 0; //время смены вкладок - перед открытием первой ровна нулю

  const buttonsWrapper = document.querySelectorAll("._buttons-wrapper");
  buttonsWrapper.forEach((btn) => {
    //запрещаем нажатия кнопок, чтобы не открыть 2 вкладки
    btn.classList.add("_no-event");
  });

  tabss.forEach((tab) => {
    if (getButton([tab.name]).classList.contains("_ready")) {
      if (getState("CONSOLE_DEBUG")) console.log("TRUUUUUE");
      getButton([tab.name]).classList.remove("_ready");
    }
  });

  tabss.forEach((tab) => {
    if (tab.opened) {
      //ищем открытую вкладку, чтобы закрыть
      const tabItems = tab.element.firstElementChild;
      tab.element.classList.remove("_active");
      tabItems.classList.remove("_active");

      closingtime = getTransitionDurationTime(tab.element) / 1.5; //берем время на открытие следующей
      tab.opened = false; //закрыта
      getButton([tab.name]).classList.remove("_active", "_no-event"); //отжимаем кнопку вкладки и позволяем нажиматься

      if (getState("CONSOLE_DEBUG")) console.log("T A B C L O S I N G", tab.element);
    }
  });

  tabss.forEach((tab) => {
    if (toOpen == tab.name) {
      //ищем вкладку, которую открыть
      getButton([tab.name]).classList.add("_active", "_no-event"); //сразу красим кнопку и запрещаем нажиматься
      const tabItems = tab.element.firstElementChild;
      setTimeout(() => {
        tab.element.classList.add("_active");
        tabItems.classList.add("_active");
        tab.opened = true;

        buttonsWrapper.forEach((btn) => {
          //возвращаем кнопки
          btn.classList.remove("_no-event");
        });
        if (getState("CONSOLE_DEBUG")) console.log("T A B O P E N", tab);
      }, closingtime);
    }
  });

  if (toOpen == "closeAll") {
    setTimeout(() => {
      buttonsWrapper.forEach((btn) => {
        //возвращаем кнопки
        btn.classList.remove("_no-event");
      });
    }, 500);
  }
}

export function tabHeightChange(tabElement, tabItemsElement, firstState) {
  setTimeout(() => {
    const tabWidth = tabElement.offsetHeight;
    const itemElementWidth = tabItemsElement.offsetHeight;

    if (tabWidth > itemElementWidth || firstState) tabItemsElement.style.height = `${tabWidth + 20}px`;
  }, getTransitionDurationTime(tabElement));
}

export function modalOnOff(element, flag) {
  //включение и отключение модальных окон
  const container = element.firstElementChild;
  const bodyElement = document.body;

  const fullwidth = window.innerWidth;
  const bodyWidth = bodyElement.clientWidth;

  const modalOpened = document.querySelectorAll(".modal");

  if (flag) {
    element.classList.add("_active");
    container.classList.add("_active");
    bodyElement.classList.add("_lock");

    if (modalOpened.length == 1) {
      bodyElement.style.paddingRight = `${fullwidth - bodyWidth}px`;
    }
  } else {
    element.classList.remove("_active");
    container.classList.remove("_active");
    if (modalOpened.length == 1) {
      setTimeout(() => {
        bodyElement.style.paddingRight = null;
        bodyElement.classList.remove("_lock");
      }, getTransitionDurationTime(element));
    }
  }
}

export function spoilerOnOff(elementToOpen, buttonPushed) {
  //открывание и закрывание спойлера
  buttonPushed.classList.add("_no-event"); //запрещаем нажатие кнопки
  if (elementToOpen.classList.contains("_active")) {
    const ElementHeight = elementToOpen.scrollHeight; //считаем высоту открытого спойлера
    elementToOpen.style.maxHeight = `${ElementHeight}px`; //добавляем его в Style
    elementToOpen.classList.remove("_active-height"); //тут удаляем fit-content, но из-за Style ничего не меняется
    setTimeout(() => {
      elementToOpen.style.maxHeight = null; // а тут удаляем style, и он скрывается
      elementToOpen.classList.remove("_active"); //прозрачность добавляем
    }, 10);
  } else {
    elementToOpen.classList.add("_active"); //убираем прозрачность
    const ElementHeight = elementToOpen.scrollHeight; //считаем скрытую высоту
    elementToOpen.style.maxHeight = `${ElementHeight}px`; //добавялем её
    setTimeout(() => {
      elementToOpen.classList.add("_active-height"); //а тут добавляем fit-content, чтобы была адаптивная высота
    }, 520);
  }
  setTimeout(() => {
    buttonPushed.classList.remove("_no-event"); //разрешаем нажатие кнопки
  }, 520);
}

export function lapNodeShow(node, column, time) {
  //появление времени круга в 'inRound'
  let zIndex = 40;
  const allNode = document.querySelectorAll(".in-round__lap-node");
  const lap = column.parentNode;
  const lapLeft = lap.offsetLeft;
  const lapWidth = lap.offsetWidth;
  const columnHeight = column.offsetTop;
  if (getState("CONSOLE_DEBUG")) console.log(columnHeight);

  node.style.left = `${lapLeft + lapWidth / 2}px`;
  node.style.top = `${columnHeight}px`;

  allNode.forEach((node) => {
    if (node.classList.contains("_active")) {
      zIndex++;
    }
  });

  node.classList.add("_active");
  node.style.zIndex = zIndex;
  setTimeout(() => {
    node.classList.remove("_active");
    node.style.zIndex = null;
  }, time);
}

export function allLapsGraphScale(minusPlus) {
  //масштабирование не самое удачое
  const buttons = {
    //кнопки для блокирования нажатий
    all: document.querySelector(".all-laps__buttons"),
    minus: document.querySelector(".all-laps__minus"),
    plus: document.querySelector(".all-laps__plus"),
  };

  const averageLine = document.querySelector(".all-laps__average-line"); //цифры кругов
  const maxLine = document.querySelector(".all-laps__max-line");
  const averageValue = averageLine.querySelector("span");
  const maxValue = maxLine.querySelector("span");

  const laps = document.querySelectorAll(".all-laps__lap"); //каждый круг
  const allLaps = document.querySelector(".all-laps__laps"); //все все круги
  const allLapsArea = document.querySelector(".all-laps__laps-area"); //контейнер для всех всех кругов
  const pseudoLap = document.querySelector(".all-laps__pseudo-lap"); //пустой круг в начале - нужен для того, чтобы слайдер стоял ровно...
  const pseudoLapWidth = pseudoLap.offsetWidth;
  const finalLap = laps[laps.length - 1]; //последний круг, его ширина - ширина полоски span
  const finalLapWidth = finalLap.offsetWidth;
  const padding = parseInt(getComputedStyle(allLapsArea).paddingRight); //отступ для контейнера
  const fullWidth = allLapsArea.offsetWidth - padding * 2; //ширина контейнера
  let lapWidth = laps[0].offsetWidth; //текущая ширина одного круга
  const scroll = allLapsArea.scrollLeft; //текущее положение скроллла
  if (minusPlus == "minus") {
    //уменьшение масштаба
    const scaleStep = lapWidth / 3; //шаг уменьшения масштаба
    buttons.plus.classList.remove("_no-event"); //открываем кнопку ПЛЮС. иногда она может быть закрыта

    if (lapWidth * (laps.length - 1) - scaleStep * (laps.length - 1) > fullWidth) {
      //если это уменьшение всё ещё больше, чем ширина контейнера

      let paddingScroll; //переменные отступа и пустого круга, чтобы при 0 скролле никуда не перемещать
      let pseudoScroll;

      if (scroll) {
        paddingScroll = padding;
        pseudoScroll = pseudoLapWidth;
        averageValue.classList.add("_scroll"); //цифры кругов исчезают
        maxValue.classList.add("_scroll");
      } else {
        //Если нет скролла, то отступы не считаем;
        paddingScroll = 0;
        pseudoScroll = 0;
      }

      const lapsHide = scroll / lapWidth; //считаем сколько кругов скрыто слева
      const scrollTo = scaleStep * lapsHide + paddingScroll + pseudoScroll; //считаем увеличение ширины скрытых кругов слева, и плюс падинг и пустой круг
      buttons.all.classList.add("_no-event"); //блокируем кнопки

      allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth - scaleStep}px)7px`; //уменьшаем все все круги

      averageValue.style.transform = `translate(${scrollTo}px,0)`; //цифры кругов уходят влево
      maxValue.style.transform = `translate(${scrollTo}px,0)`;
      allLaps.style.transform = `translate(${scrollTo}px,0)`; //перемещаем все все круги, чтобы они остались так же, как были

      setTimeout(() => {
        //после анимации...
        allLaps.classList.add("_scroll"); //делаем transition 0s

        const scrollRightCompenstaion = allLaps.scrollWidth - allLapsArea.scrollLeft - allLaps.clientWidth; //Если величина скролла больше, чем можно скролить - это вычтем

        allLaps.style.transform = null; //удаляем перемещение

        if (scrollRightCompenstaion > 0) {
          allLapsArea.scrollBy(`-${scrollTo}`, 0); //скроллим на величину перемещения
        } else {
          allLapsArea.scrollBy(`-${scrollTo + scrollRightCompenstaion}`, 0); //скроллим на величину перемещения с вычетом компенсации
        }

        setTimeout(() => {
          averageValue.classList.remove("_scroll"); //цифры кругов появляются
          maxValue.classList.remove("_scroll");
          allLaps.classList.remove("_scroll"); //возвращаем transition time с небольшой задержкой для страховки
          buttons.all.classList.remove("_no-event"); //открывает возможность нажимать кнопки
        }, 25);
      }, 500);
    } else {
      //если это уменьшение станет меньше, чем ширина контейнера, то...
      //делаем все все круги шириной контейнера,
      allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${(fullWidth - pseudoLapWidth - finalLapWidth) / (laps.length - 1)}px)7px`;
      buttons.minus.classList.add("_no-event"); //блокируем кнопку МИНУС, так как это финальное уменьшение
    }
  }

  if (minusPlus == "plus") {
    //увеличение масштаба
    const scaleStep = lapWidth / 2; //шаг увеличения
    buttons.minus.classList.remove("_no-event"); //открываем кнопку МИНУС. Иногда она может быть блокирована

    const slider = document.querySelector(".all-laps__slider");
    const lapsShow = fullWidth / (lapWidth + scaleStep); //вычисляем, сколько сейчас влезает кругов в контейнер
    const lapChoosed = slider.value; //круг, который выбран ползунком

    allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth + scaleStep}px)7px`; //увеличиваем все все круги
    let paddingScroll;
    let pseudoScroll;
    if (scroll) {
      paddingScroll = padding;
      pseudoScroll = pseudoLapWidth;
      averageValue.classList.add("_scroll");
      maxValue.classList.add("_scroll");
    } else {
      //Если нет скролла, то отступы не считаем;
      paddingScroll = 0;
      pseudoScroll = 0;
    }

    //вычисляем перемещение - берем новую ширину круга и умножаем её круг, который выбран. Выбраный круг будет в начале.
    //Вычитаем из этого половину кругов, которые влезут в контейнер, чтобы выбранный был посередине.
    //плюсуем падинг и пустой круг
    const translateWidth = (lapWidth + scaleStep) * lapChoosed - (lapWidth + scaleStep) * (lapsShow / 2) + paddingScroll + pseudoScroll;

    if (translateWidth > scroll) {
      //делаем это, когда полученная ширина больше, чем ширина, которую уже проскролили. Иначе скролл будет меньше 0
      buttons.all.classList.add("_no-event"); //блокируем кнопки

      allLaps.style.transform = `translate(-${translateWidth - scroll}px,0)`; //перемещаем на величину, вычитая проскроленную величину

      setTimeout(() => {
        //после анимации...
        allLaps.classList.add("_scroll"); //делаем transition 0s

        allLaps.style.transform = null; //убираем перемещение
        allLapsArea.scrollBy(translateWidth - scroll, 0); //скроллим на величину перемещения
        setTimeout(() => {
          averageValue.classList.remove("_scroll"); //цифры кругов появляются
          maxValue.classList.remove("_scroll");
          allLaps.classList.remove("_scroll"); //возвращаем transition time
          buttons.all.classList.remove("_no-event"); //открываем кнопки
        }, 50);
      }, 500);
    }

    if ((lapWidth + scaleStep) * 3 > fullWidth - finalLapWidth) {
      //если после увеличения кругов влезает только больше трех..
      buttons.plus.classList.add("_no-event"); //..то блокируем кнопку ПЛЮС. Последнее увеличение
    }
  }
}

//ДВЕ ОДИНАКОВЫЕ ФУНКЦИИ
export function pilotsVsGraphScale(minusPlus) {
  //масштабирование не самое удачое
  const buttons = {
    //кнопки для блокирования нажатий
    all: document.querySelector(".pilots-vs__scale-buttons"),
    minus: document.querySelector(".pilots-vs__minus"),
    plus: document.querySelector(".pilots-vs__plus"),
  };

  const averageLine = document.querySelector(".pilots-vs__average-line"); //цифры кругов
  const maxLine = document.querySelector(".pilots-vs__max-line");
  const averageValue = averageLine.querySelector("span");
  const maxValue = maxLine.querySelector("span");

  const laps = document.querySelectorAll(".pilots-vs__lap"); //каждый круг
  const allLaps = document.querySelector(".pilots-vs__laps"); //все все круги
  const allLapsArea = document.querySelector(".pilots-vs__laps-area"); //контейнер для всех всех кругов
  const pseudoLap = document.querySelector(".pilots-vs__pseudo-lap"); //пустой круг в начале - нужен для того, чтобы слайдер стоял ровно...
  const pseudoLapWidth = pseudoLap.offsetWidth;
  const finalLap = laps[laps.length - 1]; //последний круг, его ширина - ширина полоски span
  const finalLapWidth = finalLap.offsetWidth;
  const padding = parseInt(getComputedStyle(allLapsArea).paddingRight); //отступ для контейнера
  const fullWidth = allLapsArea.offsetWidth - padding * 2; //ширина контейнера
  let lapWidth = laps[0].offsetWidth; //текущая ширина одного круга
  if (getState("CONSOLE_DEBUG")) console.log("laps", laps[0]);

  const scroll = allLapsArea.scrollLeft; //текущее положение скроллла
  if (minusPlus == "minus") {
    //уменьшение масштаба
    const scaleStep = lapWidth / 3; //шаг уменьшения масштаба
    buttons.plus.classList.remove("_no-event"); //открываем кнопку ПЛЮС. иногда она может быть закрыта

    if (lapWidth * (laps.length - 1) - scaleStep * (laps.length - 1) > fullWidth) {
      //если это уменьшение всё ещё больше, чем ширина контейнера

      let paddingScroll; //переменные отступа и пустого круга, чтобы при 0 скролле никуда не перемещать
      let pseudoScroll;

      if (scroll) {
        paddingScroll = padding;
        pseudoScroll = pseudoLapWidth;
        averageValue.classList.add("_scroll"); //цифры кругов исчезают
        maxValue.classList.add("_scroll");
      } else {
        //Если нет скролла, то отступы не считаем;
        paddingScroll = 0;
        pseudoScroll = 0;
      }

      const lapsHide = scroll / lapWidth; //считаем сколько кругов скрыто слева
      const scrollTo = scaleStep * lapsHide + paddingScroll + pseudoScroll; //считаем увеличение ширины скрытых кругов слева, и плюс падинг и пустой круг
      buttons.all.classList.add("_no-event"); //блокируем кнопки

      allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth - scaleStep}px)7px`; //уменьшаем все все круги

      averageValue.style.transform = `translate(${scrollTo}px,0)`; //цифры кругов уходят влево
      maxValue.style.transform = `translate(${scrollTo}px,0)`;
      allLaps.style.transform = `translate(${scrollTo}px,0)`; //перемещаем все все круги, чтобы они остались так же, как были

      setTimeout(() => {
        //после анимации...
        allLaps.classList.add("_scroll"); //делаем transition 0s

        const scrollRightCompenstaion = allLaps.scrollWidth - allLapsArea.scrollLeft - allLaps.clientWidth; //Если величина скролла больше, чем можно скролить - это вычтем

        allLaps.style.transform = null; //удаляем перемещение

        if (scrollRightCompenstaion > 0) {
          allLapsArea.scrollBy(`-${scrollTo}`, 0); //скроллим на величину перемещения
        } else {
          allLapsArea.scrollBy(`-${scrollTo + scrollRightCompenstaion}`, 0); //скроллим на величину перемещения с вычетом компенсации
        }

        setTimeout(() => {
          averageValue.classList.remove("_scroll"); //цифры кругов появляются
          maxValue.classList.remove("_scroll");
          allLaps.classList.remove("_scroll"); //возвращаем transition time с небольшой задержкой для страховки
          buttons.all.classList.remove("_no-event"); //открывает возможность нажимать кнопки
        }, 25);
      }, 500);
    } else {
      //если это уменьшение станет меньше, чем ширина контейнера, то...
      //делаем все все круги шириной контейнера,
      allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${(fullWidth - pseudoLapWidth - finalLapWidth) / (laps.length - 1)}px)7px`;
      buttons.minus.classList.add("_no-event"); //блокируем кнопку МИНУС, так как это финальное уменьшение
    }
  }

  if (minusPlus == "plus") {
    //увеличение масштаба
    const scaleStep = lapWidth / 2; //шаг увеличения
    buttons.minus.classList.remove("_no-event"); //открываем кнопку МИНУС. Иногда она может быть блокирована
    if (getState("CONSOLE_DEBUG")) console.log("lapWidth", lapWidth);

    if (getState("CONSOLE_DEBUG")) console.log("scaleStep", scaleStep);

    const slider = document.querySelector(".pilots-vs__slider");
    const lapsShow = fullWidth / (lapWidth + scaleStep); //вычисляем, сколько сейчас влезает кругов в контейнер
    const lapChoosed = slider.value; //круг, который выбран ползунком
    if (getState("CONSOLE_DEBUG")) console.log("lapChoosed", lapChoosed);

    allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth + scaleStep}px)7px`; //увеличиваем все все круги
    let paddingScroll;
    let pseudoScroll;

    if (scroll) {
      paddingScroll = padding;
      pseudoScroll = pseudoLapWidth;
      averageValue.classList.add("_scroll");
      maxValue.classList.add("_scroll");
    } else {
      //Если нет скролла, то отступы не считаем;
      paddingScroll = 0;
      pseudoScroll = 0;
    }

    //вычисляем перемещение - берем новую ширину круга и умножаем её круг, который выбран. Выбраный круг будет в начале.
    //Вычитаем из этого половину кругов, которые влезут в контейнер, чтобы выбранный был посередине.
    //плюсуем падинг и пустой круг
    const translateWidth = (lapWidth + scaleStep) * lapChoosed - (lapWidth + scaleStep) * (lapsShow / 2) + paddingScroll + pseudoScroll;

    if (translateWidth > scroll) {
      //делаем это, когда полученная ширина больше, чем ширина, которую уже проскролили. Иначе скролл будет меньше 0
      buttons.all.classList.add("_no-event"); //блокируем кнопки

      allLaps.style.transform = `translate(-${translateWidth - scroll}px,0)`; //перемещаем на величину, вычитая проскроленную величину

      setTimeout(() => {
        //после анимации...
        allLaps.classList.add("_scroll"); //делаем transition 0s

        allLaps.style.transform = null; //убираем перемещение
        allLapsArea.scrollBy(translateWidth - scroll, 0); //скроллим на величину перемещения
        setTimeout(() => {
          averageValue.classList.remove("_scroll"); //цифры кругов появляются
          maxValue.classList.remove("_scroll");
          allLaps.classList.remove("_scroll"); //возвращаем transition time
          buttons.all.classList.remove("_no-event"); //открываем кнопки
        }, 50);
      }, 500);
    }

    if ((lapWidth + scaleStep) * 3 > fullWidth - finalLapWidth) {
      //если после увеличения кругов влезает только больше трех..
      buttons.plus.classList.add("_no-event"); //..то блокируем кнопку ПЛЮС. Последнее увеличение
    }
  }
}

export function allLapsGraphChoosing(name, classForSpan) {
  const laps = document.querySelectorAll(".all-laps__lap");
  const slider = document.querySelector(".all-laps__slider");

  const heat = getHeat(name);
  const lapsData = getLapsByName(name, heat, false);

  const stat = {
    roundCount: document.querySelector(".all-laps__round-count-value"),
    lapCount: document.querySelector(".all-laps__lap-count-value"),
    lapStart: document.querySelector(".all-laps__lap-start-value"),
    lapEnd: document.querySelector(".all-laps__lap-end-value"),
    lapTime: document.querySelector(".all-laps__lap-time-value"),
  };

  const roundCount = lapsData[slider.value].round;
  const lapCount = lapsData[slider.value].lapIndex;
  const lapStart = lapsData[slider.value].lapTimeStart;
  const lapEnd = lapsData[slider.value].lapTimeEnd;
  const lapTime = lapsData[slider.value].lapTime;

  stat.roundCount.innerHTML = roundCount;
  stat.lapCount.innerHTML = lapCount;
  stat.lapStart.innerHTML = lapStart;
  stat.lapEnd.innerHTML = lapEnd;
  stat.lapTime.innerHTML = lapTime;

  laps[slider.value].classList.add(classForSpan);
  laps.forEach((lap, index) => {
    if (index != slider.value) {
      lap.classList.remove("_active");
      lap.classList.remove("_active-permanent");
    }
  });
}
//ЕЩЁ ДВЕ ОДИНАКОВЫЕ ФУНКЦИИ
export function pilotsVsGraphChoosing(name1, name2, classForSpan) {
  const laps = document.querySelectorAll(".pilots-vs__lap");
  const vsSlider = document.querySelector(".pilots-vs__slider");

  const heats = [getHeat(name1), getHeat(name2)];

  const lapsDatas = [getLapsByName(name1, heats[0], false), getLapsByName(name2, heats[1], false)];

  const stat = {
    roundCount: document.querySelector(".pilots-vs__round-count-value"),
    lapCount: document.querySelector(".pilots-vs__lap-count-value"),
    lapStart: document.querySelector(".pilots-vs__lap-start-value"),
    lapTime: document.querySelector(".pilots-vs__lap-time-value"),
  };

  const currentLapsId = lapsIdData[vsSlider.value];

  const currentLapsData = [];

  lapsDatas.forEach((arr, index) => {
    let lapData = arr.filter((el) => el.lapId == currentLapsId[index]);
    // if(getState('CONSOLE_DEBUG'))console.log('LAPPPPDATA', ...lapData);
    if (lapData == "") {
      lapData = ["-"];
    }
    currentLapsData.push(...lapData);
  });

  // let roundCount;			Тут раунд был один и тот же у двух пилотов;
  // currentLapsData.forEach(lapData => {
  // 	const round = lapData.round
  // 	if (round) {
  // 		roundCount = round
  // 	}
  // })

  const roundCounts = {};
  currentLapsData.forEach((lapData, index) => {
    const roundCount = lapData.round;
    if (getState("CONSOLE_DEBUG")) console.log("lapData.round", lapData.round);

    if (roundCount) {
      roundCounts[index] = roundCount;
    } else {
      roundCounts[index] = "-";
    }
  });

  const lapCounts = {};
  currentLapsData.forEach((lapData, index) => {
    const lapCount = lapData.lapIndex;
    if (lapCount) {
      lapCounts[index] = lapCount[0];
    } else {
      lapCounts[index] = "-";
    }
  });

  const lapStarts = {};
  currentLapsData.forEach((lapData, index) => {
    const lapStart = lapData.lapTimeStart;
    if (lapStart) {
      lapStarts[index] = lapStart;
    } else {
      lapStarts[index] = "--:--:--";
    }
  });

  const lapTimes = {};
  currentLapsData.forEach((lapData, index) => {
    const lapTime = lapData.lapTime;
    if (lapTime) {
      lapTimes[index] = lapTime;
    } else {
      lapTimes[index] = "-:--.---";
    }
  });

  // if(getState('CONSOLE_DEBUG'))console.log('roundCount', roundCount);

  // if(getState('CONSOLE_DEBUG'))console.log('lapTimes', lapTimes);
  // if(getState('CONSOLE_DEBUG'))console.log('lapStarts', lapStarts);
  // if(getState('CONSOLE_DEBUG'))console.log('lapCounts', lapCounts);

  // stat.roundCount.innerHTML = roundCount   Это когда раунд был один для двух пилотов
  stat.roundCount.innerHTML = `<p>${roundCounts[0]}</p><p>${roundCounts[1]}</p>`;
  stat.lapCount.innerHTML = `<p>${lapCounts[0]}</p><p>${lapCounts[1]}</p>`;
  stat.lapStart.innerHTML = `<p>${lapStarts[0]}</p><p>${lapStarts[1]}</p>`;
  stat.lapTime.innerHTML = `<p>${lapTimes[0]}</p><p>${lapTimes[1]}</p>`;

  laps[vsSlider.value].classList.add(classForSpan);
  if (getState("CONSOLE_DEBUG")) console.log("vsSlider.value", vsSlider.value);

  laps.forEach((lap, index) => {
    if (index != vsSlider.value) {
      lap.classList.remove("_active");
      lap.classList.remove("_active-permanent");
    }
  });
}

export function startRound() {
  if (getState("CONSOLE_DEBUG")) console.log("NAMES", pilotsName);
  if (getState("CONSOLE_DEBUG")) console.log("lapsByPilot", lapsByPilot);
  if (getState("CONSOLE_DEBUG")) console.log("intervals", intervals);
  if (getState("CONSOLE_DEBUG")) console.log("lapTimeStep", lapTimeStep);
  if (getState("CONSOLE_DEBUG")) console.log("holeShots", holeShots);
  if (getState("CONSOLE_DEBUG")) console.log("pilotsIntervalCount", pilotsIntervalCount);
  if (getState("CONSOLE_DEBUG")) console.log("lapState", lapState);
  if (getState("CONSOLE_DEBUG")) console.log("roundSpeed", roundSpeed);
  if (getState("CONSOLE_DEBUG")) console.log("playState", roundPlayState);

  if (!lastHoleShot) {
    intervalButtonsAccept = setInterval(() => {
      let holeFullArr = [];
      let holeTruedArr = [];

      pilotsName.forEach((name) => {
        holeFullArr.push(lapState[name][0]);
        holeTruedArr = holeFullArr.filter((el) => el == true);
      });

      if (holeFullArr.length == holeTruedArr.length) {
        lastHoleShot = true;
      }

      if (lastHoleShot == true) {
        if (getState("CONSOLE_DEBUG")) console.log("RJYTWWWWW");
        const roundPlayButton = document.querySelector(".round__play-button");
        const slider = document.querySelector(".round__slider");
        roundPlayButton.classList.remove("_no-event");
        slider.classList.remove("_no-event");
        clearInterval(intervalButtonsAccept);
      }
    }, 100);
  }
  pilotsName.forEach((pilotName) => {
    const laps = lapsByPilot[pilotName];

    laps.forEach((lap, lapIndex) => {
      const fixedRoundSpeed = roundSpeed.toFixed(2);
      const floatLapTimeStep = lapTimeStep[pilotName][lapIndex];
      const fixedLapTimeStep = floatLapTimeStep.toFixed(2);
      const floatIntervalTime = +fixedRoundSpeed * +fixedLapTimeStep;
      // const fixedIntervalTime = +floatIntervalTime.toFixed(2)

      const preFixedIntervalTime = +floatIntervalTime.toFixed(2);

      let fixedIntervalTime;
      if (preFixedIntervalTime < 10) {
        const fixedFullNum = preFixedIntervalTime.toFixed(0);
        fixedIntervalTime = `10.${fixedFullNum}`;
      } else {
        fixedIntervalTime = +preFixedIntervalTime.toFixed(2);
      }

      if (!holeShots[pilotName].state) {
        if (getState("CONSOLE_DEBUG")) console.log("HOLESHOTTTTTTTTTT", pilotName);
        holeShots[pilotName].state = true;

        let timeoutMultiplier;
        if (roundSpeed == 1) {
          timeoutMultiplier = 0.5;
        } else {
          timeoutMultiplier = 1;
        }

        holeShots[pilotName].interval = setTimeout(() => {
          lapState[pilotName][0] = true;
          // holeShots[pilotName].state = false;
          if (getState("CONSOLE_DEBUG")) console.log("SETT TIME");
        }, holeShots[pilotName].timeout * +fixedRoundSpeed * timeoutMultiplier);
      }

      // let currentCount = 0;
      // const maxCount = element.laps.length;
      // const intervalTime = 100;

      intervals[pilotName][lapIndex] = setInterval(() => {
        // if (pilotName == 'BeeHolder') if(getState('CONSOLE_DEBUG'))console.log('INTERVALLLL', lapIndex);

        if (lapState[pilotName][lapIndex]) {
          let pecrentMultiplaer;
          if (roundSpeed == 1) {
            pecrentMultiplaer = 2;
          } else {
            pecrentMultiplaer = 1;
          }

          if (pilotsIntervalCount[pilotName][lapIndex] * 1 < 100) {
            lap.style.width = `${pilotsIntervalCount[pilotName][lapIndex] * 1}%`;
            pilotsIntervalCount[pilotName][lapIndex] += 1 * pecrentMultiplaer;
          } else {
            lap.style.width = "100%";
            pilotsIntervalCount[pilotName][lapIndex] = 100;
            clearInterval(intervals[pilotName][lapIndex]);

            lapState[pilotName][lapIndex + 1] = true;

            const allLapsState = [];

            for (const counts in pilotsIntervalCount) {
              const pilotCounts = pilotsIntervalCount[counts];
              pilotCounts.forEach((count) => {
                allLapsState.push(count);
              });
            }
            const fullWidthLaps = allLapsState.filter((el) => el == 100);

            if (allLapsState.length == fullWidthLaps.length) {
              // if(getState('CONSOLE_DEBUG'))console.log('В С Ё!!!!');
              endRound();
              roundPlayState = "end";
            }
          }
        }
        // if(getState('CONSOLE_DEBUG'))console.log('fixedIntervalTime', fixedIntervalTime);
      }, +fixedIntervalTime);
    });
  });
}

export function pauseRound() {
  pilotsName.forEach((pilotName) => {
    const intervalArr = intervals[pilotName];
    intervalArr.forEach((inter) => {
      clearInterval(inter);
    });
  });
}

export function endRound() {
  pauseRound();
  const roundPlayButton = document.querySelector(".round__play-button");
  const paragraph = roundPlayButton.firstElementChild;

  textChange(paragraph, `<p>${getState("textStrings").roundsTab.again}</p>`, 150);

  for (const lapp in lapsByPilot) {
    const laps = lapsByPilot[lapp];
    laps.forEach((lapp, index) => {
      laps[index].classList.add("_akcent");
    });
  }

  for (const counts in pilotsIntervalCount) {
    const pilotCounts = pilotsIntervalCount[counts];
    pilotCounts.forEach((count, index) => {
      pilotCounts[index] = 0;
    });
  }

  for (const lap in lapState) {
    const lapsStates = lapState[lap];
    lapsStates.forEach((states, index) => {
      lapsStates[index] = false;
    });
  }

  for (const holeName in holeShots) {
    const holeObj = holeShots[holeName];
    holeObj.state = false;
  }

  lastHoleShot = false;
  clearInterval(intervalButtonsAccept);
}

export function speedChange(sliderElement) {
  pauseRound();
  const speedValue = document.querySelector(".round__speed-value");
  const sliderValue = sliderElement.value;
  roundSpeed = speedValues[sliderValue];
  if (getState("CONSOLE_DEBUG")) console.log("LOGG", roundSpeed);

  speedValue.innerHTML = `x${speedNames[roundSpeed]}`;

  if (roundPlayState == "play") startRound();
}

export function roundStatsStrokeWidthChange() {
  const statWindow = document.querySelector(".statistic__full-round");

  if (statWindow) {
    const allNames = document.querySelectorAll(".statistic__names-item");
    const statWindowWidth = statWindow.clientWidth;

    if (getState("CONSOLE_DEBUG")) console.log("statWindowWidth", statWindowWidth);

    const padding = parseInt(getComputedStyle(statWindow).paddingLeft);

    allNames.forEach((stroke) => {
      const span = stroke.firstElementChild;
      span.style.width = `${statWindowWidth - padding * 2}px`;
      if (getState("CONSOLE_DEBUG")) console.log("span", span);
    });
  }
}

export function smoothTextChange(elementToChange, text) {
  // исчезновление и появление текста
  elementToChange.style.color = "rgba(255,255,255,0.0)";
  setTimeout(() => {
    elementToChange.innerHTML = text;
    elementToChange.style.color = null;
  }, getTransitionDurationTime(elementToChange));
}

export function textChange(elementWithText, textToChange, time) {
  elementWithText.style.opacity = 0;
  elementWithText.style.transform = `scale(0.9)`;
  elementWithText.style.transition = `opacity ${time}ms ease ${time / 2}ms,transform ${time}ms ease 0ms`;
  setTimeout(() => {
    elementWithText.innerHTML = `${textToChange}`;
    elementWithText.style.opacity = 1;
    elementWithText.style.transform = `scale(1.0)`;
    elementWithText.style.transition = `opacity ${time}ms ease 0ms,transform ${time}ms ease ${time / 2}ms`;

    setTimeout(() => {
      elementWithText.style.opacity = null;
      elementWithText.style.transform = null;
      elementWithText.style.transition = null;
    }, time);
  }, time);
}

export function setAkcentValues(akcentArrHere) {
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

  if (getState("CONSOLE_DEBUG")) console.log("akcentElements", akcentArrHere[2]);
  // if(getState('CONSOLE_DEBUG'))console.log('');

  akcentElements[`bestLap${akcentArrHere[0]}`].classList.add("_akcent");
  akcentElements[`bestConsecutive${akcentArrHere[1]}`].classList.add("_akcent");
  akcentElements[`average${akcentArrHere[2]}`].classList.add("_akcent");
  akcentElements[`totalLaps${akcentArrHere[3]}`].classList.add("_akcent");
}

export async function moveMonth(start, stop) {
  const daysElement = document.querySelector(".calendar__days");
  const prevButton = document.querySelector(".calendar__prev-month");
  const nextButton = document.querySelector(".calendar__next-month");

  prevButton.classList.remove("_disabled");
  nextButton.classList.remove("_disabled");
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
    getState("currentMonth").setMonth(getState("currentMonth").getMonth() - 1);
  } else if (start == "left") {
    getState("currentMonth").setMonth(getState("currentMonth").getMonth() + 1);
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
  const present = new Date();
  console.log(getState("currentMonth").getMonth() - present.getMonth() < 0);

  if (getState("currentMonth").getMonth() - present.getMonth() >= 0) {
    nextButton.classList.add("_disabled");
  }
}
