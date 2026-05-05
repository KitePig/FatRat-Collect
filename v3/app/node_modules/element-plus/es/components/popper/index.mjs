import { withInstall } from "../../utils/vue/install.mjs";
import { Effect, popperProps, roleTypes, usePopperProps } from "./src/popper.mjs";
import { POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY } from "./src/constants.mjs";
import popper_default from "./src/popper2.mjs";
import arrow_default from "./src/arrow2.mjs";
import { popperTriggerProps, usePopperTriggerProps } from "./src/trigger.mjs";
import trigger_default from "./src/trigger2.mjs";
import { popperArrowProps, popperArrowPropsDefaults, usePopperArrowProps } from "./src/arrow.mjs";
import { popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps } from "./src/content.mjs";
import content_default from "./src/content2.mjs";

//#region ../../packages/components/popper/index.ts
const ElPopper = withInstall(popper_default);

//#endregion
export { Effect, ElPopper, ElPopper as default, arrow_default as ElPopperArrow, content_default as ElPopperContent, trigger_default as ElPopperTrigger, POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY, popperArrowProps, popperArrowPropsDefaults, popperContentEmits, popperContentProps, popperContentPropsDefaults, popperCoreConfigProps, popperCoreConfigPropsDefaults, popperProps, popperTriggerProps, roleTypes, usePopperArrowProps, usePopperContentEmits, usePopperContentProps, usePopperCoreConfigProps, usePopperProps, usePopperTriggerProps };
//# sourceMappingURL=index.mjs.map