import { ref, unref, watch } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-scrollbar.ts
const useScrollbar = (props, { mainTableRef, leftTableRef, rightTableRef, onMaybeEndReached }) => {
	const scrollPos = ref({
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
		doScroll(unref(scrollPos));
	}
	function scrollToLeft(scrollLeft) {
		scrollPos.value.scrollLeft = scrollLeft;
		mainTableRef.value?.scrollTo?.(unref(scrollPos));
	}
	function onScroll(params) {
		scrollTo(params);
		props.onScroll?.(params);
	}
	function onVerticalScroll({ scrollTop }) {
		const { scrollTop: currentScrollTop } = unref(scrollPos);
		if (scrollTop !== currentScrollTop) scrollToTop(scrollTop);
	}
	function scrollToRow(row, strategy = "auto") {
		mainTableRef.value?.scrollToRow(row, strategy);
	}
	watch(() => unref(scrollPos).scrollTop, (cur, prev) => {
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
export { useScrollbar };
//# sourceMappingURL=use-scrollbar.mjs.map