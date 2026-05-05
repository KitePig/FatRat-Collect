import { withInstall } from "../../utils/vue/install.mjs";
import { switchEmits, switchProps } from "./src/switch.mjs";
import switch_default from "./src/switch2.mjs";

//#region ../../packages/components/switch/index.ts
const ElSwitch = withInstall(switch_default);

//#endregion
export { ElSwitch, ElSwitch as default, switchEmits, switchProps };
//# sourceMappingURL=index.mjs.map