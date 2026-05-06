import { CheckboxProps } from "../checkbox.js";
import * as vue from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-model.d.ts
declare const useCheckboxModel: (props: CheckboxProps) => {
  model: vue.WritableComputedRef<any, unknown>;
  isGroup: vue.ComputedRef<boolean>;
  isLimitExceeded: vue.Ref<boolean, boolean>;
};
type CheckboxModel = ReturnType<typeof useCheckboxModel>;
//#endregion
export { CheckboxModel, useCheckboxModel };