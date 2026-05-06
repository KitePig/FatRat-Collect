import { UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import { isArray } from "../../../../utils/types.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { dayOrDaysToDate, formatter, parseDate, valueEquals } from "../utils.mjs";
import { isEqual } from "lodash-unified";
import { computed, ref } from "vue";

//#region ../../packages/components/time-picker/src/composables/use-common-picker.ts
const useCommonPicker = (props, emit) => {
	const { lang } = useLocale();
	const pickerVisible = ref(false);
	const pickerActualVisible = ref(false);
	const userInput = ref(null);
	const valueIsEmpty = computed(() => {
		const { modelValue } = props;
		return !modelValue || isArray(modelValue) && !modelValue.filter(Boolean).length;
	});
	const emitInput = (input) => {
		if (!valueEquals(props.modelValue, input)) {
			let formatted;
			if (isArray(input)) formatted = input.map((item) => formatter(item, props.valueFormat, lang.value));
			else if (input) formatted = formatter(input, props.valueFormat, lang.value);
			emit(UPDATE_MODEL_EVENT, input ? formatted : input, lang.value);
		}
	};
	const parsedValue = computed(() => {
		let dayOrDays;
		if (valueIsEmpty.value) {
			if (pickerOptions.value.getDefaultValue) dayOrDays = pickerOptions.value.getDefaultValue();
		} else if (isArray(props.modelValue)) dayOrDays = props.modelValue.map((d) => parseDate(d, props.valueFormat, lang.value));
		else dayOrDays = parseDate(props.modelValue ?? "", props.valueFormat, lang.value);
		if (pickerOptions.value.getRangeAvailableTime) {
			const availableResult = pickerOptions.value.getRangeAvailableTime(dayOrDays);
			if (!isEqual(availableResult, dayOrDays)) {
				dayOrDays = availableResult;
				if (!valueIsEmpty.value) emitInput(dayOrDaysToDate(dayOrDays));
			}
		}
		if (isArray(dayOrDays) && dayOrDays.some((day) => !day)) dayOrDays = [];
		return dayOrDays;
	});
	const pickerOptions = ref({});
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
		if (isArray(date)) result = date.map((_) => _.toDate());
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
export { useCommonPicker };
//# sourceMappingURL=use-common-picker.mjs.map