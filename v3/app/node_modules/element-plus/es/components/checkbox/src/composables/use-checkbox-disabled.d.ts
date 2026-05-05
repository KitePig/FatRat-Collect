import { CheckboxModel } from "./use-checkbox-model.js";
import { CheckboxStatus } from "./use-checkbox-status.js";
import "./index.js";
import * as vue from "vue";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-disabled.d.ts
declare const useCheckboxDisabled: ({
  model,
  isChecked
}: Pick<CheckboxModel, "model"> & Pick<CheckboxStatus, "isChecked">) => {
  isDisabled: vue.ComputedRef<boolean>;
  isLimitDisabled: vue.ComputedRef<boolean>;
};
type CheckboxDisabled = ReturnType<typeof useCheckboxDisabled>;
//#endregion
export { CheckboxDisabled, useCheckboxDisabled };