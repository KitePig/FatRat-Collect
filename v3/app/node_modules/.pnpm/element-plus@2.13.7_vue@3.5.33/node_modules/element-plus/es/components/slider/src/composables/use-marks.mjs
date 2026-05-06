import { debugWarn } from "../../../../utils/error.mjs";
import { computed, watchEffect } from "vue";

//#region ../../packages/components/slider/src/composables/use-marks.ts
const useMarks = (props) => {
	const markList = computed(() => {
		if (!props.marks) return [];
		return Object.keys(props.marks).map(Number.parseFloat).sort((a, b) => a - b).filter((point) => point <= props.max && point >= props.min).map((point) => ({
			point,
			position: (point - props.min) * 100 / (props.max - props.min),
			mark: props.marks[point]
		}));
	});
	watchEffect(() => {
		if (props.step === "mark" && !props.marks) debugWarn("ElSlider", "marks prop must be provided when step is mark");
		if (props.marks) {
			const keys = Object.keys(props.marks);
			const validPoints = markList.value.map((m) => m.point);
			const invalidKeys = keys.filter((key) => {
				const parsed = Number.parseFloat(key);
				return Number.isNaN(parsed) || !validPoints.includes(parsed);
			});
			if (invalidKeys.length > 0) debugWarn("ElSlider", `Some marks keys are invalid (not a number or out of [min, max]): [${invalidKeys.map((k) => `'${k}'`).join(", ")}] and will be ignored.`);
		}
	});
	return markList;
};

//#endregion
export { useMarks };
//# sourceMappingURL=use-marks.mjs.map