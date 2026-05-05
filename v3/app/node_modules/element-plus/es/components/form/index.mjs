import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { formEmits, formMetaProps, formProps } from "./src/form.mjs";
import { formContextKey, formItemContextKey } from "./src/constants.mjs";
import { useDisabled, useFormDisabled, useFormSize, useSize } from "./src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "./src/hooks/use-form-item.mjs";
import form_default from "./src/form2.mjs";
import { formItemProps, formItemValidateStates } from "./src/form-item.mjs";
import form_item_default from "./src/form-item2.mjs";

//#region ../../packages/components/form/index.ts
const ElForm = withInstall(form_default, { FormItem: form_item_default });
const ElFormItem = withNoopInstall(form_item_default);

//#endregion
export { ElForm, ElForm as default, ElFormItem, formContextKey, formEmits, formItemContextKey, formItemProps, formItemValidateStates, formMetaProps, formProps, useDisabled, useFormDisabled, useFormItem, useFormItemInputId, useFormSize, useSize };
//# sourceMappingURL=index.mjs.map