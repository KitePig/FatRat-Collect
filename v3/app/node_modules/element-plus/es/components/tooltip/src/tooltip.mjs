import { buildProps } from "../../../utils/vue/props/runtime.mjs";
import { createModelToggleComposable } from "../../../hooks/use-model-toggle/index.mjs";
import { popperProps } from "../../popper/src/popper.mjs";
import { popperArrowProps } from "../../popper/src/arrow.mjs";
import { useTooltipContentProps } from "./content.mjs";
import { useTooltipTriggerProps } from "./trigger.mjs";

//#region ../../packages/components/tooltip/src/tooltip.ts
const { useModelToggleProps: useTooltipModelToggleProps, useModelToggleEmits: useTooltipModelToggleEmits, useModelToggle: useTooltipModelToggle } = createModelToggleComposable("visible");
/**
* @deprecated Removed after 3.0.0, Use `UseTooltipProps` instead.
*/
const useTooltipProps = buildProps({
	...popperProps,
	...useTooltipModelToggleProps,
	...useTooltipContentProps,
	...useTooltipTriggerProps,
	...popperArrowProps,
	showArrow: {
		type: Boolean,
		default: true
	}
});
const tooltipEmits = [
	...useTooltipModelToggleEmits,
	"before-show",
	"before-hide",
	"show",
	"hide",
	"open",
	"close"
];

//#endregion
export { tooltipEmits, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps };
//# sourceMappingURL=tooltip.mjs.map