import { CheckboxProps } from "../checkbox.js";
import * as vue from "vue";
import { ComponentInternalInstance } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox.d.ts
declare const useCheckbox: (props: CheckboxProps, slots: ComponentInternalInstance["slots"]) => {
  inputId: vue.Ref<string | undefined, string | undefined>;
  isLabeledByFormItem: vue.ComputedRef<boolean>;
  isChecked: vue.ComputedRef<boolean>;
  isDisabled: vue.ComputedRef<boolean>;
  isFocused: vue.Ref<boolean, boolean>;
  checkboxButtonSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  checkboxSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  hasOwnLabel: vue.ComputedRef<boolean>;
  model: vue.WritableComputedRef<any, unknown>;
  actualValue: vue.ComputedRef<string | number | boolean | object | undefined>;
  handleChange: (e: Event) => void;
  onClickRoot: (e: MouseEvent) => Promise<void>;
};
//#endregion
export { useCheckbox };