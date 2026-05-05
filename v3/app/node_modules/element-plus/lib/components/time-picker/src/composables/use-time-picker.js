Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_utils = require('../utils.js');
let vue = require("vue");

//#region ../../packages/components/time-picker/src/composables/use-time-picker.ts
const makeAvailableArr = (disabledList) => {
	const trueOrNumber = (isDisabled, index) => isDisabled || index;
	const getNumber = (predicate) => predicate !== true;
	return disabledList.map(trueOrNumber).filter(getNumber);
};
const getTimeLists = (disabledHours, disabledMinutes, disabledSeconds) => {
	const getHoursList = (role, compare) => {
		return require_utils.makeList(24, disabledHours && (() => disabledHours?.(role, compare)));
	};
	const getMinutesList = (hour, role, compare) => {
		return require_utils.makeList(60, disabledMinutes && (() => disabledMinutes?.(hour, role, compare)));
	};
	const getSecondsList = (hour, minute, role, compare) => {
		return require_utils.makeList(60, disabledSeconds && (() => disabledSeconds?.(hour, minute, role, compare)));
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
	const oldValue = (0, vue.ref)(props.parsedValue);
	(0, vue.watch)(() => props.visible, (val) => {
		const modelValue = (0, vue.toValue)(options.modelValue);
		const valueOnClear = (0, vue.toValue)(options.valueOnClear);
		if (val && modelValue === valueOnClear) {
			oldValue.value = valueOnClear;
			return;
		}
		if (!val) oldValue.value = props.parsedValue;
	});
	return oldValue;
};

//#endregion
exports.buildAvailableTimeSlotGetter = buildAvailableTimeSlotGetter;
exports.getTimeLists = getTimeLists;
exports.useOldValue = useOldValue;
//# sourceMappingURL=use-time-picker.js.map