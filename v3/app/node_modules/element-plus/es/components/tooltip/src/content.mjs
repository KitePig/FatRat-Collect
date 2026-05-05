import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { teleportProps } from "../../teleport/src/teleport.mjs";
import { useDelayedToggleProps, useDelayedTogglePropsDefaults } from "../../../hooks/use-delayed-toggle/index.mjs";
import { useAriaProps } from "../../../hooks/use-aria/index.mjs";
import { popperContentProps, popperContentPropsDefaults } from "../../popper/src/content.mjs";

//#region ../../packages/components/tooltip/src/content.ts
const useTooltipContentPropsDefaults = {
	...useDelayedTogglePropsDefaults,
	...popperContentPropsDefaults,
	content: "",
	visible: null,
	teleported: true
};
/**
* @deprecated Removed after 3.0.0, Use `ElTooltipContentProps` instead.
*/
const useTooltipContentProps = buildProps({
	...useDelayedToggleProps,
	...popperContentProps,
	appendTo: { type: teleportProps.to.type },
	content: {
		type: String,
		default: ""
	},
	rawContent: Boolean,
	persistent: Boolean,
	visible: {
		type: definePropType(Boolean),
		default: null
	},
	transition: String,
	teleported: {
		type: Boolean,
		default: true
	},
	disabled: Boolean,
	...useAriaProps(["ariaLabel"])
});

//#endregion
export { useTooltipContentProps, useTooltipContentPropsDefaults };
//# sourceMappingURL=content.mjs.map