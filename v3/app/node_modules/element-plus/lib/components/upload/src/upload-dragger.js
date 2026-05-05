Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/upload-dragger.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadDraggerProps` instead.
*/
const uploadDraggerProps = require_runtime$1.buildProps({
	disabled: {
		type: Boolean,
		default: void 0
	},
	directory: Boolean
});
const uploadDraggerEmits = { file: (file) => (0, _vue_shared.isArray)(file) };

//#endregion
exports.uploadDraggerEmits = uploadDraggerEmits;
exports.uploadDraggerProps = uploadDraggerProps;
//# sourceMappingURL=upload-dragger.js.map