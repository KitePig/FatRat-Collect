import { FormContext, FormItemContext } from "./types.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/form/src/constants.d.ts
declare const formContextKey: InjectionKey<FormContext>;
declare const formItemContextKey: InjectionKey<FormItemContext | undefined>;
//#endregion
export { formContextKey, formItemContextKey };