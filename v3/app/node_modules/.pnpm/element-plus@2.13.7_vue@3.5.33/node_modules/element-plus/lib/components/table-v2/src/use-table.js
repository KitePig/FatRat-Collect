Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_columns = require('./composables/use-columns.js');
const require_use_scrollbar = require('./composables/use-scrollbar.js');
const require_use_row = require('./composables/use-row.js');
const require_use_data = require('./composables/use-data.js');
const require_use_styles = require('./composables/use-styles.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table-v2/src/use-table.ts
function useTable(props) {
	const mainTableRef = (0, vue.ref)();
	const leftTableRef = (0, vue.ref)();
	const rightTableRef = (0, vue.ref)();
	const { columns, columnsStyles, columnsTotalWidth, fixedColumnsOnLeft, fixedColumnsOnRight, hasFixedColumns, mainColumns, onColumnSorted } = require_use_columns.useColumns(props, (0, vue.toRef)(props, "columns"), (0, vue.toRef)(props, "fixed"));
	const { scrollTo, scrollToLeft, scrollToTop, scrollToRow, onScroll, onVerticalScroll, scrollPos } = require_use_scrollbar.useScrollbar(props, {
		mainTableRef,
		leftTableRef,
		rightTableRef,
		onMaybeEndReached
	});
	const ns = require_index.useNamespace("table-v2");
	const instance = (0, vue.getCurrentInstance)();
	const isScrolling = (0, vue.shallowRef)(false);
	const { expandedRowKeys, lastRenderedRowIndex, isDynamic, isResetting, rowHeights, resetAfterIndex, onRowExpanded, onRowHeightChange, onRowHovered, onRowsRendered } = require_use_row.useRow(props, {
		mainTableRef,
		leftTableRef,
		rightTableRef,
		tableInstance: instance,
		ns,
		isScrolling
	});
	const { data, depthMap } = require_use_data.useData(props, {
		expandedRowKeys,
		lastRenderedRowIndex,
		resetAfterIndex
	});
	const rowsHeight = (0, vue.computed)(() => {
		const { estimatedRowHeight, rowHeight } = props;
		const _data = (0, vue.unref)(data);
		if (require_types.isNumber(estimatedRowHeight)) return Object.values((0, vue.unref)(rowHeights)).reduce((acc, curr) => acc + curr, 0);
		return _data.length * rowHeight;
	});
	const { bodyWidth, fixedTableHeight, mainTableHeight, leftTableWidth, rightTableWidth, windowHeight, footerHeight, emptyStyle, rootStyle, headerHeight } = require_use_styles.useStyles(props, {
		columnsTotalWidth,
		fixedColumnsOnLeft,
		fixedColumnsOnRight,
		rowsHeight
	});
	const containerRef = (0, vue.ref)();
	const showEmpty = (0, vue.computed)(() => {
		const noData = (0, vue.unref)(data).length === 0;
		return (0, _vue_shared.isArray)(props.fixedData) ? props.fixedData.length === 0 && noData : noData;
	});
	function getRowHeight(rowIndex) {
		const { estimatedRowHeight, rowHeight, rowKey } = props;
		if (!estimatedRowHeight) return rowHeight;
		return (0, vue.unref)(rowHeights)[(0, vue.unref)(data)[rowIndex][rowKey]] || estimatedRowHeight;
	}
	const isEndReached = (0, vue.ref)(false);
	function onMaybeEndReached() {
		const { onEndReached } = props;
		if (!onEndReached) return;
		const { scrollTop } = (0, vue.unref)(scrollPos);
		const _totalHeight = (0, vue.unref)(rowsHeight);
		const remainDistance = _totalHeight - (scrollTop + (0, vue.unref)(windowHeight)) + props.hScrollbarSize;
		if (!isEndReached.value && (0, vue.unref)(lastRenderedRowIndex) >= 0 && _totalHeight <= scrollTop + (0, vue.unref)(mainTableHeight) - (0, vue.unref)(headerHeight)) {
			isEndReached.value = true;
			onEndReached(remainDistance);
		} else isEndReached.value = false;
	}
	(0, vue.watch)(() => (0, vue.unref)(rowsHeight), () => isEndReached.value = false);
	(0, vue.watch)(() => props.expandedRowKeys, (val) => expandedRowKeys.value = val, { deep: true });
	return {
		columns,
		containerRef,
		mainTableRef,
		leftTableRef,
		rightTableRef,
		isDynamic,
		isResetting,
		isScrolling,
		hasFixedColumns,
		columnsStyles,
		columnsTotalWidth,
		data,
		expandedRowKeys,
		depthMap,
		fixedColumnsOnLeft,
		fixedColumnsOnRight,
		mainColumns,
		bodyWidth,
		emptyStyle,
		rootStyle,
		footerHeight,
		mainTableHeight,
		fixedTableHeight,
		leftTableWidth,
		rightTableWidth,
		showEmpty,
		getRowHeight,
		onColumnSorted,
		onRowHovered,
		onRowExpanded,
		onRowsRendered,
		onRowHeightChange,
		scrollTo,
		scrollToLeft,
		scrollToTop,
		scrollToRow,
		onScroll,
		onVerticalScroll
	};
}

//#endregion
exports.useTable = useTable;
//# sourceMappingURL=use-table.js.map