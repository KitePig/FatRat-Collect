import { cAF, rAF } from "../../../../utils/raf.mjs";
import { useEventListener } from "@vueuse/core";
import { ref, unref } from "vue";

//#region ../../packages/components/virtual-list/src/hooks/use-grid-touch.ts
const useGridTouch = (windowRef, states, scrollTo, estimatedTotalWidth, estimatedTotalHeight, parsedWidth, parsedHeight) => {
	const touchStartX = ref(0);
	const touchStartY = ref(0);
	let frameHandle;
	let deltaX = 0;
	let deltaY = 0;
	const handleTouchStart = (event) => {
		cAF(frameHandle);
		touchStartX.value = event.touches[0].clientX;
		touchStartY.value = event.touches[0].clientY;
		deltaX = 0;
		deltaY = 0;
	};
	const handleTouchMove = (event) => {
		event.preventDefault();
		cAF(frameHandle);
		deltaX += touchStartX.value - event.touches[0].clientX;
		deltaY += touchStartY.value - event.touches[0].clientY;
		touchStartX.value = event.touches[0].clientX;
		touchStartY.value = event.touches[0].clientY;
		frameHandle = rAF(() => {
			const maxScrollLeft = estimatedTotalWidth.value - unref(parsedWidth);
			const maxScrollTop = estimatedTotalHeight.value - unref(parsedHeight);
			scrollTo({
				scrollLeft: Math.min(states.value.scrollLeft + deltaX, maxScrollLeft),
				scrollTop: Math.min(states.value.scrollTop + deltaY, maxScrollTop)
			});
			deltaX = 0;
			deltaY = 0;
		});
	};
	useEventListener(windowRef, "touchstart", handleTouchStart, { passive: true });
	useEventListener(windowRef, "touchmove", handleTouchMove, { passive: false });
	return {
		touchStartX,
		touchStartY,
		handleTouchStart,
		handleTouchMove
	};
};

//#endregion
export { useGridTouch };
//# sourceMappingURL=use-grid-touch.mjs.map