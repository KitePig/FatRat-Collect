import { isNumber } from "../../../../utils/types.mjs";
import { ref } from "vue";

//#region ../../packages/components/table/src/composables/use-scrollbar.ts
const useScrollbar = () => {
	const scrollBarRef = ref();
	const scrollTo = (options, yCoord) => {
		const scrollbar = scrollBarRef.value;
		if (scrollbar) scrollbar.scrollTo(options, yCoord);
	};
	const setScrollPosition = (position, offset) => {
		const scrollbar = scrollBarRef.value;
		if (scrollbar && isNumber(offset) && ["Top", "Left"].includes(position)) scrollbar[`setScroll${position}`](offset);
	};
	const setScrollTop = (top) => setScrollPosition("Top", top);
	const setScrollLeft = (left) => setScrollPosition("Left", left);
	return {
		scrollBarRef,
		scrollTo,
		setScrollTop,
		setScrollLeft
	};
};

//#endregion
export { useScrollbar };
//# sourceMappingURL=use-scrollbar.mjs.map