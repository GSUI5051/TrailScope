[简体中文](README-CN.md) | [English](README.md)

一个实验性的在线轨迹分析工具，但它是完全不同的动物

An experimental online track visualizer and analyzer, but a whole different animal

[Click to use](https://gsui5051.github.io/TrailScope/TrailScope-English.html)

# TrailScope – Track Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=Leaflet&logoColor=white)

**TrailScope** is a pure front-end track analysis tool for hikers and trail runners. Import a GPX, KML, or KMZ file, add the weather, and get a route report with an elevation profile, grade coloring, difficulty rating, segment stats, gear suggestions, and safety notes.

---

## Intro Video

Intro video: [TrailScope Feature Overview](https://youtu.be/GeVyon0YSvM)

It walks through loading a GPX track, reading the map and elevation profile, and running a weather assessment.

---

## Features

- **GPX / KML / KMZ Parsing & Visualization**  
  Supports `.gpx`, `.kml`, and `.kmz` tracks, including KML paths and text waypoints. Images, videos, and audio attachments inside KMZ are ignored while text annotations are preserved. Input files are limited to 32 MiB; parsed tracks are limited to 200,000 points and 20,000 waypoints.

  **Tracks without valid elevation:** Empty, `NaN`, and other non-finite elevation values are treated as missing. If no track point has valid elevation, every point is assigned an elevation of `0`. The map and total distance remain available, while time is estimated from horizontal distance alone. Elevation gain/loss are ignored. Risks and recommendations that do not depend on elevation are also retained. The elevation profile, difficulty rating, grade-based sections, grade distribution, and route summary are not generated. Fixed-distance and waypoint sections still show distances, but the page warns that they may be inaccurate. If at least one track point has valid elevation, the remaining gaps are filled with the existing rules and analysis continues as usual.

- **Interactive Map**  
  Renders with Leaflet, offers 17 map sources in Chinese and 16 in English (OpenStreetMap, Amap, Tianditu, ESRI, Mapy, Thunderforest, and more), color‑coded by grade or elevation. Map coordinates are shared per coordinate system, contiguous edges in the same render-color bucket are merged into multi-point subpaths, and only the most recent derived render variants are retained. No original route vertices are removed from the displayed track.
  In full-screen mode, the pre-fullscreen center is re-anchored to the center of the visible map area above the profile. While hovering or swiping the profile, the "current position" marker stays pinned at that visible-area center and the map moves beneath it. If the track has no valid elevation, full-screen mode shows the map without creating a profile panel.

- **Dark Mode**  
  A Light / System / Dark toggle (default: System) shared by all three pages; the choice is applied before the first paint, so there is no theme flash. In dark mode every map source switches to a dark tile filter: satellite layers are color-inverted, road and terrain layers get tuned brightness and contrast. Switching themes never re-runs track analysis; only display colors change.

- **Elevation Profile**  
  Displays elevation changes along the entire route; supports zoom, pan, and hover/touch to inspect distance, elevation, and grade at any point.  
  Switch between "Grade" and "Elevation" coloring modes. Long tracks use screen-aware min/max decimation only for drawing; route statistics and point inspection continue to use the complete working point sequence. Fixed-distance segmentation may add exact interpolated boundary points without simplifying the route.

- **Comprehensive Statistics**  
  - Total distance, total elevation gain/loss (D+/D-), max/min elevation  
  - Average grade, uphill/downhill/flat distances  
  - Maximum uphill/downhill grade 
  - Raw/smooth elevation gain/loss accumulation to reduce GPS and baro altimeter noise
  - Grade distribution analysis and tech tips for hiking and trail running   

- **Difficulty Rating**  
  Combines distance, elevation gain, and grade into a 0–100 score and a difficulty label (Casual → Bomber).

- **Time & Fitness Estimation**  
  Based on Naismith's rule of one hour per 5 km, with adjustments for elevation gain, descent, and steep terrain. Rest time is added at 15% of walking time. The page also shows average pace, energy expenditure (kcal), and a 1–5 fitness level. Without valid elevation, walking and rest time are estimated from distance only.

- **Safety Consideration**  
  Flags potential risks from the route (high altitude, steep sections, long distance, large elevation gain/loss) and the weather, then gives an overall safety level.

- **Weather Analysis**  
  Enter temperature, humidity, wind speed, and weather type to get weather notices and suggested actions.  
  Advanced parameters (wet‑bulb temperature, dew point, solar radiation, air pressure, etc.) allow estimation of the WBGT (Wet‑Bulb Globe Temperature) for heat‑stress assessment.

- **Gear & Supply Recommendations**  
  Generates essential gear, recommended gear, and supplies (water, meals, snacks) from route distance, ascent, grade, maximum elevation, and estimated time.  
  The English page converts route values, weather inputs, and supply quantities when the unit system changes. Water is shown in liters (L) for metric units and US fluid ounces (oz) for US Customary units.

- **Segment Statistics**  
  Split the route by "major grade variation", "fixed distance (1 km or 1 mi)", or "waypoints". Each segment shows distance, elevation gain/loss, average grade, max grade, time, and difficulty rating.  
  Click any segment to highlight it on both the map and the elevation profile.

- **Unit Switching**  
  Toggle between metric (km, m) and US Customary (mi, ft) units. Main route values, pace, weather inputs, and supply quantities are converted. The smoothing threshold remains fixed at 4 meters, and backpack capacity stays in liters.

- **Mobile Optimized**  
  Touch‑friendly interactions; supports swipe gestures to explore the profile; full‑screen map mode adapts to portrait/landscape orientations. Cursor and touch indicators use a lightweight overlay canvas, avoiding full profile redraws during pointer movement. Single-finger movement is animation-frame coalesced, and the full-screen current-position marker remains pinned to the center of the upper visible map area.

- **Rendering & Loading Efficiency**  
  Batches same-color profile paths with `Path2D`, caches segment analysis and derived annotation/map data, shares map coordinates between render modes, precompiles the Tailwind stylesheet, and loads JSZip only when a KMZ file is imported. GPX parsing initializes final point shapes in one pass, reuses each edge's horizontal-distance result for 3D distance, ignores obsolete asynchronous read results, and cancels obsolete delayed renders when another track is selected. Icons render from local SVG data instead of icon fonts.

- **Local Track Analysis**  
  - Track files are parsed and analyzed in your browser and are not uploaded to any server. Your data, only yours.
  - Map tiles come from the selected map provider, which requires an internet connection.
  - Some map tiles might be removed in any time.

---

## How to Use

1. **Open the Page**  
   - [Click here for online version.](https://gsui5051.github.io/TrailScope/TrailScope-English.html)
   - For offline usage, [Click here to download all the code](https://github.com/GSUI5051/TrailScope/archive/refs/heads/main.zip), unzip and launch `TrailScope-English.html` in your browser.

2. **Load a Track**  
   - Click the upload zone and select a `.gpx`, `.kml`, or `.kmz` file, or drag and drop it to the upload zone. KMZ is a compressed KML; media attachments are ignored and text waypoints are retained. Files up to 32 MiB are accepted (up to 200,000 track points and 20,000 waypoints).  
   - Alternatively, click the **DEMO** button to load a sample track.

3. **Explore the Analysis**  
   Go to analysis section, showing:
   - Overview stats cards (distance, elevation gain/loss, max elevation)
   - Interactive trail map and elevation profile chart
   - Difficulty rating, time & fitness estimate, safety consideration
   - Weather analysis (requires manual input)
   - Gear & supply recommendations
   - Segment statistics table
   - Grade distribution with technical tips
   - Route summary

4. **Interact**  
   - **Map**: Zoom, pan; map sources are grouped, searchable, and remember the three most recent picks. Click waypoints for details.  
   - **Elevation Profile**: Scroll to zoom (desktop), pinch to zoom (mobile), drag to pan; hover/touch to inspect points; export as PNG.  
   - **Segments**: Click any row to highlight the corresponding section on map and elevation profile.  
   - **Unit Toggle**: Click the Metric (km, m)/US Customary (mi, ft) button at the top to convert the main route values, pace, weather inputs, and supply quantities.

---

## Tech Stack

- **HTML5 / CSS3** – Structure and styling, with a precompiled Tailwind CSS stylesheet for layout
- **JavaScript (ES6+)** – All logic
- **Leaflet** – Map rendering and interaction
- **Leaflet.TileLayer.ColorFilter** – Dark-mode tile filters for every map source
- **Canvas API / Path2D** – Elevation profile and lightweight interaction overlay drawing
- **react-icons 5.7.0** – Icon data source covering the Font Awesome 6, Lucide, and Bootstrap Icons sets. SVG data is vendored in `js/common/icons-data.js` and rendered to inline SVG by `icons.js`, so icons work offline
- **Local GPX / KML Parsing** – DOM‑based XML parsing
- **Local KMZ Extraction** – Vendored JSZip 3.10.1, loaded on demand for offline ZIP extraction
- **Self-hosted Fonts** – Anton (Latin) and LianMengQiYiLuShuaiZhengRuiHeiTi (Chinese) shipped as local files in `webfonts/`, so the page renders fully offline

> No backend is required for parsing or analysis. The static page can run locally, but map display still needs access to the selected tile provider.

---

## Directory Structure

```
TrailScope/
├── index.html                  # Chinese main page (entry)
├── TrailScope-Chinese.html     # Chinese main page
├── TrailScope-English.html     # English main page
├── css/
│   ├── tailwind.generated.css  # precompiled Tailwind utilities used by all pages
│   ├── leaflet-1p9p4.css
│   ├── fonts.css
│   └── custom.css              # custom styles shared by all three pages
├── js/
│   ├── common/                 # shared modules & vendor libs (loaded by all three pages)
│   │   ├── tailwind-3p4p17.js  # retained vendor source; not loaded by production pages
│   │   ├── leaflet-1p9p4.js    # vendor: Leaflet
│   │   ├── leaflet-custom-headers.js # vendor: custom HTTP headers for tile requests
│   │   ├── leaflet-tilelayer-colorfilter.min.js # vendor: dark-mode tile filter plugin
│   │   ├── icons-data.js       # icon SVG data (extracted from the react-icons fa6/lu/bi modules)
│   │   ├── icons.js            # icon renderer, swaps <i> markers for inline SVG
│   │   ├── tailwind-config.js  # retained Tailwind theme source for stylesheet rebuilds
│   │   ├── device.js           # UA / device detection
│   │   ├── colors.js           # gradient colors and cached render color buckets
│   │   ├── elevation.js        # raw/smooth elevation accumulation logic
│   │   ├── utils.js            # color interpolation & gradient helpers
│   │   ├── gpx-math.js         # geo math, nearest-point lookup, display decimation/cache
│   │   ├── coords.js           # GCJ-02 / WGS-84 coordinate conversion and display cache
│   │   ├── map-common.js       # shared map helpers and derived render-group cache
│   │   ├── waypoints.js        # waypoint display mode logic
│   │   ├── ui-common.js        # shared UI helpers (zoom, toast, pagination, dark-mode controller, …)
│   │   ├── theme-init.js       # synchronous pre-paint theme bootstrap (no inline script), reused by ui-common.js
│   │   ├── language-redirect.js # experimental language-based redirect on hosted pages
│   │   ├── jszip.min.js        # vendored JSZip 3.10.1, loaded only for KMZ imports
│   │   └── kmz.js              # on-demand JSZip loader and KMZ extraction
│   ├── cn/                     # Chinese-only modules
│   │   ├── state.js            # global state
│   │   ├── map-sources.js      # map source definitions
│   │   ├── gpx.js              # GPX/KML parsing & track processing
│   │   ├── chart.js            # elevation profile drawing
│   │   ├── map.js              # map initialization & drawing
│   │   ├── interaction.js      # chart interaction (hover / click / touch)
│   │   ├── waypoints.js        # waypoint info UI
│   │   ├── analysis.js         # difficulty / weather / risks / segments
│   │   ├── ui.js               # stats, segments, file & export UI
│   │   ├── bindings.js         # button / select event bindings
│   │   └── init.js             # DOMContentLoaded bootstrap
│   └── en/                     # English-only modules (same layout as cn/)
│       ├── units.js            # metric / imperial unit system
│       └── …                   # state / map-sources / … (same as cn/)
├── demo.gpx                    # Chinese demo track
├── demo-en.gpx                 # English demo track
├── webfonts/                   # self-hosted font files (available offline)
├── LICENSE.txt                 # MIT License
├── README.md                   # This file
└── README-CN.md                # Chinese README
```

> **Loading order:** Pages load `js/common/theme-init.js` synchronously from `<head>` (applies the dark-mode preference before the first paint to avoid flashing), then `js/common/language-redirect.js` (on http(s) pages it redirects to the English page when the system language is not Chinese; it never runs on `file://` or after the visitor picked a language from the menu this session), followed by `css/tailwind.generated.css`, then the shared runtime modules in `common/*` and the language modules (`cn/` or `en/`), with `bindings.js` and `init.js` last. `kmz.js` is loaded with the shared modules, while `jszip.min.js` is injected only when a KMZ import requires it. The retained Tailwind runtime/config files are not requested by the production pages.

---

## Terminology

| Term | Description |
|------|-------------|
| **Elevation Gain (D+)** | Total vertical rise along the track (raw or smoothed with a 4m threshold) |
| **Elevation Loss (D-)** | Total vertical drop along the track |
| **Grade** | Vertical rise over horizontal distance, as a percentage; positive for uphill, negative for downhill |
| **Pace** | Minutes per kilometer (or per mile) |
| **Naismith’s Rule** | A classic hiking-time formula; TrailScope uses one hour per 5 km and half an hour per 300 m of ascent as the base, then adds adjustments for ascent, descent, steep terrain, and rest |
| **WBGT** | Wet‑Bulb Globe Temperature – a composite index for heat‑stress assessment |
| **Waypoint** | A named point in a GPX file (e.g., "supply", "viewpoint") |
| **Segment** | A sub‑section of the route, defined by grade changes, fixed distance, or waypoints |

---

## Disclaimer

The analysis TrailScope provides is for route-planning reference only.

Outdoor activities carry risks. Before you go, check your fitness level, the weather, your gear, and the route conditions.

---

## Contributing

Issues and pull requests are welcome! If you have better algorithms, additional map sources, or UI improvements, feel free to get involved.

- Please review the code structure before making changes.
- Ensure compatibility with both desktop and mobile devices when adding new features.
- Keep parsing, point inspection, and quantitative analysis at full route resolution. Drawing-only decimation/grouping must remain in derived render caches; fixed-distance segmentation may add exact interpolated boundary points but must not simplify or discard route vertices.
- When Tailwind utility classes change in HTML or generated JavaScript templates, rebuild `css/tailwind.generated.css` before publishing.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute it.

---

## Acknowledgements

- Inspired by outdoor apps and GPX tools like 2bulu, Strava, Zepp, Mapy, Organic Maps, and GPX Studio.
- Thanks to all open‑source libraries (Leaflet, Tailwind CSS, react-icons). Icon data comes from the Font Awesome, Lucide, and Bootstrap Icons projects.
- Thanks to OpenStreetMap, Amap and all map providers.
- Special thanks to the hikers and trail runners who shared their track data.

---

**TrailScope – Visualize every track.**  

**Made with ❤️ for hikers & trail runners**