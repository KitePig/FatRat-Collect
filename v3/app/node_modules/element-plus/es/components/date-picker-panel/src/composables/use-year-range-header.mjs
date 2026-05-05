import { computed } from "vue";

//#region ../../packages/components/date-picker-panel/src/composables/use-year-range-header.ts
const useYearRangeHeader = ({ unlinkPanels, leftDate, rightDate }) => {
	const leftPrevYear = () => {
		leftDate.value = leftDate.value.subtract(10, "year");
		if (!unlinkPanels.value) rightDate.value = rightDate.value.subtract(10, "year");
	};
	const rightNextYear = () => {
		if (!unlinkPanels.value) leftDate.value = leftDate.value.add(10, "year");
		rightDate.value = rightDate.value.add(10, "year");
	};
	const leftNextYear = () => {
		leftDate.value = leftDate.value.add(10, "year");
	};
	const rightPrevYear = () => {
		rightDate.value = rightDate.value.subtract(10, "year");
	};
	return {
		leftPrevYear,
		rightNextYear,
		leftNextYear,
		rightPrevYear,
		leftLabel: computed(() => {
			const leftStartDate = Math.floor(leftDate.value.year() / 10) * 10;
			return `${leftStartDate}-${leftStartDate + 9}`;
		}),
		rightLabel: computed(() => {
			const rightStartDate = Math.floor(rightDate.value.year() / 10) * 10;
			return `${rightStartDate}-${rightStartDate + 9}`;
		}),
		leftYear: computed(() => {
			return Math.floor(leftDate.value.year() / 10) * 10 + 9;
		}),
		rightYear: computed(() => {
			return Math.floor(rightDate.value.year() / 10) * 10;
		})
	};
};

//#endregion
export { useYearRangeHeader };
//# sourceMappingURL=use-year-range-header.mjs.map