import { UseNamespaceReturn } from "../../../hooks/use-namespace/index.js";
import "../../../hooks/index.js";
import { CSSProperties, ComputedRef, InjectionKey, Ref } from "vue";

//#region ../../packages/components/dialog/src/constants.d.ts
type DialogContext = {
  dialogRef: Ref<HTMLElement | undefined>;
  headerRef: Ref<HTMLElement | undefined>;
  bodyId: Ref<string>;
  ns: UseNamespaceReturn;
  rendered: Ref<boolean>;
  style: ComputedRef<CSSProperties>;
};
declare const dialogInjectionKey: InjectionKey<DialogContext>;
declare const DEFAULT_DIALOG_TRANSITION = "dialog-fade";
//#endregion
export { DEFAULT_DIALOG_TRANSITION, DialogContext, dialogInjectionKey };