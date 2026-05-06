import { withInstall } from "../../utils/vue/install.mjs";
import { alertEffects, alertEmits, alertProps } from "./src/alert.mjs";
import alert_default from "./src/alert2.mjs";

//#region ../../packages/components/alert/index.ts
const ElAlert = withInstall(alert_default);

//#endregion
export { ElAlert, ElAlert as default, alertEffects, alertEmits, alertProps };
//# sourceMappingURL=index.mjs.map