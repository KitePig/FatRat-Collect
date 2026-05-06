Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_teleport = require('../../teleport/src/teleport.js');
const require_index = require('../../../hooks/use-delayed-toggle/index.js');
const require_index$1 = require('../../../hooks/use-aria/index.js');
const require_content = require('../../popper/src/content.js');

//#region ../../packages/components/tooltip/src/content.ts
const useTooltipContentPropsDefaults = {
	...require_index.useDelayedTogglePropsDefaults,
	...require_content.popperContentPropsDefaults,
	content: "",
	visible: null,
	teleported: true
};
/**
* @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
*/
const useTooltipContentProps = require_runtime.buildProps({
	...require_index.useDelayedToggleProps,
	...require_content.popperContentProps,
	appendTo: { type: require_teleport.teleportProps.to.type },
	content: {
		type: String,
		default: ""
	},
	rawContent: Boolean,
	persistent: Boolean,
	visible: {
		type: require_runtime.definePropType(Boolean),
		default: null
	},
	transition: String,
	teleported: {
		type: Boolean,
		default: true
	},
	disabled: Boolean,
	...require_index$1.useAriaProps(["ariaLabel"])
});

//#endregion
exports.useTooltipContentProps = useTooltipContentProps;
exports.useTooltipContentPropsDefaults = useTooltipContentPropsDefaults;
//# sourceMappingURL=content.js.map