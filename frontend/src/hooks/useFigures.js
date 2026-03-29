import figuresData from "../data/figures.json";

export function useFigures(category = null) {
  const figures = category && category !== "all"
    ? figuresData.filter(f => f.category === category)
    : figuresData;

  return { figures, loading: false };
}
