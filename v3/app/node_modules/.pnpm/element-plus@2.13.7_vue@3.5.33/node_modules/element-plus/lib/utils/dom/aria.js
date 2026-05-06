Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/utils/dom/aria.ts
const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
const isShadowRoot = (e) => {
	if (typeof ShadowRoot === "undefined") return false;
	return e instanceof ShadowRoot;
};
const isHTMLElement = (e) => {
	if (typeof Element === "undefined") return false;
	return e instanceof Element;
};
/**
* Determine if the testing element is visible on screen no matter if its on the viewport or not
*/
const isVisible = (element) => {
	if (process.env.NODE_ENV === "test") return true;
	return getComputedStyle(element).position === "fixed" ? false : element.offsetParent !== null;
};
const obtainAllFocusableElements = (element) => {
	return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter((item) => isFocusable(item) && isVisible(item));
};
/**
* @desc Determine if target element is focusable
* @param element {HTMLElement}
* @returns {Boolean} true if it is focusable
*/
const isFocusable = (element) => {
	if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) return true;
	if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") return false;
	switch (element.nodeName) {
		case "A": return !!element.href && element.rel !== "ignore";
		case "INPUT": return !(element.type === "hidden" || element.type === "file");
		case "BUTTON":
		case "SELECT":
		case "TEXTAREA": return true;
		default: return false;
	}
};
/**
* Trigger an event
* mouseenter, mouseleave, mouseover, keyup, change, click, etc.
* @param  {HTMLElement} elm
* @param  {String} name
* @param  {*} opts
*/
const triggerEvent = function(elm, name, ...opts) {
	let eventName;
	if (name.includes("mouse") || name.includes("click")) eventName = "MouseEvents";
	else if (name.includes("key")) eventName = "KeyboardEvent";
	else eventName = "HTMLEvents";
	const evt = document.createEvent(eventName);
	evt.initEvent(name, ...opts);
	elm.dispatchEvent(evt);
	return elm;
};
const isLeaf = (el) => !el.getAttribute("aria-owns");
const getSibling = (el, distance, elClass) => {
	const { parentNode } = el;
	if (!parentNode) return null;
	const siblings = parentNode.querySelectorAll(elClass);
	return siblings[Array.prototype.indexOf.call(siblings, el) + distance] || null;
};
const focusElement = (el, options) => {
	if (!el || !el.focus) return;
	let cleanup = false;
	if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
		el.setAttribute("tabindex", "-1");
		cleanup = true;
	}
	el.focus(options);
	if (isHTMLElement(el) && cleanup) el.removeAttribute("tabindex");
};
const focusNode = (el) => {
	if (!el) return;
	focusElement(el);
	!isLeaf(el) && el.click();
};

//#endregion
exports.focusElement = focusElement;
exports.focusNode = focusNode;
exports.getSibling = getSibling;
exports.isFocusable = isFocusable;
exports.isLeaf = isLeaf;
exports.isShadowRoot = isShadowRoot;
exports.isVisible = isVisible;
exports.obtainAllFocusableElements = obtainAllFocusableElements;
exports.triggerEvent = triggerEvent;
//# sourceMappingURL=aria.js.map