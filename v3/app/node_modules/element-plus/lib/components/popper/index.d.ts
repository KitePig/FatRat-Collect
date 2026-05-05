import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Effect, PopperEffect, PopperInstance, PopperProps, PopperPropsPublic, PopperTrigger, UsePopperProps, popperProps, roleTypes, usePopperProps } from "./src/popper.js";
import { ElPopperContentInjectionContext, ElPopperInjectionContext, Measurable, POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from "./src/constants.js";
import { _default as _default$3 } from "./src/popper.vue.js";
import { _default } from "./src/arrow.vue.js";
import { ElPopperArrowTrigger, PopperTriggerInstance, PopperTriggerProps, popperTriggerProps, usePopperTriggerProps } from "./src/trigger.js";
import { _default as _default$2 } from "./src/trigger.vue.js";
import { ElPopperArrowInstance, PopperArrowInstance, PopperArrowProps, PopperArrowPropsPublic, UsePopperArrowProps, popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps } from "./src/arrow.js";
import { CreatePopperInstanceParams, ElPopperArrowContent, PopperContentEmits, PopperContentInstance, PopperContentProps, PopperContentPropsPublic, PopperCoreConfigProps, PopperCoreConfigPropsPublic, UsePopperContentProps, UsePopperCoreConfigProps, popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps } from "./src/content.js";
import { _default as _default$1 } from "./src/content.vue.js";
import { Options, Placement } from "@popperjs/core";

//#region ../../packages/components/popper/index.d.ts
declare const ElPopper: SFCWithInstall<typeof _default$3>;
//#endregion
export { CreatePopperInstanceParams, Effect, ElPopper, ElPopper as default, _default as ElPopperArrow, ElPopperArrowContent, ElPopperArrowInstance, ElPopperArrowTrigger, _default$1 as ElPopperContent, ElPopperContentInjectionContext, ElPopperInjectionContext, _default$2 as ElPopperTrigger, Measurable, type Options, POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY, type Placement, PopperArrowInstance, PopperArrowProps, PopperArrowPropsPublic, PopperContentEmits, PopperContentInstance, PopperContentProps, PopperContentPropsPublic, PopperCoreConfigProps, PopperCoreConfigPropsPublic, PopperEffect, PopperInstance, PopperProps, PopperPropsPublic, PopperTrigger, PopperTriggerInstance, PopperTriggerProps, UsePopperArrowProps, UsePopperContentProps, UsePopperCoreConfigProps, UsePopperProps, popperArrowProps, popperArrowPropsDefaults, popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, popperProps, popperTriggerProps, roleTypes, usePopperArrowProps, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps, usePopperProps, usePopperTriggerProps };