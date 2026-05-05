Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/carousel/src/carousel.ts
/**
* @deprecated Removed after 3.0.0, Use `CarouselProps` instead.
*/
const carouselProps = require_runtime.buildProps({
	initialIndex: {
		type: Number,
		default: 0
	},
	height: {
		type: String,
		default: ""
	},
	trigger: {
		type: String,
		values: ["hover", "click"],
		default: "hover"
	},
	autoplay: {
		type: Boolean,
		default: true
	},
	interval: {
		type: Number,
		default: 3e3
	},
	indicatorPosition: {
		type: String,
		values: [
			"",
			"none",
			"outside"
		],
		default: ""
	},
	arrow: {
		type: String,
		values: [
			"always",
			"hover",
			"never"
		],
		default: "hover"
	},
	type: {
		type: String,
		values: ["", "card"],
		default: ""
	},
	cardScale: {
		type: Number,
		default: .83
	},
	loop: {
		type: Boolean,
		default: true
	},
	direction: {
		type: String,
		values: ["horizontal", "vertical"],
		default: "horizontal"
	},
	pauseOnHover: {
		type: Boolean,
		default: true
	},
	motionBlur: Boolean
});
const carouselEmits = { change: (current, prev) => [current, prev].every(require_types.isNumber) };

//#endregion
exports.carouselEmits = carouselEmits;
exports.carouselProps = carouselProps;
//# sourceMappingURL=carousel.js.map