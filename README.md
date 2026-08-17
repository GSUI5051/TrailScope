[简体中文](README-CN.md) | [English](README.md)

一个实验性的在线 GPX 分析工具，但它是完全不同的动物

An experimental online GPX visualizer and analyzer, but a whole different animal

[Click to use](https://gsui5051.github.io/TrailScope/TrailScope-English.html)

# TrailScope – GPX Trail Analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=Leaflet&logoColor=white)

**TrailScope** is a pure front-end GPX track analysis tool designed for hikers and trail runners. Upload your GPX file，input weather data, get a professional route analysis report, including elevation profile, grade visualization, difficulty rating, segment statistics, gear recommendations, and safety considerations.

---

## 🎬 Intro Video

Want a quick walkthrough of TrailScope's core features and workflow?  
Watch intro: [TrailScope Feature Overview](https://youtu.be/GeVyon0YSvM)

The video covers its key modules - loading GPX tracks, reading maps, analyzing elevation profiles and weather assessment - ideal for getting started.

---

## ✨ Features

- **📂 GPX Parsing & Visualization**  
  Supports `.gpx` format, automatically extracts position and elevation.

- **🗺️ Interactive Map**  
  Renders with Leaflet, offers multiple map sources (OpenStreetMap, Windy Outdoor Map, Google Satellite, Amap, etc.), color‑coded by grade or elevation.

- **📈 Elevation Profile**  
  Displays elevation changes along the entire route; supports zoom, pan, and hover/touch to inspect distance, elevation, and grade at any point.  
  Switch between "Grade" and "Elevation" coloring modes.

- **📊 Comprehensive Statistics**  
  - Total distance, total elevation gain/loss (D+/D-), max/min elevation  
  - Average grade, uphill/downhill/flat distances  
  - Maximum uphill/downhill grade 
  - Raw/smooth elevation gain/loss accumulation to reduce GPS and baro altimeter noise
  - Grade distribution analysis and tech tips for hiking and trail running   

- **🏔️ Difficulty Rating**  
  Combines distance, elevation gain, and grade into a 0–100 score and a difficulty label (Casual → Bomber).

- **⏱️ Time & Fitness Estimation**  
  Based on Naismith’s Rule with steep‑terrain correction, estimates total time, moving/rest time, average pace, and energy expenditure (kcal).  
  Provides a 1–5 fitness level description.

- **⚠️ Safety Consideration**  
  Automatically identifies potential risks from route characteristics (high altitude, steep sections, long distance, large elevation gain/loss, etc.) and weather condition, gives an overall safety concern level.

- **☀️ Weather Analysis**  
  Input temperature, humidity, wind speed, and weather type; get tailored gear advice and action suggestions.  
  Advanced parameters (wet‑bulb temperature, dew point, solar radiation, air pressure, etc.) allow estimation of the WBGT (Wet‑Bulb Globe Temperature) for heat‑stress assessment.

- **🎒 Gear & Supply Recommendations**  
  Generates essential gear, recommended gear, and supplies (water, meals, snacks) based on route difficulty, altitude, and weather conditions.  
  Supplies automatically convert between metric and US Customary (or imperial) units; water is displayed in fluid ounces (oz) for imperial units.

- **📋 Segment Statistics**  
  Split the route by "major grade variation", "fixed distance (1 km or 1 mi)", or "waypoints". Each segment shows distance, elevation gain/loss, average grade, max grade, time, and difficulty rating.  
  Click any segment to highlight it on both the map and the elevation profile.

- **🌐 Unit Switching**  
  Toggle between metric (km, m) and imperial (mi, ft) units instantly; all displayed values update accordingly.

- **📱 Mobile Optimized**  
  Touch‑friendly interactions; supports swipe gestures to explore the profile; full‑screen map mode adapts to portrait/landscape orientations.

- **🔒 Privacy First**  
  All processing is done locally in your browser; no data is ever sent to a server. Your data, only yours.

---

## 🚀 How to Use

1. **Open the Page**  
   - [Click here for online version.](https://gsui5051.github.io/TrailScope/TrailScope-English.html)
   - For offline usage, [Click here to download all the code](https://github.com/GSUI5051/TrailScope/archive/refs/heads/main.zip), unzip and launch `TrailScope-English.html` in your browser.

2. **Load a Track**  
   - Click the upload zone and select a `.gpx` file, or drag and drop it to upload zone.  
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
   - **Map**: Zoom, pan, switch map sources; click waypoints for details.  
   - **Elevation Profile**: Scroll to zoom (desktop), pinch to zoom (mobile), drag to pan; hover/touch to inspect points; export as PNG.  
   - **Segments**: Click any row to highlight the corresponding section on map and elevation profile.  
   - **Unit Toggle**: Click the Metric (km, m)/US Customary (mi, ft) button at the top to convert all values.

---

## 🛠️ Tech Stack

- **HTML5 / CSS3** – Structure and styling, with Tailwind CSS for layout
- **JavaScript (ES6+)** – All logic
- **Leaflet** – Map rendering and interaction
- **Canvas API** – Elevation profile drawing
- **Font Awesome** – Icons
- **Native GPX Parsing** – DOM‑based XML parsing

> No backend dependencies; mobile friendly; runs completely offline.

---

## 📦 Directory Structure

```
TrailScope/
├── index.html                  # Chinese main page (entry)
├── TrailScope-Chinese.html     # Chinese main page
├── TrailScope-English.html     # English main page
├── css/
│   ├── leaflet-1p9p4.css
│   ├── fonts.css
│   ├── all.min.css             # Font Awesome
│   └── custom.css              # custom styles shared by all three pages
├── js/
│   ├── common/                 # shared modules & vendor libs (loaded by both pages)
│   │   ├── tailwind-3p4p17.js  # vendor: Tailwind CSS
│   │   ├── leaflet-1p9p4.js    # vendor: Leaflet
│   │   ├── tailwind-config.js  # Tailwind theme configuration
│   │   ├── device.js           # UA / device detection
│   │   ├── colors.js           # gradient color constants
│   │   ├── elevation.js        # raw/smooth elevation accumulation logic
│   │   ├── utils.js            # color interpolation & gradient helpers
│   │   ├── gpx-math.js         # geo math (haversine, 3D distance, nearest point)
│   │   ├── coords.js           # GCJ-02 / WGS-84 coordinate conversion
│   │   ├── map-common.js       # shared map helpers (fit, zoom, segment highlight)
│   │   ├── waypoints.js        # waypoint display mode logic
│   │   └── ui-common.js        # shared UI helpers (zoom, toast, pagination, …)
│   ├── cn/                     # Chinese-only modules
│   │   ├── state.js            # global state
│   │   ├── map-sources.js      # map source definitions
│   │   ├── gpx.js              # GPX parsing & track processing
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
├── webfonts/                   # Font files
├── README.md                   # This file
└── README-CN.md                # Chinese README
```

> **Loading order:** `common/*` first (shared logic + `tailwind-config.js` in `<head>`), then the language modules (`cn/` or `en/`), with `bindings.js` and `init.js` last.

---

## 🧭 Terminology

| Term | Description |
|------|-------------|
| **Elevation Gain (D+)** | Total vertical rise along the track (raw or smoothed with a 4m threshold) |
| **Elevation Loss (D-)** | Total vertical drop along the track |
| **Grade** | Percent slope (positive for uphill, negative for downhill) |
| **Pace** | Minutes per kilometer (or per mile) |
| **Naismith’s Rule** | Classic hiking time formula (1 hour per 5 km + 0.5 hour per 300 m elevation gain), with steep‑terrain correction added |
| **WBGT** | Wet‑Bulb Globe Temperature – a composite index for heat‑stress assessment |
| **Waypoint** | A named point in a GPX file (e.g., "supply", "viewpoint") |
| **Segment** | A sub‑section of the route, defined by grade changes, fixed distance, or waypoints |

---

# ⚠️ Disclaimer

TrailScope provides analysis for planning purposes only.

Outdoor activities involve risks.

Always consider:

- fitness level
- weather conditions
- equipment
- route conditions

before starting your adventure.

---

## 🤝 Contributing

Issues and pull requests are welcome! If you have better algorithms, additional map sources, or UI improvements, feel free to get involved.

- Please review the code structure before making changes.
- Ensure compatibility with both desktop and mobile devices when adding new features.

---

## ⚠️ Usage Restrictions

**This project is for personal research and study purposes only. Commercial use is strictly prohibited.**

Without written permission from the author, this project or its derivatives may not be used for any commercial or for-profit activities, including but not limited to: commercial software products, paid services, or internal business use within enterprises.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to use, modify, and distribute it.

---

## 🌟 Acknowledgements

- Inspired by awesome outdoor softwares and existed gpx visualizers (Strava, Zepp, Mapy, Organic Maps, GPX Studio).
- Thanks to all open‑source libraries (Leaflet, Tailwind CSS, Font Awesome).
- Thanks to OpenStreetMap, Google map, Amap and all map providers.
- Special thanks to outdoor enthusiasts and trail runners for their track data.

---

**TrailScope – Visualize every track.**  

**Made with ❤️ for hikers & trail runners**