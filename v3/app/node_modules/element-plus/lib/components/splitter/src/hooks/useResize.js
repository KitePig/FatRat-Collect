Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_useSize = require('./useSize.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/splitter/src/hooks/useResize.ts
function useResize(panels, containerSize, pxSizes, lazy) {
	const ptg2px = (ptg) => ptg * containerSize.value || 0;
	function getLimitSize(str, defaultLimit) {
		if (require_useSize.isPct(str)) return ptg2px(require_useSize.getPct(str));
		else if (require_useSize.isPx(str)) return require_useSize.getPx(str);
		return str ?? defaultLimit;
	}
	const lazyOffset = (0, vue.ref)(0);
	const movingIndex = (0, vue.ref)(null);
	let cachePxSizes = [];
	let updatePanelSizes = _vue_shared.NOOP;
	const limitSizes = (0, vue.computed)(() => panels.value.map((item) => [item.min, item.max]));
	(0, vue.watch)(lazy, () => {
		if (lazyOffset.value) {
			const mouseup = new MouseEvent("mouseup", { bubbles: true });
			window.dispatchEvent(mouseup);
		}
	});
	const onMoveStart = (index) => {
		lazyOffset.value = 0;
		movingIndex.value = {
			index,
			confirmed: false
		};
		cachePxSizes = pxSizes.value;
	};
	const onMoving = (index, offset) => {
		let confirmedIndex = null;
		if ((!movingIndex.value || !movingIndex.value.confirmed) && offset !== 0) {
			if (offset > 0) {
				confirmedIndex = index;
				movingIndex.value = {
					index,
					confirmed: true
				};
			} else for (let i = index; i >= 0; i -= 1) if (cachePxSizes[i] > 0) {
				confirmedIndex = i;
				movingIndex.value = {
					index: i,
					confirmed: true
				};
				break;
			}
		}
		const mergedIndex = confirmedIndex ?? movingIndex.value?.index ?? index;
		const numSizes = [...cachePxSizes];
		const nextIndex = mergedIndex + 1;
		const startMinSize = getLimitSize(limitSizes.value[mergedIndex][0], 0);
		const endMinSize = getLimitSize(limitSizes.value[nextIndex][0], 0);
		const startMaxSize = getLimitSize(limitSizes.value[mergedIndex][1], containerSize.value || 0);
		const endMaxSize = getLimitSize(limitSizes.value[nextIndex][1], containerSize.value || 0);
		let mergedOffset = offset;
		if (numSizes[mergedIndex] + mergedOffset < startMinSize) mergedOffset = startMinSize - numSizes[mergedIndex];
		if (numSizes[nextIndex] - mergedOffset < endMinSize) mergedOffset = numSizes[nextIndex] - endMinSize;
		if (numSizes[mergedIndex] + mergedOffset > startMaxSize) mergedOffset = startMaxSize - numSizes[mergedIndex];
		if (numSizes[nextIndex] - mergedOffset > endMaxSize) mergedOffset = numSizes[nextIndex] - endMaxSize;
		numSizes[mergedIndex] += mergedOffset;
		numSizes[nextIndex] -= mergedOffset;
		lazyOffset.value = mergedOffset;
		updatePanelSizes = () => {
			panels.value.forEach((panel, index) => {
				panel.size = numSizes[index];
			});
			updatePanelSizes = _vue_shared.NOOP;
		};
		if (!lazy.value) updatePanelSizes();
	};
	const onMoveEnd = () => {
		if (lazy.value) updatePanelSizes();
		lazyOffset.value = 0;
		movingIndex.value = null;
		cachePxSizes = [];
	};
	const cacheCollapsedSize = [];
	const onCollapse = (index, type) => {
		if (!cacheCollapsedSize.length) cacheCollapsedSize.push(...pxSizes.value);
		const currentSizes = pxSizes.value;
		const currentIndex = type === "start" ? index : index + 1;
		const targetIndex = type === "start" ? index + 1 : index;
		const currentSize = currentSizes[currentIndex];
		const targetSize = currentSizes[targetIndex];
		if (currentSize !== 0 && targetSize !== 0) {
			currentSizes[currentIndex] = 0;
			currentSizes[targetIndex] += currentSize;
			cacheCollapsedSize[index] = currentSize;
		} else {
			const totalSize = currentSize + targetSize;
			const targetCacheCollapsedSize = cacheCollapsedSize[index];
			const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;
			currentSizes[targetIndex] = targetCacheCollapsedSize;
			currentSizes[currentIndex] = currentCacheCollapsedSize;
		}
		panels.value.forEach((panel, index) => {
			panel.size = currentSizes[index];
		});
	};
	return {
		lazyOffset,
		onMoveStart,
		onMoving,
		onMoveEnd,
		movingIndex,
		onCollapse
	};
}

//#endregion
exports.useResize = useResize;
//# sourceMappingURL=useResize.js.map