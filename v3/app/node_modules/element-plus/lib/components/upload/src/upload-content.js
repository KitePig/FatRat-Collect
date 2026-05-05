Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_upload = require('./upload.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/upload-content.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadContentProps` instead.
*/
const uploadContentProps = require_runtime$1.buildProps({
	...require_upload.uploadBaseProps,
	beforeUpload: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onRemove: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onStart: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onSuccess: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onProgress: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onError: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onExceed: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	}
});
const uploadContentPropsDefaults = {
	...require_upload.uploadBasePropsDefaults,
	beforeUpload: _vue_shared.NOOP,
	onRemove: _vue_shared.NOOP,
	onStart: _vue_shared.NOOP,
	onSuccess: _vue_shared.NOOP,
	onProgress: _vue_shared.NOOP,
	onError: _vue_shared.NOOP,
	onExceed: _vue_shared.NOOP
};

//#endregion
exports.uploadContentProps = uploadContentProps;
exports.uploadContentPropsDefaults = uploadContentPropsDefaults;
//# sourceMappingURL=upload-content.js.map