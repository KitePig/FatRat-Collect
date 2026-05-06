import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/select.vue.js";
import { OptionV2Props, SelectV2Instance, SelectV2Props } from "./src/defaults.js";
import { SelectV2Context, selectV2InjectionKey } from "./src/token.js";

//#region ../../packages/components/select-v2/index.d.ts
declare const ElSelectV2: SFCWithInstall<typeof _default>;
//#endregion
export { ElSelectV2, ElSelectV2 as default, OptionV2Props, SelectV2Context, SelectV2Instance, SelectV2Props, selectV2InjectionKey };