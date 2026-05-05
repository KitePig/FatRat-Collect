import { getKeysMap, getRowIdentity, toggleRowStatus } from "../util.mjs";
import { getCurrentInstance, ref } from "vue";

//#region ../../packages/components/table/src/store/expand.ts
function useExpand(watcherData) {
	const instance = getCurrentInstance();
	const defaultExpandAll = ref(false);
	const expandRows = ref([]);
	const canRowExpand = (row, index) => {
		const expandableFn = instance.store.states.rowExpandable.value;
		return expandableFn?.(row, index) ?? true;
	};
	const updateExpandRows = () => {
		const data = watcherData.data.value || [];
		const rowKey = watcherData.rowKey.value;
		if (defaultExpandAll.value) expandRows.value = instance.store.states.rowExpandable.value ? data.filter(canRowExpand) : data.slice();
		else if (rowKey) {
			const expandRowsMap = getKeysMap(expandRows.value, rowKey);
			expandRows.value = data.filter((row, index) => {
				return !!expandRowsMap[getRowIdentity(row, rowKey)] && canRowExpand(row, index);
			});
		} else expandRows.value = [];
	};
	const toggleRowExpansion = (row, expanded) => {
		const rowIndex = (watcherData.data.value || []).indexOf(row);
		if (rowIndex > -1 && !canRowExpand(row, rowIndex)) return;
		if (toggleRowStatus(expandRows.value, row, expanded, void 0, void 0, void 0, watcherData.rowKey.value)) instance.emit("expand-change", row, expandRows.value.slice());
	};
	const setExpandRowKeys = (rowKeys) => {
		instance.store.assertRowKey();
		const data = watcherData.data.value || [];
		const rowKey = watcherData.rowKey.value;
		const keysMap = getKeysMap(data, rowKey);
		expandRows.value = rowKeys.reduce((prev, cur) => {
			const info = keysMap[cur];
			if (info && canRowExpand(info.row, info.index)) prev.push(info.row);
			return prev;
		}, []);
	};
	const isRowExpanded = (row) => {
		const rowKey = watcherData.rowKey.value;
		if (rowKey) return !!getKeysMap(expandRows.value, rowKey)[getRowIdentity(row, rowKey)];
		return expandRows.value.includes(row);
	};
	return {
		updateExpandRows,
		toggleRowExpansion,
		setExpandRowKeys,
		isRowExpanded,
		states: {
			expandRows,
			defaultExpandAll
		}
	};
}

//#endregion
export { useExpand as default };
//# sourceMappingURL=expand.mjs.map