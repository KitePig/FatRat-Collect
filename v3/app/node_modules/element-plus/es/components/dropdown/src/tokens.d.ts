import { PopperProps } from "../../popper/src/popper.js";
import "../../popper/index.js";
import { ComputedRef, InjectionKey, Ref } from "vue";

//#region ../../packages/components/dropdown/src/tokens.d.ts
type ElDropdownInjectionContext = {
  contentRef: Ref<HTMLElement | undefined>;
  role: ComputedRef<PopperProps['role']>;
  triggerId: ComputedRef<string>;
  isUsingKeyboard: Ref<boolean>;
  onItemLeave: (e: PointerEvent) => void;
  onItemEnter: (e: PointerEvent) => void;
  handleClose: () => void;
};
declare const DROPDOWN_INJECTION_KEY: InjectionKey<ElDropdownInjectionContext>;
declare const DROPDOWN_INSTANCE_INJECTION_KEY = "elDropdown";
//#endregion
export { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY, ElDropdownInjectionContext };