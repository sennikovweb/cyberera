import React, { useState, useEffect } from "react";

import { getState, subscribe, unsubscribe } from "../../js/sharedStates";
import HorizontalTable from "./HorizontalTable";
import DirectionSwitcher from "./DirectionSwitcher";

import { getResultRaces, setDuelPlaces, setRaceScores, setRaceStatus, getPlannedRaces, addEmptyRaces } from "./utils";

function Tournament({ fullRHData, currentClass }) {
  const [fullData, setFullData] = useState(fullRHData);
  const [raceClass, setRaceClass] = useState(currentClass);

  const [activeTabId, setActiveTabId] = useState(1);

  const results = fullData.results;
  //   const currentClass = getState("currentClass");
  //   const
  const roundsQuantity = getState("tournamentRoundsQuantity");
  const finalRoundsQuantity = getState("tournamentFinalRoundsQuantity");
  const raceQuantity = getState("tournamentRaceQuantity");
  const pilotsPerHeat = getState("tournamentPilotsPerHeat");

  console.log("fullDatafullDatafullData", fullData);

  const dublicatedHeatsData = fullData.dublicatedHeats.filter((heat) => heat.classId == raceClass);
  const dublicatedHeatsId = dublicatedHeatsData.map((heat) => heat.heatId);
  const dublicateIds = dublicatedHeatsData.map((heat) => heat.dublicateId);

  const noResultsHeats = fullData.noResultsHeats.filter((heat) => heat.classId == raceClass).filter((heat) => dublicateIds?.includes(heat.heatId) == false);
  console.log("noResultsHeatsnoResultsHeats", noResultsHeats);

  const heatsNum = getState("mainObj")["heats_by_class"][raceClass];
  const heatsNumSorted = [];
  heatsNum.forEach((num) => {
    if (dublicatedHeatsId?.includes(num)) {
      const dublicateDataForCurrent = dublicatedHeatsData.filter((heat) => heat.heatId == num);
      const dublicateIdForCurrent = dublicateDataForCurrent.map((dublicated) => dublicated.dublicateId);

      heatsNumSorted.push(num, ...dublicateIdForCurrent);
    } else if (heatsNumSorted?.includes(num)) {
      return;
    } else {
      heatsNumSorted.push(num);
    }
  });

  console.log("heatsNum", heatsNum);
  console.log("heatsNumSorted", heatsNumSorted);

  //   const heatsData = Object.entries(results["heats"])
  //     .filter(([key]) => heatsNumSorted.includes(+key))
  //     .map(([, value]) => value);

  const heatsData = heatsNumSorted
    .map((heatNum) => {
      const heatFromResults = results["heats"][heatNum];
      if (heatFromResults) {
        return heatFromResults;
      } else {
        return {};
      }
    })
    .filter((heatData) => heatData.heat_id);

  //Здесь собираем все раунды
  const rounds = heatsData.map((heat) => heat.rounds).flat();

  //собираем массив всех выполненных гонок
  const races = getResultRaces(rounds);

  //Ставим баллы за дуэли, если они есть
  const raceWithDuels = setDuelPlaces(races, raceQuantity, roundsQuantity, finalRoundsQuantity);

  //Здесь счет каждой гонки, уже не раунда
  const racesWithScore = setRaceScores(raceWithDuels);

  //ставим статус complete и проверяем последнюю гонку, complete она или нет
  const racesWithStatus = setRaceStatus(racesWithScore, raceQuantity, roundsQuantity, finalRoundsQuantity);

  //собираем массив предстоящих гонок
  const plannedRaces = getPlannedRaces(noResultsHeats, roundsQuantity, pilotsPerHeat);

  //соединяем два массива Results и noResults
  const allKnownRaces = [...racesWithStatus, ...plannedRaces];

  //делаем массив всех гонок(+пусые)
  const allRaces = allKnownRaces.length == raceQuantity ? allKnownRaces : addEmptyRaces(allKnownRaces, raceQuantity, pilotsPerHeat);

  console.log("heatsheats", heatsData);
  console.log("roundsrounds", rounds);
  console.log("races", races);
  console.log("racesWithScore", racesWithScore);
  console.log("ALLLLRACESSS", allRaces);

  const getButton = (e) => {
    const currentId = e.target.id;
    setActiveTabId(+currentId);
    console.log("activeTabIdactiveTabId", e.target.id);
  };

  useEffect(() => {
    const handleUpdate = (value) => {
      setFullData(value);
    };
    const raceClassUpdate = (value) => {
      setRaceClass(value);
    };

    subscribe("fullRHData", handleUpdate);
    subscribe("currentClass", raceClassUpdate);
  }, []);
  return (
    <>
      <div className="tournament__container tab-items">
        <div className="tournament__tittle">
          <h2 className="tournament__event-name">{fullData.eventName}</h2>
          <h3 className="tournament__final-name">{fullData.results.classes[raceClass].name}</h3>
          <DirectionSwitcher />
        </div>

        <HorizontalTable raceData={allRaces} />
      </div>
    </>
  );
}
export default Tournament;
