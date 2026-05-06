Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_browser = require('../../../../utils/browser.js');
const require_raf = require('../../../../utils/raf.js');
const require_defaults = require('../defaults.js');

//#region ../../packages/components/virtual-list/src/hooks/use-wheel.ts
const useWheel = ({ atEndEdge, atStartEdge, layout }, onWheelDelta) => {
	let frameHandle;
	let offset = 0;
	const hasReachedEdge = (offset) => {
		return offset < 0 && atStartEdge.value || offset > 0 && atEndEdge.value;
	};
	const onWheel = (e) => {
		require_raf.cAF(frameHandle);
		let { deltaX, deltaY } = e;
		if (e.shiftKey && deltaY !== 0) {
			deltaX = deltaY;
			deltaY = 0;
		}
		const newOffset = layout.value === require_defaults.HORIZONTAL ? deltaX : deltaY;
		if (hasReachedEdge(newOffset)) return;
		offset += newOffset;
		if (!require_browser.isFirefox() && newOffset !== 0) e.preventDefault();
		frameHandle = require_raf.rAF(() => {
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
exports.default = useWheel;
//# sourceMappingURL=use-wheel.js.map