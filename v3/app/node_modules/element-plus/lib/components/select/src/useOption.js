Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_strings = require('../../../utils/strings.js');
const require_error = require('../../../utils/error.js');
const require_token = require('./token.js');
const require_option = require('./option.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select/src/useOption.ts
function useOption(props, states) {
	const select = (0, vue.inject)(require_token.selectKey);
	if (!select) require_error.throwError(require_option.COMPONENT_NAME, "usage: <el-select><el-option /></el-select/>");
	const selectGroup = (0, vue.inject)(require_token.selectGroupKey, { disabled: false });
	const itemSelected = (0, vue.computed)(() => {
		return contains((0, lodash_unified.castArray)(select.props.modelValue), props.value);
	});
	const limitReached = (0, vue.computed)(() => {
		if (select.props.multiple) {
			const modelValue = (0, lodash_unified.castArray)(select.props.modelValue ?? []);
			return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
		} else return false;
	});
	const currentLabel = (0, vue.computed)(() => {
		return props.label ?? ((0, _vue_shared.isObject)(props.value) ? "" : props.value);
	});
	const currentValue = (0, vue.computed)(() => {
		return props.value || props.label || "";
	});
	const isDisabled = (0, vue.computed)(() => {
		return props.disabled || states.groupDisabled || limitReached.value;
	});
	const instance = (0, vue.getCurrentInstance)();
	const contains = (arr = [], target) => {
		if (!(0, _vue_shared.isObject)(props.value)) return arr && arr.includes(target);
		else {
			const valueKey = select.props.valueKey;
			return arr && arr.some((item) => {
				return (0, vue.toRaw)((0, lodash_unified.get)(item, valueKey)) === (0, lodash_unified.get)(target, valueKey);
			});
		}
	};
	const hoverItem = () => {
		if (!isDisabled.value) select.states.hoveringIndex = select.optionsArray.indexOf(instance.proxy);
	};
	const updateOption = (query) => {
		states.visible = new RegExp(require_strings.escapeStringRegexp(query), "i").test(String(currentLabel.value)) || props.created;
	};
	(0, vue.watch)(() => currentLabel.value, () => {
		if (!props.created && !select.props.remote) select.setSelected();
	});
	(0, vue.watch)(() => props.value, (val, oldVal) => {
		const { remote, valueKey } = select.props;
		if (remote ? val !== oldVal : !(0, lodash_unified.isEqual)(val, oldVal)) {
			select.onOptionDestroy(oldVal, instance.proxy);
			select.onOptionCreate(instance.proxy);
		}
		if (!props.created && !remote) {
			if (valueKey && (0, _vue_shared.isObject)(val) && (0, _vue_shared.isObject)(oldVal) && val[valueKey] === oldVal[valueKey]) return;
			select.setSelected();
		}
	});
	(0, vue.watch)(() => selectGroup.disabled, () => {
		states.groupDisabled = selectGroup.disabled;
	}, { immediate: true });
	return {
		select,
		currentLabel,
		currentValue,
		itemSelected,
		isDisabled,
		hoverItem,
		updateOption
	};
}

//#endregion
exports.useOption = useOption;
//# sourceMappingURL=useOption.js.map