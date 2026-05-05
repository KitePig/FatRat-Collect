Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

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
const tourContentProps = require_runtime.buildProps({
	placement: {
		type: require_runtime.definePropType(String),
		values: tourPlacements,
		default: "bottom"
	},
	reference: {
		type: require_runtime.definePropType(Object),
		default: null
	},
	strategy: {
		type: require_runtime.definePropType(String),
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
exports.tourContentEmits = tourContentEmits;
exports.tourContentProps = tourContentProps;
exports.tourPlacements = tourPlacements;
exports.tourStrategies = tourStrategies;
//# sourceMappingURL=content.js.map