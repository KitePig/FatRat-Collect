Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_aria = require('../../constants/aria.js');
const require_browser = require('../browser.js');

//#region ../../packages/utils/dom/event.ts
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
	const handleEvent = (event) => {
		const shouldPrevent = theirsHandler?.(event);
		if (checkForDefaultPrevented === false || !shouldPrevent) return oursHandler?.(event);
	};
	return handleEvent;
};
const whenMouse = (handler) => {
	return (e) => e.pointerType === "mouse" ? handler(e) : void 0;
};
const getEventCode = (event) => {
	if (event.code && event.code !== "Unidentified") return event.code;
	const key = getEventKey(event);
	if (key) {
		if (Object.values(require_aria.EVENT_CODE).includes(key)) return key;
		switch (key) {
			case " ": return require_aria.EVENT_CODE.space;
			default: return "";
		}
	}
	return "";
};
const getEventKey = (event) => {
	let key = event.key && event.key !== "Unidentified" ? event.key : "";
	if (!key && event.type === "keyup" && require_browser.isAndroid()) {
		const target = event.target;
		key = target.value.charAt(target.selectionStart - 1);
	}
	return key;
};

//#endregion
exports.composeEventHandlers = composeEventHandlers;
exports.getEventCode = getEventCode;
exports.getEventKey = getEventKey;
exports.whenMouse = whenMouse;
//# sourceMappingURL=event.js.map