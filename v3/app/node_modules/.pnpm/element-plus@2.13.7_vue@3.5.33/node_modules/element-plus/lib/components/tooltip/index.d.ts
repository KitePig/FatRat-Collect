import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { ElTooltipTriggerProps, ElTooltipTriggerPropsPublic, TooltipTriggerType, UseTooltipTriggerProps, useTooltipTriggerProps, useTooltipTriggerPropsDefaults } from "./src/trigger.js";
import { ElTooltipContentProps, ElTooltipContentPropsPublic, TooltipContentInstance, useTooltipContentProps, useTooltipContentPropsDefaults } from "./src/content.js";
import { ElTooltipProps, ElTooltipPropsPublic, TooltipInstance, UseTooltipProps, tooltipEmits, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps } from "./src/tooltip.js";
import { _default } from "./src/tooltip.vue.js";
import { ElTooltipInjectionContext, TOOLTIP_INJECTION_KEY } from "./src/constants.js";

//#region ../../packages/components/tooltip/index.d.ts
declare const ElTooltip: SFCWithInstall<typeof _default>;
//#endregion
export { ElTooltip, ElTooltip as default, ElTooltipContentProps, ElTooltipContentPropsPublic, ElTooltipInjectionContext, ElTooltipProps, ElTooltipPropsPublic, ElTooltipTriggerProps, ElTooltipTriggerPropsPublic, TOOLTIP_INJECTION_KEY, TooltipContentInstance, TooltipInstance, TooltipTriggerType, UseTooltipProps, UseTooltipTriggerProps, tooltipEmits, useTooltipContentProps, useTooltipContentPropsDefaults, useTooltipModelToggle, useTooltipModelToggleEmits, useTooltipModelToggleProps, useTooltipProps, useTooltipTriggerProps, useTooltipTriggerPropsDefaults };