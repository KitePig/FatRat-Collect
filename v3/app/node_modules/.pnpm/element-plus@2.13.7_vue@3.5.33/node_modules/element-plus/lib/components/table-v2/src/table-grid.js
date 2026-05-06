const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_fixed_size_grid = require('../../virtual-list/src/components/fixed-size-grid.js');
const require_dynamic_size_grid = require('../../virtual-list/src/components/dynamic-size-grid.js');
const require_utils = require('./utils.js');
const require_tokens = require('./tokens.js');
const require_grid = require('./grid.js');
const require_header = require('./components/header.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/table-grid.tsx
const COMPONENT_NAME = "ElTableV2Grid";
const useTableGrid = (props) => {
	const headerRef = (0, vue.ref)();
	const bodyRef = (0, vue.ref)();
	const scrollLeft = (0, vue.ref)(0);
	const totalHeight = (0, vue.computed)(() => {
		const { data, rowHeight, estimatedRowHeight } = props;
		if (estimatedRowHeight) return;
		return data.length * rowHeight;
	});
	const fixedRowHeight = (0, vue.computed)(() => {
		const { fixedData, rowHeight } = props;
		return (fixedData?.length || 0) * rowHeight;
	});
	const headerHeight = (0, vue.computed)(() => require_utils.sum(props.headerHeight));
	const gridHeight = (0, vue.computed)(() => {
		const { height } = props;
		return Math.max(0, height - (0, vue.unref)(headerHeight) - (0, vue.unref)(fixedRowHeight));
	});
	const hasHeader = (0, vue.computed)(() => {
		return (0, vue.unref)(headerHeight) + (0, vue.unref)(fixedRowHeight) > 0;
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
		const header$ = (0, vue.unref)(headerRef);
		const body$ = (0, vue.unref)(bodyRef);
		if ((0, _vue_shared.isObject)(leftOrOptions)) {
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
		(0, vue.unref)(bodyRef)?.scrollTo({ scrollTop });
	}
	function scrollToRow(row, strategy) {
		const body = (0, vue.unref)(bodyRef);
		if (!body) return;
		const prevScrollLeft = scrollLeft.value;
		body.scrollToItem(row, 0, strategy);
		if (prevScrollLeft) scrollTo({ scrollLeft: prevScrollLeft });
	}
	function forceUpdate() {
		(0, vue.unref)(bodyRef)?.$forceUpdate();
		(0, vue.unref)(headerRef)?.$forceUpdate();
	}
	(0, vue.watch)(() => props.bodyWidth, () => {
		if (require_types.isNumber(props.estimatedRowHeight)) bodyRef.value?.resetAfter({ columnIndex: 0 }, false);
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
const TableGrid = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	props: require_grid.tableV2GridProps,
	setup(props, { slots, expose }) {
		const { ns } = (0, vue.inject)(require_tokens.TableV2InjectionKey);
		const { bodyRef, fixedRowHeight, gridHeight, hasHeader, headerRef, headerHeight, totalHeight, forceUpdate, itemKey, onItemRendered, resetAfterRowIndex, scrollTo, scrollToTop, scrollToRow, scrollLeft } = useTableGrid(props);
		(0, vue.provide)(require_tokens.TABLE_V2_GRID_INJECTION_KEY, scrollLeft);
		(0, vue.onActivated)(async () => {
			await (0, vue.nextTick)();
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
			const isDynamicRowEnabled = require_types.isNumber(estimatedRowHeight);
			const Grid = isDynamicRowEnabled ? require_dynamic_size_grid.default : require_fixed_size_grid.default;
			const _headerHeight = (0, vue.unref)(headerHeight);
			return (0, vue.createVNode)("div", {
				"role": "table",
				"class": [ns.e("table"), props.class],
				"style": style
			}, [(0, vue.createVNode)(Grid, {
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
				"height": (0, vue.unref)(gridHeight),
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
			} }), (0, vue.unref)(hasHeader) && (0, vue.createVNode)(require_header.default, {
				"ref": headerRef,
				"class": ns.e("header-wrapper"),
				"columns": columns,
				"headerData": data,
				"headerHeight": props.headerHeight,
				"fixedHeaderData": fixedData,
				"rowWidth": headerWidth,
				"rowHeight": rowHeight,
				"width": width,
				"height": Math.min(_headerHeight + (0, vue.unref)(fixedRowHeight), height)
			}, {
				dynamic: slots.header,
				fixed: slots.row
			})]);
		};
	}
});

//#endregion
exports.default = TableGrid;
//# sourceMappingURL=table-grid.js.map