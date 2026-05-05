import { EVENT_CODE } from "../../../constants/aria.mjs";
import { isBoolean } from "../../../utils/types.mjs";
import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";
import { dropdownProps } from "../../dropdown/src/dropdown.mjs";

//#region ../../packages/components/popover/src/popover.ts
/**
* @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
*/
const popoverProps = buildProps({
	trigger: useTooltipTriggerProps.trigger,
	triggerKeys: useTooltipTriggerProps.triggerKeys,
	placement: dropdownProps.placement,
	disabled: useTooltipTriggerProps.disabled,
	visible: useTooltipContentProps.visible,
	transition: useTooltipContentProps.transition,
	popperOptions: dropdownProps.popperOptions,
	tabindex: dropdownProps.tabindex,
	content: useTooltipContentProps.content,
	popperStyle: useTooltipContentProps.popperStyle,
	popperClass: useTooltipContentProps.popperClass,
	enterable: {
		...useTooltipContentProps.enterable,
		default: true
	},
	effect: {
		...useTooltipContentProps.effect,
		default: "light"
	},
	teleported: useTooltipContentProps.teleported,
	appendTo: useTooltipContentProps.appendTo,
	title: String,
	width: {
		type: [String, Number],
		default: 150
	},
	offset: {
		type: Number,
		default: void 0
	},
	showAfter: {
		type: Number,
		default: 0
	},
	hideAfter: {
		type: Number,
		default: 200
	},
	autoClose: {
		type: Number,
		default: 0
	},
	showArrow: {
		type: Boolean,
		default: true
	},
	persistent: {
		type: Boolean,
		default: true
	},
	"onUpdate:visible": { type: Function }
});
const popoverEmits = {
	"update:visible": (value) => isBoolean(value),
	"before-enter": () => true,
	"before-leave": () => true,
	"after-enter": () => true,
	"after-leave": () => true
};
/**
* @description default values for PopoverProps
*/
const popoverPropsDefaults = {
	trigger: "hover",
	triggerKeys: () => [
		EVENT_CODE.enter,
		EVENT_CODE.numpadEnter,
		EVENT_CODE.space
	],
	placement: "bottom",
	visible: null,
	popperOptions: () => ({}),
	tabindex: 0,
	content: "",
	popperStyle: void 0,
	enterable: true,
	effect: "light",
	teleported: true,
	width: 150,
	offset: void 0,
	showAfter: 0,
	hideAfter: 200,
	autoClose: 0,
	showArrow: true,
	persistent: true
};

//#endregion
export { popoverEmits, popoverProps, popoverPropsDefaults };
//# sourceMappingURL=popover.mjs.map