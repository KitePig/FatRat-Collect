Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../utils/dom/event.js');

//#region ../../packages/components/roving-focus-group/src/utils.ts
const MAP_KEY_TO_FOCUS_INTENT = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
const getDirectionAwareKey = (key, dir) => {
	if (dir !== "rtl") return key;
	switch (key) {
		case require_aria.EVENT_CODE.right: return require_aria.EVENT_CODE.left;
		case require_aria.EVENT_CODE.left: return require_aria.EVENT_CODE.right;
		default: return key;
	}
};
const getFocusIntent = (event, orientation, dir) => {
	const key = getDirectionAwareKey(require_event.getEventCode(event), dir);
	if (orientation === "vertical" && [require_aria.EVENT_CODE.left, require_aria.EVENT_CODE.right].includes(key)) return void 0;
	if (orientation === "horizontal" && [require_aria.EVENT_CODE.up, require_aria.EVENT_CODE.down].includes(key)) return void 0;
	return MAP_KEY_TO_FOCUS_INTENT[key];
};
const reorderArray = (array, atIdx) => {
	return array.map((_, idx) => array[(idx + atIdx) % array.length]);
};
const focusFirst = (elements) => {
	const { activeElement: prevActive } = document;
	for (const element of elements) {
		if (element === prevActive) return;
		element.focus();
		if (prevActive !== document.activeElement) return;
	}
};

//#endregion
exports.focusFirst = focusFirst;
exports.getFocusIntent = getFocusIntent;
exports.reorderArray = reorderArray;
//# sourceMappingURL=utils.js.map