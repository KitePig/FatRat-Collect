import { withInstall } from "../../utils/vue/install.mjs";
import { useTooltipContentProps, useTooltipContentPropsDefaults } from "./src/content.mjs";
import { useTooltipTriggerProps, useTooltipTriggerPropsDefaults } from "./src/trigger.mjs";
import { tooltipEmits, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps } from "./src/tooltip.mjs";
import { TOOLTIP_INJECTION_KEY } from "./src/constants.mjs";
import tooltip_default from "./src/tooltip2.mjs";

//#region ../../packages/components/tooltip/index.ts
const ElTooltip = withInstall(tooltip_default);

//#endregion
export { ElTooltip, ElTooltip as default, TOOLTIP_INJECTION_KEY, tooltipEmits, useTooltipContentProps, useTooltipContentPropsDefaults, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps, useTooltipTriggerProps, useTooltipTriggerPropsDefaults };
//# sourceMappingURL=index.mjs.map