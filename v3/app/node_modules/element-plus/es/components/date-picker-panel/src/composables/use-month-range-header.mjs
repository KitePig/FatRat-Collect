import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { computed } from "vue";

//#region ../../packages/components/date-picker-panel/src/composables/use-month-range-header.ts
const useMonthRangeHeader = ({ unlinkPanels, leftDate, rightDate }) => {
	const { t } = useLocale();
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
		leftLabel: computed(() => {
			return `${leftDate.value.year()} ${t("el.datepicker.year")}`;
		}),
		rightLabel: computed(() => {
			return `${rightDate.value.year()} ${t("el.datepicker.year")}`;
		}),
		leftYear: computed(() => {
			return leftDate.value.year();
		}),
		rightYear: computed(() => {
			return rightDate.value.year() === leftDate.value.year() ? leftDate.value.year() + 1 : rightDate.value.year();
		})
	};
};

//#endregion
export { useMonthRangeHeader };
//# sourceMappingURL=use-month-range-header.mjs.map