export const setEmptyRace = (pilotsQuatity) => {
  const pilotsId = Array.from({ length: pilotsQuatity }, (_, index) => 0);
  const pilotsRacePlaces = Array.from({ length: pilotsQuatity }, (_, index) => {
    return { id: 0 };
  });
  const pilotsNames = Array.from({ length: pilotsQuatity }, (_, index) => {
    return { id: 0, name: null };
  });

  return { pilotsId, pilotsNames, pilotsRoundPlaces: [], pilotsRacePlaces };
};

export const getResultRaces = (roundsArr) => {
  const races = [];

  roundsArr.forEach((round) => {
    const pilotsId = round.nodes.map((pilot) => pilot["pilot_id"]);

    const pilotsNames = pilotsId.map((pilotId) => {
      const pilotNode = round.nodes.filter((pilot) => pilot.pilot_id == pilotId);
      const name = pilotNode[0].callsign;
      return { id: pilotId, name: name };
    });
    const pilotsRoundPlaces = round.nodes
      .map((pilot) => {
        const roundsSum = {};
        roundsSum.id = pilot.pilot_id;
        if (pilot.laps.length === 0) {
          roundsSum.time = 0;
          roundsSum.laps = 0;
        } else {
          const lapsArr = pilot.laps.filter((lap) => lap.deleted == false);
          roundsSum.time = lapsArr.reduce((acc, value) => acc + value["lap_time"], 0);
          roundsSum.laps = lapsArr.length;
        }
        return roundsSum;
      })
      .sort((a, b) => {
        if (a.laps !== b.laps) {
          return b.laps - a.laps;
        }

        if (a.time != null && b.time != null) {
          return a.time - b.time;
        }

        if (a.time == null && b.time != null) return 1;
        if (a.time != null && b.time == null) return -1;

        return 0;
      })
      .map((raceSum, index) => {
        const place = raceSum.id ? index + 1 : null;
        return { ...raceSum, place: place };
      });

    const roundInfo = { roundId: +round.id, heatId: +round.heatId };

    if (races.length === 0) {
      const raceData = { pilotsId, pilotsNames, pilotsRoundPlaces: [pilotsRoundPlaces], roundInfo: [roundInfo], roundsSum: 1 };
      races.push(raceData);
    } else {
      const prevRoundsSum = races[races.length - 1]["roundsSum"];
      const prevId = races[races.length - 1]["pilotsId"];

      const idSet = new Set(prevId);
      const isSameRace = pilotsId.every((id) => idSet.has(id));
      if (!isSameRace) {
        const raceData = { pilotsId, pilotsNames, pilotsRoundPlaces: [pilotsRoundPlaces], roundInfo: [roundInfo], roundsSum: 1 };
        races.push(raceData);
      } else {
        races[races.length - 1].pilotsRoundPlaces.push(pilotsRoundPlaces);
        races[races.length - 1].roundInfo.push(roundInfo);
        races[races.length - 1].roundsSum = prevRoundsSum + 1;
      }
    }
  });

  return races;
};

export const setDuelPlaces = (races, raceQuantity, roundsQuantity, finalRoundsQuantity) => {
  const raceWithDuels = races.map((race, index) => {
    const roundsNeed = index != raceQuantity - 1 ? roundsQuantity : finalRoundsQuantity;
    if (race.roundsSum > roundsNeed) {
      const roundsWithDuels = race.pilotsRoundPlaces.map((value, index) => {
        if (index >= roundsNeed) {
          const duelScoreRound = value.map((pilotRoundInfo) => {
            if (pilotRoundInfo.laps == 0) {
              return { ...pilotRoundInfo, place: 0 };
            } else {
              const currentPlace = pilotRoundInfo.place;
              const duelPlace = currentPlace * 0.1;
              return { ...pilotRoundInfo, place: Number(duelPlace.toFixed(1)) };
            }
          });

          return duelScoreRound;
        } else {
          return value;
        }
      });
      return { ...race, pilotsRoundPlaces: roundsWithDuels };
    } else {
      return { ...race };
    }
  });
  return raceWithDuels;
};

export const setRaceScores = (races) => {
  const racesWithScore = races.map((race) => {
    let pilotsRaceScores = [];
    const pilotsId = race.pilotsId;
    const raceTimes = race.pilotsRoundPlaces;
    pilotsId.forEach((pilotId) => {
      const pilotRacePlace = { id: pilotId, score: 0 };
      raceTimes.forEach((roundData) => {
        const pilotRoundData = roundData.filter((time) => time.id == pilotId);
        pilotRacePlace.score += pilotId ? pilotRoundData[0].place : 0;
      });
      pilotsRaceScores.push(pilotRacePlace);
    });

    const pilotsRacePlaces = pilotsRaceScores
      .sort((a, b) => {
        const scoreA = Number(a.score);
        const scoreB = Number(b.score);

        if (scoreA === 0 && scoreB === 0) return 0;
        if (scoreA === 0) return 1;
        if (scoreB === 0) return -1;

        return scoreA - scoreB;
      })
      .map((scoreData, index) => {
        const place = scoreData.id ? index + 1 : null;
        return { ...scoreData, place: place };
      });
    return { ...race, pilotsRacePlaces };
  });

  return racesWithScore;
};

export const setRaceStatus = (races, raceQuantity, roundsQuantity, finalRoundsQuantity) => {
  const racesWithStatus = races.map((race, index) => {
    if (index != races.length - 1) {
      return { ...race, status: "complete" };
    } else {
      const roundNeedQuantity = index != raceQuantity - 1 ? roundsQuantity : finalRoundsQuantity;
      if (race.roundsSum < roundNeedQuantity) {
        const roundsAndEmpty = Array.from({ length: roundNeedQuantity }, (_, index) => {
          if (index > race.pilotsRoundPlaces.length - 1) {
            const emptyRound = race.pilotsId.map((pilotId) => {
              return { id: pilotId, time: 0, laps: 0, place: 0 };
            });
            return emptyRound;
          } else {
            return [...race.pilotsRoundPlaces[index]];
          }
        });
        return { ...race, pilotsRoundPlaces: roundsAndEmpty, status: "current" };
      } else if (race.roundsSum == roundNeedQuantity) {
        const placesArr = race.pilotsRacePlaces.map((race) => race.score);
        const placesArrFilter = placesArr.filter((place) => place != 0);
        const uniqueScoreSet = new Set(placesArrFilter);
        if (placesArrFilter.length != uniqueScoreSet.size) {
          const rounds = race.pilotsRoundPlaces;
          const emptyRound = race.pilotsId.map((pilotId) => {
            return { id: pilotId, time: 0, laps: 0, place: 0 };
          });
          return { ...race, pilotsRoundPlaces: [...rounds, emptyRound], status: "current" };
        } else {
          return { ...race, status: "lastComplete" };
        }
      } else {
        return { ...race, status: "lastComplete" };
      }
    }
  });
  return racesWithStatus;
};

export const getPlannedRaces = (slots, roundsQuantity, pilotsPerHeat = 4) => {
  const plannedRaces = slots.map((heat, index) => {
    let pilots = heat.pilots;

    if (pilots.length < pilotsPerHeat) {
      const fullPilots = Array.from({ length: pilotsPerHeat }, (_, index) => {
        if (pilots[index]) {
          return pilots[index];
        } else {
          return { id: 0, callsign: null };
        }
      });
      pilots = fullPilots;
    }

    const pilotsId = pilots.map((pilot) => pilot.id);
    const pilotsNames = pilots.map((pilot) => {
      return { id: pilot.id, name: pilot.callsign };
    });
    const racePlaces = pilots.map((pilot) => {
      return { id: pilot.id };
    });

    const emptyRounds = Array.from({ length: roundsQuantity }, (round) => {
      const emptyRound = pilotsId.map((pilotId) => {
        return { id: pilotId, time: 0, laps: 0, place: 0 };
      });
      return emptyRound;
    });

    const status = index == 0 ? "next" : "planned";
    return { pilotsId, pilotsNames, pilotsRoundPlaces: emptyRounds, pilotsRacePlaces: racePlaces, roundInfo: [], status: status };
  });
  return plannedRaces;
};

export const addEmptyRaces = (allKnownRaces, raceQuantity, pilotsPerHeat = 4) => {
  let fullQuantityRaces = [];
  if (allKnownRaces.length != raceQuantity) {
    fullQuantityRaces = Array.from({ length: raceQuantity }, (_, index) => {
      if (index <= allKnownRaces.length - 1) {
        return { ...allKnownRaces[index] };
      } else {
        //   const emptyRoundsQuantity = index != getState("tournamentRaceQuantity") - 1 ? getState("tournamentRoundsQuantity") : getState("tournamentFinalRoundsQuantity");
        //   const emptyRounds = Array.from({ length: emptyRoundsQuantity }, (round) => {
        //     const emptyRound = writeEmptyRace(getState("tournamentPilotsPerHeat"));
        //     return emptyRound;
        //   });
        return { ...setEmptyRace(pilotsPerHeat), pilotsRoundPlaces: [], status: "empty" };
      }
    });
  }
  return fullQuantityRaces;
};
