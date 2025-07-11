const states = {
  mainObj: {},
  consecutivesCount: 3,
  currentClass: 1,
  CONSOLE_DEBUG: false,
  textStrings: {},
};
export function setState(key, value) {
  states[key] = value;
}

export function getState(key) {
  return states[key];
}

let tabs = {
	
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
