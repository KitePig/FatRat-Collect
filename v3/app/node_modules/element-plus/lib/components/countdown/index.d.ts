import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CountdownEmits, CountdownInstance, CountdownProps, CountdownPropsPublic, countdownEmits, countdownProps } from "./src/countdown.js";
import { _default } from "./src/countdown.vue.js";

//#region ../../packages/components/countdown/index.d.ts
declare const ElCountdown: SFCWithInstall<typeof _default>;
//#endregion
export { CountdownEmits, CountdownInstance, CountdownProps, CountdownPropsPublic, ElCountdown, ElCountdown as default, countdownEmits, countdownProps };