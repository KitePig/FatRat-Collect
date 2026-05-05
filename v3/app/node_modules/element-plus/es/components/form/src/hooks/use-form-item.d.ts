import { FormContext, FormItemContext } from "../types.js";
import { ComputedRef, Ref } from "vue";

//#region ../../packages/components/form/src/hooks/use-form-item.d.ts
declare const useFormItem: () => {
  form: FormContext | undefined;
  formItem: FormItemContext | undefined;
};
type IUseFormItemInputCommonProps = {
  id?: string;
  label?: string | number | boolean | Record<string, any>;
  ariaLabel?: string | number | boolean | Record<string, any>;
};
declare const useFormItemInputId: (props: Partial<IUseFormItemInputCommonProps>, {
  formItemContext,
  disableIdGeneration,
  disableIdManagement
}: {
  formItemContext?: FormItemContext;
  disableIdGeneration?: ComputedRef<boolean> | Ref<boolean>;
  disableIdManagement?: ComputedRef<boolean> | Ref<boolean>;
}) => {
  isLabeledByFormItem: ComputedRef<boolean>;
  inputId: Ref<string | undefined, string | undefined>;
};
//#endregion
export { IUseFormItemInputCommonProps, useFormItem, useFormItemInputId };