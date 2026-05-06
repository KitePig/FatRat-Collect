import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { AlertEmits, AlertProps, AlertPropsPublic, alertEffects, alertEmits, alertProps } from "./src/alert.js";
import { _default } from "./src/alert.vue.js";
import { AlertInstance } from "./src/instance.js";

//#region ../../packages/components/alert/index.d.ts
declare const ElAlert: SFCWithInstall<typeof _default>;
//#endregion
export { AlertEmits, type AlertInstance, AlertProps, AlertPropsPublic, ElAlert, ElAlert as default, alertEffects, alertEmits, alertProps };