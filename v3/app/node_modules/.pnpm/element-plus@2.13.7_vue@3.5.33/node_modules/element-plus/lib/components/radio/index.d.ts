import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { RadioEmits, RadioInstance, RadioProps, RadioPropsBase, RadioPropsPublic, radioEmits, radioProps, radioPropsBase, radioPropsDefaults } from "./src/radio.js";
import { _default } from "./src/radio.vue.js";
import { RadioButtonInstance, RadioButtonProps, RadioButtonPropsPublic, radioButtonProps, radioButtonPropsDefaults } from "./src/radio-button.js";
import { _default as _default$1 } from "./src/radio-button.vue.js";
import { RadioGroupEmits, RadioGroupInstance, RadioGroupProps, RadioGroupPropsPublic, radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults, radioOption, radioOptionProp } from "./src/radio-group.js";
import { _default as _default$2 } from "./src/radio-group.vue.js";
import { RadioGroupContext, radioGroupKey } from "./src/constants.js";

//#region ../../packages/components/radio/index.d.ts
declare const ElRadio: SFCWithInstall<typeof _default> & {
  RadioButton: typeof _default$1;
  RadioGroup: typeof _default$2;
};
declare const ElRadioGroup: SFCWithInstall<typeof _default$2>;
declare const ElRadioButton: SFCWithInstall<typeof _default$1>;
//#endregion
export { ElRadio, ElRadio as default, ElRadioButton, ElRadioGroup, RadioButtonInstance, RadioButtonProps, RadioButtonPropsPublic, RadioEmits, RadioGroupContext, RadioGroupEmits, RadioGroupInstance, RadioGroupProps, RadioGroupPropsPublic, RadioInstance, RadioProps, RadioPropsBase, RadioPropsPublic, radioButtonProps, radioButtonPropsDefaults, radioDefaultProps, radioEmits, radioGroupEmits, radioGroupKey, radioGroupProps, radioGroupPropsDefaults, radioOption, radioOptionProp, radioProps, radioPropsBase, radioPropsDefaults };