import { onBeforeUnmount, ref } from "vue";

//#region ../../packages/components/popper/src/composables/use-focus-trap.ts
const usePopperContentFocusTrap = (props, emit) => {
	const trapped = ref(false);
	const focusStartRef = ref();
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
	onBeforeUnmount(() => {
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
export { usePopperContentFocusTrap };
//# sourceMappingURL=use-focus-trap.mjs.map