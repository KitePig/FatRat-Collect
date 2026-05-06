import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { StepsEmits, StepsInstance, StepsProps, StepsPropsPublic, StepsStatus, stepsEmits, stepsProps } from "./src/steps.js";
import { _default } from "./src/steps.vue.js";
import { StepInstance, StepProps, StepPropsPublic, stepProps } from "./src/item.js";
import { _default as _default$1 } from "./src/item.vue.js";
import { STEPS_INJECTION_KEY } from "./src/tokens.js";

//#region ../../packages/components/steps/index.d.ts
declare const ElSteps: SFCWithInstall<typeof _default> & {
  Step: typeof _default$1;
};
declare const ElStep: SFCWithInstall<typeof _default$1>;
//#endregion
export { ElStep, ElSteps, ElSteps as default, STEPS_INJECTION_KEY, StepInstance, StepProps, StepPropsPublic, StepsEmits, StepsInstance, StepsProps, StepsPropsPublic, StepsStatus, stepProps, stepsEmits, stepsProps };