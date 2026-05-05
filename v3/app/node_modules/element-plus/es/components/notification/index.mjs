import { withInstallFunction } from "../../utils/vue/install.mjs";
import { notificationEmits, notificationProps, notificationTypes } from "./src/notification.mjs";
import notify from "./src/notify.mjs";

//#region ../../packages/components/notification/index.ts
const ElNotification = withInstallFunction(notify, "$notify");

//#endregion
export { ElNotification, ElNotification as default, notificationEmits, notificationProps, notificationTypes };
//# sourceMappingURL=index.mjs.map