const states = {
  mainObj: {},
  consecutivesCount: 3,
  currentClass: 1,
  language: "ru",
  CONSOLE_DEBUG: false,
  textStrings: {},
  parsedOK: false,
  isEvent: null,
  isLive: null,
  filesJson: [],
  currentMonth: new Date(),
};
export function setState(key, value) {
  states[key] = value;
}

export function getState(key) {
  return states[key];
}

let tabs = {};

let localFileElements = {
  form: document.querySelector(".local-file__form"),
  input: document.querySelector(".local-file__file"),
  label: document.querySelector(".local-file__label"),
  button: document.querySelector(".local-file__button"),
  tittle: document.querySelector(".local-file__tittle"),
};
export function getLocalFileElement(key) {
  return localFileElements[key];
}

let mainTittleElements = {
  tittle: document.querySelector(".main-tittle"),
};
export function getMainElement(key) {
  return mainTittleElements[key];
}

let buttonElements = {
  element: document.querySelector(".buttons"),
  container: document.querySelector(".buttons__container"),
  pilots: document.querySelector(".buttons__pilots"),
  leaderboard: document.querySelector(".buttons__leaderboard"),
  rounds: document.querySelector(".buttons__rounds"),
  statistic: document.querySelector(".round__statistic-button"),
  view: document.querySelector(".round__view-button"),
};
export function addButton(buttonName, value) {
  buttonElements = { ...buttonElements, [buttonName]: value };
}
export function getButton(key) {
  return buttonElements[key];
}
