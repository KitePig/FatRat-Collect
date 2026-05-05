import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CascaderComponentProps, CascaderEmits, cascaderEmits, cascaderProps } from "./src/cascader.js";
import { _default } from "./src/cascader.vue.js";
import { CascaderInstance } from "./src/instances.js";

//#region ../../packages/components/cascader/index.d.ts
declare const ElCascader: SFCWithInstall<typeof _default>;
//#endregion
export { CascaderComponentProps, CascaderEmits, CascaderInstance, ElCascader, ElCascader as default, cascaderEmits, cascaderProps };