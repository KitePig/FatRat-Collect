import { isArray, isFunction } from "../../../utils/types.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { h, isVNode } from "vue";

//#region ../../packages/components/table-v2/src/utils.ts
const sumReducer = (sum, num) => sum + num;
const sum = (listLike) => {
	return isArray(listLike) ? listLike.reduce(sumReducer, 0) : listLike;
};
const tryCall = (fLike, params, defaultRet = {}) => {
	return isFunction(fLike) ? fLike(params) : fLike ?? defaultRet;
};
const enforceUnit = (style) => {
	[
		"width",
		"maxWidth",
		"minWidth",
		"height"
	].forEach((key) => {
		style[key] = addUnit(style[key]);
	});
	return style;
};
const componentToSlot = (ComponentLike) => isVNode(ComponentLike) ? (props) => h(ComponentLike, props) : ComponentLike;

//#endregion
export { componentToSlot, enforceUnit, sum, tryCall };
//# sourceMappingURL=utils.mjs.map