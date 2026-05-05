import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { checkboxEmits, checkboxProps, checkboxPropsDefaults } from "./src/checkbox.mjs";
import { checkboxGroupContextKey } from "./src/constants.mjs";
import checkbox_default from "./src/checkbox2.mjs";
import checkbox_button_default from "./src/checkbox-button.mjs";
import { checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps } from "./src/checkbox-group.mjs";
import checkbox_group_default from "./src/checkbox-group2.mjs";

//#region ../../packages/components/checkbox/index.ts
const ElCheckbox = withInstall(checkbox_default, {
	CheckboxButton: checkbox_button_default,
	CheckboxGroup: checkbox_group_default
});
const ElCheckboxButton = withNoopInstall(checkbox_button_default);
const ElCheckboxGroup = withNoopInstall(checkbox_group_default);

//#endregion
export { ElCheckbox, ElCheckbox as default, ElCheckboxButton, ElCheckboxGroup, checkboxDefaultProps, checkboxEmits, checkboxGroupContextKey, checkboxGroupEmits, checkboxGroupProps, checkboxProps, checkboxPropsDefaults };
//# sourceMappingURL=index.mjs.map