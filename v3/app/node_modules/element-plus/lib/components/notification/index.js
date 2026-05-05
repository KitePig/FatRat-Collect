Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_notification = require('./src/notification.js');
const require_notify = require('./src/notify.js');

//#region ../../packages/components/notification/index.ts
const ElNotification = require_install.withInstallFunction(require_notify.default, "$notify");

//#endregion
exports.ElNotification = ElNotification;
exports.default = ElNotification;
exports.notificationEmits = require_notification.notificationEmits;
exports.notificationProps = require_notification.notificationProps;
exports.notificationTypes = require_notification.notificationTypes;
//# sourceMappingURL=index.js.map