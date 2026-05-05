import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/tree-select.vue.js";
import { TreeSelectInstance } from "./src/instance.js";

//#region ../../packages/components/tree-select/index.d.ts
declare const ElTreeSelect: SFCWithInstall<typeof _default>;
//#endregion
export { ElTreeSelect, ElTreeSelect as default, type TreeSelectInstance };