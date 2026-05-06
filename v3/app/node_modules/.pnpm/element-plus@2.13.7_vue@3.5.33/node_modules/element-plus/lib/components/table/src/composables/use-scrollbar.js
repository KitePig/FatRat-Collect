Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
let vue = require("vue");

//#region ../../packages/components/table/src/composables/use-scrollbar.ts
const useScrollbar = () => {
	const scrollBarRef = (0, vue.ref)();
	const scrollTo = (options, yCoord) => {
		const scrollbar = scrollBarRef.value;
		if (scrollbar) scrollbar.scrollTo(options, yCoord);
	};
	const setScrollPosition = (position, offset) => {
		const scrollbar = scrollBarRef.value;
		if (scrollbar && require_types.isNumber(offset) && ["Top", "Left"].includes(position)) scrollbar[`setScroll${position}`](offset);
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
exports.useScrollbar = useScrollbar;
//# sourceMappingURL=use-scrollbar.js.map