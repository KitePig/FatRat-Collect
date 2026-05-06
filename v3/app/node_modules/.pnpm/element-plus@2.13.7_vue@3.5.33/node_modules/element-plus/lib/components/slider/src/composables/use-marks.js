Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../../utils/error.js');
let vue = require("vue");

//#region ../../packages/components/slider/src/composables/use-marks.ts
const useMarks = (props) => {
	const markList = (0, vue.computed)(() => {
		if (!props.marks) return [];
		return Object.keys(props.marks).map(Number.parseFloat).sort((a, b) => a - b).filter((point) => point <= props.max && point >= props.min).map((point) => ({
			point,
			position: (point - props.min) * 100 / (props.max - props.min),
			mark: props.marks[point]
		}));
	});
	(0, vue.watchEffect)(() => {
		if (props.step === "mark" && !props.marks) require_error.debugWarn("ElSlider", "marks prop must be provided when step is mark");
		if (props.marks) {
			const keys = Object.keys(props.marks);
			const validPoints = markList.value.map((m) => m.point);
			const invalidKeys = keys.filter((key) => {
				const parsed = Number.parseFloat(key);
				return Number.isNaN(parsed) || !validPoints.includes(parsed);
			});
			if (invalidKeys.length > 0) require_error.debugWarn("ElSlider", `Some marks keys are invalid (not a number or out of [min, max]): [${invalidKeys.map((k) => `'${k}'`).join(", ")}] and will be ignored.`);
		}
	});
	return markList;
};

//#endregion
exports.useMarks = useMarks;
//# sourceMappingURL=use-marks.js.map