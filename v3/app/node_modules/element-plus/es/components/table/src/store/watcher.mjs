import { isArray, isString } from "../../../../utils/types.mjs";
import { hasOwn } from "../../../../utils/objects.mjs";
import { ensureArray } from "../../../../utils/arrays.mjs";
import { getColumnById, getColumnByKey, getKeysMap, getRowIdentity, orderBy, toggleRowStatus } from "../util.mjs";
import useExpand from "./expand.mjs";
import useCurrent from "./current.mjs";
import useTree from "./tree.mjs";
import { computed, getCurrentInstance, ref, toRefs, unref, watch } from "vue";

//#region ../../packages/components/table/src/store/watcher.ts
const sortData = (data, states) => {
	const sortingColumn = states.sortingColumn;
	if (!sortingColumn || isString(sortingColumn.sortable)) return data;
	return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};
const doFlattenColumns = (columns) => {
	const result = [];
	columns.forEach((column) => {
		if (column.children && column.children.length > 0) result.push.apply(result, doFlattenColumns(column.children));
		else result.push(column);
	});
	return result;
};
function useWatcher() {
	const instance = getCurrentInstance();
	const { size: tableSize } = toRefs(instance.proxy?.$props);
	const rowKey = ref(null);
	const data = ref([]);
	const _data = ref([]);
	const isComplex = ref(false);
	const _columns = ref([]);
	const originColumns = ref([]);
	const columns = ref([]);
	const fixedColumns = ref([]);
	const rightFixedColumns = ref([]);
	const leafColumns = ref([]);
	const fixedLeafColumns = ref([]);
	const rightFixedLeafColumns = ref([]);
	const updateOrderFns = [];
	const leafColumnsLength = ref(0);
	const fixedLeafColumnsLength = ref(0);
	const rightFixedLeafColumnsLength = ref(0);
	const isAllSelected = ref(false);
	const selection = ref([]);
	const reserveSelection = ref(false);
	const selectOnIndeterminate = ref(false);
	const selectable = ref(null);
	const rowExpandable = ref(null);
	const filters = ref({});
	const filteredData = ref(null);
	const sortingColumn = ref(null);
	const sortProp = ref(null);
	const sortOrder = ref(null);
	const hoverRow = ref(null);
	const selectedMap = computed(() => {
		return rowKey.value ? getKeysMap(selection.value, rowKey.value) : void 0;
	});
	watch(data, () => {
		if (instance.state) {
			scheduleLayout(false);
			if (instance.props.tableLayout === "auto") instance.refs.tableHeaderRef?.updateFixedColumnStyle();
		}
	}, { deep: true });
	const assertRowKey = () => {
		if (!rowKey.value) throw new Error("[ElTable] prop row-key is required");
	};
	const updateChildFixed = (column) => {
		column.children?.forEach((childColumn) => {
			childColumn.fixed = column.fixed;
			updateChildFixed(childColumn);
		});
	};
	const updateColumns = () => {
		_columns.value.forEach((column) => {
			updateChildFixed(column);
		});
		fixedColumns.value = _columns.value.filter((column) => [true, "left"].includes(column.fixed));
		const selectColumn = _columns.value.find((column) => column.type === "selection");
		let selectColFixLeft;
		if (selectColumn && selectColumn.fixed !== "right" && !fixedColumns.value.includes(selectColumn)) {
			if (_columns.value.indexOf(selectColumn) === 0 && fixedColumns.value.length) {
				fixedColumns.value.unshift(selectColumn);
				selectColFixLeft = true;
			}
		}
		rightFixedColumns.value = _columns.value.filter((column) => column.fixed === "right");
		const notFixedColumns = _columns.value.filter((column) => (selectColFixLeft ? column.type !== "selection" : true) && !column.fixed);
		originColumns.value = Array.from(fixedColumns.value).concat(notFixedColumns).concat(rightFixedColumns.value);
		const leafColumns = doFlattenColumns(notFixedColumns);
		const fixedLeafColumns = doFlattenColumns(fixedColumns.value);
		const rightFixedLeafColumns = doFlattenColumns(rightFixedColumns.value);
		leafColumnsLength.value = leafColumns.length;
		fixedLeafColumnsLength.value = fixedLeafColumns.length;
		rightFixedLeafColumnsLength.value = rightFixedLeafColumns.length;
		columns.value = Array.from(fixedLeafColumns).concat(leafColumns).concat(rightFixedLeafColumns);
		isComplex.value = fixedColumns.value.length > 0 || rightFixedColumns.value.length > 0;
	};
	const scheduleLayout = (needUpdateColumns, immediate = false) => {
		if (needUpdateColumns) updateColumns();
		if (immediate) instance.state.doLayout();
		else instance.state.debouncedUpdateLayout();
	};
	const isSelected = (row) => {
		if (selectedMap.value) return !!selectedMap.value[getRowIdentity(row, rowKey.value)];
		else return selection.value.includes(row);
	};
	const clearSelection = () => {
		isAllSelected.value = false;
		const oldSelection = selection.value;
		selection.value = [];
		if (oldSelection.length) instance.emit("selection-change", []);
	};
	const cleanSelection = () => {
		let deleted;
		if (rowKey.value) {
			deleted = [];
			const childrenKey = instance?.store?.states?.childrenColumnName.value;
			const dataMap = getKeysMap(data.value, rowKey.value, true, childrenKey);
			for (const key in selectedMap.value) if (hasOwn(selectedMap.value, key) && !dataMap[key]) deleted.push(selectedMap.value[key].row);
		} else deleted = selection.value.filter((item) => !data.value.includes(item));
		if (deleted.length) {
			const newSelection = selection.value.filter((item) => !deleted.includes(item));
			selection.value = newSelection;
			instance.emit("selection-change", newSelection.slice());
		}
	};
	const getSelectionRows = () => {
		return (selection.value || []).slice();
	};
	const toggleRowSelection = (row, selected, emitChange = true, ignoreSelectable = false) => {
		const treeProps = {
			children: instance?.store?.states?.childrenColumnName.value,
			checkStrictly: instance?.store?.states?.checkStrictly.value
		};
		if (toggleRowStatus(selection.value, row, selected, treeProps, ignoreSelectable ? void 0 : selectable.value, data.value.indexOf(row), rowKey.value)) {
			const newSelection = (selection.value || []).slice();
			if (emitChange) instance.emit("select", newSelection, row);
			instance.emit("selection-change", newSelection);
		}
	};
	const _toggleAllSelection = () => {
		const value = selectOnIndeterminate.value ? !isAllSelected.value : !(isAllSelected.value || selection.value.length);
		isAllSelected.value = value;
		let selectionChanged = false;
		let childrenCount = 0;
		const rowKey = instance?.store?.states?.rowKey.value;
		const { childrenColumnName } = instance.store.states;
		const treeProps = {
			children: childrenColumnName.value,
			checkStrictly: false
		};
		data.value.forEach((row, index) => {
			const rowIndex = index + childrenCount;
			if (toggleRowStatus(selection.value, row, value, treeProps, selectable.value, rowIndex, rowKey)) selectionChanged = true;
			childrenCount += getChildrenCount(getRowIdentity(row, rowKey));
		});
		if (selectionChanged) instance.emit("selection-change", selection.value ? selection.value.slice() : []);
		instance.emit("select-all", (selection.value || []).slice());
	};
	const updateAllSelected = () => {
		if (data.value?.length === 0) {
			isAllSelected.value = false;
			return;
		}
		const { childrenColumnName } = instance.store.states;
		let rowIndex = 0;
		let selectedCount = 0;
		const checkSelectedStatus = (data) => {
			for (const row of data) {
				const isRowSelectable = selectable.value && selectable.value.call(null, row, rowIndex);
				if (!isSelected(row)) {
					if (!selectable.value || isRowSelectable) return false;
				} else selectedCount++;
				rowIndex++;
				if (row[childrenColumnName.value]?.length && !checkSelectedStatus(row[childrenColumnName.value])) return false;
			}
			return true;
		};
		const isAllSelected_ = checkSelectedStatus(data.value || []);
		isAllSelected.value = selectedCount === 0 ? false : isAllSelected_;
	};
	const getChildrenCount = (rowKey) => {
		if (!instance || !instance.store) return 0;
		const { treeData } = instance.store.states;
		let count = 0;
		const children = treeData.value[rowKey]?.children;
		if (children) {
			count += children.length;
			children.forEach((childKey) => {
				count += getChildrenCount(childKey);
			});
		}
		return count;
	};
	const updateFilters = (column, values) => {
		const filters_ = {};
		ensureArray(column).forEach((col) => {
			filters.value[col.id] = values;
			filters_[col.columnKey || col.id] = values;
		});
		return filters_;
	};
	const updateSort = (column, prop, order) => {
		if (sortingColumn.value && sortingColumn.value !== column) sortingColumn.value.order = null;
		sortingColumn.value = column;
		sortProp.value = prop;
		sortOrder.value = order;
	};
	const execFilter = () => {
		let sourceData = unref(_data);
		Object.keys(filters.value).forEach((columnId) => {
			const values = filters.value[columnId];
			if (!values || values.length === 0) return;
			const column = getColumnById({ columns: columns.value }, columnId);
			if (column && column.filterMethod) sourceData = sourceData.filter((row) => {
				return values.some((value) => column.filterMethod.call(null, value, row, column));
			});
		});
		filteredData.value = sourceData;
	};
	const execSort = () => {
		data.value = sortData(filteredData.value ?? [], {
			sortingColumn: sortingColumn.value,
			sortProp: sortProp.value,
			sortOrder: sortOrder.value
		});
	};
	const execQuery = (ignore = void 0) => {
		if (!ignore?.filter) execFilter();
		execSort();
	};
	const clearFilter = (columnKeys) => {
		const { tableHeaderRef } = instance.refs;
		if (!tableHeaderRef) return;
		const panels = Object.assign({}, tableHeaderRef.filterPanels);
		const keys = Object.keys(panels);
		if (!keys.length) return;
		if (isString(columnKeys)) columnKeys = [columnKeys];
		if (isArray(columnKeys)) {
			const columns_ = columnKeys.map((key) => getColumnByKey({ columns: columns.value }, key));
			keys.forEach((key) => {
				const column = columns_.find((col) => col.id === key);
				if (column) column.filteredValue = [];
			});
			instance.store.commit("filterChange", {
				column: columns_,
				values: [],
				silent: true,
				multi: true
			});
		} else {
			keys.forEach((key) => {
				const column = columns.value.find((col) => col.id === key);
				if (column) column.filteredValue = [];
			});
			filters.value = {};
			instance.store.commit("filterChange", {
				column: {},
				values: [],
				silent: true
			});
		}
	};
	const clearSort = () => {
		if (!sortingColumn.value) return;
		updateSort(null, null, null);
		instance.store.commit("changeSortCondition", { silent: true });
	};
	const { setExpandRowKeys, toggleRowExpansion, updateExpandRows, states: expandStates, isRowExpanded } = useExpand({
		data,
		rowKey
	});
	const { updateTreeExpandKeys, toggleTreeExpansion, updateTreeData, updateKeyChildren, loadOrToggle, states: treeStates } = useTree({
		data,
		rowKey
	});
	const { updateCurrentRowData, updateCurrentRow, setCurrentRowKey, states: currentData } = useCurrent({
		data,
		rowKey
	});
	const setExpandRowKeysAdapter = (val) => {
		setExpandRowKeys(val);
		updateTreeExpandKeys(val);
	};
	const toggleRowExpansionAdapter = (row, expanded) => {
		if (columns.value.some(({ type }) => type === "expand")) toggleRowExpansion(row, expanded);
		else toggleTreeExpansion(row, expanded);
	};
	return {
		assertRowKey,
		updateColumns,
		scheduleLayout,
		isSelected,
		clearSelection,
		cleanSelection,
		getSelectionRows,
		toggleRowSelection,
		_toggleAllSelection,
		toggleAllSelection: null,
		updateAllSelected,
		updateFilters,
		updateCurrentRow,
		updateSort,
		execFilter,
		execSort,
		execQuery,
		clearFilter,
		clearSort,
		toggleRowExpansion,
		setExpandRowKeysAdapter,
		setCurrentRowKey,
		toggleRowExpansionAdapter,
		isRowExpanded,
		updateExpandRows,
		updateCurrentRowData,
		loadOrToggle,
		updateTreeData,
		updateKeyChildren,
		states: {
			tableSize,
			rowKey,
			data,
			_data,
			isComplex,
			_columns,
			originColumns,
			columns,
			fixedColumns,
			rightFixedColumns,
			leafColumns,
			fixedLeafColumns,
			rightFixedLeafColumns,
			updateOrderFns,
			leafColumnsLength,
			fixedLeafColumnsLength,
			rightFixedLeafColumnsLength,
			isAllSelected,
			selection,
			reserveSelection,
			selectOnIndeterminate,
			selectable,
			rowExpandable,
			filters,
			filteredData,
			sortingColumn,
			sortProp,
			sortOrder,
			hoverRow,
			...expandStates,
			...treeStates,
			...currentData
		}
	};
}

//#endregion
export { useWatcher as default };
//# sourceMappingURL=watcher.mjs.map