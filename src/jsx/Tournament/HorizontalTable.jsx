import { useState, useEffect } from "react";
import RaceCard from "./RaceCard";
import { DOUBLE_ELIM_GRIDS } from "./const";

import { getState } from "../../js/sharedStates";

function HorizontalTable({ raceData, activePilot }) {
  const [activePilotId, setActivePilotId] = useState(null);
  const [activeRaces, setActiveRaces] = useState("");

  const findStatus = (raceData) => {
    const currentRace = raceData.findIndex((race) => race.status == "current");
    const lastComplete = raceData.findIndex((race) => race.status == "lastComplete");
    const nextRace = raceData.findIndex((race) => race.status == "next");

    setActiveRaces([currentRace, lastComplete, nextRace]);
  };

  useEffect(() => {
    findStatus(raceData);
  }, [raceData]);

  const choosePilot = (e) => {
    const id = e.target.getAttribute("pilot-id");
    if (id == activePilotId) {
      setActivePilotId(null);
    } else {
      setActivePilotId(id);
    }
  };

  return (
    <>
      <div className="tournament__full-table" style={{ gridTemplateRows: `repeat(24, ${getState("tournamentPilotsPerHeat")*15+2}px)` }}>
        {raceData.map((race, index) => {
          return (
            <RaceCard
              key={`race-${index}`}
              raceData={race}
              pilotButton={choosePilot}
              activePilot={activePilotId}
              raceIndex={index}
              gridPositionsData={DOUBLE_ELIM_GRIDS.horizontal}
              doubleElimLows={DOUBLE_ELIM_GRIDS.lowTableRaces}
              activeRaces={activeRaces}
              pilotsQuantity={getState("tournamentPilotsPerHeat")}
            />
          );
        })}
        <div className="tournament__low-strip"></div>
      </div>
    </>
  );
}
export default HorizontalTable;
