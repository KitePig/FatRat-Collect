import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { ButtonConfigContext, ButtonEmits, ButtonNativeType, ButtonProps, ButtonPropsPublic, ButtonType, buttonEmits, buttonNativeTypes, buttonProps, buttonTypes } from "./src/button.js";
import { _default } from "./src/button.vue.js";
import { _default as _default$1 } from "./src/button-group.vue.js";
import { ButtonGroupContext, buttonGroupContextKey } from "./src/constants.js";
import { ButtonGroupInstance, ButtonInstance } from "./src/instance.js";

//#region ../../packages/components/button/index.d.ts
declare const ElButton: SFCWithInstall<typeof _default> & {
  ButtonGroup: typeof _default$1;
};
declare const ElButtonGroup: SFCWithInstall<typeof _default$1>;
//#endregion
export { ButtonConfigContext, ButtonEmits, ButtonGroupContext, type ButtonGroupInstance, type ButtonInstance, ButtonNativeType, ButtonProps, ButtonPropsPublic, ButtonType, ElButton, ElButton as default, ElButtonGroup, buttonEmits, buttonGroupContextKey, buttonNativeTypes, buttonProps, buttonTypes };