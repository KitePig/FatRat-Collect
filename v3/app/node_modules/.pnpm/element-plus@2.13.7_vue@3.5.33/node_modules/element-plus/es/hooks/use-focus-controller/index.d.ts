import * as vue from "vue";
import { ShallowRef } from "vue";
import { MaybeRef } from "@vueuse/core";

//#region ../../packages/hooks/use-focus-controller/index.d.ts
interface UseFocusControllerOptions {
  disabled?: MaybeRef<boolean>;
  /**
   * return true to cancel focus
   * @param event FocusEvent
   */
  beforeFocus?: (event: FocusEvent) => boolean | undefined;
  afterFocus?: () => void;
  /**
   * return true to cancel blur
   * @param event FocusEvent
   */
  beforeBlur?: (event: FocusEvent) => boolean | undefined;
  afterBlur?: () => void;
}
declare function useFocusController<T extends {
  focus: () => void;
}>(target: ShallowRef<T | undefined>, {
  disabled,
  beforeFocus,
  afterFocus,
  beforeBlur,
  afterBlur
}?: UseFocusControllerOptions): {
  isFocused: vue.Ref<boolean, boolean>; /** Avoid using wrapperRef and handleFocus/handleBlur together */
  wrapperRef: ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  handleFocus: (event: FocusEvent) => void;
  handleBlur: (event: FocusEvent) => void;
};
//#endregion
export { useFocusController };