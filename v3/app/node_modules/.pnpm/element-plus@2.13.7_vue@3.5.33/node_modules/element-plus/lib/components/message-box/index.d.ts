import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Action, Callback, ElMessageBoxOptions, ElMessageBoxShortcutMethod, IElMessageBox, MessageBoxData, MessageBoxInputData, MessageBoxInputValidator, MessageBoxState, MessageBoxType } from "./src/message-box.type.js";
import { _default } from "./src/messageBox.js";

//#region ../../packages/components/message-box/index.d.ts
declare const _MessageBox: SFCWithInstall<typeof _default>;
declare const ElMessageBox: SFCWithInstall<IElMessageBox>;
//#endregion
export { Action, Callback, ElMessageBox, ElMessageBoxOptions, ElMessageBoxShortcutMethod, IElMessageBox, MessageBoxData, MessageBoxInputData, MessageBoxInputValidator, MessageBoxState, MessageBoxType, _MessageBox as default };