Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_form = require('./src/form.js');
const require_constants = require('./src/constants.js');
const require_use_form_common_props = require('./src/hooks/use-form-common-props.js');
const require_use_form_item = require('./src/hooks/use-form-item.js');
const require_form$1 = require('./src/form2.js');
const require_form_item = require('./src/form-item.js');
const require_form_item$1 = require('./src/form-item2.js');

//#region ../../packages/components/form/index.ts
const ElForm = require_install.withInstall(require_form$1.default, { FormItem: require_form_item$1.default });
const ElFormItem = require_install.withNoopInstall(require_form_item$1.default);

//#endregion
exports.ElForm = ElForm;
exports.default = ElForm;
exports.ElFormItem = ElFormItem;
exports.formContextKey = require_constants.formContextKey;
exports.formEmits = require_form.formEmits;
exports.formItemContextKey = require_constants.formItemContextKey;
exports.formItemProps = require_form_item.formItemProps;
exports.formItemValidateStates = require_form_item.formItemValidateStates;
exports.formMetaProps = require_form.formMetaProps;
exports.formProps = require_form.formProps;
exports.useDisabled = require_use_form_common_props.useDisabled;
exports.useFormDisabled = require_use_form_common_props.useFormDisabled;
exports.useFormItem = require_use_form_item.useFormItem;
exports.useFormItemInputId = require_use_form_item.useFormItemInputId;
exports.useFormSize = require_use_form_common_props.useFormSize;
exports.useSize = require_use_form_common_props.useSize;
//# sourceMappingURL=index.js.map