import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { DEFAULT_STEP, TimeSelectInstance, TimeSelectProps, TimeSelectPropsPublic, timeSelectProps } from "./src/time-select.js";
import { _default } from "./src/time-select.vue.js";

//#region ../../packages/components/time-select/index.d.ts
declare const ElTimeSelect: SFCWithInstall<typeof _default>;
//#endregion
export { DEFAULT_STEP, ElTimeSelect, ElTimeSelect as default, TimeSelectInstance, TimeSelectProps, TimeSelectPropsPublic, timeSelectProps };