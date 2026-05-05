import { ComponentSize } from "../../../constants/size.js";
import { Arrayable, FieldPath } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { FormItemProp, FormItemProps, FormItemValidateState } from "./form-item.js";
import { useFormLabelWidth } from "./utils.js";
import { FormEmits, FormProps } from "./form.js";
import { SetupContext, UnwrapRef } from "vue";
import { MaybeRef } from "@vueuse/core";
import { RuleItem, ValidateError, ValidateFieldsError } from "async-validator";

//#region ../../packages/components/form/src/types.d.ts
type FormLabelWidthContext = ReturnType<typeof useFormLabelWidth>;
interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}
type FormRuleValue<V> = V extends any[] ? Arrayable<FormItemRule> : V extends Record<string, any> ? Arrayable<FormItemRule> | { [K in keyof V]?: FormRuleValue<V[K]> } : Arrayable<FormItemRule>;
type FormRules<T extends MaybeRef<Record<string, any> | string> = string> = UnwrapRef<T> extends Record<string, any> ? { [P in FieldPath<UnwrapRef<T>>]?: P extends keyof UnwrapRef<T> ? FormRuleValue<UnwrapRef<T>[P]> : Arrayable<FormItemRule> } : Partial<Record<string, Arrayable<FormItemRule> | Record<string, any>>>;
type FormValidationResult = Promise<boolean>;
type FormValidateCallback = (isValid: boolean, invalidFields?: ValidateFieldsError) => Promise<void> | void;
interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
type FormContext = FormProps & UnwrapRef<FormLabelWidthContext> & {
  emit: SetupContext<FormEmits>['emit'];
  getField: (prop: FormItemProp) => FormItemContext | undefined;
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext, oldPropString?: string) => void;
  resetFields: (props?: Arrayable<FormItemProp>) => void;
  setInitialValues: (initModel: Record<string, any>) => void;
  clearValidate: (props?: Arrayable<FormItemProp>) => void;
  validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => FormValidationResult;
};
interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined;
  size: ComponentSize;
  validateMessage: string;
  validateState: FormItemValidateState;
  isGroup: boolean;
  labelId: string;
  inputIds: string[];
  hasLabel: boolean;
  fieldValue: any;
  propString: string;
  addInputId: (id: string) => void;
  removeInputId: (id: string) => void;
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult;
  resetField(): void;
  clearValidate(): void;
  setInitialValue: (value: any) => void;
  getInitialValue: () => any;
}
//#endregion
export { FormContext, FormItemContext, FormItemRule, FormLabelWidthContext, FormRules, FormValidateCallback, FormValidateFailure, FormValidationResult };