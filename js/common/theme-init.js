/* TrailScope module: theme-init.js — 首帧绘制前同步应用主题，避免浅色闪烁。
   必须在 <head> 中、CSS 构建之前同步加载；同时被 ui-common.js 作为主题初始化来源使用。 */
const THEME_STORAGE_KEY = 'trailscope.themeMode';
const THEME_MODES = new Set(['light', 'system', 'dark']);

function getThemeMode() {
    let mode = 'system';
    try {
        const storedMode = localStorage.getItem(THEME_STORAGE_KEY);
        if (THEME_MODES.has(storedMode)) mode = storedMode;
    } catch (_) {}
    return mode;
}

function resolveTheme(mode) {
    return mode === 'system'
        ? (window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : mode;
}

(function applyThemeOnStartup() {
    const mode = getThemeMode();
    const theme = resolveTheme(mode);
    const root = document.documentElement;
    root.dataset.themeMode = mode;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
})();
