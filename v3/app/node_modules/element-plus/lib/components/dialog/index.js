Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_dialog = require('./src/dialog.js');
const require_constants = require('./src/constants.js');
const require_use_dialog = require('./src/use-dialog.js');
const require_dialog$1 = require('./src/dialog2.js');

//#region ../../packages/components/dialog/index.ts
const ElDialog = require_install.withInstall(require_dialog$1.default);

//#endregion
exports.DEFAULT_DIALOG_TRANSITION = require_constants.DEFAULT_DIALOG_TRANSITION;
exports.ElDialog = ElDialog;
exports.default = ElDialog;
exports.dialogContextKey = require_dialog.dialogContextKey;
exports.dialogEmits = require_dialog.dialogEmits;
exports.dialogInjectionKey = require_constants.dialogInjectionKey;
exports.dialogProps = require_dialog.dialogProps;
exports.dialogPropsDefaults = require_dialog.dialogPropsDefaults;
exports.useDialog = require_use_dialog.useDialog;
//# sourceMappingURL=index.js.map