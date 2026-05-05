Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/composables/use-scrollbar.ts
const useScrollbar = (props, { mainTableRef, leftTableRef, rightTableRef, onMaybeEndReached }) => {
	const scrollPos = (0, vue.ref)({
		scrollLeft: 0,
		scrollTop: 0
	});
	function doScroll(params) {
		const { scrollTop } = params;
		mainTableRef.value?.scrollTo(params);
		leftTableRef.value?.scrollToTop(scrollTop);
		rightTableRef.value?.scrollToTop(scrollTop);
	}
	function scrollTo(params) {
		scrollPos.value = params;
		doScroll(params);
	}
	function scrollToTop(scrollTop) {
		scrollPos.value.scrollTop = scrollTop;
		doScroll((0, vue.unref)(scrollPos));
	}
	function scrollToLeft(scrollLeft) {
		scrollPos.value.scrollLeft = scrollLeft;
		mainTableRef.value?.scrollTo?.((0, vue.unref)(scrollPos));
	}
	function onScroll(params) {
		scrollTo(params);
		props.onScroll?.(params);
	}
	function onVerticalScroll({ scrollTop }) {
		const { scrollTop: currentScrollTop } = (0, vue.unref)(scrollPos);
		if (scrollTop !== currentScrollTop) scrollToTop(scrollTop);
	}
	function scrollToRow(row, strategy = "auto") {
		mainTableRef.value?.scrollToRow(row, strategy);
	}
	(0, vue.watch)(() => (0, vue.unref)(scrollPos).scrollTop, (cur, prev) => {
		if (cur > prev) onMaybeEndReached();
	});
	return {
		scrollPos,
		scrollTo,
		scrollToLeft,
		scrollToTop,
		scrollToRow,
		onScroll,
		onVerticalScroll
	};
};

//#endregion
exports.useScrollbar = useScrollbar;
//# sourceMappingURL=use-scrollbar.js.map