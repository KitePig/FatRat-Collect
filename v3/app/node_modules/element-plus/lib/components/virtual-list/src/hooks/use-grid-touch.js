Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_raf = require('../../../../utils/raf.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/virtual-list/src/hooks/use-grid-touch.ts
const useGridTouch = (windowRef, states, scrollTo, estimatedTotalWidth, estimatedTotalHeight, parsedWidth, parsedHeight) => {
	const touchStartX = (0, vue.ref)(0);
	const touchStartY = (0, vue.ref)(0);
	let frameHandle;
	let deltaX = 0;
	let deltaY = 0;
	const handleTouchStart = (event) => {
		require_raf.cAF(frameHandle);
		touchStartX.value = event.touches[0].clientX;
		touchStartY.value = event.touches[0].clientY;
		deltaX = 0;
		deltaY = 0;
	};
	const handleTouchMove = (event) => {
		event.preventDefault();
		require_raf.cAF(frameHandle);
		deltaX += touchStartX.value - event.touches[0].clientX;
		deltaY += touchStartY.value - event.touches[0].clientY;
		touchStartX.value = event.touches[0].clientX;
		touchStartY.value = event.touches[0].clientY;
		frameHandle = require_raf.rAF(() => {
			const maxScrollLeft = estimatedTotalWidth.value - (0, vue.unref)(parsedWidth);
			const maxScrollTop = estimatedTotalHeight.value - (0, vue.unref)(parsedHeight);
			scrollTo({
				scrollLeft: Math.min(states.value.scrollLeft + deltaX, maxScrollLeft),
				scrollTop: Math.min(states.value.scrollTop + deltaY, maxScrollTop)
			});
			deltaX = 0;
			deltaY = 0;
		});
	};
	(0, _vueuse_core.useEventListener)(windowRef, "touchstart", handleTouchStart, { passive: true });
	(0, _vueuse_core.useEventListener)(windowRef, "touchmove", handleTouchMove, { passive: false });
	return {
		touchStartX,
		touchStartY,
		handleTouchStart,
		handleTouchMove
	};
};

//#endregion
exports.useGridTouch = useGridTouch;
//# sourceMappingURL=use-grid-touch.js.map