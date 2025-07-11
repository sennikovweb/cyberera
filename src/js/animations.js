import { textChange, startRound } from "./uiChange";
// import {}

export function allLapsShow(allLaps, allLapsButton, nameForSlider) {
  const element = {
    container: allLaps.firstElementChild,
    tittle: allLaps.querySelector(".all-laps__tittle"),
    lapsArea: allLaps.querySelector(".all-laps__laps-area"),
    solidAnimation: allLaps.querySelector(".all-laps__solid-animation"),
    slider: allLaps.querySelector(".all-laps__slider"),
    averageLine: allLaps.querySelector(".all-laps__average-line"),
    maxLine: allLaps.querySelector(".all-laps__max-line"),
    buttons: allLaps.querySelector(".all-laps__buttons"),
    stats: allLaps.querySelector(".all-laps__stats"),
  };
  allLapsButton.classList.add("_no-event");

  setTimeout(() => {
    //удаляем классы 'скрыто'
    element.tittle.classList.remove("_hidden-tittle");
    element.buttons.classList.remove("_hidden-buttons");
    element.lapsArea.classList.remove("_hidden-vertical-stroke");
    element.slider.classList.remove("_hidden-slider");
  }, 500);

  setTimeout(() => {
    element.solidAnimation.classList.remove("_hidden-graph");
  }, 800);
  setTimeout(() => {
    element.solidAnimation.remove();
    element.averageLine.classList.remove("_hidden-horizontal-stroke");
    element.maxLine.classList.remove("_hidden-horizontal-stroke");
    if (CONSOLE_DEBUG) console.log("REMOVE");
    allLapsGraphChoosing(nameForSlider, "_active");
  }, 1400);
  setTimeout(() => {
    element.container.classList.remove("_no-event");
    allLapsButton.classList.remove("_no-event");
    element.lapsArea.classList.remove("_lock");
    element.stats.classList.remove("_hidden-stats");
  }, 1900);
}

export function pilotsVsShow(allLaps) {
  const element = {
    container: allLaps.firstElementChild,
    tittle: allLaps.querySelector(".pilots-vs__tittle"),
    lapsArea: allLaps.querySelector(".pilots-vs__laps-area"),
    solidAnimation: allLaps.querySelector(".pilots-vs__solid-animation"),
    slider: allLaps.querySelector(".pilots-vs__slider"),
    averageLine: allLaps.querySelector(".pilots-vs__average-line"),
    maxLine: allLaps.querySelector(".pilots-vs__max-line"),
    buttons: allLaps.querySelector(".pilots-vs__scale-buttons"),
    stats: allLaps.querySelector(".pilots-vs__stats"),
  };

  setTimeout(() => {
    //удаляем классы 'скрыто'
    element.tittle.classList.remove("_hidden-tittle");
    element.buttons.classList.remove("_hidden-buttons");
    element.lapsArea.classList.remove("_hidden-vertical-stroke");
    element.slider.classList.remove("_hidden-slider");
  }, 500);

  setTimeout(() => {
    element.solidAnimation.classList.remove("_hidden-graph");
  }, 800);
  setTimeout(() => {
    element.solidAnimation.remove();
    element.averageLine.classList.remove("_hidden-horizontal-stroke");
    element.maxLine.classList.remove("_hidden-horizontal-stroke");
  }, 1400);
  setTimeout(() => {
    element.container.classList.remove("_no-event");
    element.lapsArea.classList.remove("_lock");
    element.stats.classList.remove("_hidden-stats");
  }, 1900);
}

export function roundShow(round, buttonRound) {
  const element = {
    container: round.firstElementChild,
    tittle: round.querySelector(".round__tittle"),
    graphArea: round.querySelector(".round__graph-area"),
    buttons: round.querySelector(".round__buttons"),
    exitBtn: round.querySelector(".round__exit-button"),
    slider: round.querySelector(".round__speed-slider"),

    playButton: round.querySelector(".round__play-button"),
    laps: round.querySelectorAll(".round__graph-area-lap-node"),
    names: round.querySelectorAll(".round__graph-area-name"),
  };

  buttonRound.classList.add("_no-event"); //запрещаем кнопку, где время

  setTimeout(() => {
    //удаляем классы 'скрыто'
    element.buttons.classList.remove("_hidden-buttons");
    element.tittle.classList.remove("_hidden-tittle");
    element.graphArea.classList.remove("_hidden-graph-area");
    element.slider.classList.remove("_hidden-slider");
  }, 500);

  setTimeout(() => {
    element.names.forEach((name) => {
      name.classList.remove("_hidden-graph-area-name");
    });
  }, 500);

  setTimeout(() => {
    let currentCount = 0;
    const maxCount = element.laps.length;
    const intervalTime = 80;
    let intervalFunction = setInterval(() => {
      //полоски 'круги' Интервал чтобы поочереди
      element.laps[currentCount].classList.remove("_hidden-graph-area-lap-node");
      currentCount++;
      if (currentCount == maxCount) clearInterval(intervalFunction);
    }, intervalTime);
  }, 500);

  setTimeout(() => {
    element.container.classList.remove("_no-events");
    buttonRound.classList.remove("_no-event");
    element.buttons.classList.remove("_no-event");
    element.exitBtn.classList.remove("_no-event");
    element.playButton.classList.remove("_hidden-play-button");

    const paragraph = element.playButton.firstElementChild;
    textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 150);
    startRound();
    roundPlayState = "play";
  }, 1100);
}

export function inRoundShow(inRound, buttonTime) {
  //Анимация появления 'inRound'
  const element = {
    container: inRound.firstElementChild,
    tittle: inRound.querySelector(".in-round__tittle"),
    exitBtn: inRound.querySelector(".in-round__exit-button"),
    area: inRound.querySelector(".in-round__round-area"),
    areaLaps: inRound.querySelector(".in-round__round-area-laps"),
    laps: inRound.querySelectorAll(".in-round__lap"),
    nodes: inRound.querySelectorAll(".in-round__lap-node"),
    columns: inRound.querySelectorAll(".in-round__lap-column"),
    stats: inRound.querySelector(".in-round__stats"),
    addButton: inRound.querySelector(".in-round__to-round-button"),
  };
  buttonTime.classList.add("_no-event"); //запрещаем кнопку, где время

  setTimeout(() => {
    //удаляем классы 'скрыто'
    element.tittle.classList.remove("_hidden-tittle");
    element.stats.classList.remove("_hidden-stats");
    element.area.classList.remove("_hidden-horizontal-bar", "_hidden-vertical-bar");
  }, 500);

  setTimeout(() => {
    let currentCount = 0;
    const maxCount = element.laps.length;
    const intervalTime = 100;
    let intervalFunction = setInterval(() => {
      //полоски 'круги' Интервал чтобы поочереди
      element.laps[currentCount].classList.remove("_hidden-vertical-stroke", "_hidden-text");
      currentCount++;
      if (currentCount == maxCount) clearInterval(intervalFunction);
    }, intervalTime);
  }, 500);

  setTimeout(() => {
    element.columns.forEach((column) => {
      column.classList.remove("_hidden-columns");
    });
  }, 1300);

  setTimeout(() => {
    element.container.classList.remove("_no-events");
    buttonTime.classList.remove("_no-event");
    element.addButton.classList.remove("_no-event");
    element.exitBtn.classList.remove("_no-event");
  }, 1900);
}

export function spoilerButtonAnimation(button) {
  //анимации кнопки Спойлер
  button.classList.add("_animation");
  button.classList.toggle("_active");
  setTimeout(() => {
    button.classList.remove("_animation");
  }, 200);
}
