Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_transfer_panel = require('../transfer-panel.js');
const require_use_props_alias = require('./use-props-alias.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/transfer/src/composables/use-check.ts
const useCheck = (props, panelState, emit) => {
	const propsAlias = require_use_props_alias.usePropsAlias(props);
	const filteredData = (0, vue.computed)(() => {
		return props.data.filter((item) => {
			if ((0, _vue_shared.isFunction)(props.filterMethod)) return props.filterMethod(panelState.query, item);
			else return String(item[propsAlias.value.label] || item[propsAlias.value.key]).toLowerCase().includes(panelState.query.toLowerCase());
		});
	});
	const checkableData = (0, vue.computed)(() => filteredData.value.filter((item) => !item[propsAlias.value.disabled]));
	const checkedSummary = (0, vue.computed)(() => {
		const checkedLength = panelState.checked.length;
		const dataLength = props.data.length;
		const { noChecked, hasChecked } = props.format;
		if (noChecked && hasChecked) return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength.toString()).replace(/\${total}/g, dataLength.toString()) : noChecked.replace(/\${total}/g, dataLength.toString());
		else return `${checkedLength}/${dataLength}`;
	});
	const isIndeterminate = (0, vue.computed)(() => {
		const checkedLength = panelState.checked.length;
		return checkedLength > 0 && checkedLength < checkableData.value.length;
	});
	const updateAllChecked = () => {
		const checkableDataKeys = checkableData.value.map((item) => item[propsAlias.value.key]);
		panelState.allChecked = checkableDataKeys.length > 0 && checkableDataKeys.every((item) => panelState.checked.includes(item));
	};
	const handleAllCheckedChange = (value) => {
		panelState.checked = value ? checkableData.value.map((item) => item[propsAlias.value.key]) : [];
	};
	(0, vue.watch)(() => panelState.checked, (val, oldVal) => {
		updateAllChecked();
		if (panelState.checkChangeByUser) emit(require_transfer_panel.CHECKED_CHANGE_EVENT, val, val.concat(oldVal).filter((v) => !val.includes(v) || !oldVal.includes(v)));
		else {
			emit(require_transfer_panel.CHECKED_CHANGE_EVENT, val);
			panelState.checkChangeByUser = true;
		}
	});
	(0, vue.watch)(checkableData, () => {
		updateAllChecked();
	});
	(0, vue.watch)(() => props.data, () => {
		const checked = [];
		const filteredDataKeys = filteredData.value.map((item) => item[propsAlias.value.key]);
		panelState.checked.forEach((item) => {
			if (filteredDataKeys.includes(item)) checked.push(item);
		});
		panelState.checkChangeByUser = false;
		panelState.checked = checked;
	});
	(0, vue.watch)(() => props.defaultChecked, (val, oldVal) => {
		if (oldVal && val.length === oldVal.length && val.every((item) => oldVal.includes(item))) return;
		const checked = [];
		const checkableDataKeys = checkableData.value.map((item) => item[propsAlias.value.key]);
		val.forEach((item) => {
			if (checkableDataKeys.includes(item)) checked.push(item);
		});
		panelState.checkChangeByUser = false;
		panelState.checked = checked;
	}, { immediate: true });
	return {
		filteredData,
		checkableData,
		checkedSummary,
		isIndeterminate,
		updateAllChecked,
		handleAllCheckedChange
	};
};

//#endregion
exports.useCheck = useCheck;
//# sourceMappingURL=use-check.js.map