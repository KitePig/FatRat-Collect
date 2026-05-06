import { isShadowRoot } from "./aria.mjs";
import { isClient } from "../browser.mjs";
import { isNumber, isObject, isString, isStringNumber } from "../types.mjs";
import { camelize } from "../strings.mjs";
import { entriesOf, keysOf } from "../objects.mjs";
import { debugWarn } from "../error.mjs";

//#region ../../packages/utils/dom/style.ts
const SCOPE = "utils/dom/style";
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
	if (!el || !cls) return false;
	if (cls.includes(" ")) throw new Error("className should not contain space.");
	return el.classList.contains(cls);
};
const addClass = (el, cls) => {
	if (!el || !cls.trim()) return;
	el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
	if (!el || !cls.trim()) return;
	el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
	if (!isClient || !element || !styleName || isShadowRoot(element)) return "";
	let key = camelize(styleName);
	if (key === "float") key = "cssFloat";
	try {
		const style = element.style[key];
		if (style) return style;
		const computed = document.defaultView?.getComputedStyle(element, "");
		return computed ? computed[key] : "";
	} catch {
		return element.style[key];
	}
};
const setStyle = (element, styleName, value) => {
	if (!element || !styleName) return;
	if (isObject(styleName)) entriesOf(styleName).forEach(([prop, value]) => setStyle(element, prop, value));
	else {
		const key = camelize(styleName);
		element.style[key] = value;
	}
};
const removeStyle = (element, style) => {
	if (!element || !style) return;
	if (isObject(style)) keysOf(style).forEach((prop) => removeStyle(element, prop));
	else setStyle(element, style, "");
};
function addUnit(value, defaultUnit = "px") {
	if (!value && value !== 0) return "";
	if (isNumber(value) || isStringNumber(value)) return `${value}${defaultUnit}`;
	else if (isString(value)) return value;
	debugWarn(SCOPE, "binding value must be a string or number");
}

//#endregion
export { addClass, addUnit, classNameToArray, getStyle, hasClass, removeClass, removeStyle, setStyle };
//# sourceMappingURL=style.mjs.map