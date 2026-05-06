Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_utils = require('../utils.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/time-picker/src/composables/use-common-picker.ts
const useCommonPicker = (props, emit) => {
	const { lang } = require_index.useLocale();
	const pickerVisible = (0, vue.ref)(false);
	const pickerActualVisible = (0, vue.ref)(false);
	const userInput = (0, vue.ref)(null);
	const valueIsEmpty = (0, vue.computed)(() => {
		const { modelValue } = props;
		return !modelValue || (0, _vue_shared.isArray)(modelValue) && !modelValue.filter(Boolean).length;
	});
	const emitInput = (input) => {
		if (!require_utils.valueEquals(props.modelValue, input)) {
			let formatted;
			if ((0, _vue_shared.isArray)(input)) formatted = input.map((item) => require_utils.formatter(item, props.valueFormat, lang.value));
			else if (input) formatted = require_utils.formatter(input, props.valueFormat, lang.value);
			emit(require_event.UPDATE_MODEL_EVENT, input ? formatted : input, lang.value);
		}
	};
	const parsedValue = (0, vue.computed)(() => {
		let dayOrDays;
		if (valueIsEmpty.value) {
			if (pickerOptions.value.getDefaultValue) dayOrDays = pickerOptions.value.getDefaultValue();
		} else if ((0, _vue_shared.isArray)(props.modelValue)) dayOrDays = props.modelValue.map((d) => require_utils.parseDate(d, props.valueFormat, lang.value));
		else dayOrDays = require_utils.parseDate(props.modelValue ?? "", props.valueFormat, lang.value);
		if (pickerOptions.value.getRangeAvailableTime) {
			const availableResult = pickerOptions.value.getRangeAvailableTime(dayOrDays);
			if (!(0, lodash_unified.isEqual)(availableResult, dayOrDays)) {
				dayOrDays = availableResult;
				if (!valueIsEmpty.value) emitInput(require_utils.dayOrDaysToDate(dayOrDays));
			}
		}
		if ((0, _vue_shared.isArray)(dayOrDays) && dayOrDays.some((day) => !day)) dayOrDays = [];
		return dayOrDays;
	});
	const pickerOptions = (0, vue.ref)({});
	const onSetPickerOption = (e) => {
		pickerOptions.value[e[0]] = e[1];
		pickerOptions.value.panelReady = true;
	};
	const onCalendarChange = (e) => {
		emit("calendar-change", e);
	};
	const onPanelChange = (value, mode, view) => {
		emit("panel-change", value, mode, view);
	};
	const onPick = (date = "", visible = false) => {
		pickerVisible.value = visible;
		let result;
		if ((0, _vue_shared.isArray)(date)) result = date.map((_) => _.toDate());
		else result = date ? date.toDate() : date;
		userInput.value = null;
		emitInput(result);
	};
	return {
		parsedValue,
		pickerActualVisible,
		pickerOptions,
		pickerVisible,
		userInput,
		valueIsEmpty,
		emitInput,
		onCalendarChange,
		onPanelChange,
		onPick,
		onSetPickerOption
	};
};

//#endregion
exports.useCommonPicker = useCommonPicker;
//# sourceMappingURL=use-common-picker.js.map