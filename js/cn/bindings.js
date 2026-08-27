/* TrailScope module: bindings.js — 绑定页面上原本以 inline onclick/onchange 属性写的事件。 */

document.addEventListener('DOMContentLoaded', () => {
    const bind = (id, evt, fn) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener(evt, fn);
    };

    bind('loadDemoBtn', 'click', () => loadDemoData());
    bind('themeQuickBtn', 'click', () => toggleThemeQuick());
    bind('rawElevBtn', 'click', () => setElevationMode('raw'));
    bind('smoothElevBtn', 'click', () => setElevationMode('smooth'));
    bind('lightThemeBtn', 'click', () => setThemeMode('light'));
    bind('systemThemeBtn', 'click', () => setThemeMode('system'));
    bind('darkThemeBtn', 'click', () => setThemeMode('dark'));
    bind('uploadZone', 'click', () => document.getElementById('fileInput').click());
    bind('clearFileBtn', 'click', () => clearFile());
    bind('prevSegmentBtn', 'click', () => navigateSegment(-1));
    bind('nextSegmentBtn', 'click', () => navigateSegment(1));
    bind('mapZoomInBtn', 'click', () => mapZoomIn());
    bind('mapZoomOutBtn', 'click', () => mapZoomOut());
    bind('mapFitBtn', 'click', () => fitMapToTrack());
    bind('mapFullscreenBtn', 'click', () => enterMapFullscreen());
    bind('mapLinkageBtn', 'click', () => toggleMapLinkage());
    bind('mapSourceSelect', 'change', () => changeMapSource());
    bind('annotationBtn', 'click', () => toggleAnnotations());
    bind('waypointToggleBtn', 'click', () => toggleWaypointDisplay());
    bind('clearHighlightBtn', 'click', () => clearHighlight());
    bind('exportChartBtn', 'click', () => exportChart());
    bind('colorModeSelect', 'change', () => changeColorMode());
    bind('chartZoomInBtn', 'click', () => zoomChart(1.25));
    bind('chartZoomOutBtn', 'click', () => zoomChart(0.8));
    bind('chartResetBtn', 'click', () => resetZoom());
    bind('closeWaypointInfoBtn', 'click', () => closeWaypointInfo());
    bind('analyzeWeatherBtn', 'click', () => analyzeWeather());
    bind('advancedToggleBtn', 'click', () => toggleAdvancedPanel());
    bind('segAuto', 'click', () => setSegmentSize('auto'));
    bind('seg1000', 'click', () => setSegmentSize(1000));
    bind('segWaypoint', 'click', () => setSegmentSize('waypoint'));
    bind('pageSizeSelect', 'change', () => changePageSize());
    bind('firstPageBtn', 'click', () => goToPage(1));
    bind('prevPageBtn', 'click', () => prevPage());
    bind('nextPageBtn', 'click', () => nextPage());
    bind('lastPageBtn', 'click', () => goToLastPage());
});



