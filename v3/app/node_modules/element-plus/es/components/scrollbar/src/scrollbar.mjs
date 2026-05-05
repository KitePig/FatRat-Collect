import { isNumber } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";

//#region ../../packages/components/scrollbar/src/scrollbar.ts
/**
* @deprecated Removed after 3.0.0, Use `ScrollbarProps` instead.
*/
const scrollbarProps = buildProps({
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
		type: definePropType([
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
	...useAriaProps(["ariaLabel", "ariaOrientation"])
});
const scrollbarEmits = {
	"end-reached": (direction) => [
		"left",
		"right",
		"top",
		"bottom"
	].includes(direction),
	scroll: ({ scrollTop, scrollLeft }) => [scrollTop, scrollLeft].every(isNumber)
};

//#endregion
export { scrollbarEmits, scrollbarProps };
//# sourceMappingURL=scrollbar.mjs.map