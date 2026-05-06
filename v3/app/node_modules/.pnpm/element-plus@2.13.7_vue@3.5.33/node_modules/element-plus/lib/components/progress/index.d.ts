import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { ProgressColor, ProgressFn, ProgressInstance, ProgressProps, ProgressPropsPublic, progressProps } from "./src/progress.js";
import { _default } from "./src/progress.vue.js";

//#region ../../packages/components/progress/index.d.ts
declare const ElProgress: SFCWithInstall<typeof _default>;
//#endregion
export { ElProgress, ElProgress as default, ProgressColor, ProgressFn, ProgressInstance, ProgressProps, ProgressPropsPublic, progressProps };