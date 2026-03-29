import zonesData from "../data/zones.json";

export function useZones() {
  return { zones: zonesData, loading: false, error: null };
}
