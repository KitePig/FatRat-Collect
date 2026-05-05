Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../constants/aria.js');
const require_aria$1 = require('../../utils/dom/aria.js');
const require_event = require('../../utils/dom/event.js');
let vue = require("vue");

//#region ../../packages/directives/trap-focus/index.ts
const FOCUSABLE_CHILDREN = "_trap-focus-children";
const TRAP_FOCUS_HANDLER = "_trap-focus-handler";
const FOCUS_STACK = [];
const FOCUS_HANDLER = (e) => {
	if (FOCUS_STACK.length === 0) return;
	const code = require_event.getEventCode(e);
	const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
	if (focusableElement.length > 0 && code === require_aria.EVENT_CODE.tab) {
		if (focusableElement.length === 1) {
			e.preventDefault();
			if (document.activeElement !== focusableElement[0]) focusableElement[0].focus();
			return;
		}
		const goingBackward = e.shiftKey;
		const isFirst = e.target === focusableElement[0];
		const isLast = e.target === focusableElement[focusableElement.length - 1];
		if (isFirst && goingBackward) {
			e.preventDefault();
			focusableElement[focusableElement.length - 1].focus();
		}
		if (isLast && !goingBackward) {
			e.preventDefault();
			focusableElement[0].focus();
		}
		if (process.env.NODE_ENV === "test") {
			const index = focusableElement.indexOf(e.target);
			if (index !== -1) focusableElement[goingBackward ? index - 1 : index + 1]?.focus();
		}
	}
};
const TrapFocus = {
	beforeMount(el) {
		el[FOCUSABLE_CHILDREN] = require_aria$1.obtainAllFocusableElements(el);
		FOCUS_STACK.push(el);
		if (FOCUS_STACK.length <= 1) document.addEventListener("keydown", FOCUS_HANDLER);
	},
	updated(el) {
		(0, vue.nextTick)(() => {
			el[FOCUSABLE_CHILDREN] = require_aria$1.obtainAllFocusableElements(el);
		});
	},
	unmounted() {
		FOCUS_STACK.shift();
		if (FOCUS_STACK.length === 0) document.removeEventListener("keydown", FOCUS_HANDLER);
	}
};

//#endregion
exports.FOCUSABLE_CHILDREN = FOCUSABLE_CHILDREN;
exports.TRAP_FOCUS_HANDLER = TRAP_FOCUS_HANDLER;
exports.default = TrapFocus;
//# sourceMappingURL=index.js.map