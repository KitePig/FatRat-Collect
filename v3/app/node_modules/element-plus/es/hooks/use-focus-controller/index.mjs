import { isFocusable } from "../../utils/dom/aria.mjs";
import { isFunction } from "../../utils/types.mjs";
import { useEventListener } from "@vueuse/core";
import { getCurrentInstance, onMounted, ref, shallowRef, unref, watch } from "vue";

//#region ../../packages/hooks/use-focus-controller/index.ts
function useFocusController(target, { disabled, beforeFocus, afterFocus, beforeBlur, afterBlur } = {}) {
	const { emit } = getCurrentInstance();
	const wrapperRef = shallowRef();
	const isFocused = ref(false);
	const handleFocus = (event) => {
		const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
		if (unref(disabled) || isFocused.value || cancelFocus) return;
		isFocused.value = true;
		emit("focus", event);
		afterFocus?.();
	};
	const handleBlur = (event) => {
		const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
		if (unref(disabled) || event.relatedTarget && wrapperRef.value?.contains(event.relatedTarget) || cancelBlur) return;
		isFocused.value = false;
		emit("blur", event);
		afterBlur?.();
	};
	const handleClick = (event) => {
		if (unref(disabled) || isFocusable(event.target) || wrapperRef.value?.contains(document.activeElement) && wrapperRef.value !== document.activeElement) return;
		target.value?.focus();
	};
	watch([wrapperRef, () => unref(disabled)], ([el, disabled]) => {
		if (!el) return;
		if (disabled) el.removeAttribute("tabindex");
		else el.setAttribute("tabindex", "-1");
	});
	useEventListener(wrapperRef, "focus", handleFocus, true);
	useEventListener(wrapperRef, "blur", handleBlur, true);
	useEventListener(wrapperRef, "click", handleClick, true);
	return {
		isFocused,
		wrapperRef,
		handleFocus,
		handleBlur
	};
}

//#endregion
export { useFocusController };
//# sourceMappingURL=index.mjs.map