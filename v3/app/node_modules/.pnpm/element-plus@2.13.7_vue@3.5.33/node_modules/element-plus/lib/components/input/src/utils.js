Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_browser = require('../../../utils/browser.js');
const require_types = require('../../../utils/types.js');

//#region ../../packages/components/input/src/utils.ts
let hiddenTextarea = void 0;
const HIDDEN_STYLE = {
	height: "0",
	visibility: "hidden",
	overflow: require_browser.isFirefox() ? "" : "hidden",
	position: "absolute",
	"z-index": "-1000",
	top: "0",
	right: "0"
};
const CONTEXT_STYLE = [
	"letter-spacing",
	"line-height",
	"padding-top",
	"padding-bottom",
	"font-family",
	"font-weight",
	"font-size",
	"text-rendering",
	"text-transform",
	"width",
	"text-indent",
	"padding-left",
	"padding-right",
	"border-width",
	"box-sizing",
	"word-break"
];
const looseToNumber = (val) => {
	const n = Number.parseFloat(val);
	return Number.isNaN(n) ? val : n;
};
function calculateNodeStyling(targetElement) {
	const style = window.getComputedStyle(targetElement);
	const boxSizing = style.getPropertyValue("box-sizing");
	const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
	const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
	return {
		contextStyle: CONTEXT_STYLE.map((name) => [name, style.getPropertyValue(name)]),
		paddingSize,
		borderSize,
		boxSizing
	};
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
	if (!hiddenTextarea) {
		hiddenTextarea = document.createElement("textarea");
		let hostNode = document.body;
		if (!require_browser.isFirefox() && targetElement.parentNode) hostNode = targetElement.parentNode;
		hostNode.appendChild(hiddenTextarea);
	}
	const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
	contextStyle.forEach(([key, value]) => hiddenTextarea?.style.setProperty(key, value));
	Object.entries(HIDDEN_STYLE).forEach(([key, value]) => hiddenTextarea?.style.setProperty(key, value, "important"));
	hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
	let height = hiddenTextarea.scrollHeight;
	const result = {};
	if (boxSizing === "border-box") height = height + borderSize;
	else if (boxSizing === "content-box") height = height - paddingSize;
	hiddenTextarea.value = "";
	const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
	if (require_types.isNumber(minRows)) {
		let minHeight = singleRowHeight * minRows;
		if (boxSizing === "border-box") minHeight = minHeight + paddingSize + borderSize;
		height = Math.max(minHeight, height);
		result.minHeight = `${minHeight}px`;
	}
	if (require_types.isNumber(maxRows)) {
		let maxHeight = singleRowHeight * maxRows;
		if (boxSizing === "border-box") maxHeight = maxHeight + paddingSize + borderSize;
		height = Math.min(maxHeight, height);
	}
	result.height = `${height}px`;
	hiddenTextarea.parentNode?.removeChild(hiddenTextarea);
	hiddenTextarea = void 0;
	return result;
}

//#endregion
exports.calcTextareaHeight = calcTextareaHeight;
exports.looseToNumber = looseToNumber;
//# sourceMappingURL=utils.js.map