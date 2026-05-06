import { isFirefox } from "../../../../utils/browser.mjs";
import { cAF, rAF } from "../../../../utils/raf.mjs";
import { HORIZONTAL } from "../defaults.mjs";

//#region ../../packages/components/virtual-list/src/hooks/use-wheel.ts
const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
	let frameHandle;
	let offset = 0;
	const hasReachedEdge = (offset) => {
		return offset < 0 && atStartEdge.value || offset > 0 && atEndEdge.value;
	};
	const onWheel = (e) => {
		cAF(frameHandle);
		let { deltaX, deltaY } = e;
		if (e.shiftKey && deltaY !== 0) {
			deltaX = deltaY;
			deltaY = 0;
		}
		const newOffset = layout.value === HORIZONTAL ? deltaX : deltaY;
		if (hasReachedEdge(newOffset)) return;
		offset += newOffset;
		if (!isFirefox() && newOffset !== 0) e.preventDefault();
		frameHandle = rAF(() => {
			onWheelDelta(offset);
			offset = 0;
		});
	};
	return {
		hasReachedEdge,
		onWheel
	};
};

//#endregion
export { useWheel as default };
//# sourceMappingURL=use-wheel.mjs.map