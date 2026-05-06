import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { ajaxUpload } from "./ajax.mjs";

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
const uploadBaseProps = buildProps({
	action: {
		type: String,
		default: "#"
	},
	headers: { type: definePropType(Object) },
	method: {
		type: String,
		default: "post"
	},
	data: {
		type: definePropType([
			Object,
			Function,
			Promise
		]),
		default: () => mutable({})
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
		type: definePropType(Array),
		default: () => mutable([])
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
		type: definePropType(Function),
		default: ajaxUpload
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
const uploadProps = buildProps({
	...uploadBaseProps,
	beforeUpload: {
		type: definePropType(Function),
		default: NOOP
	},
	beforeRemove: { type: definePropType(Function) },
	onRemove: {
		type: definePropType(Function),
		default: NOOP
	},
	onChange: {
		type: definePropType(Function),
		default: NOOP
	},
	onPreview: {
		type: definePropType(Function),
		default: NOOP
	},
	onSuccess: {
		type: definePropType(Function),
		default: NOOP
	},
	onProgress: {
		type: definePropType(Function),
		default: NOOP
	},
	onError: {
		type: definePropType(Function),
		default: NOOP
	},
	onExceed: {
		type: definePropType(Function),
		default: NOOP
	},
	crossorigin: { type: definePropType(String) }
});
const uploadBasePropsDefaults = {
	action: "#",
	method: "post",
	data: () => mutable({}),
	name: "file",
	showFileList: true,
	accept: "",
	fileList: () => mutable([]),
	autoUpload: true,
	listType: "text",
	httpRequest: ajaxUpload,
	disabled: void 0
};
const uploadPropsDefaults = {
	...uploadBasePropsDefaults,
	beforeUpload: NOOP,
	onRemove: NOOP,
	onChange: NOOP,
	onPreview: NOOP,
	onSuccess: NOOP,
	onProgress: NOOP,
	onError: NOOP,
	onExceed: NOOP
};

//#endregion
export { genFileId, uploadBaseProps, uploadBasePropsDefaults, uploadListTypes, uploadProps, uploadPropsDefaults };
//# sourceMappingURL=upload.mjs.map