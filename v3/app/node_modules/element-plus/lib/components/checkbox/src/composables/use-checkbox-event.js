Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_error = require('../../../../utils/error.js');
const require_use_form_item = require('../../../form/src/hooks/use-form-item.js');
const require_constants = require('../constants.js');
let vue = require("vue");

//#region ../../packages/components/checkbox/src/composables/use-checkbox-event.ts
const useCheckboxEvent = (props, { model, isLimitExceeded, hasOwnLabel, isDisabled, isLabeledByFormItem }) => {
	const checkboxGroup = (0, vue.inject)(require_constants.checkboxGroupContextKey, void 0);
	const { formItem } = require_use_form_item.useFormItem();
	const { emit } = (0, vue.getCurrentInstance)();
	function getLabeledValue(value) {
		return [
			true,
			props.trueValue,
			props.trueLabel
		].includes(value) ? props.trueValue ?? props.trueLabel ?? true : props.falseValue ?? props.falseLabel ?? false;
	}
	function emitChangeEvent(checked, e) {
		emit(require_event.CHANGE_EVENT, getLabeledValue(checked), e);
	}
	function handleChange(e) {
		if (isLimitExceeded.value) return;
		const target = e.target;
		emit(require_event.CHANGE_EVENT, getLabeledValue(target.checked), e);
	}
	async function onClickRoot(e) {
		if (isLimitExceeded.value) return;
		if (!hasOwnLabel.value && !isDisabled.value && isLabeledByFormItem.value) {
			if (!e.composedPath().some((item) => item.tagName === "LABEL")) {
				model.value = getLabeledValue([
					false,
					props.falseValue,
					props.falseLabel
				].includes(model.value));
				await (0, vue.nextTick)();
				emitChangeEvent(model.value, e);
			}
		}
	}
	const validateEvent = (0, vue.computed)(() => checkboxGroup?.validateEvent || props.validateEvent);
	(0, vue.watch)(() => props.modelValue, () => {
		if (validateEvent.value) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
	});
	return {
		handleChange,
		onClickRoot
	};
};

//#endregion
exports.useCheckboxEvent = useCheckboxEvent;
//# sourceMappingURL=use-checkbox-event.js.map