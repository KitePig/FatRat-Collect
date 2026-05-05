import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { radioEmits, radioProps, radioPropsBase, radioPropsDefaults } from "./src/radio.mjs";
import { radioGroupKey } from "./src/constants.mjs";
import radio_default from "./src/radio2.mjs";
import { radioButtonProps, radioButtonPropsDefaults } from "./src/radio-button.mjs";
import radio_button_default from "./src/radio-button2.mjs";
import { radioDefaultProps, radioGroupEmits, radioGroupProps, radioGroupPropsDefaults } from "./src/radio-group.mjs";
import radio_group_default from "./src/radio-group2.mjs";

//#region ../../packages/components/radio/index.ts
const ElRadio = withInstall(radio_default, {
	RadioButton: radio_button_default,
	RadioGroup: radio_group_default
});
const ElRadioGroup = withNoopInstall(radio_group_default);
const ElRadioButton = withNoopInstall(radio_button_default);

//#endregion
export { ElRadio, ElRadio as default, ElRadioButton, ElRadioGroup, radioButtonProps, radioButtonPropsDefaults, radioDefaultProps, radioEmits, radioGroupEmits, radioGroupKey, radioGroupProps, radioGroupPropsDefaults, radioProps, radioPropsBase, radioPropsDefaults };
//# sourceMappingURL=index.mjs.map