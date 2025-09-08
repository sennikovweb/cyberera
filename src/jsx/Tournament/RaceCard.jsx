import { motion, LayoutGroup } from "motion/react";
import { DOUBLE_ELIM_GRIDS } from "./const";
function RaceCard({ raceData, raceIndex, gridPositionsData, pilotButton, activePilot, doubleElimLows, activeRaces, pilotsQuantity }) {
  const [isCurrentRace, isCompleteRace, isNextRace] = activeRaces || [];
  return (
    <>
      <div
        className={`tournament__race ${doubleElimLows?.includes(raceIndex + 1) ? "_low-table" : ""} 
		  ${isCurrentRace == raceIndex ? "_current-race" : ""} ${isCompleteRace == raceIndex ? "_last-complete-race" : ""} ${isNextRace == raceIndex ? "_next-race" : ""}`}
        style={{ gridRow: `${gridPositionsData[raceIndex]?.gridRow}`, gridColumn: `${gridPositionsData[raceIndex]?.gridColumn}` }}>
        <div className="tournament__race-tittles">
          <h3 className="tournament__race-num">{`Гонка ${raceIndex + 1}`}</h3>
          <h4 className="tournament__race-phase">{DOUBLE_ELIM_GRIDS.horizontal?.[raceIndex]?.racePhase}</h4>
          <h2 className={`tournament__race-status ${activeRaces.includes(raceIndex) ? "" : "_hidden"}`}>
            {raceIndex == isCurrentRace ? "Сейчас" : raceIndex == isCompleteRace ? "Завершена" : raceIndex == isNextRace ? "Следующая" : ""}
          </h2>
        </div>
        <div className="tournament__race-sub-tittles">
          <h4 className="tournament__race-name-tittle _race-subtittle">Пилоты</h4>
          <h4 className="tournament__race-rounds-tittle _race-subtittle">Раунды</h4>
          <h4 className="tournament__race-place-tittle _race-subtittle">Баллы</h4>
        </div>
        <div className="tournament__race-strokes" style={{ gridTemplateRows: `repeat(${pilotsQuantity}, 1fr)` }}>
          {raceData.pilotsRacePlaces?.map((pilotData, index) => {
            return (
              <motion.div
                layout
                transition={{ duration: 1, ease: "easeOut" }}
                key={`pilot-${pilotData.id ? pilotData.id : index + 999}-race-${raceIndex}`}
                name={`pilot-${pilotData.id ? pilotData.id : index + 999}-race-${raceIndex}`}
                className="tournament__pilot-items">
                <div pilot-id={pilotData.id} onClick={pilotButton} className={`tournament__pilot-name _name-item _race-item ${activePilot == pilotData.id ? "_active" : ""}`}>
                  {raceData.pilotsNames.filter((pilot) => pilot.id == pilotData.id)[0]?.name}
                </div>
                <div
                  className="tournament__pilot-rounds _race-item"
                  style={{ ...(raceData.pilotsRoundPlaces.length > 3 ? { gridTemplateColumns: `repeat(${raceData.pilotsRoundPlaces.length}, 1fr)` } : {}) }}>
                  {raceData.pilotsRoundPlaces.map((roundData, index) => {
                    const pilotRoundData = roundData.filter((data) => data.id == pilotData.id)[0];
                    return (
                      <div key={`round-${index}`} round-num={raceData.roundInfo[index]?.roundId} heat-num={raceData.roundInfo[index]?.heatId} className="tournament__pilot-round">
                        {pilotRoundData?.place ? pilotRoundData.place : "-"}
                      </div>
                    );
                  })}
                </div>
                <div className="tournament__pilot-place _race-item _place-item">{raceData.pilotsRacePlaces.filter((data) => data.id == pilotData.id)[0]?.score}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default RaceCard;
