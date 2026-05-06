import { InjectionKey, ObjectDirective, Ref } from "vue";

//#region ../../packages/hooks/use-forward-ref/index.d.ts
type ForwardRefSetter = <T>(el: T) => void;
type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter;
};
declare const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext>;
declare const useForwardRef: <T>(forwardRef: Ref<T | null>) => void;
declare const useForwardRefDirective: (setForwardRef: ForwardRefSetter) => ObjectDirective;
//#endregion
export { FORWARD_REF_INJECTION_KEY, ForwardRefInjectionContext, useForwardRef, useForwardRefDirective };