Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/utils.ts
const sumReducer = (sum, num) => sum + num;
const sum = (listLike) => {
	return (0, _vue_shared.isArray)(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
};
const tryCall = (fLike, params, defaultRet = {}) => {
	return (0, _vue_shared.isFunction)(fLike) ? fLike(params) : fLike ?? defaultRet;
};
const enforceUnit = (style) => {
	[
		"width",
		"maxWidth",
		"minWidth",
		"height"
	].forEach((key) => {
		style[key] = require_style.addUnit(style[key]);
	});
	return style;
};
const componentToSlot = (ComponentLike) => (0, vue.isVNode)(ComponentLike) ? (props) => (0, vue.h)(ComponentLike, props) : ComponentLike;

//#endregion
exports.componentToSlot = componentToSlot;
exports.enforceUnit = enforceUnit;
exports.sum = sum;
exports.tryCall = tryCall;
//# sourceMappingURL=utils.js.map