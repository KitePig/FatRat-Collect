Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_index = require('../../../hooks/use-aria/index.js');
const require_arrow = require('./arrow.js');
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/components/popper/src/content.ts
const POSITIONING_STRATEGIES = ["fixed", "absolute"];
/**
* @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
*/
const popperCoreConfigProps = require_runtime$1.buildProps({
	boundariesPadding: {
		type: Number,
		default: 0
	},
	fallbackPlacements: {
		type: require_runtime$1.definePropType(Array),
		default: void 0
	},
	gpuAcceleration: {
		type: Boolean,
		default: true
	},
	offset: {
		type: Number,
		default: 12
	},
	placement: {
		type: String,
		values: _popperjs_core.placements,
		default: "bottom"
	},
	popperOptions: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	strategy: {
		type: String,
		values: POSITIONING_STRATEGIES,
		default: "absolute"
	}
});
/**
* @deprecated Removed after 3.0.0, Use `PopperContentProps` instead.
*/
const popperContentProps = require_runtime$1.buildProps({
	...popperCoreConfigProps,
	...require_arrow.popperArrowProps,
	id: String,
	style: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	className: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	effect: {
		type: require_runtime$1.definePropType(String),
		default: "dark"
	},
	visible: Boolean,
	enterable: {
		type: Boolean,
		default: true
	},
	pure: Boolean,
	focusOnShow: Boolean,
	trapping: Boolean,
	popperClass: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	popperStyle: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	referenceEl: { type: require_runtime$1.definePropType(Object) },
	triggerTargetEl: { type: require_runtime$1.definePropType(Object) },
	stopPopperMouseEvent: {
		type: Boolean,
		default: true
	},
	virtualTriggering: Boolean,
	zIndex: Number,
	...require_index.useAriaProps(["ariaLabel"]),
	loop: Boolean
});
const popperCoreConfigPropsDefaults = {
	boundariesPadding: 0,
	gpuAcceleration: true,
	offset: 12,
	placement: "bottom",
	popperOptions: () => ({}),
	strategy: "absolute"
};
const popperContentPropsDefaults = {
	...popperCoreConfigPropsDefaults,
	...require_arrow.popperArrowPropsDefaults,
	effect: "dark",
	enterable: true,
	stopPopperMouseEvent: true,
	visible: false,
	pure: false,
	focusOnShow: false,
	trapping: false,
	virtualTriggering: false,
	loop: false,
	style: void 0,
	popperStyle: void 0
};
const popperContentEmits = {
	mouseenter: (evt) => evt instanceof MouseEvent,
	mouseleave: (evt) => evt instanceof MouseEvent,
	focus: () => true,
	blur: () => true,
	close: () => true
};
/** @deprecated use `popperCoreConfigProps` instead, and it will be deprecated in the next major version */
const usePopperCoreConfigProps = popperCoreConfigProps;
/** @deprecated use `popperContentProps` instead, and it will be deprecated in the next major version */
const usePopperContentProps = popperContentProps;
/** @deprecated use `popperContentEmits` instead, and it will be deprecated in the next major version */
const usePopperContentEmits = popperContentEmits;

//#endregion
exports.popperContentEmits = popperContentEmits;
exports.popperContentProps = popperContentProps;
exports.popperContentPropsDefaults = popperContentPropsDefaults;
exports.popperCoreConfigProps = popperCoreConfigProps;
exports.popperCoreConfigPropsDefaults = popperCoreConfigPropsDefaults;
exports.usePopperContentEmits = usePopperContentEmits;
exports.usePopperContentProps = usePopperContentProps;
exports.usePopperCoreConfigProps = usePopperCoreConfigProps;
//# sourceMappingURL=content.js.map