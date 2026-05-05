Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-deprecated/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/radio/src/use-radio.ts
const useRadio = (props, emit) => {
	const radioRef = (0, vue.ref)();
	const radioGroup = (0, vue.inject)(require_constants.radioGroupKey, void 0);
	const isGroup = (0, vue.computed)(() => !!radioGroup);
	const actualValue = (0, vue.computed)(() => {
		if (!require_types.isPropAbsent(props.value)) return props.value;
		return props.label;
	});
	const modelValue = (0, vue.computed)({
		get() {
			return isGroup.value ? radioGroup.modelValue : props.modelValue;
		},
		set(val) {
			if (isGroup.value) radioGroup.changeEvent(val);
			else emit && emit(require_event.UPDATE_MODEL_EVENT, val);
			radioRef.value.checked = props.modelValue === actualValue.value;
		}
	});
	const size = require_use_form_common_props.useFormSize((0, vue.computed)(() => radioGroup?.size));
	const disabled = require_use_form_common_props.useFormDisabled((0, vue.computed)(() => radioGroup?.disabled));
	const focus = (0, vue.ref)(false);
	const tabIndex = (0, vue.computed)(() => {
		return disabled.value || isGroup.value && modelValue.value !== actualValue.value ? -1 : 0;
	});
	require_index.useDeprecated({
		from: "label act as value",
		replacement: "value",
		version: "3.0.0",
		scope: "el-radio",
		ref: "https://element-plus.org/en-US/component/radio.html"
	}, (0, vue.computed)(() => isGroup.value && require_types.isPropAbsent(props.value)));
	return {
		radioRef,
		isGroup,
		radioGroup,
		focus,
		size,
		disabled,
		tabIndex,
		modelValue,
		actualValue
	};
};

//#endregion
exports.useRadio = useRadio;
//# sourceMappingURL=use-radio.js.map