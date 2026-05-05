Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_aria = require('../../../constants/aria.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_popper = require('../../popper/src/popper.js');
const require_content = require('../../tooltip/src/content.js');
const require_trigger = require('../../tooltip/src/trigger.js');

//#region ../../packages/components/dropdown/src/dropdown.ts
const dropdownProps = require_runtime.buildProps({
	trigger: {
		...require_trigger.useTooltipTriggerProps.trigger,
		type: require_runtime.definePropType([String, Array])
	},
	triggerKeys: {
		type: require_runtime.definePropType(Array),
		default: () => [
			require_aria.EVENT_CODE.enter,
			require_aria.EVENT_CODE.numpadEnter,
			require_aria.EVENT_CODE.space,
			require_aria.EVENT_CODE.down
		]
	},
	virtualTriggering: require_trigger.useTooltipTriggerProps.virtualTriggering,
	virtualRef: require_trigger.useTooltipTriggerProps.virtualRef,
	effect: {
		...require_content.useTooltipContentProps.effect,
		default: "light"
	},
	type: { type: require_runtime.definePropType(String) },
	placement: {
		type: require_runtime.definePropType(String),
		default: "bottom"
	},
	popperOptions: {
		type: require_runtime.definePropType(Object),
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
		type: require_runtime.definePropType([Number, String]),
		default: 0
	},
	maxHeight: {
		type: require_runtime.definePropType([Number, String]),
		default: ""
	},
	popperClass: require_content.useTooltipContentProps.popperClass,
	popperStyle: require_content.useTooltipContentProps.popperStyle,
	disabled: Boolean,
	role: {
		type: String,
		values: require_popper.roleTypes,
		default: "menu"
	},
	buttonProps: { type: require_runtime.definePropType(Object) },
	teleported: require_content.useTooltipContentProps.teleported,
	appendTo: require_content.useTooltipContentProps.appendTo,
	persistent: {
		type: Boolean,
		default: true
	}
});
const dropdownItemProps = require_runtime.buildProps({
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
	icon: { type: require_icon.iconPropType }
});
const dropdownMenuProps = require_runtime.buildProps({ onKeydown: { type: require_runtime.definePropType(Function) } });
const FIRST_KEYS = [
	require_aria.EVENT_CODE.down,
	require_aria.EVENT_CODE.pageDown,
	require_aria.EVENT_CODE.home
];
const LAST_KEYS = [
	require_aria.EVENT_CODE.up,
	require_aria.EVENT_CODE.pageUp,
	require_aria.EVENT_CODE.end
];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

//#endregion
exports.FIRST_KEYS = FIRST_KEYS;
exports.FIRST_LAST_KEYS = FIRST_LAST_KEYS;
exports.LAST_KEYS = LAST_KEYS;
exports.dropdownItemProps = dropdownItemProps;
exports.dropdownMenuProps = dropdownMenuProps;
exports.dropdownProps = dropdownProps;
//# sourceMappingURL=dropdown.js.map