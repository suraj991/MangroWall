import { useState } from "react";
import { themes } from "../data/themes";
import { useZones } from "../hooks/useZones";
import { useScenarios } from "../hooks/useScenarios";
import Sidebar from "../components/Sidebar/Sidebar";
import MapArea from "../components/Map/MapArea";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [scenario, setScenario] = useState(0);
  const [activeLayer, setActiveLayer] = useState("risk");
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeFigure, setActiveFigure] = useState(null);

  const theme = isDark ? themes.dark : themes.light;
  const { zones } = useZones();
  const { scenarios: scenarioData } = useScenarios();

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      overflow: "hidden",
      background: theme.bg,
      color: theme.text,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Sidebar
        theme={theme}
        isDark={isDark}
        onToggleTheme={() => setIsDark(d => !d)}
        scenario={scenario}
        scenarioData={scenarioData}
        onFigureSelect={setActiveFigure}
      />
      <MapArea
        theme={theme}
        scenario={scenario}
        scenarioData={scenarioData}
        activeLayer={activeLayer}
        zones={zones}
        onLayerChange={setActiveLayer}
        onScenarioChange={setScenario}
        onZoneClick={setSelectedZone}
        activeFigure={activeFigure}
        onCloseFigure={() => setActiveFigure(null)}
      />
    </div>
  );
}
