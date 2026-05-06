import { UseNamespaceReturn } from "../use-namespace/index.js";
import { Ref } from "vue";

//#region ../../packages/hooks/use-lockscreen/index.d.ts
type UseLockScreenOptions = {
  ns?: UseNamespaceReturn;
};
/**
 * Hook that monitoring the ref value to lock or unlock the screen.
 * When the trigger became true, it assumes modal is now opened and vice versa.
 * @param trigger {Ref<boolean>}
 */
declare const useLockscreen: (trigger: Ref<boolean>, options?: UseLockScreenOptions) => void;
//#endregion
export { UseLockScreenOptions, useLockscreen };