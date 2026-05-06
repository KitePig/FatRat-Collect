import { CheckboxProps } from "../checkbox.js";
import { CheckboxModel } from "./use-checkbox-model.js";
import "./index.js";
import * as vue from "vue";
import { ComponentInternalInstance } from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-status.d.ts
declare const useCheckboxStatus: (props: CheckboxProps, slots: ComponentInternalInstance["slots"], {
  model
}: Pick<CheckboxModel, "model">) => {
  checkboxButtonSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  isChecked: vue.ComputedRef<boolean>;
  isFocused: vue.Ref<boolean, boolean>;
  checkboxSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  hasOwnLabel: vue.ComputedRef<boolean>;
  actualValue: vue.ComputedRef<string | number | boolean | object | undefined>;
};
type CheckboxStatus = ReturnType<typeof useCheckboxStatus>;
//#endregion
export { CheckboxStatus, useCheckboxStatus };