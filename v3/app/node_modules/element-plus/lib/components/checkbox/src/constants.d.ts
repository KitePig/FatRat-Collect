import { CheckboxGroupProps } from "./checkbox-group.js";
import { ComputedRef, InjectionKey, ToRefs, WritableComputedRef } from "vue";

//#region ../../packages/components/checkbox/src/constants.d.ts
type CheckboxGroupContext = {
  modelValue?: WritableComputedRef<any>;
  changeEvent?: (...args: any) => any;
  disabled?: ComputedRef<boolean>;
} & ToRefs<Pick<CheckboxGroupProps, 'size' | 'min' | 'max' | 'validateEvent' | 'fill' | 'textColor'>>;
declare const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext>;
//#endregion
export { checkboxGroupContextKey };