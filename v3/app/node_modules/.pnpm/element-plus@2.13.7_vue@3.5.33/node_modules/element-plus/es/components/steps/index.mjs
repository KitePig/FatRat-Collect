import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { stepsEmits, stepsProps } from "./src/steps.mjs";
import { STEPS_INJECTION_KEY } from "./src/tokens.mjs";
import steps_default from "./src/steps2.mjs";
import { stepProps } from "./src/item.mjs";
import item_default from "./src/item2.mjs";

//#region ../../packages/components/steps/index.ts
const ElSteps = withInstall(steps_default, { Step: item_default });
const ElStep = withNoopInstall(item_default);

//#endregion
export { ElStep, ElSteps, ElSteps as default, STEPS_INJECTION_KEY, stepProps, stepsEmits, stepsProps };
//# sourceMappingURL=index.mjs.map