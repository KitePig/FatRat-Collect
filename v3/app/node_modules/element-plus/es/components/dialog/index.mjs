import { withInstall } from "../../utils/vue/install.mjs";
import { dialogContextKey, dialogEmits, dialogProps, dialogPropsDefaults } from "./src/dialog.mjs";
import { DEFAULT_DIALOG_TRANSITION, dialogInjectionKey } from "./src/constants.mjs";
import { useDialog } from "./src/use-dialog.mjs";
import dialog_default from "./src/dialog2.mjs";

//#region ../../packages/components/dialog/index.ts
const ElDialog = withInstall(dialog_default);

//#endregion
export { DEFAULT_DIALOG_TRANSITION, ElDialog, ElDialog as default, dialogContextKey, dialogEmits, dialogInjectionKey, dialogProps, dialogPropsDefaults, useDialog };
//# sourceMappingURL=index.mjs.map