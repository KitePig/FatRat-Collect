Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_checkbox = require('./src/checkbox.js');
const require_constants = require('./src/constants.js');
const require_checkbox$1 = require('./src/checkbox2.js');
const require_checkbox_button = require('./src/checkbox-button.js');
const require_checkbox_group = require('./src/checkbox-group.js');
const require_checkbox_group$1 = require('./src/checkbox-group2.js');

//#region ../../packages/components/checkbox/index.ts
const ElCheckbox = require_install.withInstall(require_checkbox$1.default, {
	CheckboxButton: require_checkbox_button.default,
	CheckboxGroup: require_checkbox_group$1.default
});
const ElCheckboxButton = require_install.withNoopInstall(require_checkbox_button.default);
const ElCheckboxGroup = require_install.withNoopInstall(require_checkbox_group$1.default);

//#endregion
exports.ElCheckbox = ElCheckbox;
exports.default = ElCheckbox;
exports.ElCheckboxButton = ElCheckboxButton;
exports.ElCheckboxGroup = ElCheckboxGroup;
exports.checkboxDefaultProps = require_checkbox_group.checkboxDefaultProps;
exports.checkboxEmits = require_checkbox.checkboxEmits;
exports.checkboxGroupContextKey = require_constants.checkboxGroupContextKey;
exports.checkboxGroupEmits = require_checkbox_group.checkboxGroupEmits;
exports.checkboxGroupProps = require_checkbox_group.checkboxGroupProps;
exports.checkboxProps = require_checkbox.checkboxProps;
exports.checkboxPropsDefaults = require_checkbox.checkboxPropsDefaults;
//# sourceMappingURL=index.js.map