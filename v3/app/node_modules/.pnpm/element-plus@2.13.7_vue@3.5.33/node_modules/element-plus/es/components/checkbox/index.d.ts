import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CheckboxEmits, CheckboxInstance, CheckboxProps, CheckboxPropsPublic, CheckboxValueType, checkboxEmits, checkboxProps, checkboxPropsDefaults } from "./src/checkbox.js";
import { _default } from "./src/checkbox.vue.js";
import { _default as _default$1 } from "./src/checkbox-button.vue.js";
import { CheckboxGroupEmits, CheckboxGroupInstance, CheckboxGroupProps, CheckboxGroupPropsPublic, CheckboxGroupValueType, CheckboxOption, checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps } from "./src/checkbox-group.js";
import { _default as _default$2 } from "./src/checkbox-group.vue.js";
import { checkboxGroupContextKey } from "./src/constants.js";

//#region ../../packages/components/checkbox/index.d.ts
declare const ElCheckbox: SFCWithInstall<typeof _default> & {
  CheckboxButton: typeof _default$1;
  CheckboxGroup: typeof _default$2;
};
declare const ElCheckboxButton: SFCWithInstall<typeof _default$1>;
declare const ElCheckboxGroup: SFCWithInstall<typeof _default$2>;
//#endregion
export { CheckboxEmits, CheckboxGroupEmits, CheckboxGroupInstance, CheckboxGroupProps, CheckboxGroupPropsPublic, CheckboxGroupValueType, CheckboxInstance, CheckboxOption, CheckboxProps, CheckboxPropsPublic, CheckboxValueType, ElCheckbox, ElCheckbox as default, ElCheckboxButton, ElCheckboxGroup, checkboxDefaultProps, checkboxEmits, checkboxGroupContextKey, checkboxGroupEmits, checkboxGroupProps, checkboxProps, checkboxPropsDefaults };