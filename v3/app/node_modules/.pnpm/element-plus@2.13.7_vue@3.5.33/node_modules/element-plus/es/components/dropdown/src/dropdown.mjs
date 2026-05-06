import { EVENT_CODE } from "../../../constants/aria.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { roleTypes } from "../../popper/src/popper.mjs";
import { useTooltipContentProps } from "../../tooltip/src/content.mjs";
import { useTooltipTriggerProps } from "../../tooltip/src/trigger.mjs";

//#region ../../packages/components/dropdown/src/dropdown.ts
const dropdownProps = buildProps({
	trigger: {
		...useTooltipTriggerProps.trigger,
		type: definePropType([String, Array])
	},
	triggerKeys: {
		type: definePropType(Array),
		default: () => [
			EVENT_CODE.enter,
			EVENT_CODE.numpadEnter,
			EVENT_CODE.space,
			EVENT_CODE.down
		]
	},
	virtualTriggering: useTooltipTriggerProps.virtualTriggering,
	virtualRef: useTooltipTriggerProps.virtualRef,
	effect: {
		...useTooltipContentProps.effect,
		default: "light"
	},
	type: { type: definePropType(String) },
	placement: {
		type: definePropType(String),
		default: "bottom"
	},
	popperOptions: {
		type: definePropType(Object),
		default: () => ({})
	},
	id: String,
	size: {
		type: String,
		default: ""
	},
	splitButton: Boolean,
	hideOnClick: {
		type: Boolean,
		default: true
	},
	loop: {
		type: Boolean,
		default: true
	},
	showArrow: {
		type: Boolean,
		default: true
	},
	showTimeout: {
		type: Number,
		default: 150
	},
	hideTimeout: {
		type: Number,
		default: 150
	},
	tabindex: {
		type: definePropType([Number, String]),
		default: 0
	},
	maxHeight: {
		type: definePropType([Number, String]),
		default: ""
	},
	popperClass: useTooltipContentProps.popperClass,
	popperStyle: useTooltipContentProps.popperStyle,
	disabled: Boolean,
	role: {
		type: String,
		values: roleTypes,
		default: "menu"
	},
	buttonProps: { type: definePropType(Object) },
	teleported: useTooltipContentProps.teleported,
	appendTo: useTooltipContentProps.appendTo,
	persistent: {
		type: Boolean,
		default: true
	}
});
const dropdownItemProps = buildProps({
	command: {
		type: [
			Object,
			String,
			Number
		],
		default: () => ({})
	},
	disabled: Boolean,
	divided: Boolean,
	textValue: String,
	icon: { type: iconPropType }
});
const dropdownMenuProps = buildProps({ onKeydown: { type: definePropType(Function) } });
const FIRST_KEYS = [
	EVENT_CODE.down,
	EVENT_CODE.pageDown,
	EVENT_CODE.home
];
const LAST_KEYS = [
	EVENT_CODE.up,
	EVENT_CODE.pageUp,
	EVENT_CODE.end
];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

//#endregion
export { FIRST_KEYS, FIRST_LAST_KEYS, LAST_KEYS, dropdownItemProps, dropdownMenuProps, dropdownProps };
//# sourceMappingURL=dropdown.mjs.map