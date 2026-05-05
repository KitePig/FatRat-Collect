Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_raf = require('../../../../utils/raf.js');

//#region ../../packages/components/virtual-list/src/hooks/use-grid-wheel.ts
const useGridWheel = ({ atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }, onWheelDelta) => {
	let frameHandle = null;
	let xOffset = 0;
	let yOffset = 0;
	const hasReachedEdge = (x, y) => {
		const xEdgeReached = x < 0 && atXStartEdge.value || x > 0 && atXEndEdge.value;
		const yEdgeReached = y < 0 && atYStartEdge.value || y > 0 && atYEndEdge.value;
		return xEdgeReached || yEdgeReached;
	};
	const onWheel = (e) => {
		require_raf.cAF(frameHandle);
		let x = e.deltaX;
		let y = e.deltaY;
		if (Math.abs(x) > Math.abs(y)) y = 0;
		else x = 0;
		if (e.shiftKey && y !== 0) {
			x = y;
			y = 0;
		}
		if (hasReachedEdge(x, y)) {
			if (e.deltaX !== 0 && x === 0) e.preventDefault();
			return;
		}
		xOffset += x;
		yOffset += y;
		e.preventDefault();
		frameHandle = require_raf.rAF(() => {
			onWheelDelta(xOffset, yOffset);
			xOffset = 0;
			yOffset = 0;
		});
	};
	return {
		hasReachedEdge,
		onWheel
	};
};

//#endregion
exports.useGridWheel = useGridWheel;
//# sourceMappingURL=use-grid-wheel.js.map