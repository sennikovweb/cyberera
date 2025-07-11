export function timeSumer(previouseDate, previousLapTime) {
  //посчитать время по дате и время круга;

  const previouseDateHour = +[...previouseDate].splice(0, 2).join("");
  const previouseDateMinutes = +[...previouseDate].splice(3, 2).join("");
  const previouseDateSecundes = +[...previouseDate].splice(6, 2).join("");

  let currentHour = previouseDateHour;
  let currentMinutes = previouseDateMinutes;
  let currentSecundes = Math.round(previouseDateSecundes + +previousLapTime);

  if (currentSecundes >= 60 && currentSecundes < 120) {
    currentMinutes += 1;
    currentSecundes = parseInt(currentSecundes - 60);
  } else if (currentSecundes >= 120 && currentSecundes < 180) {
    currentMinutes += 2;
    currentSecundes = parseInt(currentSecundes - 120);
  } else if (currentSecundes >= 180 && currentSecundes < 240) {
    currentMinutes += 3;
    currentSecundes = parseInt(currentSecundes - 180);
  }

  if (currentMinutes >= 60) {
    currentHour += 1;
    currentMinutes = parseInt(currentMinutes - 60);
  }
  if (currentHour >= 24) {
    currentHour = 0;
  }

  let hourString = currentHour;
  let minutesString = currentMinutes;
  let secundesString = currentSecundes;

  if (hourString < 10) hourString = `0${hourString}`;
  if (minutesString < 10) minutesString = `0${minutesString}`;
  if (secundesString < 10) secundesString = `0${secundesString}`;

  const lapStart = `${hourString}:${minutesString}:${secundesString}`;

  return lapStart;
}

export function lapTimeSumer(data = [], formfated) {
  //посчитать несколько время кругов - для кругов подряд
  const lapsTime = data;
  const lapsTimeFloat = [];
  lapsTime.forEach((element) => {
    //В этом forEach записывает Float время в новый массив

    const lapTimeSpread = [...element]; //Делим цифру на знаки
    const minute = lapTimeSpread.shift(); //Первую цифру времени удаляем, и записываем как минуту

    lapTimeSpread.shift(); //Тут удаляем двоеточие

    const lapFloat = parseFloat(lapTimeSpread.join("")); //Здесь воссоединяем цифры без минут

    if (minute > 0) {
      const fullLap = lapFloat + 60 * minute;
      const fullLapFixed = fullLap.toFixed(3);
      lapsTimeFloat.push(fullLapFixed); // Записываем с минутами
    } else {
      const fullLap = lapFloat;
      const fullLapFixed = fullLap.toFixed(3);
      lapsTimeFloat.push(fullLapFixed); //Записываем без минут
    }
  });

  const consecutiveTimeFloat = lapsTimeFloat.reduce(function (a, b) {
    //Складываем время в массиве
    return +a + +b;
  });

  if (formfated == false) {
    // тут время Float
    return consecutiveTimeFloat;
  } else {
    //здесь время Человеческое
    let consecutiveMinute = 0;
    let consecutiveSecundes = +consecutiveTimeFloat;

    if (consecutiveSecundes >= 60 && consecutiveSecundes < 120) {
      consecutiveMinute = 1;
      consecutiveSecundes = consecutiveSecundes - 60;
    } else if (consecutiveSecundes >= 120 && consecutiveSecundes < 180) {
      consecutiveMinute = 2;
      consecutiveSecundes = consecutiveSecundes - 120;
    } else if (consecutiveSecundes >= 180 && consecutiveSecundes < 240) {
      consecutiveMinute = 3;
      consecutiveSecundes = consecutiveSecundes - 180;
    }

    if (consecutiveSecundes < 10) {
      return `${consecutiveMinute}:0${consecutiveSecundes.toFixed(3)}`;
    } else {
      return `${consecutiveMinute}:${consecutiveSecundes.toFixed(3)}`;
    }
  }
}

export function fromFloatToString(array) {
  //превращаем массив времени Float в массив человечиских цифр в виде String
  const allLapsTime = array.map((lap) => {
    if (lap < 60) {
      if (lap < 10) return (lap = `0:0${lap}`);
      lap = `0:${lap}`;
    } else if (lap >= 60 && lap < 120) {
      let lapWithoutMinute = lap - 60;
      if (lapWithoutMinute < 10) {
        lap = `1:0${lapWithoutMinute.toFixed(3)}`;
      } else {
        lap = `1:${lapWithoutMinute.toFixed(3)}`;
      }
    } else {
      let lapWithoutMinute = lap - 120;
      if (lapWithoutMinute < 10) {
        lap = `2:0${lapWithoutMinute.toFixed(3)}`;
      } else {
        lap = `2:${lapWithoutMinute.toFixed(3)}`;
      }
    }
    return lap;
  });
  return allLapsTime;
}

export function getAnimationDurationTime(element) {
  // время анимации
  const time = parseFloat(getComputedStyle(element).animationDuration) * 1000;
  return time;
}

export function getTransitionDurationTime(element) {
  //Время перехода
  const time = parseFloat(getComputedStyle(element).transitionDuration) * 1000;
  return time;
}

export function lapTimeConverter(time, floatOrString) {
  if (floatOrString == "float") {
    const lapTimeStringSpread = [...time]; //Делим цифру на знаки
    const minute = lapTimeStringSpread.shift(); //Первую цифру времени удаляем, и записываем как минуту

    lapTimeStringSpread.shift(); //Тут удаляем двоеточие

    const lapTimeFloat = parseFloat(lapTimeStringSpread.join("")); //Здесь воссоединяем цифры без минут

    if (minute > 0) {
      const lapTimeFloatFull = lapTimeFloat + 60 * minute;
      const lapTimeFloatFullFixed = lapTimeFloatFull.toFixed(3);
      return lapTimeFloatFullFixed;
    } else {
      const lapTimeFloatFixed = lapTimeFloat.toFixed(3);
      return lapTimeFloatFixed;
    }
  } else if (floatOrString == "string") {
    const minutesFloat = time / 60;
    const minutesSpread = [...minutesFloat.toString()];
    const minutes = minutesSpread[0];
    const secundesFloat = time - minutes * 60;
    let secundes = secundesFloat.toFixed(3);
    if (secundesFloat < 10) secundes = `0${secundesFloat.toFixed(3)}`;
    const fullTime = `${minutes}:${secundes}`;

    return fullTime;
  }
}

export function getNumFromText(text) {
  let num;
  const textArr = [...text];
  const textNums = [];
  textArr.forEach((el, index) => {
    if (el == el.match(/\d+/g)) {
      textNums.push(el);
    }
    if (index == textArr.length - 1) {
      num = textNums.join("");
    }
  });
  return num;
}
