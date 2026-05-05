import { isString } from "../../../../utils/types.mjs";
import { computed, ref, watch } from "vue";

//#region ../../packages/components/splitter/src/hooks/useSize.ts
function getPct(str) {
	return Number(str.slice(0, -1)) / 100;
}
function getPx(str) {
	return Number(str.slice(0, -2));
}
function isPct(itemSize) {
	return isString(itemSize) && itemSize.endsWith("%");
}
function isPx(itemSize) {
	return isString(itemSize) && itemSize.endsWith("px");
}
function useSize(panels, containerSize) {
	const propSizes = computed(() => panels.value.map((i) => i.size));
	const panelCounts = computed(() => panels.value.length);
	const percentSizes = ref([]);
	watch([
		propSizes,
		panelCounts,
		containerSize
	], () => {
		let ptgList = [];
		let emptyCount = 0;
		for (let i = 0; i < panelCounts.value; i += 1) {
			const itemSize = panels.value[i]?.size;
			if (isPct(itemSize)) ptgList[i] = getPct(itemSize);
			else if (isPx(itemSize)) ptgList[i] = getPx(itemSize) / containerSize.value;
			else if (itemSize || itemSize === 0) {
				const num = Number(itemSize);
				if (!Number.isNaN(num)) ptgList[i] = num / containerSize.value;
			} else {
				emptyCount += 1;
				ptgList[i] = void 0;
			}
		}
		const totalPtg = ptgList.reduce((acc, ptg) => acc + (ptg || 0), 0);
		if (totalPtg > 1 || !emptyCount) {
			const scale = 1 / totalPtg;
			ptgList = ptgList.map((ptg) => ptg === void 0 ? 0 : ptg * scale);
		} else {
			const avgRest = (1 - totalPtg) / emptyCount;
			ptgList = ptgList.map((ptg) => ptg === void 0 ? avgRest : ptg);
		}
		percentSizes.value = ptgList;
	});
	const ptg2px = (ptg) => ptg * containerSize.value;
	return {
		percentSizes,
		pxSizes: computed(() => percentSizes.value.map(ptg2px))
	};
}

//#endregion
export { getPct, getPx, isPct, isPx, useSize };
//# sourceMappingURL=useSize.mjs.map