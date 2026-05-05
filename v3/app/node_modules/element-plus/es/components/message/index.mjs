import { withInstallFunction } from "../../utils/vue/install.mjs";
import { MESSAGE_DEFAULT_PLACEMENT, messageDefaults, messageEmits, messagePlacement, messageProps, messageTypes } from "./src/message.mjs";
import message from "./src/method.mjs";

//#region ../../packages/components/message/index.ts
const ElMessage = withInstallFunction(message, "$message");

//#endregion
export { ElMessage, ElMessage as default, MESSAGE_DEFAULT_PLACEMENT, messageDefaults, messageEmits, messagePlacement, messageProps, messageTypes };
//# sourceMappingURL=index.mjs.map