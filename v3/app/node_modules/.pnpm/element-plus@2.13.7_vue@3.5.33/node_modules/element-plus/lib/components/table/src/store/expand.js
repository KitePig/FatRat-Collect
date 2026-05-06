Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_util = require('../util.js');
let vue = require("vue");

//#region ../../packages/components/table/src/store/expand.ts
function useExpand(watcherData) {
	const instance = (0, vue.getCurrentInstance)();
	const defaultExpandAll = (0, vue.ref)(false);
	const expandRows = (0, vue.ref)([]);
	const canRowExpand = (row, index) => {
		const expandableFn = instance.store.states.rowExpandable.value;
		return expandableFn?.(row, index) ?? true;
	};
	const updateExpandRows = () => {
		const data = watcherData.data.value || [];
		const rowKey = watcherData.rowKey.value;
		if (defaultExpandAll.value) expandRows.value = instance.store.states.rowExpandable.value ? data.filter(canRowExpand) : data.slice();
		else if (rowKey) {
			const expandRowsMap = require_util.getKeysMap(expandRows.value, rowKey);
			expandRows.value = data.filter((row, index) => {
				return !!expandRowsMap[require_util.getRowIdentity(row, rowKey)] && canRowExpand(row, index);
			});
		} else expandRows.value = [];
	};
	const toggleRowExpansion = (row, expanded) => {
		const rowIndex = (watcherData.data.value || []).indexOf(row);
		if (rowIndex > -1 && !canRowExpand(row, rowIndex)) return;
		if (require_util.toggleRowStatus(expandRows.value, row, expanded, void 0, void 0, void 0, watcherData.rowKey.value)) instance.emit("expand-change", row, expandRows.value.slice());
	};
	const setExpandRowKeys = (rowKeys) => {
		instance.store.assertRowKey();
		const data = watcherData.data.value || [];
		const rowKey = watcherData.rowKey.value;
		const keysMap = require_util.getKeysMap(data, rowKey);
		expandRows.value = rowKeys.reduce((prev, cur) => {
			const info = keysMap[cur];
			if (info && canRowExpand(info.row, info.index)) prev.push(info.row);
			return prev;
		}, []);
	};
	const isRowExpanded = (row) => {
		const rowKey = watcherData.rowKey.value;
		if (rowKey) return !!require_util.getKeysMap(expandRows.value, rowKey)[require_util.getRowIdentity(row, rowKey)];
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
exports.default = useExpand;
//# sourceMappingURL=expand.js.map