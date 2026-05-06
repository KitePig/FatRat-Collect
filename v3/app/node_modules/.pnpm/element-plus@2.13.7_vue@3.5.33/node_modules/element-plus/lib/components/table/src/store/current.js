Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_util = require('../util.js');
let vue = require("vue");

//#region ../../packages/components/table/src/store/current.ts
function useCurrent(watcherData) {
	const instance = (0, vue.getCurrentInstance)();
	const _currentRowKey = (0, vue.ref)(null);
	const currentRow = (0, vue.ref)(null);
	const setCurrentRowKey = (key) => {
		instance.store.assertRowKey();
		_currentRowKey.value = key;
		setCurrentRowByKey(key);
	};
	const restoreCurrentRowKey = () => {
		_currentRowKey.value = null;
	};
	const setCurrentRowByKey = (key) => {
		const { data, rowKey } = watcherData;
		const oldCurrentRow = currentRow.value;
		let _currentRow = null;
		if (rowKey.value) _currentRow = ((0, vue.unref)(data) || []).find((item) => require_util.getRowIdentity(item, rowKey.value) === key) ?? null;
		currentRow.value = _currentRow ?? null;
		instance.emit("current-change", currentRow.value, oldCurrentRow);
	};
	const updateCurrentRow = (_currentRow) => {
		const oldCurrentRow = currentRow.value;
		if (_currentRow && _currentRow !== oldCurrentRow) {
			currentRow.value = _currentRow;
			instance.emit("current-change", currentRow.value, oldCurrentRow);
			return;
		}
		if (!_currentRow && oldCurrentRow) {
			currentRow.value = null;
			instance.emit("current-change", null, oldCurrentRow);
		}
	};
	const updateCurrentRowData = () => {
		const rowKey = watcherData.rowKey.value;
		const data = watcherData.data.value || [];
		const oldCurrentRow = currentRow.value;
		if (oldCurrentRow && !data.includes(oldCurrentRow)) if (rowKey) setCurrentRowByKey(require_util.getRowIdentity(oldCurrentRow, rowKey));
		else {
			currentRow.value = null;
			instance.emit("current-change", null, oldCurrentRow);
		}
		else if (_currentRowKey.value) {
			setCurrentRowByKey(_currentRowKey.value);
			restoreCurrentRowKey();
		}
	};
	return {
		setCurrentRowKey,
		restoreCurrentRowKey,
		setCurrentRowByKey,
		updateCurrentRow,
		updateCurrentRowData,
		states: {
			_currentRowKey,
			currentRow
		}
	};
}

//#endregion
exports.default = useCurrent;
//# sourceMappingURL=current.js.map