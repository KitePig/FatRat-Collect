Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('./aria.js');
const require_easings = require('../easings.js');
const require_types = require('../types.js');
const require_raf = require('../raf.js');
const require_style = require('./style.js');
let _vueuse_core = require("@vueuse/core");
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/dom/scroll.ts
const isScroll = (el, isVertical) => {
	if (!_vueuse_core.isClient) return false;
	const key = {
		undefined: "overflow",
		true: "overflow-y",
		false: "overflow-x"
	}[String(isVertical)];
	const overflow = require_style.getStyle(el, key);
	return [
		"scroll",
		"auto",
		"overlay"
	].some((s) => overflow.includes(s));
};
const getScrollContainer = (el, isVertical) => {
	if (!_vueuse_core.isClient) return;
	let parent = el;
	while (parent) {
		if ([
			window,
			document,
			document.documentElement
		].includes(parent)) return window;
		if (isScroll(parent, isVertical)) return parent;
		if (require_aria.isShadowRoot(parent)) parent = parent.host;
		else parent = parent.parentNode;
	}
	return parent;
};
let scrollBarWidth;
const getScrollBarWidth = (namespace) => {
	if (!_vueuse_core.isClient) return 0;
	if (scrollBarWidth !== void 0) return scrollBarWidth;
	const outer = document.createElement("div");
	outer.className = `${namespace}-scrollbar__wrap`;
	outer.style.visibility = "hidden";
	outer.style.width = "100px";
	outer.style.position = "absolute";
	outer.style.top = "-9999px";
	document.body.appendChild(outer);
	const widthNoScroll = outer.offsetWidth;
	outer.style.overflow = "scroll";
	const inner = document.createElement("div");
	inner.style.width = "100%";
	outer.appendChild(inner);
	const widthWithScroll = inner.offsetWidth;
	outer.parentNode?.removeChild(outer);
	scrollBarWidth = widthNoScroll - widthWithScroll;
	return scrollBarWidth;
};
/**
* Scroll with in the container element, positioning the **selected** element at the top
* of the container
*/
function scrollIntoView(container, selected) {
	if (!_vueuse_core.isClient) return;
	if (!selected) {
		container.scrollTop = 0;
		return;
	}
	const offsetParents = [];
	let pointer = selected.offsetParent;
	while (pointer !== null && container !== pointer && container.contains(pointer)) {
		offsetParents.push(pointer);
		pointer = pointer.offsetParent;
	}
	const top = selected.offsetTop + offsetParents.reduce((prev, curr) => prev + curr.offsetTop, 0);
	const bottom = top + selected.offsetHeight;
	const viewRectTop = container.scrollTop;
	const viewRectBottom = viewRectTop + container.clientHeight;
	if (top < viewRectTop) container.scrollTop = top;
	else if (bottom > viewRectBottom) container.scrollTop = bottom - container.clientHeight;
}
function animateScrollTo(container, from, to, duration, callback) {
	const startTime = Date.now();
	let handle;
	const scroll = () => {
		const time = Date.now() - startTime;
		const nextScrollTop = require_easings.easeInOutCubic(time > duration ? duration : time, from, to, duration);
		if (require_types.isWindow(container)) container.scrollTo(window.pageXOffset, nextScrollTop);
		else container.scrollTop = nextScrollTop;
		if (time < duration) handle = require_raf.rAF(scroll);
		else if ((0, _vue_shared.isFunction)(callback)) callback();
	};
	scroll();
	return () => {
		handle && require_raf.cAF(handle);
	};
}
const getScrollElement = (target, container) => {
	if (require_types.isWindow(container)) return target.ownerDocument.documentElement;
	return container;
};
const getScrollTop = (container) => {
	if (require_types.isWindow(container)) return window.scrollY;
	return container.scrollTop;
};

//#endregion
exports.animateScrollTo = animateScrollTo;
exports.getScrollBarWidth = getScrollBarWidth;
exports.getScrollContainer = getScrollContainer;
exports.getScrollElement = getScrollElement;
exports.getScrollTop = getScrollTop;
exports.isScroll = isScroll;
exports.scrollIntoView = scrollIntoView;
//# sourceMappingURL=scroll.js.map