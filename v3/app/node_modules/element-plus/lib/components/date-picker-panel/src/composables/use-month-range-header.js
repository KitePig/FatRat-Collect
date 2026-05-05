Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
let vue = require("vue");

//#region ../../packages/components/date-picker-panel/src/composables/use-month-range-header.ts
const useMonthRangeHeader = ({ unlinkPanels, leftDate, rightDate }) => {
	const { t } = require_index.useLocale();
	const leftPrevYear = () => {
		leftDate.value = leftDate.value.subtract(1, "year");
		if (!unlinkPanels.value) rightDate.value = rightDate.value.subtract(1, "year");
	};
	const rightNextYear = () => {
		if (!unlinkPanels.value) leftDate.value = leftDate.value.add(1, "year");
		rightDate.value = rightDate.value.add(1, "year");
	};
	const leftNextYear = () => {
		leftDate.value = leftDate.value.add(1, "year");
	};
	const rightPrevYear = () => {
		rightDate.value = rightDate.value.subtract(1, "year");
	};
	return {
		leftPrevYear,
		rightNextYear,
		leftNextYear,
		rightPrevYear,
		leftLabel: (0, vue.computed)(() => {
			return `${leftDate.value.year()} ${t("el.datepicker.year")}`;
		}),
		rightLabel: (0, vue.computed)(() => {
			return `${rightDate.value.year()} ${t("el.datepicker.year")}`;
		}),
		leftYear: (0, vue.computed)(() => {
			return leftDate.value.year();
		}),
		rightYear: (0, vue.computed)(() => {
			return rightDate.value.year() === leftDate.value.year() ? leftDate.value.year() + 1 : rightDate.value.year();
		})
	};
};

//#endregion
exports.useMonthRangeHeader = useMonthRangeHeader;
//# sourceMappingURL=use-month-range-header.js.map