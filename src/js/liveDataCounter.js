import { getMinutesSinceUpload } from "./utils";
import { getState } from "./sharedStates";


export function liveDataCounter() {
  const mainDate = document.querySelector(".main-tittle__date");
  const timer1 = setInterval(() => {
    mainDate.innerHTML = getMinutesSinceUpload(getState("liveTimestamp"));
  }, 1000);

  const timer2 = setInterval(async () => {
    const newData = await getLiveData(getState("isUuid"));
    console.log("Сравнение", getState("liveTimestamp"), newData.date);
    console.log("TRUE?", getState("liveTimestamp") == newData.date);
  }, 10000);
}
