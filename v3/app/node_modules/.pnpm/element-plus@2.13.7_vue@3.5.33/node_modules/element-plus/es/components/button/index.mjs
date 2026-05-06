import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { buttonEmits, buttonNativeTypes, buttonProps, buttonTypes } from "./src/button.mjs";
import { buttonGroupContextKey } from "./src/constants.mjs";
import button_default from "./src/button2.mjs";
import button_group_default from "./src/button-group2.mjs";

//#region ../../packages/components/button/index.ts
const ElButton = withInstall(button_default, { ButtonGroup: button_group_default });
const ElButtonGroup = withNoopInstall(button_group_default);

//#endregion
export { ElButton, ElButton as default, ElButtonGroup, buttonEmits, buttonGroupContextKey, buttonNativeTypes, buttonProps, buttonTypes };
//# sourceMappingURL=index.mjs.map