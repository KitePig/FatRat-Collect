Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../utils/dom/aria.js');
const require_types = require('../../utils/types.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/hooks/use-focus-controller/index.ts
function useFocusController(target, { disabled, beforeFocus, afterFocus, beforeBlur, afterBlur } = {}) {
	const { emit } = (0, vue.getCurrentInstance)();
	const wrapperRef = (0, vue.shallowRef)();
	const isFocused = (0, vue.ref)(false);
	const handleFocus = (event) => {
		const cancelFocus = (0, _vue_shared.isFunction)(beforeFocus) ? beforeFocus(event) : false;
		if ((0, vue.unref)(disabled) || isFocused.value || cancelFocus) return;
		isFocused.value = true;
		emit("focus", event);
		afterFocus?.();
	};
	const handleBlur = (event) => {
		const cancelBlur = (0, _vue_shared.isFunction)(beforeBlur) ? beforeBlur(event) : false;
		if ((0, vue.unref)(disabled) || event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget) || cancelBlur) return;
		isFocused.value = false;
		emit("blur", event);
		afterBlur?.();
	};
	const handleClick = (event) => {
		if ((0, vue.unref)(disabled) || require_aria.isFocusable(event.target) || wrapperRef.value?.contains(document.activeElement) && wrapperRef.value !== document.activeElement) return;
		target.value?.focus();
	};
	(0, vue.watch)([wrapperRef, () => (0, vue.unref)(disabled)], ([el, disabled]) => {
		if (!el) return;
		if (disabled) el.removeAttribute("tabindex");
		else el.setAttribute("tabindex", "-1");
	});
	(0, _vueuse_core.useEventListener)(wrapperRef, "focus", handleFocus, true);
	(0, _vueuse_core.useEventListener)(wrapperRef, "blur", handleBlur, true);
	(0, _vueuse_core.useEventListener)(wrapperRef, "click", handleClick, true);
	if (process.env.NODE_ENV === "test") (0, vue.onMounted)(() => {
		const targetEl = require_types.isElement(target.value) ? target.value : document.querySelector("input,textarea");
		if (targetEl) {
			(0, _vueuse_core.useEventListener)(targetEl, "focus", handleFocus, true);
			(0, _vueuse_core.useEventListener)(targetEl, "blur", handleBlur, true);
		}
	});
	return {
		isFocused,
		wrapperRef,
		handleFocus,
		handleBlur
	};
}

//#endregion
exports.useFocusController = useFocusController;
//# sourceMappingURL=index.js.map