import { SelectContext, SelectGroupContext } from "./type.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/select/src/token.d.ts
declare const selectGroupKey: InjectionKey<SelectGroupContext>;
declare const selectKey: InjectionKey<SelectContext>;
//#endregion
export { selectGroupKey, selectKey };