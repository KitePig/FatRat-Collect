import { EVENT_CODE } from "../../constants/aria.mjs";
import { obtainAllFocusableElements } from "../../utils/dom/aria.mjs";
import { getEventCode } from "../../utils/dom/event.mjs";
import { nextTick } from "vue";

//#region ../../packages/directives/trap-focus/index.ts
const FOCUSABLE_CHILDREN = "_trap-focus-children";
const TRAP_FOCUS_HANDLER = "_trap-focus-handler";
const FOCUS_STACK = [];
const FOCUS_HANDLER = (e) => {
	if (FOCUS_STACK.length === 0) return;
	const code = getEventCode(e);
	const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
	if (focusableElement.length > 0 && code === EVENT_CODE.tab) {
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
	}
};
const TrapFocus = {
	beforeMount(el) {
		el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(el);
		FOCUS_STACK.push(el);
		if (FOCUS_STACK.length <= 1) document.addEventListener("keydown", FOCUS_HANDLER);
	},
	updated(el) {
		nextTick(() => {
			el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements(el);
		});
	},
	unmounted() {
		FOCUS_STACK.shift();
		if (FOCUS_STACK.length === 0) document.removeEventListener("keydown", FOCUS_HANDLER);
	}
};

//#endregion
export { FOCUSABLE_CHILDREN, TRAP_FOCUS_HANDLER, TrapFocus as default };
//# sourceMappingURL=index.mjs.map