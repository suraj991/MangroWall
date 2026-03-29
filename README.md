# 🌿 MangroWall

**2nd Place – SpaceHacks Hackathon, Mangroves and Coastal Cities Track**

> **Mangrove monitoring and flood risk assessment dashboard for Greater Guayaquil, Ecuador.**
> Built for SpaceHack ASU 2026 using satellite imagery processed in Google Earth Engine.

MangroWall uses 9 years of Sentinel-2 satellite data (2015–2024) to track mangrove loss and gain, model flood risk, simulate restoration scenarios, and visualize how urban expansion is putting millions of people at risk.

---

## 🔍 Why This Matters

Guayaquil is one of South America's largest port cities, home to over 4 million people — most of them living on low-lying coastal land along the Guayas River delta. Mangroves are the city's natural flood barrier. When they disappear, flood risk rises directly.

Between 2015 and 2024:
- The city **doubled in urban area** (243 → 496 km²)
- **115 km²** of new development went up in flood-prone zones
- **232 km²** of mangroves were lost
- **45% of the coastline** now lacks mangrove protection

MangroWall makes this data explorable — not just for researchers, but for anyone who wants to understand what's at stake.

---

## 📊 Key Findings

| Metric | Value |
|---|---|
| Study area | 7,908 km² |
| Population at risk | ~4.1 million |
| Mangrove area (2015) | 1,358 km² |
| Mangrove area (2024) | 1,894 km² |
| Mangrove loss (2015–2024) | 232 km² |
| Mangrove gain (2015–2024) | 766 km² |
| Coastline protected by mangroves | ~55% |
| Urban area (2015) | 243 km² |
| Urban area (2024) | 496 km² *(doubled)* |
| New urban in flood-prone zones | 115 km² |
| Mangroves directly converted to urban | 8.9 km² |
| Est. annual flood damage (current) | $2.8 billion USD |

### Restoration Scenarios

| Scenario | Coastline Protected | Critical Risk Pop | Est. Damage |
|---|---|---|---|
| Current state | 55% | 408K | $2.8B |
| Restore to 2015 | 68% | 320K | $1.9B |
| Expand 20% beyond 2024 | 76% | 250K | $1.2B |

> **Bottom line:** Restoring mangroves to 2015 levels would move ~88,000 people out of critical flood risk and save an estimated $900M/year in flood damage.

---

## 🖥️ Dashboard Features

- **Interactive Leaflet map** of Greater Guayaquil with 12 monitoring zones
- **5 map layers** — Risk zones, Mangrove 2015, Mangrove 2024, Change detection, Population
- **Restoration scenario slider** — toggle between current state, 2015 restoration, and 20% expansion to see how risk changes in real time
- **Click any zone** for a detailed popup: risk level, NDVI health score, mangrove change, population
- **Stats tab** — key metrics, population by risk category, economic impact, urban growth
- **Charts tab** — mangrove area by year, population risk breakdown
- **Insights tab** — 5 key findings with the one-line takeaway
- **Figures tab** — all GEE satellite analysis maps; click any to view full screen on the main panel
- **Dark / Light theme** toggle

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5 |
| Map | Leaflet 1.9 |
| Charts | Pure CSS + SVG (no Chart.js dependency) |
| Backend | Node.js, Express 4 |
| Satellite analysis | Google Earth Engine (Sentinel-2) |
| Styling | Inline CSS, DM Sans + JetBrains Mono |

---

## 🚀 Running Locally

You need **Node.js 18+** installed.

### 1. Clone the repo

```bash
git clone https://github.com/suraj991/MangroWall.git
cd MangroWall
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
# API running at http://localhost:4000
```

### 3. Start the frontend

```bash
# In a new terminal
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

Open **http://localhost:5173** in your browser.

> The frontend proxies all `/api` and `/images` requests to the backend automatically — no extra config needed.

---

## 📁 Project Structure

```
MangroWall/
├── backend/
│   ├── data/
│   │   ├── zones.json        # 12 monitoring zones (lat/lng, risk, NDVI, mangrove area)
│   │   ├── scenarios.json    # 3 restoration scenarios with population + economic data
│   │   └── figures.json      # Metadata for all 20 GEE analysis figures
│   ├── public/images/        # Satellite analysis figures (PNG exports from GEE)
│   ├── routes/               # Express route handlers (zones, scenarios, figures)
│   └── index.js              # Server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Charts/       # BarChart.jsx, DoughnutChart.jsx (CSS/SVG)
        │   ├── Map/          # LeafletMap, MapArea, LayerControls, Legend, Slider
        │   └── Sidebar/      # Sidebar + StatsTab, ChartsTab, InsightsTab, FiguresTab
        ├── data/             # themes.js (dark/light), constants.js
        ├── hooks/            # useZones, useScenarios, useFigures (fetch from API)
        ├── pages/            # Dashboard.jsx (top-level layout)
        └── utils/            # riskUtils.js (marker sizing, colors, popup HTML)
```

---

## 🌐 API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |
| `GET` | `/api/zones` | All 12 monitoring zones |
| `GET` | `/api/zones/:id` | Single zone by ID |
| `GET` | `/api/scenarios` | All restoration scenarios |
| `GET` | `/api/scenarios/:id` | Single scenario (0 = current, 1 = restore, 2 = expand) |
| `GET` | `/api/figures` | All figure metadata |
| `GET` | `/api/figures?category=risk` | Figures filtered by category |
| `GET` | `/api/figures/:id` | Single figure metadata |
| `GET` | `/images/:filename` | Serve static figure PNG |

**Figure categories:** `overview` · `change` · `health` · `risk` · `restoration` · `urban`

---

## 🗺️ GEE Analysis Figures

All figures are satellite imagery processed in Google Earth Engine and exported as PNG. Place them in `backend/public/images/`:

| Filename | Description |
|---|---|
| `study-area.png` | Study bounding box (80.35°W–79.55°W, 2.55°S–1.75°S) |
| `mangrove-overview.png` | Current mangrove distribution across the estuary |
| `change-detection.png` | Change map 2015–2024 (green = gain, red = loss) |
| `mangrove-2015.png` | Baseline mangrove extent — 1,358 km² |
| `mangrove-2024.png` | Current mangrove extent — 1,894 km² |
| `loss-hotspots.png` | Concentrated loss zones |
| `health-2024.png` | NDVI health classification (green / yellow / orange) |
| `flood-risk.png` | Flood risk map (low / moderate / high / critical) |
| `protection-gap.png` | Unprotected coastal zones (red = high risk, no mangroves) |
| `population-exposure.png` | Population density overlaid with flood risk |
| `mangrove-loss-vulnerability.png` | Areas where loss directly increases flood exposure |
| `post-restoration-risk.png` | Simulated risk after restoring to 2015 extent |
| `expansion-strategy.png` | Priority zones for mangrove expansion |
| `risk-reduction.png` | Projected risk reduction after full expansion |
| `urban-expansion.png` | New urban development 2015–2024 (magenta) |
| `mangrove-to-urban.png` | Mangroves directly converted to urban land |
| `urban-flood-overlap.png` | New urban development in flood-prone zones |
| `urban-risk-zones.png` | Urban growth overlapping risk classification |
| `timeseries-charts.png` | Mangrove area trend 2015–2024 |
| `timeseries-charts2.png` | Mean NDVI trend 2015–2024 |

---

## 📌 Data Sources

- **Satellite imagery** — Sentinel-2 (ESA), processed via Google Earth Engine
- **Population data** — WorldPop population density raster
- **Elevation** — SRTM 30m DEM
- **Water occurrence** — JRC Global Surface Water dataset
- **Urban classification** — NDBI-based thresholding on Sentinel-2
- **Mangrove classification** — NDVI thresholding (> 0.3) within coastal zones

---

## 👥 Team

Built for **SpaceHack ASU 2026** — a space-technology hackathon focused on Earth observation and climate resilience.

---

*"A rapidly urbanizing, low-lying coastal region with unstable mangrove ecosystems creates increasing flood risk for millions of people."*
