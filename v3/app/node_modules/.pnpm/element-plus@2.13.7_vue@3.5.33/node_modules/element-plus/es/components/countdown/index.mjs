import { withInstall } from "../../utils/vue/install.mjs";
import { countdownEmits, countdownProps } from "./src/countdown.mjs";
import countdown_default from "./src/countdown2.mjs";

//#region ../../packages/components/countdown/index.ts
const ElCountdown = withInstall(countdown_default);

//#endregion
export { ElCountdown, ElCountdown as default, countdownEmits, countdownProps };
//# sourceMappingURL=index.mjs.map