Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-aria/index.js');

//#region ../../packages/components/scrollbar/src/scrollbar.ts
/**
* @deprecated Removed after 3.0.0, Use `ScrollbarProps` instead.
*/
const scrollbarProps = require_runtime.buildProps({
	distance: {
		type: Number,
		default: 0
	},
	height: {
		type: [String, Number],
		default: ""
	},
	maxHeight: {
		type: [String, Number],
		default: ""
	},
	native: Boolean,
	wrapStyle: {
		type: require_runtime.definePropType([
			String,
			Object,
			Array
		]),
		default: ""
	},
	wrapClass: {
		type: [String, Array],
		default: ""
	},
	viewClass: {
		type: [String, Array],
		default: ""
	},
	viewStyle: {
		type: [
			String,
			Array,
			Object
		],
		default: ""
	},
	noresize: Boolean,
	tag: {
		type: String,
		default: "div"
	},
	always: Boolean,
	minSize: {
		type: Number,
		default: 20
	},
	tabindex: {
		type: [String, Number],
		default: void 0
	},
	id: String,
	role: String,
	...require_index.useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
	"end-reached": (direction) => [
		"left",
		"right",
		"top",
		"bottom"
	].includes(direction),
	scroll: ({ scrollTop, scrollLeft }) => [scrollTop, scrollLeft].every(require_types.isNumber)
};

//#endregion
exports.scrollbarEmits = scrollbarEmits;
exports.scrollbarProps = scrollbarProps;
//# sourceMappingURL=scrollbar.js.map