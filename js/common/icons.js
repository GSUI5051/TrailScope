/* TrailScope icons.js — 图标渲染器：把 icons-data.js（数据取自 react-icons@5.7.0 的 fa6/lu 模块）
 * 画进 DOM，替代 Font Awesome webfont 与 lucide 脚本两套体系。
 * 扫描 <i class="fa-*"> 与 <i data-lucide>，原地替换为内联 <svg> 并保留原 class
 * （现有按类着色的 CSS 如 .fa-gauge-high、.equipment-icon i 携带的容器色全部继续生效）。
 * 幂等：已转换的节点不再匹配选择器，可随动态内容反复调用。 */
(function () {
    'use strict';
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const ICONS = window.RI_ICONS || { fa: { solid: {}, regular: {}, brands: {} }, lu: {}, bi: { solid: {} } };
    const FA_STYLE_RE = /^fa-(solid|regular|brands)$/;

    function buildNode(node) {
        const el = document.createElementNS(SVG_NS, node.tag);
        for (const k in node.attr || {}) el.setAttribute(k, node.attr[k]);
        (node.child || []).forEach(child => el.appendChild(buildNode(child)));
        return el;
    }

    function buildSvg(def, className, dataRi) {
        const svg = document.createElementNS(SVG_NS, 'svg');
        /* react-icons IconBase 的默认属性：fill/stroke currentColor、strokeWidth 0；
           lu 线稿由 def.attr 覆盖为 fill:none + stroke currentColor + strokeWidth 2 */
        const attrs = Object.assign(
            { stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0' },
            def.attr || {}
        );
        for (const k in attrs) svg.setAttribute(k, attrs[k]);
        svg.setAttribute('data-ri', dataRi);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        if (className) svg.setAttribute('class', className);
        (def.child || []).forEach(child => svg.appendChild(buildNode(child)));
        return svg;
    }

    function faMatch(el) {
        const cls = el.getAttribute('class') || '';
        const styleToken = cls.split(/\s+/).find(c => FA_STYLE_RE.test(c));
        if (!styleToken) return null;
        const style = styleToken.slice(3); // 'fa-solid' -> 'solid'
        const name = cls.split(/\s+/).find(c => /^fa-/.test(c) && !FA_STYLE_RE.test(c));
        if (!name) return null;
        const key = name.slice(3);
        const def = (ICONS.fa[style] || {})[key];
        return def ? { def, dataRi: 'fa6/' + style + '/' + key } : null;
    }

    function renderTrailIcons(root) {
        root = root || document;
        let missed = 0;
        root.querySelectorAll('i[class*="fa-"]').forEach(el => {
            const m = faMatch(el);
            if (!m) {
                missed++;
                console.warn('[icons] 未映射的 FA 图标:', el.getAttribute('class'));
                return;
            }
            el.replaceWith(buildSvg(m.def, el.getAttribute('class'), m.dataRi));
        });
        root.querySelectorAll('[data-lucide]').forEach(el => {
            const name = el.getAttribute('data-lucide');
            const def = ICONS.lu[name];
            if (!def) {
                missed++;
                console.warn('[icons] 未映射的 lucide 图标:', name);
                return;
            }
            const cls = el.getAttribute('class') || '';
            el.replaceWith(buildSvg(def, (cls ? cls + ' ' : '') + 'lucide lucide-' + name, 'lu/' + name));
        });
        /* bi = Bootstrap Icons（实心），经 data-bi 属性引用，如 <i data-bi="backpack"> */
        root.querySelectorAll('[data-bi]').forEach(el => {
            const name = el.getAttribute('data-bi');
            const def = (ICONS.bi || { solid: {} }).solid[name];
            if (!def) {
                missed++;
                console.warn('[icons] 未映射的 bi 图标:', name);
                return;
            }
            const cls = el.getAttribute('class') || '';
            el.replaceWith(buildSvg(def, (cls ? cls + ' ' : '') + 'bi bi-' + name, 'bi/solid/' + name));
        });
        return missed;
    }

    window.renderTrailIcons = renderTrailIcons;

    /* 动态内容兜底：分段表/装备卡/风险提示/全屏工具栏等在运行时插入含图标的节点，
       旧 webfont 体系天然生效，本体系须补渲染。Observer 检测到新增图标节点后经 rAF 合帧
       触发一次全量补渲染；渲染自身 replaceWith 触发的 mutation 因 svg 不匹配选择器而自然止息。
       检查带预算上限（400 个节点）：超大插入（如一次性渲染数千行）时放弃逐节点
       subtree 查询、直接交给 rAF 全量扫描，把回调开销从线性压到常数。 */
    const OBSERVER_BUDGET = 400;
    let scheduled = false;
    function scheduleRender() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            renderTrailIcons();
        });
    }
    const observer = new MutationObserver((muts) => {
        let inspected = 0;
        for (const m of muts) {
            for (const n of m.addedNodes) {
                if (n.nodeType !== 1) continue;
                if (++inspected > OBSERVER_BUDGET) { scheduleRender(); return; }
                if ((n.matches && n.matches('i[class*="fa-"], [data-lucide], [data-bi]')) ||
                    (n.querySelector && n.querySelector('i[class*="fa-"], [data-lucide], [data-bi]'))) {
                    scheduleRender();
                    return;
                }
            }
        }
    });
    if (document.body) observer.observe(document.body, { childList: true, subtree: true });
    else document.addEventListener('DOMContentLoaded', () =>
        observer.observe(document.body, { childList: true, subtree: true }), { once: true });
})();
