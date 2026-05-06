Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_index = require('../../../../hooks/use-deprecated/index.js');
const require_use_form_item = require('../../../form/src/hooks/use-form-item.js');
const require_use_checkbox_disabled = require('./use-checkbox-disabled.js');
const require_use_checkbox_event = require('./use-checkbox-event.js');
const require_use_checkbox_model = require('./use-checkbox-model.js');
const require_use_checkbox_status = require('./use-checkbox-status.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/checkbox/src/composables/use-checkbox.ts
const useCheckbox = (props, slots) => {
	const { formItem: elFormItem } = require_use_form_item.useFormItem();
	const { model, isGroup, isLimitExceeded } = require_use_checkbox_model.useCheckboxModel(props);
	const { isFocused, isChecked, checkboxButtonSize, checkboxSize, hasOwnLabel, actualValue } = require_use_checkbox_status.useCheckboxStatus(props, slots, { model });
	const { isDisabled } = require_use_checkbox_disabled.useCheckboxDisabled({
		model,
		isChecked
	});
	const { inputId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, {
		formItemContext: elFormItem,
		disableIdGeneration: hasOwnLabel,
		disableIdManagement: isGroup
	});
	const { handleChange, onClickRoot } = require_use_checkbox_event.useCheckboxEvent(props, {
		model,
		isLimitExceeded,
		hasOwnLabel,
		isDisabled,
		isLabeledByFormItem
	});
	const setStoreValue = () => {
		function addToStore() {
			if ((0, _vue_shared.isArray)(model.value) && !model.value.includes(actualValue.value)) model.value.push(actualValue.value);
			else model.value = props.trueValue ?? props.trueLabel ?? true;
		}
		props.checked && addToStore();
	};
	setStoreValue();
	require_index.useDeprecated({
		from: "label act as value",
		replacement: "value",
		version: "3.0.0",
		scope: "el-checkbox",
		ref: "https://element-plus.org/en-US/component/checkbox.html"
	}, (0, vue.computed)(() => isGroup.value && require_types.isPropAbsent(props.value)));
	require_index.useDeprecated({
		from: "true-label",
		replacement: "true-value",
		version: "3.0.0",
		scope: "el-checkbox",
		ref: "https://element-plus.org/en-US/component/checkbox.html"
	}, (0, vue.computed)(() => !!props.trueLabel));
	require_index.useDeprecated({
		from: "false-label",
		replacement: "false-value",
		version: "3.0.0",
		scope: "el-checkbox",
		ref: "https://element-plus.org/en-US/component/checkbox.html"
	}, (0, vue.computed)(() => !!props.falseLabel));
	return {
		inputId,
		isLabeledByFormItem,
		isChecked,
		isDisabled,
		isFocused,
		checkboxButtonSize,
		checkboxSize,
		hasOwnLabel,
		model,
		actualValue,
		handleChange,
		onClickRoot
	};
};

//#endregion
exports.useCheckbox = useCheckbox;
//# sourceMappingURL=use-checkbox.js.map