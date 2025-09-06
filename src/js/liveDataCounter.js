import { getMinutesSinceUpload } from "./utils";
import { getState, setState, getTab } from "./sharedStates";
import { getLiveData } from "./loadData";
import { newLiveDataHTML, makeRaceClassButtons } from "./htmlWriters";
import { tabSwitch, startFileView } from "./uiChange";

export function tittleCounter(eventName) {
  document.querySelector(".main-tittle__display-name").innerHTML = eventName;
  document.querySelector(".main-tittle__date").innerHTML = "-";
  document.querySelector(".main-tittle__time").innerHTML = "-";
  const timer1 = setInterval(() => {
    document.querySelector(".main-tittle__date").innerHTML = getMinutesSinceUpload("minutes", getState("liveTimestamp"));
    document.querySelector(".main-tittle__time").innerHTML = getMinutesSinceUpload("seconds", getState("liveTimestamp"));
  }, 1000);
}

export function checkLiveData() {
  setState(
    "checkLiveDataInterval",
    setInterval(async () => {
      const newData = await getLiveData(getState("isUuid"));
      console.log("CHECK DATA");

      if (getState("liveTimestamp") != newData.lastUpdate && getState("newLiveData") == false) {
        setState("newLiveData", true);
      }
      if (getState("newLiveData")) {
        const updateLiveDataButton = newLiveDataHTML();
        document.querySelector(".main").prepend(updateLiveDataButton);

        updateLiveDataButton.addEventListener(
          "click",
          async function () {
            updateLiveDataButton.classList.add("_no-event");
            //очищаем таймер, как только событие при клике
            clearInterval(getState("checkLiveDataInterval"));
            console.log("ТАЙМЕР");

            //при клике на кнопку нужно получить самые свежие данные, поэтому просим их ещё раз
            const freshData = await getLiveData(getState("isUuid"));
            setState("mainObj", freshData.results);
            setState("liveTimestamp", freshData.lastUpdate);

            //Очищаем кнопки классов - вдруг поменялись
            document.querySelectorAll(".class-switch-buttons__button").forEach((raceClass) => {
              raceClass.remove();
            });

            //получаем новые кнопки классов и выбиравем последнюю
            makeRaceClassButtons();
            tabSwitch("closeAll", getTab("main"));

            //удаляем html
            setTimeout(() => {
              const pilotsTab = document.querySelector(".pilots");
              const leaderboardTab = document.querySelector(".leaderboard");
              const roundsTab = document.querySelector(".rounds");
              pilotsTab.remove();
              leaderboardTab.remove();
              roundsTab.remove();
            }, 50);

            //добавляем html
            setTimeout(() => {
              startFileView("classSwitch");
            }, 150);
            setState("newLiveData", false);

            //удаляем кнопку и включаем функцию ещё раз
            updateLiveDataButton.remove();
            const repeatTmr = setTimeout(() => {
              checkLiveData();
              clearTimeout(repeatTmr);
            }, 10000);
          },
          { once: true }
        );
      }
    }, 10000)
  );
}
