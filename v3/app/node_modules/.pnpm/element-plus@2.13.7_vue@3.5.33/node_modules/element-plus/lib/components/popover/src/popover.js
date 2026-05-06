Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_aria = require('../../../constants/aria.js');
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_content = require('../../tooltip/src/content.js');
const require_trigger = require('../../tooltip/src/trigger.js');
const require_dropdown = require('../../dropdown/src/dropdown.js');

//#region ../../packages/components/popover/src/popover.ts
/**
* @deprecated Removed after 3.0.0, Use `PopoverProps` instead.
*/
const popoverProps = require_runtime.buildProps({
	trigger: require_trigger.useTooltipTriggerProps.trigger,
	triggerKeys: require_trigger.useTooltipTriggerProps.triggerKeys,
	placement: require_dropdown.dropdownProps.placement,
	disabled: require_trigger.useTooltipTriggerProps.disabled,
	visible: require_content.useTooltipContentProps.visible,
	transition: require_content.useTooltipContentProps.transition,
	popperOptions: require_dropdown.dropdownProps.popperOptions,
	tabindex: require_dropdown.dropdownProps.tabindex,
	content: require_content.useTooltipContentProps.content,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	popperClass: require_content.useTooltipContentProps.popperClass,
	enterable: {
		...require_content.useTooltipContentProps.enterable,
		default: true
	},
	effect: {
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	teleported: require_content.useTooltipContentProps.teleported,
	appendTo: require_content.useTooltipContentProps.appendTo,
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
	"update:visible": (value) => require_types.isBoolean(value),
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
		require_aria.EVENT_CODE.enter,
		require_aria.EVENT_CODE.numpadEnter,
		require_aria.EVENT_CODE.space
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
exports.popoverEmits = popoverEmits;
exports.popoverProps = popoverProps;
exports.popoverPropsDefaults = popoverPropsDefaults;
//# sourceMappingURL=popover.js.map