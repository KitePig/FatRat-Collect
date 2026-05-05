Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/popper/src/composables/use-focus-trap.ts
const usePopperContentFocusTrap = (props, emit) => {
	const trapped = (0, vue.ref)(false);
	const focusStartRef = (0, vue.ref)();
	const onFocusAfterTrapped = () => {
		emit("focus");
	};
	const onFocusAfterReleased = (event) => {
		if (event.detail?.focusReason !== "pointer") {
			focusStartRef.value = "first";
			emit("blur");
		}
	};
	const onFocusInTrap = (event) => {
		if (props.visible && !trapped.value) {
			if (event.target) focusStartRef.value = event.target;
			trapped.value = true;
		}
	};
	const onFocusoutPrevented = (event) => {
		if (!props.trapping) {
			if (event.detail.focusReason === "pointer") event.preventDefault();
			trapped.value = false;
		}
	};
	const onReleaseRequested = () => {
		trapped.value = false;
		emit("close");
	};
	(0, vue.onBeforeUnmount)(() => {
		focusStartRef.value = void 0;
	});
	return {
		focusStartRef,
		trapped,
		onFocusAfterReleased,
		onFocusAfterTrapped,
		onFocusInTrap,
		onFocusoutPrevented,
		onReleaseRequested
	};
};

//#endregion
exports.usePopperContentFocusTrap = usePopperContentFocusTrap;
//# sourceMappingURL=use-focus-trap.js.map