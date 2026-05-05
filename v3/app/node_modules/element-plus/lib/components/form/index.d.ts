import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { FormItemProp, FormItemProps, FormItemPropsPublic, FormItemValidateState, formItemProps, formItemValidateStates } from "./src/form-item.js";
import { FormContext, FormItemContext, FormItemRule, FormLabelWidthContext, FormRules, FormValidateCallback, FormValidateFailure, FormValidationResult } from "./src/types.js";
import { FormEmits, FormMetaProps, FormMetaPropsPublic, FormProps, FormPropsPublic, formEmits, formMetaProps, formProps } from "./src/form.js";
import { _default } from "./src/form.vue.js";
import { _default as _default$1 } from "./src/form-item.vue.js";
import { formContextKey, formItemContextKey } from "./src/constants.js";
import { useDisabled, useFormDisabled, useFormSize, useSize } from "./src/hooks/use-form-common-props.js";
import { IUseFormItemInputCommonProps, useFormItem, useFormItemInputId } from "./src/hooks/use-form-item.js";
import "./src/hooks/index.js";

//#region ../../packages/components/form/index.d.ts
declare const ElForm: SFCWithInstall<typeof _default> & {
  FormItem: typeof _default$1;
};
declare const ElFormItem: SFCWithInstall<typeof _default$1>;
type FormInstance = InstanceType<typeof _default> & unknown;
type FormItemInstance = InstanceType<typeof _default$1> & unknown;
//#endregion
export { ElForm, ElForm as default, ElFormItem, FormContext, FormEmits, FormInstance, FormItemContext, FormItemInstance, FormItemProp, FormItemProps, FormItemPropsPublic, FormItemRule, FormItemValidateState, FormLabelWidthContext, FormMetaProps, FormMetaPropsPublic, FormProps, FormPropsPublic, FormRules, FormValidateCallback, FormValidateFailure, FormValidationResult, IUseFormItemInputCommonProps, formContextKey, formEmits, formItemContextKey, formItemProps, formItemValidateStates, formMetaProps, formProps, useDisabled, useFormDisabled, useFormItem, useFormItemInputId, useFormSize, useSize };