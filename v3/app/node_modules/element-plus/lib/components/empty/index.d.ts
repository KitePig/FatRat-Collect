import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { EmptyProps, EmptyPropsPublic, emptyProps } from "./src/empty.js";
import { _default } from "./src/empty.vue.js";
import { EmptyInstance } from "./src/instance.js";

//#region ../../packages/components/empty/index.d.ts
declare const ElEmpty: SFCWithInstall<typeof _default>;
//#endregion
export { ElEmpty, ElEmpty as default, type EmptyInstance, EmptyProps, EmptyPropsPublic, emptyProps };