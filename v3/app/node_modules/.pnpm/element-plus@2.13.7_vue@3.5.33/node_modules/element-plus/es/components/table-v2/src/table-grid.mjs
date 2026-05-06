import { isNumber, isObject } from "../../../utils/types.mjs";
import FixedSizeGrid from "../../virtual-list/src/components/fixed-size-grid.mjs";
import DynamicSizeGrid from "../../virtual-list/src/components/dynamic-size-grid.mjs";
import { sum } from "./utils.mjs";
import { TABLE_V2_GRID_INJECTION_KEY, TableV2InjectionKey } from "./tokens.mjs";
import { tableV2GridProps } from "./grid.mjs";
import TableV2Header from "./components/header.mjs";
import { computed, createVNode, defineComponent, inject, nextTick, onActivated, provide, ref, unref, watch } from "vue";

//#region ../../packages/components/table-v2/src/table-grid.tsx
const COMPONENT_NAME = "ElTableV2Grid";
const useTableGrid = (props) => {
	const headerRef = ref();
	const bodyRef = ref();
	const scrollLeft = ref(0);
	const totalHeight = computed(() => {
		const { data, rowHeight, estimatedRowHeight } = props;
		if (estimatedRowHeight) return;
		return data.length * rowHeight;
	});
	const fixedRowHeight = computed(() => {
		const { fixedData, rowHeight } = props;
		return (fixedData?.length || 0) * rowHeight;
	});
	const headerHeight = computed(() => sum(props.headerHeight));
	const gridHeight = computed(() => {
		const { height } = props;
		return Math.max(0, height - unref(headerHeight) - unref(fixedRowHeight));
	});
	const hasHeader = computed(() => {
		return unref(headerHeight) + unref(fixedRowHeight) > 0;
	});
	const itemKey = ({ data, rowIndex }) => data[rowIndex][props.rowKey];
	function onItemRendered({ rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd }) {
		props.onRowsRendered?.({
			rowCacheStart,
			rowCacheEnd,
			rowVisibleStart,
			rowVisibleEnd
		});
	}
	function resetAfterRowIndex(index, forceUpdate) {
		bodyRef.value?.resetAfterRowIndex(index, forceUpdate);
	}
	function scrollTo(leftOrOptions, top) {
		const header$ = unref(headerRef);
		const body$ = unref(bodyRef);
		if (isObject(leftOrOptions)) {
			header$?.scrollToLeft(leftOrOptions.scrollLeft);
			scrollLeft.value = leftOrOptions.scrollLeft;
			body$?.scrollTo(leftOrOptions);
		} else {
			header$?.scrollToLeft(leftOrOptions);
			scrollLeft.value = leftOrOptions;
			body$?.scrollTo({
				scrollLeft: leftOrOptions,
				scrollTop: top
			});
		}
	}
	function scrollToTop(scrollTop) {
		unref(bodyRef)?.scrollTo({ scrollTop });
	}
	function scrollToRow(row, strategy) {
		const body = unref(bodyRef);
		if (!body) return;
		const prevScrollLeft = scrollLeft.value;
		body.scrollToItem(row, 0, strategy);
		if (prevScrollLeft) scrollTo({ scrollLeft: prevScrollLeft });
	}
	function forceUpdate() {
		unref(bodyRef)?.$forceUpdate();
		unref(headerRef)?.$forceUpdate();
	}
	watch(() => props.bodyWidth, () => {
		if (isNumber(props.estimatedRowHeight)) bodyRef.value?.resetAfter({ columnIndex: 0 }, false);
	});
	return {
		bodyRef,
		forceUpdate,
		fixedRowHeight,
		gridHeight,
		hasHeader,
		headerHeight,
		headerRef,
		totalHeight,
		itemKey,
		onItemRendered,
		resetAfterRowIndex,
		scrollTo,
		scrollToTop,
		scrollToRow,
		scrollLeft
	};
};
const TableGrid = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	props: tableV2GridProps,
	setup(props, { slots, expose }) {
		const { ns } = inject(TableV2InjectionKey);
		const { bodyRef, fixedRowHeight, gridHeight, hasHeader, headerRef, headerHeight, totalHeight, forceUpdate, itemKey, onItemRendered, resetAfterRowIndex, scrollTo, scrollToTop, scrollToRow, scrollLeft } = useTableGrid(props);
		provide(TABLE_V2_GRID_INJECTION_KEY, scrollLeft);
		onActivated(async () => {
			await nextTick();
			const scrollTop = bodyRef.value?.states.scrollTop;
			scrollTop && scrollToTop(Math.round(scrollTop) + 1);
		});
		expose({
			forceUpdate,
			totalHeight,
			scrollTo,
			scrollToTop,
			scrollToRow,
			resetAfterRowIndex
		});
		const getColumnWidth = () => props.bodyWidth;
		return () => {
			const { cache, columns, data, fixedData, useIsScrolling, scrollbarAlwaysOn, scrollbarEndGap, scrollbarStartGap, style, rowHeight, bodyWidth, estimatedRowHeight, headerWidth, height, width, getRowHeight, onScroll } = props;
			const isDynamicRowEnabled = isNumber(estimatedRowHeight);
			const Grid = isDynamicRowEnabled ? DynamicSizeGrid : FixedSizeGrid;
			const _headerHeight = unref(headerHeight);
			return createVNode("div", {
				"role": "table",
				"class": [ns.e("table"), props.class],
				"style": style
			}, [createVNode(Grid, {
				"ref": bodyRef,
				"data": data,
				"useIsScrolling": useIsScrolling,
				"itemKey": itemKey,
				"columnCache": 0,
				"columnWidth": isDynamicRowEnabled ? getColumnWidth : bodyWidth,
				"totalColumn": 1,
				"totalRow": data.length,
				"rowCache": cache,
				"rowHeight": isDynamicRowEnabled ? getRowHeight : rowHeight,
				"width": width,
				"height": unref(gridHeight),
				"class": ns.e("body"),
				"role": "rowgroup",
				"scrollbarStartGap": scrollbarStartGap,
				"scrollbarEndGap": scrollbarEndGap,
				"scrollbarAlwaysOn": scrollbarAlwaysOn,
				"onScroll": onScroll,
				"onItemRendered": onItemRendered,
				"perfMode": false
			}, { default: (params) => {
				const rowData = data[params.rowIndex];
				return slots.row?.({
					...params,
					columns,
					rowData
				});
			} }), unref(hasHeader) && createVNode(TableV2Header, {
				"ref": headerRef,
				"class": ns.e("header-wrapper"),
				"columns": columns,
				"headerData": data,
				"headerHeight": props.headerHeight,
				"fixedHeaderData": fixedData,
				"rowWidth": headerWidth,
				"rowHeight": rowHeight,
				"width": width,
				"height": Math.min(_headerHeight + unref(fixedRowHeight), height)
			}, {
				dynamic: slots.header,
				fixed: slots.row
			})]);
		};
	}
});

//#endregion
export { TableGrid as default };
//# sourceMappingURL=table-grid.mjs.map