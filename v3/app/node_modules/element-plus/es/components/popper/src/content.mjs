import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { popperArrowProps, popperArrowPropsDefaults } from "./arrow.mjs";
import { placements } from "@popperjs/core";

//#region ../../packages/components/popper/src/content.ts
const POSITIONING_STRATEGIES = ["fixed", "absolute"];
/**
* @deprecated Removed after 3.0.0, Use `PopperCoreConfigProps` instead.
*/
const popperCoreConfigProps = buildProps({
	boundariesPadding: {
		type: Number,
		default: 0
	},
	fallbackPlacements: {
		type: definePropType(Array),
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
		values: placements,
		default: "bottom"
	},
	popperOptions: {
		type: definePropType(Object),
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
const popperContentProps = buildProps({
	...popperCoreConfigProps,
	...popperArrowProps,
	id: String,
	style: { type: definePropType([
		String,
		Array,
		Object
	]) },
	className: { type: definePropType([
		String,
		Array,
		Object
	]) },
	effect: {
		type: definePropType(String),
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
	popperClass: { type: definePropType([
		String,
		Array,
		Object
	]) },
	popperStyle: { type: definePropType([
		String,
		Array,
		Object
	]) },
	referenceEl: { type: definePropType(Object) },
	triggerTargetEl: { type: definePropType(Object) },
	stopPopperMouseEvent: {
		type: Boolean,
		default: true
	},
	virtualTriggering: Boolean,
	zIndex: Number,
	...useAriaProps(["ariaLabel"]),
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
	...popperArrowPropsDefaults,
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
export { popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps };
//# sourceMappingURL=content.mjs.map