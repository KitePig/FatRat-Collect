Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_defaults = require('./defaults.js');

//#region ../../packages/components/virtual-list/src/utils.ts
const getScrollDir = (prev, cur) => prev < cur ? require_defaults.FORWARD : require_defaults.BACKWARD;
const isHorizontal = (dir) => dir === require_defaults.LTR || dir === require_defaults.RTL || dir === require_defaults.HORIZONTAL;
const isRTL = (dir) => dir === require_defaults.RTL;
let cachedRTLResult = null;
function getRTLOffsetType(recalculate = false) {
	if (cachedRTLResult === null || recalculate) {
		const outerDiv = document.createElement("div");
		const outerStyle = outerDiv.style;
		outerStyle.width = "50px";
		outerStyle.height = "50px";
		outerStyle.overflow = "scroll";
		outerStyle.direction = "rtl";
		const innerDiv = document.createElement("div");
		const innerStyle = innerDiv.style;
		innerStyle.width = "100px";
		innerStyle.height = "100px";
		outerDiv.appendChild(innerDiv);
		document.body.appendChild(outerDiv);
		if (outerDiv.scrollLeft > 0) cachedRTLResult = require_defaults.RTL_OFFSET_POS_DESC;
		else {
			outerDiv.scrollLeft = 1;
			if (outerDiv.scrollLeft === 0) cachedRTLResult = require_defaults.RTL_OFFSET_NAG;
			else cachedRTLResult = require_defaults.RTL_OFFSET_POS_ASC;
		}
		document.body.removeChild(outerDiv);
		return cachedRTLResult;
	}
	return cachedRTLResult;
}
function renderThumbStyle({ move, size, bar }, layout) {
	const style = {};
	const translate = `translate${bar.axis}(${move}px)`;
	style[bar.size] = size;
	style.transform = translate;
	if (layout === "horizontal") style.height = "100%";
	else style.width = "100%";
	return style;
}

//#endregion
exports.getRTLOffsetType = getRTLOffsetType;
exports.getScrollDir = getScrollDir;
exports.isHorizontal = isHorizontal;
exports.isRTL = isRTL;
exports.renderThumbStyle = renderThumbStyle;
//# sourceMappingURL=utils.js.map