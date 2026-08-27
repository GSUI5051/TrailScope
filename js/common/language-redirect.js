/* TrailScope module: language-redirect.js — 托管环境下按系统语言自动跳转（实验性）。
   中文系语言停留，其他跳英文版；file:// 本地打开不跳转；
   手动点过语言菜单后本会话不再自动跳转。
   必须在 <head> 中、页面渲染前同步加载，否则跳转前会闪现中文版页面。 */
(function () {
    function detectLang() {
        if (navigator.languages && navigator.languages.length) return navigator.languages[0];
        return navigator.language || '';
    }
    var hosted = location.protocol === 'http:' || location.protocol === 'https:';
    var onEnglishPage = location.pathname.indexOf('TrailScope-English.html') !== -1;
    var chose = false;
    try { chose = !!sessionStorage.getItem('trailscope.langChoice'); } catch (_) {}
    if (hosted && !onEnglishPage && !chose) {
        var lang = (detectLang() || '').toLowerCase();
        if (lang && lang.indexOf('zh') !== 0) {
            location.replace('TrailScope-English.html');
        }
    }
    document.addEventListener('click', function (e) {
        var link = e.target && e.target.closest ? e.target.closest('.lang-panel a') : null;
        if (!link) return;
        try {
            sessionStorage.setItem('trailscope.langChoice',
                link.getAttribute('href').indexOf('TrailScope-English.html') !== -1 ? 'en' : 'zh');
        } catch (_) {}
    });
})();
