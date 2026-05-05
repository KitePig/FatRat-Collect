Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_constants = require('../constants.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/table-v2/src/composables/use-row.ts
const useRow = (props, { mainTableRef, leftTableRef, rightTableRef, tableInstance, ns, isScrolling }) => {
	const vm = (0, vue.getCurrentInstance)();
	const { emit } = vm;
	const isResetting = (0, vue.shallowRef)(false);
	const expandedRowKeys = (0, vue.ref)(props.defaultExpandedRowKeys || []);
	const lastRenderedRowIndex = (0, vue.ref)(-1);
	const resetIndex = (0, vue.shallowRef)(null);
	const rowHeights = (0, vue.ref)({});
	const pendingRowHeights = (0, vue.ref)({});
	const leftTableHeights = (0, vue.shallowRef)({});
	const mainTableHeights = (0, vue.shallowRef)({});
	const rightTableHeights = (0, vue.shallowRef)({});
	const isDynamic = (0, vue.computed)(() => require_types.isNumber(props.estimatedRowHeight));
	function onRowsRendered(params) {
		props.onRowsRendered?.(params);
		if (params.rowCacheEnd > (0, vue.unref)(lastRenderedRowIndex)) lastRenderedRowIndex.value = params.rowCacheEnd;
	}
	function onRowHovered({ hovered, rowKey }) {
		if (isScrolling.value) return;
		tableInstance.vnode.el.querySelectorAll(`[rowkey="${String(rowKey)}"]`).forEach((row) => {
			if (hovered) row.classList.add(ns.is("hovered"));
			else row.classList.remove(ns.is("hovered"));
		});
	}
	function onRowExpanded({ expanded, rowData, rowIndex, rowKey }) {
		const _expandedRowKeys = [...(0, vue.unref)(expandedRowKeys)];
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
		if (tableInstance.vnode.el.querySelector(`.${ns.is("hovered")}[rowkey="${String(rowKey)}"]`)) (0, vue.nextTick)(() => onRowHovered({
			hovered: true,
			rowKey
		}));
	}
	const flushingRowHeights = (0, lodash_unified.debounce)(() => {
		isResetting.value = true;
		rowHeights.value = {
			...(0, vue.unref)(rowHeights),
			...(0, vue.unref)(pendingRowHeights)
		};
		resetAfterIndex((0, vue.unref)(resetIndex), false);
		pendingRowHeights.value = {};
		resetIndex.value = null;
		mainTableRef.value?.forceUpdate();
		leftTableRef.value?.forceUpdate();
		rightTableRef.value?.forceUpdate();
		vm.proxy?.$forceUpdate();
		isResetting.value = false;
	}, 0);
	function resetAfterIndex(index, forceUpdate = false) {
		if (!(0, vue.unref)(isDynamic)) return;
		[
			mainTableRef,
			leftTableRef,
			rightTableRef
		].forEach((tableRef) => {
			const table = (0, vue.unref)(tableRef);
			if (table) table.resetAfterRowIndex(index, forceUpdate);
		});
	}
	function resetHeights(rowKey, height, rowIdx) {
		const resetIdx = (0, vue.unref)(resetIndex);
		if (resetIdx === null) resetIndex.value = rowIdx;
		else if (resetIdx > rowIdx) resetIndex.value = rowIdx;
		pendingRowHeights.value[rowKey] = height;
	}
	function onRowHeightChange({ rowKey, height, rowIndex }, fixedDir) {
		if (!fixedDir) mainTableHeights.value[rowKey] = height;
		else if (fixedDir === require_constants.FixedDir.RIGHT) rightTableHeights.value[rowKey] = height;
		else leftTableHeights.value[rowKey] = height;
		const maximumHeight = Math.max(...[
			leftTableHeights,
			rightTableHeights,
			mainTableHeights
		].map((records) => records.value[rowKey] || 0));
		if ((0, vue.unref)(rowHeights)[rowKey] !== maximumHeight) {
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
exports.useRow = useRow;
//# sourceMappingURL=use-row.js.map