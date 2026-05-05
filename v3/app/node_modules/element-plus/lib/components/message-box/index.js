Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_messageBox = require('./src/messageBox.js');

//#region ../../packages/components/message-box/index.ts
const _MessageBox = require_messageBox.default;
_MessageBox.install = (app) => {
	_MessageBox._context = app._context;
	app.config.globalProperties.$msgbox = _MessageBox;
	app.config.globalProperties.$messageBox = _MessageBox;
	app.config.globalProperties.$alert = _MessageBox.alert;
	app.config.globalProperties.$confirm = _MessageBox.confirm;
	app.config.globalProperties.$prompt = _MessageBox.prompt;
};
const ElMessageBox = _MessageBox;

//#endregion
exports.ElMessageBox = ElMessageBox;
exports.default = _MessageBox;
//# sourceMappingURL=index.js.map