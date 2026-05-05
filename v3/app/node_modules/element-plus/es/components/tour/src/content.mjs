import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";

//#region ../../packages/components/tour/src/content.ts
const tourStrategies = ["absolute", "fixed"];
const tourPlacements = [
	"top-start",
	"top-end",
	"top",
	"bottom-start",
	"bottom-end",
	"bottom",
	"left-start",
	"left-end",
	"left",
	"right-start",
	"right-end",
	"right"
];
/**
* @deprecated Removed after 3.0.0, Use `TourContentProps` instead.
*/
const tourContentProps = buildProps({
	placement: {
		type: definePropType(String),
		values: tourPlacements,
		default: "bottom"
	},
	reference: {
		type: definePropType(Object),
		default: null
	},
	strategy: {
		type: definePropType(String),
		values: tourStrategies,
		default: "absolute"
	},
	offset: {
		type: Number,
		default: 10
	},
	showArrow: Boolean,
	zIndex: {
		type: Number,
		default: 2001
	}
});
const tourContentEmits = { close: () => true };

//#endregion
export { tourContentEmits, tourContentProps, tourPlacements, tourStrategies };
//# sourceMappingURL=content.mjs.map