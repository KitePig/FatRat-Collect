import { isNumber } from "../../../../utils/types.mjs";
import { FixedDir } from "../constants.mjs";
import { debounce } from "lodash-unified";
import { computed, getCurrentInstance, nextTick, ref, shallowRef, unref } from "vue";

//#region ../../packages/components/table-v2/src/composables/use-row.ts
const useRow = (props, { mainTableRef, leftTableRef, rightTableRef, tableInstance, ns, isScrolling }) => {
	const vm = getCurrentInstance();
	const { emit } = vm;
	const isResetting = shallowRef(false);
	const expandedRowKeys = ref(props.defaultExpandedRowKeys || []);
	const lastRenderedRowIndex = ref(-1);
	const resetIndex = shallowRef(null);
	const rowHeights = ref({});
	const pendingRowHeights = ref({});
	const leftTableHeights = shallowRef({});
	const mainTableHeights = shallowRef({});
	const rightTableHeights = shallowRef({});
	const isDynamic = computed(() => isNumber(props.estimatedRowHeight));
	function onRowsRendered(params) {
		props.onRowsRendered?.(params);
		if (params.rowCacheEnd > unref(lastRenderedRowIndex)) lastRenderedRowIndex.value = params.rowCacheEnd;
	}
	function onRowHovered({ hovered, rowKey }) {
		if (isScrolling.value) return;
		tableInstance.vnode.el.querySelectorAll(`[rowkey="${String(rowKey)}"]`).forEach((row) => {
			if (hovered) row.classList.add(ns.is("hovered"));
			else row.classList.remove(ns.is("hovered"));
		});
	}
	function onRowExpanded({ expanded, rowData, rowIndex, rowKey }) {
		const _expandedRowKeys = [...unref(expandedRowKeys)];
		const currentKeyIndex = _expandedRowKeys.indexOf(rowKey);
		if (expanded) {
			if (currentKeyIndex === -1) _expandedRowKeys.push(rowKey);
		} else if (currentKeyIndex > -1) _expandedRowKeys.splice(currentKeyIndex, 1);
		expandedRowKeys.value = _expandedRowKeys;
		emit("update:expandedRowKeys", _expandedRowKeys);
		props.onRowExpand?.({
			expanded,
			rowData,
			rowIndex,
			rowKey
		});
		props.onExpandedRowsChange?.(_expandedRowKeys);
		if (tableInstance.vnode.el.querySelector(`.${ns.is("hovered")}[rowkey="${String(rowKey)}"]`)) nextTick(() => onRowHovered({
			hovered: true,
			rowKey
		}));
	}
	const flushingRowHeights = debounce(() => {
		isResetting.value = true;
		rowHeights.value = {
			...unref(rowHeights),
			...unref(pendingRowHeights)
		};
		resetAfterIndex(unref(resetIndex), false);
		pendingRowHeights.value = {};
		resetIndex.value = null;
		mainTableRef.value?.forceUpdate();
		leftTableRef.value?.forceUpdate();
		rightTableRef.value?.forceUpdate();
		vm.proxy?.$forceUpdate();
		isResetting.value = false;
	}, 0);
	function resetAfterIndex(index, forceUpdate = false) {
		if (!unref(isDynamic)) return;
		[
			mainTableRef,
			leftTableRef,
			rightTableRef
		].forEach((tableRef) => {
			const table = unref(tableRef);
			if (table) table.resetAfterRowIndex(index, forceUpdate);
		});
	}
	function resetHeights(rowKey, height, rowIdx) {
		const resetIdx = unref(resetIndex);
		if (resetIdx === null) resetIndex.value = rowIdx;
		else if (resetIdx > rowIdx) resetIndex.value = rowIdx;
		pendingRowHeights.value[rowKey] = height;
	}
	function onRowHeightChange({ rowKey, height, rowIndex }, fixedDir) {
		if (!fixedDir) mainTableHeights.value[rowKey] = height;
		else if (fixedDir === FixedDir.RIGHT) rightTableHeights.value[rowKey] = height;
		else leftTableHeights.value[rowKey] = height;
		const maximumHeight = Math.max(...[
			leftTableHeights,
			rightTableHeights,
			mainTableHeights
		].map((records) => records.value[rowKey] || 0));
		if (unref(rowHeights)[rowKey] !== maximumHeight) {
			resetHeights(rowKey, maximumHeight, rowIndex);
			flushingRowHeights();
		}
	}
	return {
		expandedRowKeys,
		lastRenderedRowIndex,
		isDynamic,
		isResetting,
		rowHeights,
		resetAfterIndex,
		onRowExpanded,
		onRowHovered,
		onRowsRendered,
		onRowHeightChange
	};
};

//#endregion
export { useRow };
//# sourceMappingURL=use-row.mjs.map