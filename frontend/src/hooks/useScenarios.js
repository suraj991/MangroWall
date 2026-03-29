import scenariosData from "../data/scenarios.json";

export function useScenarios() {
  return { scenarios: scenariosData, loading: false, error: null };
}
