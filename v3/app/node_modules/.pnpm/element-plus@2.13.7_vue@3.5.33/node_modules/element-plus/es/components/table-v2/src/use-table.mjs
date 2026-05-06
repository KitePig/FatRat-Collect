import { isArray, isNumber } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useColumns } from "./composables/use-columns.mjs";
import { useScrollbar } from "./composables/use-scrollbar.mjs";
import { useRow } from "./composables/use-row.mjs";
import { useData } from "./composables/use-data.mjs";
import { useStyles } from "./composables/use-styles.mjs";
import { computed, getCurrentInstance, ref, shallowRef, toRef, unref, watch } from "vue";

//#region ../../packages/components/table-v2/src/use-table.ts
function useTable(props) {
	const mainTableRef = ref();
	const leftTableRef = ref();
	const rightTableRef = ref();
	const { columns, columnsStyles, columnsTotalWidth, fixedColumnsOnLeft, fixedColumnsOnRight, hasFixedColumns, mainColumns, onColumnSorted } = useColumns(props, toRef(props, "columns"), toRef(props, "fixed"));
	const { scrollTo, scrollToLeft, scrollToTop, scrollToRow, onScroll, onVerticalScroll, scrollPos } = useScrollbar(props, {
		mainTableRef,
		leftTableRef,
		rightTableRef,
		onMaybeEndReached
	});
	const ns = useNamespace("table-v2");
	const instance = getCurrentInstance();
	const isScrolling = shallowRef(false);
	const { expandedRowKeys, lastRenderedRowIndex, isDynamic, isResetting, rowHeights, resetAfterIndex, onRowExpanded, onRowHeightChange, onRowHovered, onRowsRendered } = useRow(props, {
		mainTableRef,
		leftTableRef,
		rightTableRef,
		tableInstance: instance,
		ns,
		isScrolling
	});
	const { data, depthMap } = useData(props, {
		expandedRowKeys,
		lastRenderedRowIndex,
		resetAfterIndex
	});
	const rowsHeight = computed(() => {
		const { estimatedRowHeight, rowHeight } = props;
		const _data = unref(data);
		if (isNumber(estimatedRowHeight)) return Object.values(unref(rowHeights)).reduce((acc, curr) => acc + curr, 0);
		return _data.length * rowHeight;
	});
	const { bodyWidth, fixedTableHeight, mainTableHeight, leftTableWidth, rightTableWidth, windowHeight, footerHeight, emptyStyle, rootStyle, headerHeight } = useStyles(props, {
		columnsTotalWidth,
		fixedColumnsOnLeft,
		fixedColumnsOnRight,
		rowsHeight
	});
	const containerRef = ref();
	const showEmpty = computed(() => {
		const noData = unref(data).length === 0;
		return isArray(props.fixedData) ? props.fixedData.length === 0 && noData : noData;
	});
	function getRowHeight(rowIndex) {
		const { estimatedRowHeight, rowHeight, rowKey } = props;
		if (!estimatedRowHeight) return rowHeight;
		return unref(rowHeights)[unref(data)[rowIndex][rowKey]] || estimatedRowHeight;
	}
	const isEndReached = ref(false);
	function onMaybeEndReached() {
		const { onEndReached } = props;
		if (!onEndReached) return;
		const { scrollTop } = unref(scrollPos);
		const _totalHeight = unref(rowsHeight);
		const remainDistance = _totalHeight - (scrollTop + unref(windowHeight)) + props.hScrollbarSize;
		if (!isEndReached.value && unref(lastRenderedRowIndex) >= 0 && _totalHeight <= scrollTop + unref(mainTableHeight) - unref(headerHeight)) {
			isEndReached.value = true;
			onEndReached(remainDistance);
		} else isEndReached.value = false;
	}
	watch(() => unref(rowsHeight), () => isEndReached.value = false);
	watch(() => props.expandedRowKeys, (val) => expandedRowKeys.value = val, { deep: true });
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
export { useTable };
//# sourceMappingURL=use-table.mjs.map