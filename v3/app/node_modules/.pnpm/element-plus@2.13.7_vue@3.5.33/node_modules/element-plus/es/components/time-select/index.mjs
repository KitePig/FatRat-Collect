import { withInstall } from "../../utils/vue/install.mjs";
import { DEFAULT_STEP, timeSelectProps } from "./src/time-select.mjs";
import time_select_default from "./src/time-select2.mjs";

//#region ../../packages/components/time-select/index.ts
const ElTimeSelect = withInstall(time_select_default);

//#endregion
export { DEFAULT_STEP, ElTimeSelect, ElTimeSelect as default, timeSelectProps };
//# sourceMappingURL=index.mjs.map