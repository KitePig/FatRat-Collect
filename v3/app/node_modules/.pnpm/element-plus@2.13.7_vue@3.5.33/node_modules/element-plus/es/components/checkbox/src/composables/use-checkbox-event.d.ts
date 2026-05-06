import { CheckboxProps } from "../checkbox.js";
import { useFormItemInputId } from "../../../form/src/hooks/use-form-item.js";
import "../../../form/index.js";
import { CheckboxDisabled } from "./use-checkbox-disabled.js";
import { CheckboxModel } from "./use-checkbox-model.js";
import { CheckboxStatus } from "./use-checkbox-status.js";
import "./index.js";

//#region ../../packages/components/checkbox/src/composables/use-checkbox-event.d.ts
declare const useCheckboxEvent: (props: CheckboxProps, {
  model,
  isLimitExceeded,
  hasOwnLabel,
  isDisabled,
  isLabeledByFormItem
}: Pick<CheckboxModel, "model" | "isLimitExceeded"> & Pick<CheckboxStatus, "hasOwnLabel"> & Pick<CheckboxDisabled, "isDisabled"> & Pick<ReturnType<typeof useFormItemInputId>, "isLabeledByFormItem">) => {
  handleChange: (e: Event) => void;
  onClickRoot: (e: MouseEvent) => Promise<void>;
};
//#endregion
export { useCheckboxEvent };