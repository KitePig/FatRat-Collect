Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_constants = require('../../../time-picker/src/constants.js');
const require_utils = require('../utils.js');
let vue = require("vue");

//#region ../../packages/components/date-picker-panel/src/composables/use-panel-date-range.ts
const usePanelDateRange = (props, emit, leftDate, rightDate) => {
	const leftCurrentView = (0, vue.ref)("date");
	const leftCurrentViewRef = (0, vue.ref)();
	const rightCurrentView = (0, vue.ref)("date");
	const rightCurrentViewRef = (0, vue.ref)();
	const { disabledDate } = (0, vue.inject)(require_constants.PICKER_BASE_INJECTION_KEY).props;
	const { t, lang } = require_index.useLocale();
	const leftYear = (0, vue.computed)(() => {
		return leftDate.value.year();
	});
	const leftMonth = (0, vue.computed)(() => {
		return leftDate.value.month();
	});
	const rightYear = (0, vue.computed)(() => {
		return rightDate.value.year();
	});
	const rightMonth = (0, vue.computed)(() => {
		return rightDate.value.month();
	});
	function computedYearLabel(currentView, yearValue) {
		const yearTranslation = t("el.datepicker.year");
		if (currentView.value === "year") {
			const startYear = Math.floor(yearValue.value / 10) * 10;
			return yearTranslation ? `${startYear} ${yearTranslation} - ${startYear + 9} ${yearTranslation}` : `${startYear} - ${startYear + 9}`;
		}
		return `${yearValue.value} ${yearTranslation}`;
	}
	function focusPicker(currentViewRef) {
		currentViewRef?.focus();
	}
	async function showPicker(pickerType, view) {
		if (props.disabled) return;
		const currentView = pickerType === "left" ? leftCurrentView : rightCurrentView;
		const currentViewRef = pickerType === "left" ? leftCurrentViewRef : rightCurrentViewRef;
		currentView.value = view;
		await (0, vue.nextTick)();
		focusPicker(currentViewRef.value);
	}
	async function handlePick(mode, pickerType, value) {
		if (props.disabled) return;
		const isLeftPicker = pickerType === "left";
		const startDate = isLeftPicker ? leftDate : rightDate;
		const endDate = isLeftPicker ? rightDate : leftDate;
		const currentView = isLeftPicker ? leftCurrentView : rightCurrentView;
		const currentViewRef = isLeftPicker ? leftCurrentViewRef : rightCurrentViewRef;
		if (mode === "year") startDate.value = require_utils.getValidDateOfYear(startDate.value.year(value), lang.value, disabledDate);
		if (mode === "month") startDate.value = require_utils.getValidDateOfMonth(startDate.value, startDate.value.year(), value, lang.value, disabledDate);
		if (!props.unlinkPanels) endDate.value = pickerType === "left" ? startDate.value.add(1, "month") : startDate.value.subtract(1, "month");
		currentView.value = mode === "year" ? "month" : "date";
		await (0, vue.nextTick)();
		focusPicker(currentViewRef.value);
		handlePanelChange(mode);
	}
	function handlePanelChange(mode) {
		emit("panel-change", [leftDate.value.toDate(), rightDate.value.toDate()], mode);
	}
	function adjustDateByView(currentView, date, forward) {
		const action = forward ? "add" : "subtract";
		return currentView === "year" ? date[action](10, "year") : date[action](1, "year");
	}
	return {
		leftCurrentView,
		rightCurrentView,
		leftCurrentViewRef,
		rightCurrentViewRef,
		leftYear,
		rightYear,
		leftMonth,
		rightMonth,
		leftYearLabel: (0, vue.computed)(() => computedYearLabel(leftCurrentView, leftYear)),
		rightYearLabel: (0, vue.computed)(() => computedYearLabel(rightCurrentView, rightYear)),
		showLeftPicker: (view) => showPicker("left", view),
		showRightPicker: (view) => showPicker("right", view),
		handleLeftYearPick: (year) => handlePick("year", "left", year),
		handleRightYearPick: (year) => handlePick("year", "right", year),
		handleLeftMonthPick: (month) => handlePick("month", "left", month),
		handleRightMonthPick: (month) => handlePick("month", "right", month),
		handlePanelChange,
		adjustDateByView
	};
};

//#endregion
exports.usePanelDateRange = usePanelDateRange;
//# sourceMappingURL=use-panel-date-range.js.map