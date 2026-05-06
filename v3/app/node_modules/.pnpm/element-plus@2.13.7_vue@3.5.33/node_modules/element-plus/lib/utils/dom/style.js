Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('./aria.js');
const require_types = require('../types.js');
const require_objects = require('../objects.js');
const require_error = require('../error.js');
let _vueuse_core = require("@vueuse/core");
let _vue_shared = require("@vue/shared");

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
	if (!_vueuse_core.isClient || !element || !styleName || require_aria.isShadowRoot(element)) return "";
	let key = (0, _vue_shared.camelize)(styleName);
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
	if ((0, _vue_shared.isObject)(styleName)) require_objects.entriesOf(styleName).forEach(([prop, value]) => setStyle(element, prop, value));
	else {
		const key = (0, _vue_shared.camelize)(styleName);
		element.style[key] = value;
	}
};
const removeStyle = (element, style) => {
	if (!element || !style) return;
	if ((0, _vue_shared.isObject)(style)) require_objects.keysOf(style).forEach((prop) => removeStyle(element, prop));
	else setStyle(element, style, "");
};
function addUnit(value, defaultUnit = "px") {
	if (!value && value !== 0) return "";
	if (require_types.isNumber(value) || require_types.isStringNumber(value)) return `${value}${defaultUnit}`;
	else if ((0, _vue_shared.isString)(value)) return value;
	require_error.debugWarn(SCOPE, "binding value must be a string or number");
}

//#endregion
exports.addClass = addClass;
exports.addUnit = addUnit;
exports.classNameToArray = classNameToArray;
exports.getStyle = getStyle;
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.removeStyle = removeStyle;
exports.setStyle = setStyle;
//# sourceMappingURL=style.js.map