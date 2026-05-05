Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_watcher = require('./watcher.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/table/src/store/index.ts
function replaceColumn(array, column) {
	return array.map((item) => {
		if (item.id === column.id) return column;
		else if (item.children?.length) item.children = replaceColumn(item.children, column);
		return item;
	});
}
function sortColumn(array) {
	array.forEach((item) => {
		item.no = item.getColumnIndex?.();
		if (item.children?.length) sortColumn(item.children);
	});
	array.sort((cur, pre) => cur.no - pre.no);
}
function useStore() {
	const instance = (0, vue.getCurrentInstance)();
	const watcher = require_watcher.default();
	const ns = require_index$1.useNamespace("table");
	const { t } = require_index.useLocale();
	const mutations = {
		setData(states, data) {
			const dataInstanceChanged = (0, vue.unref)(states._data) !== data;
			states.data.value = data;
			states._data.value = data;
			instance.store.execQuery();
			instance.store.updateCurrentRowData();
			instance.store.updateExpandRows();
			instance.store.updateTreeData(instance.store.states.defaultExpandAll.value);
			if ((0, vue.unref)(states.reserveSelection)) instance.store.assertRowKey();
			else if (dataInstanceChanged) instance.store.clearSelection();
			else instance.store.cleanSelection();
			instance.store.updateAllSelected();
			if (instance.$ready) instance.store.scheduleLayout();
		},
		insertColumn(states, column, parent, updateColumnOrder) {
			const array = (0, vue.unref)(states._columns);
			let newColumns = [];
			if (!parent) {
				array.push(column);
				newColumns = array;
			} else {
				if (parent && !parent.children) parent.children = [];
				parent.children?.push(column);
				newColumns = replaceColumn(array, parent);
			}
			sortColumn(newColumns);
			states._columns.value = newColumns;
			states.updateOrderFns.push(updateColumnOrder);
			if (column.type === "selection") {
				states.selectable.value = column.selectable;
				states.reserveSelection.value = column.reserveSelection;
			}
			if (instance.$ready) {
				instance.store.updateColumns();
				instance.store.scheduleLayout();
			}
		},
		updateColumnOrder(states, column) {
			if (column.getColumnIndex?.() === column.no) return;
			sortColumn(states._columns.value);
			if (instance.$ready) instance.store.updateColumns();
		},
		removeColumn(states, column, parent, updateColumnOrder) {
			const array = (0, vue.unref)(states._columns) || [];
			if (parent) {
				parent.children?.splice(parent.children.findIndex((item) => item.id === column.id), 1);
				(0, vue.nextTick)(() => {
					if (parent.children?.length === 0) delete parent.children;
				});
				states._columns.value = replaceColumn(array, parent);
			} else {
				const index = array.indexOf(column);
				if (index > -1) {
					array.splice(index, 1);
					states._columns.value = array;
				}
			}
			const updateFnIndex = states.updateOrderFns.indexOf(updateColumnOrder);
			updateFnIndex > -1 && states.updateOrderFns.splice(updateFnIndex, 1);
			if (instance.$ready) {
				instance.store.updateColumns();
				instance.store.scheduleLayout();
			}
		},
		sort(states, options) {
			const { prop, order, init } = options;
			if (prop) {
				const column = (0, vue.unref)(states.columns).find((column) => column.property === prop);
				if (column) {
					column.order = order;
					instance.store.updateSort(column, prop, order);
					instance.store.commit("changeSortCondition", { init });
				}
			}
		},
		changeSortCondition(states, options) {
			const { sortingColumn, sortProp, sortOrder } = states;
			const columnValue = (0, vue.unref)(sortingColumn), propValue = (0, vue.unref)(sortProp), orderValue = (0, vue.unref)(sortOrder);
			if ((0, lodash_unified.isNull)(orderValue)) {
				states.sortingColumn.value = null;
				states.sortProp.value = null;
			}
			instance.store.execQuery({ filter: true });
			if (!options || !(options.silent || options.init)) instance.emit("sort-change", {
				column: columnValue,
				prop: propValue,
				order: orderValue
			});
			instance.store.updateTableScrollY();
		},
		filterChange(_states, options) {
			const { column, values, silent } = options;
			const newFilters = instance.store.updateFilters(column, values);
			instance.store.execQuery();
			if (!silent) instance.emit("filter-change", newFilters);
			instance.store.updateTableScrollY();
		},
		toggleAllSelection() {
			instance.store.toggleAllSelection?.();
		},
		rowSelectedChanged(_states, row) {
			instance.store.toggleRowSelection(row);
			instance.store.updateAllSelected();
		},
		setHoverRow(states, row) {
			states.hoverRow.value = row;
		},
		setCurrentRow(_states, row) {
			instance.store.updateCurrentRow(row);
		}
	};
	const commit = function(name, ...args) {
		const mutations = instance.store.mutations;
		if (mutations[name]) mutations[name].apply(instance, [instance.store.states, ...args]);
		else throw new Error(`Action not found: ${name}`);
	};
	const updateTableScrollY = function() {
		(0, vue.nextTick)(() => instance.layout.updateScrollY.apply(instance.layout));
	};
	return {
		ns,
		t,
		...watcher,
		mutations,
		commit,
		updateTableScrollY
	};
}

//#endregion
exports.default = useStore;
//# sourceMappingURL=index.js.map