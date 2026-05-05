import { makeList } from "../utils.mjs";
import { ref, toValue, watch } from "vue";

//#region ../../packages/components/time-picker/src/composables/use-time-picker.ts
const makeAvailableArr = (disabledList) => {
	const trueOrNumber = (isDisabled, index) => isDisabled || index;
	const getNumber = (predicate) => predicate !== true;
	return disabledList.map(trueOrNumber).filter(getNumber);
};
const getTimeLists = (disabledHours, disabledMinutes, disabledSeconds) => {
	const getHoursList = (role, compare) => {
		return makeList(24, disabledHours && (() => disabledHours?.(role, compare)));
	};
	const getMinutesList = (hour, role, compare) => {
		return makeList(60, disabledMinutes && (() => disabledMinutes?.(hour, role, compare)));
	};
	const getSecondsList = (hour, minute, role, compare) => {
		return makeList(60, disabledSeconds && (() => disabledSeconds?.(hour, minute, role, compare)));
	};
	return {
		getHoursList,
		getMinutesList,
		getSecondsList
	};
};
const buildAvailableTimeSlotGetter = (disabledHours, disabledMinutes, disabledSeconds) => {
	const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(disabledHours, disabledMinutes, disabledSeconds);
	const getAvailableHours = (role, compare) => {
		return makeAvailableArr(getHoursList(role, compare));
	};
	const getAvailableMinutes = (hour, role, compare) => {
		return makeAvailableArr(getMinutesList(hour, role, compare));
	};
	const getAvailableSeconds = (hour, minute, role, compare) => {
		return makeAvailableArr(getSecondsList(hour, minute, role, compare));
	};
	return {
		getAvailableHours,
		getAvailableMinutes,
		getAvailableSeconds
	};
};
const useOldValue = (props, options) => {
	const oldValue = ref(props.parsedValue);
	watch(() => props.visible, (val) => {
		const modelValue = toValue(options.modelValue);
		const valueOnClear = toValue(options.valueOnClear);
		if (val && modelValue === valueOnClear) {
			oldValue.value = valueOnClear;
			return;
		}
		if (!val) oldValue.value = props.parsedValue;
	});
	return oldValue;
};

//#endregion
export { buildAvailableTimeSlotGetter, getTimeLists, useOldValue };
//# sourceMappingURL=use-time-picker.mjs.map