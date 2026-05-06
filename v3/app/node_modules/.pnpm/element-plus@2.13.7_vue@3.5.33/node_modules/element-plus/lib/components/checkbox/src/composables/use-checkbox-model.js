Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_types = require('../../../../utils/types.js');
const require_constants = require('../constants.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/checkbox/src/composables/use-checkbox-model.ts
const useCheckboxModel = (props) => {
	const selfModel = (0, vue.ref)(false);
	const { emit, vnode } = (0, vue.getCurrentInstance)();
	const checkboxGroup = (0, vue.inject)(require_constants.checkboxGroupContextKey, void 0);
	const isGroup = (0, vue.computed)(() => require_types.isUndefined(checkboxGroup) === false);
	const isLimitExceeded = (0, vue.ref)(false);
	const isControlled = (0, vue.computed)(() => {
		const rawProps = vnode.props ?? {};
		return "modelValue" in rawProps || "model-value" in rawProps;
	});
	const model = (0, vue.computed)({
		get() {
			return isGroup.value ? checkboxGroup?.modelValue?.value : !isControlled.value ? selfModel.value : props.modelValue;
		},
		set(val) {
			if (isGroup.value && (0, _vue_shared.isArray)(val)) {
				isLimitExceeded.value = checkboxGroup?.max?.value !== void 0 && val.length > checkboxGroup?.max.value && val.length > model.value.length;
				isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val);
			} else {
				emit(require_event.UPDATE_MODEL_EVENT, val);
				selfModel.value = val;
			}
		}
	});
	return {
		model,
		isGroup,
		isLimitExceeded
	};
};

//#endregion
exports.useCheckboxModel = useCheckboxModel;
//# sourceMappingURL=use-checkbox-model.js.map