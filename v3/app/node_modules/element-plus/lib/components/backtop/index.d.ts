import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { BacktopEmits, BacktopProps, BacktopPropsPublic, backtopEmits, backtopProps } from "./src/backtop.js";
import { _default } from "./src/backtop.vue.js";
import { BacktopInstance } from "./src/instance.js";

//#region ../../packages/components/backtop/index.d.ts
declare const ElBacktop: SFCWithInstall<typeof _default>;
//#endregion
export { BacktopEmits, type BacktopInstance, BacktopProps, BacktopPropsPublic, ElBacktop, ElBacktop as default, backtopEmits, backtopProps };