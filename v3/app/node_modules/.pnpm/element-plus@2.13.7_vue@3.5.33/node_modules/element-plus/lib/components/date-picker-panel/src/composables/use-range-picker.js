Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_constants = require('../constants.js');
const require_utils = require('../utils.js');
const require_use_shortcut = require('./use-shortcut.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let dayjs = require("dayjs");
dayjs = require_runtime.__toESM(dayjs);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/date-picker-panel/src/composables/use-range-picker.ts
const useRangePicker = (props, { defaultValue, defaultTime, leftDate, rightDate, step, unit, sortDates }) => {
	const { emit } = (0, vue.getCurrentInstance)();
	const { pickerNs } = (0, vue.inject)(require_constants.ROOT_PICKER_INJECTION_KEY);
	const drpNs = require_index$1.useNamespace("date-range-picker");
	const { t, lang } = require_index.useLocale();
	const handleShortcutClick = require_use_shortcut.useShortcut(lang);
	const minDate = (0, vue.ref)();
	const maxDate = (0, vue.ref)();
	const rangeState = (0, vue.ref)({
		endDate: null,
		selecting: false
	});
	const handleChangeRange = (val) => {
		rangeState.value = val;
	};
	const handleRangeConfirm = (visible = false) => {
		const _minDate = (0, vue.unref)(minDate);
		const _maxDate = (0, vue.unref)(maxDate);
		if (require_utils.isValidRange([_minDate, _maxDate])) emit("pick", [_minDate, _maxDate], visible);
	};
	const onSelect = (selecting) => {
		rangeState.value.selecting = selecting;
		if (!selecting) rangeState.value.endDate = null;
	};
	const parseValue = (parsedValue) => {
		if ((0, _vue_shared.isArray)(parsedValue) && parsedValue.length === 2) {
			const [start, end] = parsedValue;
			minDate.value = start;
			leftDate.value = start;
			maxDate.value = end;
			sortDates((0, vue.unref)(minDate), (0, vue.unref)(maxDate));
		} else restoreDefault();
	};
	const restoreDefault = () => {
		let [start, end] = require_utils.getDefaultValue((0, vue.unref)(defaultValue), {
			lang: (0, vue.unref)(lang),
			step,
			unit,
			unlinkPanels: props.unlinkPanels
		});
		const getShift = (day) => {
			return day.diff(day.startOf("d"), "ms");
		};
		const maybeTimes = (0, vue.unref)(defaultTime);
		if (maybeTimes) {
			let leftShift = 0;
			let rightShift = 0;
			if ((0, _vue_shared.isArray)(maybeTimes)) {
				const [timeStart, timeEnd] = maybeTimes.map(dayjs.default);
				leftShift = getShift(timeStart);
				rightShift = getShift(timeEnd);
			} else {
				const shift = getShift((0, dayjs.default)(maybeTimes));
				leftShift = shift;
				rightShift = shift;
			}
			start = start.startOf("d").add(leftShift, "ms");
			end = end.startOf("d").add(rightShift, "ms");
		}
		minDate.value = void 0;
		maxDate.value = void 0;
		leftDate.value = start;
		rightDate.value = end;
	};
	(0, vue.watch)(defaultValue, (val) => {
		if (val) restoreDefault();
	}, { immediate: true });
	(0, vue.watch)(() => props.parsedValue, (parsedValue) => {
		if (!parsedValue?.length || !(0, lodash_unified.isEqual)(parsedValue, [minDate.value, maxDate.value])) parseValue(parsedValue);
	}, { immediate: true });
	(0, vue.watch)(() => props.visible, () => {
		if (props.visible) parseValue(props.parsedValue);
	}, { immediate: true });
	return {
		minDate,
		maxDate,
		rangeState,
		lang,
		ppNs: pickerNs,
		drpNs,
		handleChangeRange,
		handleRangeConfirm,
		handleShortcutClick,
		onSelect,
		parseValue,
		t
	};
};

//#endregion
exports.useRangePicker = useRangePicker;
//# sourceMappingURL=use-range-picker.js.map