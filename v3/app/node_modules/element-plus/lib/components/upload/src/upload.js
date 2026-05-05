Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
const require_ajax = require('./ajax.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/upload/src/upload.ts
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadListTypes = [
	"text",
	"picture",
	"picture-card"
];
let fileId = 1;
const genFileId = () => Date.now() + fileId++;
/**
* @deprecated Removed after 3.0.0, Use `UploadBaseProps` instead.
*/
const uploadBaseProps = require_runtime$1.buildProps({
	action: {
		type: String,
		default: "#"
	},
	headers: { type: require_runtime$1.definePropType(Object) },
	method: {
		type: String,
		default: "post"
	},
	data: {
		type: require_runtime$1.definePropType([
			Object,
			Function,
			Promise
		]),
		default: () => require_typescript.mutable({})
	},
	multiple: Boolean,
	name: {
		type: String,
		default: "file"
	},
	drag: Boolean,
	withCredentials: Boolean,
	showFileList: {
		type: Boolean,
		default: true
	},
	accept: {
		type: String,
		default: ""
	},
	fileList: {
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	autoUpload: {
		type: Boolean,
		default: true
	},
	listType: {
		type: String,
		values: uploadListTypes,
		default: "text"
	},
	httpRequest: {
		type: require_runtime$1.definePropType(Function),
		default: require_ajax.ajaxUpload
	},
	disabled: {
		type: Boolean,
		default: void 0
	},
	limit: Number,
	directory: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `UploadProps` instead.
*/
const uploadProps = require_runtime$1.buildProps({
	...uploadBaseProps,
	beforeUpload: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	beforeRemove: { type: require_runtime$1.definePropType(Function) },
	onRemove: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onChange: {
		type: require_runtime$1.definePropType(Function),
		default: _vue_shared.NOOP
	},
	onPreview: {
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
	},
	crossorigin: { type: require_runtime$1.definePropType(String) }
});
const uploadBasePropsDefaults = {
	action: "#",
	method: "post",
	data: () => require_typescript.mutable({}),
	name: "file",
	showFileList: true,
	accept: "",
	fileList: () => require_typescript.mutable([]),
	autoUpload: true,
	listType: "text",
	httpRequest: require_ajax.ajaxUpload,
	disabled: void 0
};
const uploadPropsDefaults = {
	...uploadBasePropsDefaults,
	beforeUpload: _vue_shared.NOOP,
	onRemove: _vue_shared.NOOP,
	onChange: _vue_shared.NOOP,
	onPreview: _vue_shared.NOOP,
	onSuccess: _vue_shared.NOOP,
	onProgress: _vue_shared.NOOP,
	onError: _vue_shared.NOOP,
	onExceed: _vue_shared.NOOP
};

//#endregion
exports.genFileId = genFileId;
exports.uploadBaseProps = uploadBaseProps;
exports.uploadBasePropsDefaults = uploadBasePropsDefaults;
exports.uploadListTypes = uploadListTypes;
exports.uploadProps = uploadProps;
exports.uploadPropsDefaults = uploadPropsDefaults;
//# sourceMappingURL=upload.js.map