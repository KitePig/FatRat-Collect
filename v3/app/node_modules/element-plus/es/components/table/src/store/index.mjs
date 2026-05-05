import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import useWatcher from "./watcher.mjs";
import { isNull } from "lodash-unified";
import { getCurrentInstance, nextTick, unref } from "vue";

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
	const instance = getCurrentInstance();
	const watcher = useWatcher();
	const ns = useNamespace("table");
	const { t } = useLocale();
	const mutations = {
		setData(states, data) {
			const dataInstanceChanged = unref(states._data) !== data;
			states.data.value = data;
			states._data.value = data;
			instance.store.execQuery();
			instance.store.updateCurrentRowData();
			instance.store.updateExpandRows();
			instance.store.updateTreeData(instance.store.states.defaultExpandAll.value);
			if (unref(states.reserveSelection)) instance.store.assertRowKey();
			else if (dataInstanceChanged) instance.store.clearSelection();
			else instance.store.cleanSelection();
			instance.store.updateAllSelected();
			if (instance.$ready) instance.store.scheduleLayout();
		},
		insertColumn(states, column, parent, updateColumnOrder) {
			const array = unref(states._columns);
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
			const array = unref(states._columns) || [];
			if (parent) {
				parent.children?.splice(parent.children.findIndex((item) => item.id === column.id), 1);
				nextTick(() => {
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
				const column = unref(states.columns).find((column) => column.property === prop);
				if (column) {
					column.order = order;
					instance.store.updateSort(column, prop, order);
					instance.store.commit("changeSortCondition", { init });
				}
			}
		},
		changeSortCondition(states, options) {
			const { sortingColumn, sortProp, sortOrder } = states;
			const columnValue = unref(sortingColumn), propValue = unref(sortProp), orderValue = unref(sortOrder);
			if (isNull(orderValue)) {
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
		nextTick(() => instance.layout.updateScrollY.apply(instance.layout));
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
export { useStore as default };
//# sourceMappingURL=index.mjs.map