import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { DialogBeforeCloseFn, DialogConfigContext, DialogEmits, DialogInstance, DialogProps, DialogPropsPublic, DialogTransition, dialogContextKey, dialogEmits, dialogProps, dialogPropsDefaults } from "./src/dialog.js";
import { _default } from "./src/dialog.vue.js";
import { useDialog } from "./src/use-dialog.js";
import { DEFAULT_DIALOG_TRANSITION, DialogContext, dialogInjectionKey } from "./src/constants.js";

//#region ../../packages/components/dialog/index.d.ts
declare const ElDialog: SFCWithInstall<typeof _default>;
//#endregion
export { DEFAULT_DIALOG_TRANSITION, DialogBeforeCloseFn, DialogConfigContext, DialogContext, DialogEmits, DialogInstance, DialogProps, DialogPropsPublic, DialogTransition, ElDialog, ElDialog as default, dialogContextKey, dialogEmits, dialogInjectionKey, dialogProps, dialogPropsDefaults, useDialog };