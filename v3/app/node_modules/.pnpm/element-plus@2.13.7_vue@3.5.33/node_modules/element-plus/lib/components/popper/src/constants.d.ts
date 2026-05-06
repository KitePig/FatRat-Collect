import { CSSProperties, ComputedRef, InjectionKey, Ref } from "vue";
import { Instance } from "@popperjs/core";

//#region ../../packages/components/popper/src/constants.d.ts
type Measurable = {
  getBoundingClientRect: () => DOMRect;
};
/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
type ElPopperInjectionContext = {
  triggerRef: Ref<Measurable | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  popperInstanceRef: Ref<Instance | undefined>;
  referenceRef: Ref<Measurable | undefined>;
  role: ComputedRef<string>;
};
type ElPopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | undefined>;
  arrowStyle: ComputedRef<CSSProperties>;
};
declare const POPPER_INJECTION_KEY: InjectionKey<ElPopperInjectionContext>;
declare const POPPER_CONTENT_INJECTION_KEY: InjectionKey<ElPopperContentInjectionContext>;
//#endregion
export { ElPopperContentInjectionContext, ElPopperInjectionContext, Measurable, POPPER_CONTENT_INJECTION_KEY, POPPER_INJECTION_KEY };